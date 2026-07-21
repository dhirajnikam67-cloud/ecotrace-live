'use client';

import React, { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [filter, setFilter] = useState('All');

  const factories = [
    { id: 'FAC-001', name: 'Alpha Auto Tech', location: 'Chakan, Pune', category: 'Red Category', status: 'Compliant', risk: 'Low', airQuality: '92%', waterPurity: '98%' },
    { id: 'FAC-002', name: 'Sahyadri Chemicals', location: 'Ranjangaon', category: 'Orange Category', status: 'Review Needed', risk: 'Medium', airQuality: '78%', waterPurity: '85%' },
    { id: 'FAC-003', name: 'Western Engineering', location: 'Talegaon', category: 'Green Category', status: 'Compliant', risk: 'Low', airQuality: '95%', waterPurity: '99%' },
    { id: 'FAC-004', name: 'Deccan Electroplates', location: 'Bhosari', category: 'Red Category', status: 'Notice Issued', risk: 'High', airQuality: '64%', waterPurity: '70%' },
  ];

  const filteredFactories = filter === 'All' 
    ? factories 
    : factories.filter(f => f.category.includes(filter));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* 1. Sidebar Navigation */}
      <aside style={{ width: '240px', backgroundColor: '#1e293b', borderRight: '1px solid #334155', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#22c55e', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🌱 EcoTrace
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('dashboard')} 
            style={{ textAlign: 'left', padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : 'transparent', color: activeTab === 'dashboard' ? '#0f172a' : '#94a3b8', fontWeight: '600' }}>
            📊 Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('factories')} 
            style={{ textAlign: 'left', padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'factories' ? '#22c55e' : 'transparent', color: activeTab === 'factories' ? '#0f172a' : '#94a3b8', fontWeight: '600' }}>
            🏭 Factories
          </button>
          <button 
            onClick={() => setActiveTab('alerts')} 
            style={{ textAlign: 'left', padding: '10px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'alerts' ? '#22c55e' : 'transparent', color: activeTab === 'alerts' ? '#0f172a' : '#94a3b8', fontWeight: '600' }}>
            🚨 MPCB Alerts
          </button>
        </nav>

        <div style={{ marginTop: 'auto', backgroundColor: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155', fontSize: '12px', color: '#94a3b8' }}>
          Region: <strong>Maharashtra (MPCB)</strong>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '30px', overflowY: 'auto' }}>
        
        {/* Top Bar with Export Button */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #334155', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '24px', margin: 0, fontWeight: '700' }}>MPCB Environmental Compliance Radar</h1>
            <p style={{ color: '#94a3b8', margin: '4px 0 0 0', fontSize: '14px' }}>Real-time Monitoring & Audit Platform</p>
          </div>

          {/* 2. PDF / Print Export Button */}
          <button 
            onClick={handlePrint}
            style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            📥 Export Audit Report (PDF)
          </button>
        </header>

        {activeTab === 'dashboard' && (
          <>
            {/* Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #22c55e' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>OVERALL COMPLIANCE</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e', margin: '8px 0 0 0' }}>92.4%</p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #eab308' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>RISK LEVEL</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#eab308', margin: '8px 0 0 0' }}>Low Risk</p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #3b82f6' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>MONITORED UNITS</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#3b82f6', margin: '8px 0 0 0' }}>12 Factories</p>
              </div>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '4px solid #ef4444' }}>
                <span style={{ color: '#94a3b8', fontSize: '12px' }}>ACTIVE NOTICES</span>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444', margin: '8px 0 0 0' }}>01 Notice</p>
              </div>
            </div>

            {/* 3. Visual Pollution Threshold Meters */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '16px', marginTop: 0 }}>💨 Air Quality Index (Avg Regional)</h3>
                <div style={{ height: '12px', backgroundColor: '#0f172a', borderRadius: '6px', overflow: 'hidden', marginTop: '15px' }}>
                  <div style={{ width: '82%', height: '100%', backgroundColor: '#22c55e' }}></div>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>82% Safe Standard (Chakan & Industrial Zones)</p>
              </div>

              <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
                <h3 style={{ fontSize: '16px', marginTop: 0 }}>🌊 Effluent Water Treatment (ETP Status)</h3>
                <div style={{ height: '12px', backgroundColor: '#0f172a', borderRadius: '6px', overflow: 'hidden', marginTop: '15px' }}>
                  <div style={{ width: '91%', height: '100%', backgroundColor: '#3b82f6' }}></div>
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>91% Clean Effluent Output</p>
              </div>
            </div>
          </>
        )}

        {/* Factory Table Section with Filters */}
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '18px', margin: 0 }}>Factory Compliance Records</h2>
            
            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'Red', 'Orange', 'Green'].map((cat) => (
                <button 
                  key={cat} 
                  onClick={() => setFilter(cat)}
                  style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #334155', cursor: 'pointer', backgroundColor: filter === cat ? '#22c55e' : '#0f172a', color: filter === cat ? '#0f172a' : '#f8fafc', fontSize: '12px', fontWeight: '600' }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #334155', color: '#94a3b8' }}>
                <th style={{ padding: '12px' }}>Unit ID</th>
                <th style={{ padding: '12px' }}>Factory</th>
                <th style={{ padding: '12px' }}>Location</th>
                <th style={{ padding: '12px' }}>Category</th>
                <th style={{ padding: '12px' }}>Air / Water</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredFactories.map((f) => (
                <tr key={f.id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '12px', color: '#94a3b8' }}>{f.id}</td>
                  <td style={{ padding: '12px', fontWeight: 'bold' }}>{f.name}</td>
                  <td style={{ padding: '12px', color: '#cbd5e1' }}>{f.location}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '4px', backgroundColor: f.category.includes('Red') ? '#450a0a' : f.category.includes('Orange') ? '#451a03' : '#052e16', color: f.category.includes('Red') ? '#fca5a5' : f.category.includes('Orange') ? '#fdba74' : '#86efac' }}>
                      {f.category}
                    </span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '12px', color: '#94a3b8' }}>
                    Air: {f.airQuality} | Water: {f.waterPurity}
                  </td>
                  <td style={{ padding: '12px', fontWeight: 'bold', color: f.status === 'Compliant' ? '#22c55e' : f.status === 'Notice Issued' ? '#ef4444' : '#eab308' }}>
                    {f.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </main>
    </div>
  );
}
