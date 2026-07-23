'use client';

import React, { useState } from 'react';

export default function EcoTraceEnterpriseDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [waterLimit, setWaterLimit] = useState(85000);
  const [phLevel, setPhLevel] = useState(7.4);

  const scope1 = 0.23, scope2 = 1.16, scope3 = 0.06;
  const totalCarbon = (scope1 + scope2 + scope3).toFixed(2);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      <aside style={{ width: '270px', backgroundColor: '#1e293b', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e' }}>EcoTrace India</div>
        <button onClick={() => setActiveTab('dashboard')} style={{ textAlign: 'left', padding: '10px', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>📊 Live Risk Radar</button>
        <button onClick={() => setActiveTab('esg')} style={{ textAlign: 'left', padding: '10px', backgroundColor: activeTab === 'esg' ? '#22c55e' : 'transparent', color: activeTab === 'esg' ? '#0f172a' : '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>🌍 Scope 1,2,3 ESG Accounting</button>
        <button onClick={() => setActiveTab('manifest')} style={{ textAlign: 'left', padding: '10px', backgroundColor: activeTab === 'manifest' ? '#22c55e' : 'transparent', color: activeTab === 'manifest' ? '#0f172a' : '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>🚛 Form 10 Manifest</button>
        <button onClick={() => setActiveTab('cluster')} style={{ textAlign: 'left', padding: '10px', backgroundColor: activeTab === 'cluster' ? '#22c55e' : 'transparent', color: activeTab === 'cluster' ? '#0f172a' : '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>🏢 MCCI MIDC Cluster</button>
      </aside>

      <main style={{ flex: 1, padding: '30px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h2>MPCB & Enterprise Compliance Gateway</h2>
          <button onClick={() => alert('Syncing with MPCB OCMMS Portal...')} style={{ backgroundColor: '#0284c7', color: '#fff', padding: '10px', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>🌐 Sync MPCB Portal</button>
        </header>

        {activeTab === 'dashboard' && (
          <div>
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', marginBottom: '15px' }}>
              <h3 style={{ color: '#22c55e' }}>CTO Renewal Radar: 82 Days Left</h3>
              <p>Water Discharge: 74,800 / {waterLimit} L (Safe)</p>
              <p>Live IoT pH: <strong>{phLevel}</strong> | Total Carbon: <strong>{totalCarbon} tCO2e</strong></p>
            </div>
          </div>
        )}

        {activeTab === 'esg' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px' }}>
            <h3 style={{ color: '#22c55e' }}>Scope 1, 2, 3 GHG Emissions</h3>
            <p>Scope 1: {scope1} tCO2e | Scope 2: {scope2} tCO2e | Scope 3: {scope3} tCO2e</p>
            <p style={{ color: '#38bdf8' }}>Bank Green Loan Interest Subvention Eligibility: 0.75%</p>
          </div>
        )}

        {activeTab === 'manifest' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px' }}>
            <h3>MPCB Form 10 Hazardous Waste Manifest Generator</h3>
            <button onClick={() => alert('Form 10 PDF Downloaded!')} style={{ backgroundColor: '#22c55e', color: '#0f172a', padding: '10px', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>Generate Form 10 Manifest</button>
          </div>
        )}

        {activeTab === 'cluster' && (
          <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px' }}>
            <h3>MCCI MIDC Cluster Aggregator Command Center</h3>
            <p>Active MIDC Units Monitored: Bhosari (142), Chakan (218), Ranjangaon (94)</p>
          </div>
        )}
      </main>
    </div>
  );
}
