import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        const payload = await req.json();
    console.log("Payload for API route: ", JSON.stringify(payload,null, 2));
    const response = await fetch(`http://localhost:8003/update-product`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    return NextResponse.json({ status: response.status });
    } catch (error) {
        return NextResponse.json({ status: 500, error: "Failed to update product" });
    }
}