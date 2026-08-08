// app/page.js — Public Landing Page (Aug 2026, v2)
// Big-4/professional restructure — hero outcome-first, "How it works", "Is/Is not" trust section.
// प्रत्येक दावा प्रत्यक्ष implemented feature शी जुळतो — कुठलंही अस्तित्वात नसलेलं feature
// (उदा. Consultant Network, unmeasured "Evidence coverage %") इथे नाही.

export const metadata = {
  title: 'EcoTrace India — Inspection-Ready Compliance. Buyer-Ready ESG Data.',
  description: 'EcoTrace India helps Indian manufacturing MSMEs record daily environmental data, track CTO/consent deadlines, organize compliance evidence, and share factory-approved sustainability summaries with enterprise buyers — in English, Marathi, or Hindi.',
};

const GREEN = '#059669';
const DARK = '#0b0f19';
const CARD = '#111827';
const BORDER = '#1f2937';
const TEXT = '#d1d5db';
const MUTED = '#9ca3af';

function Section({ children, style = {} }) {
  return <section style={{ maxWidth: '780px', margin: '0 auto', padding: '0 20px', ...style }}>{children}</section>;
}

function Heading({ children }) {
  return (
    <h2 style={{ color: GREEN, fontSize: '22px', fontWeight: 'bold', margin: '0 0 12px 0', borderBottom: `2px solid ${GREEN}`, paddingBottom: '8px' }}>
      {children}
    </h2>
  );
}

