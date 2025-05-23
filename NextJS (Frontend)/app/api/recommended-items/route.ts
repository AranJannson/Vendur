import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { user_id } = await req.json();
    console.log("[API /recommended-items] user_id:", user_id);

    if (!user_id) {
      console.warn("[API /recommended-items] Missing user_id");
      return NextResponse.json({ error: "Missing user_id" }, { status: 400 });
    }

    const resp = await fetch("http://localhost:8001/get-recommended-products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id }),
    });
    console.log("[API /recommended-items] proxied to analytics, status:", resp.status);

    if (!resp.ok) {
      const err = await resp.text();
      console.error("[API /recommended-items] analytics error:", err);
      return NextResponse.json({ error: "Analytics service failure" }, { status: 502 });
    }

    const items = await resp.json();
    console.log("[API /recommended-items] got items:", items);
    return NextResponse.json(items);
  } catch (err) {
    console.error("[API /recommended-items] unexpected error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
