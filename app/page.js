// app/page.js — Public Landing Page (Aug 2026)
// यापूर्वी हीच फाईल थेट Login/Dashboard चा कोड होती. तो कोड आता app/login/page.js मध्ये हलवला आहे.
// इथे फक्त एक साधं, माहितीपूर्ण marketing पान आहे — buyer/MCCI/नवीन visitor साठी पहिली ओळख,
// आणि "Login / Get Started" बटण त्यांना खऱ्या ॲपकडे (/login) घेऊन जातं.

export const metadata = {
  title: 'EcoTrace India — Compliance-to-BRSR Platform for MSMEs',
  description: 'EcoTrace India helps MSME factories record daily MPCB/CPCB compliance data, generate statutory reports, and share verified ESG data with enterprise buyers for BRSR value-chain reporting — in English, Marathi, or Hindi.',
};

const GREEN = '#059669';
const DARK = '#0b0f19';
const CARD = '#111827';
const BORDER = '#1f2937';
const TEXT = '#d1d5db';
const MUTED = '#9ca3af';

function Section({ children, style = {} }) {
  return <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 20px', ...style }}>{children}</section>;
}

function Heading({ children }) {
  return (
    <h2 style={{ color: GREEN, fontSize: '22px', fontWeight: 'bold', margin: '0 0 12px 0', borderBottom: `2px solid ${GREEN}`, paddingBottom: '8px' }}>
      {children}
    </h2>
  );
}

export default function LandingPage() {
  return (
    <main style={{ backgroundColor: DARK, color: '#ffffff', fontFamily: 'sans-serif', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ textAlign: 'center', padding: '70px 20px 50px 20px' }}>
        <div style={{ fontSize: '48px', marginBottom: '10px' }}>🌿</div>
        <h1 style={{ fontSize: '34px', fontWeight: 'bold', color: '#ffffff', margin: '0 0 10px 0' }}>EcoTrace India</h1>
        <p style={{ fontSize: '17px', color: TEXT, margin: '0 0 6px 0' }}>India's Compliance-to-BRSR Platform for MSMEs</p>
        <p style={{ fontSize: '14px', color: '#34d399', fontWeight: 'bold', margin: '0 0 6px 0' }}>From daily factory compliance to buyer-verifiable ESG data — in one platform.</p>
        <p style={{ fontSize: '13px', color: MUTED, margin: '0 0 30px 0' }}>For MSME Factories · Enterprises &amp; Buyers · Industry Bodies (MCCI)</p>
        <a href="/login" style={{ display: 'inline-block', backgroundColor: GREEN, color: 'white', fontWeight: 'bold', fontSize: '15px', padding: '13px 32px', borderRadius: '8px', textDecoration: 'none' }}>
          Login / Get Started →
        </a>
      </div>

      <div style={{ height: '1px', backgroundColor: BORDER, marginBottom: '50px' }} />

      <Section style={{ marginBottom: '50px' }}>
        <Heading>Who We Are</Heading>
        <p style={{ color: TEXT, fontSize: '15px', lineHeight: '1.7' }}>
          EcoTrace India is a compliance data-management platform built for India's manufacturing MSMEs. We help factories record their daily environmental and operational data, generate statutory-format compliance reports, and share a verified sustainability summary with the enterprise buyers who need it — all from one dashboard, in the language the factory floor actually speaks.
        </p>
        <p style={{ color: TEXT, fontSize: '15px', lineHeight: '1.7' }}>
          We are not a hardware company, and we are not a government portal. We are the layer in between — the one that turns a factory's daily paperwork into a structured, tamper-evident, audit-ready record that regulators, buyers, and the factory's own management can all trust.
        </p>
      </Section>

      <Section style={{ marginBottom: '50px' }}>
        <Heading>What We're Solving</Heading>
        <div style={{ display: 'grid', gap: '16px' }}>
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '16px' }}>
            <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', fontSize: '14px', color: '#ffffff' }}>For MSME Factories</p>
            <p style={{ margin: 0, fontSize: '13px', color: MUTED, lineHeight: '1.6' }}>Daily environmental record-keeping is still paper-based at most Indian MSMEs — no timestamp integrity, no easy way to generate the statutory formats regulators ask for during inspection.</p>
          </div>
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '16px' }}>
            <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', fontSize: '14px', color: '#ffffff' }}>For Enterprises &amp; Buyers</p>
            <p style={{ margin: 0, fontSize: '13px', color: MUTED, lineHeight: '1.6' }}>SEBI's BRSR framework is moving toward mandatory value-chain ESG disclosure — currently voluntary for FY 2025-26, with third-party assessment expected from FY 2026-27. Forward-looking enterprises are already asking MSME suppliers for this data, which those suppliers have never been asked to track before, let alone in a structured, shareable format.</p>
          </div>
          <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '16px' }}>
            <p style={{ margin: '0 0 4px 0', fontWeight: 'bold', fontSize: '14px', color: '#ffffff' }}>For Industry Bodies (MCCI)</p>
            <p style={{ margin: 0, fontSize: '13px', color: MUTED, lineHeight: '1.6' }}>Chambers of commerce want member factories to be compliance-ready and investment-ready, without heavy IT investment or English-only tools.</p>
          </div>
        </div>
      </Section>

      <Section style={{ marginBottom: '50px' }}>
        <Heading>Platform at a Glance</Heading>
        <ul style={{ color: TEXT, fontSize: '14px', lineHeight: '2', paddingLeft: '20px' }}>
          <li>Daily compliance logbook in English, Marathi, or Hindi</li>
          <li>GPS-tagged, tamper-evident records with a transparent correction log</li>
          <li>Scope 1, 2 (location- &amp; market-based), and Scope 3 disclosure</li>
          <li>Consent-based "Green Passport" sharing with approved buyers only</li>
          <li>Bulk vendor onboarding and a supplier compliance scorecard</li>
          <li>Installable as a home-screen app — no app store required</li>
        </ul>
      </Section>

      <Section style={{ marginBottom: '60px' }}>
        <div style={{ backgroundColor: CARD, border: `1px solid ${BORDER}`, borderRadius: '10px', padding: '18px', fontSize: '12px', color: MUTED, fontStyle: 'italic', lineHeight: '1.7' }}>
          EcoTrace India aggregates data supplied by the factory and prepares statutory formats. It does not certify compliance, calculate hazardous waste quantities, transmit data to government portals, or provide legal opinions. Physical safety, hardware calibration, and actual regulatory compliance remain the responsibility of each factory's management.
        </div>
      </Section>

      <div style={{ textAlign: 'center', paddingBottom: '60px' }}>
        <a href="/login" style={{ display: 'inline-block', backgroundColor: GREEN, color: 'white', fontWeight: 'bold', fontSize: '15px', padding: '13px 32px', borderRadius: '8px', textDecoration: 'none' }}>
          Login / Get Started →
        </a>
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
