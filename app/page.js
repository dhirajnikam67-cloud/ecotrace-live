'use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseShield() {
  const [activeTab, setActiveTab] = useState('returns');
  
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
      gpsApiStatus: 'CONNECTED (MapmyIndia API)',
      tankerGpsStatus: 'IN-TRANSIT TO RANJANGAON'
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
      gpsApiStatus: 'CONNECTED (Fleetx API)',
      tankerGpsStatus: 'VERIFIED AT CHWTSDF'
    }
  ]);
  const [selectedFactoryId, setSelectedFactoryId] = useState(1);

  // States
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

  // Form 10 & Notice State
  const [vehicleNo, setVehicleNo] = useState('MH 12 AB 1234');
  const [transporterName, setTransporterName] = useState('MEHA HAZARD FREIGHT LOGISTICS');
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
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#090d16', color: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Sleek Minimal A-Z Sidebar */}
      <aside style={{ width: '300px', backgroundColor: '#0f172a', borderRight: '1px solid #1e293b', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        <div style={{ paddingBottom: '10px', borderBottom: '1px solid #1e293b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
            <span style={{ fontSize: '18px', fontWeight: '800', color: '#f8fafc' }}>EcoTrace <span style={{ color: '#22c55e' }}>OS</span></span>
          </div>
          <p style={{ margin: '2px 0 0 17px', fontSize: '10px', color: '#64748b' }}>Global Industrial Compliance Gateway</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
          
          {/* A. COMPLIANCE */}
          <div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#38bdf8', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ backgroundColor: '#0284c7', color: '#fff', padding: '1px 4px', borderRadius: '3px' }}>A</span> STATUTORY COMPLIANCE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '6px', borderLeft: '1px solid #1e293b' }}>
              <button type="button" onClick={() => setActiveTab('returns')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'returns' ? '#1e293b' : 'transparent', color: activeTab === 'returns' ? '#38bdf8' : '#94a3b8', fontSize: '12px' }}>📜 Form 3, 4 &amp; 5 Annual Returns</button>
              <button type="button" onClick={() => setActiveTab('calendar')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'calendar' ? '#1e293b' : 'transparent', color: activeTab === 'calendar' ? '#38bdf8' : '#94a3b8', fontSize: '12px' }}>🗓️ Return Predictor Calendar</button>
              <button type="button" onClick={() => setActiveTab('ctorenewal')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'ctorenewal' ? '#1e293b' : 'transparent', color: activeTab === 'ctorenewal' ? '#38bdf8' : '#94a3b8', fontSize: '12px' }}>📄 CTO Renewal Auto-Dossier</button>
            </div>
          </div>

          {/* B. RISK & SAFETY */}
          <div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#ef4444', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ backgroundColor: '#dc2626', color: '#fff', padding: '1px 4px', borderRadius: '3px' }}>B</span> RISK &amp; SAFETY SHIELD
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '6px', borderLeft: '1px solid #1e293b' }}>
              <button type="button" onClick={() => setActiveTab('auditmode')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'auditmode' ? '#1e293b' : 'transparent', color: activeTab === 'auditmode' ? '#ef4444' : '#94a3b8', fontSize: '12px' }}>🚨 Flying Squad Emergency Mode</button>
              <button type="button" onClick={() => setActiveTab('gasleak')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gasleak' ? '#1e293b' : 'transparent', color: activeTab === 'gasleak' ? '#ef4444' : '#94a3b8', fontSize: '12px' }}>☣️ Toxic Gas Leak Safety Radar</button>
              <button type="button" onClick={() => setActiveTab('defense')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'defense' ? '#1e293b' : 'transparent', color: activeTab === 'defense' ? '#f97316' : '#94a3b8', fontSize: '12px' }}>🛡️ Notice Defense Matrix</button>
            </div>
          </div>

          {/* C. UTILITY & SAVINGS */}
          <div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#eab308', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ backgroundColor: '#ca8a04', color: '#fff', padding: '1px 4px', borderRadius: '3px' }}>C</span> UTILITY &amp; SAVINGS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '6px', borderLeft: '1px solid #1e293b' }}>
              <button type="button" onClick={() => setActiveTab('gridmon')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gridmon' ? '#1e293b' : 'transparent', color: activeTab === 'gridmon' ? '#eab308' : '#94a3b8', fontSize: '12px' }}>⚡ MSEDCL Smart Grid &amp; PF</button>
              <button type="button" onClick={() => setActiveTab('zldindex')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'zldindex' ? '#1e293b' : 'transparent', color: activeTab === 'zldindex' ? '#38bdf8' : '#94a3b8', fontSize: '12px' }}>💧 ZLD Water Recovery Savings</button>
              <button type="button" onClick={() => setActiveTab('capex')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'capex' ? '#1e293b' : 'transparent', color: activeTab === 'capex' ? '#eab308' : '#94a3b8', fontSize: '12px' }}>💰 ETP CAPEX &amp; ROI Calculator</button>
            </div>
          </div>

          {/* D. SUPPLY CHAIN */}
          <div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#06b6d4', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ backgroundColor: '#0891b2', color: '#fff', padding: '1px 4px', borderRadius: '3px' }}>D</span> SUPPLY CHAIN &amp; ESG
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '6px', borderLeft: '1px solid #1e293b' }}>
              <button type="button" onClick={() => setActiveTab('tankergps')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'tankergps' ? '#1e293b' : 'transparent', color: activeTab === 'tankergps' ? '#06b6d4' : '#94a3b8', fontSize: '12px' }}>🚛 Tanker Geo-Fence GPS</button>
              <button type="button" onClick={() => setActiveTab('manifest')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'manifest' ? '#1e293b' : 'transparent', color: activeTab === 'manifest' ? '#06b6d4' : '#94a3b8', fontSize: '12px' }}>🚛 Form 10 Manifest Generator</button>
              <button type="button" onClick={() => setActiveTab('ewaste')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'ewaste' ? '#1e293b' : 'transparent', color: activeTab === 'ewaste' ? '#06b6d4' : '#94a3b8', fontSize: '12px' }}>💻 E-Waste &amp; Battery EPR Vault</button>
            </div>
          </div>

          {/* E. COMMAND HUB */}
          <div>
            <div style={{ fontSize: '9px', fontWeight: '700', color: '#a855f7', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ backgroundColor: '#9333ea', color: '#fff', padding: '1px 4px', borderRadius: '3px' }}>E</span> COMMAND HUB &amp; GRANTS
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', paddingLeft: '6px', borderLeft: '1px solid #1e293b' }}>
              <button type="button" onClick={() => setActiveTab('dashboard')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#1e293b' : 'transparent', color: activeTab === 'dashboard' ? '#22c55e' : '#94a3b8', fontSize: '12px' }}>📡 Live Risk Radar &amp; ETP Meter</button>
              <button type="button" onClick={() => setActiveTab('blockchain')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'blockchain' ? '#1e293b' : 'transparent', color: activeTab === 'blockchain' ? '#38bdf8' : '#94a3b8', fontSize: '12px' }}>🔗 Blockchain Audit Ledger</button>
              <button type="button" onClick={() => setActiveTab('cluster')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'cluster' ? '#1e293b' : 'transparent', color: activeTab === 'cluster' ? '#a855f7' : '#94a3b8', fontSize: '12px' }}>🛡️ MCCI &amp; Govt Grants</button>
              <button type="button" onClick={() => setActiveTab('onboarding')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'onboarding' ? '#1e293b' : 'transparent', color: activeTab === 'onboarding' ? '#a855f7' : '#94a3b8', fontSize: '12px' }}>🏭 Multi-Tenant Onboarding</button>
            </div>
          </div>

        </nav>

        <div style={{ marginTop: 'auto', backgroundColor: '#090d16', padding: '10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
          <div style={{ fontSize: '10px', color: '#22c55e', fontWeight: '700' }}>Green Vendor Passport</div>
          <p style={{ margin: '2px 0 6px 0', color: '#64748b', fontSize: '9px' }}>0.75% Loan Subvention Eligible</p>
          <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#090d16', border: 'none', padding: '5px', borderRadius: '4px', width: '100%', fontWeight: '700', fontSize: '10px', cursor: 'pointer' }}>Download Loan Certificate</button>
        </div>
      </aside>

      {/* Main Workspace */}
      <main style={{ flex: 1, padding: '25px', overflowY: 'auto', backgroundColor: '#090d16' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #1e293b', paddingBottom: '15px' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700' }}>MPCB Direct Gateway &amp; Enterprise Ecosystem</h2>
            <p style={{ color: '#64748b', margin: '2px 0 0 0', fontSize: '11px' }}>AI-Powered Industrial Safety &amp; Operational Efficiency Platform</p>
          </div>
          
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select value={selectedFactoryId} onChange={(e) => setSelectedFactoryId(Number(e.target.value))} style={{ backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', padding: '6px 10px', borderRadius: '6px', fontWeight: '600', fontSize: '11px' }}>
              {factoryList.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.location})</option>
              ))}
            </select>
            <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#090d16', border: 'none', padding: '6px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '11px', cursor: 'pointer' }}>Export PDF</button>
            <button type="button" onClick={handleSyncMPCB} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontWeight: '700', fontSize: '11px', cursor: 'pointer' }}>Sync MPCB</button>
          </div>
        </header>

        {activeTab === 'returns' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #1e293b' }}>
            <h3 style={{ color: '#38bdf8', marginTop: 0 }}>📜 MPCB Statutory Annual Returns Generator</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Generate official Form 3, Form 4, or Form 5 instantly.</p>
            <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
              <button type="button" onClick={() => setSelectedReturnForm('Form 3')} style={{ padding: '8px 12px', backgroundColor: selectedReturnForm === 'Form 3' ? '#0284c7' : '#1e293b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Form 3 (Daily Logbook)</button>
              <button type="button" onClick={() => setSelectedReturnForm('Form 4')} style={{ padding: '8px 12px', backgroundColor: selectedReturnForm === 'Form 4' ? '#0284c7' : '#1e293b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Form 4 (Annual Haz-Waste)</button>
              <button type="button" onClick={() => setSelectedReturnForm('Form 5')} style={{ padding: '8px 12px', backgroundColor: selectedReturnForm === 'Form 5' ? '#0284c7' : '#1e293b', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>Form 5 (Environmental Statement)</button>
            </div>
            <button type="button" onClick={handlePrint} style={{ backgroundColor: '#0284c7', color: '#fff', padding: '8px 15px', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>Print / Save {selectedReturnForm} PDF</button>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #10b981' }}>
            <h3 style={{ color: '#6ee7b7', marginTop: 0 }}>🗓️ AI Statutory Return Predictor &amp; Compliance Calendar</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Predictive MPCB Return Deadlines, Statutory Timelines &amp; Automated Reminders.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#090d16', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #f97316' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>FORM 4 HAZARDOUS RETURN</span>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffedd5', margin: '4px 0 0 0' }}>Due June 30th ({activeFactory.form4DaysLeft} Days Left)</p>
              </div>
              <div style={{ backgroundColor: '#090d16', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>FORM 5 ENVIRONMENTAL STATEMENT</span>
                <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#38bdf8', margin: '4px 0 0 0' }}>Due Sept 30th ({activeFactory.form5DaysLeft} Days Left)</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ctorenewal' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #14b8a6' }}>
            <h3 style={{ color: '#99f6e4', marginTop: 0 }}>📄 MPCB CTO Renewal Auto-Dossier Generator</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Auto-compiles complete application package for MPCB OCMMS CTO Renewal.</p>
            <div style={{ backgroundColor: '#090d16', padding: '15px', borderRadius: '6px', marginTop: '15px', border: '1px solid #1e293b' }}>
              <span style={{ fontSize: '11px', color: '#64748b' }}>RENEWAL RADAR STATUS</span>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#99f6e4', margin: '4px 0' }}>{activeFactory.ctoDaysLeft} Days Left (Window Active)</p>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#14b8a6', color: '#090d16', border: 'none', padding: '8px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Print Complete CTO Dossier</button>
            </div>
          </div>
        )}

        {activeTab === 'auditmode' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #ef4444' }}>
            <h3 style={{ color: '#fca5a5', marginTop: 0 }}>🚨 MPCB Flying Squad Emergency Audit Mode</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>1-Click Instant Compliance Dossier for surprise inspections.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#090d16', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>CTO STATUS</span>
                <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#22c55e' }}>VALID ({activeFactory.ctoDaysLeft} Days)</p>
              </div>
              <div style={{ backgroundColor: '#090d16', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>ETP HEALTH</span>
                <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#38bdf8' }}>{activeFactory.etpHealth}% Optimal</p>
              </div>
              <div style={{ backgroundColor: '#090d16', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #eab308' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>BLOCKCHAIN HASH</span>
                <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#fef08a', fontFamily: 'monospace' }}>{activeFactory.blockHash.substring(0, 10)}...</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gasleak' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #ef4444' }}>
            <h3 style={{ color: '#fca5a5', marginTop: 0 }}>☣️ Toxic &amp; Boiler Gas Leak Safety Radar</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Real-time PPM Monitoring for Ammonia, LPG, PNG, Chlorine &amp; Solvents.</p>
            <div style={{ backgroundColor: '#090d16', padding: '15px', borderRadius: '6px', marginTop: '15px', borderLeft: '4px solid #22c55e' }}>
              <span style={{ fontSize: '11px', color: '#64748b' }}>CURRENT CONCENTRATION</span>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', margin: '4px 0' }}>{activeFactory.gasPpm} PPM (Safe Operating Range)</p>
              <button type="button" onClick={handleTestGasSiren} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '8px 12px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>🚨 Test Emergency Siren</button>
            </div>
          </div>
        )}

        {activeTab === 'defense' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #f97316' }}>
            <h3 style={{ color: '#ffedd5', marginTop: 0 }}>🛡️ MPCB Notice Defense Matrix</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Auto-generates legal reply drafts under Water Act Sec 33A and Air Act.</p>
            <form onSubmit={e => { e.preventDefault(); handlePrint(); }} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginTop: '15px' }}>
              <input required type="text" value={noticeReference} onChange={e => setNoticeReference(e.target.value)} placeholder="Notice Ref No (e.g. MPCB/SCN/2026/894)" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#090d16', color: '#fff', border: '1px solid #1e293b' }} />
              <button type="submit" style={{ backgroundColor: '#f97316', color: '#fff', padding: '8px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Print Legal Reply PDF</button>
            </form>
          </div>
        )}

        {activeTab === 'gridmon' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #eab308' }}>
            <h3 style={{ color: '#fef08a', marginTop: 0 }}>⚡ MSEDCL Smart Energy Grid &amp; PF Penalty Shield</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Monitors Power Factor (PF) &amp; Voltage harmonics to eliminate MSEDCL penalties.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#090d16', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>POWER FACTOR</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', margin: '4px 0' }}>{activeFactory.powerFactor} (Incentive)</p>
              </div>
              <div style={{ backgroundColor: '#090d16', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>GRID VOLTAGE</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', margin: '4px 0' }}>{activeFactory.gridVoltage} V Balanced</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'zldindex' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #38bdf8' }}>
            <h3 style={{ color: '#93c5fd', marginTop: 0 }}>💧 Zero Liquid Discharge (ZLD) Water Recovery Index</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Tracks recycled effluent water to reduce MIDC water bills by up to 50%.</p>
            <div style={{ backgroundColor: '#090d16', padding: '15px', borderRadius: '6px', marginTop: '15px', borderLeft: '4px solid #22c55e' }}>
              <span style={{ fontSize: '11px', color: '#64748b' }}>RECYCLED WATER RATE</span>
              <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#22c55e', margin: '4px 0' }}>{activeFactory.zldRecyclePct}% Recovered (Est. Savings: INR 1,28,000/mo)</p>
            </div>
          </div>
        )}

        {activeTab === 'capex' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #eab308' }}>
            <h3 style={{ color: '#fef08a', marginTop: 0 }}>💰 ETP &amp; Green Tech CAPEX / ROI Calculator</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Helps MSMEs justify investment in Effluent Treatment Plants with payback period metrics.</p>
            <form onSubmit={handleCalculateRoi} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginTop: '15px' }}>
              <input type="number" value={currentCapex} onChange={e => setCurrentCapex(e.target.value)} placeholder="CAPEX Investment (INR)" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#090d16', color: '#fff', border: '1px solid #1e293b' }} />
              <input type="number" value={monthlyChemCost} onChange={e => setMonthlyChemCost(e.target.value)} placeholder="Monthly Chemical Cost (INR)" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#090d16', color: '#fff', border: '1px solid #1e293b' }} />
              <button type="submit" style={{ backgroundColor: '#eab308', color: '#090d16', padding: '8px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Calculate ROI ({roiMonths} Months Payback)</button>
            </form>
          </div>
        )}

        {activeTab === 'tankergps' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #06b6d4' }}>
            <h3 style={{ color: '#a5f3fc', marginTop: 0 }}>🚛 Hazardous Waste Tanker Route &amp; Geo-Fence GPS Vault</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Tracks transport tankers live to MEPL Ranjangaon CHWTSDF via Transporter GPS APIs.</p>
            <div style={{ backgroundColor: '#090d16', padding: '15px', borderRadius: '6px', marginTop: '15px', borderLeft: '4px solid #06b6d4' }}>
              <span style={{ fontSize: '11px', color: '#64748b' }}>ACTIVE TANKER: {activeFactory.tankerNo}</span>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#a5f3fc', margin: '4px 0' }}>{activeFactory.tankerGpsStatus}</p>
              <span style={{ fontSize: '11px', color: '#22c55e' }}>GPS Source: {activeFactory.gpsApiStatus}</span>
            </div>
          </div>
        )}

        {activeTab === 'manifest' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #06b6d4' }}>
            <h3 style={{ color: '#a5f3fc', marginTop: 0 }}>🚛 MPCB Form 10 Hazardous Waste Manifest Generator</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Statutory 7-Copy Manifest under Hazardous Wastes Rules 2016.</p>
            <form onSubmit={e => { e.preventDefault(); handlePrint(); }} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginTop: '15px' }}>
              <input type="text" value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} placeholder="Vehicle Number" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#090d16', color: '#fff', border: '1px solid #1e293b' }} />
              <input type="text" value={transporterName} onChange={e => setTransporterName(e.target.value)} placeholder="Transporter Name" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#090d16', color: '#fff', border: '1px solid #1e293b' }} />
              <button type="submit" style={{ backgroundColor: '#06b6d4', color: '#090d16', padding: '8px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Print Form 10 Manifest</button>
            </form>
          </div>
        )}

        {activeTab === 'ewaste' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #06b6d4' }}>
            <h3 style={{ color: '#67e8f9', marginTop: 0 }}>💻 E-Waste &amp; Battery EPR Statutory Vault</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Monitors compliance under E-Waste Rules 2022 &amp; Battery Waste Management Rules 2022.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#090d16', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #06b6d4' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>E-WASTE LOG</span>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#a5f3fc', margin: '4px 0' }}>450 KG Disposed</p>
              </div>
              <div style={{ backgroundColor: '#090d16', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #a855f7' }}>
                <span style={{ fontSize: '10px', color: '#64748b' }}>INDUSTRIAL BATTERIES</span>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#e9d5ff', margin: '4px 0' }}>24 Units Tracked</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div>
            <div style={{ backgroundColor: '#0f172a', borderLeft: '4px solid #22c55e', padding: '12px 18px', borderRadius: '6px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b' }}>MONITORED UNIT:</span>
                <h3 style={{ margin: 0, color: '#22c55e' }}>{activeFactory.name} - {activeFactory.location}</h3>
              </div>
              <div style={{ fontSize: '11px', color: '#38bdf8', backgroundColor: '#090d16', padding: '6px 10px', borderRadius: '4px', border: '1px solid #1e293b' }}>
                🔗 Hash: <span style={{ fontFamily: 'monospace', color: '#fff' }}>{activeFactory.blockHash}</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #eab308', padding: '15px', borderRadius: '8px' }}>
                <h4 style={{ color: '#eab308', margin: '0 0 5px 0' }}>CTO Renewal</h4>
                <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{activeFactory.ctoDaysLeft} Days Left</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #ef4444', padding: '15px', borderRadius: '8px' }}>
                <h4 style={{ color: '#ef4444', margin: '0 0 5px 0' }}>Penalty Risk</h4>
                <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#fca5a5' }}>INR {activeFactory.penaltyRisk}</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', border: '1px solid #10b981', padding: '15px', borderRadius: '8px' }}>
                <h4 style={{ color: '#10b981', margin: '0 0 5px 0' }}>ETP Index</h4>
                <p style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#6ee7b7' }}>{activeFactory.etpHealth}%</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'blockchain' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #0284c7' }}>
            <h3 style={{ color: '#38bdf8', marginTop: 0 }}>🔗 Blockchain Immutable Audit Trail Ledger</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Cryptographically signed compliance logs. Proves zero data tampering in court or MPCB audits.</p>
            <div style={{ backgroundColor: '#090d16', padding: '12px', borderRadius: '6px', marginTop: '15px', borderLeft: '4px solid #22c55e' }}>
              <div style={{ fontSize: '11px', color: '#22c55e', fontWeight: 'bold' }}>BLOCK #840192 • IoT Sensor Sync</div>
              <div style={{ fontSize: '11px', fontFamily: 'monospace', color: '#38bdf8', marginTop: '4px' }}>Hash: {activeFactory.blockHash}</div>
            </div>
          </div>
        )}

        {activeTab === 'cluster' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #6366f1' }}>
            <h3 style={{ color: '#818cf8', marginTop: 0 }}>🛡️ MCCI Privacy Shield &amp; Govt Subsidy Finder</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Connects MSMEs to Government Grants while preserving individual factory privacy.</p>
            <div style={{ backgroundColor: '#090d16', padding: '15px', borderRadius: '6px', marginTop: '15px', borderLeft: '4px solid #6366f1' }}>
              <span style={{ fontSize: '11px', color: '#64748b' }}>AVAILABLE GOVT SUBSIDY</span>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#818cf8', margin: '4px 0' }}>Up to 50% CAPEX Capital Subsidy</p>
            </div>
          </div>
        )}

        {activeTab === 'onboarding' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #a855f7' }}>
            <h3 style={{ color: '#c084fc', marginTop: 0 }}>🏭 Multi-Tenant Client Onboarding Engine</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>Onboard new industrial manufacturing units across MIDC zones into the EcoTrace Ecosystem.</p>
            <form onSubmit={handleAddFactory} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginTop: '15px' }}>
              <input required type="text" value={factoryName} onChange={e => setFactoryName(e.target.value)} placeholder="Company Name" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#090d16', color: '#fff', border: '1px solid #1e293b' }} />
              <input required type="text" value={factoryLocation} onChange={e => setFactoryLocation(e.target.value)} placeholder="MIDC Location" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#090d16', color: '#fff', border: '1px solid #1e293b' }} />
              <input required type="number" value={factoryLimit} onChange={e => setFactoryLimit(e.target.value)} placeholder="Discharge Limit" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#090d16', color: '#fff', border: '1px solid #1e293b' }} />
              <button type="submit" style={{ backgroundColor: '#a855f7', color: '#fff', padding: '8px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>+ Onboard Unit Live</button>
            </form>
          </div>
        )}

      </main>
    </div>
  );
}
