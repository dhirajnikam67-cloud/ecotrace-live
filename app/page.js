'use client';
import React, { useState } from 'react';

export default function EcoTraceDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('mainDashboard');
  const [auditResult, setAuditResult] = useState(null);
  const [loadingAudit, setLoadingAudit] = useState(false);

  const runSafetyAudit = async () => {
    setLoadingAudit(true);
    try {
      const res = await fetch('/api/compliance-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          factoryId: 'WESTERN_CHEMICALS_BHOSARI', 
          powerFactor: 0.94, 
          phLevel: 8.9 
        })
      });
      const data = await res.json();
      setAuditResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAudit(false);
    }
  };

  return (
    <main style={{ padding: '20px', background: '#0b0f19', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Top Navigation Bar with Global Navigation Toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '15px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            style={{ background: '#238636', color: '#fff', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isMenuOpen ? '✕ Close Console' : '☰ Global Navigation'}
          </button>
          <div>
            <h2 style={{ margin: 0, color: '#58a6ff', fontSize: '18px' }}>EcoTrace India Private Limited</h2>
            <p style={{ margin: '3px 0 0 0', fontSize: '11px', color: '#8b949e' }}>MPCB Legal Shield & dMRV Green Operating System | Contact: 7378780745 | dhiraj@ecotraceindia.com</p>
          </div>
        </div>
        <div style={{ background: '#21262d', padding: '6px 12px', borderRadius: '6px', border: '1px solid #30363d', fontSize: '12px', color: '#7ee787' }}>
          WESTERN CHEMICALS (BHOSARI MIDC, PUNE)
        </div>
      </div>

      {/* GLOBAL COMMAND CENTER MODAL / CONSOLE */}
      {isMenuOpen && (
        <div style={{ background: '#161b22', padding: '20px', borderRadius: '8px', border: '1px solid #30363d', margin: '20px 0' }}>
          <h3 style={{ color: '#58a6ff', marginTop: 0, fontSize: '15px' }}>🌐 GLOBAL COMMAND CENTER - ENTERPRISE MODULES</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '15px', fontSize: '12px', marginTop: '15px' }}>
            
            <div style={{ background: '#0d1117', padding: '10px', borderRadius: '6px', border: '1px solid #30363d' }}>
              <div style={{ color: '#7ee787', fontWeight: 'bold', marginBottom: '8px' }}>CORE PLATFORM</div>
              <div onClick={() => setActiveModule('mainDashboard')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', marginBottom: '5px', cursor: 'pointer' }}>🏠 Main Enterprise Overview</div>
              <div onClick={() => setActiveModule('corridor')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', marginBottom: '5px', cursor: 'pointer' }}>🌐 Macro Green Industrial Corridor</div>
              <div onClick={() => setActiveModule('ocr')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', cursor: 'pointer' }}>⚡ Mobile AI OCR & dMRV Geo-Scan</div>
            </div>

            <div style={{ background: '#0d1117', padding: '10px', borderRadius: '6px', border: '1px solid #30363d' }}>
              <div style={{ color: '#f85149', fontWeight: 'bold', marginBottom: '8px' }}>[A] RISK & EMERGENCY SHIELD</div>
              <div onClick={() => setActiveModule('flyingSquad')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', marginBottom: '5px', cursor: 'pointer' }}>• Flying Squad Audit Mode</div>
              <div onClick={() => setActiveModule('toxicGas')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', marginBottom: '5px', cursor: 'pointer' }}>• Toxic Gas Leak Radar</div>
              <div onClick={() => setActiveModule('noticeDefense')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', cursor: 'pointer' }}>• Notice Defense Matrix</div>
            </div>

            <div style={{ background: '#0d1117', padding: '10px', borderRadius: '6px', border: '1px solid #30363d' }}>
              <div style={{ color: '#58a6ff', fontWeight: 'bold', marginBottom: '8px' }}>[B] UTILITY & [C] STATUTORY</div>
              <div onClick={() => setActiveModule('msedcl')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', marginBottom: '5px', cursor: 'pointer' }}>• MSEDCL Smart Grid & PF</div>
              <div onClick={() => setActiveModule('etp')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', marginBottom: '5px', cursor: 'pointer' }}>• ETP CAPEX & ROI Calculator</div>
              <div onClick={() => setActiveModule('returns')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', marginBottom: '5px', cursor: 'pointer' }}>• Form 3, 4 & 5 Annual Returns</div>
              <div onClick={() => setActiveModule('cto')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', cursor: 'pointer' }}>• CTO Renewal Auto-Dossier</div>
            </div>

            <div style={{ background: '#0d1117', padding: '10px', borderRadius: '6px', border: '1px solid #30363d' }}>
              <div style={{ color: '#d29922', fontWeight: 'bold', marginBottom: '8px' }}>[D] SUPPLY CHAIN & ESG</div>
              <div onClick={() => setActiveModule('greenPassport')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', marginBottom: '5px', cursor: 'pointer' }}>• B2B Green Passport & BRSR</div>
              <div onClick={() => setActiveModule('tanker')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', marginBottom: '5px', cursor: 'pointer' }}>• Tanker GPS & Form 10 Manifest</div>
              <div onClick={() => setActiveModule('ewaste')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', marginBottom: '5px', cursor: 'pointer' }}>• E-Waste & Battery EPR Vault</div>
              <div onClick={() => setActiveModule('loanRebate')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', cursor: 'pointer' }}>• SBI / SIDBI Loan Rebate</div>
            </div>

            <div style={{ background: '#0d1117', padding: '10px', borderRadius: '6px', border: '1px solid #30363d' }}>
              <div style={{ color: '#bc8cff', fontWeight: 'bold', marginBottom: '8px' }}>[E] COMPLIANCE</div>
              <div onClick={() => setActiveModule('blockchain')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', marginBottom: '5px', cursor: 'pointer' }}>• Blockchain Hash Vault</div>
              <div onClick={() => setActiveModule('mcci')} style={{ padding: '6px', background: '#21262d', borderRadius: '4px', marginBottom: '5px', cursor: 'pointer' }}>• MCCI Channel Network</div>
            </div>

          </div>
        </div>
      )}

      {/* MAIN ACTIVE ENTERPRISE VIEW */}
      <div style={{ marginTop: '20px', background: '#161b22', padding: '20px', borderRadius: '8px', border: '1px solid #30363d' }}>
        <div style={{ fontSize: '12px', color: '#8b949e', textTransform: 'uppercase' }}>Active Monitored Enterprise</div>
        <h3 style={{ color: '#7ee787', margin: '5px 0 10px 0', fontSize: '20px' }}>WESTERN CHEMICALS - BHOSARI MIDC, PUNE</h3>
        <p style={{ color: '#58a6ff', fontSize: '13px', margin: 0 }}>Status: COMPLIANT & AUDIT READY | Green Passport ID: ET-GP-2026-9942</p>
      </div>

      {/* Model 1 Safe Integration Panel (Intelligent Watchman & Advisory Alert Mode) */}
      <div style={{ margin: '20px 0', padding: '15px', background: '#161b22', borderRadius: '8px', border: '1px solid #388bfd' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ color: '#58a6ff', margin: '0 0 5px 0', fontSize: '14px' }}>Model 1: Intelligent Watchman & Legal Shield</h4>
            <p style={{ color: '#8b949e', margin: 0, fontSize: '12px' }}>Zero Machine Trip / Advisory Alert Mode Active</p>
          </div>
          <button 
            onClick={runSafetyAudit}
            style={{ background: '#238636', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}
            disabled={loadingAudit}
          >
            {loadingAudit ? 'Running Audit...' : 'Run Safety & Notice Defense Check'}
          </button>
        </div>

        {auditResult && (
          <div style={{ marginTop: '15px', padding: '12px', background: '#0d1117', borderRadius: '6px', border: '1px solid #388bfd', color: '#7ee787', fontSize: '11px', fontFamily: 'monospace', overflowX: 'auto' }}>
            <pre style={{ margin: 0 }}>{JSON.stringify(auditResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Core Enterprise Cards (As seen in original design) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '20px' }}>
        
        <div style={{ background: '#161b22', padding: '15px', borderRadius: '8px', border: '1px solid #30363d' }}>
          <div style={{ color: '#f85149', fontWeight: 'bold', fontSize: '13px' }}>🚨 MPCB Legal Shield</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginTop: '8px' }}>AUTO-GENERATED (Form V Ready)</div>
          <div style={{ color: '#8b949e', fontSize: '12px', marginTop: '5px' }}>CTO Valid: 82 Days Left</div>
        </div>

        <div style={{ background: '#161b22', padding: '15px', borderRadius: '8px', border: '1px solid #30363d' }}>
          <div style={{ color: '#58a6ff', fontWeight: 'bold', fontSize: '13px' }}>📊 dMRV Carbon Emissions</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginTop: '8px' }}>Scope 1: 1.2 MT</div>
          <div style={{ color: '#8b949e', fontSize: '12px', marginTop: '5px' }}>Scope 2 & 3 Verified via CEA</div>
        </div>

        <div style={{ background: '#161b22', padding: '15px', borderRadius: '8px', border: '1px solid #30363d' }}>
          <div style={{ color: '#d29922', fontWeight: 'bold', fontSize: '13px' }}>💰 Financial Subsidy Rebate</div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff', marginTop: '8px' }}>Eligible for Working Capital</div>
          <div style={{ color: '#8b949e', fontSize: '12px', marginTop: '5px' }}>Verified via Green Passport ID</div>
        </div>

      </div>

      {/* Legal Disclaimer */}
      <div style={{ marginTop: '30px', fontSize: '10px', color: '#8b949e', borderTop: '1px solid #30363d', paddingTop: '10px' }}>
        LEGAL DISCLAIMER & DEVELOPER LIABILITY WAIVER: EcoTrace India Private Limited and its developers act solely as a software interface provider aggregating IoT data and statutory records. We assume NO liability for equipment failures, financial losses, or statutory penalties arising from factory operations.
      </div>

    </main>
  );
}
