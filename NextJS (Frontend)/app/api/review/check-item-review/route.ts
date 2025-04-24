import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

        const response = await fetch(`http://localhost:8000/checkIfItemHasReview`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const json = await response.json();
        return NextResponse.json(json, { status: response.status });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}