'use client';

import React, { useState } from 'react';

export default function EcoTraceDashboard() {
  // Factory State with OCR parsing status & MPCB limits
  const [factory, setFactory] = useState({
    name: 'Chakan Machining Works Unit 2',
    ocrStatus: 'SUCCESS', // 'PENDING' | 'PARSING' | 'SUCCESS'
    consentLimits: {
      waterLitersDay: 85000, // Extracted via OCR or set dynamically
      so2Ppm: 60,
      hazardousWasteKgMonth: 250,
    },
    currentLog: {
      waterDischargeLiters: 74800, // 88% of 85,000 L limit
      electricityKwh: 1420,
      so2Ppm: 45,
    },
  });

  const [uploading, setUploading] = useState(false);

  // Dynamic Black Box Calculations
  const waterLimit = factory.consentLimits.waterLitersDay;
  const currentDischarge = factory.currentLog.waterDischargeLiters;
  const dischargeRatio = waterLimit > 0 ? ((currentDischarge / waterLimit) * 100).toFixed(1) : 0;
  
  // Scope 2 Carbon Calculation (0.82 kg CO2/kWh India CEA Benchmark)
  const scope2Carbon = ((factory.currentLog.electricityKwh * 0.82) / 1000).toFixed(2);

  // OCR Upload Simulator
  const handleConsentUpload = (e) => {
    e.preventDefault();
    setUploading(true);
    setFactory((prev) => ({ ...prev, ocrStatus: 'PARSING' }));

    // Simulate AI OCR Extraction process (2 seconds)
    setTimeout(() => {
      setFactory((prev) => ({
        ...prev,
        ocrStatus: 'SUCCESS',
        consentLimits: {
          waterLitersDay: 100000, // Simulated extraction from new document
          so2Ppm: 80,
          hazardousWasteKgMonth: 500,
        },
      }));
      setUploading(false);
      alert('AI OCR Engine Parsed MPCB CTO Document Successfully!\nDynamic Consent Limits Updated.');
    }, 2000);
  };

  const generatePassport = () => {
    alert(Generating Certified QR Compliance Passport for ${factory.name}...\nStatus: 100% MPCB Audit Ready.);
  };

  return (
    <div style={styles.container}>
      {/* Top Header */}
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>EcoTrace India</h1>
          <p style={styles.subTitle}>Legal Shield & Enterprise Carbon Engine</p>
        </div>
        <div style={styles.statusBadge}>● SPCB Live Sync Active</div>
      </header>

      {/* Module 1: AI OCR Document Parsing & Onboarding Section */}
      <section style={styles.ocrSection}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#38bdf8' }}>📄 AI OCR MPCB Consent Auto-Parser</h3>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '14px' }}>
            Upload MPCB Consent to Operate (CTO) PDF. Black Box Engine auto-extracts your factory-specific limits.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span style={factory.ocrStatus === 'SUCCESS' ? styles.badgeSuccess : styles.badgePending}>
            OCR Status: {factory.ocrStatus}
          </span>
          <label style={styles.uploadBtn}>
            {uploading ? 'Parsing PDF...' : 'Upload MPCB CTO PDF'}
            <input type="file" accept=".pdf" onChange={handleConsentUpload} style={{ display: 'none' }} disabled={uploading} />
          </label>
        </div>
      </section>

      {/* Module 2: Pre-Emptive Red-Flag Alert Banner */}
      {dischargeRatio >= 85 ? (
        <div style={styles.redAlert}>
          <h3 style={{ margin: '0 0 8px 0' }}>⚠️ Pre-Emptive Red-Flag Alert</h3>
          <p style={{ margin: 0 }}>
            Water discharge reached <strong>{dischargeRatio}%</strong> of your factory's MPCB limit ({currentDischarge.toLocaleString()} / {waterLimit.toLocaleString()} L). Penalty threshold imminent in 36 hrs!
          </p>
          <button style={styles.alertBtn}>Trigger Auto-Dosing Protocol</button>
        </div>
      ) : (
        <div style={styles.safeAlert}>
          <h3 style={{ margin: '0 0 8px 0' }}>🟢 Status: Fully Compliant</h3>
          <p style={{ margin: 0 }}>Discharge within factory-specific statutory boundaries ({dischargeRatio}% of MPCB Consent Limit).</p>
        </div>
      )}

      {/* Module 3: Dynamic Dashboard Cards */}
      <div style={styles.grid}>
        {/* Dynamic Water Risk Radar */}
        <div style={styles.card}>
          <h3 style={styles.cardHeader}>Dynamic Pre-Emptive Risk Radar</h3>
          <p style={styles.metric}>{dischargeRatio}%</p>
          <p style={styles.cardFooter}>
            Discharge: <strong>{currentDischarge.toLocaleString()} L</strong> / Max: <strong>{waterLimit.toLocaleString()} L</strong>
          </p>
        </div>

        {/* Audit Vault & Passport */}
        <div style={styles.card}>
          <h3 style={styles.cardHeader}>Digital Compliance Vault</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Inspector on-site at premises?</p>
          <button onClick={generatePassport} style={styles.passportBtn}>
            📄 Generate Instant Compliance Passport
          </button>
        </div>

        {/* Scope 1 & 2 Carbon Ledger */}
        <div style={styles.card}>
          <h3 style={styles.cardHeader}>Automated Carbon Ledger</h3>
          <p style={styles.metric}>{scope2Carbon} <span style={{ fontSize: '18px' }}>tCO2e</span></p>
          <p style={styles.cardFooter}>Calculated via 0.82 kg CO2/kWh Grid Factor</p>
        </div>
      </div>
    </div>
  );
}

// Inline Styling System
const styles = {
  container: { padding: '30px', fontFamily: 'sans-serif', backgroundColor: '#0f172a', color: '#fff', minHeight: '100vh' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  title: { margin: 0, color: '#22c55e', fontSize: '28px' },
  subTitle: { margin: '4px 0 0 0', color: '#94a3b8', fontSize: '14px' },
  statusBadge: { backgroundColor: '#1e293b', padding: '8px 16px', borderRadius: '20px', border: '1px solid #22c55e', color: '#22c55e', fontSize: '13px', fontWeight: 'bold' },
  ocrSection: { backgroundColor: '#1e293b', border: '1px solid #334155', padding: '20px', borderRadius: '12px', marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' },
  badgeSuccess: { backgroundColor: '#064e3b', color: '#10b981', border: '1px solid #10b981', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' },
  badgePending: { backgroundColor: '#78350f', color: '#f59e0b', border: '1px solid #f59e0b', padding: '6px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold' },
  uploadBtn: { backgroundColor: '#0284c7', color: '#fff', padding: '10px 18px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' },
  redAlert: { backgroundColor: '#7f1d1d', border: '1px solid #ef4444', padding: '20px', borderRadius: '12px', marginBottom: '25px' },
  safeAlert: { backgroundColor: '#064e3b', border: '1px solid #10b981', padding: '20px', borderRadius: '12px', marginBottom: '25px' },
  alertBtn: { backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#1e293b', padding: '20px', borderRadius: '12px', border: '1px solid #334155', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  cardHeader: { margin: '0 0 10px 0', fontSize: '16px', color: '#f8fafc' },
  metric: { fontSize: '36px', fontWeight: 'bold', color: '#38bdf8', margin: '10px 0' },
  cardFooter: { margin: 0, color: '#94a3b8', fontSize: '13px' },
  passportBtn: { backgroundColor: '#10b981', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '15px', width: '100%' }
};
