'use client';

export default function Home() {
  const factories = [
    { id: 'FAC-001', name: 'Alpha Auto Tech', location: 'Chakan, Pune', category: 'Red Category', status: 'Compliant', risk: 'Low', lastInspection: '15 Jul 2026' },
    { id: 'FAC-002', name: 'Sahyadri Chemicals', location: 'Ranjangaon', category: 'Orange Category', status: 'Review Needed', risk: 'Medium', lastInspection: '10 Jul 2026' },
    { id: 'FAC-003', name: 'Western Engineering', location: 'Talegaon', category: 'Green Category', status: 'Compliant', risk: 'Low', lastInspection: '18 Jul 2026' },
    { id: 'FAC-004', name: 'Deccan Electroplates', location: 'Bhosari', category: 'Red Category', status: 'Notice Issued', risk: 'High', lastInspection: '02 Jul 2026' },
  ];

  return (
    <div style={{ padding: '30px', fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#0f172a', color: '#f8fafc', minHeight: '100vh' }}>
      
      {/* Header Section */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#22c55e', fontSize: '26px', margin: 0, fontWeight: '700' }}>🌱 EcoTrace India</h1>
          <p style={{ color: '#94a3b8', margin: '5px 0 0 0', fontSize: '14px' }}>MPCB Risk Radar & Industrial Compliance Dashboard</p>
        </div>
        <div style={{ background: '#1e293b', padding: '8px 16px', borderRadius: '20px', border: '1px solid #334155', fontSize: '13px', color: '#22c55e', fontWeight: '600' }}>
          ● System Live & Monitoring
        </div>
      </header>

      {/* Analytics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '35px' }}>
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #22c55e', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase' }}>Overall Compliance</h3>
          <p style={{ fontSize: '26px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#22c55e' }}>92.4%</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #eab308', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase' }}>Risk Level</h3>
          <p style={{ fontSize: '26px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#eab308' }}>Low Risk</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #3b82f6', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase' }}>Monitored Factories</h3>
          <p style={{ fontSize: '26px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#3b82f6' }}>12 Units</p>
        </div>
        <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', borderLeft: '5px solid #ef4444', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
          <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase' }}>Active MPCB Alerts</h3>
          <p style={{ fontSize: '26px', fontWeight: 'bold', margin: '10px 0 0 0', color: '#ef4444' }}>01 Notice</p>
        </div>
      </div>

      {/* Live Factory Table */}
      <div style={{ backgroundColor: '#1e293b', borderRadius: '12px', padding: '24px', border: '1px solid #334155' }}>
        <h2 style={{ fontSize: '18px', margin: '0 0 20px 0', color: '#f8fafc' }}>Regional Industrial Units Monitoring</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #334155', color: '#94a3b8' }}>
                <th style={{ padding: '12px' }}>Unit ID</th>
                <th style={{ padding: '12px' }}>Factory Name</th>
                <th style={{ padding: '12px' }}>Location</th>
                <th style={{ padding: '12px' }}>MPCB Category</th>
                <th style={{ padding: '12px' }}>Compliance Status</th>
                <th style={{ padding: '12px' }}>Risk Assessment</th>
              </tr>
            </thead>
            <tbody>
              {factories.map((factory) => (
                <tr key={factory.id} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '14px', color: '#94a3b8' }}>{factory.id}</td>
                  <td style={{ padding: '14px', fontWeight: '600' }}>{factory.name}</td>
                  <td style={{ padding: '14px', color: '#cbd5e1' }}>{factory.location}</td>
                  <td style={{ padding: '14px' }}>
                    <span style={{ fontSize: '12px', padding: '4px 8px', borderRadius: '4px', backgroundColor: factory.category.includes('Red') ? '#450a0a' : factory.category.includes('Orange') ? '#451a03' : '#052e16', color: factory.category.includes('Red') ? '#fca5a5' : factory.category.includes('Orange') ? '#fdba74' : '#86efac' }}>
                      {factory.category}
                    </span>
                  </td>
                  <td style={{ padding: '14px', fontWeight: '600', color: factory.status === 'Compliant' ? '#22c55e' : factory.status === 'Notice Issued' ? '#ef4444' : '#eab308' }}>
                    {factory.status}
                  </td>
                  <td style={{ padding: '14px' }}>
                    <span style={{ fontWeight: 'bold', color: factory.risk === 'Low' ? '#22c55e' : factory.risk === 'High' ? '#ef4444' : '#eab308' }}>
                      ● {factory.risk} Risk
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
