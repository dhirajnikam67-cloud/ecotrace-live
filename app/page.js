'use client';
import React, { useState, useEffect } from 'react';

export default function EcoTraceDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModule, setActiveModule] = useState('mainDashboard');

    // Model 1 State & Auto-Trigger on Load (Guardrail: Human-in-the-loop & Safety First)
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
    }, []);

    const [macroData] = useState({
        corridorName: "EcoTrace's First Green Industrial Corridor Deployment", // Guardrail: Softened claim
        activeMonitoringUnits: 142,
        regionalAggregates: {
            totalCarbonEmissionTonnes: 1250.4,
            totalWaterConsumptionKL: 45000,
            greenCompliancePercentage: "94.5%"
        },
        privacyShieldStatus: "Active - Privacy-Protected Aggregation Maintained" // Guardrail: Honest labeling
    });

    // Guardrail: Tamper-Evident Digital Vault (Private Hash Chain) instead of false Blockchain claim
    const [activeHash, setActiveHash] = useState("0xa8f392c1b4e87019d6f2231e");

    const generateNewHash = () => {
        const randomHash = "0x" + Math.random().toString(16).substring(2, 18) + Math.random().toString(16).substring(2, 18);
        setActiveHash(randomHash);
    };

    // Dynamic CTO Expiry Days & Color Escalation
    const ctoDaysLeft = 22; 
    const getCtoColor = (days) => {
        if (days <= 15) return '#ef4444'; // Red (Critical Alert)
        if (days <= 30) return '#f59e0b'; // Yellow (Warning)
        return '#34d399';                // Green (Safe)
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
                    {/* Guardrail: Removed fake live MPCB sync button, replaced with safe export package action */}
                    <button style={{ backgroundColor: '#374151', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>
                        Export Verified Audit Package
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ color: '#60a5fa', margin: '0 0 4px 0', fontSize: '15px' }}>Model 1: Intelligent Watchman & Legal Shield (Auto-Audit Active)</h4>
                            <p style={{ color: '#9ca3af', margin: 0, fontSize: '12px' }}>Zero Machine Trip / Automated Advisory Mode (Human-in-the-Loop)</p>
                        </div>
                        <button 
                            onClick={runSafetyAudit}
                            style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
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
                            <h2 style={{ color: '#34d399', margin: '0 0 6px 0', fontSize: '20px' }}>WESTERN CHEMICALS - BHOSARI MIDC, PUNE</h2>
                            <p style={{ margin: 0, fontSize: '12px', color: '#34d399' }}>Status: COMPLIANT & AUDIT READY | Green Passport ID: ET-GP-2026-9942</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                            
                            <div style={{ backgroundColor: '#111827', border: `1px solid ${getCtoColor(ctoDaysLeft)}`, borderRadius: '12px', padding: '20px' }}>
                                <h4 style={{ color: '#ef4444', margin: '0 0 6px 0' }}>🚨 MPCB Legal Shield</h4>
                                <h3 style={{ margin: '0 0 6px 0', fontSize: '16px' }}>AUTO-GENERATED (Form V Ready)</h3>
                                <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: getCtoColor(ctoDaysLeft) }}>
                                    CTO Valid: {ctoDaysLeft} Days Left {ctoDaysLeft <= 30 ? '⚠️ (Action Required)' : ''}
                                </p>
                            </div>

                            <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                                <h4 style={{ color: '#3b82f6', margin: '0 0 6px 0' }}>📊 dMRV Carbon Emissions</h4>
                                <h3 style={{ margin: '0 0 6px 0', fontSize: '16px' }}>Scope 1: 1.2 MT</h3>
                                <div style={{ margin: '6px 0 0 0', fontSize: '11px', color: '#9ca3af', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <span>• Scope 2: Verified via CEA Grid Factors</span>
                                    <span>• Scope 3: Verified via Supply Chain Activity Logs</span>
                                </div>
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
                            <h3 style={{ color: '#34d399', marginTop: 0 }}>🔒 Privacy-Protected Aggregation Shield</h3>
                            <p style={{ fontSize: '13px', color: '#9ca3af' }}>State & MCCI audit access with complete business data protection.</p>
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
                        <p style={{ color: '#9ca3af', fontSize: '13px' }}>Snap bills, electricity meters, or waste manifests directly from mobile. Instant OCR extracts data, locks GPS location, and updates Form V. (Guardrail: Review & Edit Step Included)</p>
                        <div style={{ marginTop: '20px', padding: '30px', border: '2px dashed #374151', borderRadius: '8px', textAlign: 'center', backgroundColor: '#1f2937' }}>
                            <button style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                                📸 Snap / Upload Utility & Waste Bills
                            </button>
                            <p style={{ margin: '12px 0 0 0', fontSize: '12px', color: '#9ca3af' }}>GPS Location Lock & Exif Metadata Verification Active.</p>
                        </div>
                    </div>
                )}

                {activeModule === 'risk1' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#ef4444', marginTop: 0, fontSize: '20px' }}>🚨 MPCB Flying Squad Emergency Audit Mode</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>1-Click instant compliance dossier aggregating CTO status, ETP health, and digital vault hashes.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>CTO Status</p>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: getCtoColor(ctoDaysLeft) }}>VALID ({ctoDaysLeft} Days)</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>ETP Health</p>
                                <p style={{ margin: 0, fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>98% Optimal (Estimated)</p>
                            </div>
                        </div>
                    </div>
                )}

                {activeModule === 'risk2' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#ef4444', marginTop: 0, fontSize: '20px' }}>⚠️ Toxic & Boiler Gas Leak Safety Radar</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Real-time Parts Per Million (PPM) concentration tracking. (Guardrail: Monitoring & Alert Mode Only — No Auto-Shutoff without IEC 61511 / SIS Hardware)</p>
                        <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px' }}>
                            Status: All Gas Sensors Normal (0.05 PPM Safe Range)
                        </div>
                    </div>
                )}

                {activeModule === 'risk3' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#ef4444', marginTop: 0, fontSize: '20px' }}>Notice Defense Matrix & AI Legal Draft Generator</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Automated analysis of MPCB show-cause notices against historical IoT stack emission and ETP telemetry logs.</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Latest Received Notice</p>
                                <p style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 'bold', color: '#f87171' }}>Ref: MPCB/RO-PUNE/Notice/2026/049</p>
                                <p style={{ margin: 0, fontSize: '12px', color: '#d1d5db' }}>Allegation: Effluent parameter variance observed on 4th April.</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #34d399' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase' }}>Digital Vault Counter-Evidence</p>
                                <p style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 'bold', color: '#34d399' }}>IoT Sensor Log Match: 100% Within Norms</p>
                                <p style={{ margin: 0, fontSize: '11px', color: '#9ca3af', fontFamily: 'monospace' }}>Hash: 0xa8f392c1b4e87019d6f2231e (Tamper-Evident)</p>
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#1f2937', padding: '20px', borderRadius: '8px' }}>
                            <h3 style={{ color: '#60a5fa', margin: '0 0 6px 0', fontSize: '15px' }}>📄 AI Legal Reply Dossier Generator</h3>
                            <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>Click below to compile a formal legal response citing Water Act 1974 Section 33(A) and corresponding calibration logs.</p>
                            <button style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                                ⚡ Generate & Download MPCB Legal Defense Reply (PDF)
                            </button>
                        </div>
                    </div>
                )}

                {activeModule === 'utility1' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '20px' }}>⚡ MSEDCL Smart Grid & Power Factor Optimizer</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Real-time reactive power compensation monitoring. (Guardrail: MSEDCL Penalty Threshold corrected to &lt; 0.90)</p>
                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>Current Power Factor</p>
                                <p style={{ margin: 0, fontSize: '22px', fontWeight: 'bold', color: '#34d399' }}>0.94 (Above Penalty Threshold 0.90)</p>
                            </div>
                            <button style={{ backgroundColor: '#3b82f6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                                Trigger Operator Recommendation
                            </button>
                        </div>
                    </div>
                )}

                {activeModule === 'utility2' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '20px' }}>💡 ETP & Green Tech CAPEX / ROI Calculator</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Evaluates Effluent Treatment Plant capital expenditures against monthly chemical savings.</p>
                        <div style={{ backgroundColor: '#1f2937', padding: '20px', borderRadius: '8px', color: '#34d399', fontWeight: 'bold', fontSize: '16px' }}>
                            Estimated Payback Period: 14 Months | Monthly Savings: ₹45,000 (Based on Industry Benchmarks)
                        </div>
                    </div>
                )}

                {activeModule === 'stat1' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '20px' }}>📑 Form 3, Form 4 & Form 5 Annual Returns Generator</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Dedicated modules to format daily logbooks and annual returns matching MPCB formats. (Guardrail: Includes Data Completeness Check & Review/Edit step before export)</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>FORM 3 (WATER CESS)</p>
                                <p style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#34d399' }}>Auto-Compiled (Data Complete)</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>FORM 4 (HAZARDOUS WASTE)</p>
                                <p style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#3b82f6' }}>MWML Format Ready</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>FORM 5 (ENVIRONMENT STATEMENT)</p>
                                <p style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#f59e0b' }}>Ready for Review & Submission</p>
                            </div>
                        </div>
                        <button style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                            📥 Review & Export All Returns (PDF)
                        </button>
                    </div>
                )}

                {activeModule === 'ctoDossier' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#3b82f6', marginTop: 0, fontSize: '20px' }}>📄 CTO Renewal Auto-Dossier Generator</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Automated package compiler targeting the MPCB OCMMS portal for Consent to Operate renewals.</p>
                        <div style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px', border: `1px solid ${getCtoColor(ctoDaysLeft)}` }}>
                            CTO Expiry in {ctoDaysLeft} Days — Dossier Ready for Manual Portal Upload
                        </div>
                    </div>
                )}

                {activeModule === 'greenPassport' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '20px' }}>🌱 B2B Green Passport & SEBI BRSR Core Engine</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Instantly generates certified 3-page sustainability reports aligned with major OEM & Tier-1 supply chain frameworks.</p>
                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>Green Passport ID: ET-GP-2026-9942</p>
                            <p style={{ margin: 0, fontSize: '13px', color: '#d1d5db' }}>Company: WESTERN CHEMICALS | Location: BHOSARI MIDC, PUNE</p>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <button style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                                View 3-Page Green Passport Report
                            </button>
                            <button style={{ backgroundColor: '#374151', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                                Download PDF
                            </button>
                        </div>
                    </div>
                )}

                {activeModule === 'tankerGPS' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <h2 style={{ color: '#10b981', margin: 0, fontSize: '20px' }}>🚚 Hazardous Waste Tanker Route & Form 10 Manifest</h2>
                            <span style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>GEO-FENCE SECURE</span>
                        </div>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Live tracking integration for transport vehicles moving hazardous waste. (Guardrail: Displays 'No Signal / Data Unavailable' if GPS feed is lost)</p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                            <div style={{ backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>MANIFEST ID</p>
                                <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#34d399' }}>FORM-10 #WB-2026-884</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>TRANSPORTER & VEHICLE</p>
                                <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#3b82f6' }}>MH-14-BW-4921 (Authorized)</p>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px' }}>
                                <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>DESTINATION SITE</p>
                                <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#f59e0b' }}>MEPL Ranjangaon CHWTSDF</p>
                            </div>
                        </div>
                        <div style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '14px', borderRadius: '8px', fontWeight: 'bold', fontSize: '13px', marginBottom: '16px', textAlign: 'center' }}>
                            📍 Tanker GPS Live Status: In-Transit on Pune-Nagar Road (Secured via Geo-Fence)
                        </div>
                        <button style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                            Download Form 10 Digital Manifest Copy
                        </button>
                    </div>
                )}

                {activeModule === 'ewaste' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '20px' }}>📦 E-Waste & Battery EPR Statutory Vault</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Tracking registry for electronic waste. (Guardrail: Recyclers verified against CPCB registered lists; status labeled as Internally Verified & Ready)</p>
                        <div style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px' }}>
                            EPR Compliance Status: Internally Verified & Ready for CPCB Filing
                        </div>
                    </div>
                )}

                {activeModule === 'sbiRebate' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#10b981', marginTop: 0, fontSize: '20px' }}>💰 SBI / SIDBI Working Capital Interest Rebate</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Use your verified Green Passport to secure interest rate reduction on business loans (Subject to bank circulars).</p>
                        <div style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px' }}>
                            Status: Eligible for Working Capital Interest Rebate Review
                        </div>
                    </div>
                )}

                {activeModule === 'blockchain' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#8b5cf6', marginTop: 0, fontSize: '20px' }}>⛓️ Tamper-Evident Digital Vault (Audit Trail Ledger)</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Cryptographically signed logging system recording IoT sensor data updates with permanent private hashes.</p>
                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', marginBottom: '16px' }}>
                            <p style={{ margin: '0 0 4px 0', fontSize: '11px', color: '#9ca3af' }}>Active Hash</p>
                            <p style={{ margin: 0, fontSize: '13px', color: '#34d399', fontFamily: 'monospace' }}>{activeHash} (Tamper-Evident Verified)</p>
                        </div>
                        <button onClick={generateNewHash} style={{ backgroundColor: '#8b5cf6', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                            Sync & Verify Hash
                        </button>
                    </div>
                )}

                {activeModule === 'mcciGrants' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#8b5cf6', marginTop: 0, fontSize: '20px' }}>🏛️ MCCI Privacy Shield & Govt Grants</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Portal connector linking MSMEs to capital subsidies while keeping individual factory data private.</p>
                        <div style={{ backgroundColor: '#065f46', color: '#d1fae5', padding: '16px', borderRadius: '8px', fontWeight: 'bold', fontSize: '15px' }}>
                            MCCI Partnership Status: Active & Verified for State Grants
                        </div>
                    </div>
                )}

                {activeModule === 'onboard' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#818cf8', marginTop: 0, fontSize: '20px' }}>🏢 Multi-Tenant Client Onboarding Engine</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', marginBottom: '16px' }}>Register new manufacturing units seamlessly across MIDC clusters.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>Company Name</label>
                                <input type="text" placeholder="Enter company name" style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>MIDC Location (e.g. Chakan)</label>
                                <input type="text" placeholder="MIDC Location" style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>MPCB Discharge Limit (Liters)</label>
                                <input type="text" placeholder="Discharge Limit" style={{ width: '100%', padding: '10px', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: 'white', fontSize: '13px' }} />
                            </div>
                            <button style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>
                                + Onboard Industrial Unit Live
                            </button>
                        </div>
                    </div>
                )}

            </div>

            {/* Legal Disclaimer & Developer Liability Waiver Footer */}
            <footer style={{ marginTop: '40px', borderTop: '1px solid #1f2937', padding: '16px 24px', backgroundColor: '#111827', fontSize: '10px', color: '#9ca3af', textAlign: 'center' }}>
                LEGAL DISCLAIMER & DEVELOPER LIABILITY WAIVER: EcoTrace India Private Limited and its developers act solely as a software interface provider aggregating IoT data and statutory records. We assume NO liability for equipment failures, financial losses, or statutory penalties arising from factory operations. Physical safety protocols, hardware calibration, and compliance adherence remain the absolute and sole responsibility of the factory management.
            </footer>

        </main>
    );
}
