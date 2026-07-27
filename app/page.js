'use client';
import React, { useState } from 'react';

export default function EcoTraceDashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState('mainDashboard');
  const [auditResult, setAuditResult] = useState(null);
  const [loadingAudit, setLoadingAudit] = useState(false);

  const [macroData] = useState({
    corridorName: "India's First Green Industrial Corridor - Pune Region",
    activeMonitoringUnits: 142,
    regionalAggregates: {
      totalCarbonEmissionTonnes: 1250.4,
      totalWaterConsumptionKL: 45000,
      greenCompliancePercentage: "94.5%"
    },
    privacyShieldStatus: "Active - 100% Data Anonymization Maintained"
  });

  const [activeHash, setActiveHash] = useState("0xa8f392c1b4e87019d6f2231e");

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
    <main style={{ padding: '15px', background: '#0b0f19', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '12px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#58a6ff', fontSize: '18px' }}>EcoTrace India Private Limited</h2>
          <p style={{ margin: '3px 0 0 0', fontSize: '11px', color: '#8b949e' }}>MPCB Legal Shield & dMRV Green Operating System | Contact: 7378780745 | dhiraj@ecotraceindia.com</p>
        </div>
        <div style={{ background: '#21262d', padding: '6px 12px', borderRadius: '6px', border: '1px solid #30363d', fontSize: '12px', color: '#7ee787' }}>
          WESTERN CHEMICALS (BHOSARI MIDC, PUNE)
        </div>
      </div>

      {/* GLOBAL COMMAND CENTER - ALL ENTERPRISE MODULES RESTORED */}
      <div style={{ marginTop: '15px' }}>
        <h3 style={{ color: '#58a6ff', fontSize: '14px', marginBottom: '10px' }}>🌐 GLOBAL COMMAND CENTER - ENTERPRISE MODULES</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', fontSize: '12px' }}>
          
          {/* CORE PLATFORM */}
          <div style={{ background: '#161b22', padding: '10px', borderRadius: '6px', border: '1px solid #30363d' }}>
            <div style={{ color: '#7ee787', fontWeight: 'bold', marginBottom: '6px' }}>CORE PLATFORM</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px', marginBottom: '4px' }}>🏠 Main Enterprise Overview</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px', marginBottom: '4px' }}>🌐 Macro Green Industrial Corridor</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px' }}>⚡ Mobile AI OCR & dMRV Geo-Scan</div>
          </div>

          {/* [A] RISK & EMERGENCY SHIELD */}
          <div style={{ background: '#161b22', padding: '10px', borderRadius: '6px', border: '1px solid #30363d' }}>
            <div style={{ color: '#f85149', fontWeight: 'bold', marginBottom: '6px' }}>[A] RISK & EMERGENCY SHIELD</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px', marginBottom: '4px' }}>• Flying Squad Audit Mode</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px', marginBottom: '4px' }}>• Toxic Gas Leak Radar</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px' }}>• Notice Defense Matrix</div>
          </div>

          {/* [B] UTILITY & [C] STATUTORY */}
          <div style={{ background: '#161b22', padding: '10px', borderRadius: '6px', border: '1px solid #30363d' }}>
            <div style={{ color: '#58a6ff', fontWeight: 'bold', marginBottom: '6px' }}>[B] UTILITY & [C] STATUTORY</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px', marginBottom: '4px' }}>• MSEDCL Smart Grid & PF</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px', marginBottom: '4px' }}>• ETP CAPEX & ROI Calculator</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px', marginBottom: '4px' }}>• Form 3, 4 & 5 Annual Returns</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px' }}>• CTO Renewal Auto-Dossier</div>
          </div>

          {/* [D] SUPPLY CHAIN & ESG */}
          <div style={{ background: '#161b22', padding: '10px', borderRadius: '6px', border: '1px solid #30363d' }}>
            <div style={{ color: '#d29922', fontWeight: 'bold', marginBottom: '6px' }}>[D] SUPPLY CHAIN & ESG</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px', marginBottom: '4px' }}>• B2B Green Passport & BRSR</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px', marginBottom: '4px' }}>• Tanker GPS & Form 10 Manifest</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px', marginBottom: '4px' }}>• E-Waste & Battery EPR Vault</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px' }}>• SBI / SIDBI Loan Rebate</div>
          </div>

          {/* [E] COMPLIANCE & PARTNERS */}
          <div style={{ background: '#161b22', padding: '10px', borderRadius: '6px', border: '1px solid #30363d' }}>
            <div style={{ color: '#bc8cff', fontWeight: 'bold', marginBottom: '6px' }}>[E] COMPLIANCE</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px', marginBottom: '4px' }}>• Blockchain Hash Vault</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px', marginBottom: '4px' }}>• MCCI Channel Network</div>
            <div style={{ padding: '5px', background: '#21262d', borderRadius: '4px' }}>• Multi-Plant Enterprise Hub</div>
          </div>

        </div>
      </div>

      {/* Model 1 Safe Integration Panel (Active Advisory & Notice Defense Check) */}
      <div style={{ margin: '15px 0', padding: '12px 15px', background: '#161b22', borderRadius: '8px', border: '1px solid #388bfd' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ color: '#58a6ff', margin: '0 0 3px 0', fontSize: '13px' }}>Model 1: Intelligent Watchman & Legal Shield</h4>
            <p style={{ color: '#8b949e', margin: 0, fontSize: '11px' }}>Zero Machine Trip / Advisory Alert Mode Active</p>
          </div>
          <button 
            onClick={runSafetyAudit}
            style={{ background: '#238636', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px' }}
            disabled={loadingAudit}
          >
            {loadingAudit ? 'Running Audit...' : 'Run Safety & Notice Defense Check'}
          </button>
        </div>

        {auditResult && (
          <div style={{ marginTop: '10px', padding: '10px', background: '#0d1117', borderRadius: '4px', border: '1px solid #388bfd', color: '#7ee787', fontSize: '11px', fontFamily: 'monospace', overflowX: 'auto' }}>
            <pre style={{ margin: 0 }}>{JSON.stringify(auditResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Macro Industrial Corridor Overview */}
      <div style={{ background: '#161b22', padding: '15px', borderRadius: '8px', border: '1px solid #30363d' }}>
        <h3 style={{ color: '#c9d1d9', marginTop: 0, fontSize: '15px' }}>{macroData.corridorName}</h3>
        <p style={{ color: '#8b949e', fontSize: '12px' }}>Active Monitoring Units: <b>{macroData.activeMonitoringUnits} Factories</b></p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '10px' }}>
          <div style={{ background: '#21262d', padding: '10px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', color: '#8b949e' }}>Total Carbon Emission</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#f85149' }}>{macroData.regionalAggregates.totalCarbonEmissionTonnes} Tonnes</div>
          </div>
          <div style={{ background: '#21262d', padding: '10px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', color: '#8b949e' }}>Water Consumption</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#58a6ff' }}>{macroData.regionalAggregates.totalWaterConsumptionKL} KL</div>
          </div>
          <div style={{ background: '#21262d', padding: '10px', borderRadius: '6px' }}>
            <div style={{ fontSize: '11px', color: '#8b949e' }}>Green Compliance</div>
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#7ee787' }}>{macroData.regionalAggregates.greenCompliancePercentage}</div>
          </div>
        </div>
      </div>

      {/* Footer Legal Disclaimer */}
      <div style={{ marginTop: '15px', fontSize: '10px', color: '#8b949e', borderTop: '1px solid #30363d', paddingTop: '8px' }}>
        LEGAL DISCLAIMER & DEVELOPER LIABILITY WAIVER: EcoTrace India Private Limited and its developers act solely as a software interface provider aggregating IoT data and statutory records. We assume NO liability for equipment failures, financial losses, or statutory penalties arising from factory operations.
      </div>

    </main>
  );
}
