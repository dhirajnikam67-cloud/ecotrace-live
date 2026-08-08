// app/privacy/page.js
export default function PrivacyPage() {
    const section = { marginBottom: '24px' };
    const heading = { color: '#34d399', fontSize: '16px', margin: '0 0 8px 0' };
    const body = { color: '#d1d5db', fontSize: '13px', lineHeight: '1.7', margin: 0 };

    return (
        <main style={{ minHeight: '100vh', backgroundColor: '#0b0f19', color: '#ffffff', fontFamily: 'sans-serif', padding: '24px 16px' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                <h1 style={{ fontSize: '22px', marginBottom: '4px' }}>Privacy Policy</h1>
                <p style={{ color: '#6b7280', fontSize: '12px', marginBottom: '28px' }}>EcoTrace India Private Limited — Last updated: August 2026</p>

                <div style={section}>
                    <h2 style={heading}>1. What We Collect</h2>
                    <p style={body}>Account details (email, factory name, location, state), daily operational data you enter (pH, water discharge, electricity use, sludge quantity, fuel use), device GPS coordinates captured at the moment you save a daily entry (used to timestamp/geotag records for audit purposes), and uploaded documents (utility bills, manifests) processed via OCR to assist classification. If you register as a buyer, we also collect your company name, industry, and contact details.</p>
                </div>

                <div style={section}>
                    <h2 style={heading}>2. How We Use It</h2>
                    <p style={body}>To generate your statutory-format reports and Green Passport summary, to compute completeness and consistency metrics, to maintain the tamper-evident record of your daily entries, and — only with your explicit approval per buyer — to compute a curated summary shared with that buyer. We do not sell your data to any third party.</p>
                </div>

                <div style={section}>
                    <h2 style={heading}>3. Who Can See What</h2>
                    <p style={body}>Your raw daily logs are visible only to your own account. A buyer you have approved sees a computed summary only — never your raw entries. EcoTrace India's own team may access data to provide support or investigate reported issues.</p>
                </div>

                <div style={section}>
                    <h2 style={heading}>4. Location Data</h2>
                    <p style={body}>GPS coordinates are captured only when you actively save a daily log entry (with your browser's location permission), to geotag that record. We do not track your location in the background or between entries.</p>
                </div>

                <div style={section}>
                    <h2 style={heading}>5. Data Storage & Security</h2>
                    <p style={body}>Data is stored with Supabase (PostgreSQL) using row-level security so that each factory can only read its own records, and OCR processing uses Google Cloud Vision via a server-side key that never reaches your browser. EcoTrace India does not currently hold ISO 27001 or other third-party security certification.</p>
                </div>

                <div style={section}>
                    <h2 style={heading}>6. Your Choices</h2>
                    <p style={body}>You can revoke a buyer's access at any time from your dashboard. To request deletion of your account and associated data, contact us using the details below.</p>
                </div>

                <div style={section}>
                    <h2 style={heading}>7. Contact</h2>
                    <p style={body}>EcoTrace India Private Limited | Contact: 7378780745 | dhiraj@ectotraceindia.com</p>
                </div>

                <p style={{ color: '#f59e0b', fontSize: '11px', marginTop: '32px', fontStyle: 'italic' }}>
                    Note: This is a working draft prepared for the pilot phase. Please have it reviewed by a qualified legal counsel (including for DPDP Act 2023 compliance) before broader public launch or enterprise contracting.
                </p>
            </div>
        </main>
    );
}
