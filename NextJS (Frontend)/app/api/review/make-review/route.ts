import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();

    const response = await fetch(`http://localhost:8000/review`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    return NextResponse.json({ status: response.status });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ status: 500, error: "Failed to create review" });
    }
}