// Legacy redirect-based logout. Clears auth cookies then bounces to /admin.
// New code should call POST /api/logout instead.
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = NextResponse.redirect(new URL("/admin", request.url));

  res.cookies.set("token", "", { path: "/", maxAge: 0 });
  res.cookies.set("auth-role", "", { path: "/", maxAge: 0 });

  return res;
}
