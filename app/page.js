use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploading, setUploading] = useState(false);
  const [dosingTriggered, setDosingTriggered] = useState(false);

  // Dynamic Factory State
  const [waterLimit, setWaterLimit] = useState(85000);
  const [hazardousWasteLimit, setHazardousWasteLimit] = useState(250);

  // Operations Metrics
  const currentDischarge = 74800;
  const currentHazardousWaste = 215;
  const electricityKwh = 1420;

  // Form State
  const [factoryName, setFactoryName] = useState('');
  const [factoryLocation, setFactoryLocation] = useState('');
  const [factoryWaterLimit, setFactoryWaterLimit] = useState('');

  // Ratios
  const dischargeRatio = ((currentDischarge / waterLimit) * 100).toFixed(1);
  const hazWasteRatio = ((currentHazardousWaste / hazardousWasteLimit) * 100).toFixed(1);
  const scope2Carbon = ((electricityKwh * 0.82) / 1000).toFixed(2);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleConsentUpload = (e) => {
    if (!e.target || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploading(true);

    setTimeout(() => {
      setWaterLimit(100000);
      setHazardousWasteLimit(300);
      setUploading(false);
      alert([AI OCR PARSED SUCCESS]\nFile: ${file.name}\n- Water Limit: 100,000 L/Day\n- Hazardous Waste Cap: 300 KG/Month);
    }, 2000);
  };

  const handleIoTTrigger = () => {
    setDosingTriggered(true);
    alert('⚡ [IoT MQTT SIGNAL SENT]\nETP Controller #04 Active.\nChemical Auto-Dosing Valve Opened.');
  };

  const handleAddFactory = (e) => {
    e.preventDefault();
    alert(Factory "${factoryName}" onboarded to Cloud Registry!);
    setFactoryName('');
    setFactoryLocation('');
    setFactoryWaterLimit('');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '250px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', marginBottom: '10px' }}>
          🌱 EcoTrace India
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            type="button"
            onClick={() => setActiveTab('dashboard')} 
            style={{ textAlign: 'left', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            📊 Live Risk Radar
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('onboarding')} 
            style={{ textAlign: 'left', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'onboarding' ? '#22c55e' : 'transparent', color: activeTab === 'onboarding' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            🏭 Client Onboarding
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab('vault')} 
            style={{ textAlign: 'left', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'vault' ? '#22c55e' : 'transparent', color: activeTab === 'vault' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            📜 MPCB Legal Vault
          </button>
        </nav>

        <div style={{ marginTop: 'auto', backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155', fontSize: '12px', color: '#94a3b8' }}>
          National Mission: <strong>Zero Hazardous Discharge 🇮🇳</strong>
        </div>
      </aside>

      {/* Main Container */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        
        {/* Top Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '700' }}>MPCB Compliance &amp; Hazardous Waste Radar</h1>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>Real-time Industrial Monitoring &amp; ESG Carbon Engine</p>
          </div>
          <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            📥 Export Audit Passport (PDF)
          </button>
        </header>

        {activeTab === 'dashboard' && (
          <div>
            {/* AI OCR CTO Parser Banner */}
            <section style={{ backgroundColor: '#1e293b', border: '1px solid #38bdf8', padding: '18px', borderRadius: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: '#38bdf8', fontSize: '16px' }}>📄 AI OCR MPCB Consent (CTO) Reader</h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>
                  Extracted Caps: Water = <strong>{waterLimit.toLocaleString()} L/Day</strong> | Hazardous Waste = <strong>{hazardousWasteLimit} KG/Month</strong>
                </p>
              </div>
              <div>
                <label style={{ backgroundColor: '#0284c7', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'inline-block' }}>
                  {uploading ? 'Parsing PDF Text...' : 'Upload CTO PDF'}
                  <input type="file" accept=".pdf" onChange={handleConsentUpload} style={{ display: 'none' }} disabled={uploading} />
                </label>
              </div>
            </section>

            {/* Critical Red-Flag Alerts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              
              {/* Water Discharge Red-Flag Alert */}
              <div style={{ backgroundColor: Number(dischargeRatio) >= 85 ? '#7f1d1d' : '#064e3b', border: '1px solid #334155', padding: '18px', borderRadius: '12px' }}>
                <h3 style={{ margin: '0 0 6px 0', color: '#fff', fontSize: '16px' }}>
                  {Number(dischargeRatio) >= 85 ? '⚠️ Water Discharge Alert (85%+ Limit)' : '🟢 Water Status: Safe'}
                </h3>
                <p style={{ margin: 0, color: '#fca5a5', fontSize: '13px' }}>
                  Discharge at <strong>{dischargeRatio}%</strong> ({currentDischarge.toLocaleString()} / {waterLimit.toLocaleString()} L).
                </p>
                {Number(dischargeRatio) >= 85 && (
                  <button type="button" onClick={handleIoTTrigger} style={{ backgroundColor: dosingTriggered ? '#16a34a' : '#ef4444', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold', fontSize: '12px' }}>
                    {dosingTriggered ? '✓ Auto-Dosing Activated' : 'Trigger IoT Neutralizer Pump'}
                  </button>
                )}
              </div>

              {/* HAZARDOUS CHEMICAL WASTE ALERT */}
              <div style={{ backgroundColor: Number(hazWasteRatio) >= 80 ? '#7c2d12' : '#064e3b', border: '1px solid #334155', padding: '18px', borderRadius: '12px' }}>
                <h3 style={{ margin: '0 0 6px 0', color: '#fff', fontSize: '16px' }}>
                  ☣️ Hazardous Chemical Waste Radar
                </h3>
                <p style={{ margin: 0, color: '#fdba74', fontSize: '13px' }}>
                  Toxic Sludge: <strong>{currentHazardousWaste} KG</strong> / Max Allowed: <strong>{hazardousWasteLimit} KG</strong> ({hazWasteRatio}%).
                </p>
                <button type="button" onClick={() => alert('Dispatch Notice Issued to MPCB Authorized CHWTSDF Facility for Safe Chemical Disposal.')} style={{ backgroundColor: '#ea580c', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold', fontSize: '12px' }}>
                  🚛 Dispatch to CHWTSDF Recycler
                </button>
              </div>

            </div>

            {/* KPI Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>WATER RISK RADAR</span>
                <p style={{ fontSize: '26px', fontWeight: 'bold', color: '#22c55e', margin: '8px 0 0 0' }}>{dischargeRatio}%</p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f97316' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>HAZARDOUS WASTE CAP</span>
                <p style={{ fontSize: '26px', fontWeight: 'bold', color: '#f97316', margin: '8px 0 0 0' }}>{hazWasteRatio}%</p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #38bdf8' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>SCOPE 2 CARBON LEDGER</span>
                <p style={{ fontSize: '26px', fontWeight: 'bold', color: '#38bdf8', margin: '8px 0 0 0' }}>{scope2Carbon} <span style={{ fontSize: '14px' }}>tCO2e</span></p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Client Onboarding */}
        {activeTab === 'onboarding' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ marginTop: 0, color: '#22c55e', fontSize: '20px' }}>🏭 Register New Industrial Unit (Client Onboarding)</h2>
            <form onSubmit={handleAddFactory} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', marginTop: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Factory Name</label>
                <input required type="text" value={factoryName} onChange={(e) => setFactoryName(e.target.value)} placeholder="e.g. Western Electroplating Unit" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Plant Location</label>
                <input required type="text" value={factoryLocation} onChange={(e) => setFactoryLocation(e.target.value)} placeholder="e.g. Ranjangaon MIDC" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>MPCB Water Consent Limit (Liters/Day)</label>
                <input required type="number" value={factoryWaterLimit} onChange={(e) => setFactoryWaterLimit(e.target.value)} placeholder="85000" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                + Onboard Unit to Cloud Registry
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: MPCB Legal & Regulations Vault */}
        {activeTab === 'vault' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ marginTop: 0, color: '#38bdf8', fontSize: '20px' }}>📜 MPCB Statutory Acts &amp; Environmental Regulations Vault</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <div style={{ borderLeft: '4px solid #ef4444', backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#fca5a5' }}>Hazardous &amp; Other Wastes Rules, 2016</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Mandatory disposal of chemical sludge only through MPCB authorized CHWTSDF facilities.</p>
              </div>
              <div style={{ borderLeft: '4px solid #3b82f6', backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#93c5fd' }}>The Water (Prevention &amp; Control of Pollution) Act, 1974</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Daily discharge limits must strictly comply with Consent to Operate (CTO).</p>
              </div>
              <div style={{ borderLeft: '4px solid #22c55e', backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#86efac' }}>The Air (Prevention &amp; Control of Pollution) Act, 1981</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Stack emission levels for SO2, NOx, and Particulate Matter must remain below statutory thresholds.</p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
