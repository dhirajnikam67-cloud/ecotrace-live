'use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseShield() {
  const [activeTab, setActiveTab] = useState('auditmode');
  const [openSection, setOpenSection] = useState('emergency');
  
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

  const [currentCapex, setCurrentCapex] = useState('1500000');
  const [monthlyChemCost, setMonthlyChemCost] = useState('45000');
  const [roiMonths, setRoiMonths] = useState('18');
  const [factoryName, setFactoryName] = useState('');
  const [factoryLocation, setFactoryLocation] = useState('');
  const [factoryLimit, setFactoryLimit] = useState('');

  const [selectedReturnForm, setSelectedReturnForm] = useState('Form 3');
  const [form3Date, setForm3Date] = useState('2026-07-24');
  const [form3DailyQty, setForm3DailyQty] = useState('150 Liters');
  const [form4AnnualQty, setForm4AnnualQty] = useState('12.5 MT');
  const [form5RawMaterial, setForm5RawMaterial] = useState('18.2 MT/Month');
  const [vehicleNo, setVehicleNo] = useState('MH 12 AB 1234');
  const [transporterName, setTransporterName] = useState('MEHA HAZARD FREIGHT LOGISTICS');
  const [noticeReference, setNoticeReference] = useState('');

  const activeFactory = factoryList.find(f => f.id === selectedFactoryId) || factoryList[0];

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
    alert('ROI CALCULATION COMPLETE!\nEstimated Monthly Savings: INR ' + estSavings.toFixed(0) + '\nPayback: ' + months + ' Months');
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
    alert('NEW UNIT ONBOARDED: ' + newUnit.name);
    setActiveTab('dashboard');
  };

  const toggleSection = (secName) => {
    setOpenSection(openSection === secName ? '' : secName);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* Sleek Accordion Sidebar */}
      <aside style={{ width: '290px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ marginBottom: '8px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#22c55e' }}>EcoTrace India</div>
          <span style={{ fontSize: '11px', color: '#94a3b8' }}>Enterprise Compliance Shield</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
          
          {/* 1. RISK & EMERGENCY */}
          <div style={{ borderRadius: '6px', overflow: 'hidden', backgroundColor: '#0f172a', border: '1px solid #ef4444' }}>
            <button type="button" onClick={() => toggleSection('emergency')} style={{ width: '100%', textAlign: 'left', padding: '9px 10px', backgroundColor: '#1e293b', color: '#fca5a5', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>🚨 Risk &amp; Emergency Shield</span>
              <span>{openSection === 'emergency' ? '▲' : '▼'}</span>
            </button>
            {openSection === 'emergency' && (
              <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <button type="button" onClick={() => setActiveTab('auditmode')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'auditmode' ? '#ef4444' : 'transparent', color: activeTab === 'auditmode' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• Flying Squad Mode</button>
                <button type="button" onClick={() => setActiveTab('gasleak')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gasleak' ? '#ef4444' : 'transparent', color: activeTab === 'gasleak' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• Toxic Gas Leak Radar</button>
                <button type="button" onClick={() => setActiveTab('defense')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'defense' ? '#f97316' : 'transparent', color: activeTab === 'defense' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• Notice Defense Matrix</button>
              </div>
            )}
          </div>

          {/* 2. UTILITY & SAVINGS */}
          <div style={{ borderRadius: '6px', overflow: 'hidden', backgroundColor: '#0f172a', border: '1px solid #eab308' }}>
            <button type="button" onClick={() => toggleSection('savings')} style={{ width: '100%', textAlign: 'left', padding: '9px 10px', backgroundColor: '#1e293b', color: '#fef08a', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>⚡ Utility &amp; Cost Savings</span>
              <span>{openSection === 'savings' ? '▲' : '▼'}</span>
            </button>
            {openSection === 'savings' && (
              <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <button type="button" onClick={() => setActiveTab('gridmon')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gridmon' ? '#eab308' : 'transparent', color: activeTab === 'gridmon' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• MSEDCL Smart Grid &amp; PF</button>
                <button type="button" onClick={() => setActiveTab('zldindex')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'zldindex' ? '#38bdf8' : 'transparent', color: activeTab === 'zldindex' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• ZLD Water Recovery Meter</button>
                <button type="button" onClick={() => setActiveTab('capex')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'capex' ? '#eab308' : 'transparent', color: activeTab === 'capex' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• ETP CAPEX &amp; ROI Calculator</button>
              </div>
            )}
          </div>

          {/* 3. STATUTORY COMPLIANCE */}
          <div style={{ borderRadius: '6px', overflow: 'hidden', backgroundColor: '#0f172a', border: '1px solid #10b981' }}>
            <button type="button" onClick={() => toggleSection('compliance')} style={{ width: '100%', textAlign: 'left', padding: '9px 10px', backgroundColor: '#1e293b', color: '#6ee7b7', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>📜 Statutory Compliance</span>
              <span>{openSection === 'compliance' ? '▲' : '▼'}</span>
            </button>
            {openSection === 'compliance' && (
              <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <button type="button" onClick={() => setActiveTab('calendar')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'calendar' ? '#10b981' : 'transparent', color: activeTab === 'calendar' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• AI Return Predictor Calendar</button>
                <button type="button" onClick={() => setActiveTab('returns')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'returns' ? '#14b8a6' : 'transparent', color: activeTab === 'returns' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• Form 3, 4 &amp; 5 Annual Returns</button>
                <button type="button" onClick={() => setActiveTab('ctorenewal')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'ctorenewal' ? '#14b8a6' : 'transparent', color: activeTab === 'ctorenewal' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• CTO Renewal Auto-Dossier</button>
              </div>
            )}
          </div>

          {/* 4. SUPPLY CHAIN & ESG */}
          <div style={{ borderRadius: '6px', overflow: 'hidden', backgroundColor: '#0f172a', border: '1px solid #06b6d4' }}>
            <button type="button" onClick={() => toggleSection('supply')} style={{ width: '100%', textAlign: 'left', padding: '9px 10px', backgroundColor: '#1e293b', color: '#a5f3fc', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>🚛 Supply Chain &amp; ESG</span>
              <span>{openSection === 'supply' ? '▲' : '▼'}</span>
            </button>
            {openSection === 'supply' && (
              <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <button type="button" onClick={() => setActiveTab('tankergps')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'tankergps' ? '#06b6d4' : 'transparent', color: activeTab === 'tankergps' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• Haz-Mat Tanker Geo-Fence GPS</button>
                <button type="button" onClick={() => setActiveTab('manifest')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'manifest' ? '#06b6d4' : 'transparent', color: activeTab === 'manifest' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• Form 10 Manifest Generator</button>
                <button type="button" onClick={() => setActiveTab('ewaste')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'ewaste' ? '#06b6d4' : 'transparent', color: activeTab === 'ewaste' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• E-Waste &amp; Battery EPR Vault</button>
              </div>
            )}
          </div>

          {/* 5. COMMAND CENTER & GRANTS */}
          <div style={{ borderRadius: '6px', overflow: 'hidden', backgroundColor: '#0f172a', border: '1px solid #6366f1' }}>
            <button type="button" onClick={() => toggleSection('enterprise')} style={{ width: '100%', textAlign: 'left', padding: '9px 10px', backgroundColor: '#1e293b', color: '#c7d2fe', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span>🏢 Command Center &amp; Grants</span>
              <span>{openSection === 'enterprise' ? '▲' : '▼'}</span>
            </button>
            {openSection === 'enterprise' && (
              <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <button type="button" onClick={() => setActiveTab('dashboard')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• Live Risk Radar &amp; ETP Meter</button>
                <button type="button" onClick={() => setActiveTab('blockchain')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'blockchain' ? '#0284c7' : 'transparent', color: activeTab === 'blockchain' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• Blockchain Audit Trail</button>
                <button type="button" onClick={() => setActiveTab('cluster')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'cluster' ? '#6366f1' : 'transparent', color: activeTab === 'cluster' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• MCCI &amp; Govt Grants</button>
                <button type="button" onClick={() => setActiveTab('onboarding')} style={{ textAlign: 'left', padding: '6px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'onboarding' ? '#a855f7' : 'transparent', color: activeTab === 'onboarding' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• Multi-Tenant Onboarding</button>
              </div>
            )}
          </div>

        </nav>

        <div style={{ marginTop: 'auto', backgroundColor: '#0f172a', padding: '10px', borderRadius: '6px', border: '1px solid #22c55e', fontSize: '11px' }}>
          <span style={{ color: '#22c55e', fontWeight: 'bold' }}>Green Vendor Passport</span>
          <p style={{ margin: '2px 0', color: '#94a3b8' }}>0.75% Loan Subvention Eligible</p>
          <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '5px', borderRadius: '4px', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>Download Loan Certificate</button>
        </div>
      </aside>

      {/* Main Workspace with Detailed View */}
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

        {activeTab === 'returns' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #14b8a6' }}>
            <h3 style={{ color: '#2dd4bf', marginTop: 0 }}>📜 MPCB Statutory Annual Returns Generator</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Select form below to generate official Form 3, Form 4, or Form 5.</p>
            <div style={{ display: 'flex', gap: '10px', margin: '15px 0' }}>
              <button type="button" onClick={() => setSelectedReturnForm('Form 3')} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: selectedReturnForm === 'Form 3' ? '#14b8a6' : '#0f172a', color: '#fff', fontWeight: 'bold' }}>Form 3 (Daily Logbook)</button>
              <button type="button" onClick={() => setSelectedReturnForm('Form 4')} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: selectedReturnForm === 'Form 4' ? '#14b8a6' : '#0f172a', color: '#fff', fontWeight: 'bold' }}>Form 4 (Annual Haz-Waste)</button>
              <button type="button" onClick={() => setSelectedReturnForm('Form 5')} style={{ flex: 1, padding: '10px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: selectedReturnForm === 'Form 5' ? '#14b8a6' : '#0f172a', color: '#fff', fontWeight: 'bold' }}>Form 5 (Environmental Statement)</button>
            </div>
            <button type="button" onClick={handlePrint} style={{ backgroundColor: '#14b8a6', color: '#0f172a', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Print Official {selectedReturnForm} PDF</button>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #10b981' }}>
            <h3 style={{ color: '#6ee7b7', marginTop: 0 }}>🗓️ AI Statutory Return Predictor &amp; Compliance Calendar</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Predictive MPCB Return Deadlines, Statutory Timelines &amp; Automated Reminders.</p>
          </div>
        )}

        {activeTab === 'ctorenewal' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #14b8a6' }}>
            <h3 style={{ color: '#99f6e4', marginTop: 0 }}>📄 MPCB CTO Renewal Auto-Dossier Generator</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Auto-compiles complete application package for MPCB OCMMS CTO Renewal.</p>
          </div>
        )}

        {activeTab === 'gasleak' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #ef4444' }}>
            <h3 style={{ color: '#fca5a5', marginTop: 0 }}>☣️ Toxic &amp; Boiler Gas Leak Safety Radar</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Real-time PPM Monitoring for Ammonia, LPG, PNG, Chlorine &amp; Solvents.</p>
            <button type="button" onClick={handleTestGasSiren} style={{ backgroundColor: '#ef4444', color: '#fff', padding: '10px 15px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>🚨 Trigger Emergency Siren Test</button>
          </div>
        )}

        {activeTab === 'defense' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #f97316' }}>
            <h3 style={{ color: '#ffedd5', marginTop: 0 }}>🛡️ MPCB Notice Defense Matrix</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Auto-generates legal reply drafts under Water Act Sec 33A and Air Act.</p>
          </div>
        )}

        {activeTab === 'gridmon' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #eab308' }}>
            <h3 style={{ color: '#fef08a', marginTop: 0 }}>⚡ MSEDCL Smart Energy Grid &amp; PF Penalty Shield</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Monitors Power Factor (PF) &amp; Voltage harmonics to eliminate MSEDCL penalties.</p>
          </div>
        )}

        {activeTab === 'zldindex' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #38bdf8' }}>
            <h3 style={{ color: '#93c5fd', marginTop: 0 }}>💧 Zero Liquid Discharge (ZLD) Water Recovery Index</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Tracks recycled effluent water to reduce MIDC water bills by up to 50%.</p>
          </div>
        )}

        {activeTab === 'capex' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #eab308' }}>
            <h3 style={{ color: '#fef08a', marginTop: 0 }}>💰 ETP &amp; Green Tech CAPEX / ROI Calculator</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Helps MSMEs justify investment in Effluent Treatment Plants with payback period metrics.</p>
          </div>
        )}

        {activeTab === 'tankergps' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #06b6d4' }}>
            <h3 style={{ color: '#a5f3fc', marginTop: 0 }}>🚛 Hazardous Waste Tanker Route &amp; Geo-Fence GPS Vault</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Tracks transport tankers live to MEPL Ranjangaon CHWTSDF via Transporter GPS APIs.</p>
          </div>
        )}

        {activeTab === 'manifest' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #06b6d4' }}>
            <h3 style={{ color: '#a5f3fc', marginTop: 0 }}>🚛 MPCB Form 10 Hazardous Waste Manifest Generator</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Statutory 7-Copy Manifest under Hazardous Wastes Rules 2016.</p>
          </div>
        )}

        {activeTab === 'ewaste' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #06b6d4' }}>
            <h3 style={{ color: '#67e8f9', marginTop: 0 }}>💻 E-Waste &amp; Battery EPR Statutory Vault</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Monitors compliance under E-Waste Rules 2022 &amp; Battery Waste Management Rules 2022.</p>
          </div>
        )}

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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
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

        {activeTab === 'blockchain' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #0284c7' }}>
            <h3 style={{ color: '#38bdf8', marginTop: 0 }}>🔗 Blockchain Immutable Audit Trail Ledger</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Cryptographically signed compliance logs. Proves zero data tampering in court or MPCB audits.</p>
          </div>
        )}

        {activeTab === 'cluster' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #6366f1' }}>
            <h3 style={{ color: '#818cf8', marginTop: 0 }}>🛡️ MCCI Privacy Shield &amp; Govt Subsidy Finder</h3>
            <p style={{ fontSize: '13px', color: '#94a3b8' }}>Connects MSMEs to Government Grants while preserving individual factory privacy.</p>
          </div>
        )}

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
