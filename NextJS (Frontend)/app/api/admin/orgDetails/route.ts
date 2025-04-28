import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { id } = await req.json();
    const backendResponse = await fetch('http://localhost:5078/admin/orgDetails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    const data = await backendResponse.json();
    return NextResponse.json(data);
}