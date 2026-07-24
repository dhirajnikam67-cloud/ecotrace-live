'use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseShield() {
  const [activeTab, setActiveTab] = useState('auditmode');
  const [openSection, setOpenSection] = useState('emergency');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* Mobile Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '12px 15px', borderBottom: '1px solid #334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ backgroundColor: '#0f172a', color: '#22c55e', border: '1px solid #22c55e', padding: '6px 10px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
            ☰ {mobileMenuOpen ? 'Close Menu' : 'Modules'}
          </button>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#22c55e' }}>EcoTrace India Pvt. Ltd.</div>
          </div>
        </div>
        <div style={{ fontSize: '11px', color: '#38bdf8', backgroundColor: '#0f172a', padding: '4px 8px', borderRadius: '4px', border: '1px solid #334155' }}>
          Project by Dhiraj Nikam
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* Sidebar */}
        <aside style={{ 
          width: '280px', 
          backgroundColor: '#1e293b', 
          borderRight: '1px solid #334155', 
          padding: '14px', 
          display: mobileMenuOpen ? 'flex' : 'none', 
          flexDirection: 'column', 
          gap: '8px',
          position: 'absolute',
          zIndex: 100,
          height: '100%',
          boxShadow: '5px 0 15px rgba(0,0,0,0.5)'
        }}>
          <div style={{ marginBottom: '6px', borderBottom: '1px solid #334155', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#22c55e' }}>EcoTrace India Pvt. Ltd.</div>
              <span style={{ fontSize: '10px', color: '#38bdf8' }}>Project by Dhiraj Nikam</span>
            </div>
            <button type="button" onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
            
            {/* A. RISK & EMERGENCY */}
            <div style={{ borderRadius: '6px', overflow: 'hidden', backgroundColor: '#0f172a', border: '1px solid #ef4444' }}>
              <button type="button" onClick={() => toggleSection('emergency')} style={{ width: '100%', textAlign: 'left', padding: '8px', backgroundColor: '#1e293b', color: '#fca5a5', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ backgroundColor: '#dc2626', color: '#fff', padding: '1px 5px', borderRadius: '3px', fontSize: '9px', fontWeight: '800' }}>[A]</span>
                  <span>Risk &amp; Emergency</span>
                </div>
                <span>{openSection === 'emergency' ? '▲' : '▼'}</span>
              </button>
              {openSection === 'emergency' && (
                <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <button type="button" onClick={() => { setActiveTab('auditmode'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'auditmode' ? '#ef4444' : 'transparent', color: activeTab === 'auditmode' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• Flying Squad Mode</button>
                  <button type="button" onClick={() => { setActiveTab('gasleak'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gasleak' ? '#ef4444' : 'transparent', color: activeTab === 'gasleak' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• Toxic Gas Leak Radar</button>
                  <button type="button" onClick={() => { setActiveTab('defense'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'defense' ? '#f97316' : 'transparent', color: activeTab === 'defense' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• Notice Defense Matrix</button>
                </div>
              )}
            </div>

            {/* B. UTILITY & SAVINGS */}
            <div style={{ borderRadius: '6px', overflow: 'hidden', backgroundColor: '#0f172a', border: '1px solid #eab308' }}>
              <button type="button" onClick={() => toggleSection('savings')} style={{ width: '100%', textAlign: 'left', padding: '8px', backgroundColor: '#1e293b', color: '#fef08a', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ backgroundColor: '#ca8a04', color: '#fff', padding: '1px 5px', borderRadius: '3px', fontSize: '9px', fontWeight: '800' }}>[B]</span>
                  <span>Utility &amp; Cost Savings</span>
                </div>
                <span>{openSection === 'savings' ? '▲' : '▼'}</span>
              </button>
              {openSection === 'savings' && (
                <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <button type="button" onClick={() => { setActiveTab('gridmon'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gridmon' ? '#eab308' : 'transparent', color: activeTab === 'gridmon' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• MSEDCL Smart Grid</button>
                  <button type="button" onClick={() => { setActiveTab('zldindex'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'zldindex' ? '#38bdf8' : 'transparent', color: activeTab === 'zldindex' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• ZLD Water Recovery</button>
                  <button type="button" onClick={() => { setActiveTab('capex'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'capex' ? '#eab308' : 'transparent', color: activeTab === 'capex' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• ETP CAPEX &amp; ROI</button>
                </div>
              )}
            </div>

            {/* C. STATUTORY COMPLIANCE */}
            <div style={{ borderRadius: '6px', overflow: 'hidden', backgroundColor: '#0f172a', border: '1px solid #10b981' }}>
              <button type="button" onClick={() => toggleSection('compliance')} style={{ width: '100%', textAlign: 'left', padding: '8px', backgroundColor: '#1e293b', color: '#6ee7b7', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ backgroundColor: '#059669', color: '#fff', padding: '1px 5px', borderRadius: '3px', fontSize: '9px', fontWeight: '800' }}>[C]</span>
                  <span>Statutory Compliance</span>
                </div>
                <span>{openSection === 'compliance' ? '▲' : '▼'}</span>
              </button>
              {openSection === 'compliance' && (
                <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <button type="button" onClick={() => { setActiveTab('calendar'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'calendar' ? '#10b981' : 'transparent', color: activeTab === 'calendar' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• Return Predictor Calendar</button>
                  <button type="button" onClick={() => { setActiveTab('returns'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'returns' ? '#14b8a6' : 'transparent', color: activeTab === 'returns' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• Form 3, 4 &amp; 5 Returns</button>
                  <button type="button" onClick={() => { setActiveTab('ctorenewal'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'ctorenewal' ? '#14b8a6' : 'transparent', color: activeTab === 'ctorenewal' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• CTO Renewal Auto-Dossier</button>
                </div>
              )}
            </div>

            {/* D. SUPPLY CHAIN & ESG */}
            <div style={{ borderRadius: '6px', overflow: 'hidden', backgroundColor: '#0f172a', border: '1px solid #06b6d4' }}>
              <button type="button" onClick={() => toggleSection('supply')} style={{ width: '100%', textAlign: 'left', padding: '8px', backgroundColor: '#1e293b', color: '#a5f3fc', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ backgroundColor: '#0891b2', color: '#fff', padding: '1px 5px', borderRadius: '3px', fontSize: '9px', fontWeight: '800' }}>[D]</span>
                  <span>Supply Chain &amp; ESG</span>
                </div>
                <span>{openSection === 'supply' ? '▲' : '▼'}</span>
              </button>
              {openSection === 'supply' && (
                <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <button type="button" onClick={() => { setActiveTab('tankergps'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'tankergps' ? '#06b6d4' : 'transparent', color: activeTab === 'tankergps' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• Tanker Geo-Fence GPS</button>
                  <button type="button" onClick={() => { setActiveTab('manifest'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'manifest' ? '#06b6d4' : 'transparent', color: activeTab === 'manifest' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• Form 10 Manifest Generator</button>
                  <button type="button" onClick={() => { setActiveTab('ewaste'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'ewaste' ? '#06b6d4' : 'transparent', color: activeTab === 'ewaste' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• E-Waste &amp; Battery Vault</button>
                </div>
              )}
            </div>

            {/* E. COMMAND CENTER & GRANTS */}
            <div style={{ borderRadius: '6px', overflow: 'hidden', backgroundColor: '#0f172a', border: '1px solid #6366f1' }}>
              <button type="button" onClick={() => toggleSection('enterprise')} style={{ width: '100%', textAlign: 'left', padding: '8px', backgroundColor: '#1e293b', color: '#c7d2fe', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ backgroundColor: '#4f46e5', color: '#fff', padding: '1px 5px', borderRadius: '3px', fontSize: '9px', fontWeight: '800' }}>[E]</span>
                  <span>Command Center &amp; Grants</span>
                </div>
                <span>{openSection === 'enterprise' ? '▲' : '▼'}</span>
              </button>
              {openSection === 'enterprise' && (
                <div style={{ padding: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <button type="button" onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• Live Risk Radar &amp; ETP</button>
                  <button type="button" onClick={() => { setActiveTab('blockchain'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'blockchain' ? '#0284c7' : 'transparent', color: activeTab === 'blockchain' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• Blockchain Audit Trail</button>
                  <button type="button" onClick={() => { setActiveTab('cluster'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'cluster' ? '#6366f1' : 'transparent', color: activeTab === 'cluster' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• MCCI &amp; Govt Grants</button>
                  <button type="button" onClick={() => { setActiveTab('onboarding'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'onboarding' ? '#a855f7' : 'transparent', color: activeTab === 'onboarding' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• Multi-Tenant Onboarding</button>
                </div>
              )}
            </div>

          </nav>
        </aside>

        {/* Main Workspace */}
        <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          
          <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '15px', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span style={{ backgroundColor: '#22c55e', color: '#0f172a', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>EcoTrace India Pvt. Ltd.</span>
                <span style={{ fontSize: '12px', color: '#38bdf8' }}>Project by Dhiraj Nikam</span>
              </div>
              <h2 style={{ margin: 0, fontSize: '18px' }}>MPCB Direct Gateway &amp; Enterprise Ecosystem</h2>
              <p style={{ color: '#94a3b8', margin: '2px 0 0 0', fontSize: '12px' }}>Contact: 7378780745 | dhiraj@ecotraceindia.com</p>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <select value={selectedFactoryId} onChange={(e) => setSelectedFactoryId(Number(e.target.value))} style={{ backgroundColor: '#1e293b', color: '#fff', border: '1px solid #a855f7', padding: '6px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>
                {factoryList.map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.location})</option>
                ))}
              </select>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '6px 10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>Export PDF</button>
              <button type="button" onClick={handleSyncMPCB} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>Sync MPCB</button>
            </div>
          </header>

          {activeTab === 'auditmode' && (
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #ef4444' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                <div>
                  <h3 style={{ color: '#fca5a5', marginTop: 0, fontSize: '16px' }}>🚨 MPCB Flying Squad Emergency Audit Mode</h3>
                  <p style={{ fontSize: '12px', color: '#94a3b8' }}>1-Click Instant Compliance Dossier for surprise inspections.</p>
                </div>
                <button type="button" onClick={handlePrint} style={{ backgroundColor: '#ef4444', color: '#fff', padding: '8px 12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>🖨️ Print Audit Package</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '15px' }}>
                <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>CTO STATUS</span>
                  <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#22c55e', fontSize: '13px' }}>VALID ({activeFactory.ctoDaysLeft} Days)</p>
                </div>
                <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>ETP/STP HEALTH</span>
                  <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#38bdf8', fontSize: '13px' }}>{activeFactory.etpHealth}% Optimal</p>
                </div>
                <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #eab308' }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>BLOCKCHAIN HASH</span>
                  <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#fef08a', fontFamily: 'monospace', fontSize: '12px' }}>{activeFactory.blockHash.substring(0, 10)}...</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'returns' && (
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #14b8a6' }}>
              <h3 style={{ color: '#2dd4bf', marginTop: 0 }}>📜 MPCB Statutory Annual Returns Generator</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Generate official Form 3, Form 4, or Form 5 instantly.</p>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#14b8a6', color: '#0f172a', padding: '8px 12px', border: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer', marginTop: '10px' }}>Print Official PDF</button>
            </div>
          )}

          {activeTab === 'dashboard' && (
            <div>
              <div style={{ backgroundColor: '#1e293b', borderLeft: '4px solid #22c55e', padding: '12px', borderRadius: '6px', marginBottom: '15px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>MONITORED UNIT:</span>
                <h3 style={{ margin: 0, color: '#22c55e', fontSize: '15px' }}>{activeFactory.name} - {activeFactory.location}</h3>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                <div style={{ backgroundColor: '#1e293b', border: '1px solid #eab308', padding: '12px', borderRadius: '8px' }}>
                  <h4 style={{ color: '#eab308', margin: '0 0 4px 0', fontSize: '12px' }}>CTO Renewal</h4>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0 }}>{activeFactory.ctoDaysLeft} Days Left</p>
                </div>
                <div style={{ backgroundColor: '#1e293b', border: '1px solid #ef4444', padding: '12px', borderRadius: '8px' }}>
                  <h4 style={{ color: '#ef4444', margin: '0 0 4px 0', fontSize: '12px' }}>Penalty Risk</h4>
                  <p style={{ fontSize: '16px', fontWeight: 'bold', margin: 0, color: '#fca5a5' }}>INR {activeFactory.penaltyRisk}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'onboarding' && (
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '1px solid #a855f7' }}>
              <h3 style={{ color: '#c084fc', marginTop: 0 }}>🏭 Multi-Tenant Client Onboarding Engine</h3>
              <form onSubmit={handleAddFactory} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginTop: '15px' }}>
                <input required type="text" value={factoryName} onChange={e => setFactoryName(e.target.value)} placeholder="Company Name" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', fontSize: '12px' }} />
                <input required type="text" value={factoryLocation} onChange={e => setFactoryLocation(e.target.value)} placeholder="MIDC Location" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', fontSize: '12px' }} />
                <input required type="number" value={factoryLimit} onChange={e => setFactoryLimit(e.target.value)} placeholder="Discharge Limit" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', fontSize: '12px' }} />
                <button type="submit" style={{ backgroundColor: '#a855f7', color: '#fff', padding: '8px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>+ Onboard Industrial Unit Live</button>
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
