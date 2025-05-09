import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const {session_id} = await req.json();
        console.log("session_id in API ROUTE: ", session_id)
        const response = await fetch("http://localhost:8001/recent-views", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                session_id: session_id
            })
        });

        if (!response.ok) {
            throw new Error();
        }

        const data = await response.json();

        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in getContinueViewing API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
