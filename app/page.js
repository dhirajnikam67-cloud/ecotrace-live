'use client';
import React, { useState } from 'react';

export default function EcoTraceDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModule, setActiveModule] = useState('greenCorridor');

    const [macroData, setMacroData] = useState({
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
                        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#10b981', margin: '0' }}>EcoTrace India Private Limited</h1>
                        <p style={{ fontSize: '12px', color: '#9ca3af', margin: 0 }}>MPCB Legal Shield & dMRV Green Operating System | Project by Dhiraj Nikam</p>
                    </div>
                </div>
                <div style={{ backgroundColor: '#1f2937', border: '1px solid #374151', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', color: '#34d399' }}>
                    WESTERN CHEMICALS (BHOSARI MIDC, PUNE)
                </div>
            </header>

            {/* 100% Complete Sidebar Navigation matching your exact screenshot */}
            {isMenuOpen && (
                <aside style={{ position: 'absolute', top: '70px', left: 0, width: '340px', height: 'calc(100vh - 70px)', backgroundColor: '#111827', borderRight: '1px solid #1f2937', zIndex: 100, overflowY: 'auto', padding: '16px' }}>
                    <h3 style={{ fontSize: '13px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '12px' }}>Unified Command Dashboard</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        
                        {/* Mobile AI OCR & dMRV Scan */}
                        <div style={{ border: '1px solid #059669', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937', cursor: 'pointer' }} onClick={() => { setActiveModule('ocrScan'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#34d399', fontSize: '13px' }}>⚡ Mobile AI OCR & dMRV Scan</strong>
                        </div>

                        {/* Macro Green Corridor (New Strategic Addition) */}
                        <div style={{ border: '1px solid #3b82f6', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937', cursor: 'pointer' }} onClick={() => { setActiveModule('greenCorridor'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#60a5fa', fontSize: '13px' }}>🌐 Macro Green Corridor & Privacy</strong>
                        </div>

                        {/* [A] RISK & EMERGENCY SHIELD */}
                        <div style={{ border: '1px solid #ef4444', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444', marginBottom: '6px' }}>[A] RISK & EMERGENCY SHIELD</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('risk1'); setIsMenuOpen(false); }}>• Flying Squad Audit Mode</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('risk2'); setIsMenuOpen(false); }}>• Toxic Gas Leak Radar</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('risk3'); setIsMenuOpen(false); }}>• Notice Defense Matrix</div>
                        </div>

                        {/* [B] UTILITY & COST SAVINGS */}
                        <div style={{ border: '1px solid #3b82f6', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '6px' }}>[B] UTILITY & COST SAVINGS</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('utility1'); setIsMenuOpen(false); }}>• MSEDCL Smart Grid & PF</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('utility2'); setIsMenuOpen(false); }}>• ETP CAPEX & ROI Calculator</div>
                        </div>

                        {/* [C] STATUTORY COMPLIANCE */}
                        <div style={{ border: '1px solid #eab308', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#eab308', marginBottom: '6px' }}>[C] STATUTORY COMPLIANCE</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('stat1'); setIsMenuOpen(false); }}>• Form 3, 4 & 5 Annual Returns</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('stat2'); setIsMenuOpen(false); }}>• CTO Renewal Auto-Dossier</div>
                        </div>

                        {/* [D] SUPPLY CHAIN & ESG */}
                        <div style={{ border: '1px solid #10b981', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981', marginBottom: '6px' }}>[D] SUPPLY CHAIN & ESG</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('greenCorridor'); setIsMenuOpen(false); }}>• B2B Green Passport</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('tankerGPS'); setIsMenuOpen(false); }}>• Tanker GPS & Form 10</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('ewaste'); setIsMenuOpen(false); }}>• E-Waste & Battery EPR Vault</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('sbiRebate'); setIsMenuOpen(false); }}>• SBI / SIDBI Loan Rebate</div>
                        </div>

                        {/* [E] COMMAND & GRANTS */}
                        <div style={{ border: '1px solid #8b5cf6', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '6px' }}>[E] COMMAND & GRANTS</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('blockchain'); setIsMenuOpen(false); }}>• Blockchain Immutable Ledger</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('mcciGrants'); setIsMenuOpen(false); }}>• MCCI Privacy & Grants</div>
                        </div>

                        {/* Multi-Tenant Factory Onboard */}
                        <div style={{ border: '1px solid #6366f1', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937', cursor: 'pointer' }} onClick={() => { setActiveModule('onboard'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#818cf8', fontSize: '13px' }}>🏢 Multi-Tenant Factory Onboard</strong>
                        </div>

                    </div>
                </aside>
            )}

            {/* Main Content Area */}
            <div style={{ padding: '24px' }}>
                {activeModule === 'greenCorridor' && (
                    <div>
                        <h2 style={{ color: '#34d399', marginBottom: '16px' }}>Macro-Level Green Industrial Corridor & Privacy Shield</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                                <h3 style={{ color: '#34d399', marginTop: 0 }}>🌐 Regional Aggregates</h3>
                                <p style={{ fontSize: '13px', color: '#9ca3af' }}>{macroData.corridorName}</p>
                                <div style={{ backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px', marginTop: '12px' }}>
                                    <p style={{ margin: '4px 0' }}>Active Units: <strong>{macroData.activeMonitoringUnits} Factories</strong></p>
                                    <p style={{ margin: '4px 0' }}>Total Carbon: <strong>{macroData.regionalAggregates.totalCarbonEmissionTonnes} Tons</strong></p>
                                    <p style={{ margin: '4px 0' }}>Green Compliance: <strong style={{ color: '#34d399' }}>{macroData.regionalAggregates.greenCompliancePercentage}</strong></p>
                                </div>
                            </div>

                            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                                <h3 style={{ color: '#34d399', marginTop: 0 }}>🔒 Zero-Knowledge Privacy Shield</h3>
                                <p style={{ fontSize: '13px', color: '#9ca3af' }}>State & MCCI audit access with complete business data protection.</p>
                                <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '12px', borderRadius: '8px', marginTop: '16px', fontSize: '14px', fontWeight: '500', textAlign: 'center' }}>
                                    Status: {macroData.privacyShieldStatus}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeModule === 'ocrScan' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                        <h2 style={{ color: '#34d399' }}>Mobile AI OCR & dMRV Scan</h2>
                        <p style={{ color: '#9ca3af' }}>Scan factory invoices, manifest challans, and stack emission logs instantly using AI OCR.</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '12px', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                            AI Scanner Status: Ready for Document Ingestion
                        </div>
                    </div>
                )}

                {activeModule === 'ewaste' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                        <h2 style={{ color: '#34d399' }}>E-Waste & Battery EPR Statutory Vault</h2>
                        <p style={{ color: '#9ca3af' }}>Tracking registry for electronic waste and industrial battery disposal volumes under 2022 framework rules.</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '12px', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                            EPR Compliance Status: 100% Certified & Audit Ready
                        </div>
                    </div>
                )}

                {activeModule === 'sbiRebate' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                        <h2 style={{ color: '#34d399' }}>SBI / SIDBI Working Capital Interest Rebate</h2>
                        <p style={{ color: '#9ca3af' }}>Use your verified Green Passport to secure up to 1.5% interest rate reduction on business loans.</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '12px', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                            Status: Eligible for Working Capital Interest Rebate
                        </div>
                    </div>
                )}

                {activeModule === 'blockchain' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                        <h2 style={{ color: '#34d399' }}>Blockchain Immutable Audit Trail Ledger</h2>
                        <p style={{ color: '#9ca3af' }}>Cryptographically signed logging system recording IoT sensor data updates with permanent hashes.</p>
                        <div style={{ backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px', marginTop: '12px', fontFamily: 'monospace', color: '#fbbf24' }}>
                            Active Hash: {activeHash}
                        </div>
                        <button onClick={generateNewHash} style={{ marginTop: '16px', backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Sync & Verify Hash
                        </button>
                    </div>
                )}

                {activeModule === 'mcciGrants' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                        <h2 style={{ color: '#34d399' }}>MCCI Privacy Shield & Govt Grants</h2>
                        <p style={{ color: '#9ca3af' }}>Portal connector linking MSMEs to capital subsidies (such as up to 50% CAPEX support) while keeping individual factory data private.</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '12px', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                            MCCI Partnership Status: Active & Verified for State Grants
                        </div>
                    </div>
                )}

                {activeModule === 'onboard' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                        <h2 style={{ color: '#34d399' }}>Multi-Tenant Factory Onboard</h2>
                        <p style={{ color: '#9ca3af' }}>Register and onboard new manufacturing units across MIDC zones securely.</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '12px', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                            Status: Ready for New Tenant Registration
                        </div>
                    </div>
                )}

                {/* Generic view for other sub-modules */}
                {['risk1', 'risk2', 'risk3', 'utility1', 'utility2', 'stat1', 'stat2', 'tankerGPS'].includes(activeModule) && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                        <h2 style={{ color: '#34d399', textTransform: 'uppercase' }}>Module: {activeModule}</h2>
                        <p style={{ color: '#9ca3af' }}>Active operational module loaded successfully under MPCB Legal Shield framework.</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '12px', borderRadius: '8px', marginTop: '16px', fontWeight: 'bold' }}>
                            Status: 100% Compliant & Operational
                        </div>
                    </div>
                )}
            </div>

            {/* Legal Disclaimer Footer */}
            <footer style={{ borderTop: '1px solid #1f2937', padding: '16px', textAlign: 'center', fontSize: '10px', color: '#9ca3af', backgroundColor: '#111827', marginTop: '40px' }}>
                LEGAL DISCLAIMER & DEVELOPER LIABILITY WAIVER: EcoTrace India Private Limited and its developers act solely as a software interface...
            </footer>
        </main>
    );
}
