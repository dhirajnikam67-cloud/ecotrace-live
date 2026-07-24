'use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseShield() {
  const [activeTab, setActiveTab] = useState('legalshield');
  
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
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '310px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e' }}>EcoTrace India</div>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Zero Non-Compliance Ecosystem</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button type="button" onClick={() => setActiveTab('legalshield')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'legalshield' ? '#ef4444' : 'transparent', color: activeTab === 'legalshield' ? '#fff' : '#fca5a5', fontWeight: 'bold' }}>🛡️ Board Director Criminal Shield</button>
          <button type="button" onClick={() => setActiveTab('tankergps')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'tankergps' ? '#06b6d4' : 'transparent', color: activeTab === 'tankergps' ? '#0f172a' : '#a5f3fc', fontWeight: 'bold' }}>🚛 Haz-Mat Tanker Geo-Fence GPS</button>
          <button type="button" onClick={() => setActiveTab('zldindex')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'zldindex' ? '#38bdf8' : 'transparent', color: activeTab === 'zldindex' ? '#0f172a' : '#93c5fd', fontWeight: 'bold' }}>💧 ZLD Water Recovery &amp; Savings</button>
          <button type="button" onClick={() => setActiveTab('calendar')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'calendar' ? '#10b981' : 'transparent', color: activeTab === 'calendar' ? '#0f172a' : '#6ee7b7' }}>🗓️ AI Statutory Return Predictor</button>
          <button type="button" onClick={() => setActiveTab('gasleak')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gasleak' ? '#ef4444' : 'transparent', color: activeTab === 'gasleak' ? '#fff' : '#fca5a5' }}>☣️ Toxic Gas Leak &amp; Safety Radar</button>
          <button type="button" onClick={() => setActiveTab('gridmon')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gridmon' ? '#eab308' : 'transparent', color: activeTab === 'gridmon' ? '#0f172a' : '#fef08a' }}>⚡ MSEDCL Smart Grid &amp; PF Meter</button>
          <button type="button" onClick={() => setActiveTab('auditmode')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'auditmode' ? '#0284c7' : 'transparent', color: activeTab === 'auditmode' ? '#fff' : '#38bdf8' }}>🚨 Flying Squad Emergency Mode</button>
          <button type="button" onClick={() => setActiveTab('dashboard')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#fff' }}>Live Risk Radar &amp; ETP Meter</button>
          <button type="button" onClick={() => setActiveTab('ctorenewal')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'ctorenewal' ? '#14b8a6' : 'transparent', color: activeTab === 'ctorenewal' ? '#0f172a' : '#99f6e4' }}>📜 CTO Renewal Auto-Dossier</button>
          <button type="button" onClick={() => setActiveTab('capex')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'capex' ? '#eab308' : 'transparent', color: activeTab === 'capex' ? '#0f172a' : '#fef08a' }}>💰 ETP CAPEX &amp; ROI Calculator</button>
          <button type="button" onClick={() => setActiveTab('returns')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'returns' ? '#14b8a6' : 'transparent', color: activeTab === 'returns' ? '#0f172a' : '#99f6e4' }}>📜 Form 3, 4 &amp; 5 Annual Returns</button>
          <button type="button" onClick={() => setActiveTab('ewaste')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'ewaste' ? '#06b6d4' : 'transparent', color: activeTab === 'ewaste' ? '#0f172a' : '#a5f3fc' }}>💻 E-Waste &amp; Battery EPR Vault</button>
          <button type="button" onClick={() => setActiveTab('blockchain')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'blockchain' ? '#0284c7' : 'transparent', color: activeTab === 'blockchain' ? '#fff' : '#38bdf8' }}>🔗 Blockchain Audit Ledger</button>
          <button type="button" onClick={() => setActiveTab('defense')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'defense' ? '#f97316' : 'transparent', color: activeTab === 'defense' ? '#fff' : '#ffedd5' }}>Notice Defense Matrix</button>
          <button type="button" onClick={() => setActiveTab('cluster')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'cluster' ? '#6366f1' : 'transparent', color: activeTab === 'cluster' ? '#fff' : '#c7d2fe' }}>🛡️ MCCI &amp; Govt Grants</button>
          <button type="button" onClick={() => setActiveTab('onboarding')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'onboarding' ? '#a855f7' : 'transparent', color: activeTab === 'onboarding' ? '#fff' : '#e9d5ff' }}>🏭 Client Onboarding</button>
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

        {/* FEATURE 16: BOARD DIRECTOR CRIMINAL LIABILITY SHIELD */}
        {activeTab === 'legalshield' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #ef4444' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#fca5a5', marginTop: 0 }}>🛡️ Board Director Legal Liability &amp; Arrest Protection Shield</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Protects Company Directors under Sec 48/49 Water Act &amp; Environment Protection Act.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#ef4444', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>📄 Export Executive Legal Indemnity Audit</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>DIRECTOR CRIMINAL LIABILITY</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', margin: '4px 0 0 0' }}>PROTECTED (Zero Wilful Default)</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>SOP DUE DILIGENCE AUDIT LOG</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', margin: '4px 0 0 0' }}>100% Cryptographic Proof</p>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #eab308' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>COURT INDEMNITY DOSSIER</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#fef08a', margin: '4px 0 0 0' }}>READY FOR SUBMISSION</p>
              </div>
            </div>
          </div>
        )}

        {/* FEATURE 17: HAZ-MAT TANKER GEO-FENCE GPS TRACKING */}
        {activeTab === 'tankergps' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #06b6d4' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ color: '#a5f3fc', marginTop: 0 }}>🚛 Hazardous Waste Tanker Route &amp; Geo-Fence GPS Vault</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8' }}>Prevents illegal river dumping by tracking transport tankers live to CHWTSDF Ranjangaon.</p>
              </div>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#06b6d4', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>📡 Track Live Tanker Manifest</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #06b6d4' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>LIVE TANKER STATUS</span>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#a5f3fc', margin: '5px 0' }}>{activeFactory.tankerGpsStatus}</p>
                <span style={{ fontSize: '10px', color: '#22c55e' }}>GPS Route Corridors Active</span>
              </div>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #a855f7' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>ILLEGAL DUMPING SHIELD</span>
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#e9d5ff', margin: '5px 0' }}>GEO-FENCE SECURE</p>
                <span style={{ fontSize: '10px', color: '#22c55e' }}>Automated MPCB Gate-In Sync</span>
              </div>
            </div>
          </div>
        )}

        {/* FEATURE 18: ZLD WATER RECOVERY INDEX */}
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

        {/* AI STATUTORY RETURN PREDICTOR */}
        {activeTab === 'calendar' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #10b981' }}>
            <h3 style={{ color: '#6ee7b7', marginTop: 0 }}>🗓️ AI Statutory Return Predictor &amp; Compliance Calendar</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Predictive MPCB Return Deadlines, Statutory Timelines &amp; Automated Reminders.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginTop: '15px' }}>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #f97316' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>FORM 4 HAZARDOUS RETURN</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffedd5', margin: '4px 0 0 0' }}>Due June 30th ({activeFactory.form4DaysLeft} Days Left)</p>
              </div>
            </div>
          </div>
        )}

        {/* DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div>
            <div style={{ backgroundColor: '#1e293b', borderLeft: '4px solid #22c55e', padding: '12px 18px', borderRadius: '6px', marginBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>MONITORED UNIT:</span>
                <h3 style={{ margin: 0, color: '#22c55e' }}>{activeFactory.name} - {activeFactory.location}</h3>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
