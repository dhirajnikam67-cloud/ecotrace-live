'use client';

import { useState, useEffect } from 'react';

/* ============================================================
   EcoTrace India — Landing Page  (app/page.js)
   Design tokens: dark slate surfaces, single green accent
   reserved for the primary CTA only.
   ============================================================ */

const C = {
  bg: '#0b1014',          // page background
  surface: '#111820',     // raised section background
  border: '#1e2a35',      // hairline borders
  text: '#e8edf2',        // primary text
  muted: '#93a1b0',       // secondary text
  faint: '#6b7885',       // captions / eyebrows
  green: '#059669',       // CTA only
  greenHover: '#047857',
};

const MAXW = 1080;
const READW = 680; // comfortable reading column

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main style={S.page}>
      <style>{GLOBAL_CSS}</style>

      {/* ---------- NAV ---------- */}
      <nav
        style={{
          ...S.nav,
          borderBottomColor: scrolled ? C.border : 'transparent',
          background: scrolled ? 'rgba(11,16,20,0.92)' : 'transparent',
        }}
      >
        <div style={S.navInner}>
          <a href="/" style={S.brand}>
            <span style={S.brandMark} aria-hidden="true">🌿</span>
            <span>EcoTrace India</span>
          </a>
          <a href="/login" style={S.navLink}>Log in</a>
        </div>
      </nav>

      {/* ---------- HERO ---------- */}
      <header style={S.hero}>
        <div style={{ ...S.wrap, maxWidth: 860 }}>
          <p style={S.eyebrow}>Environmental compliance software for Indian MSMEs</p>

          <h1 style={S.h1}>
            Inspection-ready compliance.
            <br />
            <span style={S.h1Line2}>Buyer-ready ESG data.</span>
          </h1>

          <p style={S.heroSub}>
            EcoTrace helps Indian manufacturing MSMEs record daily environmental data,
            track CTO and consent deadlines, organise compliance evidence, and share
            factory-approved sustainability summaries with enterprise buyers.
          </p>

          <div style={S.ctaRow}>
            <a href="/login" className="cta-primary" style={S.ctaPrimary}>
              Log in / Get started
            </a>
            <a href="mailto:dhiraj@ectotraceindia.com" className="cta-secondary" style={S.ctaSecondary}>
              Contact us
            </a>
          </div>

          <p style={S.audienceLine}>
            Built for MSME factories, enterprise buyers, and industry bodies.
          </p>
        </div>
      </header>

      {/* ---------- PROBLEM ---------- */}
      <Section>
        <h2 style={S.h2}>Built for the Indian factory floor</h2>
        <div style={S.readCol}>
          <p style={S.body}>
            Environmental records are created every day. At most Indian MSMEs they still
            live in paper registers, spreadsheets, and scattered messages — with no
            timestamp integrity and no straightforward way to produce the statutory
            formats an inspector asks for.
          </p>
          <p style={S.body}>
            EcoTrace turns those daily records into structured, traceable, shareable
            compliance data. No new hardware. No English-only interface — the entire
            platform works in English, Marathi, and Hindi.
          </p>
        </div>
      </Section>

      {/* ---------- HOW IT WORKS ---------- */}
      <Section alt>
        <h2 style={S.h2}>How EcoTrace works</h2>
        <p style={{ ...S.body, ...S.readCol, marginBottom: 44 }}>
          Five steps, in the order a factory actually does them.
        </p>

        <ol style={S.steps}>
          {STEPS.map((s, i) => (
            <li key={s.title} style={S.step}>
              <span style={S.stepNum}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 style={S.stepTitle}>{s.title}</h3>
                <p style={S.stepBody}>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* ---------- IS / IS NOT ---------- */}
      <Section>
        <h2 style={S.h2}>What EcoTrace is, and what it is not</h2>
        <p style={{ ...S.body, ...S.readCol, marginBottom: 44 }}>
          Compliance software should be precise about its own limits. Ours are stated
          here, not buried in a footnote.
        </p>

        <div style={S.twoCol}>
          <div style={S.card}>
            <p style={S.cardLabel}>EcoTrace is</p>
            <ul style={S.list}>
              {IS_LIST.map((t) => (
                <li key={t} style={S.listItem}>{t}</li>
              ))}
            </ul>
          </div>
          <div style={S.card}>
            <p style={S.cardLabel}>EcoTrace is not</p>
            <ul style={S.list}>
              {IS_NOT_LIST.map((t) => (
                <li key={t} style={S.listItem}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---------- AUDIENCES ---------- */}
      <Section alt>
        <h2 style={S.h2}>Who it is for</h2>
        <div style={S.threeCol}>
          {AUDIENCES.map((a) => (
            <div key={a.title} style={S.audCard}>
              <h3 style={S.audTitle}>{a.title}</h3>
              <p style={S.audBody}>{a.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---------- CLOSING CTA ---------- */}
      <Section>
        <div style={S.readCol}>
          <h2 style={{ ...S.h2, marginBottom: 16 }}>Start with one factory</h2>
          <p style={S.body}>
            Register a unit, log a day, and export the report an inspector would ask for.
            No installation, no hardware, and it runs on the phone already on the shop floor.
          </p>
          <div style={{ ...S.ctaRow, marginTop: 32 }}>
            <a href="/login" className="cta-primary" style={S.ctaPrimary}>
              Log in / Get started
            </a>
          </div>
        </div>
      </Section>

      {/* ---------- FOOTER ---------- */}
      <footer style={S.footer}>
        <div style={{ ...S.wrap, ...S.footerInner }}>
          <div>
            <p style={S.footerBrand}>EcoTrace India Private Limited</p>
            <p style={S.footerMeta}>
              Contact: 7378780745 &nbsp;·&nbsp; dhiraj@ectotraceindia.com
            </p>
          </div>
          <div style={S.footerLinks}>
            <a href="/terms" style={S.footerLink}>Terms of Service</a>
            <a href="/privacy" style={S.footerLink}>Privacy Policy</a>
            <a href="/login" style={S.footerLink}>Log in</a>
          </div>
        </div>
        <div style={{ ...S.wrap, ...S.disclaimerWrap }}>
          <p style={S.disclaimer}>
            EcoTrace India is a record-keeping and reporting platform. It is not a
            certifying body and does not provide independent assurance. Emission figures
            are calculated from user-entered data using published emission factors and
            should be reviewed by a qualified consultant before statutory filing. We are
            in the early stages of pursuing ISO 27001 certification.
          </p>
        </div>
      </footer>
    </main>
  );
}

/* ============================================================
   Section wrapper — body content is LEFT aligned by design.
   ============================================================ */
function Section({ children, alt }) {
  return (
    <section style={{ ...S.section, background: alt ? C.surface : 'transparent' }}>
      <div style={S.wrap}>{children}</div>
    </section>
  );
}

/* ============================================================
   Content
   ============================================================ */
const STEPS = [
  {
    title: 'Register the unit',
    body: 'Enter factory details, state, and CTO expiry date. EcoTrace tracks the renewal countdown from that day forward.',
  },
  {
    title: 'Log the day',
    body: 'An operator records pH, water, power, sludge, and fuel use once a day, in their own language, from a phone. Location and server timestamp are captured automatically.',
  },
  {
    title: 'Attach the evidence',
    body: 'Upload utility and disposal bills. Text is read automatically and low-confidence reads are flagged rather than guessed.',
  },
  {
    title: 'Produce the statutory formats',
    body: 'Generate Form 3, 4, and 5 drafts, notice-response drafts, and a flying-squad inspection dossier from records already on file.',
  },
  {
    title: 'Share with buyers, with consent',
    body: 'Approve a buyer request to release a summary Green Passport. Buyers see aggregated figures only — never the raw daily log.',
  },
];

const IS_LIST = [
  'A daily record-keeping system with tamper-evident, hash-chained entries',
  'A generator of MPCB and CPCB statutory report drafts',
  'A carbon accounting engine covering Scope 1 and Scope 2, location and market based',
  'A consent-controlled channel for sharing supplier ESG summaries',
  'Available in English, Marathi, and Hindi across every screen',
];

const IS_NOT_LIST = [
  'Not a certification or accreditation body',
  'Not a substitute for a licensed environmental consultant',
  'Not connected to any regulator’s systems — filings remain your responsibility',
  'Not an independent assurance or third-party audit provider',
  'Not a continuous emissions monitoring system; data is entered, not sensed',
];

const AUDIENCES = [
  {
    title: 'MSME factories',
    body: 'Keep a defensible daily record, meet consent deadlines, and answer an inspection with evidence already organised.',
  },
  {
    title: 'Enterprises and buyers',
    body: 'Collect verified environmental summaries from your MSME supply base for BRSR value-chain reporting, with supplier consent at every step.',
  },
  {
    title: 'Industry bodies',
    body: 'Give member units a common compliance baseline and see readiness across a cluster without collecting paper.',
  },
];

/* ============================================================
   Styles
   ============================================================ */
const S = {
  page: {
    background: C.bg,
    color: C.text,
    minHeight: '100vh',
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    WebkitFontSmoothing: 'antialiased',
  },

  wrap: { maxWidth: MAXW, margin: '0 auto', padding: '0 24px' },
  readCol: { maxWidth: READW },

  /* nav */
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    borderBottom: '1px solid transparent',
    backdropFilter: 'blur(10px)',
    transition: 'background 180ms ease, border-color 180ms ease',
  },
  navInner: {
    maxWidth: MAXW,
    margin: '0 auto',
    padding: '14px 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    color: C.text,
    textDecoration: 'none',
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: '-0.01em',
  },
  brandMark: { fontSize: 17 },
  navLink: {
    color: C.muted,
    textDecoration: 'none',
    fontSize: 14,
    fontWeight: 500,
    padding: '8px 14px',
    border: `1px solid ${C.border}`,
    borderRadius: 8,
  },

  /* hero */
  hero: { padding: '96px 0 88px' },
  eyebrow: {
    color: C.faint,
    fontSize: 13,
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    margin: '0 0 22px',
  },
  h1: {
    fontSize: 'clamp(34px, 6.2vw, 60px)',
    lineHeight: 1.08,
    fontWeight: 700,
    letterSpacing: '-0.03em',
    margin: '0 0 24px',
    color: C.text,
  },
  h1Line2: { color: C.muted },
  heroSub: {
    fontSize: 18,
    lineHeight: 1.65,
    color: C.muted,
    maxWidth: READW,
    margin: '0 0 36px',
  },
  ctaRow: { display: 'flex', flexWrap: 'wrap', gap: 12 },
  ctaPrimary: {
    background: C.green,
    color: '#ffffff',
    padding: '13px 26px',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'background 150ms ease',
  },
  ctaSecondary: {
    color: C.text,
    padding: '13px 26px',
    borderRadius: 8,
    border: `1px solid ${C.border}`,
    fontSize: 15,
    fontWeight: 500,
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'border-color 150ms ease',
  },
  audienceLine: {
    marginTop: 30,
    fontSize: 14,
    color: C.faint,
  },

  /* sections */
  section: { padding: '80px 0', borderTop: `1px solid ${C.border}` },
  h2: {
    fontSize: 'clamp(24px, 3.4vw, 32px)',
    fontWeight: 650,
    letterSpacing: '-0.02em',
    lineHeight: 1.2,
    margin: '0 0 24px',
    color: C.text,
  },
  body: {
    fontSize: 16.5,
    lineHeight: 1.7,
    color: C.muted,
    margin: '0 0 18px',
  },

  /* steps */
  steps: { listStyle: 'none', margin: 0, padding: 0, maxWidth: 780 },
  step: {
    display: 'flex',
    gap: 22,
    padding: '22px 0',
    borderTop: `1px solid ${C.border}`,
  },
  stepNum: {
    color: C.faint,
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: '0.05em',
    fontVariantNumeric: 'tabular-nums',
    paddingTop: 4,
    minWidth: 28,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: 600,
    margin: '0 0 8px',
    color: C.text,
    letterSpacing: '-0.01em',
  },
  stepBody: { fontSize: 15.5, lineHeight: 1.65, color: C.muted, margin: 0 },

  /* is / is not */
  twoCol: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 20,
  },
  card: {
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: '26px 24px',
    background: 'rgba(255,255,255,0.015)',
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.09em',
    textTransform: 'uppercase',
    color: C.faint,
    margin: '0 0 18px',
  },
  list: { listStyle: 'none', margin: 0, padding: 0 },
  listItem: {
    fontSize: 15,
    lineHeight: 1.6,
    color: C.muted,
    padding: '10px 0',
    borderTop: `1px solid ${C.border}`,
  },

  /* audiences */
  threeCol: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 20,
  },
  audCard: { paddingTop: 20, borderTop: `1px solid ${C.border}` },
  audTitle: {
    fontSize: 16,
    fontWeight: 600,
    margin: '0 0 10px',
    color: C.text,
  },
  audBody: { fontSize: 15, lineHeight: 1.65, color: C.muted, margin: 0 },

  /* footer */
  footer: { borderTop: `1px solid ${C.border}`, padding: '52px 0 40px' },
  footerInner: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  footerBrand: { fontSize: 15, fontWeight: 600, margin: '0 0 6px', color: C.text },
  footerMeta: { fontSize: 14, color: C.muted, margin: 0 },
  footerLinks: { display: 'flex', flexWrap: 'wrap', gap: 20 },
  footerLink: { color: C.muted, fontSize: 14, textDecoration: 'none' },
  disclaimerWrap: { marginTop: 36, paddingTop: 24, borderTop: `1px solid ${C.border}` },
  disclaimer: { fontSize: 13, lineHeight: 1.65, color: C.faint, margin: 0, maxWidth: 800 },
};

const GLOBAL_CSS = `
  * { box-sizing: border-box; }
  body { margin: 0; }
  a { -webkit-tap-highlight-color: transparent; }
  a:focus-visible { outline: 2px solid ${C.green}; outline-offset: 3px; border-radius: 6px; }
  .cta-primary:hover { background: ${C.greenHover} !important; }
  .cta-secondary:hover { border-color: #33404d !important; }
  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; animation: none !important; }
  }
  @media (max-width: 640px) {
    section { padding: 56px 0 !important; }
  }
`;
