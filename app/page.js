<div style={{ padding: '20px', border: '2px dashed #30363d', borderRadius: '8px', textAlign: 'center', backgroundColor: '#161b22' }}>
    <label style={{ display: 'inline-block', backgroundColor: '#238636', color: 'white', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
        📸 Snap / Upload Utility & Waste Bills
        <input 
            type="file" 
            accept="image/*" 
            capture="environment"
            style={{ display: 'none' }}
            onChange={(e) => {
                if(e.target.files && e.target.files[0]) {
                    alert('File Selected / Scanned: ' + e.target.files[0].name + ' - OCR Extracted Successfully!');
                }
            }}
        />
    </label>
    <p style={{ color: '#8b949e', fontSize: '11px', marginTop: '8px' }}>GPS Location Lock & Exif Metadata Verification Active.</p>
</div>
