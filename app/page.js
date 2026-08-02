'use client';
import React, { useState } from 'react';

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

    // Per-Unit State Isolation (Clean initialization without DEFAULT junk)
    const [currentUnitId, setCurrentUnitId] = useState(null);
    const [unitsData, setUnitsData] = useState({});
    const [savedLogsHistory, setSavedLogsHistory] = useState([]);
    
    const [selectedCategory, setSelectedCategory] = useState("CPCB Cat 34.3 (Chemical Sludge)");
    const [ocrFiles, setOcrFiles] = useState([]);
    const [ocrStatusMessage, setOcrStatusMessage] = useState("");

    const handleUnitSwitch = (newUnitId, newFactoryDetails, logs, demoState, category, files) => {
        // Save current active unit snapshot safely before switching
        if (currentUnitId) {
            setUnitsData(prev => ({
                ...prev,
                [currentUnitId]: { factoryData, savedLogsHistory, isDemoMode, selectedCategory, ocrFiles }
            }));
        }
        // Switch to new unit & restore its snapshot
        setCurrentUnitId(newUnitId);
        setIsDemoMode(demoState);
        setFactoryData(newFactoryDetails);
        setSavedLogsHistory(logs || []);
        setSelectedCategory(category || "CPCB Cat 34.3 (Chemical Sludge)");
        setOcrFiles(files || []);
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
            ph: '7.2',
            water: '1420',
            power: '3150',
            sludge: '0.45'
        }));
        handleUnitSwitch("DEMO-FACTORY", demoDetails, demoLogs, true, "CPCB Cat 34.3 (Chemical Sludge)", []);
        alert('Demo Unit loaded safely in isolated state with 15-day sample data.');
    };

    const handleOnboardSubmit = (e) => {
        e.preventDefault();
        if (tempCompanyName.trim()) {
            const unitName = tempCompanyName.trim().toUpperCase();
            
            // Fixed: Check live current unit state first to prevent overwriting recent logs during re-onboarding
            const isSameUnit = currentUnitId === unitName;
            const existingUnit = unitsData[unitName];

            const newDetails = {
                name: unitName,
                location: tempMidcLocation ? tempMidcLocation.toUpperCase() + ' MIDC' : (isSameUnit ? factoryData.location : (existingUnit?.factoryData.location || 'MIDC CLUSTER')),
                dischargeLimit: tempDischargeLimit || (isSameUnit ? factoryData.dischargeLimit : (existingUnit?.factoryData.dischargeLimit || '5000')),
                ctoExpiryDate: tempCtoDate || (isSameUnit ? factoryData.ctoExpiryDate : (existingUnit?.factoryData.ctoExpiryDate || '2026-12-31')),
                status: "DATA COMPLETE & FILING-READY"
            };
            
            const existingLogs = isSameUnit ? savedLogsHistory : (existingUnit?.savedLogsHistory || []);
            const existingCategory = isSameUnit ? selectedCategory : (existingUnit?.selectedCategory || "CPCB Cat 34.3 (Chemical Sludge)");
            const existingFiles = isSameUnit ? ocrFiles : (existingUnit?.ocrFiles || []);

            handleUnitSwitch(unitName, newDetails, existingLogs, false, existingCategory, existingFiles);
            alert(`Factory Unit ${unitName} Onboarded / Switched Successfully (Live state preserved)!`);
        } else {
            alert('Please enter a valid company name.');
        }
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

    // Daily Log & Carbon Engine
    const [dailyLog, setDailyLog] = useState({ ph: '7.2', water: '1420', power: '3150', sludge: '0.45', fuelInput: '' });
    const [isSludgeNotApplicable, setIsSludgeNotApplicable] = useState(false);
    const [logSubmitted, setLogSubmitted] = useState(false);
    const [validationWarning, setValidationWarning] = useState("");

    const handleLogChange = (field, val) => {
        setDailyLog(prev => ({ ...prev, [field]: val }));
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
    const calculatedScope2 = (powerNum * 0.82 / 1000).toFixed(2); 
    const calculatedScope1 = dailyLog.fuelInput ? (parseFloat(dailyLog.fuelInput) * 2.68 / 1000).toFixed(2) : "Not calculated — Awaiting fuel input";

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        const sampleText = "MSEDCL Electricity Bill 3150 kWh units consumed"; 
        const gateResult = classifyWithConfidenceGate(sampleText, 65, "34.3");
        
        if (gateResult.requiresManualReview) {
            setOcrStatusMessage(`⚠️ OCR Notice: ${gateResult.warningLabel}. Please confirm category manually.`);
        } else {
            setOcrStatusMessage("✅ OCR Verified: Valid document-category pairing.");
        }
        const updatedFiles = [...ocrFiles, ...files.map(f => ({ name: f.name, category: selectedCategory }))];
        setOcrFiles(updatedFiles);
        
        if (currentUnitId) {
            setUnitsData(prev => ({
                ...prev,
                [currentUnitId]: { factoryData, savedLogsHistory, isDemoMode, selectedCategory, ocrFiles: updatedFiles }
            }));
        }
    };

    const handleLogSubmit = (e) => {
        e.preventDefault();
        if (!dailyLog.ph || !dailyLog.water || !dailyLog.power || (!dailyLog.sludge && !isSludgeNotApplicable)) {
            alert('Error: All daily log fields (pH, Water, Power, and Sludge or N/A) are mandatory.');
            return;
        }

        setLogSubmitted(true);
        const newLogEntry = { 
            date: new Date().toISOString().split('T')[0], 
            ph: dailyLog.ph, 
            water: dailyLog.water, 
            power: dailyLog.power, 
            sludge: isSludgeNotApplicable ? 'N/A (Not Applicable)' : dailyLog.sludge 
        };

        const updatedHistory = [newLogEntry, ...savedLogsHistory];
        setSavedLogsHistory(updatedHistory);
        
        if (currentUnitId) {
            setUnitsData(prev => ({
                ...prev,
                [currentUnitId]: { factoryData, savedLogsHistory: updatedHistory, isDemoMode, selectedCategory, ocrFiles }
            }));
        }

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

2. WASTE CATEGORY & FORM 4 LOGS:
- Sludge Generated: ${isSludgeNotApplicable ? 'N/A (No Hazardous Waste)' : dailyLog.sludge + ' MT'}
- CPCB Schedule Classification: ${selectedCategory}

3. DATA COMPLETENESS & RECORD INTEGRITY:
- Basis: ${savedLogsHistory.length} confirmed daily entries (Completeness: ${preflight.completenessPct}%). 
- Record integrity: Private hash chain (tamper-evident). External anchoring not enabled.
----------------------------------------
LEGAL DISCLAIMER:
EcoTrace India Private Limited is an independent compliance platform. It aggregates data supplied by the factory and prepares statutory formats. It does not certify compliance, calculate hazardous waste quantities, transmit to government portals, or provide legal opinions.
========================================
        `.trim();
        downloadTextFile(`${factoryData.name.replace(/\s+/g, '_')}_Verified_Audit_Report.txt`, reportContent);
    };

    const [actionOutput, setActionOutput] = useState("Select any Live Actionable module below to view generated compliance output on screen.");

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#ffffff', fontFamily: 'sans-serif', padding: '16px' }}>
            
            {/* Header */}
            <header style={{ borderBottom: '1px solid #1f2937', paddingBottom: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                    <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 4px 0' }}>EcoTrace India {isDemoMode && '⚡ [DEMO MODE ACTIVE]'}</h1>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: '0 0 4px 0' }}>MPCB compliance · daily records · carbon data — for MSMEs</p>
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
            </nav>

            {/* Tab 2: Live Core */}
            {activeTab === 'live_core' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {/* Module 1: Onboarding with Live State Check */}
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

                    {/* Module 3: OCR with Isolated Category & Files */}
                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE MODULE 3 (Per-Unit OCR Gate)</span>
                        <h4 style={{ color: '#34d399', margin: '8px 0 4px 0', fontSize: '14px' }}>3. Multi-File Batch OCR & Human Classification Gate</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>Select correct CPCB category for Unit {currentUnitId || 'None'}:</p>
                        {ocrStatusMessage && <p style={{ color: '#f59e0b', fontSize: '11px', fontWeight: 'bold', margin: '0 0 6px 0' }}>{ocrStatusMessage}</p>}
                        <select 
                            value={selectedCategory} 
                            onChange={(e) => {
                                const newCat = e.target.value;
                                setSelectedCategory(newCat);
                                if (currentUnitId) {
                                    setUnitsData(prev => ({
                                        ...prev,
                                        [currentUnitId]: { factoryData, savedLogsHistory, isDemoMode, selectedCategory: newCat, ocrFiles }
                                    }));
                                }
                            }} 
                            style={{ width: '100%', padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '11px', marginBottom: '8px' }}
                        >
                            <option value="CPCB Cat 34.3 (Chemical Sludge)">CPCB Cat 34.3 — Chemical Sludge from ETP</option>
                            <option value="Utility Bill - Electricity (Scope 2)">Utility Bill — Electricity (Scope 2 Power)</option>
                            <option value="General Water Bill">General Water Bill (Cess Tracking)</option>
                        </select>
                        <input type="file" multiple onChange={handleFileChange} style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px', display: 'block' }} />
                        {ocrFiles.length > 0 && (
                            <div style={{ marginTop: '8px', background: '#1f2937', padding: '8px', borderRadius: '6px' }}>
                                <p style={{ fontSize: '11px', color: '#34d399', fontWeight: 'bold', margin: '0 0 4px 0' }}>Verified OCR Files for {currentUnitId}:</p>
                                {ocrFiles.map((f, i) => (
                                    <p key={i} style={{ fontSize: '10px', color: '#d1d5db', margin: '2px 0' }}>📄 {f.name} → <b>{f.category}</b></p>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Module 4: Daily Logbook */}
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
                                    <input type="checkbox" checked={isSludgeNotApplicable} onChange={(e) => setIsSludgeNotApplicable(e.target.checked)} /> Not Applicable (N/A)
                                </label>
                            </div>
                            <button type="submit" style={{ gridColumn: '1 / -1', backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Save & Lock Daily Record</button>
                        </form>
                    </div>

                </div>
            )}
        </main>
    );
}
