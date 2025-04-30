import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
    }
    try {
        const backendResponse = await fetch(`http://localhost:8003/getProductByID?id=${id}`, {
            method: 'GET',
        });
        if (!backendResponse.ok) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }
        const data = await backendResponse.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
