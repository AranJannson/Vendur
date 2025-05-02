import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, org_id, shippingMethod, productInfo } = await req.json();
    const backendResponse = await fetch('http://localhost:5078/admin/acceptVerificationRequest', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, org_id, shippingMethod, productInfo }),
    });
    const data = await backendResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
  }
}
