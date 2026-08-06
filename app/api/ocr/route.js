// app/api/ocr/route.js
// ---------------------------------------------------------------------------
// खरा OCR engine (Aug 2026 fix) — Module 3 चा आधीचा simulated/rule-based OCR इथे बदलला.
// हे server-side Next.js API route आहे — GOOGLE_VISION_API_KEY फक्त इथे, server वर वापरली जाते,
// browser/client कडे ती कधीच पाठवली जात नाही (Vercel env variable म्हणून साठवलेली आहे).
// Frontend (`app/page.js` मधलं handleFileChange) प्रत्येक अपलोड केलेली फाईल इथे पाठवतं आणि
// Google Cloud Vision च्या DOCUMENT_TEXT_DETECTION result वरून खरा मजकूर + confidence परत मिळवतं.
// ---------------------------------------------------------------------------

export async function POST(request) {
    const apiKey = process.env.GOOGLE_VISION_API_KEY;
    if (!apiKey) {
        return Response.json({ error: 'OCR is not configured on the server (missing GOOGLE_VISION_API_KEY).' }, { status: 500 });
    }

    let file;
    try {
        const formData = await request.formData();
        file = formData.get('file');
    } catch (err) {
        return Response.json({ error: 'Could not read uploaded file: ' + err.message }, { status: 400 });
    }

    if (!file) {
        return Response.json({ error: 'No file provided.' }, { status: 400 });
    }

    // 20 MB पेक्षा मोठी फाईल Vision API base64-request मध्ये अडचण करू शकते — आधीच थांबवा
    const MAX_BYTES = 20 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
        return Response.json({ error: 'File too large for OCR (max 20 MB).' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64Content = Buffer.from(arrayBuffer).toString('base64');

    let visionResponse;
    try {
        visionResponse = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                requests: [
                    {
                        image: { content: base64Content },
                        // DOCUMENT_TEXT_DETECTION हे बिल/फॉर्म सारख्या dense-text कागदपत्रांसाठी
                        // TEXT_DETECTION पेक्षा जास्त अचूक असतं, आणि प्रत्येक पानाचा confidence score देतं.
                        features: [{ type: 'DOCUMENT_TEXT_DETECTION' }],
                    },
                ],
            }),
        });
    } catch (err) {
        return Response.json({ error: 'Could not reach Google Vision API: ' + err.message }, { status: 502 });
    }

    if (!visionResponse.ok) {
        const errBody = await visionResponse.text();
        return Response.json({ error: `Vision API error (${visionResponse.status}): ${errBody}` }, { status: 502 });
    }

    const visionData = await visionResponse.json();
    const result = visionData.responses?.[0];

    if (result?.error) {
        return Response.json({ error: 'Vision API returned an error: ' + result.error.message }, { status: 502 });
    }

    const text = result?.fullTextAnnotation?.text || '';
    // pages[0].confidence हे 0-1 दरम्यान असतं — बाकी कोड (OCR_CONFIDENCE_THRESHOLD = 70) टक्केवारीत
    // गृहीत धरतो, म्हणून ×100 करून पाठवतो. मजकूरच सापडला नाही तर confidence 0 धरतो — कमी असल्याने
    // आपोआप "manual review आवश्यक" या मार्गाने जाईल, false "high confidence" दाखवणार नाही.
    const pageConfidence = result?.fullTextAnnotation?.pages?.[0]?.confidence;
    const confidencePct = text && typeof pageConfidence === 'number' ? Math.round(pageConfidence * 100) : 0;

    return Response.json({ text, confidencePct });
}
