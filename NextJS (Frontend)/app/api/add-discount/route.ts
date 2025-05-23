import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
  try {
    console.log("[add-discount PUT] Incoming request body:", await req.clone().json());

    const { id, discount } = await req.json();
    console.log("[add-discount PUT] Parsed id and discount:", id, discount);

    const response = await fetch("http://localhost:8003/apply-discount/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, discount }),
    });

    console.log("[add-discount PUT] Proxied to microservice, status:", response.status);

    const data = await response.json();
    console.log("[add-discount PUT] Response from apply-discount API:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("[add-discount PUT] Error in add-discount API route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}