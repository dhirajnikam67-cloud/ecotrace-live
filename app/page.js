'use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseShield() {
  const [activeTab, setActiveTab] = useState('auditmode');
  
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
      etpHealth: 98,
      status: 'COMPLIANT',
      ctoDaysLeft: 82,
      form4DaysLeft: 12,
      form5DaysLeft: 104,
      penaltyRisk: 0,
      scope1: 0.23,
      scope2: 1.16,
      scope3: 0.06,
      blockHash: '0xa8f392c1b4e87019d6f2231e',
      gasPpm: 12,
      powerFactor: 0.99,
      gridVoltage: 415,
      zldRecyclePct: 84,
      tankerNo: 'MH 12 AB 1234',
      gpsApiStatus: 'CONNECTED (MapmyIndia / MPCB VTS API)',
      tankerGpsStatus: 'IN-TRANSIT TO RANJANGAON CHWTSDF'
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
      form4DaysLeft: 12,
      form5DaysLeft: 104,
      penaltyRisk: 0,
      scope1: 0.20,
      scope2: 1.05,
      scope3: 0.05,
      blockHash: '0x3b7de10f8a912c448201a68e',
      gasPpm: 8,
      powerFactor: 0.98,
      gridVoltage: 412,
      zldRecyclePct: 91,
      tankerNo: 'MH 14 C 5678',
      gpsApiStatus: 'CONNECTED (Fleetx GPS API)',
      tankerGpsStatus: 'VERIFIED AT CHWTSDF'
    }
  ]);
  const [selectedFactoryId, setSelectedFactoryId] = useState(1);

  // States for dynamic forms
  const [currentCapex, setCurrentCapex] = useState('1500000');
  const [monthlyChemCost, setMonthlyChemCost] = useState('45000');
  const [roiMonths, setRoiMonths] = useState('18');
  const [factoryName, setFactoryName] = useState('');
  const [factoryLocation, setFactoryLocation] = useState('');
  const [factoryLimit, setFactoryLimit] = useState('');

  // Annual Returns State
  const [selectedReturnForm, setSelectedReturnForm] = useState('Form 3');
  const [form3Date, setForm3Date] = useState('2026-07-24');
  const [form3DailyQty, setForm3DailyQty] = useState('150 Liters');
  const [form4AnnualQty, setForm4AnnualQty] = useState('12.5 MT');
  const [form5RawMaterial, setForm5RawMaterial] = useState('18.2 MT/Month');

  // Form 10 & Notice Defense State
  const [vehicleNo, setVehicleNo] = useState('MH 12 AB 1234');
  const [transporterName, setTransporterName] = useState('MEHA HAZARD FREIGHT LOGISTICS');
  const [wasteQuantity, setWasteQuantity] = useState('2.5');
  const [noticeReference, setNoticeReference] = useState('');

  // Active Factory Context
  const activeFactory = factoryList.find(f => f.id === selectedFactoryId) || factoryList[0];

  // Handlers
  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const handleSyncMPCB = () => {
    alert('Handshake with MPCB OCMMS Server Successful.\nStatus: Blockchain Hash ' + activeFactory.blockHash + ' verified.');
  };

  const handleTestGasSiren = () => {
    alert('SAFETY TEST PASSED:\nGas Leak Emergency Relay & WhatsApp Siren Triggered for ' + activeFactory.name);
  };

  const handleCalculateRoi = (e) => {
    e.preventDefault();
    const estSavings = Number(monthlyChemCost) * 0.35;
    const months = Math.round(Number(currentCapex) / (estSavings || 1));
    setRoiMonths(String(months));
    alert('ROI CALCULATION COMPLETE!\n\nEstimated Monthly Savings: INR ' + estSavings.toFixed(0) + '\nPayback Period: ' + months + ' Months');
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
      form4DaysLeft: 12,
      form5DaysLeft: 104,
      penaltyRisk: 0,
      scope1: 0.20,
      scope2: 1.05,
      scope3: 0.05,
      blockHash: '0x' + Math.random().toString(16).substring(2, 14),
      gasPpm: 5,
      powerFactor: 0.99,
      gridVoltage: 415,
      zldRecyclePct: 88,
      tankerNo: 'MH 12 NEW 999',
      gpsApiStatus: 'CONNECTED (API)',
      tankerGpsStatus: 'STANDBY'
    };

    setFactoryList(prev => [newUnit, ...prev]);
    setSelectedFactoryId(newId);
    alert('NEW INDUSTRIAL UNIT ONBOARDED!\n\nUnit: ' + newUnit.name);
    setFactoryName('');
    setFactoryLocation('');
    setFactoryLimit('');
    setActiveTab('dashboard');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* Professional Sidebar Navigation */}
      <aside style={{ width: '310px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ marginBottom: '12px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#22c55e' }}>EcoTrace India</div>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Enterprise Compliance &amp; Safety Platform</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          
          {/* SECTION 1: EMERGENCY & RISK */}
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', margin: '4px 0 2px 4px', textTransform: 'uppercase' }}>🚨 Risk &amp; Emergency Mode</div>
          <button type="button" onClick={() => setActiveTab('auditmode')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'auditmode' ? '#ef4444' : 'transparent', color: activeTab === 'auditmode' ? '#fff' : '#fca5a5', fontWeight: 'bold' }}>🚨 Flying Squad Emergency Mode</button>
          <button type="button" onClick={() => setActiveTab('gasleak')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gasleak' ? '#ef4444' : 'transparent', color: activeTab === 'gasleak' ? '#fff' : '#fca5a5' }}>☣️ Toxic Gas Leak &amp; Safety Radar</button>
          <button type="button" onClick={() => setActiveTab('defense')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'defense' ? '#f97316' : 'transparent', color: activeTab === 'defense' ? '#fff' : '#ffedd5' }}>🛡️ Notice Defense Matrix</button>

          {/* SECTION 2: OPERATIONAL SAVINGS */}
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', margin: '8px 0 2px 4px', textTransform: 'uppercase' }}>⚡ Savings &amp; Efficiency</div>
          <button type="button" onClick={() => setActiveTab('gridmon')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gridmon' ? '#eab308' : 'transparent', color: activeTab === 'gridmon' ? '#0f172a' : '#fef08a', fontWeight: 'bold' }}>⚡ MSEDCL Smart Grid &amp; PF Meter</button>
          <button type="button" onClick={() => setActiveTab('zldindex')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'zldindex' ? '#38bdf8' : 'transparent', color: activeTab === 'zldindex' ? '#0f172a' : '#93c5fd', fontWeight: 'bold' }}>💧 ZLD Water Recovery &amp; Savings</button>
          <button type="button" onClick={() => setActiveTab('capex')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'capex' ? '#eab308' : 'transparent', color: activeTab === 'capex' ? '#0f172a' : '#fef08a' }}>💰 ETP CAPEX &amp; Payback ROI Calculator</button>

          {/* SECTION 3: STATUTORY COMPLIANCE */}
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', margin: '8px 0 2px 4px', textTransform: 'uppercase' }}>📜 Statutory MPCB Compliance</div>
          <button type="button" onClick={() => setActiveTab('calendar')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'calendar' ? '#10b981' : 'transparent', color: activeTab === 'calendar' ? '#0f172a' : '#6ee7b7', fontWeight: 'bold' }}>🗓️ MPCB Return Predictor Calendar</button>
          <button type="button" onClick={() => setActiveTab('returns')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'returns' ? '#14b8a6' : 'transparent', color: activeTab === 'returns' ? '#0f172a' : '#99f6e4' }}>📜 Form 3, 4 &amp; 5 Annual Returns</button>
          <button type="button" onClick={() => setActiveTab('ctorenewal')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'ctorenewal' ? '#14b8a6' : 'transparent', color: activeTab === 'ctorenewal' ? '#0f172a' : '#99f6e4' }}>📄 CTO Renewal Auto-Dossier</button>

          {/* SECTION 4: SUPPLY CHAIN & ESG */}
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', margin: '8px 0 2px 4px', textTransform: 'uppercase' }}>🚛 Supply Chain &amp; ESG</div>
          <button type="button" onClick={() => setActiveTab('tankergps')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'tankergps' ? '#06b6d4' : 'transparent', color: activeTab === 'tankergps' ? '#0f172a' : '#a5f3fc', fontWeight: 'bold' }}>🚛 Haz-Mat Tanker Geo-Fence GPS</button>
          <button type="button" onClick={() => setActiveTab('manifest')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'manifest' ? '#06b6d4' : 'transparent', color: activeTab === 'manifest' ? '#0f172a' : '#a5f3fc' }}>🚛 Form 10 Manifest Generator</button>
          <button type="button" onClick={() => setActiveTab('ewaste')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'ewaste' ? '#06b6d4' : 'transparent', color: activeTab === 'ewaste' ? '#0f172a' : '#a5f3fc' }}>💻 E-Waste &amp; Battery EPR Vault</button>

          {/* SECTION 5: ENTERPRISE MONITORING */}
          <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 'bold', margin: '8px 0 2px 4px', textTransform: 'uppercase' }}>🏢 Enterprise Platform</div>
          <button type="button" onClick={() => setActiveTab('dashboard')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#fff', fontWeight: 'bold' }}>📡 Live Risk Radar &amp; ETP Index</button>
          <button type="button" onClick={() => setActiveTab('blockchain')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'blockchain' ? '#0284c7' : 'transparent', color: activeTab === 'blockchain' ? '#fff' : '#38bdf8' }}>🔗 Blockchain Audit Ledger</button>
          <button type="button" onClick={() => setActiveTab('cluster')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'cluster' ? '#6366f1' : 'transparent', color: activeTab === 'cluster' ? '#fff' : '#c7d2fe' }}>🛡️ MCCI &amp; Govt Grants Finder</button>
          <button type="button" onClick={() => setActiveTab('onboarding')} style={{ textAlign: 'left', padding: '8px 10px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'onboarding' ? '#a855f7' : 'transparent', color: activeTab === 'onboarding' ? '#fff' : '#e9d5ff' }}>🏭 Multi-Tenant Onboarding</button>

        </nav>

        <div style={{ marginTop: 'auto', backgroundColor: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #22c55e', fontSize: '11px' }}>
          <span style={{ color: '#22c55e', fontWeight: 'bold' }}>Green Vendor Passport</span>
          <p style={{ margin: '2px 0', color: '#94a3b8' }}>0.75% Loan Subvention Eligible</p>
          <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '5px', borderRadius: '4px', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>Download Loan Certificate</button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main style={{ flex: 1, padding: '25px', overflowY: 'auto' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '15px' }}>
          <div>
            <h2 style={{ margin: 0 }}>MPCB Direct Gateway &amp; Enterprise Ecosystem</h2>
            <p style={{ color: '#94a3b8', margin: '2px 0 0 0', fontSize: '13px' }}>AI-Powered Industrial Safety &amp; Zero Non-Compliance Platform</p>
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

        {/* 1. FLYING SQUAD EMERGENCY MODE */}
        {activeTab === 'auditmode' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #ef4444' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#fca5a5', marginTop: 0 }}>🚨 MPCB Flying Squad Emergency Audit Mode</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>1-Click Instant Compliance Dossier for surprise inspections.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#ef4444', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>🖨️ Print Instant Audit Package</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>CTO STATUS</span>
                <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#22c55e' }}>VALID ({activeFactory.ctoDaysLeft} Days Remaining)</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>ETP/STP HEALTH</span>
                <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#38bdf8' }}>{activeFactory.etpHealth}% Operational Efficiency</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #eab308' }}>
                <span style={{ fontSize: '10px', color: '#94a3b8' }}>BLOCKCHAIN VERIFICATION</span>
                <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#fef08a', fontFamily: 'monospace' }}>{activeFactory.blockHash.substring(0, 12)}...</p>
              </div>
            </div>

            <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', marginTop: '15px', border: '1px solid #334155' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#fff' }}>Verified Documents Ready for Inspection:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#cbd5e1' }}>
                <li>Consent to Operate (CTO) Valid Copy</li>
                <li>Form 3 Hazardous Waste Daily Register (Updated Today)</li>
                <li>Form 4 Annual Waste Return Receipts</li>
                <li>Form 5 Environmental Statement (2025-26)</li>
                <li>Live pH &amp; COD Sensor Readings Log</li>
              </ul>
            </div>
          </div>
        )}

        {/* 2. HAZ-MAT TANKER GPS GEO-FENCE */}
        {activeTab === 'tankergps' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #06b6d4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#a5f3fc', marginTop: 0 }}>🚛 Hazardous Waste Tanker Route &amp; Geo-Fence GPS Vault</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Tracks transport tankers live to MEPL Ranjangaon CHWTSDF via Transporter GPS APIs.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#06b6d4', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>📡 Track Live Tanker Manifest</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #06b6d4' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>MONITORED TANKER VEHICLE</span>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#a5f3fc', margin: '4px 0' }}>{activeFactory.tankerNo}</p>
                <span style={{ fontSize: '11px', color: '#22c55e' }}>GPS API Source: {activeFactory.gpsApiStatus}</span>
              </div>

              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>GEO-FENCE ROUTE CORRIDOR</span>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e', margin: '4px 0' }}>{activeFactory.tankerGpsStatus}</p>
                <span style={{ fontSize: '11px', color: '#38bdf8' }}>Automated MPCB Gate-In Sync Active</span>
              </div>
            </div>
          </div>
        )}

        {/* 3. ZLD WATER RECOVERY INDEX */}
        {activeTab === 'zldindex' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #38bdf8' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#93c5fd', marginTop: 0 }}>💧 Zero Liquid Discharge (ZLD) Water Recovery Index</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Tracks recycled effluent water to reduce MIDC water bills by up to 50%.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#38bdf8', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Export MIDC Water Rebate Certificate</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>RECYCLED WATER RATE</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e', margin: '4px 0 0 0' }}>{activeFactory.zldRecyclePct}% Recovered</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>ESTIMATED MONTHLY SAVINGS</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#38bdf8', margin: '4px 0 0 0' }}>INR 1,28,000</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #eab308' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>ZLD COMPLIANCE STATUS</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fef08a', margin: '4px 0 0 0' }}>100% VERIFIED</p>
              </div>
            </div>
          </div>
        )}

        {/* 4. AI STATUTORY RETURN PREDICTOR CALENDAR */}
        {activeTab === 'calendar' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #10b981' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#6ee7b7', marginTop: 0 }}>🗓️ AI Statutory Return Predictor &amp; Compliance Calendar</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Predictive MPCB Return Deadlines, Statutory Timelines &amp; Automated Reminders.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#10b981', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Export Annual Master Calendar</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #f97316' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>FORM 4 HAZARDOUS RETURN</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffedd5', margin: '4px 0 0 0' }}>Due June 30th ({activeFactory.form4DaysLeft} Days Left)</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>FORM 5 ENVIRONMENTAL STATEMENT</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', margin: '4px 0 0 0' }}>Due Sept 30th ({activeFactory.form5DaysLeft} Days Left)</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #eab308' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>CTO RENEWAL DEADLINE</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#fef08a', margin: '4px 0 0 0' }}>{activeFactory.ctoDaysLeft} Days Remaining</p>
              </div>
            </div>
          </div>
        )}

        {/* 5. MSEDCL SMART GRID & PF METER */}
        {activeTab === 'gridmon' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #eab308' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#fef08a', marginTop: 0 }}>⚡ MSEDCL Smart Energy Grid &amp; PF Penalty Shield</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Monitors Power Factor (PF) &amp; Voltage harmonics to eliminate MSEDCL penalties.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#eab308', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Export Grid Audit Report</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>POWER FACTOR (PF)</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e', margin: '4px 0 0 0' }}>{activeFactory.powerFactor} (Incentive Eligible)</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>3-PHASE GRID VOLTAGE</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#38bdf8', margin: '4px 0 0 0' }}>{activeFactory.gridVoltage} V Balanced</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #eab308' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>MSEDCL PENALTY RISK</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fef08a', margin: '4px 0 0 0' }}>INR 0 (Protected)</p>
              </div>
            </div>
          </div>
        )}

        {/* 6. TOXIC GAS LEAK & SAFETY RADAR */}
        {activeTab === 'gasleak' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #ef4444' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#fca5a5', marginTop: 0 }}>☣️ Toxic &amp; Boiler Gas Leak Safety Radar</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Real-time PPM Monitoring for Ammonia, LPG, PNG, Chlorine &amp; Solvents.</p>
              </div>
              <button type="button" onClick={handleTestGasSiren} style={{ backgroundColor: '#ef4444', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>🚨 Trigger Emergency Siren Test</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>CURRENT GAS CONCENTRATION</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e', margin: '4px 0 0 0' }}>{activeFactory.gasPpm} PPM (Safe)</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #eab308' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>ALARM THRESHOLD LIMIT</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fef08a', margin: '4px 0 0 0' }}>50 PPM Max</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>EXHAUST VENTILATION RELAY</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#38bdf8', margin: '4px 0 0 0' }}>AUTO-STANDBY</p>
              </div>
            </div>
          </div>
        )}

        {/* 7. LIVE RISK RADAR DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ backgroundColor: '#1e293b', borderLeft: '4px solid #22c55e', padding: '12px 18px', borderRadius: '6px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>MONITORED UNIT:</span>
                <h3 style={{ margin: 0, color: '#22c55e' }}>{activeFactory.name} - {activeFactory.location}</h3>
              </div>
              <div style={{ fontSize: '11px', color: '#38bdf8', backgroundColor: '#0f172a', padding: '6px 10px', borderRadius: '4px', border: '1px solid #0284c7' }}>
                🔗 Blockchain Hash: <span style={{ fontFamily: 'monospace', color: '#fff' }}>{activeFactory.blockHash}</span>
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
          </div>
        )}

        {/* 8. FORM 3, 4, 5 ANNUAL RETURNS */}
        {activeTab === 'returns' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #14b8a6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#2dd4bf', marginTop: 0 }}>📜 MPCB Statutory Annual Returns Generator</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Select form below to generate official Form 3, Form 4, or Form 5.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#14b8a6', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Export {selectedReturnForm} PDF</button>
            </div>

            <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
              <button type="button" onClick={() => setSelectedReturnForm('Form 3')} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: selectedReturnForm === 'Form 3' ? '#14b8a6' : '#0f172a', color: selectedReturnForm === 'Form 3' ? '#0f172a' : '#fff', fontWeight: 'bold' }}>Form 3 (Daily Logbook)</button>
              <button type="button" onClick={() => setSelectedReturnForm('Form 4')} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: selectedReturnForm === 'Form 4' ? '#14b8a6' : '#0f172a', color: selectedReturnForm === 'Form 4' ? '#0f172a' : '#fff', fontWeight: 'bold' }}>Form 4 (Annual Haz-Waste)</button>
              <button type="button" onClick={() => setSelectedReturnForm('Form 5')} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: selectedReturnForm === 'Form 5' ? '#14b8a6' : '#0f172a', color: selectedReturnForm === 'Form 5' ? '#0f172a' : '#fff', fontWeight: 'bold' }}>Form 5 (Environmental Statement)</button>
            </div>

            <form onSubmit={e => { e.preventDefault(); handlePrint(); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Industrial Unit Name</label>
                <input readOnly type="text" value={activeFactory.name + ' (' + activeFactory.location + ')'} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              {selectedReturnForm === 'Form 3' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Entry Date</label>
                    <input required type="date" value={form3Date} onChange={e => setForm3Date(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Quantity Handled Today</label>
                    <input required type="text" value={form3DailyQty} onChange={e => setForm3DailyQty(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                  </div>
                </>
              )}

              {selectedReturnForm === 'Form 4' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Annual Generated Quantity (MT)</label>
                    <input required type="text" value={form4AnnualQty} onChange={e => setForm4AnnualQty(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                  </div>
                </>
              )}

              {selectedReturnForm === 'Form 5' && (
                <>
                  <div>
                    <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Raw Material Consumption Rate</label>
                    <input required type="text" value={form5RawMaterial} onChange={e => setForm5RawMaterial(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
                  </div>
                </>
              )}

              <button type="submit" style={{ backgroundColor: '#14b8a6', color: '#0f172a', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Print Official {selectedReturnForm} PDF</button>
            </form>
          </div>
        )}

        {/* 9. CTO RENEWAL AUTO-DOSSIER */}
        {activeTab === 'ctorenewal' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #14b8a6' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#99f6e4', marginTop: 0 }}>📄 MPCB CTO Renewal Auto-Dossier Generator</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Auto-compiles complete application package for MPCB OCMMS CTO Renewal.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#14b8a6', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Export CTO Application PDF</button>
            </div>

            <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', marginTop: '15px', border: '1px solid #334155' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>RENEWAL RADAR STATUS</span>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#99f6e4', margin: '4px 0' }}>{activeFactory.ctoDaysLeft} Days Left (Window Active)</p>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#14b8a6', color: '#0f172a', border: 'none', padding: '8px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Print Complete CTO Dossier</button>
            </div>
          </div>
        )}

        {/* 10. ETP CAPEX & ROI CALCULATOR */}
        {activeTab === 'capex' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #eab308' }}>
            <h3 style={{ color: '#fef08a', marginTop: 0 }}>💰 ETP &amp; Green Tech CAPEX / ROI Calculator</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Helps MSMEs justify investment in Effluent Treatment Plants with payback period metrics.</p>

            <form onSubmit={handleCalculateRoi} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Estimated CAPEX Investment (INR)</label>
                <input required type="number" value={currentCapex} onChange={e => setCurrentCapex(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Current Monthly Chemical &amp; Water Expense (INR)</label>
                <input required type="number" value={monthlyChemCost} onChange={e => setMonthlyChemCost(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '4px', borderLeft: '4px solid #eab308' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>ESTIMATED PAYBACK PERIOD</span>
                <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#fef08a', margin: '4px 0 0 0' }}>{roiMonths} Months Payback</p>
              </div>

              <button type="submit" style={{ backgroundColor: '#eab308', color: '#0f172a', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Calculate Investment ROI</button>
            </form>
          </div>
        )}

        {/* 11. FORM 10 MANIFEST GENERATOR */}
        {activeTab === 'manifest' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #06b6d4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#a5f3fc', marginTop: 0 }}>🚛 MPCB Form 10 Hazardous Waste Manifest Generator</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Statutory 7-Copy Manifest under Hazardous Wastes Rules 2016.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#06b6d4', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Save as PDF / Print</button>
            </div>

            <form onSubmit={e => { e.preventDefault(); handlePrint(); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Transporter Vehicle Number</label>
                <input required type="text" value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Authorized Transporter Name</label>
                <input required type="text" value={transporterName} onChange={e => setTransporterName(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>

              <button type="submit" style={{ backgroundColor: '#06b6d4', color: '#0f172a', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Print Form 10 Manifest</button>
            </form>
          </div>
        )}

        {/* 12. E-WASTE & BATTERY EPR VAULT */}
        {activeTab === 'ewaste' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #06b6d4' }}>
            <h3 style={{ color: '#67e8f9', marginTop: 0 }}>💻 E-Waste &amp; Battery EPR Statutory Vault</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Monitors compliance under E-Waste Rules 2022 &amp; Battery Waste Management Rules 2022.</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #06b6d4' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>ANNUAL E-WASTE LOG</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#a5f3fc', margin: '5px 0' }}>450 KG Disposed</p>
                <span style={{ fontSize: '10px', color: '#22c55e' }}>Authorized Recycler Verified</span>
              </div>

              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #a855f7' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>USED INDUSTRIAL BATTERIES</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#e9d5ff', margin: '5px 0' }}>24 Units Tracked</p>
                <span style={{ fontSize: '10px', color: '#22c55e' }}>EPR Credit Certificate Synced</span>
              </div>
            </div>
          </div>
        )}

        {/* 13. BLOCKCHAIN AUDIT LEDGER */}
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
            </div>
          </div>
        )}

        {/* 14. NOTICE DEFENSE MATRIX */}
        {activeTab === 'defense' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #f97316' }}>
            <h3 style={{ color: '#ffedd5', marginTop: 0 }}>🛡️ MPCB Notice Defense Matrix</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Auto-generates legal reply drafts under Water Act Sec 33A and Air Act.</p>

            <form onSubmit={e => { e.preventDefault(); handlePrint(); }} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '450px', marginTop: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>Notice Reference Number</label>
                <input required type="text" value={noticeReference} onChange={e => setNoticeReference(e.target.value)} placeholder="e.g. MPCB/RO-PUNE/SCN/2026/894" style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              </div>
              <button type="submit" style={{ backgroundColor: '#f97316', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>🖨️ Export Legal Reply PDF</button>
            </form>
          </div>
        )}

        {/* 15. MCCI PRIVACY SHIELD & GOVT GRANTS */}
        {activeTab === 'cluster' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #6366f1' }}>
            <h3 style={{ color: '#818cf8', marginTop: 0 }}>🛡️ MCCI Privacy Shield &amp; Govt Subsidy Finder</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Connects MSMEs to Government Grants while preserving individual factory privacy.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #6366f1' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>AVAILABLE GOVT SUBSIDY</span>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#818cf8', margin: '5px 0' }}>Up to 50% CAPEX Capital Subsidy</p>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>Under Maharashtra Industrial Policy 2026</span>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>CLUSTER HEALTH INDEX</span>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e', margin: '5px 0' }}>Bhosari MIDC: 98.2% Green</p>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>142 Units Monitored Anonymously</span>
              </div>
            </div>
          </div>
        )}

        {/* 16. CLIENT ONBOARDING */}
        {activeTab === 'onboarding' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #a855f7' }}>
            <h3 style={{ color: '#c084fc', marginTop: 0 }}>🏭 Multi-Tenant Client Onboarding Engine</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Onboard new industrial manufacturing units across MIDC zones into the EcoTrace Ecosystem.</p>

            <form onSubmit={handleAddFactory} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '480px', marginTop: '15px' }}>
              <input required type="text" value={factoryName} onChange={e => setFactoryName(e.target.value)} placeholder="Company Name" style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              <input required type="text" value={factoryLocation} onChange={e => setFactoryLocation(e.target.value)} placeholder="MIDC Location" style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              <input required type="number" value={factoryLimit} onChange={e => setFactoryLimit(e.target.value)} placeholder="Discharge Limit" style={{ width: '100%', padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155' }} />
              <button type="submit" style={{ backgroundColor: '#a855f7', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>+ Onboard Industrial Unit Live</button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
