'use client';

import React, { useState } from 'react';

export default function EcoTraceUnifiedProductionOS() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [factoryList, setFactoryList] = useState([
    { 
      id: 1, 
      name: 'WESTERN CHEMICALS', 
      location: 'BHOSARI MIDC, PUNE', 
      limit: 85000, 
      discharge: 74800, 
      ph: 7.4, 
      cod: 210, 
      etpHealth: 98,
      status: 'COMPLIANT & AUDIT READY',
      ctoDaysLeft: 82,
      formVStatus: 'AUTO-GENERATED (Form V Ready)',
      penaltyRisk: 0,
      carbonScope1: '1.2 MT',
      carbonScope2: '4.8 MT',
      carbonScope3: '12.5 MT',
      blockHash: '0xa8f392c1b4e87019d6f2231e',
      greenPassportId: 'ET-GP-2026-9942',
      loanDiscountEligible: 'Up to 1.5% SBI / SIDBI Interest Rebate'
    }
  ]);
  const [selectedFactoryId, setSelectedFactoryId] = useState(1);

  const [ocrScanning, setOcrScanning] = useState(false);
  const [ocrResult, setOcrResult] = useState(null);

  const [newCompanyName, setNewCompanyName] = useState('');
  const [newMidcLocation, setNewMidcLocation] = useState('');
  const [newDischargeLimit, setNewDischargeLimit] = useState('');

  const activeFactory = factoryList.find(f => f.id === selectedFactoryId) || factoryList[0];

  const handlePrint = () => {
    if (typeof window !== 'undefined') window.print();
  };

  const handleSyncMPCB = () => {
    alert('Handshake with MPCB OCMMS & BRSR Core Server Successful.\nStatus: Blockchain Hash ' + activeFactory.blockHash + ' verified.');
  };

  const handleSimulateOcrUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setOcrScanning(true);
    setOcrResult(null);

    setTimeout(() => {
      setOcrScanning(false);
      setOcrResult({
        fileName: file.name,
        status: 'VERIFIED & AUTHENTIC (Anti-Fake Passed)',
        geoTag: '18.6298° N, 73.7997° E (Bhosari MIDC Zone-3)',
        extractedText: 'MSEDCL Energy Unit: 14,500 kWh | Water Cess: 450 KL | Date: 2026-07-24',
        dmrvOutput: 'Scope 2 Carbon Computed via CEA Factors. B2B Green Passport Updated successfully.'
      });
      alert('AI OCR & dMRV PASSPORT GENERATION SUCCESSFUL!\nBill data extracted, geo-locked and verified.');
    }, 1500);
  };

  const handleAddFactory = (e) => {
    e.preventDefault();
    const newId = factoryList.length + 1;
    const limitNum = Number(newDischargeLimit) || 50000;
    const newUnit = {
      id: newId,
      name: newCompanyName.toUpperCase().trim(),
      location: newMidcLocation.toUpperCase().trim() + ' MIDC',
      limit: limitNum,
      discharge: Math.floor(limitNum * 0.70),
      ph: 7.2,
      cod: 175,
      etpHealth: 99,
      status: 'COMPLIANT & SECURED',
      ctoDaysLeft: 180,
      formVStatus: 'AUTO-GENERATED (Ready)',
      penaltyRisk: 0,
      carbonScope1: '0.9 MT',
      carbonScope2: '3.5 MT',
      carbonScope3: '9.2 MT',
      blockHash: '0x' + Math.random().toString(16).substring(2, 14),
      greenPassportId: 'ET-GP-2026-' + Math.floor(1000 + Math.random() * 9000),
      loanDiscountEligible: 'Eligible for SBI / SIDBI Interest Rebate'
    };
    setFactoryList(prev => [newUnit, ...prev]);
    setSelectedFactoryId(newId);
    alert('NEW INDUSTRIAL UNIT ONBOARDED: ' + newUnit.name);
    setActiveTab('dashboard');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0f172a', color: '#f8fafc', fontFamily: 'sans-serif' }}>
      
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1e293b', padding: '12px 15px', borderBottom: '1px solid #334155' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ backgroundColor: '#0f172a', color: '#22c55e', border: '1px solid #22c55e', padding: '6px 10px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>
            ☰ {mobileMenuOpen ? 'Close Menu' : 'Modules'}
          </button>
          <div>
            <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#22c55e' }}>EcoTrace India Private Limited</div>
            <div style={{ fontSize: '10px', color: '#94a3b8' }}>MPCB Legal Shield &amp; dMRV Green Operating System</div>
          </div>
        </div>
        <div style={{ fontSize: '11px', color: '#38bdf8', backgroundColor: '#0f172a', padding: '4px 8px', borderRadius: '4px', border: '1px solid #334155' }}>
          Project by Dhiraj Nikam | 7378780745
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        
        {/* Sidebar Menu - All Modules Directly Visible without Collapsing */}
        <aside style={{ 
          width: '310px', 
          backgroundColor: '#1e293b', 
          borderRight: '1px solid #334155', 
          padding: '14px', 
          display: mobileMenuOpen ? 'flex' : 'none', 
          flexDirection: 'column', 
          gap: '8px',
          position: 'absolute',
          zIndex: 100,
          height: '100%',
          boxShadow: '5px 0 15px rgba(0,0,0,0.5)'
        }}>
          <div style={{ marginBottom: '6px', borderBottom: '1px solid #334155', paddingBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#22c55e' }}>EcoTrace OS Navigation</div>
              <span style={{ fontSize: '10px', color: '#38bdf8' }}>dhiraj@ecotraceindia.com</span>
            </div>
            <button type="button" onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>✕</button>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', overflowY: 'auto' }}>
            
            {/* COMMAND DASHBOARD */}
            <button type="button" onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'dashboard' ? '#22c55e' : '#0f172a', color: activeTab === 'dashboard' ? '#0f172a' : '#f8fafc', fontWeight: 'bold', fontSize: '12px' }}>
              📊 Unified Command Dashboard
            </button>

            {/* MOBILE AI OCR SCANNER */}
            <button type="button" onClick={() => { setActiveTab('ocrscanner'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: '1px solid #22c55e', cursor: 'pointer', backgroundColor: activeTab === 'ocrscanner' ? '#14532d' : '#0f172a', color: '#4ade80', fontWeight: 'bold', fontSize: '12px' }}>
              ⚡ Mobile AI OCR &amp; dMRV Scan
            </button>

            {/* A. RISK & EMERGENCY */}
            <div style={{ padding: '6px', backgroundColor: '#0f172a', borderRadius: '6px', border: '1px solid #ef4444', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#fca5a5' }}>[A] RISK &amp; EMERGENCY SHIELD</span>
              <button type="button" onClick={() => { setActiveTab('auditmode'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'auditmode' ? '#ef4444' : 'transparent', color: activeTab === 'auditmode' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• Flying Squad Audit Mode</button>
              <button type="button" onClick={() => { setActiveTab('gasleak'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gasleak' ? '#ef4444' : 'transparent', color: activeTab === 'gasleak' ? '#fff' : '#cbd5e1', fontSize: '11px' }}>• Toxic Gas Leak Radar</button>
            </div>

            {/* B. UTILITY & SAVINGS */}
            <div style={{ padding: '6px', backgroundColor: '#0f172a', borderRadius: '6px', border: '1px solid #eab308', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#fef08a' }}>[B] UTILITY &amp; COST SAVINGS</span>
              <button type="button" onClick={() => { setActiveTab('gridmon'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'gridmon' ? '#eab308' : 'transparent', color: activeTab === 'gridmon' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• MSEDCL Smart Grid</button>
              <button type="button" onClick={() => { setActiveTab('capex'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'capex' ? '#eab308' : 'transparent', color: activeTab === 'capex' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• ETP CAPEX &amp; ROI</button>
            </div>

            {/* C. STATUTORY & FORM V */}
            <div style={{ padding: '6px', backgroundColor: '#0f172a', borderRadius: '6px', border: '1px solid #10b981', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#6ee7b7' }}>[C] STATUTORY &amp; FORM V SHIELD</span>
              <button type="button" onClick={() => { setActiveTab('legalshield'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'legalshield' ? '#14b8a6' : 'transparent', color: activeTab === 'legalshield' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• Form V &amp; Returns</button>
            </div>

            {/* D. GREEN PASSPORT & ESG */}
            <div style={{ padding: '6px', backgroundColor: '#0f172a', borderRadius: '6px', border: '1px solid #06b6d4', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#a5f3fc' }}>[D] GREEN PASSPORT &amp; ESG</span>
              <button type="button" onClick={() => { setActiveTab('greenpassport'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'greenpassport' ? '#06b6d4' : 'transparent', color: activeTab === 'greenpassport' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• B2B Green Passport</button>
              <button type="button" onClick={() => { setActiveTab('financials'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '6px', borderRadius: '4px', border: 'none', cursor: 'pointer', backgroundColor: activeTab === 'financials' ? '#06b6d4' : 'transparent', color: activeTab === 'financials' ? '#0f172a' : '#cbd5e1', fontSize: '11px' }}>• SBI / SIDBI Loan Rebate</button>
            </div>

            {/* E. ONBOARDING */}
            <button type="button" onClick={() => { setActiveTab('onboarding'); setMobileMenuOpen(false); }} style={{ textAlign: 'left', padding: '9px', borderRadius: '6px', border: '1px solid #a855f7', cursor: 'pointer', backgroundColor: activeTab === 'onboarding' ? '#a855f7' : '#0f172a', color: '#fff', fontWeight: 'bold', fontSize: '12px' }}>
              🏭 Multi-Tenant Factory Onboard
            </button>

          </nav>
        </aside>

        {/* Main Workspace */}
        <main style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          
          <header style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '15px', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span style={{ backgroundColor: '#22c55e', color: '#0f172a', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>EcoTrace India Private Limited</span>
                <span style={{ fontSize: '12px', color: '#38bdf8' }}>Project by Dhiraj Nikam</span>
              </div>
              <h2 style={{ margin: 0, fontSize: '18px' }}>Unified MPCB Compliance &amp; dMRV SaaS Operating System</h2>
              <p style={{ color: '#94a3b8', margin: '2px 0 0 0', fontSize: '12px' }}>Contact: 7378780745 | dhiraj@ecotraceindia.com</p>
            </div>
            
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
              <select value={selectedFactoryId} onChange={(e) => setSelectedFactoryId(Number(e.target.value))} style={{ backgroundColor: '#1e293b', color: '#fff', border: '1px solid #a855f7', padding: '6px', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold' }}>
                {factoryList.map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.location})</option>
                ))}
              </select>
              <button type="button" onClick={handlePrint} style={{ backgroundColor: '#22c55e', color: '#0f172a', border: 'none', padding: '6px 10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>Export PDF</button>
              <button type="button" onClick={handleSyncMPCB} style={{ backgroundColor: '#0284c7', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>Sync MPCB/OEM</button>
            </div>
          </header>

          {/* 1. DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div>
              <div style={{ backgroundColor: '#1e293b', borderLeft: '4px solid #22c55e', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
                <span style={{ fontSize: '11px', color: '#94a3b8' }}>ACTIVE MONITORED ENTERPRISE:</span>
                <h3 style={{ margin: '4px 0', color: '#22c55e', fontSize: '18px' }}>{activeFactory.name} - {activeFactory.location}</h3>
                <p style={{ margin: 0, fontSize: '12px', color: '#38bdf8' }}>Status: {activeFactory.status} | Green Passport ID: {activeFactory.greenPassportId}</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                <div style={{ backgroundColor: '#1e293b', border: '1px solid #ef4444', padding: '15px', borderRadius: '8px' }}>
                  <h4 style={{ color: '#fca5a5', margin: '0 0 6px 0', fontSize: '13px' }}>🚨 MPCB Legal Shield</h4>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#fff' }}>{activeFactory.formVStatus}</p>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>CTO Valid: {activeFactory.ctoDaysLeft} Days Left</span>
                </div>

                <div style={{ backgroundColor: '#1e293b', border: '1px solid #38bdf8', padding: '15px', borderRadius: '8px' }}>
                  <h4 style={{ color: '#38bdf8', margin: '0 0 6px 0', fontSize: '13px' }}>🌿 dMRV Carbon Emissions</h4>
                  <p style={{ fontSize: '14px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#fff' }}>Scope 1: {activeFactory.carbonScope1}</p>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>Scope 2 &amp; 3 Verified via CEA</span>
                </div>

                <div style={{ backgroundColor: '#1e293b', border: '1px solid #eab308', padding: '15px', borderRadius: '8px' }}>
                  <h4 style={{ color: '#fef08a', margin: '0 0 6px 0', fontSize: '13px' }}>💰 Financial Subvention</h4>
                  <p style={{ fontSize: '13px', fontWeight: 'bold', margin: '0 0 4px 0', color: '#22c55e' }}>{activeFactory.loanDiscountEligible}</p>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>Verified via Green Passport</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. MOBILE AI OCR SCANNER */}
          {activeTab === 'ocrscanner' && (
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #22c55e' }}>
              <h3 style={{ color: '#4ade80', marginTop: 0 }}>⚡ Mobile AI OCR &amp; dMRV Geo-Scan Engine</h3>
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>Snap bills, electricity meters, or waste manifests directly from mobile. Instant OCR extracts data and updates Form V.</p>
              
              <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px dashed #22c55e', marginTop: '15px', textAlign: 'center' }}>
                <label style={{ display: 'inline-block', backgroundColor: '#22c55e', color: '#0f172a', padding: '12px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                  📷 Snap / Upload Utility &amp; Waste Bills
                  <input type="file" accept="image/*" onChange={handleSimulateOcrUpload} style={{ display: 'none' }} />
                </label>
                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>Live Camera Exif Check &amp; Anti-Fake Protection Active.</p>
              </div>

              {ocrScanning && (
                <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#0f172a', borderRadius: '6px', borderLeft: '4px solid #eab308', color: '#fef08a' }}>
                  ⏳ AI OCR processing text &amp; computing dMRV carbon factors... Please wait.
                </div>
              )}

              {ocrResult && (
                <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#0f172a', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                  <h4 style={{ color: '#22c55e', margin: '0 0 8px 0' }}>✅ OCR &amp; dMRV Verification Successful!</h4>
                  <p style={{ fontSize: '12px', margin: '3px 0', color: '#fff' }}><strong>File:</strong> {ocrResult.fileName}</p>
                  <p style={{ fontSize: '12px', margin: '3px 0', color: '#4ade80' }}><strong>Extracted Data:</strong> {ocrResult.extractedText}</p>
                  <p style={{ fontSize: '12px', margin: '3px 0', color: '#38bdf8' }}><strong>Geo-Tag Location:</strong> {ocrResult.geoTag}</p>
                  <p style={{ fontSize: '12px', margin: '3px 0', color: '#fef08a' }}><strong>dMRV Status:</strong> {ocrResult.dmrvOutput}</p>
                </div>
              )}
            </div>
          )}

          {/* 3. FLYING SQUAD AUDIT MODE */}
          {activeTab === 'auditmode' && (
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #ef4444' }}>
              <h3 style={{ color: '#fca5a5', marginTop: 0 }}>🚨 MPCB Flying Squad Emergency Audit Mode</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>1-Click instant compliance dossier aggregating CTO status, ETP health, and blockchain verification hashes.</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '15px' }}>
                <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>CTO STATUS</span>
                  <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#22c55e', fontSize: '13px' }}>VALID ({activeFactory.ctoDaysLeft} Days)</p>
                </div>
                <div style={{ backgroundColor: '#0f172a', padding: '12px', borderRadius: '6px', borderLeft: '4px solid #38bdf8' }}>
                  <span style={{ fontSize: '10px', color: '#94a3b8' }}>ETP HEALTH</span>
                  <p style={{ margin: '4px 0 0 0', fontWeight: 'bold', color: '#38bdf8', fontSize: '13px' }}>{activeFactory.etpHealth}% Optimal</p>
                </div>
              </div>
            </div>
          )}

          {/* 4. GAS LEAK RADAR */}
          {activeTab === 'gasleak' && (
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #ef4444' }}>
              <h3 style={{ color: '#fca5a5', marginTop: 0 }}>⚠️ Toxic &amp; Boiler Gas Leak Safety Radar</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Real-time Parts Per Million (PPM) concentration tracking for Ammonia, LPG, PNG, Chlorine, and Solvents.</p>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', marginTop: '15px' }}>
                <p style={{ color: '#22c55e', fontWeight: 'bold', margin: 0 }}>Status: All Gas Sensors Normal (0.05 PPM Safe Range)</p>
              </div>
            </div>
          )}

          {/* 5. MSEDCL SMART GRID */}
          {activeTab === 'gridmon' && (
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #eab308' }}>
              <h3 style={{ color: '#fef08a', marginTop: 0 }}>⚡ MSEDCL Smart Energy Grid &amp; PF Penalty Shield</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Live monitoring dashboard tracking Power Factor (PF) and grid voltage harmonics.</p>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', marginTop: '15px' }}>
                <p style={{ color: '#eab308', fontWeight: 'bold', margin: 0 }}>Current Power Factor: 0.98 (Optimal - Zero Penalty)</p>
              </div>
            </div>
          )}

          {/* 6. ETP CAPEX & ROI */}
          {activeTab === 'capex' && (
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #eab308' }}>
              <h3 style={{ color: '#fef08a', marginTop: 0 }}>💡 ETP &amp; Green Tech CAPEX / ROI Calculator</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Evaluates Effluent Treatment Plant capital expenditures against monthly chemical savings.</p>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', marginTop: '15px' }}>
                <p style={{ color: '#fff', margin: 0 }}>Estimated Payback Period: 14 Months | Monthly Savings: ₹45,000</p>
              </div>
            </div>
          )}

          {/* 7. FORM V & LEGAL SHIELD */}
          {activeTab === 'legalshield' && (
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #ef4444' }}>
              <h3 style={{ color: '#fca5a5', marginTop: 0 }}>🚨 MPCB Legal Shield &amp; Form V Automation</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Zero-error statutory compliance protecting factories from surprise inspections and closure notices.</p>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', marginTop: '15px' }}>
                <p style={{ color: '#22c55e', fontWeight: 'bold', margin: 0 }}>Form V Status: Ready for MPCB Portal Submission</p>
              </div>
            </div>
          )}

          {/* 8. B2B GREEN PASSPORT */}
          {activeTab === 'greenpassport' && (
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #38bdf8' }}>
              <h3 style={{ color: '#38bdf8', marginTop: 0 }}>🌿 B2B Green Passport &amp; SEBI BRSR Core Engine</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Instantly generates certified 3-page sustainability reports for Tier-1 &amp; Tier-2 vendors supplying to Tata and Mahindra.</p>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', marginTop: '15px' }}>
                <p style={{ color: '#4ade80', fontWeight: 'bold', margin: 0 }}>Green Passport ID: {activeFactory.greenPassportId}</p>
              </div>
            </div>
          )}

          {/* 9. FINANCIAL REBATE */}
          {activeTab === 'financials' && (
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #eab308' }}>
              <h3 style={{ color: '#fef08a', marginTop: 0 }}>💰 SBI / SIDBI Working Capital Interest Rebate</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Use your verified Green Passport to secure up to 1.5% interest rate reduction on business loans.</p>
              <div style={{ backgroundColor: '#0f172a', padding: '15px', borderRadius: '6px', marginTop: '15px' }}>
                <p style={{ color: '#22c55e', fontWeight: 'bold', margin: 0 }}>Status: {activeFactory.loanDiscountEligible}</p>
              </div>
            </div>
          )}

          {/* 10. MULTI-TENANT ONBOARDING */}
          {activeTab === 'onboarding' && (
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #a855f7' }}>
              <h3 style={{ color: '#c084fc', marginTop: 0 }}>🏭 Multi-Tenant Client Onboarding Engine</h3>
              <p style={{ fontSize: '12px', color: '#94a3b8' }}>Register new manufacturing units seamlessly across MIDC clusters.</p>
              <form onSubmit={handleAddFactory} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', marginTop: '15px' }}>
                <input required type="text" value={newCompanyName} onChange={e => setNewCompanyName(e.target.value)} placeholder="Company Name" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', fontSize: '12px' }} />
                <input required type="text" value={newMidcLocation} onChange={e => setNewMidcLocation(e.target.value)} placeholder="MIDC Location (e.g. Chakan)" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', fontSize: '12px' }} />
                <input required type="number" value={newDischargeLimit} onChange={e => setNewDischargeLimit(e.target.value)} placeholder="MPCB Discharge Limit (Liters)" style={{ padding: '8px', borderRadius: '4px', backgroundColor: '#0f172a', color: '#fff', border: '1px solid #334155', fontSize: '12px' }} />
                <button type="submit" style={{ backgroundColor: '#a855f7', color: '#fff', padding: '8px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>+ Onboard Industrial Unit Live</button>
              </form>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
