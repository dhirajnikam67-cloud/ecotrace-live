'use client';
import React, { useState } from 'react';

export default function EcoTraceDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModule, setActiveModule] = useState('mainDashboard');

    // Model 1 State for Safety & Advisory Check
    const [auditResult, setAuditResult] = useState(null);
    const [loadingAudit, setLoadingAudit] = useState(false);

    const runSafetyAudit = async () => {
        setLoadingAudit(true);
        try {
            const res = await fetch('/api/compliance-check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    factoryId: 'WESTERN_CHEMICALS_BHOSARI', 
                    powerFactor: 0.94, 
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
                        style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {isMenuOpen ? '✕ Close Console' : '☰ Global Navigation'}
                    </button>
                    <div>
                        <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#10b981', margin: '0' }}>EcoTrace India Private Limited</h1>
                        <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>MPCB Legal Shield & dMRV Green Operating System | Contact: 7378780745 | dhiraj@ecotraceindia.com</p>
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

            {/* Professional Wide Global Navigation Drawer */}
            {isMenuOpen && (
                <div style={{ position: 'absolute', top: '70px', left: 0, width: '100%', backgroundColor: '#111827', borderBottom: '2px solid #1f2937', zIndex: 100, padding: '24px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #1f2937', paddingBottom: '10px' }}>
                        <h3 style={{ fontSize: '13px', color: '#34d399', textTransform: 'uppercase', margin: 0, letterSpacing: '1px' }}>🌐 Global Command Center - Enterprise Modules</h3>
                        <button onClick={() => setIsMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#9ca3af', cursor: 'pointer', fontSize: '14px' }}>✕ Close</button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ fontSize: '11px', fontWeight: 'bold', color: '#10b981' }}>CORE PLATFORM</div>
                            <div style={{ padding: '8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('mainDashboard'); setIsMenuOpen(false); }}>🏠 Main Enterprise Overview</div>
                            <div style={{ padding: '8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('greenCorridor'); setIsMenuOpen(false); }}>🌐 Macro Green Industrial Corridor</div>
                            <div style={{ padding: '8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('ocrScan'); setIsMenuOpen(false); }}>⚡ Mobile AI OCR & dMRV Geo-Scan</div>
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
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('blockchain'); setIsMenuOpen(false); }}>• Blockchain Immutable Ledger</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }} onClick={() => { setActiveModule('mcciGrants'); setIsMenuOpen(false); }}>• MCCI Privacy Shield & Grants</div>
                            <div style={{ padding: '6px 8px', backgroundColor: '#1f2937', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', color: '#818cf8', fontWeight: 'bold' }} onClick={() => { setActiveModule('onboard'); setIsMenuOpen(false); }}>🏢 Multi-Tenant Client Onboarding</div>
                        </div>

                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
                
                {/* Model 1 Safe Integration Panel (Added on top without losing any old design) */}
                <div style={{ marginBottom: '20px', padding: '16px', background: '#111827', borderRadius: '12px', border: '1px solid #3b82f6' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ color: '#60a5fa', margin: '0 0 4px 0', fontSize: '15px' }}>Model 1: Intelligent Watchman & Legal Shield</h4>
                            <p style={{ color: '#9ca3af', margin: 0, fontSize: '12px' }}>Zero Machine Trip / Advisory Alert Mode Active</p>
                        </div>
                        <button 
                            onClick={runSafetyAudit}
                            style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
                            disabled={loadingAudit}
                        >
                            {loadingAudit ? 'Running Audit...' : 'Run Safety & Notice Defense Check'}
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

                {activeModule === 'risk2' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#ef4444', marginTop: 0, fontSize: '20px' }}>⚠️ Toxic & Boiler Gas Leak Safety Radar</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Real-time Parts Per Million (PPM) concentration tracking for Ammonia, LPG, PNG, Chlorine, and Solvents.</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                            Status: All Gas Sensors Normal (0.05 PPM Safe Range)
                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}
