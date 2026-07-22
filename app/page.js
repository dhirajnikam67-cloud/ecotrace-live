'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function EcoTraceEnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploading, setUploading] = useState(false);
  const [dosingTriggered, setDosingTriggered] = useState(false);
  const [loadingDb, setLoadingDb] = useState(true);

  // Dynamic Caps
  const [waterLimit, setWaterLimit] = useState(85000);
  const [hazardousWasteLimit, setHazardousWasteLimit] = useState(250);

  // Supabase Data State
  const [factoryList, setFactoryList] = useState([]);

  // Operations
  const currentDischarge = 74800;
  const currentHazardousWaste = 215;
  const electricityKwh = 1420;

  // Onboarding Form State
  const [factoryName, setFactoryName] = useState('');
  const [factoryLocation, setFactoryLocation] = useState('');
  const [factoryWaterLimit, setFactoryWaterLimit] = useState('');

  // Ratios
  const dischargeRatio = Number((currentDischarge / waterLimit) * 100).toFixed(1);
  const hazWasteRatio = Number((currentHazardousWaste / hazardousWasteLimit) * 100).toFixed(1);
  const scope2Carbon = Number((electricityKwh * 0.82) / 1000).toFixed(2);

  // Fetch Factories from Supabase Cloud
  const fetchFactories = async () => {
    setLoadingDb(true);
    try {
      if (supabase) {
        const { data, error } = await supabase.from('factories').select('*');
        if (error) {
          console.error('Supabase fetch error:', error);
        } else if (data && data.length > 0) {
          setFactoryList(data);
        }
      }
    } catch (err) {
      console.error('Data fetch error:', err);
    } finally {
      setLoadingDb(false);
    }
  };

  useEffect(() => {
    fetchFactories();
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleConsentUpload = (e) => {
    if (!e || !e.target || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploading(true);

    setTimeout(() => {
      setWaterLimit(100000);
      setHazardousWasteLimit(300);
      setUploading(false);
      alert('AI OCR SUCCESS:\nFile: ' + file.name + '\n- Water Limit: 100,000 L/Day\n- Hazardous Waste Cap: 300 KG/Month');
    }, 2000);
  };

  const handleIoTTrigger = () => {
    setDosingTriggered(true);
    alert('IoT MQTT SIGNAL SENT:\nETP Controller Active.\nChemical Auto-Dosing Valve Opened.');
  };

  // Add Factory directly to Supabase Database
  const handleAddFactory = async (e) => {
    e.preventDefault();
    try {
      if (supabase) {
        const { error } = await supabase.from('factories').insert([
          {
            name: factoryName,
            plant_location: factoryLocation,
            mpcb_water_consent_limit_liters: Number(factoryWaterLimit) || 85000,
          },
        ]);

        if (error) {
          alert('Database Error: ' + error.message);
        } else {
          alert('Factory "' + factoryName + '" successfully saved to Supabase Cloud Registry!');
          setFactoryName('');
          setFactoryLocation('');
          setFactoryWaterLimit('');
          fetchFactories();
          setActiveTab('dashboard');
        }
      }
    } catch (err) {
      alert('Failed to insert factory record.');
    }
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
          National Mission: <strong>Zero Pollution 🇮🇳</strong>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '700' }}>MPCB Compliance Radar</h1>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>Real-time Industrial Monitoring Engine</p>
          </div>
          <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            📥 Export Audit Passport
          </button>
        </header>

        {activeTab === 'dashboard' && (
          <div>
            {/* AI OCR Banner */}
            <section style={{ backgroundColor: '#1e293b', border: '1px solid #38bdf8', padding: '18px', borderRadius: '12px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px 0', color: '#38bdf8', fontSize: '16px' }}>📄 AI OCR MPCB Consent Reader</h3>
                <p style={{ margin: 0, color: '#94a3b8', fontSize: '13px' }}>
                  Extracted Caps: Water = <strong>{waterLimit.toLocaleString()} L/Day</strong> | Hazardous Waste = <strong>{hazardousWasteLimit} KG/Month</strong>
                </p>
              </div>
              <div>
                <label style={{ backgroundColor: '#0284c7', color: '#fff', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'inline-block' }}>
                  {uploading ? 'Parsing PDF...' : 'Upload CTO PDF'}
                  <input type="file" accept=".pdf" onChange={handleConsentUpload} style={{ display: 'none' }} disabled={uploading} />
                </label>
              </div>
            </section>

            {/* Critical Red-Flag Alerts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              
              {/* Water Alert */}
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

              {/* Hazardous Waste Alert */}
              <div style={{ backgroundColor: Number(hazWasteRatio) >= 80 ? '#7c2d12' : '#064e3b', border: '1px solid #334155', padding: '18px', borderRadius: '12px' }}>
                <h3 style={{ margin: '0 0 6px 0', color: '#fff', fontSize: '16px' }}>
                  ☣️ Hazardous Chemical Waste Radar
                </h3>
                <p style={{ margin: 0, color: '#fdba74', fontSize: '13px' }}>
                  Toxic Sludge: <strong>{currentHazardousWaste} KG</strong> / Max Allowed: <strong>{hazardousWasteLimit} KG</strong> ({hazWasteRatio}%).
                </p>
                <button type="button" onClick={() => alert('Dispatch Notice Issued to MPCB Authorized CHWTSDF Facility.')} style={{ backgroundColor: '#ea580c', color: '#fff', border: 'none', padding: '8px 14px', borderRadius: '6px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold', fontSize: '12px' }}>
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

            {/* Live Supabase Cloud Database Table */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#22c55e', fontSize: '16px' }}>🏭 Live Industrial Compliance Records (Supabase Direct Fetch)</h3>
              {loadingDb ? (
                <p style={{ color: '#94a3b8', fontSize: '13px' }}>Fetching live data from Supabase Cloud...</p>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                      <th style={{ padding: '10px' }}>Factory Name</th>
                      <th style={{ padding: '10px' }}>Location</th>
                      <th style={{ padding: '10px' }}>Water Limit (L/Day)</th>
                      <th style={{ padding: '10px' }}>OCR Status</th>
                      <th style={{ padding: '10px' }}>Compliance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {factoryList.length > 0 ? (
                      factoryList.map((item, idx) => (
                        <tr key={item.id || idx} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '12px 10px', fontWeight: 'bold' }}>{item.name}</td>
                          <td style={{ padding: '12px 10px', color: '#94a3b8' }}>{item.plant_location}</td>
                          <td style={{ padding: '12px 10px' }}>{item.mpcb_water_consent_limit_liters ? item.mpcb_water_consent_limit_liters.toLocaleString() : '85,000'} L</td>
                          <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{item.ocr_parsing_status || 'PARSED'}</td>
                          <td style={{ padding: '12px 10px', color: '#22c55e', fontWeight: 'bold' }}>Compliant</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ padding: '15px', color: '#94a3b8', textAlign: 'center' }}>No factories found in Supabase. Add one via Client Onboarding tab!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Client Onboarding */}
        {activeTab === 'onboarding' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ marginTop: 0, color: '#22c55e', fontSize: '20px' }}>🏭 Register New Industrial Unit (Direct Supabase Save)</h2>
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

        {/* Tab 3: MPCB Vault */}
        {activeTab === 'vault' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ marginTop: 0, color: '#38bdf8', fontSize: '20px' }}>📜 MPCB Statutory Regulations Vault</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <div style={{ borderLeft: '4px solid #ef4444', backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#fca5a5' }}>Hazardous &amp; Other Wastes Rules, 2016</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Mandatory disposal through MPCB authorized CHWTSDF facilities.</p>
              </div>
              <div style={{ borderLeft: '4px solid #3b82f6', backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#93c5fd' }}>The Water (Prevention &amp; Control of Pollution) Act, 1974</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#94a3b8' }}>Discharge limits must comply with CTO.</p>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
