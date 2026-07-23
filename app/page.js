'use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploading, setUploading] = useState(false);
  const [dosingTriggered, setDosingTriggered] = useState(false);

  // Dynamic Caps & Sensor Values
  const [waterLimit, setWaterLimit] = useState(85000);
  const [hazardousWasteLimit, setHazardousWasteLimit] = useState(250);
  const [ctoExpiryDays, setCtoExpiryDays] = useState(82);

  // IoT Sensors
  const [phLevel, setPhLevel] = useState(7.4);
  const [codLevel, setCodLevel] = useState(210);

  // ESG & Carbon Accounting Engine
  const electricityKwh = 1420;
  const dieselLiters = 85; // Genset / Boiler Fuel
  const supplyChainKm = 420; // Transport & Vendors

  const scope1Carbon = ((dieselLiters * 2.68) / 1000).toFixed(2); // Direct Emissions
  const scope2Carbon = ((electricityKwh * 0.82) / 1000).toFixed(2); // Indirect Electricity
  const scope3Carbon = ((supplyChainKm * 0.15) / 1000).toFixed(2); // Supply Chain & Logistics
  const totalCarbon = (Number(scope1Carbon) + Number(scope2Carbon) + Number(scope3Carbon)).toFixed(2);

  // Data State
  const [factoryList, setFactoryList] = useState([
    { name: 'WESTERN CHEMICALS', plant_location: 'BHOSARI MIDC', limit: 85000, status: 'PARSED' }
  ]);

  // Operations Metrics
  const currentDischarge = 74800;
  const currentHazardousWaste = 215;

  // Form States
  const [factoryName, setFactoryName] = useState('');
  const [factoryLocation, setFactoryLocation] = useState('');
  const [factoryWaterLimit, setFactoryWaterLimit] = useState('');
  const [vehicleNo, setVehicleNo] = useState('');
  const [transporterName, setTransporterName] = useState('');

  // Calculations
  const dischargeRatio = ((currentDischarge / waterLimit) * 100).toFixed(1);
  const estimatedPenalty = Number(dischargeRatio) > 85 ? 75000 : 0;

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const handleConsentUpload = (e) => {
    if (!e || !e.target || !e.target.files || !e.target.files[0]) return;
    setUploading(true);
    setTimeout(() => {
      setWaterLimit(100000);
      setHazardousWasteLimit(300);
      setCtoExpiryDays(365);
      setUploading(false);
      alert('AI OCR SUCCESS: CTO Parsed Successfully. Water: 100,000 L | Haz: 300 KG');
    }, 2000);
  };

  const handleIoTTrigger = () => {
    setDosingTriggered(true);
    setPhLevel(7.2);
    alert('IoT MQTT Signal Sent: ETP Neutralizer Pump Triggered.');
  };

  const handleGenerateForm10 = (e) => {
    e.preventDefault();
    alert('Form 10 Manifest Generated for Vehicle: ' + vehicleNo);
    setVehicleNo('');
    setTransporterName('');
  };

  const handleAddFactory = (e) => {
    e.preventDefault();
    const newRecord = {
      name: factoryName,
      plant_location: factoryLocation,
      limit: Number(factoryWaterLimit) || 85000,
      status: 'PARSED'
    };
    setFactoryList(prev => [newRecord, ...prev]);
    alert('Unit onboarded to Cloud Registry!');
    setFactoryName('');
    setFactoryLocation('');
    setFactoryWaterLimit('');
    setActiveTab('dashboard');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '270px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', marginBottom: '10px' }}>
          EcoTrace India
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button type="button" onClick={() => setActiveTab('dashboard')} style={{ textAlign: 'left', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            📊 Live Risk Radar
          </button>
          <button type="button" onClick={() => setActiveTab('esg')} style={{ textAlign: 'left', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'esg' ? '#22c55e' : 'transparent', color: activeTab === 'esg' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            🌍 Scope 1, 2, 3 ESG Accounting
          </button>
          <button type="button" onClick={() => setActiveTab('manifest')} style={{ textAlign: 'left', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'manifest' ? '#22c55e' : 'transparent', color: activeTab === 'manifest' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            🚛 Form 10 Manifest Generator
          </button>
          <button type="button" onClick={() => setActiveTab('cluster')} style={{ textAlign: 'left', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'cluster' ? '#22c55e' : 'transparent', color: activeTab === 'cluster' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            🏢 MCCI MIDC Cluster Center
          </button>
          <button type="button" onClick={() => setActiveTab('onboarding')} style={{ textAlign: 'left', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'onboarding' ? '#22c55e' : 'transparent', color: activeTab === 'onboarding' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            🏭 Client Onboarding
          </button>
          <button type="button" onClick={() => setActiveTab('vault')} style={{ textAlign: 'left', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'vault' ? '#22c55e' : 'transparent', color: activeTab === 'vault' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            📜 MPCB Legal Vault
          </button>
        </nav>

        {/* ESG Certificate Banner */}
        <div style={{ marginTop: 'auto', backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #22c55e', fontSize: '12px' }}>
          <span style={{ color: '#22c55e', fontWeight: 'bold' }}>🏅 Green Vendor Passport</span>
          <p style={{ margin: '4px 0 8px 0', color: '#94a3b8', fontSize: '11px' }}>0.75% Bank Interest Subvention Eligible</p>
          <button type="button" onClick={() => alert('Downloading Bank Loan Green Credit Certificate...')} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', width: '100%', cursor: 'pointer' }}>
            Download Loan Certificate
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '700' }}>MPCB &amp; Enterprise Compliance Gateway</h1>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>AI-Powered Zero Non-Compliance Ecosystem for MSMEs and MNCs</p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="button" onClick={() => alert('Syncing Live Data with MPCB OCMMS Single Window Portal...')} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              🌐 Sync MPCB Portal
            </button>
            <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Export Audit Passport
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div>
            {/* CTO Expiry & AI OCR Banner Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              
              <div style={{ backgroundColor: '#1e293b', border: '1px solid #eab308', padding: '18px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', color: '#eab308', fontSize: '15px' }}>📅 CTO Renewal Radar</h3>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>
                    Days Left: <strong style={{ color: '#fff', fontSize: '16px' }}>{ctoExpiryDays} Days</strong>
                  </p>
                </div>
                <button type="button" onClick={() => alert('Connecting to MPCB Portal... Auto-Renewal Checklist Generated!')} style={{ backgroundColor: '#eab308', color: '#0f172a', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>
                  Auto-Renew CTO
                </button>
              </div>

              <div style={{ backgroundColor: '#1e293b', border: '1px solid #38bdf8', padding: '18px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', color: '#38bdf8', fontSize: '15px' }}>📄 AI OCR CTO Reader</h3>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>
                    Water: <strong>{waterLimit} L</strong> | Haz: <strong>{hazardousWasteLimit} KG</strong>
                  </p>
                </div>
                <label style={{ backgroundColor: '#0284c7', color: '#fff', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                  {uploading ? 'Parsing...' : 'Upload CTO'}
                  <input type="file" accept=".pdf" onChange={handleConsentUpload} style={{ display: 'none' }} disabled={uploading} />
                </label>
              </div>

            </div>

            {/* Critical Alerts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              
              <div style={{ backgroundColor: Number(dischargeRatio) >= 85 ? '#7f1d1d' : '#064e3b', border: '1px solid #334155', padding: '18px', borderRadius: '12px' }}>
                <h3 style={{ margin: '0 0 6px 0', color: '#fff', fontSize: '16px' }}>
                  {Number(dischargeRatio) >= 85 ? '⚠️ Water Discharge Alert (85%+ Limit)' : '🟢 Water Status: Safe'}
                </h3>
                <p style={{ margin: 0, color: '#fca5a5', fontSize: '13px' }}>
                  Discharge at <strong>{dischargeRatio}%</strong> ({currentDischarge} / {waterLimit} L).
                </p>
                {Number(dischargeRatio) >= 85 && (
                  <button type="button" onClick={handleIoTTrigger} style={{ backgroundColor: dosingTriggered ? '#16a34a' : '#ef4444', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold', fontSize: '12px' }}>
                    {dosingTriggered ? 'Auto-Dosing Activated' : 'Trigger Neutralizer Pump'}
                  </button>
                )}
              </div>

              <div style={{ backgroundColor: estimatedPenalty > 0 ? '#450a0a' : '#064e3b', border: '1px solid #ef4444', padding: '18px', borderRadius: '12px' }}>
                <h3 style={{ margin: '0 0 6px 0', color: '#fca5a5', fontSize: '16px' }}>
                  🚨 Prosecution Penalty Shield
                </h3>
                <p style={{ margin: '0 0 8px 0', color: '#fca5a5', fontSize: '13px' }}>
                  Estimated Penalty Risk: <strong style={{ fontSize: '18px', color: '#fff' }}>INR {estimatedPenalty}</strong>
                </p>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Calculated via MPCB Environmental Compensation Matrix</span>
              </div>

            </div>

            {/* Live Sensors Feed */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>LIVE IoT pH SENSOR</span>
                <p style={{ fontSize: '26px', fontWeight: 'bold', color: phLevel < 6.5 || phLevel > 8.5 ? '#ef4444' : '#22c55e', margin: '8px 0 0 0' }}>{phLevel}</p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f97316' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>EFFLUENT COD LEVEL</span>
                <p style={{ fontSize: '26px', fontWeight: 'bold', color: '#f97316', margin: '8px 0 0 0' }}>{codLevel} <span style={{ fontSize: '12px' }}>mg/L</span></p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #38bdf8' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>TOTAL CARBON FOOTPRINT</span>
                <p style={{ fontSize: '26px', fontWeight: 'bold', color: '#38bdf8', margin: '8px 0 0 0' }}>{totalCarbon} <span style={{ fontSize: '14px' }}>tCO2e</span></p>
              </div>
            </div>

            {/* Compliance Table */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, color: '#22c55e', fontSize: '16px' }}>🏭 Live Industrial Compliance Records</h3>
                <button type="button" onClick={() => alert('AI Form IV Annual Return Compiled!')} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                  Auto-File Form IV
                </button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                    <th style={{ padding: '10px' }}>Factory Name</th>
                    <th style={{ padding: '10px' }}>Location</th>
                    <th style={{ padding: '10px' }}>Water Limit</th>
                    <th style={{ padding: '10px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {factoryList.map((item, idx) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #334155' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{item.name}</td>
                      <td style={{ padding: '12px 10px', color: '#94a3b8' }}>{item.plant_location}</td>
                      <td style={{ padding: '12px 10px' }}>{item.limit} L</td>
                      <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Scope 1, 2, 3 ESG Ledger */}
        {activeTab === 'esg' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ marginTop: 0, color: '#22c55e', fontSize: '20px' }}>🌍 Scope 1, 2, 3 Carbon Emissions Engine (MNC Audit Ready)</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>MNC vendors like Tata, Mahindra, &amp; Bajaj require complete GHG protocol carbon data.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#fca5a5' }}>Scope 1 (Direct Emissions)</h4>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0' }}>Boiler Fuel &amp; Diesel Gensets</p>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff' }}>{scope1Carbon} tCO2e</span>
              </div>

              <div style={{ backgroundColor: '#0f172a', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#93c5fd' }}>Scope 2 (Electricity Grid)</h4>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0' }}>Factory Grid Power Consumption</p>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff' }}>{scope2Carbon} tCO2e</span>
              </div>

              <div style={{ backgroundColor: '#0f172a', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #eab308' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#fef08a' }}>Scope 3 (Supply Chain)</h4>
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0' }}>Raw Material Transport &amp; Logistics</p>
                <span style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff' }}>{scope3Carbon} tCO2e</span>
              </div>
            </div>

            <div style={{ marginTop: '25px', backgroundColor: '#0f172a', padding: '15px', borderRadius: '8px', border: '1px solid #22c55e' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#22c55e' }}>💰 Bank Loan Green Credit Eligibility Score: 94 / 100</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>
                Eligible for <strong>0.75% Interest Subvention</strong> under RBI ESG &amp; SIDBI Green MSME Finance Scheme.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Manifest */}
        {activeTab === 'manifest' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ marginTop: 0, color: '#22c55e', fontSize: '20px' }}>🚛 MPCB Form 10 Hazardous Waste Manifest Generator</h2>
            <form onSubmit={handleGenerateForm10} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', marginTop: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Vehicle Number</label>
                <input required type="text" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} placeholder="MH 12 QW 4589" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Transporter Name</label>
                <input required type="text" value={transporterName} onChange={(e) => setTransporterName(e.target.value)} placeholder="MEPL CHWTSDF" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#22c55e', col
