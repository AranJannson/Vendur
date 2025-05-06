import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const payload = await req.json();
    console.log("Payload for API route: ", JSON.stringify(payload,null, 2));
    const response = await fetch(`http://localhost:8003/products`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    return NextResponse.json({ status: response.status });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ status: 500, error: "Failed To Create Products" });
    }
}