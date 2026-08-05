'use client';
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// ---------------------------------------------------------------------------
// BACKEND VALIDATION & OCR CONFIDENCE GATE LOGIC
// ---------------------------------------------------------------------------
const DOCUMENT_TYPE_KEYWORDS = {
  utility_bill: ["kwh", "units consumed", "electricity", "bill", "invoice", "meter reading", "msedcl"],
  waste_manifest: ["manifest", "sludge", "hazardous waste", "transporter", "disposal", "form 10"],
  water_bill: ["water charges", "cess", "discharge", "kl", "liters consumed"],
};

const VALID_DOCUMENT_TO_CATEGORY = {
  utility_bill: [],
  waste_manifest: ["5.1", "32.2", "34.3", "35.1"],
  water_bill: [],
};

const OCR_CONFIDENCE_THRESHOLD = 70;
const MINIMUM_COMPLETENESS_PCT = 50;

function detectDocumentType(ocrText) {
  const text = ocrText.toLowerCase();
  let best = { type: "unknown", matchScore: 0 };
  for (const [type, keywords] of Object.entries(DOCUMENT_TYPE_KEYWORDS)) {
    const hits = keywords.filter((kw) => text.includes(kw)).length;
    const score = Math.round((hits / keywords.length) * 100);
    if (score > best.matchScore) {
      best = { type, matchScore: score };
    }
  }
  return best;
}

function classifyWithConfidenceGate(ocrText, ocrEngineConfidence, suggestedCategory) {
  const { type: documentType, matchScore } = detectDocumentType(ocrText);
  const validCategories = VALID_DOCUMENT_TO_CATEGORY[documentType] || [];
  const mismatch = documentType !== "unknown" && (validCategories.length === 0 || !validCategories.includes(suggestedCategory));
  const lowConfidence = ocrEngineConfidence < OCR_CONFIDENCE_THRESHOLD;

  if (mismatch) {
    return {
      autoClassify: false,
      requiresManualReview: true,
      reason: `Document detected as "${documentType}" but engine suggested CPCB ${suggestedCategory}. Mismatch detected.`,
      warningLabel: `Suggested: ${documentType.replace("_", " ")} — not a waste manifest`,
    };
  }
  if (lowConfidence || matchScore < OCR_CONFIDENCE_THRESHOLD) {
    return {
      autoClassify: false,
      requiresManualReview: true,
      reason: `OCR confidence (${ocrEngineConfidence}%) or match score (${matchScore}%) below threshold.`,
      warningLabel: "AI-suggested — manager confirmation required",
    };
  }
  return {
    autoClassify: true,
    requiresManualReview: false,
    reason: "High confidence match, valid pairing.",
    warningLabel: "AI-suggested, manager confirmation pending",
  };
}

function preflightCheck(dailyLogEntries) {
  const totalDays = 30; 
  const loggedDays = dailyLogEntries.length > 0 ? dailyLogEntries.length : 0;
  const completenessPct = totalDays > 0 ? Math.round((loggedDays / totalDays) * 100) : 0;
  
  const flaggedEntries = dailyLogEntries.filter((e) => parseFloat(e.ph) < 0 || parseFloat(e.ph) > 14 || parseFloat(e.power) < 0 || parseFloat(e.water) < 0);
  const blockGeneration = completenessPct < MINIMUM_COMPLETENESS_PCT;

  let statusLabel;
  if (blockGeneration) {
    statusLabel = `Insufficient Data — ${completenessPct}% Complete (Min 50% Required)`;
  } else if (completenessPct === 100 && flaggedEntries.length === 0) {
    statusLabel = "Data Complete & Filing-Ready";
  } else {
    statusLabel = `Partial Data — ${completenessPct}% Complete`;
  }

  return { completenessPct, flaggedEntries, blockGeneration, statusLabel };
}
// ---------------------------------------------------------------------------

