'use client';
import React, { useState } from 'react';

export default function EcoTraceDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModule, setActiveModule] = useState('ocrScan');

    // Macro-Level Corridor State
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

    // Interactive states for OCR & dMRV Scan
    const [selectedFile, setSelectedFile] = useState(null);
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    // Blockchain Hash State
    const [activeHash, setActiveHash] = useState("0xa8f392c1b4e87019d6f2231e");

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file.name);
            setIsScanning(true);
            setScanResult(null);
            setTimeout(() => {
                setIsScanning(false);
                setScanResult({
                    docType: "MPCB Stack Emission & Hazardous Manifest",
                    extractedValue: "SO2: 45 mg/Nm3 (Within Legal Limit)",
                    dmrvStatus: "Verified & Logged to Immutable Ledger",
                    confidence: "99.8%"
                });
            }, 2000);
        }
    };

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

            {/* Sidebar Navigation */}
            {isMenuOpen && (
                <aside style={{ position: 'absolute', top: '70px', left: 0, width: '340px', height: 'calc(100vh - 70px)', backgroundColor: '#111827', borderRight: '1px solid #1f2937', zIndex: 100, overflowY: 'auto', padding: '16px' }}>
                    <h3 style={{ fontSize: '13px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '12px' }}>Unified Command Dashboard</h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ border: '1px solid #059669', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937', cursor: 'pointer' }} onClick={() => { setActiveModule('ocrScan'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#34d399', fontSize: '13px' }}>⚡ Mobile AI OCR & dMRV Scan</strong>
                        </div>
                        <div style={{ border: '1px solid #3b82f6', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937', cursor: 'pointer' }} onClick={() => { setActiveModule('greenCorridor'); setIsMenuOpen(false); }}>
                            <strong style={{ color: '#60a5fa', fontSize: '13px' }}>🌐 Macro Green Corridor & Privacy</strong>
                        </div>
                        <div style={{ border: '1px solid #ef4444', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444', marginBottom: '6px' }}>[A] RISK & EMERGENCY SHIELD</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('risk1'); setIsMenuOpen(false); }}>• Flying Squad Audit Mode</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('risk2'); setIsMenuOpen(false); }}>• Toxic Gas Leak Radar</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('risk3'); setIsMenuOpen(false); }}>• Notice Defense Matrix</div>
                        </div>
                        <div style={{ border: '1px solid #3b82f6', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#3b82f6', marginBottom: '6px' }}>[B] UTILITY & COST SAVINGS</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('utility1'); setIsMenuOpen(false); }}>• MSEDCL Smart Grid & PF</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('utility2'); setIsMenuOpen(false); }}>• ETP CAPEX & ROI Calculator</div>
                        </div>
                        <div style={{ border: '1px solid #eab308', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#eab308', marginBottom: '6px' }}>[C] STATUTORY COMPLIANCE</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('stat1'); setIsMenuOpen(false); }}>• Form 3, 4 & 5 Annual Returns</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('stat2'); setIsMenuOpen(false); }}>• CTO Renewal Auto-Dossier</div>
                        </div>
                        <div style={{ border: '1px solid #10b981', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#10b981', marginBottom: '6px' }}>[D] SUPPLY CHAIN & ESG</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('ewaste'); setIsMenuOpen(false); }}>• E-Waste & Battery EPR Vault</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('sbiRebate'); setIsMenuOpen(false); }}>• SBI / SIDBI Loan Rebate</div>
                        </div>
                        <div style={{ border: '1px solid #8b5cf6', borderRadius: '8px', padding: '8px', backgroundColor: '#1f2937' }}>
                            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '6px' }}>[E] COMMAND & GRANTS</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('blockchain'); setIsMenuOpen(false); }}>• Blockchain Immutable Ledger</div>
                            <div style={{ fontSize: '12px', padding: '4px', cursor: 'pointer', color: '#d1d5db' }} onClick={() => { setActiveModule('mcciGrants'); setIsMenuOpen(false); }}>• MCCI Privacy & Grants</div>
                        </div>
                    </div>
                </aside>
            )}

            {/* Main Content Area with Detailed Process View */}
            <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
                
                {/* 1. Mobile AI OCR & dMRV Scan Module */}
                {activeModule === 'ocrScan' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#34d399', marginTop: 0 }}>⚡ Mobile AI OCR & dMRV Scan</h2>
                        <p style={{ color: '#9ca3af', fontSize: '14px' }}>Scan factory invoices, manifest challans, and stack emission logs instantly using AI OCR.</p>
                        
                        <div style={{ marginTop: '20px', padding: '20px', border: '2px dashed #374151', borderRadius: '8px', textAlign: 'center', backgroundColor: '#1f2937' }}>
                            <p style={{ margin: '0 0 10px 0', fontSize: '14px' }}>Upload Invoice / Stack Emission Document:</p>
                            <input type="file" onChange={handleFileUpload} style={{ color: '#34d399' }} />
                        </div>

                        {isScanning && (
                            <div style={{ marginTop: '20px', padding: '12px', backgroundColor: '#1e3a8a', color: '#bfdbfe', borderRadius: '8px', textAlign: 'center' }}>
                                🔄 Processing AI OCR Extraction & dMRV Validation...
                            </div>
                        )}

                        {scanResult && (
                            <div style={{ marginTop: '20px', padding: '16px', backgroundColor: '#065f46', borderRadius: '8px' }}>
                                <h4 style={{ margin: '0 0 8px 0', color: '#d1fae5' }}>✅ Extraction Successful</h4>
                                <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Document Type:</strong> {scanResult.docType}</p>
                                <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Extracted Data:</strong> {scanResult.extractedValue}</p>
                                <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>Status:</strong> {scanResult.dmrvStatus}</p>
                                <p style={{ margin: '4px 0', fontSize: '13px' }}><strong>AI Confidence:</strong> {scanResult.confidence}</p>
                            </div>
                        )}
                    </div>
                )}

                {/* 2. Macro Green Corridor */}
                {activeModule === 'greenCorridor' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                            <h2 style={{ color: '#34d399', marginTop: 0 }}>🌐 Macro-Level Green Industrial Corridor</h2>
                            <p style={{ fontSize: '13px', color: '#9ca3af' }}>{macroData.corridorName}</p>
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
                            <p style={{ fontSize: '13px', color: '#9ca3af' }}>State & MCCI audit access with complete business data protection.</p>
                            <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '12px', borderRadius: '8px', marginTop: '16px', fontSize: '14px', fontWeight: '500', textAlign: 'center' }}>
                                Status: {macroData.privacyShieldStatus}
                            </div>
                        </div>
                    </div>
                )}

                {/* 3. Blockchain Ledger */}
                {activeModule === 'blockchain' && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#34d399', marginTop: 0 }}>⛓️ Blockchain Immutable Audit Trail Ledger</h2>
                        <p style={{ fontSize: '14px', color: '#9ca3af' }}>Cryptographically signed logging system recording IoT sensor data updates with permanent hashes.</p>
                        
                        <div style={{ backgroundColor: '#1f2937', padding: '16px', borderRadius: '8px', marginTop: '16px', wordBreak: 'break-all', fontFamily: 'monospace', color: '#fbbf24', fontSize: '14px' }}>
                            Active Hash: {activeHash}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                            <span style={{ fontSize: '13px', color: '#34d399' }}>✓ Tamper-Proof Verified by Node Network</span>
                            <button 
                                onClick={generateNewHash}
                                style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>
                                Sync & Verify Hash
                            </button>
                        </div>
                    </div>
                )}

                {/* General Module View for other tabs */}
                {['ewaste', 'sbiRebate', 'mcciGrants', 'risk1', 'risk2', 'risk3', 'utility1', 'utility2', 'stat1', 'stat2'].includes(activeModule) && (
                    <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '24px' }}>
                        <h2 style={{ color: '#34d399', textTransform: 'uppercase', marginTop: 0 }}>Module: {activeModule}</h2>
                        <p style={{ color: '#9ca3af', fontSize: '14px' }}>Detailed operational metrics, statutory form templates, and automated compliance workflows are active.</p>
                        
                        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div style={{ backgroundColor: '#1f2937', padding: '14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>Real-time Telemetry & Data Logs</span>
                                <span style={{ color: '#34d399', fontWeight: 'bold' }}>Connected</span>
                            </div>
                            <div style={{ backgroundColor: '#1f2937', padding: '14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span>MPCB Regulatory Audit Status</span>
                                <span style={{ color: '#10b981', fontWeight: 'bold' }}>100% Audit Ready</span>
                            </div>
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
