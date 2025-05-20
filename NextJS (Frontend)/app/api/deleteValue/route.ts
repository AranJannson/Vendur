import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        const { id, size } = await req.json();

        const response = await fetch("http://localhost:8002/deletevalue", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id, size }),
        });

        const data = await response.json();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in deleteBasketItem API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
