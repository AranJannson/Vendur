import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { payload } = await req.json();
    const backendResponse = await fetch('http://localhost:8003/request-verification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload }),
    });
    const data = await backendResponse.json();
    return NextResponse.json(data);
}