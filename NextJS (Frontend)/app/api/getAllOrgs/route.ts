import { NextResponse } from "next/server";

export async function GET(){

    try{
        const response = await fetch('http://localhost:5078/admin/getAllOrgs', {
            method: 'GET',
            cache: 'no-store',
        });

        const data = await response.json();

        return NextResponse.json(data)
    }catch (error){
        console.error("Error fetching getAllOrgs:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}