import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file');

        // सिमुलेशन डेटा जो फ्रंटएंडच्या अपेक्षेनुसार 'data' की सोबत आहे
        return NextResponse.json({
            success: true,
            data: {
                consumerNo: "CON-994820",
                billingMonth: "June 2026",
                unitsConsumed: "1450 kWh",
                amountPayable: "₹18,450",
                powerFactor: "0.94",
                calculatedVolume: "1450"
            },
            message: "OCR Scan Successful. Ready for Review & Edit."
        });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
