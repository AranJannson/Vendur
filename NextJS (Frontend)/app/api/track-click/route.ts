import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const { page } = await req.json();

        if (!page) {
            return NextResponse.json({ error: "Missing Page Details" }, { status: 400 });
        }

        const response = await fetch('http://host.docker.internal:8001/track-clicks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ page }),
        });

        if (!response.ok) {
            const error = await response.json();
            return NextResponse.json({ error: error }, { status: 500 });
        }

        return NextResponse.json({success: true}, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
