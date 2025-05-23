import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try{
        const { id, org_id } = await req.json();
        console.log(`Deleting product with ID: ${id} for org ID: ${org_id}`);
        const response = await fetch("http://localhost:8003/delete-product", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: id, org_id: org_id})
        });

        const data = await response.json();

        return NextResponse.json(data)
    }catch(error){

        console.error("Error in deleteBasket API:", error);
        return Response.json({ error: "Internal Server Error" }, { status: 500 });

    }


}