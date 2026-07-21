'use client';

export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#22c55e' }}>🌱 EcoTrace India - MPCB Compliance Dashboard</h1>
      <p style={{ color: '#94a3b8' }}>Real-time Environmental Risk Radar & Factory Monitoring</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #22c55e' }}>
          <h3 style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>Compliance Status</h3>
          <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#22c55e', margin: '10px 0 0 0' }}>100% Compliant</p>
        </div>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #eab308' }}>
          <h3 style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>Risk Level</h3>
          <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#eab308', margin: '10px 0 0 0' }}>Low Risk</p>
        </div>
        <div style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', borderLeft: '4px solid #3b82f6' }}>
          <h3 style={{ margin: 0, fontSize: '14px', color: '#94a3b8' }}>Active Units</h3>
          <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#3b82f6', margin: '10px 0 0 0' }}>12 Plants</p>
        </div>
      </div>
    </div>
  );
}
