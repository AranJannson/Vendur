import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const item_id = await req.json();

    const res = await fetch("http://localhost:8003/getItemStock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item_id),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "Failed to fetch stock" }, { status: res.status });
    }

    const quantity = data[0]?.quantity ?? 0;

    return NextResponse.json({ stock: quantity });
  } catch (error) {
    console.error("Error in API /get-stock:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}