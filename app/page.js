'use client';
import React, { useState, useEffect } from 'react';

export default function EcoTraceDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModule, setActiveModule] = useState('onboard'); 
    
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

    const handleOnboardSubmit = (e) => {
        e.preventDefault();
        if (tempCompanyName.trim()) {
            setFactoryData({
                name: tempCompanyName.trim().toUpperCase(),
                location: tempMidcLocation ? tempMidcLocation.toUpperCase() + ' MIDC' : 'MIDC CLUSTER',
                dischargeLimit: tempDischargeLimit || '5000',
                ctoExpiryDate: tempCtoDate || '2026-12-31',
                status: "COMPLIANT & AUDIT READY"
            });
            setActiveModule('mainDashboard');
            alert('Industrial Unit & CTO Data Onboarded Successfully!');
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

    const getCtoColor = (days) => {
        if (days <= 15) return '#ef4444'; 
        if (days <= 30) return '#f59e0b'; 
        return '#34d399';                
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

    const handleExportPdf = () => {
        if (!isFactoryActive) {
            alert('Please onboard a factory unit first.');
            return;
        }
        const reportContent = `
========================================
ECOTRACE INDIA PRIVATE LIMITED
COMPLIANCE & AUDIT REPORT (FORM V READY)
========================================
Company Name: ${factoryData.name}
Location: ${factoryData.location}
Discharge Limit: ${factoryData.dischargeLimit} Liters
CTO Expiry Date: ${factoryData.ctoExpiryDate}
CTO Days Left: ${ctoDaysLeft} Days
Status: COMPLIANT & AUDIT READY
----------------------------------------
LEGAL DISCLAIMER: EcoTrace India Private Limited acts solely as a software interface provider aggregating IoT data and statutory records.
========================================
        `;
        downloadTextFile(`${factoryData.name.replace(/\s+/g, '_')}_Compliance_Report.txt`, reportContent);
    };

    const handleExportAuditPackage = () => {
        if (!isFactoryActive) {
            alert('Please onboard a factory unit first.');
            return;
        }
        const auditContent = `
========================================
VERIFIED AUDIT PACKAGE & DIGITAL VAULT DOSSIER
========================================
Company Name: ${factoryData.name}
Location: ${factoryData.location}
Digital Vault Hash: 0xa8f392c1b4e87019d6f2231e (Tamper-Evident)
ETP Health Status: 98% Optimal (Estimated / Awaiting Plant Audit Data)
Power Factor Status: 0.94 (Above Penalty Threshold 0.90)
----------------------------------------
Prepared for MPCB Flying Squad / Review
========================================
        `;
        downloadTextFile(`${factoryData.name.replace(/\s+/g, '_')}_Audit_Package.txt`, auditContent);
    };

    const [auditResult, setAuditResult] = useState(null);
    const [loadingAudit, setLoadingAudit] = useState(false);

    const runSafetyAudit = async () => {
        if (!isFactoryActive) return;
        setLoadingAudit(true);
        try {
            const res = await fetch('/api/compliance-check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    factoryId: factoryData.name.replace(/\s+/g, '_'), 
                    powerFactor: 0.90, 
                    phLevel: 8.9 
                })
            });
            const data = await res.json();
            setAuditResult(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingAudit(false);
        }
    };

    useEffect(() => {
        if (isFactoryActive) {
            runSafetyAudit();
        }
    }, [factoryData.name]);

    const [macroData] = useState({
        corridorName: "EcoTrace's First Green Industrial Corridor Deployment", 
        activeMonitoringUnits: "Demo / Projected Data — Awaiting Real Regional Onboarding",
        regionalAggregates: {
            totalCarbonEmissionTonnes: "Demo Data (1250.4 T Projected)",
            totalWaterConsumptionKL: 45000,
            greenCompliancePercentage: "94.5% (Projected Sample)"
        },
        privacyShieldStatus: "Active - Privacy-Protected Aggregation Maintained" 
    });

    // Daily Log State with G5 Sample Tagging
    const [dailyLog, setDailyLog] = useState({ ph: '7.2', water: '1420', power: '3150', sludge: '0.45' });
    const [logSubmitted, setLogSubmitted] = useState(false);

    const handleLogSubmit = (e) => {
        e.preventDefault();
        setLogSubmitted(true);
        setTimeout(() => setLogSubmitted(false), 4000);
    };

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#ffffff', fontFamily: 'sans-serif', position: 'relative' }}>
            
            {/* Top Navigation Bar */}
            <header style={{ borderBottom: '1px solid #1f2937', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111827', flexWrap: 'wrap', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {isMenuOpen ? '✕ Close Console' : '☰ Global Navigation'}
                    </button>
                    <div>
                        <h1 style={{ fontSize: '16px', fontWeight: 'bold', color: '#10b981', margin: '0' }}>EcoTrace India Private Limited</h1>
                        <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0 }}>MPCB Legal Shield & dMRV Green Operating System v3.0.1 | Contact: 7378780745</p>
                    </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <div style={{ backgroundColor: '#1f2937', border: '1px solid #374151', padding: '6px 10px', borderRadius: '8px', fontSize: '11px', color: isFactoryActive ? '#34d399' : '#f59e0b', fontWeight: 'bold' }}>
                        {isFactoryActive ? `${factoryData.name} (${factoryData.location})` : 'No Factory Onboarded — Please Register Your Unit'}
                    </div>
                    {isFactoryActive && (
                        <>
                            <button 
                                onClick={handleExportPdf}
                                style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Export Report (.txt)
                            </button>
                            <button 
                                onClick={handleExportAuditPackage}
                                style={{ backgroundColor: '#374151', color: 'white', border: 'none', padding: '6px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                                Export Verified Audit Package (.txt)
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* Global Command Center Drawer */}
            {isMenuOpen && (
                <div style={{ position: 'absolute', top: '70px', left: 0, width: '100%', backgroundColor: '#111827', borderBottom: '2px solid #1f2937', zIndex: 100, padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #1f2937', paddingBottom: '10px' }}>
                        <h3 style={{ fontSize: '13px', color: '#34d399', textTransform: 'uppercase', margin: 0, letterSpacing: '1px' }}>🌐 Global Command Center - Enterprise Modules</h3>
                        <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '14px' }}>✕ Close</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#10b981' }}>CORE PLATFORM</div>
                            <div style={{ padding: '8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('mainDashboard'); setIsMenuOpen(false); }}>🏠 Main Enterprise Overview</div>
                            <div style={{ padding: '8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('greenCorridor'); setIsMenuOpen(false); }}>🌐 Macro Green Industrial Corridor</div>
                            <div style={{ padding: '8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('ocrScan'); setIsMenuOpen(false); }}>⚡ Multi-File Batch OCR & dMRV Scan</div>
                            <div style={{ padding: '8px', backgroundColor: '#065f46', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', color: '#d1fae5' }} onClick={() => { setActiveModule('dailyLogbook'); setIsMenuOpen(false); }}>📝 Daily Operator Logbook ⭐</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#ef4444' }}>[A] RISK & EMERGENCY SHIELD</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('risk1'); setIsMenuOpen(false); }}>• Flying Squad Audit Mode</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('risk2'); setIsMenuOpen(false); }}>• Toxic Gas Leak Radar</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('risk3'); setIsMenuOpen(false); }}>• Notice Defense Matrix</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#3b82f6' }}>[B] UTILITY & [C] STATUTORY</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('utility1'); setIsMenuOpen(false); }}>• MSEDCL Smart Grid & PF</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('utility2'); setIsMenuOpen(false); }}>• ETP CAPEX & ROI Calculator</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('stat1'); setIsMenuOpen(false); }}>• Form 3, 4 & 5 Annual Returns</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('ctoDossier'); setIsMenuOpen(false); }}>• CTO Renewal Auto-Dossier</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('alertsEngine'); setIsMenuOpen(false); }}>• WhatsApp/SMS Alert Engine ⭐</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#10b981' }}>[D] SUPPLY CHAIN & ESG</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('greenPassport'); setIsMenuOpen(false); }}>• B2B Green Passport & BRSR</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('tankerGPS'); setIsMenuOpen(false); }}>• Tanker GPS & Form 10 Manifest</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('ewaste'); setIsMenuOpen(false); }}>• E-Waste & Battery EPR Vault</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('sbiRebate'); setIsMenuOpen(false); }}>• SBI / SIDBI Loan Rebate</div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#8b5cf6' }}>[E] COMMAND & ONBOARDING</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('blockchain'); setIsMenuOpen(false); }}>• Tamper-Evident Digital Vault</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('mcciGrants'); setIsMenuOpen(false); }}>• MCCI Privacy Shield & Grants</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', color: '#818cf8', fontWeight: 'bold' }} onClick={() => { setActiveModule('onboard'); setIsMenuOpen(false); }}>🏢 Multi-Tenant Client Onboarding</div>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
                
                {!isFactoryActive && activeModule !== 'onboard' && (
                    <div style={{ marginBottom: '20px', padding: '20px', background: '#1f2937', borderRadius: '12px', border: '1px solid #f59e0b', textAlign: 'center' }}>
                        <h3 style={{ color: '#f59e0b', margin: '0 0 8px 0', fontSize: '16px' }}>⚠️ No Factory Onboarded — Please Register Your Unit</h3>
                        <p style={{ color: '#d1d5db', margin: '0 0 16px 0', fontSize: '13px' }}>Please register your factory details to activate live compliance tracking and dynamic reporting.</p>
                        <button 
                            onClick={() => setActiveModule('onboard')}
                            style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
                        >
                            + Go to Multi-Tenant Client Onboarding
                        </button>
                    </div>
                )}

                {/* G10 Cleaned Compliance Advisory Panel */}
                <div style={{ marginBottom: '20px', padding: '16px', background: '#111827', borderRadius: '12px', border: '1px solid #3b82f6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                            <h4 style={{ color: '#60a5fa', margin: '0 0 4px 0', fontSize: '14px' }}>Model 1: Human-in-the-Loop Compliance Advisory</h4>
                            <p style={{ color: '#9ca3af', margin: 0, fontSize: '11px' }}>Minimized Machine Trip Risk / Automated Advisory Mode (Human-in-the-Loop)</p>
                        </div>
                        <button 
                            onClick={runSafetyAudit}
                            style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}
                            disabled={loadingAudit || !isFactoryActive}
                        >
                            {loadingAudit ? 'Running Auto-Check...' : 'Refresh Safety Check'}
                        </button>
                    </div>

                    {auditResult && (
                        <div style={{ marginTop: '12px', padding: '12px', background: '#0d1117', borderRadius: '8px', border: '1px solid #1f2937', color: '#34d399', fontSize: '11px', fontFamily: 'monospace', overflowX: 'auto' }}>
                            <pre style={{ margin: 0 }}>{JSON.stringify(auditResult, null, 2)}</pre>
                        </div>
                    )}
                </div>

                {activeModule === 'mainDashboard' && (
                    <div>
                        <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Active Monitored Enterprise</p>
                            <h2 style={{ color: '#34d399', margin: '0 0 6px 0', fontSize: '18px' }}>{isFactoryActive ? `${factoryData.name} - ${factoryData.location}` : 'Awaiting Factory Data'}</h2>
                            <p style={{ margin: 0, fontSize: '12px', color: isFactoryActive ? '#34d399' : '#9ca3af' }}>
                                {isFactoryActive ? `Status: ${factoryData.status} | Discharge Limit: ${factoryData.dischargeLimit} Liters | CTO Expiry: ${factoryData.ctoExpiryDate}` : 'Please register unit via Multi-Tenant Client Onboarding'}
                            </p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                            
                            <div style={{ backgroundColor: '#111827', border: `1px solid ${isFactoryActive ? getCtoColor(ctoDaysLeft) : '#374151'}`, borderRadius: '12px', padding: '20px' }}>
                                <h4 style={{ color: '#ef4444', margin: '0 0 6px 0', fontSize: '14px' }}>🚨 MPCB Legal Shield (CTO Tracking)</h4>
                                <h3 style={{ margin: '0 0 6px 0', fontSize: '15px' }}>AUTO-GENERATED (Form V Ready)</h3>
                                <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: isFactoryActive ? getCtoColor(ctoDaysLeft) : '#9ca3af' }}>
                                    {isFactoryActive ? `CTO Valid: ${ctoDaysLeft} Days Left (${factoryData.ctoExpiryDate}) ${ctoDaysLeft <= 30 ? '⚠️ (Action Required)' : ''}` : 'Awaiting Factory Data'}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                                <h4 style={{ color: '#3b82f6', margin: '0 0 6px 0', fontSize: '14px' }}>📊 dMRV Carbon Emissions</h4>
                                <h3 style={{ margin: '0 0 6px 0', fontSize: '15px' }}>Scope 1: 1.2 MT (Estimated / Awaiting Fuel Consumption Input)</h3>
                                <div style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#9ca3af', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span>• Scope 2: Verified via CEA Grid Factors</span>
                                    <span>• Scope 3: Estimated via Supply Chain Activity Logs</span>
                                </div>
                            </div>

                            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                                <h4 style={{ color: '#eab308', margin: '0 0 6px 0', fontSize: '14px' }}>💰 Financial Subvention</h4>
                                <h3 style={{ margin: '0 0 6px 0', fontSize: '15px' }}>Eligible for Working Capital Interest Rebate</h3>
                                <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Eligible for Review (Subject to bank circulars)</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Daily Operator Logbook Module */}
                {activeModule === 'dailyLogbook' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #059669', borderRadius: '12px', padding: '24px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>PILOT CRITICAL CORE MODULE</span>
                        <h2 style={{ color: '#34d399', margin: '12px 0 6px 0', fontSize: '18px' }}>📝 दैनिक ऑपरेटर लॉगबुक (Daily Operator Logbook)</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '8px' }}>Marathi-first, 60-second daily entry for plant chemist / ETP operator with server-time lock & GPS fallback.</p>
                        <p style={{ color: '#f59e0b', fontSize: '11px', marginBottom: '20px' }}>ℹ️ Note: Default values shown below are for sample/demo illustration only (Estimated / Sample — Awaiting Real Data).</p>

                        {logSubmitted && (
                            <div style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '12px', borderRadius: '8px', marginBottom: '16px', fontSize: '12px', fontWeight: 'bold' }}>
                                ✅ Log successfully saved with server-side timestamp and immutable audit row.
                            </div>
                        )}

                        <form onSubmit={handleLogSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>pH Level (ETP Outlet)</label>
                                <input type="number" step="0.1" value={dailyLog.ph} onChange={(e) => setDailyLog({...dailyLog, ph: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Water Meter Reading (KL)</label>
                                <input type="number" value={dailyLog.water} onChange={(e) => setDailyLog({...dailyLog, water: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Power Meter Reading (kWh)</label>
                                <input type="number" value={dailyLog.power} onChange={(e) => setDailyLog({...dailyLog, power: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} required />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Sludge Generated (MT)</label>
                                <input type="number" step="0.01" value={dailyLog.sludge} onChange={(e) => setDailyLog({...dailyLog, sludge: e.target.value})} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} required />
                            </div>
                            <div style={{ gridColumn: '1 / -1' }}>
                                <button type="submit" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', width: '100%' }}>
                                    Submit Daily Record (Server-Time Locked / Cannot Be Back-Dated)
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* WhatsApp / SMS Alert Engine Module */}
                {activeModule === 'alertsEngine' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '24px' }}>
                        <span style={{ backgroundColor: '#1e40af', color: '#bfdbfe', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>AUTOMATED TRIGGERS</span>
                        <h2 style={{ color: '#60a5fa', margin: '12px 0 6px 0', fontSize: '18px' }}>💬 WhatsApp / SMS Alert Engine</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '20px' }}>Plain language Marathi alerts for statutory deadlines, CTO renewals, and missed daily logs.</p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold', color: 'white' }}>CTO Expiry Warning (15 Days)</p>
                                    <p style={{ margin: 0, fontSize: '12px', color: '#34d399' }}>"तुमच्या फॅक्टरीच्या CTO नूतनीकरणासाठी १५ दिवस उरले आहेत."</p>
                                </div>
                                <span style={{ fontSize: '10px', backgroundColor: '#065f46', color: '#d1fae5', padding: '4px 8px', borderRadius: '4px' }}>Active Trigger</span>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <p style={{ margin: '0 0 4px 0', fontSize: '13px', fontWeight: 'bold', color: 'white' }}>Missed Daily Log Notice</p>
                                    <p style={{ margin: 0, fontSize: '12px', color: '#f59e0b' }}>"गेल्या २ दिवसांपासून ईटीपी दैनिक नोंद भरलेली नाही."</p>
                                </div>
                                <span style={{ fontSize: '10px', backgroundColor: '#065f46', color: '#d1fae5', padding: '4px 8px', borderRadius: '4px' }}>Active Trigger</span>
                            </div>
                        </div>
                    </div>
                )}

                {activeModule === 'greenCorridor' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '24px' }}>
                            <h2 style={{ color: '#60a5fa', marginTop: 0, fontSize: '18px' }}>🌐 Macro-Level Green Industrial Corridor</h2>
                            <p style={{ fontSize: '13px', color: '#9ca3af' }}>{macroData.corridorName} — Government & MCCI Regional Monitoring</p>
                        </div>
                    </div>
                )}

                {activeModule === 'ocrScan' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#34d399', margin: '0 0 8px 0', fontSize: '18px' }}>⚡ Multi-File Batch OCR & CPCB Schedule Selector</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>Upload bills and assign official CPCB Schedule I categories.</p>
                    </div>
                )}

                {activeModule === 'risk1' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#ef4444', marginTop: 0, fontSize: '18px' }}>🚨 MPCB Flying Squad Emergency Audit Mode</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>1-Click instant compliance dossier aggregating CTO status and digital vault hashes.</p>
                    </div>
                )}

                {activeModule === 'risk2' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#ef4444', marginTop: 0, fontSize: '18px' }}>⚠️ Toxic & Boiler Gas Leak Safety Radar</h2>
                    </div>
                )}

                {activeModule === 'risk3' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#ef4444', marginTop: 0, fontSize: '18px' }}>Notice Defense Matrix & AI Legal Draft Generator</h2>
                    </div>
                )}

                {activeModule === 'utility1' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '18px' }}>⚡ MSEDCL Smart Grid & Power Factor Optimizer</h2>
                    </div>
                )}

                {activeModule === 'utility2' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '18px' }}>💡 ETP & Green Tech CAPEX / ROI Calculator</h2>
                    </div>
                )}

                {activeModule === 'stat1' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '18px' }}>📑 Form 3, Form 4 & Form 5 Annual Returns Generator</h2>
                    </div>
                )}

                {activeModule === 'tankerGPS' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '18px' }}>🚚 Tanker GPS & Form 10 Hazardous Waste Manifest</h2>
                    </div>
                )}

                {activeModule === 'ctoDossier' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '18px' }}>📄 CTO Renewal Auto-Dossier Generator</h2>
                    </div>
                )}

                {activeModule === 'greenPassport' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '18px' }}>🌱 B2B Green Passport & SEBI BRSR Core Engine</h2>
                    </div>
                )}

                {activeModule === 'ewaste' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '18px' }}>📦 E-Waste & Battery EPR Statutory Vault</h2>
                    </div>
                )}

                {activeModule === 'sbiRebate' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '18px' }}>💰 SBI / SIDBI Working Capital Interest Rebate</h2>
                    </div>
                )}

                {activeModule === 'blockchain' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#8b5cf6', marginTop: 0, fontSize: '18px' }}>⛓️ Tamper-Evident Digital Vault</h2>
                    </div>
                )}

                {activeModule === 'mcciGrants' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#8b5cf6', marginTop: 0, fontSize: '18px' }}>🏛️ MCCI Privacy Shield & Govt Grants</h2>
                    </div>
                )}

                {activeModule === 'onboard' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#818cf8', marginTop: 0, fontSize: '18px' }}>🏢 Multi-Tenant Client Onboarding & CTO Setup</h2>
                        <form onSubmit={handleOnboardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px', marginTop: '16px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Company Name</label>
                                <input type="text" placeholder="Enter company name" value={tempCompanyName} onChange={(e) => setTempCompanyName(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>MIDC Location</label>
                                <input type="text" placeholder="MIDC Location" value={tempMidcLocation} onChange={(e) => setTempMidcLocation(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>MPCB Discharge Limit (Liters)</label>
                                <input type="text" placeholder="Discharge Limit" value={tempDischargeLimit} onChange={(e) => setTempDischargeLimit(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>CTO Expiry Date</label>
                                <input type="date" value={tempCtoDate} onChange={(e) => setTempCtoDate(e.target.value)} style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} />
                            </div>
                            <button type="submit" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                                + Save Factory & Start CTO Tracking
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <footer style={{ marginTop: '40px', borderTop: '1px solid #1f2937', padding: '20px', textAlign: 'center', color: '#9ca3af', fontSize: '12px' }}>
                LEGAL DISCLAIMER & DEVELOPER LIABILITY WAIVER: EcoTrace India Private Limited is an independent compliance platform.
            </footer>
        </main>
    );
}
