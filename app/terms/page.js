// app/terms/page.js
export default function TermsPage() {
    const section = { marginBottom: '24px' };
    const heading = { color: '#34d399', fontSize: '16px', margin: '0 0 8px 0' };
    const body = { color: '#d1d5db', fontSize: '13px', lineHeight: '1.7', margin: 0 };

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#ffffff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '22px', marginBottom: '4px' }}>Terms of Service</h1>
                <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '28px' }}>EcoTrace India Private Limited — Last updated: August 2026</p>

                <div style={section}>
                    <h2 style={heading}>1. What EcoTrace India Is</h2>
                    <p style={body}>EcoTrace India is a compliance data-management platform that helps factories record daily operational data (water, power, sludge, fuel use), generate statutory-format reports, and share a curated ESG summary ("Green Passport") with buyers who request it. EcoTrace India aggregates data supplied by the factory and prepares statutory formats. It does not certify compliance, calculate hazardous waste quantities on the factory's behalf, transmit data to government portals, or provide legal opinions. Physical safety protocols, hardware calibration, and actual regulatory compliance remain the sole responsibility of the factory's management.</p>
                </div>

                <div style={section}>
                    <h2 style={heading}>2. Your Account & Data Entry</h2>
                    <p style={body}>You are responsible for the accuracy of the data you or your operators enter. EcoTrace India records a tamper-evident hash of each daily entry so that entries cannot be silently altered after saving, but this proves data has not been changed after entry — it does not verify that the entry was accurate when made. One factory account maps to one factory profile; if you need to change your registered details, use the Edit function rather than creating a new account.</p>
                </div>

                <div style={section}>
                    <h2 style={heading}>3. Data Ownership</h2>
                    <p style={body}>The operational data you enter — daily readings, uploaded documents, correction records, and any other information you submit — remains your property. EcoTrace India does not claim ownership of your data. We are granted a limited license to store, process, and use this data solely to operate the platform: generating your reports, computing completeness and emission figures, maintaining the tamper-evident record, and — only where you have given consent to a specific buyer — computing the summary shared with that buyer. We do not sell your data, and we do not use it for any purpose beyond providing the service to you and the buyers you have approved. If you close your account, you may request a copy of your data or its deletion, subject to any retention we are legally required to keep and to summaries already shared with buyers under a consent you gave at the time.</p>
                </div>

                <div style={section}>
                    <h2 style={heading}>4. Sharing Data with Buyers</h2>
                    <p style={body}>Your daily operational records are never shared with any buyer automatically. A buyer can request access to your factory's summary; nothing is visible to them until you explicitly approve that request, and you can revoke access at any time. Approved buyers see a computed summary (completeness, averages, totals, estimated emissions) — never your raw daily log entries.</p>
                </div>

                <div style={section}>
                    <h2 style={heading}>5. Emission Estimates</h2>
                    <p style={body}>Scope 1 and Scope 2 emission figures are estimates calculated from standard published emission factors (GHG Protocol, CEA CO2 Baseline Database) applied to the data you enter. Some factors (e.g. furnace oil, coal) are approximate industry-standard values, flagged as such in the interface. These estimates are not independently assured and should be verified with a qualified consultant before use in statutory or investor-facing filings.</p>
                </div>

                <div style={section}>
                    <h2 style={heading}>6. Service Availability</h2>
                    <p style={body}>EcoTrace India is provided on an as-is basis during its pilot phase. We aim for high availability but do not guarantee uninterrupted access. Keep your own backup of critical compliance records where required by law.</p>
                </div>

                <div style={section}>
                    <h2 style={heading}>7. Changes to These Terms</h2>
                    <p style={body}>We may update these Terms as the platform evolves. Continued use after an update means you accept the revised Terms. Material changes will be communicated via the contact details on file.</p>
                </div>

                <div style={section}>
                    <h2 style={heading}>8. Contact</h2>
                    <p style={body}>EcoTrace India Private Limited | Contact: 7378780745 | dhiraj@ectotraceindia.com</p>
                </div>

                <p style={{ color: '#f59e0b', fontSize: '11px', marginTop: '32px', fontStyle: 'italic' }}>
                    Note: This is a working draft prepared for the pilot phase. Please have it reviewed by a qualified legal counsel before broader public launch or enterprise contracting.
                </p>
            </div>
        </main>
    );
}
