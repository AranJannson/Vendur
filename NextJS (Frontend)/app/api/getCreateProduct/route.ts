import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { product } = await req.json();
        const response = await fetch("http://localhost:8003/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({product})
        });

        const data = await response.json();

        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in getOrderByOrg API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
