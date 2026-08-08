// app/page.js — Public Landing Page (Aug 2026, v3)
// v3 बदल: professional typography hierarchy (tagline हेच h1), body मजकूर डावीकडे,
// हिरवा रंग फक्त CTA साठी, nav मध्ये खरं icon (emoji नाही), CSS-only sticky nav
// (server component ठेवण्यासाठी — त्यामुळे SEO metadata export चालू राहतं).
// प्रत्येक दावा प्रत्यक्ष implemented feature शी जुळतो.

export const metadata = {
  title: 'EcoTrace India — Inspection-Ready Compliance. Buyer-Ready ESG Data.',
  description:
    'EcoTrace India helps Indian manufacturing MSMEs record daily environmental data, track CTO/consent deadlines, organize compliance evidence, and share factory-approved sustainability summaries with enterprise buyers — in English, Marathi, or Hindi.',
  metadataBase: new URL('https://ecotraceindia.com'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'EcoTrace India — Inspection-Ready Compliance. Buyer-Ready ESG Data.',
    description:
      'Daily environmental record-keeping, CTO deadline tracking, statutory report drafts, and consent-controlled supplier ESG summaries for Indian manufacturing MSMEs.',
    url: 'https://ecotraceindia.com',
    siteName: 'EcoTrace India',
    locale: 'en_IN',
    type: 'website',
  },
};

/* ---------- design tokens ---------- */
const BG = '#0b1014';
const SURFACE = '#111820';
const CARD = '#141c25';
const BORDER = '#1e2a35';
const TEXT = '#e8edf2';
const MUTED = '#93a1b0';
const FAINT = '#6b7885';
const GREEN = '#059669';

const READ = '700px';
const WRAP = '1060px';

/* ---------- small building blocks ---------- */

function Section({ children, alt = false, style = {} }) {
  return (
    <section
      style={{
        borderTop: `1px solid ${BORDER}`,
        backgroundColor: alt ? SURFACE : 'transparent',
        ...style,
      }}
    >
      <div
        style={{
          maxWidth: WRAP,
          margin: '0 auto',
          padding: 'clamp(48px, 8vw, 76px) 20px',
          textAlign: 'left',
        }}
      >
        {children}
      </div>
    </section>
  );
}

function Heading({ children }) {
  return (
    <h2
      style={{
        color: TEXT,
        fontSize: 'clamp(23px, 3.4vw, 30px)',
        fontWeight: 650,
        letterSpacing: '-0.02em',
        lineHeight: 1.22,
        margin: '0 0 22px 0',
      }}
    >
      {children}
    </h2>
  );
}

function Body({ children, style = {} }) {
  return (
    <p
      style={{
        color: MUTED,
        fontSize: '16px',
        lineHeight: 1.7,
        maxWidth: READ,
        margin: '0 0 16px 0',
        ...style,
      }}
    >
      {children}
    </p>
  );
}

