import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const response = await fetch("http://localhost:8001/categoriesAverageItemPrice");

        if (!response.ok) {
            throw new Error("Failed to fetch categories average item price");
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error in API route /categoriesAverageItemPrice:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}