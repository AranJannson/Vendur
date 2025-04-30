import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { org_id } = await req.json();

    const backendResponse = await fetch('http://localhost:5078/admin/check-request-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ org_id }),
    });

    const text = await backendResponse.text();
    const data = text ? JSON.parse(text) : false;

    return NextResponse.json(data);
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json({ error: "Failed to fetch status" }, { status: 500 });
  }
}
