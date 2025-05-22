import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try{
        const {basket, user_id, total_cost, delivery_address, full_name} = await req.json();

        const response = await fetch("http://localhost:8002/orderProcessing", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({basket, user_id, total_cost, delivery_address, full_name})
        });
        console.log(`Body: ${JSON.stringify({basket, user_id, total_cost, delivery_address, full_name})}`)
        console.log(`Response: ${response}`)

        const data = await response.json();

        return NextResponse.json(data)
    }catch(error){
        console.error("Error in orderProcessing API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });

    }


}