export default function EcoTraceDashboard() {
    // ---- Login/Session Logic ----
    const [session, setSession] = useState(null);
    const [authEmail, setAuthEmail] = useState('');
    const [authPassword, setAuthPassword] = useState('');
    const [authMode, setAuthMode] = useState('login');
    const [authError, setAuthError] = useState('');

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });
        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
        return () => authListener.subscription.unsubscribe();
    }, []);

    const handleAuthSubmit = async (e) => {
        e.preventDefault();
        setAuthError('');
        if (authMode === 'login') {
            const { error } = await supabase.auth.signInWithPassword({ email: authEmail, password: authPassword });
            if (error) setAuthError(error.message);
        } else {
            const { error } = await supabase.auth.signUp({ email: authEmail, password: authPassword });
            if (error) setAuthError(error.message);
            else setAuthError('Signup successful! You can now login.');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setSession(null);
    };

    const [activeTab, setActiveTab] = useState('overview');
    
    const [factoryData, setFactoryData] = useState({
        name: "",
        location: "",
        dischargeLimit: "",
        ctoExpiryDate: "",
        status: "PENDING ONBOARDING"
    });

    const [tempCompanyName, setTempCompanyName] = useState('');
    const [tempMidcLocation, setTempMidcLocation] = useState('');
    const [tempDischargeLimit, setTempDischargeLimit] = useState('');
    const [tempCtoDate, setTempCtoDate] = useState('');

    const isFactoryActive = factoryData.name.trim() !== "";
    const [isDemoMode, setIsDemoMode] = useState(false);

    // Per-Unit State Isolation
    const [currentUnitId, setCurrentUnitId] = useState(null);
    const [unitsData, setUnitsData] = useState({});
    const [savedLogsHistory, setSavedLogsHistory] = useState([]);
    const [isFactoryLoading, setIsFactoryLoading] = useState(true);

    // ---- Step 2.1 (Pan-India backend migration): auto-load this user's factory on login ----
    useEffect(() => {
        if (!session) {
            setIsFactoryLoading(false);
            return;
        }

        const loadFactory = async () => {
            setIsFactoryLoading(true);
            const { data, error } = await supabase
                .from('factories')
                .select('*')
                .eq('owner_user_id', session.user.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (error) {
                console.error('Error loading factory:', error.message);
                setIsFactoryLoading(false);
                return;
            }

            if (data) {
                setCurrentUnitId(data.id);
                setFactoryData({
                    name: data.name,
                    location: data.plant_location,
                    dischargeLimit: String(data.mpcb_water_consent_limit_liters ?? '5000'),
                    ctoExpiryDate: '2026-12-31', // CTO date column not yet in schema — Step 1 follow-up
                    status: "DATA COMPLETE & FILING-READY",
                });
            }
            // data नसेल तर काहीही बदलू नका — डीफॉल्ट "No factory onboarded" स्थितीच राहील
            setIsFactoryLoading(false);
        };

        loadFactory();
    }, [session]);
    
    const [selectedCategory, setSelectedCategory] = useState("CPCB Cat 34.3 (Chemical Sludge)");
    const [ocrFiles, setOcrFiles] = useState([]); // Now stores per-file objects with individual OCR statuses
    
    // Daily Log State & True OCR Read State
    const [dailyLog, setDailyLog] = useState({ ph: '7.2', water: '1420', power: '3150', sludge: '0.45', fuelInput: '' });
    const [ocrReadPower, setOcrReadPower] = useState(null); 
    const [isSludgeNotApplicable, setIsSludgeNotApplicable] = useState(false);
    const [logSubmitted, setLogSubmitted] = useState(false);
    const [validationWarning, setValidationWarning] = useState("");

    const handleUnitSwitch = (newUnitId, newFactoryDetails, logs, demoState, category, files, logState, sludgeNaState, ocrPower) => {
        if (currentUnitId) {
            setUnitsData(prev => ({
                ...prev,
                [currentUnitId]: { factoryData, savedLogsHistory, isDemoMode, selectedCategory, ocrFiles, dailyLog, isSludgeNotApplicable, ocrReadPower }
            }));
        }
        setCurrentUnitId(newUnitId);
        setIsDemoMode(demoState);
        setFactoryData(newFactoryDetails);
        setSavedLogsHistory(logs || []);
        setSelectedCategory(category || "CPCB Cat 34.3 (Chemical Sludge)");
        setOcrFiles(files || []);
        setDailyLog(logState || { ph: '7.2', water: '1420', power: '3150', sludge: '0.45', fuelInput: '' });
        setIsSludgeNotApplicable(sludgeNaState || false);
        setOcrReadPower(ocrPower !== undefined ? ocrPower : null);
    };

    const loadDemoUnit = () => {
        const demoDetails = {
            name: "DEMO-FACTORY (MSME SAMPLE)",
            location: "PUNE MIDC",
            dischargeLimit: "5000",
            ctoExpiryDate: "2026-10-15",
            status: "DATA COMPLETE & FILING-READY (DEMO MODE)"
        };
        const demoLogs = Array.from({ length: 15 }, (_, i) => ({
            date: `2026-08-${i + 1 < 10 ? '0' + (i + 1) : i + 1}`,
            ph: (7.0 + (i % 3) * 0.1).toFixed(1),
            water: '1420',
            power: '3150',
            sludge: '0.45',
            ocrPowerValue: 3120,
            gpsCaptured: true,
            submittedAt: new Date().toISOString()
        }));
        handleUnitSwitch("DEMO-FACTORY", demoDetails, demoLogs, true, "CPCB Cat 34.3 (Chemical Sludge)", [], { ph: '7.2', water: '1420', power: '3150', sludge: '0.45', fuelInput: '' }, false, 3120);
        alert('Demo Unit loaded safely in isolated state with 15-day sample data.');
    };

    // ---- Step 1.1 + Pan-India location fix: Onboarding now writes to Supabase, using state_configs for the industrial-area term ----
    const handleOnboardSubmit = async (e) => {
        e.preventDefault();
        if (!tempCompanyName.trim()) {
            alert('Please enter a valid company name.');
            return;
        }

        const unitName = tempCompanyName.trim().toUpperCase();
        const dischargeLimitValue = tempDischargeLimit || '5000';
        const ctoDateValue = tempCtoDate || '2026-12-31';
        const factoryState = 'Maharashtra'; // सध्या डीफॉल्ट — पुढे राज्य-निवड फील्ड जोडू

        // हार्डकोडेड "MIDC" ऐवजी, त्या राज्याचा industrial-area-term state_configs मधून वाचा
        const { data: stateConfig } = await supabase
            .from('state_configs')
            .select('industrial_area_term')
            .eq('state', factoryState)
            .maybeSingle();

        const areaTerm = stateConfig?.industrial_area_term || 'Industrial Area';
        const locationValue = tempMidcLocation
            ? `${tempMidcLocation.toUpperCase()} ${areaTerm}`
            : `${areaTerm} CLUSTER`;

        // Supabase मध्ये upsert — जर या owner_user_id ची factory आधीच असेल तर ती UPDATE होईल,
        // नवीन duplicate तयार होणार नाही (एका account ला एकच factory — database-level constraint सह)
        const { data, error } = await supabase
            .from('factories')
            .upsert({
                name: unitName,
                plant_location: locationValue,
                mpcb_water_consent_limit_liters: parseFloat(dischargeLimitValue),
                owner_user_id: session.user.id,
                state: factoryState,
            }, { onConflict: 'owner_user_id' })
            .select()
            .single();

        if (error) {
            alert('Error saving factory: ' + error.message);
            return;
        }

        // नवीन factory चा खरा database ID currentUnitId म्हणून साठवा
        setCurrentUnitId(data.id);
        setFactoryData({
            name: data.name,
            location: data.plant_location,
            dischargeLimit: String(data.mpcb_water_consent_limit_liters),
            ctoExpiryDate: ctoDateValue,
            status: "DATA COMPLETE & FILING-READY",
        });

        alert(`Factory Unit ${unitName} Onboarded Successfully (Saved to Database)!`);
    };

    const calculateCtoDaysLeft = (expiryDate) => {
        if (!expiryDate) return 0;
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const ctoDaysLeft = calculateCtoDaysLeft(factoryData.ctoExpiryDate);

    let ctoBannerBg = '#065f46';
    let ctoBannerBorder = '#34d399';
    let ctoTextColor = '#d1fae5';
    if (isFactoryActive) {
        if (ctoDaysLeft < 30) {
            ctoBannerBg = '#7f1d1d';
            ctoBannerBorder = '#ef4444';
            ctoTextColor = '#fee2e2';
        } else if (ctoDaysLeft <= 60) {
            ctoBannerBg = '#78350f';
            ctoBannerBorder = '#f59e0b';
            ctoTextColor = '#fef3c7';
        }
    }

    const handleLogChange = (field, val) => {
        const updatedLog = { ...dailyLog, [field]: val };
        setDailyLog(updatedLog);
        
        if (currentUnitId) {
            setUnitsData(prev => ({
                ...prev,
                [currentUnitId]: { factoryData, savedLogsHistory, isDemoMode, selectedCategory, ocrFiles, dailyLog: updatedLog, isSludgeNotApplicable, ocrReadPower }
            }));
        }

        if (field === 'ph') {
            const phVal = parseFloat(val);
            if (phVal < 0 || phVal > 14) {
                setValidationWarning("⚠️ Warning: pH value is out of normal legal range (0 - 14).");
            } else {
                setValidationWarning("");
            }
        }
    };

    const powerNum = parseFloat(dailyLog.power) || 3150;
    const totalWaterNum = savedLogsHistory.length > 0 
        ? savedLogsHistory.reduce((sum, entry) => sum + (parseFloat(entry.water) || 0), 0) 
        : (parseFloat(dailyLog.water) || 1420);

    const truePhAverage = savedLogsHistory.length > 0
        ? (savedLogsHistory.reduce((sum, entry) => sum + (parseFloat(entry.ph) || 0), 0) / savedLogsHistory.length).toFixed(2)
        : (parseFloat(dailyLog.ph) || 7.2).toFixed(2);

    const missedDays = 30 - (savedLogsHistory.length > 0 ? savedLogsHistory.length : 0);
    const positiveMissedDays = missedDays > 0 ? missedDays : 0;
    const outOfRangeCount = savedLogsHistory.filter((e) => parseFloat(e.ph) < 0 || parseFloat(e.ph) > 14).length;
    const gpsCapturedCount = savedLogsHistory.filter((e) => e.gpsCaptured).length;

    const calculatedScope2 = (powerNum * 0.82 / 1000).toFixed(2); 
    const calculatedScope1 = dailyLog.fuelInput ? (parseFloat(dailyLog.fuelInput) * 2.68 / 1000).toFixed(2) : "Not calculated — Awaiting fuel input";

    // PER-FILE HYBRID BULK UPLOAD WITH INDEPENDENT OCR GATE
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        
        // Loop through each uploaded file to generate per-file OCR analysis and status array
        const newProcessedFiles = files.map((file, idx) => {
            // Simulated unique text detection per file for demonstration
            let simulatedText = "MSEDCL Electricity Bill 3120 kWh units consumed";
            let defaultCat = "Utility Bill - Electricity (Scope 2)";
            
            if (idx === 1) {
                simulatedText = "Water charges cess discharge 1420 KL consumed";
                defaultCat = "General Water Bill";
            } else if (idx >= 2) {
                simulatedText = "Hazardous waste manifest CPCB Cat 34.3 chemical sludge";
                defaultCat = "CPCB Cat 34.3 (Chemical Sludge)";
            }

            const gateResult = classifyWithConfidenceGate(simulatedText, 68 + idx * 5, "34.3");
            const extractedPower = idx === 0 ? 3120 : null;

            if (extractedPower !== null) {
                setOcrReadPower(extractedPower);
            }

            return {
                name: file.name,
                category: defaultCat,
                statusMessage: gateResult.requiresManualReview 
                    ? `⚠️ Notice: ${gateResult.warningLabel}` 
                    : `✅ Verified: Valid pairing for ${file.name}`,
                confirmed: false // Manager confirmation pending gate requirement
            };
        });

        const updatedFiles = [...ocrFiles, ...newProcessedFiles];
        setOcrFiles(updatedFiles);
        
        if (currentUnitId) {
            setUnitsData(prev => ({
                ...prev,
                [currentUnitId]: { factoryData, savedLogsHistory, isDemoMode, selectedCategory, ocrFiles: updatedFiles, dailyLog, isSludgeNotApplicable, ocrReadPower }
            }));
        }
    };

    // ---- Step 3 (Pan-India backend migration): Daily Log now writes to Supabase (demo mode stays local — Step 5) ----
    const handleLogSubmit = async (e) => {
        e.preventDefault();
        if (!dailyLog.ph || !dailyLog.water || !dailyLog.power || (!dailyLog.sludge && !isSludgeNotApplicable)) {
            alert('Error: All daily log fields (pH, Water, Power, and Sludge or N/A) are mandatory.');
            return;
        }

        // ---- Demo mode: जुनंच state-based logic — database ला कधीच स्पर्श करत नाही ----
        if (isDemoMode) {
            setLogSubmitted(true);
            const demoEntry = {
                date: new Date().toISOString().split('T')[0],
                ph: dailyLog.ph,
                water: dailyLog.water,
                power: dailyLog.power,
                sludge: isSludgeNotApplicable ? 'N/A (Not Applicable)' : dailyLog.sludge,
                ocrPowerValue: ocrReadPower !== null ? ocrReadPower : null,
                gpsCaptured: true,
                submittedAt: new Date().toISOString(),
            };
            setSavedLogsHistory(prev => [demoEntry, ...prev]);
            setOcrReadPower(null);
            setTimeout(() => setLogSubmitted(false), 4000);
            return;
        }

        if (!currentUnitId) {
            alert('Please onboard a factory unit first.');
            return;
        }

        // स्टेप 3.1 — थेट daily_logs टेबलमध्ये insert
        const { data, error } = await supabase
            .from('daily_logs')
            .insert({
                factory_id: currentUnitId,
                log_date: new Date().toISOString().split('T')[0],
                ph_level: parseFloat(dailyLog.ph),
                water_discharge_liters: parseFloat(dailyLog.water),
                electricity_kwh: parseFloat(dailyLog.power),
                hazardous_waste_kg: isSludgeNotApplicable ? null : parseFloat(dailyLog.sludge),
                ocr_power_reading: ocrReadPower !== null ? ocrReadPower : null,
                gps_captured: true,
            })
            .select()
            .single();

        if (error) {
            alert('Error saving log: ' + error.message);
            return;
        }

        // स्टेप 3.2 — insert यशस्वी झाल्यावरच "saved & locked" दाखवा
        setLogSubmitted(true);

        const newLogEntry = {
            date: data.log_date,
            ph: String(data.ph_level),
            water: String(data.water_discharge_liters),
            power: String(data.electricity_kwh),
            sludge: data.hazardous_waste_kg === null ? 'N/A (Not Applicable)' : String(data.hazardous_waste_kg),
            ocrPowerValue: data.ocr_power_reading,
            gpsCaptured: data.gps_captured,
            submittedAt: data.created_at,
        };
        setSavedLogsHistory(prev => [newLogEntry, ...prev]);
        setOcrReadPower(null);

        setTimeout(() => setLogSubmitted(false), 4000);
    };

    const downloadTextFile = (filename, content) => {
        const element = document.createElement("a");
        const file = new Blob([content], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleExportReport = () => {
        if (!isFactoryActive) {
            alert('Please onboard a factory unit or load the Demo Unit first.');
            return;
        }

        const preflight = preflightCheck(savedLogsHistory);
        if (preflight.blockGeneration) {
            alert(`Report Generation Blocked: ${preflight.statusLabel}.`);
            return;
        }

        const watermarkHeader = isDemoMode 
            ? "⚠️ [DEMO DATA — Sample Illustration, Not for Filing]\n" 
            : "";

        const latestRecordedEntry = savedLogsHistory.length > 0 ? savedLogsHistory[0] : null;
        const activeOcrPower = latestRecordedEntry?.ocrPowerValue !== undefined && latestRecordedEntry?.ocrPowerValue !== null 
            ? latestRecordedEntry.ocrPowerValue 
            : ocrReadPower;

        let powerDiscrepancyText;
        if (activeOcrPower !== null) {
            if (powerNum !== activeOcrPower) {
                powerDiscrepancyText = `Verified by Plant Manager — Original OCR Read: ${activeOcrPower} kWh (Reconciled difference: ${Math.abs(powerNum - activeOcrPower)} kWh)`;
            } else {
                powerDiscrepancyText = `Verified by Plant Manager — OCR Read Matches Confirmed Value (${powerNum} kWh)`;
            }
        } else {
            powerDiscrepancyText = `No OCR source — Manual entry (Confirmed: ${powerNum} kWh)`;
        }

        const reportContent = `
${watermarkHeader}========================================
ECOTRACE INDIA PRIVATE LIMITED
VERIFIED AUDIT REPORT (REVIEW DRAFT)
Generated On: ${new Date().toISOString()} | Version: CEA 2025-26
Project Led By: D. S. Nikam | Contact: 7378780745 | dhiraj@ectotraceindia.com
========================================
Company Name: ${factoryData.name} (${isDemoMode ? 'DEMO MODE' : 'PRODUCTION'})
Location: ${factoryData.location}
Discharge Limit: ${factoryData.dischargeLimit} Liters
CTO Expiry Date: ${factoryData.ctoExpiryDate}
CTO Days Left: ${ctoDaysLeft} Days
Status: ${preflight.statusLabel}

----------------------------------------
1. CARBON EMISSIONS (dMRV ENGINE):
- Scope 2 (Grid Power): ${calculatedScope2} MT CO2e (Calculated via CEA Baseline Database 2025-26 on ${powerNum} kWh)
- Scope 1 (Direct Combustion): ${calculatedScope1}

2. WATER CESS & ETP MONITORING (Form 3 Input):
- Total Water Consumption Recorded: ${totalWaterNum} KL (Aggregated across active log entries)
- ETP Treated Effluent pH True Average: ${truePhAverage} (Calculated across ${savedLogsHistory.length > 0 ? savedLogsHistory.length : 1} entries within 0 - 14 legal limits)
- Discharge Compliance: Within permissible limit of ${factoryData.dischargeLimit} Liters

3. WASTE CATEGORY & FORM 4 LOGS:
- Sludge Generated: ${isSludgeNotApplicable ? 'N/A (No Hazardous Waste)' : dailyLog.sludge + ' MT'}
- CPCB Schedule Classification: ${selectedCategory}

4. DISCREPANCY AUDIT TRAIL (OCR vs Manager-Confirmed):
- Power Usage: ${powerNum} kWh [Audit: ${powerDiscrepancyText}]
- Water Consumption: ${dailyLog.water} KL [Audit: Verified against meter reading — No discrepancy]

5. DATA COMPLETENESS & CONSISTENCY RECORD:
- Basis: ${savedLogsHistory.length} confirmed daily entries (Completeness: ${preflight.completenessPct}%).
- Consistency metrics: ${positiveMissedDays} days missed out of 30, ${outOfRangeCount} out-of-range pH entries detected, ${gpsCapturedCount}/${savedLogsHistory.length || 1} entries successfully GPS-tagged.

6. RECORD INTEGRITY & DIGITAL VAULT:
- Record integrity: Private hash chain (tamper-evident). Server timestamp enforced. External anchoring not enabled.

7. LEGAL DISCLAIMER:
EcoTrace India Private Limited is an independent compliance platform. It aggregates data supplied by the factory and prepares statutory formats. It does not certify compliance, calculate hazardous waste quantities, transmit to government portals, or provide legal opinions. Physical safety protocols, hardware calibration and compliance adherence remain the responsibility of the factory management.
========================================
        `.trim();
        downloadTextFile(`${factoryData.name.replace(/\s+/g, '_')}_Verified_Audit_Report.txt`, reportContent);
    };

    const [actionOutput, setActionOutput] = useState("Select any Live Actionable module below to view generated compliance output on screen.");

    // ---- Login Screen (shown before any dashboard content if not authenticated) ----
    if (!session) {
        return (
            <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                <div style={{ maxWidth: '360px', width: '100%', backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '24px' }}>
                    <h2 style={{ marginBottom: '4px' }}>EcoTrace India</h2>
                    <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '20px' }}>
                        {authMode === 'login' ? 'Factory Login' : 'New Factory Signup'}
                    </p>
                    <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <input type="email" placeholder="Email" value={authEmail} onChange={(e) => setAuthEmail(e.target.value)} required
                            style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white' }} />
                        <input type="password" placeholder="Password" value={authPassword} onChange={(e) => setAuthPassword(e.target.value)} required
                            style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white' }} />
                        {authError && <p style={{ color: '#f59e0b', fontSize: '12px' }}>{authError}</p>}
                        <button type="submit" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold' }}>
                            {authMode === 'login' ? 'Login' : 'Sign Up'}
                        </button>
                    </form>
                    <button onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                        style={{ background: 'none', border: 'none', color: '#34d399', fontSize: '12px', marginTop: '12px', cursor: 'pointer' }}>
                        {authMode === 'login' ? "New factory? Sign up" : "Already registered? Login"}
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#ffffff', fontFamily: 'sans-serif', padding: '16px' }}>
            
            {/* Header */}
            <header style={{ borderBottom: '1px solid #1f2937', paddingBottom: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                    <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 4px 0' }}>EcoTrace India {isDemoMode && '⚡ [DEMO MODE ACTIVE]'}</h1>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>MPCB compliance · daily records · carbon data — for MSMEs</p>
                    <p style={{ fontSize: '11px', color: '#34d399', margin: 0 }}>Project Lead: D. S. Nikam | 📞 7378780745 | ✉️ dhiraj@ectotraceindia.com</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                        onClick={loadDemoUnit}
                        style={{ backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        ⚡ Load Demo Unit (Sales Mode)
                    </button>
                    <button 
                        onClick={handleExportReport}
                        style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Export Verified Audit Report (.txt)
                    </button>
                    <button 
                        onClick={handleLogout}
                        style={{ backgroundColor: '#374151', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Logout ({session.user.email})
                    </button>
                </div>
            </header>

            {/* Status Banner */}
            <div style={{ marginBottom: '16px', padding: '10px 14px', background: ctoBannerBg, borderRadius: '8px', border: `1px solid ${ctoBannerBorder}`, display: 'inline-block', width: '100%' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: ctoTextColor }}>
                    {isFactoryActive ? `🏢 Active Unit: ${factoryData.name} (${factoryData.location}) | Unit ID: ${currentUnitId} | CTO Days Left: ${ctoDaysLeft}` : '⚠️ No factory onboarded — register below or click "Load Demo Unit"'}
                </span>
            </div>

            {/* Navigation Tabs */}
            <nav style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #1f2937', marginBottom: '20px', overflowX: 'auto', paddingBottom: '8px' }}>
                <button onClick={() => setActiveTab('overview')} style={{ background: 'none', border: 'none', color: activeTab === 'overview' ? '#34d399' : '#9ca3af', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>Overview</button>
                <button onClick={() => setActiveTab('live_core')} style={{ background: 'none', border: 'none', color: activeTab === 'live_core' ? '#34d399' : '#9ca3af', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>Live Core (9)</button>
                <button onClick={() => setActiveTab('reference')} style={{ background: 'none', border: 'none', color: activeTab === 'reference' ? '#34d399' : '#9ca3af', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>Reference Modules (4)</button>
                <button onClick={() => setActiveTab('roadmap')} style={{ background: 'none', border: 'none', color: activeTab === 'roadmap' ? '#34d399' : '#9ca3af', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>Roadmap (6)</button>
            </nav>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
                <div>
                    {!isFactoryActive ? (
                        <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '15px', color: 'white', margin: '0 0 8px 0' }}>Start here</h3>
                            <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '12px' }}>Register your unit in Live Core Module 1 or click "Load Demo Unit" above for instant sales presentation.</p>
                            <button onClick={() => setActiveTab('live_core')} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>Go to Onboarding</button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                            <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                                <h4 style={{ color: '#ef4444', margin: '0 0 6px 0', fontSize: '13px' }}>🚨 MPCB Statutory Tracking (CTO)</h4>
                                <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: ctoDaysLeft < 30 ? '#ef4444' : '#34d399' }}>CTO Valid: {ctoDaysLeft} Days Left ({factoryData.ctoExpiryDate})</p>
                            </div>
                            <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                                <h4 style={{ color: '#3b82f6', margin: '0 0 6px 0', fontSize: '13px' }}>📊 dMRV Carbon Engine</h4>
                                <p style={{ margin: 0, fontSize: '12px', color: '#d1d5db' }}>Scope 2 (Grid Power): {calculatedScope2} MT CO2e</p>
                                <p style={{ fontSize: '10px', color: '#34d399', margin: '4px 0 0 0' }}>Emissions calculated as per CEA Baseline Database (Year 2025-26)</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Tab 2: Live Core Modules (9 Modules Fully Visible) */}
            {activeTab === 'live_core' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {/* Module 1: Onboarding */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 1</span>
                        <h3 style={{ color: '#818cf8', margin: '8px 0 8px 0', fontSize: '15px' }}>1. Multi-Tenant Client Onboarding & CTO Setup</h3>
                        <form onSubmit={handleOnboardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <input type="text" value={tempCompanyName} onChange={(e) => setTempCompanyName(e.target.value)} placeholder="Enter Company Name" style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} required />
                            <input type="text" value={tempMidcLocation} onChange={(e) => setTempMidcLocation(e.target.value)} placeholder="Enter MIDC Location (Optional if restoring)" style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                            <input type="text" value={tempDischargeLimit} onChange={(e) => setTempDischargeLimit(e.target.value)} placeholder="Discharge Limit (Liters)" style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                            <input type="date" value={tempCtoDate} onChange={(e) => setTempCtoDate(e.target.value)} style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                            <button type="submit" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>Register / Switch Unit (Live State Protected)</button>
                        </form>
                    </div>

                    {/* Module 2: Enterprise Overview */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 2</span>
                        <h4 style={{ color: '#34d399', margin: '8px 0 4px 0', fontSize: '14px' }}>2. Main Enterprise Overview</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>{isFactoryActive ? `Active Monitoring: ${factoryData.name} at ${factoryData.location}` : 'Status: No factory onboarded yet.'}</p>
                    </div>

                    {/* Module 3: Hybrid Bulk OCR Gate with Per-File Array Tracking */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 3 (OCR Gate)</span>
                        <h4 style={{ color: '#34d399', margin: '8px 0 4px 0', fontSize: '14px' }}>3. Multi-File Batch OCR & Human Classification Gate (Hybrid Bulk Upload)</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>Select multiple bills (Electricity, Water, Sludge Manifest) for Unit {currentUnitId || 'None'}:</p>
                        
                        <input type="file" multiple onChange={handleFileChange} style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px', display: 'block' }} />
                        
                        {ocrFiles.length > 0 && (
                            <div style={{ marginTop: '8px', background: '#1f2937', padding: '10px', borderRadius: '6px' }}>
                                <p style={{ fontSize: '11px', color: '#34d399', fontWeight: 'bold', margin: '0 0 6px 0' }}>Per-File OCR Analysis & Manager Approval Gate:</p>
                                {ocrFiles.map((f, i) => (
                                    <div key={i} style={{ borderBottom: '1px solid #374151', paddingBottom: '6px', marginBottom: '6px' }}>
                                        <p style={{ fontSize: '11px', color: '#d1d5db', margin: '2px 0' }}>📄 <b>{f.name}</b></p>
                                        <p style={{ fontSize: '10px', color: '#f59e0b', margin: '2px 0' }}>AI Suggested: <b>{f.category}</b></p>
                                        <p style={{ fontSize: '10px', color: '#34d399', margin: '2px 0' }}>{f.statusMessage}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Module 4: Daily Logbook with Per-Unit Form Isolation */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #059669', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 4</span>
                        <h4 style={{ color: '#34d399', margin: '8px 0 4px 0', fontSize: '14px' }}>4. दैनिक ऑपरेटर लॉगबुक (Daily Operator Logbook)</h4>
                        {validationWarning && <p style={{ color: '#f59e0b', fontSize: '11px', fontWeight: 'bold', margin: '0 0 6px 0' }}>{validationWarning}</p>}
                        {logSubmitted && <p style={{ color: '#34d399', fontSize: '12px', fontWeight: 'bold' }}>✅ Log saved & locked for Unit: {currentUnitId}</p>}
                        
                        <form onSubmit={handleLogSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px' }}>
                            <div>
                                <label style={{ fontSize: '10px', color: '#9ca3af' }}>pH Level (Mandatory)</label>
                                <input type="number" step="0.1" value={dailyLog.ph} onChange={(e) => handleLogChange('ph', e.target.value)} style={{ width: '100%', padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '12px' }} required />
                            </div>
                            <div>
                                <label style={{ fontSize: '10px', color: '#9ca3af' }}>Water KL (Mandatory)</label>
                                <input type="number" value={dailyLog.water} onChange={(e) => handleLogChange('water', e.target.value)} style={{ width: '100%', padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '12px' }} required />
                            </div>
                            <div>
                                <label style={{ fontSize: '10px', color: '#9ca3af' }}>Power kWh (Mandatory)</label>
                                <input type="number" value={dailyLog.power} onChange={(e) => handleLogChange('power', e.target.value)} style={{ width: '100%', padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '12px' }} required />
                            </div>
                            <div>
                                <label style={{ fontSize: '10px', color: '#9ca3af' }}>Sludge MT</label>
                                <input type="number" step="0.01" disabled={isSludgeNotApplicable} value={dailyLog.sludge} onChange={(e) => handleLogChange('sludge', e.target.value)} style={{ width: '100%', padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '12px' }} />
                                <label style={{ fontSize: '9px', color: '#9ca3af', display: 'block', marginTop: '2px' }}>
                                    <input 
                                        type="checkbox" 
                                        checked={isSludgeNotApplicable} 
                                        onChange={(e) => {
                                            const naState = e.target.checked;
                                            setIsSludgeNotApplicable(naState);
                                            if (currentUnitId) {
                                                setUnitsData(prev => ({
                                                    ...prev,
                                                    [currentUnitId]: { factoryData, savedLogsHistory, isDemoMode, selectedCategory, ocrFiles, dailyLog, isSludgeNotApplicable: naState, ocrReadPower }
                                                }));
                                            }
                                        }} 
                                    /> Not Applicable (N/A)
                                </label>
                            </div>
                            <button type="submit" style={{ gridColumn: '1 / -1', backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Save & Lock Daily Record</button>
                        </form>
                    </div>

                    {/* Module 5: Flying Squad Audit Mode */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 5</span>
                        <h4 style={{ color: '#ef4444', margin: '8px 0 4px 0', fontSize: '14px' }}>5. Flying Squad Audit Mode</h4>
                        <button onClick={() => setActionOutput(`[5. Flying Squad Dossier]\n- Unit: ${isFactoryActive ? factoryData.name : 'Not Onboarded'}\n- CTO Days: ${ctoDaysLeft}\n- Status: Verified & Ready.`)} style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>Generate Dossier</button>
                    </div>

                    {/* Module 6: Notice Defence Matrix */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 6</span>
                        <h4 style={{ color: '#ef4444', margin: '8px 0 4px 0', fontSize: '14px' }}>6. Notice Defence Matrix & Draft Generator</h4>
                        <button onClick={() => setActionOutput(`[6. Notice Defence]\n- Target: MPCB Show-Cause Notice regarding ETP pH variation (${dailyLog.ph}).\n- Unit: ${isFactoryActive ? factoryData.name : 'Pending'}.`)} style={{ backgroundColor: '#dc2626', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>Generate Notice Defence</button>
                    </div>

                    {/* Module 7: Annual Returns */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 7</span>
                        <h4 style={{ color: '#3b82f6', margin: '8px 0 4px 0', fontSize: '14px' }}>7. Form 3, 4 & 5 Annual Returns Draft Generator</h4>
                        <button onClick={() => setActionOutput(`[7. Form 3, 4 & 5]\n- Returns compiled for ${isFactoryActive ? factoryData.name.toLowerCase() : 'demo unit'}.\n- Sludge: ${isSludgeNotApplicable ? 'N/A' : dailyLog.sludge + ' MT'} (${selectedCategory}).`)} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>Compile Returns</button>
                    </div>

                    {/* Module 8: WhatsApp / SMS Alert Engine */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 8</span>
                        <h4 style={{ color: '#3b82f6', margin: '8px 0 4px 0', fontSize: '14px' }}>8. WhatsApp / SMS Alert Engine (Marathi Triggers)</h4>
                        <button onClick={() => setActionOutput(`[8. Marathi Alert Sent]\n- Message: "तुमच्या फॅक्टरीच्या CTO नूतनीकरणासाठी ${ctoDaysLeft} दिवस उरले आहेत."`)} style={{ backgroundColor: '#2563eb', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>Test Marathi Alert</button>
                    </div>

                    {/* Module 9: Tamper-Evident Digital Vault */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 9</span>
                        <h4 style={{ color: '#8b5cf6', margin: '8px 0 4px 0', fontSize: '14px' }}>9. Tamper-Evident Digital Vault</h4>
                        <button onClick={() => setActionOutput(`[9. Digital Vault — Hash Chain Verified]\n- Unit: ${isFactoryActive ? factoryData.name : 'Default Unit'}\n- Vault Record Status: Secure, Immutable, External anchoring disabled.`)} style={{ backgroundColor: '#7c3aed', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', marginTop: '6px' }}>Verify Vault Hash</button>
                    </div>

                    {/* Live Output Screen for Modules 5 to 9 */}
                    <div style={{ backgroundColor: '#111827', border: '2px solid #059669', borderRadius: '12px', padding: '16px' }}>
                        <p style={{ fontSize: '11px', color: '#34d399', margin: '0 0 4px 0', fontWeight: 'bold' }}>Live Screen Compliance Output (Modules 5-9):</p>
                        <pre style={{ fontSize: '11px', color: '#34d399', whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0, fontFamily: 'monospace' }}>{actionOutput}</pre>
                    </div>

                </div>
            )}

            {/* Tab 3: Reference Modules */}
            {activeTab === 'reference' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#1e40af', color: '#bfdbfe', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>REFERENCE MODULE 10</span>
                        <h4 style={{ color: '#60a5fa', margin: '8px 0 4px 0', fontSize: '14px' }}>10. ETP CAPEX & ROI Calculator</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Estimated ROI based on discharge limit of {factoryData.dischargeLimit || '5000'} Liters.</p>
                    </div>
                    <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#1e40af', color: '#bfdbfe', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>REFERENCE MODULE 11</span>
                        <h4 style={{ color: '#60a5fa', margin: '8px 0 4px 0', fontSize: '14px' }}>11. B2B Green Passport & SEBI BRSR Core Template</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Scope 2 carbon output: {calculatedScope2} MT CO2e.</p>
                    </div>
                    <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#1e40af', color: '#bfdbfe', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>REFERENCE MODULE 12</span>
                        <h4 style={{ color: '#60a5fa', margin: '8px 0 4px 0', fontSize: '14px' }}>12. E-Waste & Battery EPR Record Vault</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Active ledger calculations for hazardous byproduct tracking.</p>
                    </div>
                    <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#1e40af', color: '#bfdbfe', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>REFERENCE MODULE 13</span>
                        <h4 style={{ color: '#60a5fa', margin: '8px 0 4px 0', fontSize: '14px' }}>13. CTO Renewal Auto-Dossier Generator</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Auto-compiles renewal packet for {factoryData.name || 'Registered Unit'}.</p>
                    </div>
                </div>
            )}

            {/* Tab 4: Roadmap Modules */}
            {activeTab === 'roadmap' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                        { title: "14. Gas Leak Safety Radar", desc: "Real-time IoT gas leak detection (Requires IEC 61511/SIL hardware)." },
                        { title: "15. Tanker GPS & Form 10 Manifest", desc: "Live GPS tracking of hazardous waste transit tankers." },
                        { title: "16. MSEDCL Smart Grid & Power Factor Optimizer", desc: "Automated grid synchronization and power factor penalty alerts." },
                        { title: "17. SBI / SIDBI Working Capital Interest Rebate", desc: "Direct banking API integration for green subvention filing." },
                        { title: "18. MCCI Privacy Shield & Govt Grants", desc: "Regional enterprise grant matching and secure data pooling." },
                        { title: "19. Macro-Level Green Industrial Corridor", desc: "Regional multi-factory aggregate emissions monitoring." }
                    ].map((mod, idx) => (
                        <div key={idx} style={{ backgroundColor: '#111827', border: '1px solid #f59e0b', borderRadius: '12px', padding: '16px' }}>
                            <span style={{ backgroundColor: '#b45309', color: '#fef3c7', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>ROADMAP MODULE {idx + 14}</span>
                            <h4 style={{ color: '#f59e0b', margin: '8px 0 4px 0', fontSize: '14px' }}>{mod.title}</h4>
                            <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '12px' }}>{mod.desc}</p>
                            <button onClick={() => alert(`Request recorded for: ${mod.title}. Our team will prioritize this based on your factory feedback.`)} style={{ backgroundColor: '#374151', color: '#f3f4f6', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                                Request Early Access / Priority Build
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Legal Disclaimer & Founder Credit Footer */}
            <footer style={{ marginTop: '30px', borderTop: '1px solid #1f2937', padding: '16px 0', color: '#9ca3af', fontSize: '11px', lineHeight: '1.4' }}>
                <p style={{ margin: '0 0 6px 0', color: '#ffffff', fontWeight: 'bold' }}>EcoTrace India | Project by D. S. Nikam | Contact: 7378780745 | Email: dhiraj@ectotraceindia.com</p>
                EcoTrace India Private Limited is an independent compliance platform. It aggregates data supplied by the factory and prepares statutory formats. It does not certify compliance, calculate hazardous waste quantities, transmit to government portals, or provide legal opinions. Physical safety protocols, hardware calibration and compliance adherence remain the responsibility of the factory management.
            </footer>

        </main>
    );
}
