import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const { order_id } = await req.json();

        const response = await fetch("http://localhost:8002/getOrderDetails", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({order_id})
        });

        const data = await response.json();

        return NextResponse.json(data)
    }catch(error){

        console.error("Error in getOrderDetails API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });

    }


}