import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { id } = await req.json();
        const response = await fetch("http://localhost:8003/getOrderStatus", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        });

        const data = await response.json();

        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in getOrderStatus API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
