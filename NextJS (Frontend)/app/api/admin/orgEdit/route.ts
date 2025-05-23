import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
      const { id, name, email, description, telephone, website, address, is_verified } = await req.json();
      const backendResponse = await fetch('http://localhost:5078/admin/editOrgDetails', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, name, email, description, telephone, website, address, is_verified }),
      });
      const data = await backendResponse.json();
      return NextResponse.json(data, { status: 200 });
  }