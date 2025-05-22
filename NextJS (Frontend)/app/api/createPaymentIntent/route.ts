import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const { items } = await req.json();

        const response = await fetch("http://localhost:8002/createPaymentIntent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({items})
        });

        const data = await response.json();

        return NextResponse.json(data)
    }catch(error){

        console.error("Error in createPaymentIntent API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });

    }


}