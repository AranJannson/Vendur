import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { org_id } = await req.json();
    const backendResponse = await fetch('http://localhost:8003/verification-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ org_id }),
    });
    const data = await backendResponse.json();
    return NextResponse.json(data);
}