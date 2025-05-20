import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { item_id, quantity } = await req.json();

        const response = await fetch("http://localhost:8000/modifyStockQuantity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ item_id, quantity }),
        });

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in updateStockQuantity API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
