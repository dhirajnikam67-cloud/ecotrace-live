'use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseShield() {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Dynamic Enterprise Registry with Full Sensor Metrics
  const [factoryList, setFactoryList] = useState([
    { 
      id: 1, 
      name: 'WESTERN CHEMICALS', 
      location: 'BHOSARI MIDC', 
      limit: 85000, 
      discharge: 74800, 
      ph: 7.4, 
      cod: 210, 
      status: 'COMPLIANT',
      ctoDaysLeft: 82,
      penaltyRisk: 0,
      scope1: 0.23,
      scope2: 1.16,
      scope3: 0.06
    }
  ]);
  const [selectedFactoryId, setSelectedFactoryId] = useState(1);

  // Form States
  const [vehicleNo, setVehicleNo] = useState('');
  const [transporterName, setTransporterName] = useState('');
  const [factoryName, setFactoryName] = useState('');
  const [factoryLocation, setFactoryLocation] = useState('');
  const [factoryLimit, setFactoryLimit] = useState('');

  // Currently Monitored Context
  const activeFactory = factoryList.find(f => f.id === selectedFactoryId) || factoryList[0];
  const totalCarbon = (activeFactory.scope1 + activeFactory.scope2 + activeFactory.scope3).toFixed(2);

  // Event Handlers
  const handlePrintAuditPassport = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const handleSyncMPCBPortal = () => {
    alert('Establishing Secure Handshake with MPCB OCMMS Server...\n\nStatus: 100% Anonymized Zero-Error Data Transferred.');
  };

  const handleGenerateForm10PDF = (e) => {
    e.preventDefault();
    alert('MPCB Form 10 Hazardous Waste Manifest PDF Generated!\nVehicle: ' + vehicleNo + '\nTransporter: ' + transporterName);
    setVehicleNo('');
    setTransporterName('');
  };

  const handleOnboardNewFactory = (e) => {
    e.preventDefault();
    const newId = factoryList.length + 1;
    const limitNum = Number(factoryLimit) || 50000;
    
    const newUnit = {
      id: newId,
      name: factoryName.toUpperCase().trim(),
      location: factoryLocation.toUpperCase().trim() + ' MIDC',
      limit: limitNum,
      discharge: Math.floor(limitNum * 0.78),
      ph: 7.2,
      cod: 185,
      status: 'COMPLIANT',
      ctoDaysLeft: 120,
      penaltyRisk: 0,
      scope1: 0.18,
      scope2: 0.95,
      scope3: 0.04
    };

    setFactoryList(prev => [newUnit, ...prev]);
    setSelectedFactoryId(newId);
    alert('Industrial Unit ' + newUnit.name + ' Successfully Onboarded!');
    
    setFactoryName('');
    setFactoryLocation('');
    setFactoryLimit('');
    setActiveTab('dashboard');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '280px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#22c55e' }}>EcoTrace India</div>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Industry Protection and Compliance Shield</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button type="button" onClick={() => setActiveTab('dashboard')} style={{ textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#f8fafc', fontWeight: 'bold' }}>
            Live Risk Radar
          </button>
          <button type="button" onClick={() => setActiveTab('esg')} style={{ textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'esg' ? '#22c55e' : 'transparent', color: activeTab === 'esg' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            Scope 1,2,3 ESG Engine
          </button>
          <button type="button" onClick={() => setActiveTab('manifest')} style={{ textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'manifest' ? '#22c55e' : 'transparent', color: activeTab === 'manifest' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            Form 10 Manifest Generator
          </button>
          <button type="button" onClick={() => setActiveTab('cluster')} style={{ textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'cluster' ? '#22c55e' : 'transparent', color: activeTab === 'cluster' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            MCCI MIDC Cluster Center
          </button>
          <button type="button" onClick={() => setActiveTab('onboarding')} style={{ textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'onboarding' ? '#22c55e' : 'transparent', color: activeTab === 'onboarding' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            Client Onboarding
          </button>
          <button type="button" onClick={() => setActiveTab('vault')} style={{ textAlign: 'left', padding: '12px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'vault' ? '#22c55e' : 'transparent', color: activeTab === 'vault' ? '#0f172a' : '#94a3b8', fontWeight: 'bold' }}>
            MPCB Legal Vault
          </button>
        </nav>

        {/* Green Vendor Passport Widget */}
        <div style={{ marginTop: 'auto', backgroundColor: '#0f172a', padding: '14px', borderRadius: '8px', border: '1px solid #22c55e', fontSize: '12px' }}>
          <span style={{ color: '#22c55e', fontWeight: 'bold', display: 'block', marginBottom: '4px' }}>Green Vendor Passport</span>
          <p style={{ margin: '0 0 10px 0', color: '#94a3b8', fontSize: '11px' }}>0.75% Bank Interest Subvention Eligible for MSMEs</p>
          <button type="button" onClick={() => alert('Certificate Downloaded!\nVerified Green Credit Rating for Bank Loan Discount.')} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold', width: '100%', cursor: 'pointer' }}>
            Download Loan Certificate PDF
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        
        {/* Top Header & Selector */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '700' }}>MPCB and Enterprise Compliance Gateway</h1>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>AI-Powered Zero Non-Compliance Protection Ecosystem</p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div style={{ backgroundColor: '#1e293b', border: '1px solid #38bdf8', padding: '6px 12px', borderRadius: '8px' }}>
              <span style={{ fontSize: '10px', color: '#38bdf8', display: 'block', fontWeight: 'bold' }}>MONITORED UNIT:</span>
              <select value={selectedFactoryId} onChange={(e) => setSelectedFactoryId(Number(e.target.value))} style={{ backgroundColor: 'transparent', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', outline: 'none' }}>
                {factoryList.map(f => (
                  <option key={f.id} value={f.id} style={{ backgroundColor: '#0f172a' }}>{f.name} ({f.location})</option>
                ))}
              </select>
            </div>

            <button type="button" onClick={handlePrintAuditPassport} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Export Audit Passport PDF
            </button>
            <button type="button" onClick={handleSyncMPCBPortal} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
              Sync MPCB Portal
            </button>
          </div>
        </header>

        {/* TAB 1: LIVE RISK RADAR */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ backgroundColor: '#1e293b', borderLeft: '5px solid #22c55e', padding: '15px 20px', borderRadius: '8px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>ACTIVE PROTECTED UNIT:</span>
                <h2 style={{ margin: 0, color: '#22c55e', fontSize: '20px' }}>{activeFactory.name} - <span style={{ color: '#fff', fontSize: '16px' }}>{activeFactory.location}</span></h2>
              </div>
              <span style={{ backgroundColor: '#064e3b', color: '#22c55e', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold', fontSize: '12px' }}>
                Cloud IoT Monitoring Active
              </span>
            </div>

            {/* Top Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '25px' }}>
              <div style={{ backgroundColor: '#1e293b', border: '1px solid #eab308', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ color: '#eab308', margin: '0 0 8px 0', fontSize: '15px' }}>CTO Renewal Radar</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 8px 0' }}>{activeFactory.ctoDaysLeft} Days Left</p>
                <button type="button" onClick={() => alert('Auto-Generating MPCB Consent Renewal Form...')} style={{ backgroundColor: '#eab308', color: '#0f172a', border: 'none', padding: '6px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>Auto-Renew CTO</button>
              </div>

              <div style={{ backgroundColor: '#1e293b', border: '1px solid #ef4444', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ color: '#ef4444', margin: '0 0 8px 0', fontSize: '15px' }}>Prosecution Penalty Shield</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#fca5a5' }}>INR {activeFactory.penaltyRisk} (Protected)</p>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>100% Encrypted Internal Calculation</span>
              </div>

              <div style={{ backgroundColor: '#1e293b', border: '1px solid #38bdf8', padding: '20px', borderRadius: '12px' }}>
                <h3 style={{ color: '#38bdf8', margin: '0 0 8px 0', fontSize: '15px' }}>Scope 1, 2, 3 Total Carbon</h3>
                <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#38bdf8' }}>{totalCarbon} tCO2e</p>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>MNC Supplier Audit Ready</span>
              </div>
            </div>

            {/* IoT Live Sensors */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '25px' }}>
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

            {/* Onboarded Units Live Table */}
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
              <h3 style={{ margin: '0 0 15px 0', color: '#22c55e', fontSize: '16px' }}>Onboarded Industrial Units Live Registry ({factoryList.length})</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #334155', color: '#94a3b8' }}>
                    <th style={{ padding: '10px' }}>Factory Name</th>
                    <th style={{ padding: '10px' }}>MIDC Location</th>
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

        {/* TAB 2: ESG ENGINE */}
        {activeTab === 'esg' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ marginTop: 0, color: '#22c55e', fontSize: '20px' }}>Scope 1, 2, 3 GHG Carbon Accounting Engine</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>Mandatory ESG Reporting Module required by MNCs (TATA, Mahindra, Bajaj) for MSME Vendors.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #ef4444' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#fca5a5' }}>Scope 1 (Direct Fuels)</h4>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{activeFactory.scope1} tCO2e</p>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Diesel Generators, Boilers and Fleet</span>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#93c5fd' }}>Scope 2 (Electricity)</h4>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{activeFactory.scope2} tCO2e</p>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>MSEDCL Grid Electricity Usage</span>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '18px', borderRadius: '8px', borderLeft: '4px solid #eab308' }}>
                <h4 style={{ margin: '0 0 5px 0', color: '#fef08a' }}>Scope 3 (Supply Chain)</h4>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{activeFactory.scope3} tCO2e</p>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Logistics, Raw Material Transport</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MANIFEST */}
        {activeTab === 'manifest' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <h2 style={{ marginTop: 0, color: '#22c55e', fontSize: '20px' }}>MPCB Form 10 Hazardous Waste Manifest Generator</h2>
            <p style={{ color: '#94a3b8', fontSize: '13px' }}>Digital manifest creation for mandatory MEPL CHWTSDF hazardous waste movement.</p>
            
            <form onSubmit={handleGenerateForm10PDF} style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px', marginTop: '20px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Vehicle Number</label>
                <input required type="text" value={vehicleNo} onChange={(e) => setVehicleNo(e.target.value)} placeholder="e.g. MH 12 QW 4589" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', color: '#94a3b8', marginBottom: '5px' }}>Authorized Transporter Name</label>
                <input required type="text" value={transporterName} onChange={(e) => setTransporterName(e.target.value)} placeholder="e.g. MEPL CHWTSDF Transporter" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #334155', backgroundColor: '#0f172a', color: '#fff' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
                Generate and Download Signed Form 10 PDF
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: MCCI CLUSTER */}
        {activeTab === 'cluster' && (
          <div style={{ backgroundColor: '#1e293b', padding: '25px', borderRadius: '12px', border: '1px solid #334155' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2 style={{ marginTop: 0, color: '#38bdf8', fontSize: '20px' }}>MCCI MIDC Cluster Monitoring Command Center</h2>
                <p style={{ color: '#94a3b8', fontSize: '13px', margin: '4px 0 0 0' }}>Anonymized Regional Aggregator for Chamber of Commerce and Industry Associations</p>
              </div>
              <span style={{ backgroundColor: '#064e3b', color: '#22c55e', border: '1px solid #22c55e', padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                MSME Privacy Shield Active
              </span>
            </div>

            <div style={{ marginTop: '15px', backgroundColor: '#0f172a', border: '1px solid #38bdf8', padding: '12px 15px', borderRadius: '8px', fontSize: '12px', color: '#94a3b8' }}>
              <strong style={{ color: '#38bdf8' }}>Privacy Guarantee:</strong> MCCI sees only regional cluster efficiency percentages. Individual factory names, exact effluent parameters, and penalty risk calculations are strictly masked.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '18px', borderRadius: '8px
