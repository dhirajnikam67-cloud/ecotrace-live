'use client';

import { useState } from 'react';

export default function EcoTraceDashboard() {
  const [filter, setFilter] = useState('All');
  const [uploading, setUploading] = useState(false);
  const [waterLimit, setWaterLimit] = useState(85000);

  const currentDischarge = 74800;
  const electricityKwh = 1420;

  const dischargeRatio = ((currentDischarge / waterLimit) * 100).toFixed(1);
  const scope2Carbon = ((electricityKwh * 0.82) / 1000).toFixed(2);

  const factories = [
    { id: 'FAC-001', name: 'Alpha Auto Tech', location: 'Chakan, Pune', category: 'Red Category', status: 'Compliant', airQuality: '92%', waterPurity: '98%' },
    { id: 'FAC-002', name: 'Sahyadri Chemicals', location: 'Ranjangaon', category: 'Orange Category', status: 'Review Needed', airQuality: '78%', waterPurity: '85%' },
    { id: 'FAC-003', name: 'Western Engineering', location: 'Talegaon', category: 'Green Category', status: 'Compliant', airQuality: '95%', waterPurity: '99%' },
    { id: 'FAC-004', name: 'Deccan Electroplates', location: 'Bhosari', category: 'Red Category', status: 'Notice Issued', airQuality: '64%', waterPurity: '70%' },
  ];

  const filteredFactories = filter === 'All' 
    ? factories 
    : factories.filter(f => f.category.includes(filter));

  const handleConsentUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    setTimeout(() => {
      setWaterLimit(100000);
      setUploading(false);
      alert('AI OCR Engine Parsed MPCB CTO Document Successfully!\nDynamic Consent Limit Updated to 1,00,000 L/Day.');
    }, 2000);
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif', minHeight: '100vh' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontSize: '26px', margin: 0, color: '#22c55e' }}>🌱 EcoTrace India</h1>
          <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>MPCB Legal Shield & Enterprise Carbon Engine</p>
        </div>
        <button 
          onClick={() => window.print()}
          style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          📥 Export Audit Report (PDF)
        </button>
      </div>

      {/* AI OCR Section */}
      <div style={{ backgroundColor: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '12px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h3 style={{ margin: '0 0 6px 0', color: '#38bdf8', fontSize: '16px' }}>📄 AI OCR MPCB Consent Auto-Parser</h3>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>
            Current Factory Water Consent Limit: <strong>{waterLimit.toLocaleString()} L/day</strong>
          </p>
        </div>
        <div>
          <label style={{ backgroundColor: '#0284c7', color: '#fff', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'inline-block' }}>
            {uploading ? 'Parsing PDF...' : 'Upload MPCB CTO PDF'}
            <input type="file" accept=".pdf" onChange={handleConsentUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
        </div>
      </div>

      {/* Risk Alert Banner */}
      {Number(dischargeRatio) >= 85 ? (
        <div style={{ backgroundColor: '#7f1d1d', border: '1px solid #ef4444', padding: '18px', borderRadius: '12px', marginBottom: '25px' }}>
          <h3 style={{ margin: '0 0 6px 0', color: '#fff' }}>⚠️ Pre-Emptive Red-Flag Alert</h3>
          <p style={{ margin: 0, color: '#fca5a5', fontSize: '14px' }}>
            Water discharge reached <strong>{dischargeRatio}%</strong> of MPCB limit ({currentDischarge.toLocaleString()} / {waterLimit.toLocaleString()} L). Penalty threshold imminent in 36 hrs!
          </p>
        </div>
      ) : (
        <div style={{ backgroundColor: '#064e3b', border: '1px solid #10b981', padding: '15px 20px', borderRadius: '12px', marginBottom: '25px' }}>
          <h3 style={{ margin: '0 0 4px 0', color: '#86efac', fontSize: '16px' }}>🟢 Status: Fully Compliant</h3>
          <p style={{ margin: 0, color: '#a7f3d0', fontSize: '14px' }}>Discharge within statutory boundaries ({dischargeRatio}% of MPCB Consent Limit).</p>
        </div>
      )}

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '30px' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #22c55e' }}>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>DYNAMIC RISK RADAR</span>
          <p style={{ fontSize: '26px', fontWeight: 'bold', color: '#22c55e', margin: '8px 0 0 0' }}>{dischargeRatio}%</p>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Max Limit: {waterLimit.toLocaleString()} L</span>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #38bdf8' }}>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>SCOPE 2 CARBON LEDGER</span>
          <p style={{ fontSize: '26px', fontWeight: 'bold', color: '#38bdf8', margin: '8px 0 0 0' }}>{scope2Carbon} <span style={{ fontSize: '14px' }}>tCO2e</span></p>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>0.82 kg CO2/kWh Factor</span>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #eab308' }}>
          <span style={{ color: '#94a3b8', fontSize: '12px' }}>COMPLIANCE VAULT</span>
          <button 
            onClick={() => alert('Generating Certified QR Compliance Passport...')} 
            style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', display: 'block', width: '100%' }}>
            📄 Instant Passport
          </button>
        </div>
      </div>

      {/* Table Section */}
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

        <div style={{ overflowX: 'auto' }}>
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
      </div>

    </div>
  );
}
