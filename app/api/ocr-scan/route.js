import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const body = await request.json();
        
        // पायलटसाठी Google Cloud Vision API सिम्युलेशन आणि एक्सट्रॅक्टेड डेटा
        return NextResponse.json({
            success: true,
            extractedData: {
                consumerNo: "CON-994820",
                billingMonth: "June 2026",
                unitsConsumed: "1450 kWh",
                amountPayable: "₹18,450",
                powerFactor: "0.94"
            },
            message: "OCR Scan Successful. Ready for Review & Edit."
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