function StepRow({ n, title, desc }) {
  return (
    <div style={{ display: 'flex', gap: '16px', marginBottom: '18px' }}>
      <div style={{ flexShrink: 0, width: '30px', height: '30px', borderRadius: '50%', backgroundColor: GREEN, color: 'white', fontWeight: 'bold', fontSize: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n}</div>
      <div>
        <p style={{ margin: '0 0 3px 0', fontWeight: 'bold', fontSize: '14px', color: '#ffffff' }}>{title}</p>
        <p style={{ margin: 0, fontSize: '13px', color: MUTED, lineHeight: '1.6' }}>{desc}</p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <main style={{ backgroundColor: DARK, color: '#ffffff', fontFamily: 'sans-serif', minHeight: '100vh' }}>

      {/* Top Nav — brand name कायम दिसत राहावं म्हणून */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: `1px solid ${BORDER}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🌿</span>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ffffff' }}>EcoTrace India</span>
        </div>
        <a href="/login" style={{ backgroundColor: GREEN, color: 'white', fontWeight: 'bold', fontSize: '12px', padding: '8px 16px', borderRadius: '6px', textDecoration: 'none' }}>
          Login →
        </a>
      </div>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '60px 20px 50px 20px' }}>
        <div style={{ fontSize: '44px', marginBottom: '10px' }}>🌿</div>
        <h1 style={{ fontSize: '34px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 14px 0' }}>EcoTrace India</h1>
        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#34d399', margin: '0 0 16px 0', lineHeight: '1.35' }}>
          Inspection-ready compliance. Buyer-ready ESG data.
        </p>
        <p style={{ fontSize: '15px', color: TEXT, margin: '0 auto 8px auto', maxWidth: '560px', lineHeight: '1.6' }}>
          EcoTrace helps Indian manufacturing MSMEs record daily environmental data, track CTO/consent deadlines, organize compliance evidence, and share factory-approved sustainability summaries with enterprise buyers.
        </p>
        <p style={{ fontSize: '13px', color: MUTED, margin: '0 0 30px 0' }}>For MSME Factories · Enterprises &amp; Buyers · Industry Bodies (MCCI)</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/login" style={{ display: 'inline-block', backgroundColor: GREEN, color: 'white', fontWeight: 'bold', fontSize: '15px', padding: '13px 28px', borderRadius: '8px', textDecoration: 'none' }}>
            Login / Get Started →
          </a>
          <a href="mailto:dhiraj@ectotraceindia.com?subject=EcoTrace%20India%20-%20Inquiry" style={{ display: 'inline-block', backgroundColor: 'transparent', color: TEXT, border: `1px solid ${BORDER}`, fontWeight: 'bold', fontSize: '15px', padding: '13px 28px', borderRadius: '8px', textDecoration: 'none' }}>
            Contact Us
          </a>
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: BORDER, marginBottom: '50px' }} />

      {/* Problem */}
      <Section style={{ marginBottom: '50px' }}>
        <Heading>Built for the Indian Factory Floor</Heading>
        <p style={{ color: TEXT, fontSize: '15px', lineHeight: '1.7' }}>
          Environmental records are created every day — but at most Indian MSMEs, they still live in paper registers, spreadsheets, and scattered messages, with no timestamp integrity and no easy way to produce the statutory formats an inspector asks for.
        </p>
        <p style={{ color: TEXT, fontSize: '15px', lineHeight: '1.7' }}>
          EcoTrace turns daily factory records into structured, traceable, and shareable compliance data — without requiring new hardware or an English-only interface.
        </p>
      </Section>

      {/* Three stakeholders */}
      <Section style={{ marginBottom: '50px' }}>
        <Heading>One Platform, Three Stakeholders</Heading>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px' }}>
            <p style={{ margin: '0 0 6px 0', fontWeight: 'bold', fontSize: '15px', color: '#ffffff' }}>For MSME Factories</p>
            <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: MUTED, lineHeight: '1.6' }}>Stay ready for inspections, renewals, and customer audits.</p>
            <ul style={{ margin: 0, paddingLeft: '18px', color: TEXT, fontSize: '13px', lineHeight: '1.9' }}>
              <li>Daily operator logbook, in English, Marathi, or Hindi</li>
              <li>CTO/consent countdown with advance alerts</li>
              <li>OCR-assisted document entry, with human confirmation</li>
              <li>Instant inspection-readiness dossier</li>
              <li>Transparent correction log — nothing is silently overwritten</li>
            </ul>
          </div>
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px' }}>
            <p style={{ margin: '0 0 6px 0', fontWeight: 'bold', fontSize: '15px', color: '#ffffff' }}>For Enterprises &amp; Buyers</p>
            <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: MUTED, lineHeight: '1.6' }}>Build a structured supplier environmental-data layer.</p>
            <ul style={{ margin: 0, paddingLeft: '18px', color: TEXT, fontSize: '13px', lineHeight: '1.9' }}>
              <li>Bulk supplier onboarding, one request to many at once</li>
              <li>Consent-based connections — suppliers approve every share</li>
              <li>Vendor compliance scorecard across all approved suppliers</li>
              <li>Factory-approved Green Passport (Scope 1/2/3 summary)</li>
            </ul>
          </div>
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px' }}>
            <p style={{ margin: '0 0 6px 0', fontWeight: 'bold', fontSize: '15px', color: '#ffffff' }}>For Industry Bodies (MCCI)</p>
            <p style={{ margin: 0, fontSize: '13px', color: MUTED, lineHeight: '1.6' }}>A shared, multi-language digital backbone that member factories can adopt without heavy IT investment — helping members meet buyer-side ESG demands together rather than each figuring it out alone.</p>
          </div>
        </div>
      </Section>

      {/* How it works */}
      <Section style={{ marginBottom: '50px' }}>
        <Heading>How EcoTrace Works</Heading>
        <StepRow n="1" title="Record" desc="Operators enter daily pH, water, electricity, fuel, and waste readings from a mobile-friendly dashboard." />
        <StepRow n="2" title="Validate" desc="EcoTrace GPS-tags and server-timestamps each record, and chains it into a tamper-evident record — corrections are preserved transparently, never silently overwritten." />
        <StepRow n="3" title="Organize" desc="Uploaded bills and manifests are OCR-read, with a confidence gate that requires human confirmation before any figure is used." />
        <StepRow n="4" title="Prepare" desc="The platform assembles inspection-readiness dossiers and draft statutory-format reports from the same live data." />
        <StepRow n="5" title="Share" desc="Factories decide what to share and with whom. Approved buyers receive a curated summary — never raw daily records — and access can be revoked at any time." />
      </Section>

      {/* Green Passport */}
      <Section style={{ marginBottom: '50px' }}>
        <Heading>Green Passport</Heading>
        <p style={{ color: TEXT, fontSize: '14px', lineHeight: '1.7', marginBottom: '10px' }}>A factory-approved sustainability summary for enterprise buyers. It can include:</p>
        <ul style={{ margin: '0 0 12px 0', paddingLeft: '18px', color: TEXT, fontSize: '13px', lineHeight: '1.9' }}>
          <li>Factory identity, location, and CTO/consent status</li>
          <li>Data completeness score and last-log date</li>
          <li>Average pH, and total water and electricity use</li>
          <li>Scope 1, Scope 2 (location-based and market-based) emissions</li>
          <li>Scope 3 disclosure status</li>
        </ul>
        <p style={{ color: MUTED, fontSize: '12px', fontStyle: 'italic', lineHeight: '1.6' }}>
          Scope 3 is disclosed transparently as "not currently tracked" — EcoTrace does not estimate figures it hasn't measured.
        </p>
      </Section>

      {/* Trust */}
      <Section style={{ marginBottom: '50px' }}>
        <Heading>Built for Controlled Data Sharing</Heading>
        <ul style={{ margin: 0, paddingLeft: '18px', color: TEXT, fontSize: '14px', lineHeight: '2' }}>
          <li>Each factory's data is isolated from every other factory's</li>
          <li>Buyers see only approved summaries — never raw operational records</li>
          <li>A factory can revoke a buyer's access at any time</li>
          <li>Corrections are recorded transparently, not silently overwritten</li>
          <li>OCR-extracted values require human confirmation before use</li>
          <li>Sensitive API credentials are handled server-side, never exposed to the browser</li>
          <li>EcoTrace does not automatically transmit data to government portals</li>
        </ul>
      </Section>

      {/* BRSR / why it matters */}
      <Section style={{ marginBottom: '50px' }}>
        <Heading>Why This Matters for Buyers</Heading>
        <p style={{ color: TEXT, fontSize: '14px', lineHeight: '1.7' }}>
          Enterprise sustainability and procurement teams increasingly need structured environmental data from their MSME suppliers — for BRSR, Scope 3 estimation, and supply-chain risk management. Under SEBI's current framework, value-chain ESG disclosure for eligible top-250 listed entities is voluntary from FY 2025-26, with related third-party assessment voluntary from FY 2026-27.
        </p>
        <p style={{ color: '#34d399', fontSize: '14px', fontWeight: 'bold', lineHeight: '1.7' }}>
          EcoTrace helps suppliers build the underlying evidence before that request becomes urgent.
        </p>
      </Section>

      {/* Is / Is not */}
      <Section style={{ marginBottom: '50px' }}>
        <Heading>What EcoTrace Is — and Is Not</Heading>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '16px' }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', fontSize: '13px', color: '#34d399' }}>EcoTrace Is</p>
            <ul style={{ margin: 0, paddingLeft: '18px', color: TEXT, fontSize: '13px', lineHeight: '1.9' }}>
              <li>A factory environmental data-management platform</li>
              <li>A daily compliance logbook</li>
              <li>An inspection-readiness tool</li>
              <li>A consent-controlled supplier ESG data layer</li>
            </ul>
          </div>
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '16px' }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', fontSize: '13px', color: '#f59e0b' }}>EcoTrace Is Not</p>
            <ul style={{ margin: 0, paddingLeft: '18px', color: TEXT, fontSize: '13px', lineHeight: '1.9' }}>
              <li>A government portal</li>
              <li>A compliance certificate</li>
              <li>A legal or environmental consultancy</li>
              <li>A substitute for calibrated instruments or physical safety systems</li>
              <li>A guarantee against notices, penalties, or shutdowns</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Disclaimer */}
      <Section style={{ marginBottom: '60px' }}>
        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px', fontSize: '12px', color: MUTED, fontStyle: 'italic', lineHeight: '1.7' }}>
          EcoTrace India aggregates data supplied by the factory and prepares statutory formats. It does not certify compliance, calculate hazardous waste quantities, transmit data to government portals, or provide legal opinions. Factory management remains responsible for the accuracy of entries, equipment calibration, physical safety, and actual regulatory compliance. Draft reports and notice responses should be reviewed by the factory's authorized person and, where appropriate, a qualified professional.
        </div>
      </Section>

      {/* Final CTA */}
      <div style={{ textAlign: 'center', paddingBottom: '60px' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#ffffff', marginBottom: '18px' }}>Ready to make your factory data inspection-ready?</p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="/login" style={{ display: 'inline-block', backgroundColor: GREEN, color: 'white', fontWeight: 'bold', fontSize: '15px', padding: '13px 28px', borderRadius: '8px', textDecoration: 'none' }}>
            Login / Get Started →
          </a>
          <a href="mailto:dhiraj@ectotraceindia.com?subject=EcoTrace%20India%20-%20Inquiry" style={{ display: 'inline-block', backgroundColor: 'transparent', color: TEXT, border: `1px solid ${BORDER}`, fontWeight: 'bold', fontSize: '15px', padding: '13px 28px', borderRadius: '8px', textDecoration: 'none' }}>
            Contact Us
          </a>
        </div>
      </div>

      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '20px', textAlign: 'center', fontSize: '11px', color: MUTED }}>
        <p style={{ margin: '0 0 6px 0' }}>EcoTrace India | Contact: 7378780745 | Email: dhiraj@ectotraceindia.com</p>
        <p style={{ margin: 0 }}>
          <a href="/terms" style={{ color: MUTED, textDecoration: 'underline' }}>Terms of Service</a>
          {' · '}
          <a href="/privacy" style={{ color: MUTED, textDecoration: 'underline' }}>Privacy Policy</a>
        </p>
      </footer>
    </main>
  );
}
