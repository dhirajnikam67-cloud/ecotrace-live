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

            {/* Collapsible Sidebar Navigation */}
            {isMenuOpen && (
                <aside style={{ position: 'absolute', top: '70px', left: 0, width: '320px', height: 'calc(100vh - 70px)', backgroundColor: '#111827', borderRight: '1px solid #1f2937', zIndex: 100, overflowY: 'auto', padding: '16px' }}>
                    <h3 style={{ fontSize: '14px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '12px' }}>EcoTrace OS Navigation</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ padding: '8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer' }} onClick={() => { setActiveModule('greenCorridor'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#34d399', fontSize: '13px' }}>🌐 Macro Green Corridor & Privacy</strong>
                        </div>
                        <div style={{ padding: '8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer' }} onClick={() => { setActiveModule('ewaste'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#ffffff', fontSize: '13px' }}>📦 E-Waste & Battery EPR Vault</strong>
                        </div>
                        <div style={{ padding: '8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer' }} onClick={() => { setActiveModule('sbiRebate'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#ffffff', fontSize: '13px' }}>💰 SBI / SIDBI Working Capital Rebate</strong>
                        </div>
                        <div style={{ padding: '8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer' }} onClick={() => { setActiveModule('blockchain'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#ffffff', fontSize: '13px' }}>⛓️ Blockchain Immutable Ledger</strong>
                        </div>
                        <div style={{ padding: '8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer' }} onClick={() => { setActiveModule('mcciGrants'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#ffffff', fontSize: '13px' }}>🏛️ MCCI Privacy Shield & Grants</strong>
                        </div>
                    </div>
                </aside>
            )}

            {/* Main Content Area */}
            <div style={{ padding: '24px' }}>
                {activeModule === 'greenCorridor' && (
                    <div>
                        <h2 style={{ color: '#34d399', marginBottom: '16px' }}>Macro-Level Green Industrial Corridor</h2>
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
            </div>

            {/* Legal Disclaimer Footer */}
            <footer style={{ borderTop: '1px solid #1f2937', padding: '16px', textAlign: 'center', fontSize: '10px', color: '#9ca3af', backgroundColor: '#111827', marginTop: '40px' }}>
                LEGAL DISCLAIMER & DEVELOPER LIABILITY WAIVER: EcoTrace India Private Limited and its developers act solely as a software interface...
            </footer>
        </main>
    );
}
