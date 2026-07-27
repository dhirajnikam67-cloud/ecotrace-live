'use client';
import React, { useState } from 'react';

export default function EcoTraceDashboard() {
    // Macro-Level Corridor & Privacy Shield State
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

    // Cryptographic Hashing State
    const [activeHash, setActiveHash] = useState("0xa8f392c1b4e87019d6f2231e");
    const [isVerified, setIsVerified] = useState(true);

    // Function to simulate secure hash generation
    const generateNewHash = () => {
        const randomHash = "0x" + Math.random().toString(16).substring(2, 18) + Math.random().toString(16).substring(2, 18);
        setActiveHash(randomHash);
        setIsVerified(true);
    };

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#ffffff', padding: '24px', fontFamily: 'sans-serif' }}>
            {/* Header Section */}
            <header style={{ borderBottom: '1px solid #1f2937', paddingBottom: '16px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981', margin: '0 0 4px 0' }}>EcoTrace India Private Limited</h1>
                    <p style={{ fontSize: '14px', color: '#9ca3af', margin: 0 }}>Unified MPCB Compliance & dMRV SaaS Operating System | Project by Dhiraj Nikam</p>
                </div>
                <div style={{ backgroundColor: '#111827', border: '1px solid #374151', padding: '8px 16px', borderRadius: '8px', fontSize: '12px', color: '#34d399' }}>
                    🛡️ Privacy Shield: 100% Secure
                </div>
            </header>

            {/* Grid Layout for Modules */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
                
                {/* 1. Macro-Level Government & MCCI Dashboard */}
                <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                    <h3 style={{ fontSize: '18px', color: '#34d399', marginTop: 0 }}>🌐 Macro-Level Green Corridor</h3>
                    <p style={{ fontSize: '13px', color: '#9ca3af' }}>{macroData.corridorName}</p>
                    
                    <div style={{ backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px', marginTop: '12px' }}>
                        <p style={{ margin: '4px 0', fontSize: '14px' }}>Active Units: <strong>{macroData.activeMonitoringUnits} Factories</strong></p>
                        <p style={{ margin: '4px 0', fontSize: '14px' }}>Total Carbon: <strong>{macroData.regionalAggregates.totalCarbonEmissionTonnes} Tons</strong></p>
                        <p style={{ margin: '4px 0', fontSize: '14px' }}>Green Compliance: <strong style={{ color: '#34d399' }}>{macroData.regionalAggregates.greenCompliancePercentage}</strong></p>
                    </div>
                </div>

                {/* 2. Data Anonymization & Privacy Shield Status */}
                <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px' }}>
                    <h3 style={{ fontSize: '18px', color: '#34d399', marginTop: 0 }}>🔒 Zero-Knowledge Privacy Shield</h3>
                    <p style={{ fontSize: '13px', color: '#9ca3af' }}>State & MCCI audit access with complete business data protection.</p>
                    
                    <div style={{ backgroundColor: '#166534', color: '#dcfce7', padding: '12px', borderRadius: '8px', marginTop: '16px', fontSize: '14px', fontWeight: '500', textAlign: 'center' }}>
                        Status: {macroData.privacyShieldStatus}
                    </div>
                </div>

                {/* 3. Cryptographic Immutable Audit Trail Ledger */}
                <div style={{ backgroundColor: '#111827', border: '1px solid #1f2937', borderRadius: '12px', padding: '20px', gridColumn: 'span 1' }}>
                    <h3 style={{ fontSize: '18px', color: '#34d399', marginTop: 0 }}>⛓️ Blockchain Audit Ledger</h3>
                    <p style={{ fontSize: '13px', color: '#9ca3af' }}>Cryptographically signed logging system with permanent hashes.</p>
                    
                    <div style={{ backgroundColor: '#1f2937', padding: '12px', borderRadius: '8px', marginTop: '12px', wordBreak: 'break-all', fontSize: '12px', fontFamily: 'monospace', color: '#fbbf24' }}>
                        Active Hash: {activeHash}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                        <span style={{ fontSize: '12px', color: '#34d399' }}>✓ Tamper-Proof Verified</span>
                        <button 
                            onClick={generateNewHash}
                            style={{ backgroundColor: '#059669', color: 'white', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                            Sync & Verify Hash
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
}
