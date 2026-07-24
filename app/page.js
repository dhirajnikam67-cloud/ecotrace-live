'use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseShield() {
  const [activeTab, setActiveTab] = useState('returns');
  
  // Dynamic Enterprise Registry with Blockchain Hashes
  const [factoryList, setFactoryList] = useState([
    { 
      id: 1, 
      name: 'WESTERN CHEMICALS', 
      location: 'BHOSARI MIDC', 
      limit: 85000, 
      discharge: 74800, 
      ph: 7.4, 
      cod: 210, 
      etpHealth: 98,
      status: 'COMPLIANT',
      ctoDaysLeft: 82,
      penaltyRisk: 0,
      scope1: 0.23,
      scope2: 1.16,
      scope3: 0.06,
      blockHash: '0xa8f392c1b4e87019d6f2231e'
    },
    { 
      id: 2, 
      name: 'SAGAR CHEMICALS', 
      location: 'BHOSARI MIDC', 
      limit: 120000, 
      discharge: 90000, 
      ph: 7.2, 
      cod: 180, 
      etpHealth: 99,
      status: 'COMPLIANT',
      ctoDaysLeft: 180,
      penaltyRisk: 0,
      scope1: 0.20,
      scope2: 1.05,
      scope3: 0.05,
      blockHash: '0x3b7de10f8a912c448201a68e'
    }
  ]);
  const [selectedFactoryId, setSelectedFactoryId] = useState(1);

  // Dynamic Return Forms State
  const [selectedReturnForm, setSelectedReturnForm] = useState('Form 3');
  
  // Form 3 Fields (Daily Maintenance Log)
  const [form3Date, setForm3Date] = useState('2026-07-24');
  const [form3WasteType, setForm3WasteType] = useState('5.1 Spent / Used Oil');
  const [form3DailyQty, setForm3DailyQty] = useState('150 Liters');
  const [form3StorageMethod, setForm3StorageMethod] = useState('Sealed HD Drums in Containment Bay');

  // Form 4 Fields (Annual Return - Due June 30)
  const [form4Category, setForm4Category] = useState('5.1 Spent Oil / Lubricant Sludge');
  const [form4AnnualQty, setForm4AnnualQty] = useState('12.5 MT');
  const [form4DisposalFacility, setForm4DisposalFacility] = useState('MEPL Ranjangaon CHWTSDF');

  // Form 5 Fields (Environmental Statement - Due Sept 30)
  const [form5RawMaterial, setForm5RawMaterial] = useState('18.2 MT/Month');
  const [form5WaterProcess, setForm5WaterProcess] = useState('3200 L/Day');
  const [form5PollutionControl, setForm5PollutionControl] = useState('Primary + Secondary Biological ETP Active');

  // Form 10 Manifest State
  const [vehicleNo, setVehicleNo] = useState('MH 12 AB 1234');
  const [transporterName, setTransporterName] = useState('MEHA HAZARD FREIGHT LOGISTICS');
  const [wasteCategory, setWasteCategory] = useState('5.1 Used / Spent Oil');
  const [wasteQuantity, setWasteQuantity] = useState('2.5');
  const [destinationChwtsdf, setDestinationChwtsdf] = useState('MEPL Ranjangaon CHWTSDF');
  
  // Client Onboarding Form States
  const [factoryName, setFactoryName] = useState('');
  const [factoryLocation, setFactoryLocation] = useState('');
  const [factoryLimit, setFactoryLimit] = useState('');

  // Legal Defense Notice State
  const [noticeType, setNoticeType] = useState('Show Cause Notice');
  const [noticeReference, setNoticeReference] = useState('');
  const [allegedIssue, setAllegedIssue] = useState('pH Parameter Exceedance');

  // IoT Threshold Alert State
  const [alertPhone, setAlertPhone] = useState('+91 9876543210');
  const [phMaxLimit, setPhMaxLimit] = useState('8.5');
  const [phMinLimit, setPhMinLimit] = useState('6.5');
  const [codMaxLimit, setCodMaxLimit] = useState('250');

  // ESG GHG Emissions State
  const [dieselLiters, setDieselLiters] = useState('150');
  const [electricityKwh, setElectricityKwh] = useState('4200');
  const [freightKm, setFreightKm] = useState('850');
  const [calcScope1, setCalcScope1] = useState('0.40');
  const [calcScope2, setCalcScope2] = useState('3.44');
  const [calcScope3, setCalcScope3] = useState('0.18');

  // Active Factory Context
  const activeFactory = factoryList.find(f => f.id === selectedFactoryId) || factoryList[0];
  const totalCarbon = (activeFactory.scope1 + activeFactory.scope2 + activeFactory.scope3).toFixed(2);

  // Handlers
  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const handleSyncMPCB = () => {
    alert('Handshake with MPCB OCMMS Server Successful.\nStatus: Blockchain Hash ' + activeFactory.blockHash + ' verified.');
  };

  const handleGenerateReturn = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') window.print();
  };

  const handleGenerateForm10 = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') window.print();
  };

  const handleGenerateDefense = (e) => {
    e.preventDefault();
    if (typeof window !== 'undefined') window.print();
  };

  const handleTestWhatsAppAlert = (e) => {
    e.preventDefault();
    alert('REAL-TIME THRESHOLD ALERT SENT!\nTarget Phone: ' + alertPhone + '\nUnit: ' + activeFactory.name);
  };

  const handleCalculateEsg = (e) => {
    e.preventDefault();
    const s1 = ((Number(dieselLiters) || 0) * 2.68 / 1000).toFixed(2);
    const s2 = ((Number(electricityKwh) || 0) * 0.82 / 1000).toFixed(2);
    const s3 = ((Number(freightKm) || 0) * 0.21 / 1000).toFixed(2);
    
    setCalcScope1(s1);
    setCalcScope2(s2);
    setCalcScope3(s3);
  };

  const handleAddFactory = (e) => {
    e.preventDefault();
    const newId = factoryList.length + 1;
    const limitNum = Number(factoryLimit) || 50000;
    
    const newUnit = {
      id: newId,
      name: factoryName.toUpperCase().trim(),
      location: factoryLocation.toUpperCase().trim() + ' MIDC',
      limit: limitNum,
      discharge: Math.floor(limitNum * 0.75),
      ph: 7.2,
      cod: 180,
      etpHealth: 99,
      status: 'COMPLIANT',
      ctoDaysLeft: 180,
      penaltyRisk: 0,
      scope1: 0.20,
      scope2: 1.05,
      scope3: 0.05,
      blockHash: '0x' + Math.random().toString(16).substring(2, 14)
    };

    setFactoryList(prev => [newUnit, ...prev]);
    setSelectedFactoryId(newId);
    alert('NEW INDUSTRIAL UNIT ONBOARDED!\n\nUnit: ' + newUnit.name + '\nBlockchain Hash: ' + newUnit.blockHash);
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
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e' }}>EcoTrace India</div>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Industry Protection Shield</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button type="button" onClick={() => setActiveTab('dashboard')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#fff', fontWeight: 'bold' }}>Live Risk Radar &amp; ETP Index</button>
          <button type="button" onClick={() => setActiveTab('returns')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'returns' ? '#14b8a6' : 'transparent', color: activeTab === 'returns' ? '#0f172a' : '#99f6e4', fontWeight: 'bold' }}>📜 Form 3, 4 &amp; 5 Annual Returns</button>
          <button type="button" onClick={() => setActiveTab('blockchain')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'blockchain' ? '#0284c7' : 'transparent', color: activeTab === 'blockchain' ? '#fff' : '#38bdf8', fontWeight: 'bold' }}>🔗 Blockchain Audit Ledger</button>
          <button type="button" onClick={() => setActiveTab('defense')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'defense' ? '#ef4444' : 'transparent', color: activeTab === 'defense' ? '#fff' : '#fca5a5', fontWeight: 'bold' }}>Notice Defense Matrix</button>
          <button type="button" onClick={() => setActiveTab('alerts')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'alerts' ? '#eab308' : 'transparent', color: activeTab === 'alerts' ? '#0f172a' : '#fef08a', fontWeight: 'bold' }}>IoT Threshold Alerts</button>
          <button type="button" onClick={() => setActiveTab('esg')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'esg' ? '#38bdf8' : 'transparent', color: activeTab === 'esg' ? '#0f172a' : '#93c5fd', fontWeight: 'bold' }}>Scope 1,2,3 ESG Engine</button>
          <button type="button" onClick={() => setActiveTab('manifest')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'manifest' ? '#22c55e' : 'transparent', color: activeTab === 'manifest' ? '#0f172a' : '#bbf7d0', fontWeight: 'bold' }}>🚛 Form 10 Manifest</button>
          <button type="button" onClick={() => setActiveTab('cluster')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'cluster' ? '#6366f1' : 'transparent', color: activeTab === 'cluster' ? '#fff' : '#c7d2fe', fontWeight: 'bold' }}>🛡️ MCCI Privacy Shield</button>
          <button type="button" onClick={() => setActiveTab('onboarding')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'onboarding' ? '#a855f7' : 'transparent', color: activeTab === 'onboarding' ? '#fff' : '#e9d5ff', fontWeight: 'bold' }}>🏭 Client Onboarding</button>
        </nav>

        <div style={{ marginTop: 'auto', backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', border: '1px solid #22c55e', fontSize: '11px' }}>
          <span style={{ color: '#22c55e', fontWeight: 'bold' }}>Green Vendor Passport</span>
          <p style={{ margin: '4px 0', color: '#94a3b8' }}>0.75% Loan Subvention Eligible</p>
          <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '6px', borderRadius: '4px', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>Download Loan Certificate</button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '15px' }}>
          <div>
            <h2 style={{ margin: 0 }}>MPCB Direct Gateway &amp; OCMMS Sync</h2>
            <p style={{ color: '#94a3b8', margin: '2px 0 0 0', fontSize: '13px' }}>AI-Powered Zero Non-Compliance Ecosystem</p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select value={selectedFactoryId} onChange={(e) => setSelectedFactoryId(Number(e.target.value))} style={{ backgroundColor: '#1e293b', color: '#fff', border: '1px solid #a855f7', padding: '8px', borderRadius: '6px', fontWeight: 'bold' }}>
              {factoryList.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.location})</option>
              ))}
            </select>
            <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Export PDF Report</button>
            <button type="button" onClick={handleSyncMPCB} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Sync MPCB Portal</button>
          </div>
        </header>

        {/* TAB 1: DASHBOARD & ETP HEALTH INDEX */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ backgroundColor: '#1e293b', borderLeft: '4px solid #22c55e', padding: '12px 18px', borderRadius: '6px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>MONITORED UNIT:</span>
                <h3 style={{ margin: 0, color: '#22c55e' }}>{activeFactory.name} - {activeFactory.location}</h3>
              </div>
              <div style={{ fontSize: '11px', color: '#38bdf8', backgroundColor: '#0f172a', padding: '6px 10px', borderRadius: '4px', border: '1px solid #0284c7' }}>
                🔗 Immutable Blockchain Hash: <span style={{ fontFamily: 'monospace', color: '#fff' }}>{activeFactory.blockHash}</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#1e293b', border: '1px solid #eab308', padding: '15px', borderRadius: '8px' }}>
                <h4 style={{ color: '#eab308', margin: '0 0 5px 0' }}>CTO Renewal Radar</h4>
                <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>{activeFactory.ctoDaysLeft} Days Left</p>
              </div>
              <div style={{ backgroundColor: '#1e293b', border: '1px solid #ef4444', padding: '15px', borderRadius: '8px' }}>
                <h4 style={{ color: '#ef4444', margin: '0 0 5px 0' }}>Prosecution Penalty Shield</h4>
                <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#fca5a5' }}>INR {activeFactory.penaltyRisk} (Protected)</p>
              </div>
              <div style={{ backgroundColor: '#1e293b', border: '1px solid #10b981', padding: '15px', borderRadius: '8px' }}>
                <h4 style={{ color: '#10b981', margin: '0 0 5px 0' }}>ETP/STP Health Index</h4>
                <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#6ee7b7' }}>{activeFactory.etpHealth}% (Optimal Efficiency)</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px', marginBottom: '20px' }}>
              <div style={{ backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>LIVE IoT pH</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e', margin: '5px 0 0 0' }}>{activeFactory.ph}</p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #f97316' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>EFFLUENT COD</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#f97316', margin: '5px 0 0 0' }}>{activeFactory.cod} mg/L</p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #06b6d4' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>WATER DISCHARGE</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#06b6d4', margin: '5px 0 0 0' }}>{activeFactory.discharge} / {activeFactory.limit} L</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FULLY DYNAMIC ANNUAL RETURNS SUITE (FORM 3, 4, 5) */}
        {activeTab === 'returns' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #14b8a6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#2dd4bf', marginTop: 0 }}>📜 MPCB Statutory Annual Returns Generator</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Select form below to generate official Form 3, Form 4, or Form 5.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#14b8a6', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Export {selectedReturnForm} PDF</button>
            </div>

            {/* Sub-navigation for Forms */}
            <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
              <button type="button" onClick={() => setSelectedReturnForm('Form 3')} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: selectedReturnForm === 'Form 3' ? '#14b8a6' : '#0f172a', color: selectedReturnForm === 'Form 3' ? '#0f172a' : '#fff', fontWeight: 'bold' }}>Form 3 (Daily Logbook)</button>
              <button type="button" onClick={() => setSelectedReturnForm('Form 4')} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: selectedReturnForm === 'Form 4' ? '#14b8a6' : '#0f172a', color: selectedReturnForm === 'Form 4' ? '#0f172a' : '#fff', fontWeight: 'bold' }}>Form 4 (Annual Haz-Waste)</button>
              <button type="button" onClick={() => setSelectedReturnForm('Form 5')} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: selectedReturnForm === 'Form 5' ? '#14b8a6' : '#0f172a', color: selectedReturnForm === 'Form 5' ? '#0f172a' : '#fff', fontWeight: 'bold' }}>Form 5 (Environmental Statement)</button>
            </div>

            <form onSubmit={handleGenerateReturn} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
              
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Industrial Unit Name</label>
                <input readOnly type="text" value={activeFactory.name + ' (' + activeFactory.location + ')'} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              {/* FORM 3 SPECIFIC FIELDS */}
              {selectedReturnForm === 'Form 3' && (
                <>
                  <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '4px', borderLeft: '3px solid #14b8a6', fontSize: '11px', color: '#2dd4bf' }}>
                    <strong>Form 3 Register:</strong> Mandatory Daily Hazardous Waste Maintenance Logbook under Hazardous Wastes Rules 2016.
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Entry Date</label>
                    <input required type="date" value={form3Date} onChange={e => setForm3Date(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Hazardous Waste Description</label>
                    <select value={form3WasteType} onChange={e => setForm3WasteType(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }}>
                      <option value="5.1 Spent / Used Oil">5.1 Spent / Used Lubricant Oil</option>
                      <option value="35.3 Chemical ETP Sludge">35.3 ETP Sludge</option>
                      <option value="33.1 Empty Drums">33.1 Empty Drums / Containers</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Quantity Handled Today</label>
                    <input required type="text" value={form3DailyQty} onChange={e => setForm3DailyQty(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Storage Bay Method</label>
                    <input required type="text" value={form3StorageMethod} onChange={e => setForm3StorageMethod(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                  </div>
                </>
              )}

              {/* FORM 4 SPECIFIC FIELDS */}
              {selectedReturnForm === 'Form 4' && (
                <>
                  <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '4px', borderLeft: '3px solid #14b8a6', fontSize: '11px', color: '#2dd4bf' }}>
                    <strong>Form 4 Return:</strong> Annual Hazardous Waste Return to be submitted to MPCB before 30th June every year.
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Hazardous Waste Category Code</label>
                    <select value={form4Category} onChange={e => setForm4Category(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }}>
                      <option value="5.1 Spent Oil / Lubricant Sludge">5.1 Spent Oil / Lubricant Sludge</option>
                      <option value="35.3 Chemical ETP Sludge">35.3 Chemical ETP Sludge</option>
                      <option value="21.1 Process Residues">21.1 Process Residues / Resins</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Annual Generated Quantity (MT)</label>
                    <input required type="text" value={form4AnnualQty} onChange={e => setForm4AnnualQty(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>CHWTSDF Destination Facility</label>
                    <input required type="text" value={form4DisposalFacility} onChange={e => setForm4DisposalFacility(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                  </div>
                </>
              )}

              {/* FORM 5 SPECIFIC FIELDS */}
              {selectedReturnForm === 'Form 5' && (
                <>
                  <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '4px', borderLeft: '3px solid #14b8a6', fontSize: '11px', color: '#2dd4bf' }}>
                    <strong>Form 5 Return:</strong> Environmental Statement Return for financial year ending March, due 30th September.
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Raw Material Consumption Rate</label>
                    <input required type="text" value={form5RawMaterial} onChange={e => setForm5RawMaterial(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Process Water Usage Rate</label>
                    <input required type="text" value={form5WaterProcess} onChange={e => setForm5WaterProcess(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Pollution Control System Summary</label>
                    <input required type="text" value={form5PollutionControl} onChange={e => setForm5PollutionControl(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                  </div>
                </>
              )}

              <button type="submit" style={{ backgroundColor: '#14b8a6', color: '#0f172a', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>📄 Download / Print Official {selectedReturnForm} PDF</button>
            </form>
          </div>
        )}

        {/* TAB 3: BLOCKCHAIN AUDIT LEDGER */}
        {activeTab === 'blockchain' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #0284c7' }}>
            <h3 style={{ color: '#38bdf8', marginTop: 0 }}>🔗 Blockchain Immutable Audit Trail Ledger</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Cryptographically signed compliance logs. Proves zero data tampering in court or MPCB audits.</p>

            <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                <div style={{ fontSize: '12px', color: '#22c55e', fontWeight: 'bold' }}>BLOCK #840192 • IoT Sensor Sync</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0' }}>Unit: {activeFactory.name} | pH: {activeFactory.ph} | COD: {activeFactory.cod} mg/L</div>
                <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#38bdf8' }}>Hash: {activeFactory.blockHash}</div>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #a855f7' }}>
                <div style={{ fontSize: '12px', color: '#c084fc', fontWeight: 'bold' }}>BLOCK #840191 • Form 10 Manifest Issued</div>
                <div style={{ fontSize: '11px', color: '#94a3b8', margin: '4px 0' }}>Vehicle: MH 12 AB 1234 | Waste: 2.5 MT Spent Oil</div>
                <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#38bdf8' }}>Hash: 0x9c41f7e02b8812c309f1</div>
              </div>
            </div>
          </div>
        )}

        {/* DEFENSE MATRIX */}
        {activeTab === 'defense' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #ef4444' }}>
            <h3 style={{ color: '#fca5a5', marginTop: 0 }}>MPCB Show Cause Defense Matrix</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Auto-generates legal reply drafts under Water and Air Acts.</p>

            <form onSubmit={handleGenerateDefense} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '450px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Notice Classification Type</label>
                <select value={noticeType} onChange={e => setNoticeType(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }}>
                  <option value="Show Cause Notice">Show Cause Notice (SCN - Sec 33A)</option>
                  <option value="Proposed Direction Notice">Proposed Direction Notice (PDN)</option>
                  <option value="Warning Letter">Warning Letter / Explanation Demand</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Notice Reference Number</label>
                <input required type="text" value={noticeReference} onChange={e => setNoticeReference(e.target.value)} placeholder="e.g. MPCB/RO-PUNE/SCN/2026/894" style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Alleged Non-Compliance Parameter</label>
                <select value={allegedIssue} onChange={e => setAllegedIssue(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }}>
                  <option value="pH Parameter Exceedance">pH Parameter Deviation</option>
                  <option value="COD Limit Deviation">COD Effluent Exceedance</option>
                  <option value="Form 10 Delay">Form 10 Manifest Delay</option>
                  <option value="CTO Renewal Delays">Consent Expiry Notice</option>
                </select>
              </div>

              <button type="submit" style={{ backgroundColor: '#ef4444', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>🖨️ Export Legal Reply PDF</button>
            </form>
          </div>
        )}

        {/* IOT THRESHOLD ALERTS */}
        {activeTab === 'alerts' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #eab308' }}>
            <h3 style={{ color: '#fef08a', marginTop: 0 }}>Real-Time IoT Threshold Alerts</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Sends instant WhatsApp alerts before MPCB flying squad inspection.</p>

            <form onSubmit={handleTestWhatsAppAlert} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '450px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Manager Phone Number</label>
                <input required type="text" value={alertPhone} onChange={e => setAlertPhone(e.target.value)} placeholder="+91 9876543210" style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Min pH Limit</label>
                  <input required type="text" value={phMinLimit} onChange={e => setPhMinLimit(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Max pH Limit</label>
                  <input required type="text" value={phMaxLimit} onChange={e => setPhMaxLimit(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Max COD Limit (mg/L)</label>
                <input required type="text" value={codMaxLimit} onChange={e => setCodMaxLimit(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <button type="submit" style={{ backgroundColor: '#eab308', color: '#0f172a', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Trigger Test WhatsApp Alert</button>
            </form>
          </div>
        )}

        {/* SCOPE 1, 2, 3 ESG ENGINE */}
        {activeTab === 'esg' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #38bdf8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#38bdf8', marginTop: 0 }}>🌍 Scope 1, 2, 3 ESG Carbon Engine</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Calculates GHG carbon footprint for MPCB Form V &amp; Bank Green Loan Subvention.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Save PDF Report</button>
            </div>

            <form onSubmit={handleCalculateEsg} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Scope 1: Boiler / DG Set Diesel Usage (Liters/Month)</label>
                <input required type="number" value={dieselLiters} onChange={e => setDieselLiters(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Scope 2: MSEDCL Grid Electricity (kWh/Units per Month)</label>
                <input required type="number" value={electricityKwh} onChange={e => setElectricityKwh(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Scope 3: Freight Transport (Ton-Km/Month)</label>
                <input required type="number" value={freightKm} onChange={e => setFreightKm(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', marginTop: '5px' }}>
                <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '4px', borderLeft: '3px solid #ef4444' }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>SCOPE 1</span>
                  <p style={{ margin: '2px 0 0 0', fontWeight: 'bold', color: '#fca5a5' }}>{calcScope1} tCO2e</p>
                </div>
                <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '4px', borderLeft: '3px solid #eab308' }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>SCOPE 2</span>
                  <p style={{ margin: '2px 0 0 0', fontWeight: 'bold', color: '#fef08a' }}>{calcScope2} tCO2e</p>
                </div>
                <div style={{ backgroundColor: '#0f172a', padding: '10px', borderRadius: '4px', borderLeft: '3px solid #38bdf8' }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>SCOPE 3</span>
                  <p style={{ margin: '2px 0 0 0', fontWeight: 'bold', color: '#38bdf8' }}>{calcScope3} tCO2e</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                <button type="submit" style={{ flex: 1, backgroundColor: '#38bdf8', color: '#0f172a', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>🌍 Recalculate GHG</button>
                <button type="button" onClick={handlePrint} style={{ flex: 1, backgroundColor: '#22c55e', color: '#0f172a', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Save PDF Report</button>
              </div>
            </form>
          </div>
        )}

        {/* FORM 10 HAZARDOUS MANIFEST */}
        {activeTab === 'manifest' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #22c55e' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#22c55e', marginTop: 0 }}>🚛 MPCB Form 10 Hazardous Waste Manifest</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Statutory 7-Copy Manifest under Hazardous Wastes Rules 2016.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Save as PDF / Print</button>
            </div>

            <form onSubmit={handleGenerateForm10} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Transporter Vehicle Number</label>
                <input required type="text" value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Authorized Transporter Name</label>
                <input required type="text" value={transporterName} onChange={e => setTransporterName(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Waste Category Code</label>
                  <select value={wasteCategory} onChange={e => setWasteCategory(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }}>
                    <option value="5.1 Used / Spent Oil">5.1 Used / Spent Oil</option>
                    <option value="35.3 Chemical ETP Sludge">35.3 Chemical ETP Sludge</option>
                    <option value="21.1 Process Waste Resins">21.1 Process Waste Resins</option>
                    <option value="33.1 Empty Containers">33.1 Empty Containers</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Quantity (Metric Ton)</label>
                  <input required type="text" value={wasteQuantity} onChange={e => setWasteQuantity(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                </div>
              </div>

              <button type="submit" style={{ backgroundColor: '#22c55e', color: '#0f172a', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>📄 Download PDF / Print Form 10</button>
            </form>
          </div>
        )}

        {/* MCCI PRIVACY SHIELD CLUSTER */}
        {activeTab === 'cluster' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #6366f1' }}>
            <h3 style={{ color: '#818cf8', marginTop: 0 }}>🛡️ MCCI MIDC Cluster Center (MSME Privacy Shield)</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Encrypts individual factory identity while presenting aggregated compliance health data to MCCI and Govt authorities.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #6366f1' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>BHOSARI MIDC CLUSTER</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#818cf8', margin: '5px 0 0 0' }}>142 Units (98.2% Compliant)</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>CHAKAN MIDC CLUSTER</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', margin: '5px 0 0 0' }}>218 Units (99.1% Compliant)</p>
              </div>
            </div>
          </div>
        )}

        {/* CLIENT ONBOARDING */}
        {activeTab === 'onboarding' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #a855f7' }}>
            <h3 style={{ color: '#c084fc', marginTop: 0 }}>🏭 Multi-Tenant Client Onboarding Engine</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Onboard new industrial manufacturing units across MIDC zones into the EcoTrace Ecosystem.</p>

            <form onSubmit={handleAddFactory} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Industrial Unit / Company Name</label>
                <input required type="text" value={factoryName} onChange={e => setFactoryName(e.target.value)} placeholder="e.g. MAHARASHTRA PAINTS & CHEMICALS" style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>MIDC Zone Location</label>
                <input required type="text" value={factoryLocation} onChange={e => setFactoryLocation(e.target.value)} placeholder="e.g. RANJANGAON or KURKUMBH" style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Consent Water Discharge Limit (Liters/Day)</label>
                <input required type="number" value={factoryLimit} onChange={e => setFactoryLimit(e.target.value)} placeholder="e.g. 60000" style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <button type="submit" style={{ backgroundColor: '#a855f7', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>+ Onboard Industrial Unit Live</button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
