import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = await fetch("http://localhost:5078/admin/getVerificationRequests", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error();
        }

        const text = await response.text();
        console.log("Response text:", text);
        const data = JSON.parse(text);

        return NextResponse.json(data)
    } catch (error) {
        console.error("Error:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}