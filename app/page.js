'use client';

import React, { useState } from 'react';

export default function EcoTraceDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filter, setFilter] = useState('All');
  const [uploading, setUploading] = useState(false);

  // Factory State
  const [factory, setFactory] = useState({
    name: 'Chakan Machining Works Unit 2',
    ocrStatus: 'SUCCESS',
    waterLimit: 85000,
    currentDischarge: 74800,
    electricityKwh: 1420,
    so2Ppm: 45,
  });

  const factories = [
    { id: 'FAC-001', name: 'Alpha Auto Tech', location: 'Chakan, Pune', category: 'Red Category', status: 'Compliant', airQuality: '92%', waterPurity: '98%' },
    { id: 'FAC-002', name: 'Sahyadri Chemicals', location: 'Ranjangaon', category: 'Orange Category', status: 'Review Needed', airQuality: '78%', waterPurity: '85%' },
    { id: 'FAC-003', name: 'Western Engineering', location: 'Talegaon', category: 'Green Category', status: 'Compliant', airQuality: '95%', waterPurity: '99%' },
    { id: 'FAC-004', name: 'Deccan Electroplates', location: 'Bhosari', category: 'Red Category', status: 'Notice Issued', airQuality: '64%', waterPurity: '70%' },
  ];

  // Calculations
  const dischargeRatio = ((factory.currentDischarge / factory.waterLimit) * 100).toFixed(1);
  const scope2Carbon = ((factory.electricityKwh * 0.82) / 1000).toFixed(2);

  const filteredFactories = filter === 'All' 
    ? factories 
    : factories.filter(f => f.category.includes(filter));

  const handleConsentUpload = (e) => {
    e.preventDefault();
    setUploading(true);

    setTimeout(() => {
      setFactory((prev) => ({
        ...prev,
        ocrStatus: 'SUCCESS',
        waterLimit: 100000,
      }));
      setUploading(false);
      alert('AI OCR Engine Parsed MPCB CTO Document Successfully!\nDynamic Consent Limits Updated.');
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '240px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e' }}>
          🌱 EcoTrace
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('dashboard')} 
            style={{ textAlign: 'left', padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#94a3b8', fontWeight: '600' }}>
            📊 Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('factories')} 
            style={{ textAlign: 'left', padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'factories' ? '#22c55e' : 'transparent', color: activeTab === 'factories' ? '#0f172a' : '#94a3b8', fontWeight: '600' }}>
            🏭 Factories
          </button>
        </nav>

        <div style={{ marginTop: 'auto', backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155', fontSize: '12px', color: '#94a3b8' }}>
          Region: <strong>Maharashtra (MPCB)</strong>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '700' }}>MPCB Environmental Compliance Radar</h1>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>Real-time Monitoring, OCR & Carbon Engine</p>
          </div>

          <button 
            onClick={() => window.print()}
            style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            📥 Export Audit Report (PDF)
          </button>
        </header>

        {/* AI OCR Section */}
        <section style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '12px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <h3 style={{ margin: '0 0 6px 0', color: '#38bdf8', fontSize: '16px' }}>📄 AI OCR MPCB Consent Auto-Parser</h3>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>
              Upload CTO PDF. Auto-extracts water limit: <strong>{factory.waterLimit.toLocaleString()} L/day</strong>
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ backgroundColor: '#064e3b', color: '#10b981', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' }}>
              {factory.ocrStatus}
            </span>
            <label style={{ backgroundColor: '#0284c7', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>
              {uploading ? 'Parsing PDF...' : 'Upload MPCB CTO PDF'}
              <input type="file" accept=".pdf" onChange={handleConsentUpload} style={{ display: 'none' }} disabled={uploading} />
            </label>
          </div>
        </section>

        {/* Pre-Emptive Red-Flag Alert Banner */}
        {Number(dischargeRatio) >= 85 ? (
          <div style={{ backgroundColor: '#7f1d1d', border: '1px solid #ef4444', padding: '20px', borderRadius: '12px', marginBottom: '25px' }}>
            <h3 style={{ margin: '0 0 8px 0', color: '#fff' }}>⚠️ Pre-Emptive Red-Flag Alert</h3>
            <p style={{ margin: 0, color: '#fca5a5' }}>
              Water discharge reached <strong>{dischargeRatio}%</strong> of factory MPCB limit ({factory.currentDischarge.toLocaleString()} / {factory.waterLimit.toLocaleString()} L). Penalty threshold imminent in 36 hrs!
            </p>
          </div>
        ) : (
          <div style={{ backgroundColor: '#064e3b', border: '1px solid #10b981', padding: '15px 20px', borderRadius: '12px', marginBottom: '25px' }}>
            <h3 style={{ margin: '0 0 4px 0', color: '#86efac', fontSize: '16px' }}>🟢 Status: Fully Compliant</h3>
            <p style={{ margin: 0, color: '#a7f3d0', fontSize: '14px' }}>Discharge within statutory boundaries ({dischargeRatio}% of MPCB Consent Limit).</p>
          </div>
        )}

        {/* Stat Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #22c55e' }}>
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>DYNAMIC RISK RADAR</span>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e', margin: '8px 0 0 0' }}>{dischargeRatio}%</p>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>Max: {factory.waterLimit.toLocaleString()} L/Day</span>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #38bdf8' }}>
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>SCOPE 2 CARBON LEDGER</span>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#38bdf8', margin: '8px 0 0 0' }}>{scope2Carbon} <span style={{ fontSize: '14px' }}>tCO2e</span></p>
            <span style={{ fontSize: '11px', color: '#94a3b8' }}>0.82 kg CO2/kWh CEA Factor</span>
          </div>
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #eab308' }}>
            <span style={{ color: '#94a3b8', fontSize: '12px' }}>COMPLIANCE VAULT</span>
            <button onClick={() => alert(Generating Certified QR Compliance Passport for ${factory.name}...)} style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', display: 'block' }}>
              📄 Instant Passport
            </button>
          </div>
        </div>

        {/* Factory Table Section */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', margin: 0 }}>Factory Compliance Records</h2>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'Red', 'Orange', 'Green'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #334155', cursor: 'pointer', backgroundColor: filter === cat ? '#22c55e' : '#0f172a', color: filter === cat ? '#0f172a' : '#f8fafc', fontSize: '12px', fontWeight: '600' }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #334155', color: '#94a3b8' }}>
                <th style={{ padding: '12px' }}>Unit ID</th>
                <th style={{ padding: '12px' }}>Factory</th>
                <th style={{ padding: '12px' }}>Location</th>
                <th style={{ padding: '12px' }}>Category</th>
                <th style={{ padding: '12px' }}>Air / Water</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredFactories.map((f) => (
                <tr key={f.id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '12px', color: '#94a3b8' }}>{f.id}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{f.name}</td>
                  <td style={{ padding: '12px', color: '#cbd5e1' }}>{f.location}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '4px', backgroundColor: f.category.includes('Red') ? '#450a0a' : f.category.includes('Orange') ? '#451a03' : '#052e16', color: f.category.includes('Red') ? '#fca5a5' : f.category.includes('Orange') ? '#fdba74' : '#86efac' }}>
                      {f.category}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '12px', color: '#94a3b8' }}>
                    Air: {f.airQuality} | Water: {f.waterPurity}
                  </td>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: f.status === 'Compliant' ? '#22c55e' : f.status === 'Notice Issued' ? '#ef4444' : '#eab308' }}>
                    {f.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
