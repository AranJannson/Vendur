import {NextRequest, NextResponse} from "next/server"

export async function PUT(req: NextRequest) {
    try {
        const { id, discount } = await req.json();

        const response = await fetch("http://localhost:8003/apply-discount/", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id, discount: discount })
        });

        const data = await response.json();
        console.log("Response from apply-discount API:", data);

        return NextResponse.json(data)
    } catch (error) {
        console.error("Error in add-discount API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}