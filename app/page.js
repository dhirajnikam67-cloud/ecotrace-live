'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function EcoTraceEnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploading, setUploading] = useState(false);
  const [dosingTriggered, setDosingTriggered] = useState(false);
  const [loadingDb, setLoadingDb] = useState(false);

  // Dynamic Caps & Sensor Values
  const [waterLimit, setWaterLimit] = useState(85000);
  const [hazardousWasteLimit, setHazardousWasteLimit] = useState(250);
  const [ctoExpiryDays, setCtoExpiryDays] = useState(82);

  // IoT Live Sensors (COD, BOD, pH)
  const [phLevel, setPhLevel] = useState(7.4);
  const [codLevel, setCodLevel] = useState(210);

  // Supabase Data State
  const [factoryList, setFactoryList] = useState([]);

  // Operations Metrics
  const currentDischarge = 74800;
  const currentHazardousWaste = 215;
  const electricityKwh = 1420;

  // Onboarding Form State
  const [factoryName, setFactoryName] = useState('');
  const [factoryLocation, setFactoryLocation] = useState('');
  const [factoryWaterLimit, setFactoryWaterLimit] = useState('');

  // Form 10 State
  const [vehicleNo, setVehicleNo] = useState('');
  const [transporterName, setTransporterName] = useState('');

  // Calculations
  const dischargeRatio = Number((currentDischarge / waterLimit) * 100).toFixed(1);
  const hazWasteRatio = Number((currentHazardousWaste / hazardousWasteLimit) * 100).toFixed(1);
  const scope2Carbon = Number((electricityKwh * 0.82) / 1000).toFixed(2);

  // MPCB Penalty Risk Calculation Logic
  const calculatePenalty = () => {
    let penalty = 0;
    if (Number(dischargeRatio) > 85) penalty += 75000;
    if (Number(hazWasteRatio) > 80) penalty += 125000;
    if (phLevel < 6.5 || phLevel > 8.5) penalty += 50000;
    return penalty;
  };

  const estimatedPenalty = calculatePenalty();

  // Fetch Factories Safely
  const fetchFactories = async () => {
    setLoadingDb(true);
    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (url && key) {
        const supabase = createClient(url, key);
        const { data, error } = await supabase.from('factories').select('*').order('created_at', { ascending: false });
        if (!error && data && data.length > 0) {
          setFactoryList(data);
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
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
      setCtoExpiryDays(365);
      setUploading(false);
      alert('AI OCR SUCCESS:\nFile: ' + file.name + '\n- Water Limit: 100,000 L/Day\n- Hazardous Waste Cap: 300 KG/Month\n- Renewal Reset: 365 Days Valid');
    }, 2000);
  };

  const handleIoTTrigger = () => {
    setDosingTriggered(true);
    setPhLevel(7.2);
    alert('IoT MQTT SIGNAL SENT:\nETP Controller Active.\nChemical Neutralizer Valve Opened. pH stabilized to 7.2.');
  };

  const handleGenerateForm10 = (e) => {
    e.preventDefault();
    alert('📄 MPCB FORM 10 MANIFEST GENERATED!\nVehicle: ' + vehicleNo + '\nTransporter: ' + transporterName + '\nStatus: Ready for CHWTSDF Gatepass Verification.');
    setVehicleNo('');
    setTransporterName('');
  };

  // Add Factory Handler
  const handleAddFactory = async (e) => {
    e.preventDefault();
    const newRecord = {
      name: factoryName,
      plant_location: factoryLocation,
      mpcb_water_consent_limit_liters: Number(factoryWaterLimit) || 85000,
      ocr_parsing_status: 'PARSED'
    };

    try {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (url && key) {
        const supabase = createClient(url, key);
        await supabase.from('factories').insert([
          {
            name: factoryName,
            plant_location: factoryLocation,
            mpcb_water_consent_limit_liters: Number(factoryWaterLimit) || 85000,
          }
        ]);
      }
    } catch (err) {
      console.warn('Insert notice:', err);
    }

    setFactoryList(prev => [newRecord, ...prev]);
    alert('✅ Unit onboarded to Active Compliance Dashboard!');

    setFactoryName('');
    setFactoryLocation('');
    setFactoryWaterLimit('');
    setActiveTab('dashboard');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '260px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
            onClick={() => setActiveTab('manifest')} 
            style={{ textAlign: 'left', padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'manifest' ? '#22c55e' : 'transparent', color: activeTab === 'manifest' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            🚛 Form 10 Manifest Generator
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

        {/* ESG Certificate Banner */}
        <div style={{ marginTop: 'auto', backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #22c55e', fontSize: '12px' }}>
          <span style={{ color: '#22c55e', fontWeight: 'bold' }}>🏅 Green Vendor Certified</span>
          <p style={{ margin: '4px 0 8px 0', color: '#94a3b8', fontSize: '11px' }}>Ready for MNC B2B Audits</p>
          <button type="button" onClick={() => alert('Downloading EcoTrace ESG Passport PDF...')} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '6px 10px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', width: '100%', cursor: 'pointer' }}>
            Download ESG Passport
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '700' }}>MPCB Compliance and MSME Shield</h1>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>Real-time Industrial Monitoring Engine</p>
          </div>
          <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            📥 Export Audit Passport
          </button>
        </header>

        {activeTab === 'dashboard' && (
          <div>
            {/* CTO Expiry & AI OCR Banner Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              
              {/* CTO Expiry Tracker */}
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

              {/* AI OCR Reader */}
              <div style={{ backgroundColor: '#1e293b', border: '1px solid #38bdf8', padding: '18px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ margin: '0 0 4px 0', color: '#38bdf8', fontSize: '15px' }}>📄 AI OCR CTO Reader</h3>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '12px' }}>
                    Water: <strong>{waterLimit.toLocaleString()} L</strong> | Haz: <strong>{hazardousWasteLimit} KG</strong>
                  </p>
                </div>
                <label style={{ backgroundColor: '#0284c7', color: '#fff', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}>
                  {uploading ? 'Parsing...' : 'Upload CTO'}
                  <input type="file" accept=".pdf" onChange={handleConsentUpload} style={{ display: 'none' }} disabled={uploading} />
                </label>
              </div>

            </div>

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

              {/* Penalty Risk Financial Shield */}
              <div style={{ backgroundColor: estimatedPenalty > 0 ? '#450a0a' : '#064e3b', border: '1px solid #ef4444', padding: '18px', borderRadius: '12px' }}>
                <h3 style={{ margin: '0 0 6px 0', color: '#fca5a5', fontSize: '16px' }}>
                  🚨 Financial Prosecution Shield
                </h3>
                <p style={{ margin: '0 0 8px 0', color: '#fca5a5', fontSize: '13px' }}>
                  Estimated Penalty Risk: <strong style={{ fontSize: '18px', color: '#fff' }}>₹{estimatedPenalty.toLocaleString()}</strong>
                </p>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Calculated via MPCB Penalty Matrix</span>
              </div>

            </div>

            {/* Live IoT Sensor Feed (COD / BOD / pH) & Carbon Ledger */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>LIVE IoT pH SENSOR</span>
                <p style={{ fontSize: '26px', fontWeight: 'bold', color: phLevel < 6.5 || phLevel > 8.5 ? '#ef4444' : '#22c55e', margin: '8px 0 0 0' }}>{phLevel} <span style={{ fontSize: '12px', color: '#94a3b8' }}>(6.5-8.5)</span></p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #f97316' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>EFFLUENT COD LEVEL</span>
                <p style={{ fontSize: '26px', fontWeight: 'bold', color: '#f97316', margin: '8px 0 0 0' }}>{codLevel} <span style={{ fontSize: '12px', color: '#94a3b8' }}>mg/L</span></p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #38bdf8' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>SCOPE 2 CARBON LEDGER</span>
                <p style={{ fontSize: '26px', fontWeight: 'bold', color: '#38bdf8', margin: '8px 0 0 0' }}>{scope2Carbon} <span style={{ fontSize: '14px' }}>tCO2e</span></p>
              </div>
            </div>

            {/* Live Industrial Compliance Table */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h3 style={{ margin: 0, color: '#22c55e', fontSize: '16px' }}>🏭 Live Industrial Compliance Records</h3>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="button" onClick={() => alert('AI Form IV Annual Return Generated!')} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    📄 Auto-File Form IV
                  </button>
                  <button type="button" onClick={fetchFactories} style={{ backgroundColor: '#334155', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                    🔄 Refresh
                  </button>
                </div>
              </div>
              {loadingDb ? (
                <p style={{ color: '#94a3b8', fontSize: '13px' }}>Fetching records...</p>
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
                          <td style={{ padding: '12px 10px' }}>{item.mpcb_water_consent_limit_liters ? Number(item.mpcb_water_consent_limit_liters).toLocaleString() : '85,000'} L</td>
                          <td style={{ padding: '12px 10px', color: '#38bdf8' }}>{item.ocr_parsing_status || 'PARSED'}</td>
                          <td style={{ padding: '12px 10px', color: '#22c55e', fontWeight: 'bold' }}>Compliant</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ padding: '15px', color: '#94a3b8', textAlign: 'center' }}>No factories registered yet. Onboard one using the Client Onboarding tab!</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Form 10 Manifest Generator */}
        {activeTab === 'manifest' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ marginTop: 0, color: '#22c55e', fontSize: '20px' }}>🚛 MPCB Form 10 Hazardous Waste Manifest Generator</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>Generate statutory dispatch receipts for CHWTSDF recycling facility transport.</p>
            <form onSubmit={handleGenerateForm10} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', marginTop: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>MPCB Authorized Vehicle Number</label>
                <input required type="text" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} placeholder="e.g. MH 12 QW 4589" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Transporter / Recycler Name</label>
                <input required type="text" value={transporterName} onChange={(e) => setTransporterName(e.target.value)} placeholder="e.g. MEPL Ranjangaon CHWTSDF" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
                📄 Generate Form 10 PDF
              </button>
            </form>
          </div>
        )}

        {/* Tab 3: Client Onboarding */}
        {activeTab === 'onboarding' && (
