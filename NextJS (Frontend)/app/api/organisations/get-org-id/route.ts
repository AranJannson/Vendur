import { NextResponse } from "next/server";
import { stackServerApp } from "@/stack";

export async function GET() {
  try {
    const user = await stackServerApp.getUser({ or: 'redirect' });
    const allTeams = await user.listTeams();
    const orgId = allTeams[0]?.id;

    if (!orgId) {
      return NextResponse.json({ error: "User does not belong to any organization" }, { status: 400 });
    }

    return NextResponse.json({ orgId });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
  }
}