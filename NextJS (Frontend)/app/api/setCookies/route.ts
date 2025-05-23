'use server'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { name, action, value } = await req.json();

        const { id, name: itemName, price, image, quantity, size, newSize } = value;

        const cookie = req.headers.get("cookie") || "";

        console.log("Cookie from request:", cookie);

        const response = await fetch("http://localhost:8002/setcookie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookie,
            },

            credentials: "include",
            body: JSON.stringify({
                name,
                value: {
                    id,
                    name: itemName,
                    price,
                    image,
                    quantity,
                    size,
                    newSize,
                },
                action,
            }),
        });

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in setCookie API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
