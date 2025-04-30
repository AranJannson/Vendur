import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { imageCount } = await req.json();

        const response = await fetch('http://localhost:8003/display-random-item-images', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ imageCount }),
        });

        if (!response.ok) {
            throw new Error(`Server Error: ${response.status}`);
        }

        const responseData = await response.json();

        console.log(responseData);

        return NextResponse.json({ message: "Success", data: responseData }, { status: 200 });
    } catch (err: any) {
        console.error("Error:", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
