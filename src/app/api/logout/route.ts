// Clear the auth cookie. Always 200 — there is nothing sensitive to gate here.
import { NextResponse } from "next/server";
import { clearAuthCookie } from "../../../lib/auth";

export async function POST(): Promise<NextResponse> {
  const response = NextResponse.json({ message: "Logout successful" });
  clearAuthCookie(response);
  return response;
}
