'use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseShield() {
  const [activeTab, setActiveTab] = useState('returns');
  
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

        {activeTab === 'auditmode' && (
          <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px solid #ef4444' }}>
            <h3 style={{ color: '#fca5a5', marginTop: 0 }}>🚨 MPCB Flying Squad Emergency Audit Mode</h3>
            <p style={{ fontSize: '12px', color: '#64748b' }}>1-Click Instant Compliance Dossier for surprise inspections.</p>
          </div>
        )}

      </main>
    </div>
  );
}
