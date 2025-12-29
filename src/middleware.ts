import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "./lib/auth";

const protectedRoutes = ["/layanan/penanggung-jawab", "/layanan/pesan"];

function isProtectedPath(pathname: string) {
  return protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname === "/login/admin" ||
    pathname === "/login/approver" ||
    pathname === "/login/pengawas" ||
    pathname.includes(".") ||
    pathname === "/api/authAdmin" ||
    pathname === "/api/authPengawas" ||
    pathname === "/api/authApprover"
  ) {
    return NextResponse.next();
  }

  const token = getTokenFromRequest(req);

  if (!token) {
    if (isProtectedPath(pathname)) {
      return NextResponse.redirect(new URL("/login/admin", req.url));
    }
    return NextResponse.next();
  }

  const user = await verifyToken(token);
  if (!user) {
    if (isProtectedPath(pathname)) {
      return NextResponse.redirect(new URL("/login/admin", req.url));
    }
    return NextResponse.next();
  }

  if (user.role) return NextResponse.next();
}
