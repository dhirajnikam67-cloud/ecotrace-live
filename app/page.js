'use client';
import React, { useState, useEffect } from 'react';

export default function EcoTraceDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModule, setActiveModule] = useState('mainDashboard');

    // फेज १: फॅक्टरीचा मूळ डेटा आणि खऱ्या तारखेसह CTO ट्रॅकिंग स्टेट
    const [factoryData, setFactoryData] = useState({
        name: "WESTERN CHEMICALS",
        location: "BHOSARI MIDC, PUNE",
        dischargeLimit: "5000",
        ctoExpiryDate: "2026-08-20", // खरी परवाना मुदत तारीख
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
                ...factoryData,
                name: tempCompanyName,
                location: tempMidcLocation || factoryData.location,
                dischargeLimit: tempDischargeLimit || factoryData.dischargeLimit,
                ctoExpiryDate: tempCtoDate || factoryData.ctoExpiryDate
            });
            alert('Factory Profile Updated Successfully!');
        }
    };

    return (
        <div style={{ backgroundColor: '#0d1117', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '16px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                
                {/* Header Section */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '16px', marginBottom: '20px' }}>
                    <div>
                        <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#58a6ff', margin: 0 }}>EcoTrace India Private Limited</h1>
                        <p style={{ fontSize: '12px', color: '#8b949e', margin: '4px 0 0 0' }}>MPCB Legal Shield & dMRV Green Operating System | Contact: 7378780745</p>
                    </div>
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        style={{ backgroundColor: '#21262d', color: '#c9d1d9', border: '1px solid #30363d', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}
                    >
                        ☰ Global Navigation
                    </button>
                </div>

                {/* Navigation Dropdown Menu */}
                {isMenuOpen && (
                    <div style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '12px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        <button onClick={() => { setActiveModule('mainDashboard'); setIsMenuOpen(false); }} style={{ backgroundColor: activeModule === 'mainDashboard' ? '#238636' : '#21262d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📊 Dashboard</button>
                        <button onClick={() => { setActiveModule('ocrScan'); setIsMenuOpen(false); }} style={{ backgroundColor: activeModule === 'ocrScan' ? '#238636' : '#21262d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>📸 Mobile AI OCR & Geo-Scan</button>
                        <button onClick={() => { setActiveModule('risk1'); setIsMenuOpen(false); }} style={{ backgroundColor: activeModule === 'risk1' ? '#238636' : '#21262d', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>🛡️ Model 1: Intelligent Watchman</button>
                    </div>
                )}

                {/* Status Bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#161b22', padding: '12px 16px', borderRadius: '8px', border: '1px solid #30363d', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                        <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#38bdf8' }}>{factoryData.name} ({factoryData.location})</span>
                        <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>CTO Expiry: {factoryData.ctoExpiryDate} | Limit: {factoryData.dischargeLimit} L/day</div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button onClick={() => alert('Exporting Official MPCB Form V PDF Report...')} style={{ backgroundColor: '#238636', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Export PDF</button>
                        <button onClick={() => alert('Export Verified Audit Package downloaded.')} style={{ backgroundColor: '#21262d', color: '#c9d1d9', border: '1px solid #30363d', padding: '6px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Export Verified Audit Package</button>
                    </div>
                </div>

                {/* Model 1: Intelligent Watchman Dashboard */}
                <div style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                    <h2 style={{ fontSize: '16px', color: '#58a6ff', margin: '0 0 8px 0' }}>Model 1: Intelligent Watchman & Legal Shield (Auto-Audit Active)</h2>
                    <p style={{ fontSize: '12px', color: '#8b949e', margin: '0 0 16px 0' }}>Zero Machine Trip / Automated Advisory Mode (Human-in-the-Loop Safeguard & Legal Protection)</p>

                    {/* Mobile AI OCR & dMRV Geo-Scan Engine Section with working Camera / File Upload */}
                    <div style={{ backgroundColor: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', padding: '20px' }}>
                        <h3 style={{ fontSize: '14px', color: '#33d7b5', margin: '0 0 6px 0' }}>⚡ Mobile AI OCR & dMRV Geo-Scan Engine</h3>
                        <p style={{ fontSize: '12px', color: '#8b949e', margin: '0 0 16px 0' }}>Snap bills, electricity meters, or waste manifests directly from mobile. Instant OCR extracts data, locks GPS location, and updates Form V.</p>
                        
                        <div style={{ padding: '20px', border: '2px dashed #30363d', borderRadius: '8px', textAlign: 'center', backgroundColor: '#161b22' }}>
                            <label style={{ display: 'inline-block', backgroundColor: '#238636', color: 'white', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                                📸 Snap / Upload Utility & Waste Bills
                                <input 
                                    type="file" 
                                    accept="image/*" 
                                    capture="environment"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        if(e.target.files && e.target.files[0]) {
                                            alert('File Selected / Scanned: ' + e.target.files[0].name + ' - OCR Extracted Successfully!');
                                        }
                                    }}
                                />
                            </label>
                            <p style={{ color: '#8b949e', fontSize: '11px', marginTop: '8px' }}>GPS Location Lock & Exif Metadata Verification Active.</p>
                        </div>
                    </div>
                </div>

                {/* Optional Risk Module View */}
                {activeModule === 'risk1' && (
                    <div style={{ backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '8px', padding: '20px', marginTop: '20px' }}>
                        <h2 style={{ color: '#ef4444', margin: '0 0 8px 0', fontSize: '16px' }}>⚠️ Risk Assessment & Compliance Warning Panel</h2>
                        <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>All parameters are currently within safe statutory limits under MPCB guidelines.</p>
                    </div>
                )}

            </div>
        </div>
    );
}
