export async function POST(req: Request) {
    try {

        const body = await req.json();

        const response = await fetch("http://localhost:8002/setcookie", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body),
        });

        const data = await response.json(); 

        if (!response.ok) {
            const errorData = await response.json();
            return Response.json({ error: errorData.error }, { status: response.status });
        }

        return Response.json({ data });

    } catch (error) {
        console.error("Error in addToCheckout API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
