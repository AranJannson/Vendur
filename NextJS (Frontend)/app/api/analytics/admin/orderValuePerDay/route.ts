import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = await fetch('http://localhost:8001/orderValuePerDay');

        if (!response.ok) {
            throw new Error("Failed to fetch reviews");
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in API route /dailyReviewsSitewide:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}