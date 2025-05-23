import {NextResponse} from "next/server";

export async function POST(req: Request) {
  try {
    const { item_id, user_id } = await req.json();

    if (!user_id || !item_id) {
      return NextResponse.json({ error: "Missing user_id or item_id" }, { status: 400 });
    }

    const response = await fetch("http://localhost:8001/record-view", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item_id, user_id }),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Track-view API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
