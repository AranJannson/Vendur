import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);

    const search = searchParams.get("query");
    const filters = searchParams.get("filters");


    if (!search) {
        return NextResponse.json({ error: "No search query provided" }, { status: 400 });
    }

    try {
        let url = `http://localhost:8000/search?query=${encodeURIComponent(search)}`;
        console.log(`filters: ${filters}`)
        if (filters !== null && filters !== undefined && filters !== "" && filters.length > 0 && filters !== "null") {
            url += `&filters=${encodeURIComponent(filters)}`;
        }
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "query": search,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            return NextResponse.json({ error: errorData.error }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 200 });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}