import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "./lib/auth";

const protectedRoutes = ["/admin/layanan/histori", "/admin/layanan/pesan"];

function isProtectedPath(pathname: string) {
  return protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"));
}

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

  // Allow public paths and static files
  if (
    pathname === "/admin/login/admin" ||
    pathname === "/admin/login/approver" ||
    pathname === "/admin/login/pengawas" ||
    pathname.includes(".") ||
    pathname === "/api/authAdmin" ||
    pathname === "/api/authPengawas" ||
    pathname === "/api/authApprover"
  ) {
    return NextResponse.next();
  }

  let token: string | undefined;

  try {
    const t = getTokenFromRequest(req);
    if (typeof t === "string") token = t;
  } catch {
    token = undefined;
  }

  if (!token) {
    if (isProtectedPath(pathname)) {
      return NextResponse.redirect(new URL("/admin/login/admin", origin));
    }
    return NextResponse.next();
  }

  let user: { role?: string } | null = null;
  try {
    user = await verifyToken(token);
  } catch {
    user = null;
  }

  if (!user?.role && isProtectedPath(pathname)) {
    return NextResponse.redirect(new URL("/admin/login/admin", origin));
  }

  return NextResponse.next();
}