function StepRow({ n, title, desc }) {
  return (
    <li
      style={{
        display: 'flex',
        gap: '20px',
        padding: '20px 0',
        borderTop: `1px solid ${BORDER}`,
      }}
    >
      <span
        style={{
          flexShrink: 0,
          minWidth: '26px',
          paddingTop: '3px',
          color: FAINT,
          fontSize: '13px',
          fontWeight: 600,
          letterSpacing: '0.05em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {n}
      </span>
      <div>
        <h3
          style={{
            margin: '0 0 7px 0',
            fontWeight: 600,
            fontSize: '16px',
            color: TEXT,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </h3>
        <p style={{ margin: 0, fontSize: '15px', color: MUTED, lineHeight: 1.65 }}>
          {desc}
        </p>
      </div>
    </li>
  );
}

function Card({ label, sub, items, children }) {
  return (
    <div
      style={{
        backgroundColor: CARD,
        border: `1px solid ${BORDER}`,
        borderRadius: '12px',
        padding: '24px 22px',
      }}
    >
      <p
        style={{
          margin: '0 0 6px 0',
          fontWeight: 600,
          fontSize: '16px',
          color: TEXT,
          letterSpacing: '-0.01em',
        }}
      >
        {label}
      </p>
      {sub ? (
        <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: FAINT, lineHeight: 1.6 }}>
          {sub}
        </p>
      ) : null}
      {items ? (
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map((t) => (
            <li
              key={t}
              style={{
                fontSize: '14.5px',
                lineHeight: 1.6,
                color: MUTED,
                padding: '9px 0',
                borderTop: `1px solid ${BORDER}`,
              }}
            >
              {t}
            </li>
          ))}
        </ul>
      ) : null}
      {children}
    </div>
  );
}

function PlainList({ items, style = {} }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: READ, ...style }}>
      {items.map((t) => (
        <li
          key={t}
          style={{
            fontSize: '15px',
            lineHeight: 1.6,
            color: MUTED,
            padding: '11px 0',
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

const CTA_PRIMARY = {
  display: 'inline-block',
  backgroundColor: GREEN,
  color: '#ffffff',
  fontWeight: 600,
  fontSize: '15px',
  padding: '13px 26px',
  borderRadius: '8px',
  textDecoration: 'none',
};

const CTA_SECONDARY = {
  display: 'inline-block',
  backgroundColor: 'transparent',
  color: TEXT,
  border: `1px solid ${BORDER}`,
  fontWeight: 500,
  fontSize: '15px',
  padding: '13px 26px',
  borderRadius: '8px',
  textDecoration: 'none',
};

const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body { margin: 0; }
  a { -webkit-tap-highlight-color: transparent; }
  a:focus-visible { outline: 2px solid ${GREEN}; outline-offset: 3px; border-radius: 6px; }
  .cta-primary:hover { background-color: #047857; }
  .cta-secondary:hover { border-color: #33404d; }
  .nav-link:hover { border-color: #33404d; }
  @media (prefers-reduced-motion: reduce) {
    * { transition: none !important; animation: none !important; }
  }
`;

/* ---------- page ---------- */

export default function LandingPage() {
  return (
    <main
      style={{
        backgroundColor: BG,
        color: TEXT,
        minHeight: '100vh',
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        WebkitFontSmoothing: 'antialiased',
      }}
    >
      <style>{GLOBAL_CSS}</style>

      {/* ---------- Top Nav (sticky, CSS-only) ---------- */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: 'rgba(11, 16, 20, 0.92)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: `1px solid ${BORDER}`,
        }}
      >
        <div
          style={{
            maxWidth: WRAP,
            margin: '0 auto',
            padding: '13px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <a
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '9px',
              textDecoration: 'none',
              color: TEXT,
            }}
          >
            <img
              src="/icons/icon-192.png"
              alt=""
              width="24"
              height="24"
              style={{ display: 'block', borderRadius: '5px' }}
            />
            <span style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '-0.01em' }}>
              EcoTrace India
            </span>
          </a>
          <a
            href="/login"
            className="nav-link"
            style={{
              color: MUTED,
              fontSize: '14px',
              fontWeight: 500,
              padding: '8px 15px',
              border: `1px solid ${BORDER}`,
              borderRadius: '8px',
              textDecoration: 'none',
            }}
          >
            Log in
          </a>
        </div>
      </nav>

      {/* ---------- Hero ---------- */}
      <header
        style={{
          maxWidth: WRAP,
          margin: '0 auto',
          padding: 'clamp(44px, 9vw, 92px) 20px clamp(52px, 9vw, 84px) 20px',
        }}
      >
        <p
          style={{
            color: FAINT,
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            margin: '0 0 20px 0',
          }}
        >
          Environmental compliance software for Indian MSMEs
        </p>

        <h1
          style={{
            fontSize: 'clamp(33px, 6vw, 58px)',
            lineHeight: 1.08,
            fontWeight: 700,
            letterSpacing: '-0.03em',
            margin: '0 0 22px 0',
            color: TEXT,
            maxWidth: '900px',
          }}
        >
          Inspection-ready compliance.
          <br />
          <span style={{ color: MUTED }}>Buyer-ready ESG data.</span>
        </h1>

        <p
          style={{
            fontSize: '17.5px',
            lineHeight: 1.65,
            color: MUTED,
            maxWidth: READ,
            margin: '0 0 34px 0',
          }}
        >
          EcoTrace helps Indian manufacturing MSMEs record daily environmental data,
          track CTO and consent deadlines, organise compliance evidence, and share
          factory-approved sustainability summaries with enterprise buyers.
        </p>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="/login" className="cta-primary" style={CTA_PRIMARY}>
            Log in / Get started
          </a>
          <a
            href="mailto:dhiraj@ectotraceindia.com?subject=EcoTrace%20India%20-%20Inquiry"
            className="cta-secondary"
            style={CTA_SECONDARY}
          >
            Contact us
          </a>
        </div>

        <p style={{ marginTop: '28px', fontSize: '14px', color: FAINT }}>
          For MSME factories, enterprise buyers, and industry bodies.
        </p>
      </header>

      {/* ---------- Problem ---------- */}
      <Section>
        <Heading>Built for the Indian factory floor</Heading>
        <Body>
          Environmental records are created every day. At most Indian MSMEs they still
          live in paper registers, spreadsheets, and scattered messages — with no
          timestamp integrity and no straightforward way to produce the statutory
          formats an inspector asks for.
        </Body>
        <Body style={{ marginBottom: 0 }}>
          EcoTrace turns those daily records into structured, traceable, shareable
          compliance data. No new hardware, and no English-only interface — the entire
          platform works in English, Marathi, and Hindi.
        </Body>
      </Section>

      {/* ---------- Three stakeholders ---------- */}
      <Section alt>
        <Heading>One platform, three stakeholders</Heading>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '18px',
          }}
        >
          <Card
            label="For MSME factories"
            sub="Stay ready for inspections, renewals, and customer audits."
            items={[
              'Daily operator logbook, in English, Marathi, or Hindi',
              'CTO and consent countdown with advance alerts',
              'OCR-assisted document entry, with human confirmation',
              'Instant inspection-readiness dossier',
              'Transparent correction log — nothing is silently overwritten',
            ]}
          />
          <Card
            label="For enterprises and buyers"
            sub="Build a structured supplier environmental-data layer."
            items={[
              'Bulk supplier onboarding — one request to many at once',
              'Consent-based connections; suppliers approve every share',
              'Vendor compliance scorecard across approved suppliers',
              'Factory-approved Green Passport summary',
            ]}
          />
          <Card
            label="For industry bodies"
            sub="A shared digital backbone for member factories."
            items={[
              'Multi-language platform members can adopt without heavy IT spend',
              'A common compliance baseline across a cluster',
              'Members meet buyer-side ESG demands together, not alone',
            ]}
          />
        </div>
      </Section>

      {/* ---------- How it works ---------- */}
      <Section>
        <Heading>How EcoTrace works</Heading>
        <Body style={{ marginBottom: '34px' }}>
          Five steps, in the order a factory actually does them.
        </Body>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: '800px' }}>
          <StepRow
            n="01"
            title="Record"
            desc="Operators enter daily pH, water, electricity, fuel, and waste readings from a mobile-friendly dashboard."
          />
          <StepRow
            n="02"
            title="Validate"
            desc="Each record is GPS-tagged, server-timestamped, and chained into a tamper-evident sequence. Corrections are preserved transparently, never silently overwritten."
          />
          <StepRow
            n="03"
            title="Organise"
            desc="Uploaded bills and manifests are OCR-read, with a confidence gate that requires human confirmation before any figure is used."
          />
          <StepRow
            n="04"
            title="Prepare"
            desc="The platform assembles inspection-readiness dossiers and draft statutory-format reports from the same live data."
          />
          <StepRow
            n="05"
            title="Share"
            desc="Factories decide what to share and with whom. Approved buyers receive a curated summary — never raw daily records — and access can be revoked at any time."
          />
        </ol>
      </Section>

      {/* ---------- Green Passport ---------- */}
      <Section alt>
        <Heading>Green Passport</Heading>
        <Body style={{ marginBottom: '20px' }}>
          A factory-approved sustainability summary for enterprise buyers. It can
          include:
        </Body>
        <PlainList
          items={[
            'Factory identity, location, and CTO/consent status',
            'Data completeness score and last-log date',
            'Average pH, and total water and electricity use',
            'Scope 1, and Scope 2 on both a location-based and market-based method',
            'Scope 3 disclosure status',
          ]}
        />
        <p
          style={{
            color: FAINT,
            fontSize: '13.5px',
            lineHeight: 1.65,
            maxWidth: READ,
            marginTop: '22px',
            marginBottom: 0,
          }}
        >
          Scope 3 is disclosed as not currently tracked. EcoTrace does not estimate
          figures it has not measured.
        </p>
      </Section>

      {/* ---------- Controlled data sharing ---------- */}
      <Section>
        <Heading>Built for controlled data sharing</Heading>
        <PlainList
          items={[
            'Each factory’s data is isolated from every other factory’s',
            'Buyers see only approved summaries — never raw operational records',
            'A factory can revoke a buyer’s access at any time',
            'Corrections are recorded transparently, not silently overwritten',
            'OCR-extracted values require human confirmation before use',
            'Sensitive API credentials are handled server-side, never exposed to the browser',
            'EcoTrace does not automatically transmit data to government portals',
          ]}
        />
      </Section>

      {/* ---------- Why it matters ---------- */}
      <Section alt>
        <Heading>Why this matters for buyers</Heading>
        <Body>
          Enterprise sustainability and procurement teams increasingly need structured
          environmental data from their MSME suppliers — for BRSR, Scope 3 estimation,
          and supply-chain risk management. Under SEBI’s current framework, value-chain
          ESG disclosure for eligible top-250 listed entities is voluntary from
          FY 2025-26, with related third-party assessment voluntary from FY 2026-27.
        </Body>
        <Body style={{ color: TEXT, marginBottom: 0 }}>
          EcoTrace helps suppliers build the underlying evidence before that request
          becomes urgent.
        </Body>
      </Section>

      {/* ---------- Is / Is not ---------- */}
      <Section>
        <Heading>What EcoTrace is, and what it is not</Heading>
        <Body style={{ marginBottom: '30px' }}>
          Compliance software should be precise about its own limits. Ours are stated
          here, not buried in a footnote.
        </Body>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '18px',
          }}
        >
          <Card
            label="EcoTrace is"
            items={[
              'A factory environmental data-management platform',
              'A daily compliance logbook with tamper-evident records',
              'An inspection-readiness tool',
              'A consent-controlled supplier ESG data layer',
            ]}
          />
          <Card
            label="EcoTrace is not"
            items={[
              'A government portal',
              'A compliance certificate',
              'A legal or environmental consultancy',
              'A substitute for calibrated instruments or physical safety systems',
              'A guarantee against notices, penalties, or shutdowns',
            ]}
          />
        </div>
      </Section>

      {/* ---------- Final CTA ---------- */}
      <Section>
        <Heading>Start with one factory</Heading>
        <Body style={{ marginBottom: '28px' }}>
          Register a unit, log a day, and export the report an inspector would ask for.
          No installation and no new hardware — it runs on the phone already on the shop
          floor.
        </Body>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <a href="/login" className="cta-primary" style={CTA_PRIMARY}>
            Log in / Get started
          </a>
          <a
            href="mailto:dhiraj@ectotraceindia.com?subject=EcoTrace%20India%20-%20Inquiry"
            className="cta-secondary"
            style={CTA_SECONDARY}
          >
            Contact us
          </a>
        </div>
      </Section>

      {/* ---------- Footer ---------- */}
      <footer style={{ borderTop: `1px solid ${BORDER}`, padding: '48px 0 40px 0' }}>
        <div
          style={{
            maxWidth: WRAP,
            margin: '0 auto',
            padding: '0 20px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '22px',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <div>
            <p style={{ margin: '0 0 6px 0', fontSize: '15px', fontWeight: 600, color: TEXT }}>
              EcoTrace India Private Limited
            </p>
            <p style={{ margin: 0, fontSize: '14px', color: MUTED }}>
              Contact: 7378780745 &nbsp;·&nbsp; dhiraj@ectotraceindia.com
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            <a href="/terms" style={{ color: MUTED, fontSize: '14px', textDecoration: 'none' }}>
              Terms of Service
            </a>
            <a href="/privacy" style={{ color: MUTED, fontSize: '14px', textDecoration: 'none' }}>
              Privacy Policy
            </a>
            <a href="/login" style={{ color: MUTED, fontSize: '14px', textDecoration: 'none' }}>
              Log in
            </a>
          </div>
        </div>

        <div
          style={{
            maxWidth: WRAP,
            margin: '32px auto 0 auto',
            padding: '22px 20px 0 20px',
            borderTop: `1px solid ${BORDER}`,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: '13px',
              lineHeight: 1.65,
              color: FAINT,
              maxWidth: '860px',
            }}
          >
            EcoTrace India aggregates data supplied by the factory and prepares statutory
            formats. It does not certify compliance, calculate hazardous waste quantities,
            transmit data to government portals, or provide legal opinions. Factory
            management remains responsible for the accuracy of entries, equipment
            calibration, physical safety, and actual regulatory compliance. Draft reports
            and notice responses should be reviewed by the factory’s authorised person
            and, where appropriate, a qualified professional. We are in the early stages
            of pursuing ISO 27001 certification.
          </p>
        </div>
      </footer>
    </main>
  );
}
