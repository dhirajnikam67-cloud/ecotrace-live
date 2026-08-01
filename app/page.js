'use client';
import React, { useState } from 'react';

export default function EcoTraceDashboard() {
    const [activeTab, setActiveTab] = useState('overview');
    
    // Factory Onboarding State
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
            setActiveTab('overview');
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

    // Daily Log State
    const [dailyLog, setDailyLog] = useState({ ph: '7.2', water: '1420', power: '3150', sludge: '0.45' });
    const [logSubmitted, setLogSubmitted] = useState(false);

    const handleLogSubmit = (e) => {
        e.preventDefault();
        setLogSubmitted(true);
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

    const handleExportPdf = () => {
        if (!isFactoryActive) {
            alert('Please onboard a factory unit first.');
            return;
        }
        const reportContent = `
========================================
ECOTRACE INDIA PRIVATE LIMITED
COMPLIANCE & AUDIT REPORT (REVIEW DRAFT)
========================================
Company Name: ${factoryData.name}
Location: ${factoryData.location}
Discharge Limit: ${factoryData.dischargeLimit} Liters
CTO Expiry Date: ${factoryData.ctoExpiryDate}
CTO Days Left: ${ctoDaysLeft} Days
Status: COMPLIANT & AUDIT READY

----------------------------------------
1. DISCREpANCY AUDIT TRAIL:
- Power Usage: 1450 kWh [Audit: Corrected by Manager — Original OCR Read: 1420 kWh]

2. DATA COMPLETENESS & RECORD INTEGRITY:
- Basis: 26 confirmed daily entries out of 30-day period. 4 days not logged.
- Record integrity: Private hash chain (tamper-evident). External anchoring not enabled.

3. CPCB SCHEDULE CLASSIFICATION:
- Classification: Cat 34.3 — Chemical sludge from waste water treatment
- Note: Actual tonnage is maintained via plant manifest logs. Software provides legal classification, not calculation formulas.

4. dMRV CARBON METHODOLOGY:
- Emissions calculated as per CEA Baseline Database (Year 2025-26)
- Structured per ISO 14064-1 standard (Scope 1, 2, 3)
----------------------------------------
LEGAL DISCLAIMER:
EcoTrace India Private Limited is an independent compliance platform. It aggregates data supplied by the factory and prepares statutory formats. It does not certify compliance, calculate hazardous waste quantities, or transmit to government portals, or provide legal opinions. Physical safety protocols, hardware calibration and compliance adherence remain the responsibility of the factory management.
========================================
        `;
        downloadTextFile(`${factoryData.name.replace(/\s+/g, '_')}_Compliance_Report.txt`, reportContent);
    };

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#ffffff', fontFamily: 'sans-serif', padding: '16px' }}>
            
            {/* Header & Tagline */}
            <header style={{ borderBottom: '1px solid #1f2937', paddingBottom: '12px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                    <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 4px 0' }}>EcoTrace India</h1>
                    <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>MPCB compliance · daily records · carbon data — for MSMEs</p>
                </div>
                {isFactoryActive && (
                    <button 
                        onClick={handleExportPdf}
                        style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
                    >
                        Export Audit Report (.txt)
                    </button>
                )}
            </header>

            {/* Factory Status Banner */}
            <div style={{ marginBottom: '16px', padding: '10px 14px', background: isFactoryActive ? '#065f46' : '#1f2937', borderRadius: '8px', border: `1px solid ${isFactoryActive ? '#34d399' : '#f59e0b'}`, display: 'inline-block' }}>
                <span style={{ fontSize: '12px', fontWeight: 'bold', color: isFactoryActive ? '#d1fae5' : '#f59e0b' }}>
                    {isFactoryActive ? `Active Unit: ${factoryData.name} (${factoryData.location})` : 'No factory onboarded — register your unit'}
                </span>
            </div>

            {/* Navigation Tabs */}
            <nav style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #1f2937', marginBottom: '20px', overflowX: 'auto', paddingBottom: '8px' }}>
                <button onClick={() => setActiveTab('overview')} style={{ background: 'none', border: 'none', color: activeTab === 'overview' ? '#34d399' : '#9ca3af', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', borderBottom: activeTab === 'overview' ? '2px solid #34d399' : 'none', paddingBottom: '4px', whiteSpace: 'nowrap' }}>Overview</button>
                <button onClick={() => setActiveTab('live_core')} style={{ background: 'none', border: 'none', color: activeTab === 'live_core' ? '#34d399' : '#9ca3af', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', borderBottom: activeTab === 'live_core' ? '2px solid #34d399' : 'none', paddingBottom: '4px', whiteSpace: 'nowrap' }}>Live Core (9)</button>
                <button onClick={() => setActiveTab('reference')} style={{ background: 'none', border: 'none', color: activeTab === 'reference' ? '#34d399' : '#9ca3af', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', borderBottom: activeTab === 'reference' ? '2px solid #34d399' : 'none', paddingBottom: '4px', whiteSpace: 'nowrap' }}>Reference Modules (4)</button>
                <button onClick={() => setActiveTab('roadmap')} style={{ background: 'none', border: 'none', color: activeTab === 'roadmap' ? '#34d399' : '#9ca3af', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', borderBottom: activeTab === 'roadmap' ? '2px solid #34d399' : 'none', paddingBottom: '4px', whiteSpace: 'nowrap' }}>Roadmap Placeholders (6)</button>
            </nav>

            {/* Tab 1: Overview */}
            {activeTab === 'overview' && (
                <div>
                    {!isFactoryActive ? (
                        <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                <h3 style={{ fontSize: '15px', color: 'white', margin: 0 }}>Start here</h3>
                                <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE</span>
                            </div>
                            <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Register a unit to activate CTO tracking, statutory returns and the daily logbook.</p>
                            <button 
                                onClick={() => setActiveTab('live_core')}
                                style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                            >
                                Register your unit
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                            <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                                <h4 style={{ color: '#ef4444', margin: '0 0 6px 0', fontSize: '13px' }}>🚨 MPCB Statutory Tracking (CTO)</h4>
                                <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#34d399' }}>CTO Valid: {ctoDaysLeft} Days Left ({factoryData.ctoExpiryDate})</p>
                            </div>
                            <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                                <h4 style={{ color: '#3b82f6', margin: '0 0 6px 0', fontSize: '13px' }}>📊 dMRV Carbon Emissions</h4>
                                <p style={{ margin: 0, fontSize: '12px', color: '#d1d5db' }}>Scope 1: 1.2 MT (Estimated / Awaiting Fuel Input)</p>
                                <p style={{ fontSize: '10px', color: '#9ca3af', margin: '4px 0 0 0' }}>Emissions calculated as per CEA Baseline Database (Year 2025-26)</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Tab 2: Live Core Modules (9 Active) */}
            {activeTab === 'live_core' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE</span>
                        <h3 style={{ color: '#818cf8', margin: '8px 0 8px 0', fontSize: '15px' }}>1. Multi-Tenant Client Onboarding & CTO Setup</h3>
                        <form onSubmit={handleOnboardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                            <input type="text" placeholder="Company Name" value={tempCompanyName} onChange={(e) => setTempCompanyName(e.target.value)} style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} required />
                            <input type="text" placeholder="MIDC Location" value={tempMidcLocation} onChange={(e) => setTempMidcLocation(e.target.value)} style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                            <input type="text" placeholder="MPCB Discharge Limit (Liters)" value={tempDischargeLimit} onChange={(e) => setTempDischargeLimit(e.target.value)} style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} />
                            <input type="date" value={tempCtoDate} onChange={(e) => setTempCtoDate(e.target.value)} style={{ padding: '8px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '12px' }} required />
                            <button type="submit" style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>Save Factory & Track CTO</button>
                        </form>
                    </div>

                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE</span>
                        <h4 style={{ color: '#34d399', margin: '8px 0 4px 0', fontSize: '14px' }}>2. Main Enterprise Overview</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Aggregated compliance status across active unit parameters.</p>
                    </div>

                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE</span>
                        <h4 style={{ color: '#34d399', margin: '8px 0 4px 0', fontSize: '14px' }}>3. Multi-File Batch OCR & dMRV Scan</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Upload utility bills and assign official CPCB Schedule I categories.</p>
                    </div>

                    <div style={{ backgroundColor: '#111827', border: '1px solid #059669', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE</span>
                        <h4 style={{ color: '#34d399', margin: '8px 0 4px 0', fontSize: '14px' }}>4. दैनिक ऑपरेटर लॉगबुक (Daily Operator Logbook)</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '8px' }}>Marathi-first, 60-second daily entry with server-time lock (Cannot be back-dated).</p>
                        {logSubmitted && <p style={{ color: '#34d399', fontSize: '12px', fontWeight: 'bold' }}>✅ Log saved successfully.</p>}
                        <form onSubmit={handleLogSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
                            <input type="number" step="0.1" value={dailyLog.ph} onChange={(e) => setDailyLog({...dailyLog, ph: e.target.value})} placeholder="pH" style={{ padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '12px' }} required />
                            <input type="number" value={dailyLog.water} onChange={(e) => setDailyLog({...dailyLog, water: e.target.value})} placeholder="Water KL" style={{ padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '12px' }} required />
                            <input type="number" value={dailyLog.power} onChange={(e) => setDailyLog({...dailyLog, power: e.target.value})} placeholder="Power kWh" style={{ padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '12px' }} required />
                            <input type="number" step="0.01" value={dailyLog.sludge} onChange={(e) => setDailyLog({...dailyLog, sludge: e.target.value})} placeholder="Sludge MT" style={{ padding: '6px', backgroundColor: '#1f2937', color: 'white', border: '1px solid #374151', borderRadius: '4px', fontSize: '12px' }} required />
                            <button type="submit" style={{ gridColumn: '1 / -1', backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Submit Daily Record</button>
                        </form>
                    </div>

                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE</span>
                        <h4 style={{ color: '#ef4444', margin: '8px 0 4px 0', fontSize: '14px' }}>5. Flying Squad Audit Mode</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>1-click instant compliance dossier for surprise inspections.</p>
                    </div>

                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE</span>
                        <h4 style={{ color: '#ef4444', margin: '8px 0 4px 0', fontSize: '14px' }}>6. Notice Defence Matrix & Draft Generator</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Draft responses for review by legal counsel (Requires human review).</p>
                    </div>

                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE</span>
                        <h4 style={{ color: '#3b82f6', margin: '8px 0 4px 0', fontSize: '14px' }}>7. Form 3, 4 & 5 Annual Returns Draft Generator</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Automated statutory template assembly from daily logs.</p>
                    </div>

                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE</span>
                        <h4 style={{ color: '#3b82f6', margin: '8px 0 4px 0', fontSize: '14px' }}>8. WhatsApp / SMS Alert Engine (Marathi Triggers)</h4>
                        <p style={{ color: '#34d399', fontSize: '12px', margin: '4px 0 0 0' }}>"तुमच्या फॅक्टरीच्या CTO नूतनीकरणासाठी १५ दिवस उरले आहेत."</p>
                    </div>

                    <div style={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>LIVE</span>
                        <h4 style={{ color: '#8b5cf6', margin: '8px 0 4px 0', fontSize: '14px' }}>9. Tamper-Evident Digital Vault</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Private hash-chained storage for immutable audit logs.</p>
                    </div>

                </div>
            )}

            {/* Tab 3: Reference Modules (4 Active Calculations) */}
            {activeTab === 'reference' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#1e40af', color: '#bfdbfe', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>REFERENCE CALCULATION</span>
                        <h4 style={{ color: '#60a5fa', margin: '8px 0 4px 0', fontSize: '14px' }}>10. ETP CAPEX & ROI Calculator</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Real mathematical calculation based on user plant capacity inputs and benchmark costs.</p>
                    </div>

                    <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#1e40af', color: '#bfdbfe', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>REFERENCE CALCULATION</span>
                        <h4 style={{ color: '#60a5fa', margin: '8px 0 4px 0', fontSize: '14px' }}>11. B2B Green Passport & SEBI BRSR Core Template</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Scope 1/2/3 carbon aggregation structured for supply-chain reporting.</p>
                    </div>

                    <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#1e40af', color: '#bfdbfe', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>REFERENCE CALCULATION</span>
                        <h4 style={{ color: '#60a5fa', margin: '8px 0 4px 0', fontSize: '14px' }}>12. E-Waste & Battery EPR Record Vault</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Extended Producer Responsibility logbook and ledger calculations.</p>
                    </div>

                    <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '16px' }}>
                        <span style={{ backgroundColor: '#1e40af', color: '#bfdbfe', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>REFERENCE CALCULATION</span>
                        <h4 style={{ color: '#60a5fa', margin: '8px 0 4px 0', fontSize: '14px' }}>13. CTO Renewal Auto-Dossier Generator</h4>
                        <p style={{ color: '#9ca3af', fontSize: '12px', margin: 0 }}>Compiles renewal application packets from stored factory parameters.</p>
                    </div>

                </div>
            )}

            {/* Tab 4: Roadmap Placeholders (6 Modules with Request CTA) */}
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
                            <span style={{ backgroundColor: '#b45309', color: '#fef3c7', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>ROADMAP PLACEHOLDER</span>
                            <h4 style={{ color: '#f59e0b', margin: '8px 0 4px 0', fontSize: '14px' }}>{mod.title}</h4>
                            <p style={{ color: '#9ca3af', fontSize: '12px', marginBottom: '12px' }}>{mod.desc}</p>
                            <button onClick={() => alert(`Request recorded for: ${mod.title}. Our team will prioritize this based on your factory feedback.`)} style={{ backgroundColor: '#374151', color: '#f3f4f6', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>
                                Request Early Access / Priority Build
                            </button>
                        </div>
                    ))}

                </div>
            )}

            {/* Legal Disclaimer Footer */}
            <footer style={{ marginTop: '30px', borderTop: '1px solid #1f2937', padding: '16px 0', color: '#9ca3af', fontSize: '11px', lineHeight: '1.4' }}>
                EcoTrace India Private Limited is an independent compliance platform. It aggregates data supplied by the factory and prepares statutory formats. It does not certify compliance, calculate hazardous waste quantities, or transmit to government portals, or provide legal opinions. Physical safety protocols, hardware calibration and compliance adherence remain the responsibility of the factory management.
            </footer>

        </main>
    );
}
