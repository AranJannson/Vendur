import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { org_id, name, description, email, telephone, address } = await req.json();
        const response = await fetch("http://localhost:8003/createOrg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({org_id, name, description, email, telephone, address})
        });

        const data = await response.json();

        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in createOrg API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
