import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const { item_id, session_id  } = await req.json();

        if (!session_id) {
            return NextResponse.json({ error: "Missing Session ID" }, { status: 400 });
        }

        if (!item_id) {
            return NextResponse.json({ error: "Missing Item ID" }, { status: 400 });
        }

        const response = await fetch('http://localhost:8001/record-view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item_id, session_id }),
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json({ error: error }, { status: 500 });
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
