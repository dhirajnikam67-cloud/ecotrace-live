'use client';

export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh' }}>
      <header style={{ borderBottom: '1px solid #334155', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1 style={{ color: '#22c55e', fontSize: '28px', margin: 0 }}>🌱 EcoTrace India - MPCB Compliance Dashboard</h1>
        <p style={{ color: '#94a3b8', marginTop: '5px' }}>Real-time Environmental Compliance & Factory Monitoring</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #22c55e' }}>
          <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Compliance Status</h3>
          <p style={{ fontSize: '22px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#22c55e' }}>100% Compliant</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #eab308' }}>
          <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Risk Level</h3>
          <p style={{ fontSize: '22px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#eab308' }}>Low Risk</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #3b82f6' }}>
          <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>Active Factories</h3>
          <p style={{ fontSize: '22px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#3b82f6' }}>12 Units</p>
        </div>
      </div>
    </div>
  );
}
