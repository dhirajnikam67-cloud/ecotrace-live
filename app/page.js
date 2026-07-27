{/* 2. MOBILE AI OCR SCANNER */}
          {activeTab === 'ocrscanner' && (
            <div style={{ backgroundColor: '#1e293b', padding: '20px', borderRadius: '8px', border: '2px solid #22c55e' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ color: '#4ade80', margin: 0 }}>⚡ Mobile AI OCR &amp; dMRV Geo-Scan Engine</h3>
                <div style={{ backgroundColor: '#14532d', color: '#4ade80', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', border: '1px solid #22c55e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', backgroundColor: '#22c55e', borderRadius: '50%', display: 'inline-block', boxShadow: '0 0 8px #22c55e' }}></span>
                  LIVE GEO-TAGGING ACTIVE
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#94a3b8' }}>Snap bills, electricity meters, or waste manifests directly from mobile. Instant OCR extracts data, locks GPS location, and updates Form V.</p>
              
              <div style={{ backgroundColor: '#0f172a', padding: '20px', borderRadius: '8px', border: '1px dashed #22c55e', marginTop: '15px', textAlign: 'center' }}>
                <label style={{ display: 'inline-block', backgroundColor: '#22c55e', color: '#0f172a', padding: '12px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>
                  📷 Snap / Upload Utility &amp; Waste Bills
                  <input type="file" accept="image/*" onChange={handleSimulateOcrUpload} style={{ display: 'none' }} />
                </label>
                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '8px' }}>GPS Location Lock &amp; Anti-Fake Exif Protection Active.</p>
              </div>

              {ocrScanning && (
                <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#0f172a', borderRadius: '6px', borderLeft: '4px solid #eab308', color: '#fef08a' }}>
                  ⏳ AI OCR processing text, acquiring GPS coordinates &amp; computing dMRV carbon factors... Please wait.
                </div>
              )}

              {ocrResult && (
                <div style={{ marginTop: '15px', padding: '15px', backgroundColor: '#0f172a', borderRadius: '6px', borderLeft: '4px solid #22c55e' }}>
                  <h4 style={{ color: '#22c55e', margin: '0 0 8px 0' }}>✅ OCR &amp; Geo-Tag Verification Successful!</h4>
                  <p style={{ fontSize: '12px', margin: '3px 0', color: '#fff' }}><strong>File:</strong> {ocrResult.fileName}</p>
                  <p style={{ fontSize: '12px', margin: '3px 0', color: '#4ade80' }}><strong>Extracted Data:</strong> {ocrResult.extractedText}</p>
                  <p style={{ fontSize: '12px', margin: '3px 0', color: '#38bdf8' }}><strong>Locked GPS Geo-Tag:</strong> {ocrResult.geoTag}</p>
                  <p style={{ fontSize: '12px', margin: '3px 0', color: '#fef08a' }}><strong>dMRV Status:</strong> {ocrResult.dmrvOutput}</p>
                </div>
              )}
            </div>
          )}
