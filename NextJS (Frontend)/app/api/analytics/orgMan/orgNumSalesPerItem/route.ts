import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const orgID = body.org_id;

        if (!orgID) {
            return NextResponse.json({ error: "org_id is required" }, { status: 400 });
        }

        const response = await fetch('http://localhost:8001/oneOrgSalesCountTest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ org_id: orgID }),
        });

        if (!response.ok) {
            throw new Error("Failed to fetch data from microservice");
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        console.error("Error in /api/avgItemPriceCategory:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
