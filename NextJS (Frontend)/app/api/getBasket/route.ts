import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = await fetch("http://localhost:8002/getcookie", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error();
        }
        
        const text = await response.text(); // Get raw response
        const data = JSON.parse(text);
        console.log(data);

        return NextResponse.json(data)    
    } catch (error) {
        console.error("Error in getBasket API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
