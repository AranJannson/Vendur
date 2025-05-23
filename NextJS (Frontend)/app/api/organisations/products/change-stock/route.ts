import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { item_id, quantity } = await req.json();

    const res = await fetch("http://localhost:8000/updateStock", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item_id, quantity }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "Failed to update item stock" }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API /change-stock:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}