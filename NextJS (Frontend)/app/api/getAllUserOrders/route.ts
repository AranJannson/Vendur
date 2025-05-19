import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { user_id } = await req.json();

        const response = await fetch("http://localhost:8002/getUserOrders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                user_id: user_id
            })
        });

        const data = await response.json();

        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in getUserOrders API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
