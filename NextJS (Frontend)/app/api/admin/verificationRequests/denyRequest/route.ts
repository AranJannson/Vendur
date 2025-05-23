import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const backendResponse = await fetch('http://localhost:5078/admin/denyVerificationRequest', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  if (!backendResponse.ok) {
    const errorText = await backendResponse.text();
    console.error("Error from backend:", errorText);
    return NextResponse.json({ error: "Backend error" }, { status: 500 });
  }
  const data = await backendResponse.json();
  return NextResponse.json(data);
}