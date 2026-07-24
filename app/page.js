'use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseShield() {
  const [activeTab, setActiveTab] = useState('manifest');
  
  // Dynamic Enterprise Registry
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

  // Dynamic Form 10 Manifest State
  const [vehicleNo, setVehicleNo] = useState('MH 12 AB 1234');
  const [transporterName, setTransporterName] = useState('MEHA HAZARD FREIGHT LOGISTICS');
  const [wasteCategory, setWasteCategory] = useState('5.1 Used / Spent Oil');
  const [wasteQuantity, setWasteQuantity] = useState('2.5');
  const [destinationChwtsdf, setDestinationChwtsdf] = useState('MEPL Ranjangaon CHWTSDF');
  
  // Client Onboarding Form States
  const [factoryName, setFactoryName] = useState('');
  const [factoryLocation, setFactoryLocation] = useState('');
  const [factoryLimit, setFactoryLimit] = useState('');

  // Step 1: Legal Defense Notice State
  const [noticeType, setNoticeType] = useState('Show Cause Notice');
  const [noticeReference, setNoticeReference] = useState('');
  const [allegedIssue, setAllegedIssue] = useState('pH Parameter Exceedance');

  // Step 2: Real-Time IoT Threshold Alert State
  const [alertPhone, setAlertPhone] = useState('+91 9876543210');
  const [phMaxLimit, setPhMaxLimit] = useState('8.5');
  const [phMinLimit, setPhMinLimit] = useState('6.5');
  const [codMaxLimit, setCodMaxLimit] = useState('250');

  // Step 3: ESG GHG Emissions Calculator State
  const [dieselLiters, setDieselLiters] = useState('150');
  const [electricityKwh, setElectricityKwh] = useState('4200');
  const [freightKm, setFreightKm] = useState('850');
  const [calcScope1, setCalcScope1] = useState('0.40');
  const [calcScope2, setCalcScope2] = useState('3.44');
  const [calcScope3, setCalcScope3] = useState('0.18');

  // Monitored Unit Data
  const activeFactory = factoryList.find(f => f.id === selectedFactoryId) || factoryList[0];
  const totalCarbon = (activeFactory.scope1 + activeFactory.scope2 + activeFactory.scope3).toFixed(2);

  // Handlers
  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const handleSyncMPCB = () => {
    alert('Handshake with MPCB OCMMS Server Successful.');
  };

  const handleGenerateForm10 = (e) => {
    e.preventDefault();
    alert('MPCB FORM 10 HAZARDOUS MANIFEST GENERATED!\n\nGenerator: ' + activeFactory.name + '\nVehicle No: ' + vehicleNo + '\nTransporter: ' + transporterName + '\nWaste Cat: ' + wasteCategory + '\nQuantity: ' + wasteQuantity + ' MT\nDestination: ' + destinationChwtsdf + '\n\nStatus: Registered for MPCB Audit Track.');
  };

  const handleGenerateDefense = (e) => {
    e.preventDefault();
    alert('LEGAL DEFENSE DRAFT GENERATED!\nNotice: ' + noticeType + ' (Ref: ' + noticeReference + ')\nUnit: ' + activeFactory.name);
    setNoticeReference('');
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
    
    alert('ESG CARBON CALCULATION COMPLETE!\nScope 1: ' + s1 + ' tCO2e | Scope 2: ' + s2 + ' tCO2e | Scope 3: ' + s3 + ' tCO2e');
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
    alert('Factory ' + newUnit.name + ' Onboarded!');
    setFactoryName('');
    setFactoryLocation('');
    setFactoryLimit('');
    setActiveTab('dashboard');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '270px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ marginBottom: '15px' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e' }}>EcoTrace India</div>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Industry Protection Shield</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <button type="button" onClick={() => setActiveTab('dashboard')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#fff', fontWeight: 'bold' }}>Live Risk Radar</button>
          <button type="button" onClick={() => setActiveTab('defense')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'defense' ? '#ef4444' : 'transparent', color: activeTab === 'defense' ? '#fff' : '#fca5a5', fontWeight: 'bold' }}>Notice Defense Matrix</button>
          <button type="button" onClick={() => setActiveTab('alerts')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'alerts' ? '#eab308' : 'transparent', color: activeTab === 'alerts' ? '#0f172a' : '#fef08a', fontWeight: 'bold' }}>IoT Threshold Alerts</button>
          <button type="button" onClick={() => setActiveTab('esg')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'esg' ? '#38bdf8' : 'transparent', color: activeTab === 'esg' ? '#0f172a' : '#93c5fd', fontWeight: 'bold' }}>Scope 1,2,3 ESG Engine</button>
          <button type="button" onClick={() => setActiveTab('manifest')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'manifest' ? '#22c55e' : 'transparent', color: activeTab === 'manifest' ? '#0f172a' : '#bbf7d0', fontWeight: 'bold' }}>🚛 Form 10 Manifest</button>
          <button type="button" onClick={() => setActiveTab('cluster')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'cluster' ? '#22c55e' : 'transparent', color: activeTab === 'cluster' ? '#fff' : '#94a3b8' }}>MCCI Cluster Center</button>
          <button type="button" onClick={() => setActiveTab('onboarding')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'onboarding' ? '#22c55e' : 'transparent', color: activeTab === 'onboarding' ? '#fff' : '#94a3b8' }}>Client Onboarding</button>
          <button type="button" onClick={() => setActiveTab('vault')} style={{ textAlign: 'left', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'vault' ? '#22c55e' : 'transparent', color: activeTab === 'vault' ? '#fff' : '#94a3b8' }}>MPCB Legal Vault</button>
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
            <h2 style={{ margin: 0 }}>MPCB and Enterprise Compliance Gateway</h2>
            <p style={{ color: '#94a3b8', margin: '2px 0 0 0', fontSize: '13px' }}>AI-Powered Zero Non-Compliance Ecosystem</p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select value={selectedFactoryId} onChange={(e) => setSelectedFactoryId(Number(e.target.value))} style={{ backgroundColor: '#1e293b', color: '#fff', border: '1px solid #38bdf8', padding: '8px', borderRadius: '6px' }}>
              {factoryList.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.location})</option>
              ))}
            </select>
            <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Export Manifest PDF</button>
            <button type="button" onClick={handleSyncMPCB} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Sync MPCB Portal</button>
          </div>
        </header>

        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ backgroundColor: '#1e293b', borderLeft: '4px solid #22c55e', padding: '12px 18px', borderRadius: '6px', marginBottom: '15px' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>MONITORED UNIT:</span>
              <h3 style={{ margin: 0, color: '#22c55e' }}>{activeFactory.name} - {activeFactory.location}</h3>
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
              <div style={{ backgroundColor: '#1e293b', border: '1px solid #38bdf8', padding: '15px', borderRadius: '8px' }}>
                <h4 style={{ color: '#38bdf8', margin: '0 0 5px 0' }}>Total Carbon Footprint</h4>
                <p style={{ fontSize: '20px', fontWeight: 'bold', margin: 0, color: '#38bdf8' }}>{totalCarbon} tCO2e</p>
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

        {/* STEP 1: DEFENSE MATRIX */}
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

              <button type="submit" style={{ backgroundColor: '#ef4444', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Generate Statutory Defense Reply</button>
            </form>
          </div>
        )}

        {/* STEP 2: IOT THRESHOLD ALERT */}
        {activeTab === 'alerts' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #eab308' }}>
            <h3 style={{ color: '#fef08a', marginTop: 0 }}>Real-Time IoT Threshold Alerts</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Sends instant alerts before MPCB detects non-compliance.</p>

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

        {/* STEP 3: SCOPE 1, 2, 3 ESG ENGINE */}
        {activeTab === 'esg' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #38bdf8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#38bdf8', marginTop: 0 }}>🌍 Scope 1, 2, 3 ESG Carbon Engine</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Calculates GHG carbon footprint for MPCB Form V &amp; Bank Green Loan Subvention.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Export ESG PDF Report</button>
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
                <button type="button" onClick={handlePrint} style={{ flex: 1, backgroundColor: '#22c55e', color: '#0f172a', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Export PDF Report</button>
              </div>
            </form>
          </div>
        )}

        {/* STEP 4: FORM 10 HAZARDOUS MANIFEST GENERATOR */}
        {activeTab === 'manifest' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #22c55e' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#22c55e', marginTop: 0 }}>🚛 MPCB Form 10 Hazardous Waste Manifest</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Statutory 7-Copy Manifest under Hazardous Wastes Rules 2016.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>🖨️ Print Form 10 Manifest</button>
            </div>

            <form onSubmit={handleGenerateForm10} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Transporter Vehicle Number</label>
                <input required type="text" value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} placeholder="e.g. MH 12 AB 1234" style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Authorized Transporter Name</label>
                <input required type="text" value={transporterName} onChange={e => setTransporterName(e.target.value)} placeholder="Transporter Name" style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Waste Category Code</label>
                  <select value={wasteCategory} onChange={e => setWasteCategory(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }}>
                    <option value="5.1 Used / Spent Oil">5.1 Used / Spent Oil</option>
                    <option value="35.3 Chemical ETP Sludge">35.3 Chemical ETP Sludge</option>
                    <option value="21.1 Process Waste Resins">21.1 Process Waste Resins</option>
                    <option value="33.1 Empty Chemical Containers">33.1 Empty Containers</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Quantity (Metric Ton)</label>
                  <input required type="text" value={wasteQuantity} onChange={e => setWasteQuantity(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Authorized CHWTSDF Destination Facility</label>
                <select value={destinationChwtsdf} onChange={e => setDestinationChwtsdf(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }}>
                  <option value="MEPL Ranjangaon CHWTSDF">MEPL Ranjangaon CHWTSDF (Pune)</option>
                  <option value="MWML Taloja CHWTSDF">MWML Taloja CHWTSDF (Navi Mumbai)</option>
                  <option value="MEPL Butibori CHWTSDF">MEPL Butibori CHWTSDF (Nagpur)</option>
                </select>
              </div>

              <button type="submit" style={{ backgroundColor: '#22c55e', color: '#0f172a', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px' }}>🚛 Issue Official Form 10 Manifest</button>
            </form>
          </div>
        )}

        {/* TAB CLUSTER */}
        {activeTab === 'cluster' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: '#38bdf8', marginTop: 0 }}>MCCI MIDC Cluster Center</h3>
            <p style={{ color: '#22c55e', fontWeight: 'bold' }}>MSME Privacy Shield Active</p>
          </div>
        )}

        {/* TAB ONBOARDING */}
        {activeTab === 'onboarding' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: '#22c55e', marginTop: 0 }}>Onboard New Industrial Unit</h3>
            <form onSubmit={handleAddFactory} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
              <input required type="text" value={factoryName} onChange={e => setFactoryName(e.target.value)} placeholder="Factory Name" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              <input required type="text" value={factoryLocation} onChange={e => setFactoryLocation(e.target.value)} placeholder="MIDC Zone" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              <input required type="number" value={factoryLimit} onChange={e => setFactoryLimit(e.target.value)} placeholder="Water Discharge Limit" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              <button type="submit" style={{ backgroundColor: '#22c55e', color: '#0f172a', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>+ Onboard Unit</button>
            </form>
          </div>
        )}

        {/* TAB VAULT */}
        {activeTab === 'vault' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: '#38bdf8', marginTop: 0 }}>MPCB Regulations Vault</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Hazardous Rules 2016 - Water Act 1974 - Air Act 1981</p>
          </div>
        )}

      </main>
    </div>
  );
}
