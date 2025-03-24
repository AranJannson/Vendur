import { NextRequest, NextResponse } from "next/server";

interface Item {
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: string | null;
    image: string;
}

export async function GET(req: NextRequest) {
    try {
        const response = await fetch(`http://localhost:8002/getcookie`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error();
        }

        const data: Item[] = await response.json();

        return new NextResponse(JSON.stringify(data), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });    } catch (error) {
        console.error("Error in addToCheckout API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
