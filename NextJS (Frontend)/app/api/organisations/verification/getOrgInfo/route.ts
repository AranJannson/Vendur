import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    const backendResponse = await fetch('http://localhost:8003/organisation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const data = await backendResponse.json();
    return NextResponse.json(data);
}