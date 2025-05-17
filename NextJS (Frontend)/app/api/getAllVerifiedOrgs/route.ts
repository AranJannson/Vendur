import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await fetch("http://localhost:8003/getVerifiedOrgs", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in getVerifiedOrgs API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
