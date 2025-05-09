import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = await fetch("http://localhost:8001/recent-views", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error();
        }

        const text = await response.text();
        const data = JSON.parse(text);

        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in getContinueViewing API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
