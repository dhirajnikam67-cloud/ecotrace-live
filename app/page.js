use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dynamic Factory Registry
  const [factoryList, setFactoryList] = useState([
    { id: 1, name: 'WESTERN CHEMICALS', location: 'BHOSARI MIDC', limit: 85000, discharge: 74800, ph: 7.4, cod: 210, status: 'COMPLIANT' }
  ]);
  const [selectedFactoryId, setSelectedFactoryId] = useState(1);

  // Form States
  const [vehicleNo, setVehicleNo] = useState('');
  const [transporterName, setTransporterName] = useState('');
  const [factoryName, setFactoryName] = useState('');
  const [factoryLocation, setFactoryLocation] = useState('');
  const [factoryLimit, setFactoryLimit] = useState('');

  // Selected Factory Context
  const activeFactory = factoryList.find(f => f.id === selectedFactoryId) || factoryList[0];

  const scope1 = 0.23, scope2 = 1.16, scope3 = 0.06;
  const totalCarbon = (scope1 + scope2 + scope3).toFixed(2);

  const handlePrintFullReport = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const handleGenerateForm10PDF = (e) => {
    e.preventDefault();
    alert('📄 MPCB Form 10 Manifest PDF Generated & Downloaded for Vehicle: ' + vehicleNo);
    setVehicleNo('');
    setTransporterName('');
  };

  const handleAddFactory = (e) => {
    e.preventDefault();
    const newId = factoryList.length + 1;
    const limitNum = Number(factoryLimit) || 50000;
    const newUnit = {
      id: newId,
      name: factoryName.toUpperCase(),
      location: factoryLocation.toUpperCase() + ' MIDC',
      limit: limitNum,
      discharge: Math.floor(limitNum * 0.8),
      ph: 7.2,
      cod: 180,
      status: 'COMPLIANT'
    };

    setFactoryList(prev => [newUnit, ...prev]);
    setSelectedFactoryId(newId);
    alert('🎉 ' + factoryName + ' Onboarded Live to Cloud Registry!');
    
    setFactoryName('');
    setFactoryLocation('');
    setFactoryLimit('');
    setActiveTab('dashboard');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '270px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#22c55e', marginBottom: '10px' }}>
          EcoTrace India
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button type="button" onClick={() => setActiveTab('dashboard')} style={{ textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            📊 Live Risk Radar
          </button>
          <button type="button" onClick={() => setActiveTab('esg')} style={{ textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'esg' ? '#22c55e' : 'transparent', color: activeTab === 'esg' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            🌍 Scope 1,2,3 ESG Engine
          </button>
          <button type="button" onClick={() => setActiveTab('manifest')} style={{ textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'manifest' ? '#22c55e' : 'transparent', color: activeTab === 'manifest' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            🚛 Form 10 Manifest Generator
          </button>
          <button type="button" onClick={() => setActiveTab('cluster')} style={{ textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'cluster' ? '#22c55e' : 'transparent', color: activeTab === 'cluster' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            🏢 MCCI MIDC Cluster Center
          </button>
          <button type="button" onClick={() => setActiveTab('onboarding')} style={{ textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'onboarding' ? '#22c55e' : 'transparent', color: activeTab === 'onboarding' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            🏭 Client Onboarding
          </button>
          <button type="button" onClick={() => setActiveTab('vault')} style={{ textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'vault' ? '#22c55e' : 'transparent', color: activeTab === 'vault' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            📜 MPCB Legal Vault
          </button>
        </nav>

        {/* ESG Certificate Banner */}
        <div style={{ marginTop: 'auto', backgroundColor: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #22c55e', fontSize: '12px' }}>
          <span style={{ color: '#22c55e', fontWeight: 'bold' }}>🏅 Green Vendor Passport</span>
          <p style={{ margin: '4px 0 8px 0', color: '#94a3b8', fontSize: '11px' }}>0.75% Bank Interest Subvention Eligible</p>
          <button type="button" onClick={() => alert('Downloading Green Credit Certificate...')} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', width: '100%', cursor: 'pointer' }}>
            📄 Download Loan Certificate PDF
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        
        {/* Top Header & Interactive Demo Factory Switcher */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '700' }}>MPCB &amp; Enterprise Compliance Gateway</h1>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>AI-Powered Zero Non-Compliance Ecosystem</p>
          </div>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#1e293b', border: '1px solid #38bdf8', padding: '6px 12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '11px', color: '#38bdf8', display: 'block', fontWeight: 'bold' }}>LIVE DEMO SELECTOR:</span>
              <select value={selectedFactoryId} onChange={(e) => setSelectedFactoryId(Number(e.target.value))} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }}>
                {factoryList.map(f => (
                  <option key={f.id} value={f.id} style={{ backgroundColor: '#0f172a', color: '#fff' }}>
                    {f.name} ({f.location})
                  </option>
                ))}
              </select>
            </div>

            <button type="button" onClick={handlePrintFullReport} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              📄 Export Audit Passport PDF
            </button>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div>
            {/* Selected Active Unit Banner */}
            <div style={{ backgroundColor: '#1e293b', borderLeft: '5px solid #22c55e', padding: '15px 20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>CURRENTLY MONITORED UNIT:</span>
                <h2 style={{ margin: 0, color: '#22c55e', fontSize: '20px' }}>{activeFactory.name} — <span style={{ color: '#fff', fontSize: '16px' }}>{activeFactory.location}</span></h2>
              </div>
              <span style={{ backgroundColor: '#064e3b', color: '#22c55e', padding: '6px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px' }}>
                🟢 Live Cloud Sync Active
              </span>
            </div>

            {/* Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              <div style={{ backgroundColor: '#1e293b', border: '1px solid #eab308', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ color: '#eab308', margin: '0 0 8px 0', fontSize: '16px' }}>📅 CTO Renewal Radar</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>82 Days Left</p>
                <button type="button" onClick={() => alert('Generating CTO Checklist for ' + activeFactory.name)} style={{ backgroundColor: '#eab308', color: '#0f172a', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>Auto-Renew CTO</button>
              </div>

              <div style={{ backgroundColor: '#1e293b', border: '1px solid #ef4444', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ color: '#ef4444', margin: '0 0 8px 0', fontSize: '16px' }}>🚨 Prosecution Penalty Shield</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#fca5a5' }}>INR 0 (Safe)</p>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Private Internal Calculation</span>
              </div>

              <div style={{ backgroundColor: '#1e293b', border: '1px solid #38bdf8', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ color: '#38bdf8', margin: '0 0 8px 0', fontSize: '16px' }}>🌍 Scope 1, 2, 3 Total Carbon</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#38bdf8' }}>{totalCarbon} tCO2e</p>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Direct, Power &amp; Logistics Footprint</span>
              </div>
            </div>

            {/* Dynamic Live Sensors Feed */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>LIVE IoT pH SENSOR</span>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#22c55e', margin: '8px 0 0 0' }}>{activeFactory.ph}</p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f97316' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>EFFLUENT COD LEVEL</span>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#f97316', margin: '8px 0 0 0' }}>{activeFactory.cod} <span style={{ fontSize: '14px' }}>mg/L</span></p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #06b6d4' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>WATER DISCHARGE</span>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#06b6d4', margin: '8px 0 0 0' }}>{activeFactory.discharge} <span style={{ fontSize: '12px', color: '#94a3b8' }}>/ {activeFactory.limit} L</span></p>
              </div>
            </div>

            {/* Registered Units Table */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#22c55e', fontSize: '16px' }}>🏭 Registered Units Live Registry ({factoryList.length})</h3>
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
                  {factoryList.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #334155', backgroundColor: item.id === selectedFactoryId ? '#0f172a' : 'transparent' }}>
                      <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{item.name}</td>
                      <td style={{ padding: '12px 10px', color: '#94a3b8' }}>{item.location}</td>
                      <td style={{ padding: '12px 10px' }}>{item.limit} L</td>
                      <td style={{ padding: '12px 10px', color: '#22c55e', fontWeight: 'bold' }}>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Onboarding Form */}
        {activeTab === 'onboarding' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ marginTop: 0, color: '#22c55e', fontSize: '20px' }}>🏭 Register &amp; Onboard New Industrial Unit</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>Fill details to instantly create live cloud monitoring dashboard for the client.</p>
            <form onSubmit={handleAddFactory} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', marginTop: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Factory Name</label>
                <input required type="text" value={factoryName} onChange={(e) => setFactoryName(e.target.value)} placeholder="e.g. SAGAR CHEMICALS" style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>MIDC Zone Location</label>
                <input required type="text" value={factoryLocation} onChange={(e) => setFactoryLocation(e.target.value)} placeholder="e.g. BHOSARI / CHAKAN" style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Consent Water Discharge Limit (Liters/Day)</label>
                <input required type="number" value={factoryLimit} onChange={(e) => setFactoryLimit(e.target.value)} placeholder="e.g. 50000" style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#22c55e', color: '#0f172a', padding: '12px', borderRadius: '6px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>+ Onboard Unit Live</button>
            </form>
          </div>
        )}

        {/* Tab 2: ESG */}
        {activeTab === 'esg' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ marginTop: 0, color: '#22c55e', fontSize: '20px' }}>🌍 Scope 1, 2, 3 GHG Carbon Accounting Engine</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#fca5a5' }}>Scope 1 (Direct Fuel)</h4>
                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{scope1} tCO2e</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#93c5fd' }}>Scope 2 (Electricity)</h4>
                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{scope2} tCO2e</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #eab308' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#fef08a' }}>Scope 3 (Supply Chain)</h4>
                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{scope3} tCO2e</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Manifest */}
        {activeTab === 'manifest' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ marginTop: 0, color: '#22c55e', fontSize: '20px' }}>🚛 MPCB Form 10 Hazardous Waste Manifest Generator</h2>
            <form onSubmit={handleGenerateForm10PDF} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', marginTop: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Vehicle Number</label>
                <input required type="text" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} placeholder="MH 12 QW 4589" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Transporter Name</label>
                <input required type="text" value={transporterName} onChange={(e) => setTransporterName(e.target.value)} placeholder="MEPL CHWTSDF" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                📄 Generate &amp; Download Form 10 PDF
              </button>
            </form>
          </div>
        )}

        {/* Tab 4: MCCI Cluster */}
        {activeTab === 'cluster' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ marginTop: 0, color: '#38bdf8', fontSize: '20px' }}>🏢 MCCI MIDC Cluster Monitoring Command Center</h2>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: '4px 0 0 0' }}>Anonymized Macro Data Aggregator for Industry Associations</p>
              </div>
              <span style={{ backgroundColor: '#064e3b', color: '#22c55e', border: '1px solid #22c55e', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                🔒 MSME Privacy Shield Active
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
