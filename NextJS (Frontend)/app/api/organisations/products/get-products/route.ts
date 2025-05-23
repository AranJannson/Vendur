import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { org_id } = await req.json();

    const res = await fetch("http://localhost:8000/getOrgItems", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ org_id }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data.message || "Failed to fetch items" }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in API /getOrgItems:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}