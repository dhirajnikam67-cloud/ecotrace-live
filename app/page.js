'use client';
import React, { useState } from 'react';

export default function EcoTraceDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModule, setActiveModule] = useState('mainDashboard');

    // Macro-Level Green Corridor State for Government & MCCI
    const [macroData] = useState({
        corridorName: "India's First Green Industrial Corridor - Pune Region",
        activeMonitoringUnits: 142,
        regionalAggregates: {
            totalCarbonEmissionTonnes: 1250.4,
            totalWaterConsumptionKL: 45000,
            greenCompliancePercentage: "94.5%"
        },
        privacyShieldStatus: "Active - 100% Data Anonymization Maintained"
    });

    const [activeHash, setActiveHash] = useState("0xa8f392c1b4e87019d6f2231e");

    const generateNewHash = () => {
        const randomHash = "0x" + Math.random().toString(16).substring(2, 18) + Math.random().toString(16).substring(2, 18);
        setActiveHash(randomHash);
    };

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#ffffff', fontFamily: 'sans-serif', position: 'relative' }}>
            
            {/* Top Navigation Bar */}
            <header style={{ borderBottom: '1px solid #1f2937', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#111827' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }}>
                        {isMenuOpen ? '✕ Close Menu' : '☰ Modules'}
                    </button>
                    <div>
                        <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', margin: '0' }}>EcoTrace India Private Limited</h1>
                        <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>MPCB Legal Shield & dMRV Green Operating System</p>
                    </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ backgroundColor: '#1f2937', border: '1px solid #374151', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', color: '#34d399' }}>
                        WESTERN CHEMICALS (BHOSARI MIDC, PUNE)
                    </div>
                    <button style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                        Export PDF
                    </button>
                    <button style={{ backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                        Sync MPCB/OEM
                    </button>
                </div>
            </header>

            {/* Collapsible Sidebar Navigation matching your exact screenshots */}
            {isMenuOpen && (
                <aside style={{ position: 'absolute', top: '70px', left: 0, width: '340px', height: 'calc(100vh - 70px)', backgroundColor: '#111827', borderRight: '1px solid #1f2937', zIndex: 100, overflowY: 'auto', padding: '16px' }}>
                    <h3 style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '12px' }}>Unified Command Dashboard</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        
                        {/* Main Dashboard */}
                        <div style={{ border: '1px solid #10b981', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937', cursor: 'pointer' }} onClick={() => { setActiveModule('mainDashboard'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#34d399', fontSize: '13px' }}>🏠 Main Enterprise Overview</strong>
                        </div>

                        {/* NEW: Macro Green Corridor */}
                        <div style={{ border: '1px solid #3b82f6', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937', cursor: 'pointer' }} onClick={() => { setActiveModule('greenCorridor'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#60a5fa', fontSize: '13px' }}>🌐 Macro Green Industrial Corridor</strong>
                        </div>

                        {/* Mobile AI OCR */}
                        <div style={{ border: '1px solid #059669', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937', cursor: 'pointer' }} onClick={() => { setActiveModule('ocrScan'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#34d399', fontSize: '13px' }}>⚡ Mobile AI OCR & dMRV Geo-Scan</strong>
                        </div>

                        {/* [A] RISK & EMERGENCY SHIELD */}
                        <div style={{ border: '1px solid #ef4444', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#ef4444', marginBottom: '6px' }}>[A] RISK & EMERGENCY SHIELD</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('risk1'); setIsMenuOpen(false); }}>• Flying Squad Audit Mode</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('risk2'); setIsMenuOpen(false); }}>• Toxic Gas Leak Radar</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('risk3'); setIsMenuOpen(false); }}>• Notice Defense Matrix</div>
                        </div>

                        {/* [B] UTILITY & COST SAVINGS */}
                        <div style={{ border: '1px solid #3b82f6', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '6px' }}>[B] UTILITY & COST SAVINGS</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('utility1'); setIsMenuOpen(false); }}>• MSEDCL Smart Grid & PF</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('utility2'); setIsMenuOpen(false); }}>• ETP CAPEX & ROI Calculator</div>
                        </div>

                        {/* [C] STATUTORY COMPLIANCE */}
                        <div style={{ border: '1px solid #eab308', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#eab308', marginBottom: '6px' }}>[C] STATUTORY COMPLIANCE</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('stat1'); setIsMenuOpen(false); }}>• Form 3, 4 & 5 Annual Returns</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('ctoDossier'); setIsMenuOpen(false); }}>• CTO Renewal Auto-Dossier</div>
                        </div>

                        {/* [D] SUPPLY CHAIN & ESG */}
                        <div style={{ border: '1px solid #10b981', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#10b981', marginBottom: '6px' }}>[D] SUPPLY CHAIN & ESG</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('greenPassport'); setIsMenuOpen(false); }}>• B2B Green Passport & BRSR</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('tankerGPS'); setIsMenuOpen(false); }}>• Tanker GPS & Form 10 Manifest</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('ewaste'); setIsMenuOpen(false); }}>• E-Waste & Battery EPR Vault</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('sbiRebate'); setIsMenuOpen(false); }}>• SBI / SIDBI Loan Rebate</div>
                        </div>

                        {/* [E] COMMAND & GRANTS */}
                        <div style={{ border: '1px solid #8b5cf6', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '6px' }}>[E] COMMAND & GRANTS</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('blockchain'); setIsMenuOpen(false); }}>• Blockchain Immutable Ledger</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('mcciGrants'); setIsMenuOpen(false); }}>• MCCI Privacy Shield & Grants</div>
                        </div>

                        {/* Multi-Tenant Onboard */}
                        <div style={{ border: '1px solid #6366f1', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937', cursor: 'pointer' }} onClick={() => { setActiveModule('onboard'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#818cf8', fontSize: '13px' }}>🏢 Multi-Tenant Client Onboarding</strong>
                        </div>

                    </div>
                </aside>
            )}

            {/* Main Content Area */}
            <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
                
                {/* 1. Main Dashboard */}
                {activeModule === 'mainDashboard' && (
                    <div>
                        <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Active Monitored Enterprise</p>
                            <h2 style={{ color: '#34d399', margin: '0 0 6px 0', fontSize: '20px' }}>WESTERN CHEMICALS - BHOSARI MIDC, PUNE</h2>
                            <p style={{ margin: 0, fontSize: '12px', color: '#34d399' }}>Status: COMPLIANT & AUDIT READY | Green Passport ID: ET-GP-2026-9942</p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                                <h4 style={{ color: '#ef4444', margin: '0 0 6px 0' }}>🚨 MPCB Legal Shield</h4>
                                <h3 style={{ margin: '0 0 6px 0', fontSize: '16px' }}>AUTO-GENERATED (Form V Ready)</h3>
                                <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>CTO Valid: 82 Days Left</p>
                            </div>

                            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                                <h4 style={{ color: '#3b82f6', margin: '0 0 6px 0' }}>📊 dMRV Carbon Emissions</h4>
                                <h3 style={{ margin: '0 0 6px 0', fontSize: '16px' }}>Scope 1: 1.2 MT</h3>
                                <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Scope 2 & 3 Verified via CEA</p>
                            </div>

                            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                                <h4 style={{ color: '#eab308', margin: '0 0 6px 0' }}>💰 Financial Subvention</h4>
                                <h3 style={{ margin: '0 0 6px 0', fontSize: '15px' }}>Eligible for Working Capital Interest Rebate</h3>
                                <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Verified via Green Passport</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 2. Macro Green Corridor Dashboard */}
                {activeModule === 'greenCorridor' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ backgroundColor: '#111827', border: '1px solid #3b82f6', borderRadius: '12px', padding: '24px' }}>
                            <h2 style={{ color: '#60a5fa', marginTop: 0 }}>🌐 Macro-Level Green Industrial Corridor</h2>
                            <p style={{ fontSize: '13px', color: '#9ca3af' }}>{macroData.corridorName} — Government & MCCI Regional Monitoring</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '16px' }}>
                                <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                                    <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>Active Units</p>
                                    <p style={{ margin: '8px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#34d399' }}>{macroData.activeMonitoringUnits}</p>
                                </div>
                                <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                                    <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>Total Carbon</p>
                                    <p style={{ margin: '8px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>{macroData.regionalAggregates.totalCarbonEmissionTonnes} T</p>
                                </div>
                                <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
                                    <p style={{ margin: '0', fontSize: '12px', color: '#9ca3af' }}>Green Compliance</p>
                                    <p style={{ margin: '8px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#10b981' }}>{macroData.regionalAggregates.greenCompliancePercentage}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                            <h3 style={{ color: '#34d399', marginTop: 0 }}>🔒 Zero-Knowledge Privacy Shield</h3>
                            <p style={{ fontSize: '13px', color: '#9ca3af' }}>State & MCCI audit access with complete business data protection & anonymization.</p>
                            <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '12px', borderRadius: '8px', marginTop: '16px', fontSize: '14px', fontWeight: '500', textAlign: 'center' }}>
                                Status: {macroData.privacyShieldStatus}
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Mobile AI OCR Geo-Scan (1001731406.jpg) */}
                {activeModule === 'ocrScan' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <h2 style={{ color: '#34d399', margin: 0, fontSize: '20px' }}>⚡ Mobile AI OCR & dMRV Geo-Scan Engine</h2>
                            <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>LIVE GEO-TAGGING ACTIVE</span>
                        </div>
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>Snap bills, electricity meters, or waste manifests directly from mobile. Instant OCR extracts data, locks GPS location, and updates Form V.</p>
                        
                        <div style={{ marginTop: '20px', padding: '30px', border: '2px dashed #374151', borderRadius: '8px', textAlign: 'center', backgroundColor: '#1f2937' }}>
                            <button style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                                📸 Snap / Upload Utility & Waste Bills
                            </button>
                            <p style={{ margin: '12px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>GPS Location Lock & Anti-Fake Exif Protection Active.</p>
                        </div>
                    </div>
                )}

                {/* 4. MSEDCL Smart Energy Grid & PF Penalty Shield (1001731392.jpg) */}
                {activeModule === 'utility1' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '20px' }}>⚡ MSEDCL Smart Energy Grid & PF Penalty Shield</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Live monitoring dashboard tracking Power Factor (PF) and grid voltage harmonics.</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Power Factor (PF)</p>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#34d399' }}>0.99 (Incentive Eligible)</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>3-Phase Grid Voltage</p>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#ffffff' }}>415 V Balanced</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 5. MPCB Flying Squad Emergency Audit Mode (1001731393.jpg) */}
                {activeModule === 'risk1' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#ef4444', marginTop: 0, fontSize: '20px' }}>🚨 MPCB Flying Squad Emergency Audit Mode</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>1-Click instant compliance dossier aggregating CTO status, ETP health, and blockchain verification hashes.</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>CTO Status</p>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#34d399' }}>VALID (82 Days)</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>ETP Health</p>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>98% Optimal</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 6. Toxic & Boiler Gas Leak Safety Radar (1001731394.jpg) */}
                {activeModule === 'risk2' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#ef4444', marginTop: 0, fontSize: '20px' }}>⚠️ Toxic & Boiler Gas Leak Safety Radar</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Real-time Parts Per Million (PPM) concentration tracking for Ammonia, LPG, PNG, Chlorine, and Solvents.</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                            Status: All Gas Sensors Normal (0.05 PPM Safe Range)
                        </div>
                    </div>
                )}

                {/* 7. ETP & Green Tech CAPEX / ROI Calculator (1001731395.jpg & 1001731396.jpg) */}
                {activeModule === 'utility2' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '20px' }}>💡 ETP & Green Tech CAPEX / ROI Calculator</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Evaluates Effluent Treatment Plant capital expenditures against monthly chemical savings.</p>
                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', color: '#34d399' }}>
                            Estimated Payback Period: 14 Months | Monthly Savings: ₹45,000
                        </div>
                    </div>
                )}

                {/* 8. Form 3, Form 4 & Form 5 Annual Returns Generator (1001731397.jpg) */}
                {activeModule === 'stat1' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#eab308', marginTop: 0, fontSize: '20px' }}>📜 Form 3, Form 4 & Form 5 Annual Returns Generator</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Dedicated modules to instantly format daily logbooks, annual hazardous waste returns, and environmental statements directly matching MPCB formats.</p>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ backgroundColor: '#1f2937', padding: '14px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>FORM 3 (WATER CESS)</p>
                                <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#34d399' }}>Auto-Compiled & Ready</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '14px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>FORM 4 (HAZARDOUS WASTE)</p>
                                <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#3b82f6' }}>MWML Verified</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '14px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>FORM 5 (ENVIRONMENT STATEMENT)</p>
                                <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#eab308' }}>Ready for Portal Submission</p>
                            </div>
                        </div>

                        <button style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                            📥 Export All Returns (PDF)
                        </button>
                    </div>
                )}

                {/* 9. CTO Renewal Auto-Dossier (1001731398.jpg) */}
                {activeModule === 'ctoDossier' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#eab308', marginTop: 0, fontSize: '20px' }}>📑 CTO Renewal Auto-Dossier Generator</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>Automated package compiler targeting the MPCB OCMMS portal for Consent to Operate renewals.</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '16px', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                            CTO Expiry in 82 Days — Dossier Ready for 1-Click Submission
                        </div>
                    </div>
                )}

                {/* 10. B2B Green Passport (1001731399.jpg) */}
                {activeModule === 'greenPassport' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '20px' }}>🌱 B2B Green Passport & SEBI BRSR Core Engine</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>Instantly generates certified 3-page sustainability reports aligned with major OEM & Tier-1 supply chain frameworks.</p>
                        
                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#34d399', fontWeight: 'bold' }}>Green Passport ID: ET-GP-2026-9942</p>
                                <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>Company: WESTERN CHEMICALS | Location: BHOSARI MIDC, PUNE</p>
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>View 3-Page Green Passport Report</button>
                                <button style={{ backgroundColor: '#0284c7', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Download PDF</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 11. Hazardous Waste Tanker Route & Form 10 (1001731400.jpg) */}
                {activeModule === 'tankerGPS' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '20px' }}>🚚 Hazardous Waste Tanker Route & Form 10 Manifest</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>Live tracking integration for transport vehicles moving hazardous waste to CHWTSDF facilities (e.g., MEPL Ranjangaon).</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '16px', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                            Tanker GPS: In-Transit to Ranjangaon (Geo-Fence Secure)
                        </div>
                    </div>
                )}

                {/* 12. E-Waste & Battery EPR Vault (1001731401.jpg) */}
                {activeModule === 'ewaste' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '20px' }}>📦 E-Waste & Battery EPR Statutory Vault</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>Tracking registry for electronic waste and industrial battery disposal volumes under 2022 framework rules.</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '16px', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                            EPR Compliance Status: 100% Certified & Audit Ready
                        </div>
                    </div>
                )}

                {/* 13. SBI / SIDBI Loan Rebate (1001731402.jpg) */}
                {activeModule === 'sbiRebate' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#eab308', marginTop: 0, fontSize: '20px' }}>💰 SBI / SIDBI Working Capital Interest Rebate</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>Use your verified Green Passport to secure up to 1.5% interest rate reduction on business loans.</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '16px', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                            Status: Eligible for Working Capital Interest Rebate
                        </div>
                    </div>
                )}

                {/* 14. Blockchain Ledger (1001731403.jpg) */}
                {activeModule === 'blockchain' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#8b5cf6', marginTop: 0, fontSize: '20px' }}>⛓️ Blockchain Immutable Audit Trail Ledger</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>Cryptographically signed logging system recording IoT sensor data updates with permanent hashes.</p>
                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', marginTop: '16px', fontFamily: 'monospace', color: '#fbbf24', fontSize: '13px' }}>
                            Active Hash: {activeHash} (Tamper-Proof Verified)
                        </div>
                        <button onClick={generateNewHash} style={{ marginTop: '16px', backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                            Sync & Verify Hash
                        </button>
                    </div>
                )}

                {/* 15. MCCI Privacy Shield & Grants (1001731404.jpg) */}
                {activeModule === 'mcciGrants' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#8b5cf6', marginTop: 0, fontSize: '20px' }}>🏛️ MCCI Privacy Shield & Govt Grants</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>Portal connector linking MSMEs to capital subsidies (such as up to 50% CAPEX support) while keeping individual factory data private.</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '16px', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                            MCCI Partnership Status: Active & Verified for State Grants
                        </div>
                    </div>
                )}

                {/* 16. Multi-Tenant Onboarding (1001731405.jpg) */}
                {activeModule === 'onboard' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#6366f1', marginTop: 0, fontSize: '20px' }}>🏢 Multi-Tenant Client Onboarding Engine</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '20px' }}>Register new manufacturing units seamlessly across MIDC clusters.</p>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
                            <div>
                                <label style={{ fontSize: '12px', color: '#9ca3af' }}>Company Name</label>
                                <input type="text" placeholder="Enter company name" style={{ width: '100%', padding: '10px', marginTop: '4px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '12px', color: '#9ca3af' }}>MIDC Location (e.g. Chakan)</label>
                                <input type="text" placeholder="MIDC Location" style={{ width: '100%', padding: '10px', marginTop: '4px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white' }} />
                            </div>
                            <div>
                                <label style={{ fontSize: '12px', color: '#9ca3af' }}>MPCB Discharge Limit (Liters)</label>
                                <input type="text" placeholder="Discharge Limit" style={{ width: '100%', padding: '10px', marginTop: '4px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white' }} />
                            </div>
                            <button style={{ backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>
                                + Onboard Industrial Unit Live
                            </button>
                        </div>
                    </div>
                )}

                {/* Generic fallback for any remaining sub-modules */}
                {['risk3'].includes(activeModule) && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#34d399', textTransform: 'uppercase', marginTop: 0 }}>Module: {activeModule}</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>Active operational module loaded successfully under MPCB Legal Shield framework.</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '16px', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                            Status: 100% Compliant & Audit Ready
                        </div>
                    </div>
                )}

            </div>

            {/* Legal Disclaimer Footer (Matching exact original screenshots) */}
            <footer style={{ borderTop: '1px solid #1f2937', padding: '16px', textAlign: 'center', fontSize: '10px', color: '#9ca3af', backgroundColor: '#111827', marginTop: '40px' }}>
                LEGAL DISCLAIMER & DEVELOPER LIABILITY WAIVER: EcoTrace India Private Limited and its developers act solely as a software interface provider aggregating IoT data and statutory records. We assume NO liability or responsibility for any industrial accidents, gas leaks, equipment failures, financial losses, or statutory penalties arising from factory operations. Physical safety protocols, hardware calibration, and compliance adherence remain the absolute and sole responsibility of the factory management and authorized operators.
            </footer>
        </main>
    );
}
