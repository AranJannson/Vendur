import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {

        const body = await req.json();
        const { id, size } = body;

        const response = await fetch("http://localhost:8002/deletevalue", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Cookie: req.headers.get("cookie") || "",
            },
            credentials: "include",
            body: JSON.stringify({ id, size }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Removed item");
        } else {
            console.error("Failed to remove item");
        }

        return NextResponse.json(data, { status: response.status });

    } catch (error) {
        console.error("Error in deleteItem API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
