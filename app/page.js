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
    <main style={{ padding: '20px', background: '#0b0f19', color: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '15px' }}>
        <div>
          <h2 style={{ margin: 0, color: '#58a6ff' }}>EcoTrace India Private Limited</h2>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#8b949e' }}>MPCB Legal Shield & dMRV Green Operating System</p>
        </div>
        <div style={{ background: '#21262d', padding: '8px 15px', borderRadius: '6px', border: '1px solid #30363d', fontSize: '13px', color: '#7ee787' }}>
          WESTERN CHEMICALS (BHOSARI MIDC, PUNE)
        </div>
      </div>

      {/* Model 1 Safe Integration Panel */}
      <div style={{ margin: '20px 0', padding: '15px', background: '#161b22', borderRadius: '8px', border: '1px solid #30363d' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h4 style={{ color: '#58a6ff', margin: '0 0 5px 0', fontSize: '14px' }}>Model 1: Intelligent Watchman & Legal Shield</h4>
            <p style={{ color: '#8b949e', margin: 0, fontSize: '12px' }}>Zero Machine Trip / Advisory Alert Mode Active</p>
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
          <div style={{ marginTop: '12px', padding: '10px', background: '#0d1117', borderRadius: '4px', border: '1px solid #388bfd', color: '#7ee787', fontSize: '11px', fontFamily: 'monospace', overflowX: 'auto' }}>
            <pre style={{ margin: 0 }}>{JSON.stringify(auditResult, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Macro Industrial Corridor Overview */}
      <div style={{ background: '#161b22', padding: '20px', borderRadius: '8px', border: '1px solid #30363d', marginTop: '20px' }}>
        <h3 style={{ color: '#c9d1d9', marginTop: 0 }}>{macroData.corridorName}</h3>
        <p style={{ color: '#8b949e', fontSize: '13px' }}>Active Monitoring Units: <b>{macroData.activeMonitoringUnits} Factories</b></p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', marginTop: '15px' }}>
          <div style={{ background: '#21262d', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '12px', color: '#8b949e' }}>Total Carbon Emission</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#f85149' }}>{macroData.regionalAggregates.totalCarbonEmissionTonnes} Tonnes</div>
          </div>
          <div style={{ background: '#21262d', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '12px', color: '#8b949e' }}>Water Consumption</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#58a6ff' }}>{macroData.regionalAggregates.totalWaterConsumptionKL} KL</div>
          </div>
          <div style={{ background: '#21262d', padding: '12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '12px', color: '#8b949e' }}>Green Compliance</div>
            <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#7ee787' }}>{macroData.regionalAggregates.greenCompliancePercentage}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
