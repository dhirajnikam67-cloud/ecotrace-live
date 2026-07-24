'use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseShield() {
  const [activeTab, setActiveTab] = useState('calendar');
  
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
      gridVoltage: 415
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
      gridVoltage: 412
    }
  ]);
  const [selectedFactoryId, setSelectedFactoryId] = useState(1);

  // Gas Leak Monitoring State
  const [gasThresholdPpm, setGasThresholdPpm] = useState('50');

  // CTO Renewal State
  const [ctoCategory, setCtoCategory] = useState('RED Heavy Chemical Category');

  // CAPEX & ROI Calculator State
  const [currentCapex, setCurrentCapex] = useState('1500000');
  const [monthlyChemCost, setMonthlyChemCost] = useState('45000');
  const [roiMonths, setRoiMonths] = useState('18');

  // E-Waste & Battery Register State
  const [ewasteWeight, setEwasteWeight] = useState('450');
  const [batteryQty, setBatteryQty] = useState('24');

  // Annual Returns Form State (Form 3, 4, 5)
  const [selectedReturnForm, setSelectedReturnForm] = useState('Form 3');
  const [form3Date, setForm3Date] = useState('2026-07-24');
  const [form3DailyQty, setForm3DailyQty] = useState('150 Liters');

  const [form4AnnualQty, setForm4AnnualQty] = useState('12.5 MT');
  const [form5RawMaterial, setForm5RawMaterial] = useState('18.2 MT/Month');

  // Client Onboarding Form States
  const [factoryName, setFactoryName] = useState('');
  const [factoryLocation, setFactoryLocation] = useState('');
  const [factoryLimit, setFactoryLimit] = useState('');

  // Legal Defense Notice State
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
      gridVoltage: 415
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
      <aside style={{ width: '300px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ marginBottom: '8px' }}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e' }}>EcoTrace India</div>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Zero Non-Compliance Ecosystem</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button type="button" onClick={() => setActiveTab('calendar')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'calendar' ? '#10b981' : 'transparent', color: activeTab === 'calendar' ? '#0f172a' : '#6ee7b7', fontWeight: 'bold' }}>🗓️ AI Statutory Return Predictor</button>
          <button type="button" onClick={() => setActiveTab('gasleak')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gasleak' ? '#ef4444' : 'transparent', color: activeTab === 'gasleak' ? '#fff' : '#fca5a5', fontWeight: 'bold' }}>☣️ Toxic Gas Leak &amp; Safety Radar</button>
          <button type="button" onClick={() => setActiveTab('gridmon')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gridmon' ? '#eab308' : 'transparent', color: activeTab === 'gridmon' ? '#0f172a' : '#fef08a', fontWeight: 'bold' }}>⚡ MSEDCL Smart Grid &amp; PF Meter</button>
          <button type="button" onClick={() => setActiveTab('auditmode')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'auditmode' ? '#0284c7' : 'transparent', color: activeTab === 'auditmode' ? '#fff' : '#38bdf8', fontWeight: 'bold' }}>🚨 Flying Squad Emergency Mode</button>
          <button type="button" onClick={() => setActiveTab('dashboard')} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#fff', fontWeight: 'bold' }}>Live Risk Radar &amp; ETP Meter</button>
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

        {/* FEATURE 15: AI STATUTORY RETURN PREDICTOR & MASTER CALENDAR */}
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
                <span style={{ fontSize: '10px', color: '#f97316' }}>Status: Ready to File</span>
              </div>

              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>FORM 5 ENVIRONMENTAL STATEMENT</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#38bdf8', margin: '4px 0 0 0' }}>Due Sept 30th ({activeFactory.form5DaysLeft} Days Left)</p>
                <span style={{ fontSize: '10px', color: '#22c55e' }}>Status: Auto-Dossier Synced</span>
              </div>

              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', borderLeft: '4px solid #eab308' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>CTO RENEWAL DEADLINE</span>
                <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#fef08a', margin: '4px 0 0 0' }}>{activeFactory.ctoDaysLeft} Days Remaining</p>
                <span style={{ fontSize: '10px', color: '#eab308' }}>Status: Window Active</span>
              </div>
            </div>

            <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', marginTop: '15px', border: '1px solid #334155' }}>
              <h4 style={{ margin: '0 0 10px 0', color: '#fff' }}>Automated AI Reminder Engine Schedule:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#cbd5e1' }}>
                <li>Form 3 Daily Register: <strong>Auto-Logged Every 24 Hours via IoT Sensors</strong></li>
                <li>Form 10 Waste Manifest: <strong>Instant Auto-Generation on Vehicle Gate Out</strong></li>
                <li>WhatsApp &amp; Email Predictive Alerts: <strong>T-30 Days, T-15 Days, and T-3 Days Before Deadline</strong></li>
              </ul>
            </div>
          </div>
        )}

        {/* TOXIC GAS LEAK & SAFETY RADAR */}
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

        {/* MSEDCL SMART GRID & PF MONITOR */}
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

        {/* EMERGENCY AUDIT MODE */}
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

      </main>
    </div>
  );
}
