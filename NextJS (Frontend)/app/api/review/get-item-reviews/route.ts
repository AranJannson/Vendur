import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const item_id = searchParams.get('item_id');


        const response = await fetch(`http://localhost:8000/reviews/${item_id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        });

        const json = await response.json();
        return NextResponse.json(json, { status: response.status });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ error: "Failed to get item reviews" }, { status: 500 });
    }
}