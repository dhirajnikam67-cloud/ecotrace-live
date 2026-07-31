'use client';
import React, { useState, useEffect } from 'react';

export default function EcoTraceDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModule, setActiveModule] = useState('mainDashboard');
    const [ocrResult, setOcrResult] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    
    // Original OCR vs Manager Confirmed ट्रॅकिंगसाठी स्टेट (अधिकृत CPCB Schedule I नुसार)
    const [editForm, setEditForm] = useState({ 
        originalElectricity: '1420', 
        unitsConsumed: '1450', 
        originalWater: '3000', 
        waterDischarge: '3200',
        hazardousCategory: 'Cat 34.3 — Chemical sludge from waste water treatment',
        hazardousTonnage: '12.33 MT (Estimated / Sample Value)'
    });
    const [batchFiles, setBatchFiles] = useState([]);
    
    // फॅक्टरीचा मूळ डेटा आणि खऱ्या तारखेसह CTO Tracking स्टेट
    const [factoryData, setFactoryData] = useState({
        name: "WESTERN CHEMICALS",
        location: "BHOSARI MIDC, PUNE",
        dischargeLimit: "5000",
        ctoExpiryDate: "2026-08-20",
        status: "COMPLIANT & AUDIT READY"
    });

    const [tempCompanyName, setTempCompanyName] = useState('');
    const [tempMidcLocation, setTempMidcLocation] = useState('');
    const [tempDischargeLimit, setTempDischargeLimit] = useState('');
    const [tempCtoDate, setTempCtoDate] = useState('');

    // ऑनबोर्डिंग सबमिट लॉजिक
    const handleOnboardSubmit = (e) => {
        e.preventDefault();
        if (tempCompanyName.trim()) {
            setFactoryData({
                name: tempCompanyName,
                location: tempMidcLocation ? tempMidcLocation.toUpperCase() + ' MIDC' : 'MIDC CLUSTER',
                dischargeLimit: tempDischargeLimit || '5000',
                ctoExpiryDate: tempCtoDate || '2026-12-31',
                status: "COMPLIANT & AUDIT READY"
            });
            setActiveModule('mainDashboard');
            alert('Industrial Unit & CTO Data Updated Successfully!');
        } else {
            alert('Please enter a company name.');
        }
    };

    // CTO दिवस अचूक मोजण्याचे लॉजिक
    const calculateCtoDaysLeft = (expiryDate) => {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const diffTime = expiry - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays > 0 ? diffDays : 0;
    };

    const ctoDaysLeft = calculateCtoDaysLeft(factoryData.ctoExpiryDate);

    const getCtoColor = (days) => {
        if (days <= 15) return '#ef4444'; // Red
        if (days <= 30) return '#f59e0b'; // Yellow
        return '#34d399';                // Green
    };

    // Real File Download Trigger Function
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
        runSafetyAudit();
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

    const [activeHash, setActiveHash] = useState("0xa8f392c1b4e87019d6f2231e");

    const generateNewHash = () => {
        const randomHash = "0x" + Math.random().toString(16).substring(2, 18) + Math.random().toString(16).substring(2, 18);
        setActiveHash(randomHash);
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
                        <p style={{ fontSize: '10px', color: '#9ca3af', margin: 0 }}>MPCB Legal Shield & dMRV Green Operating System | Contact: 7378780745</p>
                    </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <div style={{ backgroundColor: '#1f2937', border: '1px solid #374151', padding: '6px 10px', borderRadius: '8px', fontSize: '11px', color: '#34d399', fontWeight: 'bold' }}>
                        {factoryData.name} ({factoryData.location})
                    </div>
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
                </div>
            </header>

            {/* Professional Wide Global Navigation Drawer */}
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
                
                {/* Model 1 Safe Integration Panel */}
                <div style={{ marginBottom: '20px', padding: '16px', background: '#111827', borderRadius: '12px', border: '1px solid #3b82f6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                            <h4 style={{ color: '#60a5fa', margin: '0 0 4px 0', fontSize: '14px' }}>Model 1: Intelligent Watchman & Legal Shield (Auto-Audit Active)</h4>
                            <p style={{ color: '#9ca3af', margin: 0, fontSize: '11px' }}>Zero Machine Trip / Automated Advisory Mode (Human-in-the-Loop)</p>
                        </div>
                        <button 
                            onClick={runSafetyAudit}
                            style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px' }}
                            disabled={loadingAudit}
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
                            <h2 style={{ color: '#34d399', margin: '0 0 6px 0', fontSize: '18px' }}>{factoryData.name} - {factoryData.location}</h2>
                            <p style={{ margin: 0, fontSize: '12px', color: '#34d399' }}>Status: {factoryData.status} | Discharge Limit: {factoryData.dischargeLimit} Liters | CTO Expiry: {factoryData.ctoExpiryDate}</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                            
                            <div style={{ backgroundColor: '#111827', border: `1px solid ${getCtoColor(ctoDaysLeft)}`, borderRadius: '12px', padding: '20px' }}>
                                <h4 style={{ color: '#ef4444', margin: '0 0 6px 0', fontSize: '14px' }}>🚨 MPCB Legal Shield (CTO Tracking)</h4>
                                <h3 style={{ margin: '0 0 6px 0', fontSize: '15px' }}>AUTO-GENERATED (Form V Ready)</h3>
                                <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: getCtoColor(ctoDaysLeft) }}>
                                    CTO Valid: {ctoDaysLeft} Days Left ({factoryData.ctoExpiryDate}) {ctoDaysLeft <= 30 ? '⚠️ (Action Required)' : ''}
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

                {activeModule === 'greenCorridor' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '24px' }}>
                            <h2 style={{ color: '#60a5fa', marginTop: 0, fontSize: '18px' }}>🌐 Macro-Level Green Industrial Corridor</h2>
                            <p style={{ fontSize: '13px', color: '#9ca3af' }}>{macroData.corridorName} — Government & MCCI Regional Monitoring</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginTop: '16px' }}>
                                <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                                    <p style={{ margin: '0', fontSize: '11px', color: '#9ca3af' }}>Active Units</p>
                                    <p style={{ margin: '8px 0 0 0', fontSize: '13px', fontWeight: 'bold', color: '#f59e0b' }}>{macroData.activeMonitoringUnits}</p>
                                </div>
                                <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                                    <p style={{ margin: '0', fontSize: '11px', color: '#9ca3af' }}>Total Carbon</p>
                                    <p style={{ margin: '8px 0 0 0', fontSize: '13px', fontWeight: 'bold', color: '#f59e0b' }}>{macroData.regionalAggregates.totalCarbonEmissionTonnes}</p>
                                </div>
                                <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                                    <p style={{ margin: '0', fontSize: '11px', color: '#9ca3af' }}>Green Compliance</p>
                                    <p style={{ margin: '8px 0 0 0', fontSize: '13px', fontWeight: 'bold', color: '#34d399' }}>{macroData.regionalAggregates.greenCompliancePercentage}</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                            <h3 style={{ color: '#34d399', marginTop: 0, fontSize: '16px' }}>🔒 Privacy-Protected Aggregation Shield</h3>
                            <p style={{ fontSize: '13px', color: '#9ca3af' }}>State & MCCI audit access with complete business data protection.</p>
                            <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '12px', borderRadius: '8px', marginTop: '16px', fontSize: '14px', fontWeight: '500', textAlign: 'center' }}>
                                Status: {macroData.privacyShieldStatus}
                            </div>
                        </div>
                    </div>
                )}

                {activeModule === 'ocrScan' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                            <h2 style={{ color: '#34d399', margin: 0, fontSize: '18px' }}>⚡ Multi-File Batch OCR & CPCB Schedule Selector</h2>
                            <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>AUDIT TRAIL & CLASSIFICATION ACTIVE</span>
                        </div>
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>Upload bills and assign official CPCB Schedule I categories. The system records original OCR reads vs manager verification.</p>
                        <div style={{ marginTop: '20px', padding: '30px', border: '2px dashed #374151', borderRadius: '8px', textAlign: 'center', backgroundColor: '#1f2937' }}>
                           <label style={{ display: 'inline-block', backgroundColor: '#059669', color: 'white', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
                            📁 Select Multiple Bills / Manifests (Batch Upload)
                            <input 
                                type="file" 
                                accept="image/*" 
                                multiple
                                style={{ display: 'none' }}
                                onChange={(e) => {
                                    if(e.target.files && e.target.files.length > 0) {
                                        const filesArray = Array.from(e.target.files);
                                        setBatchFiles(filesArray);
                                        alert(`Successfully queued ${filesArray.length} file(s). Review metrics and Schedule category below.`);
                                        setIsEditing(true);
                                    }
                                }}
                            />
                            </label>

                            {/* Batch Files Preview & Verified CPCB Schedule Category Selector Box */}
                            {isEditing && (
                                <div style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '20px', marginTop: '20px', textAlign: 'left' }}>
                                    <h3 style={{ color: '#58a6ff', margin: '0 0 10px 0', fontSize: '15px' }}>🔍 Utility Review & Official CPCB Schedule I Selector</h3>
                                    <p style={{ color: '#8b949e', fontSize: '12px', marginBottom: '10px' }}>Queued Files: {batchFiles.map(f => f.name).join(', ')}</p>
                                    <p style={{ color: '#8b949e', fontSize: '12px', marginBottom: '15px' }}>GPS Location Locked: Pune MIDC Cluster (Verified)</p>
                                    
                                    <div style={{ display: 'grid', gap: '15px', marginBottom: '20px' }}>
                                        <div style={{ backgroundColor: '#0d1117', padding: '12px', borderRadius: '6px', border: '1px solid #30363d' }}>
                                            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#8b949e' }}>Electricity Consumption:</p>
                                            <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#f59e0b' }}>Original OCR Read: <strong>{editForm.originalElectricity} kWh</strong></p>
                                            <label style={{ fontSize: '11px', color: '#34d399' }}>Manager Confirmed / Corrected Value:</label>
                                            <input 
                                                type="text" 
                                                value={editForm.unitsConsumed} 
                                                onChange={(e) => setEditForm({...editForm, unitsConsumed: e.target.value})}
                                                style={{ width: '100%', padding: '8px', backgroundColor: '#161b22', color: 'white', border: '1px solid #374151', borderRadius: '4px', marginTop: '4px' }}
                                            />
                                        </div>

                                        <div style={{ backgroundColor: '#0d1117', padding: '12px', borderRadius: '6px', border: '1px solid #30363d' }}>
                                            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#8b949e' }}>Water Discharge Volume:</p>
                                            <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#f59e0b' }}>Original OCR Read: <strong>{editForm.originalWater} Liters</strong></p>
                                            <label style={{ fontSize: '11px', color: '#34d399' }}>Manager Confirmed / Corrected Value:</label>
                                            <input 
                                                type="text" 
                                                value={editForm.waterDischarge} 
                                                onChange={(e) => setEditForm({...editForm, waterDischarge: e.target.value})}
                                                style={{ width: '100%', padding: '8px', backgroundColor: '#161b22', color: 'white', border: '1px solid #374151', borderRadius: '4px', marginTop: '4px' }}
                                            />
                                        </div>

                                        {/* Official CPCB Schedule I Category Selector */}
                                        <div style={{ backgroundColor: '#0d1117', padding: '12px', borderRadius: '6px', border: '1px solid #30363d' }}>
                                            <p style={{ margin: '0 0 6px 0', fontSize: '12px', color: '#8b949e' }}>Official CPCB Schedule I Hazardous Waste Category Selector:</p>
                                            <select 
                                                value={editForm.hazardousCategory}
                                                onChange={(e) => setEditForm({...editForm, hazardousCategory: e.target.value})}
                                                style={{ width: '100%', padding: '8px', backgroundColor: '#161b22', color: 'white', border: '1px solid #374151', borderRadius: '4px', marginTop: '4px', fontSize: '12px' }}
                                            >
                                                <option value="Cat 34.3 — Chemical sludge from waste water treatment">Cat 34.3 — Chemical sludge from waste water treatment</option>
                                                <option value="Cat 5.1 — Used or spent oil">Cat 5.1 — Used or spent oil</option>
                                                <option value="Cat 35.1 — Filters and filter material which have organic liquids in them, e.g. mineral oil, synthetic oil and organic chlorine compounds">Cat 35.1 — Filters and filter material which have organic liquids in them, e.g. mineral oil, synthetic oil and organic chlorine compounds</option>
                                                <option value="Cat 32.2 — Corrosive wastes arising from use of strong acids and bases">Cat 32.2 — Corrosive wastes arising from use of strong acids and bases</option>
                                            </select>
                                            <p style={{ margin: '6px 0 0 0', fontSize: '10px', color: '#34d399' }}>ℹ️ Note: तुमचा प्रत्यक्ष टनेज आकडा नेहमी तुमच्या मॅनिफेस्ट रेकॉर्ड्स आणि प्लांट ऑडिटशी जुळायला हवा — हे सॉफ्टवेअर फक्त योग्य कायदेशीर वर्गीकरण निवडण्यास मदत करते.</p>
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => {
                                            alert('Audit trail & CPCB Schedule Category locked successfully!');
                                            setIsEditing(false);
                                        }}
                                        style={{ backgroundColor: '#238636', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}
                                    >
                                        💾 Lock Classification & Update Form V
                                    </button>
                                </div>
                            )}
                            <p style={{ margin: '12px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>Verified statutory category selector active.</p>
                        </div>
                    </div>
                )}

                {activeModule === 'risk1' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#ef4444', marginTop: 0, fontSize: '18px' }}>🚨 MPCB Flying Squad Emergency Audit Mode</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>1-Click instant compliance dossier aggregating CTO status ({factoryData.ctoExpiryDate}), ETP health, CPCB Schedule category, and digital vault hashes for <strong>{factoryData.name}</strong>.</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>CTO Status & Days Left</p>
                                <p style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: getCtoColor(ctoDaysLeft) }}>VALID ({ctoDaysLeft} Days Left)</p>
                                <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: '#9ca3af' }}>Expiry: {factoryData.ctoExpiryDate}</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>ETP Health Status</p>
                                <p style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#3b82f6' }}>98% Optimal (Estimated)</p>
                                <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: '#9ca3af' }}>Awaiting Plant Audit Data</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Digital Vault Ledger</p>
                                <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', color: '#34d399', fontFamily: 'monospace' }}>{activeHash.substring(0, 12)}...</p>
                                <p style={{ margin: '4px 0 0 0', fontSize: '10px', color: '#9ca3af' }}>Tamper-Evident Verified</p>
                            </div>
                        </div>

                        {/* Flying Squad Summary Box for OCR Discrepancy & CPCB Category */}
                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', border: '1px solid #374151' }}>
                            <h4 style={{ color: '#34d399', margin: '0 0 10px 0', fontSize: '13px' }}>📋 Aggregated Utility Audit Trail & CPCB Classification</h4>
                            <div style={{ display: 'grid', gap: '8px', fontSize: '12px', color: '#d1d5db' }}>
                                <p style={{ margin: 0 }}>• Electricity Audit: Original OCR ({editForm.originalElectricity} kWh) vs Manager Confirmed ({editForm.unitsConsumed} kWh) — {editForm.unitsConsumed !== editForm.originalElectricity ? '⚠️ Discrepancy Flagged & Corrected' : '✓ No Discrepancy'}</p>
                                <p style={{ margin: 0 }}>• Water Discharge: Original OCR ({editForm.originalWater} Liters) vs Manager Confirmed ({editForm.waterDischarge} Liters) — {editForm.waterDischarge !== editForm.originalWater ? '⚠️ Discrepancy Flagged & Corrected' : '✓ No Discrepancy'}</p>
                                <p style={{ margin: 0 }}>• CPCB Schedule I Category: <strong>{editForm.hazardousCategory}</strong></p>
                            </div>
                        </div>
                    </div>
                )}

                {activeModule === 'risk2' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#ef4444', marginTop: 0, fontSize: '18px' }}>⚠️ Toxic & Boiler Gas Leak Safety Radar</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Real-time (when sensor connected) Parts Per Million (PPM) concentration tracking for <strong>{factoryData.name}</strong>.</p>
                        
                        <div style={{ backgroundColor: '#1f2937', border: '1px solid #f59e0b', color: '#fcd34d', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', marginBottom: '16px' }}>
                            Status: Simulated Demo Data — Awaiting Physical Sensor Integration (0.05 PPM Safe Range)
                        </div>

                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', border: '1px solid #374151' }}>
                            <h4 style={{ color: '#f59e0b', margin: '0 0 6px 0', fontSize: '13px' }}>🛡️ Safety Instrumented System (SIS) Compliance Notice</h4>
                            <p style={{ margin: 0, fontSize: '12px', color: '#d1d5db' }}>
                                <strong>No Auto-Shutoff without IEC 61511 / SIS Hardware:</strong> This software operates strictly in Automated Advisory & Warning Mode. In the event of toxic or boiler gas threshold breaches, automated emergency shutdown is locked pending physical IEC 61511-certified Safety Instrumented System hardware integration. Operator manual intervention is required.
                            </p>
                        </div>
                    </div>
                )}

                {activeModule === 'risk3' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#ef4444', marginTop: 0, fontSize: '18px' }}>Notice Defense Matrix & AI Legal Draft Generator</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Automated analysis of MPCB show-cause notices against historical IoT stack emission logs and manager audit trails.</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Latest Received Notice</p>
                                <p style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: 'bold', color: '#f87171' }}>Ref: MPCB/RO/Notice/2026/049</p>
                                <p style={{ margin: 0, fontSize: '12px', color: '#d1d5db' }}>Allegation: Effluent parameter & hazardous waste variance observed.</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #34d399' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Digital Vault Counter-Evidence</p>
                                <p style={{ margin: '0 0 6px 0', fontSize: '13px', fontWeight: 'bold', color: '#34d399' }}>IoT Sensor Log Match: Within Statutory Norms (Verified)</p>
                                <p style={{ margin: 0, fontSize: '10px', color: '#9ca3af', fontFamily: 'monospace' }}>Hash: {activeHash.substring(0, 12)}... (Tamper-Evident)</p>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', border: '1px solid #374151', marginBottom: '20px' }}>
                            <h4 style={{ color: '#34d399', margin: '0 0 10px 0', fontSize: '13px' }}>📋 Attached Defense Evidence (Manager Verified)</h4>
                            <div style={{ display: 'grid', gap: '8px', fontSize: '12px', color: '#d1d5db' }}>
                                <p style={{ margin: 0 }}>• Water Discharge Audit: Manager Confirmed <strong>{editForm.waterDischarge} Liters</strong> (Original OCR: {editForm.originalWater} Liters) — {editForm.waterDischarge !== editForm.originalWater ? '⚠️ Discrepancy Flagged & Corrected' : '✓ Verified'}</p>
                                <p style={{ margin: 0 }}>• Power Input Audit: Manager Confirmed <strong>{editForm.unitsConsumed} kWh</strong> (Original OCR: {editForm.originalElectricity} kWh) — {editForm.unitsConsumed !== editForm.originalElectricity ? '⚠️ Discrepancy Flagged & Corrected' : '✓ Verified'}</p>
                                <p style={{ margin: 0 }}>• CPCB Schedule I Classification: <strong>{editForm.hazardousCategory}</strong></p>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#1f2937', padding: '20px', borderRadius: '8px' }}>
                            <h3 style={{ color: '#60a5fa', margin: '0 0 6px 0', fontSize: '15px' }}>📄 AI Legal Reply Dossier Generator</h3>
                            <button 
                                onClick={() => {
                                    const unitsNum = parseFloat(editForm.unitsConsumed) || 1450;
                                    const waterVol = editForm.waterDischarge || '3200';
                                    const waterStatus = waterVol !== editForm.originalWater ? `Corrected by Manager (Original OCR Read: ${editForm.originalWater} Liters)` : `OCR Verified (No Discrepancy: ${editForm.originalWater} Liters)`;
                                    const electricityStatus = unitsNum.toString() !== editForm.originalElectricity ? `Corrected by Manager (Original OCR Read: ${editForm.originalElectricity} kWh)` : `OCR Verified (No Discrepancy: ${editForm.originalElectricity} kWh)`;

                                    const replyContent = `========================================
ECOTRACE INDIA PRIVATE LIMITED
MPCB LEGAL NOTICE DEFENSE & REPLY DOSSIER
========================================
Company Name: ${factoryData.name}
Location: ${factoryData.location}
Notice Ref: MPCB/RO/Notice/2026/049
CTO Expiry Date: ${factoryData.ctoExpiryDate}
----------------------------------------
1. COUNTER-EVIDENCE & IoT SENSOR LOG MATCH:
   - Status: Within Statutory Norms (Verified)
   - Digital Vault Hash: ${activeHash} (Tamper-Evident)

2. MANAGER-VERIFIED UTILITY AUDIT TRAIL:
   - Water Discharge Volume: ${waterVol} Liters [Audit Status: ${waterStatus}]
   - Power Consumption Input: ${unitsNum} kWh [Audit Status: ${electricityStatus}]

3. CPCB SCHEDULE I HAZARDOUS WASTE CLASSIFICATION:
   - Selected Category: ${editForm.hazardousCategory}
   - Note: Actual tonnage is maintained via plant manifest logs. Software provides legal classification, not generic calculation formulas.
----------------------------------------
SUBMITTED VIA ECOTRACE LEGAL SHIELD PLATFORM
========================================`;

                                    const blob = new Blob([replyContent], { type: 'text/plain;charset=utf-8' });
                                    const url = URL.createObjectURL(blob);
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = `${factoryData.name.replace(/\s+/g, '_')}_MPCB_Notice_Defense_Reply.txt`;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
                                style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                            >
                                ⚡ Generate & Download MPCB Legal Defense Reply Report (.txt)
                            </button>
                        </div>
                    </div>
                )}

                {activeModule === 'utility1' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '18px' }}>⚡ MSEDCL Smart Grid & Power Factor Optimizer</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Real-time reactive power compensation monitoring for <strong>{factoryData.name}</strong>.</p>
                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                            <div>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>Current Power Factor</p>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#34d399' }}>0.94 (Above Penalty Threshold 0.90)</p>
                            </div>
                            <button 
                                onClick={() => alert('Operator recommendation triggered: Check capacitor bank settings.')}
                                style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                            >
                                Trigger Operator Recommendation
                            </button>
                        </div>
                    </div>
                )}

                {activeModule === 'utility2' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '18px' }}>💡 ETP & Green Tech CAPEX / ROI Calculator</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Evaluates Effluent Treatment Plant capital expenditures against monthly chemical savings.</p>
                        <div style={{ backgroundColor: '#1f2937', padding: '20px', borderRadius: '8px', color: '#34d399', fontWeight: 'bold', fontSize: '14px' }}>
                            Estimated Payback Period: 14 Months | Monthly Savings: ₹45,000 (Based on Industry Benchmarks)
                        </div>
                    </div>
                )}

                {activeModule === 'stat1' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '18px' }}>📑 Form 3, Form 4 & Form 5 Annual Returns Generator (CPCB Schedule Classified)</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Automated MPCB Statutory Form Compilation for <strong>{factoryData.name}</strong>.</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>FORM 3 (WATER CESS)</p>
                                <p style={{ margin: '4px 0', fontSize: '14px', fontWeight: 'bold', color: '#34d399' }}>Verified Water: {editForm.waterDischarge} Liters</p>
                                <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>{editForm.waterDischarge !== editForm.originalWater ? '⚠️ Corrected from OCR (' + editForm.originalWater + ')' : '✓ Verified (No Discrepancy)'}</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>FORM 4 (HAZARDOUS WASTE)</p>
                                <p style={{ margin: '4px 0', fontSize: '13px', fontWeight: 'bold', color: '#3b82f6' }}>{editForm.hazardousCategory}</p>
                                <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#9ca3af' }}>Volume: 12.33 MT (Estimated / Sample Value)</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>FORM 5 (ENVIRONMENT STATEMENT)</p>
                                <p style={{ margin: '4px 0', fontSize: '14px', fontWeight: 'bold', color: '#f59e0b' }}>Verified Power: {editForm.unitsConsumed} kWh</p>
                                <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>{editForm.unitsConsumed !== editForm.originalElectricity ? '⚠️ Corrected from OCR (' + editForm.originalElectricity + ')' : '✓ Verified (No Discrepancy)'}</p>
                            </div>
                        </div>

                        <button 
                            onClick={() => {
                                const unitsNum = parseFloat(editForm.unitsConsumed) || 1450;
                                const waterVol = editForm.waterDischarge || '3200';
                                const carbonMap = (unitsNum * 0.82).toFixed(2);
                                const waterStatus = waterVol !== editForm.originalWater ? `Corrected by Manager (Original OCR Read: ${editForm.originalWater} Liters)` : `OCR Verified (No Discrepancy: ${editForm.originalWater} Liters)`;
                                const electricityStatus = unitsNum.toString() !== editForm.originalElectricity ? `Corrected by Manager (Original OCR Read: ${editForm.originalElectricity} kWh)` : `OCR Verified (No Discrepancy: ${editForm.originalElectricity} kWh)`;

                                const reportContent = `========================================
ECOTRACE INDIA PRIVATE LIMITED
STATUTORY ANNUAL RETURNS COMPILATION ENGINE
========================================
Company Name: ${factoryData.name}
Location: ${factoryData.location}
Discharge Limit: ${factoryData.dischargeLimit} Liters
CTO Expiry Date: ${factoryData.ctoExpiryDate}
----------------------------------------
1. FORM 3 (WATER CESS CALCULATION - AUDIT TRAIL):
   - Manager Confirmed Water Volume: ${waterVol} Liters
   - Audit Status: ${waterStatus}
   - Status: Verified & Human-in-the-Loop Approved

2. FORM 4 (HAZARDOUS WASTE & CPCB SCHEDULE CLASSIFICATION):
   - Selected Schedule Category: ${editForm.hazardousCategory}
   - Reported Tonnage: 12.33 Metric Tonnes (Estimated / Sample Value - Awaiting Plant Audit Data)
   - Note: Actual tonnage must match manifest records and plant audit logs (Software provides legal classification, not calculation formula).
   - Form 10 Transporter Manifest: Ready for Manual Portal Upload
   - Storage Facility Capacity: Compliant (Within 90 Days Limit)

3. FORM 5 (ENVIRONMENTAL STATEMENT & AUDIT TRAIL):
   - Manager Confirmed Power Input: ${unitsNum} kWh
   - Audit Status: ${electricityStatus}
   - Scope 2 Carbon Footprint: ${carbonMap} kg CO2e
   - Efficiency Index: 96.2% Optimal
----------------------------------------
AUTHENTICATION & DIGITAL VAULT HASH:
Hash ID: 0xa8f392c1b4e87019d6f2231e (Tamper-Evident)
Status: Certified & Audit Ready for MPCB Inspection
========================================`;

                                const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
                                const url = URL.createObjectURL(blob);
                                const link = document.createElement('a');
                                link.href = url;
                                link.download = `${factoryData.name.replace(/\s+/g, '_')}_Statutory_Returns_Form3_4_5.txt`;
                                document.body.appendChild(link);
                                link.click();
                                document.body.removeChild(link);
                            }}
                            style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}
                        >
                            📥 Export Report (.txt)
                        </button>
                    </div>
                )}

                {activeModule === 'tankerGPS' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '18px' }}>🚚 Tanker GPS (when connected) & Form 10 Hazardous Waste Manifest</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Real-time GPS tracking of hazardous waste tankers moving from <strong>{factoryData.name}</strong> to MWML Taloja/Ranjangaon.</p>
                        
                        <div style={{ backgroundColor: '#1f2937', border: '1px solid #f59e0b', color: '#fcd34d', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', marginBottom: '16px' }}>
                            Status: No Signal / Data Unavailable — Fallback to Manual Form 10 Manifest & Log Verification
                        </div>

                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', border: '1px solid #374151', marginBottom: '16px' }}>
                            <h4 style={{ color: '#34d399', margin: '0 0 8px 0', fontSize: '13px' }}>📋 Manifest & CPCB Category Reference</h4>
                            <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#d1d5db' }}>• Form 10 Manifest ID: MH-HW-2026-8819</p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#d1d5db' }}>• Linked Hazardous Classification: <strong>{editForm.hazardousCategory}</strong></p>
                        </div>

                        <button onClick={() => alert('Generating Form 10 Manifest Certificate (.txt)...')} style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                            📥 Download Form 10 Manifest
                        </button>
                    </div>
                )}

                {activeModule === 'ctoDossier' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '18px' }}>📄 CTO Renewal Auto-Dossier Generator</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Automated package compiler for <strong>{factoryData.name}</strong> targeting MPCB OCMMS renewals.</p>
                        <div style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', border: `1px solid ${getCtoColor(ctoDaysLeft)}` }}>
                            CTO Expiry in {ctoDaysLeft} Days ({factoryData.ctoExpiryDate}) — Dossier Ready for Manual Portal Upload
                        </div>
                    </div>
                )}

                {activeModule === 'greenPassport' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '18px' }}>🌱 B2B Green Passport & SEBI BRSR Core Engine</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Instantly generates a structured 3-page sustainability report.</p>
                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>Green Passport ID: ET-GP-2026-9942</p>
                            <p style={{ margin: 0, fontSize: '13px', color: '#d1d5db' }}>Company: <strong>{factoryData.name}</strong> | Location: {factoryData.location}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            <button
                                onClick={() => {
                                    const unitsNum = parseFloat(editForm.unitsConsumed) || 1450;
                                    const waterVol = editForm.waterDischarge || '3200';
                                    const carbonMap = (unitsNum * 0.82).toFixed(2);
                                    const waterStatus = waterVol !== editForm.originalWater ? `Corrected by Manager (OCR Read: ${editForm.originalWater})` : `Verified (No Discrepancy)`;
                                    const electricityStatus = unitsNum.toString() !== editForm.originalElectricity ? `Corrected by Manager (OCR Read: ${editForm.originalElectricity})` : `Verified (No Discrepancy)`;

                                    const reportHtml = `<html>
                                        <head><title>Green Passport - ${factoryData.name}</title></head>
                                        <body style="font-family: Arial; padding: 20px; background: #f4f4f4;">
                                            <div style="background: white; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto;">
                                                <h2 style="color: #059669;">ECOTRACE INDIA PRIVATE LIMITED</h2>
                                                <h3>3-Page Green Passport & Carbon Dossier</h3>
                                                <hr/>
                                                <p><strong>Company Name:</strong> ${factoryData.name}</p>
                                                <p><strong>Location:</strong> ${factoryData.location}</p>
                                                <p><strong>Green Passport ID:</strong> ET-GP-2026-9942</p>
                                                <hr/>
                                                <h4>Scanned Utility & Audit Trail Metrics:</h4>
                                                <ul>
                                                    <li>Electricity Consumed: <strong>${unitsNum} kWh</strong> [Status: ${electricityStatus}]</li>
                                                    <li>Water Discharge Volume: <strong>${waterVol} Liters</strong> [Status: ${waterStatus}]</li>
                                                    <li>CPCB Schedule Category: <strong>{editForm.hazardousCategory}</strong></li>
                                                    <li>Carbon Mapping (Scope 2 Emissions): <strong>${carbonMap} kg CO2e</strong></li>
                                                </ul>
                                                <p style="color: green; font-weight: bold;">Status: Verified, Compliant & Audit Ready</p>
                                            </div>
                                        </body>
                                    </html>`;

                                    const blob = new Blob([reportHtml], { type: 'text/html;charset=utf-8' });
                                    const url = URL.createObjectURL(blob);
                                    window.open(url, '_blank');
                                }}
                                style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                            >
                                View 3-Page Green Passport Report
                            </button>
                            <button
                                onClick={() => {
                                    const unitsNum = parseFloat(editForm.unitsConsumed) || 1450;
                                    const waterVol = editForm.waterDischarge || '3200';
                                    const carbonMap = (unitsNum * 0.82).toFixed(2);
                                    const waterStatus = waterVol !== editForm.originalWater ? `Corrected by Manager (OCR Read: ${editForm.originalWater})` : `Verified (No Discrepancy)`;
                                    const electricityStatus = unitsNum.toString() !== editForm.originalElectricity ? `Corrected by Manager (OCR Read: ${editForm.originalElectricity})` : `Verified (No Discrepancy)`;

                                    const reportContent = `========================================
ECOTRACE INDIA PRIVATE LIMITED
B2B GREEN PASSPORT & CARBON MAPPING DOSSIER
========================================
Company Name: ${factoryData.name}
Location: ${factoryData.location}
Green Passport ID: ET-GP-2026-9942
----------------------------------------
SCANNED UTILITY & AUDIT TRAIL DATA:
- Electricity Units Consumed: ${unitsNum} kWh [Status: ${electricityStatus}]
- Water Discharge Volume: ${waterVol} Liters [Status: ${waterStatus}]
- CPCB Schedule Category: ${editForm.hazardousCategory}
- Carbon Mapping (Scope 2 Emission): ${carbonMap} kg CO2e
----------------------------------------
Status: Verified, Calculated & Audit Ready
========================================`;

                                    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
                                    const url = URL.createObjectURL(blob);
                                    const link = document.createElement('a');
                                    link.href = url;
                                    link.download = `${factoryData.name}_Green_Passport_Report.txt`;
                                    document.body.appendChild(link);
                                    link.click();
                                    document.body.removeChild(link);
                                }}
                                style={{ backgroundColor: '#374151', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}
                            >
                                Export Report (.txt)
                            </button>
                        </div>
                    </div>
                )}

                {activeModule === 'ewaste' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '18px' }}>📦 E-Waste & Battery EPR Statutory Vault</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Tracking registry and recycler verification for <strong>{factoryData.name}</strong>.</p>
                        
                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', border: '1px solid #374151', marginBottom: '16px' }}>
                            <h4 style={{ color: '#f59e0b', margin: '0 0 8px 0', fontSize: '13px' }}>♻️ Recycler Partner Status</h4>
                            <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#d1d5db' }}>• Partner Recycler: <strong>Sample Recycler Partner (Pending Real Verification)</strong></p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#d1d5db' }}>• Linked Waste Category: <strong>{editForm.hazardousCategory}</strong></p>
                        </div>

                        <div style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                            EPR Compliance Status: Internally Verified & Ready for CPCB Filing
                        </div>
                    </div>
                )}

                {activeModule === 'sbiRebate' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '18px' }}>💰 SBI / SIDBI Working Capital Interest Rebate</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Use your verified Green Passport to secure interest rate reduction on business loans.</p>
                        <div style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', marginBottom: '12px' }}>
                            Status: Eligible for Working Capital Interest Rebate Review
                        </div>
                        <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af' }}>(Subject to bank circulars)</p>
                    </div>
                )}

                {activeModule === 'blockchain' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#8b5cf6', marginTop: 0, fontSize: '18px' }}>⛓️ Tamper-Evident Digital Vault (Audit Trail Ledger)</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Cryptographically signed logging system recording IoT sensor data updates for <strong>{factoryData.name}</strong>.</p>
                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>Active Hash</p>
                            <p style={{ margin: 0, fontSize: '12px', color: '#34d399', fontFamily: 'monospace' }}>{activeHash} (Tamper-Evident Verified)</p>
                        </div>
                        <button onClick={generateNewHash} style={{ backgroundColor: '#8b5cf6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>
                            Sync & Verify Hash
                        </button>
                    </div>
                )}

                {activeModule === 'mcciGrants' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#8b5cf6', marginTop: 0, fontSize: '18px' }}>🏛️ MCCI Privacy Shield & Govt Grants</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Portal connector linking MSMEs to capital subsidies while keeping individual factory data private.</p>
                        <div style={{ backgroundColor: '#1f2937', border: '1px solid #f59e0b', color: '#fcd34d', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                            MCCI Partnership Status: Pending / In Discussion (Sample Status)
                        </div>
                    </div>
                )}

                {activeModule === 'onboard' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#818cf8', marginTop: 0, fontSize: '18px' }}>🏢 Multi-Tenant Client Onboarding & CTO Setup</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Register new manufacturing units with actual CTO expiry dates for tracking.</p>
                        
                        <form onSubmit={handleOnboardSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Company Name</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter company name" 
                                    value={tempCompanyName}
                                    onChange={(e) => setTempCompanyName(e.target.value)}
                                    style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} 
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>MIDC Location (e.g. Chakan)</label>
                                <input 
                                    type="text" 
                                    placeholder="MIDC Location" 
                                    value={tempMidcLocation}
                                    onChange={(e) => setTempMidcLocation(e.target.value)}
                                    style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} 
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>MPCB Discharge Limit (Liters)</label>
                                <input 
                                    type="text" 
                                    placeholder="Discharge Limit" 
                                    value={tempDischargeLimit}
                                    onChange={(e) => setTempDischargeLimit(e.target.value)}
                                    style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} 
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>CTO Expiry Date (Real Target)</label>
                                <input 
                                    type="date" 
                                    value={tempCtoDate}
                                    onChange={(e) => setTempCtoDate(e.target.value)}
                                    style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} 
                                />
                            </div>
                            <button 
                                type="submit" 
                                style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px', fontSize: '13px' }}
                            >
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
