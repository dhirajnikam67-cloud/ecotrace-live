{/* Model 1 Safe Integration Panel */}
      <div style={{ margin: '20px', padding: '15px', background: '#161b22', borderRadius: '8px', border: '1px solid #30363d', fontFamily: 'sans-serif' }}>
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
