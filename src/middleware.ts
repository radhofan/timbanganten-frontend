// middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "./lib/auth";

const protectedRoutes = ["/admin/layanan/histori", "/admin/layanan/pesan"];

function isProtectedPath(pathname: string) {
  return protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for login pages, API routes, and static files
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

  const token = getTokenFromRequest(req);
  const user = token ? await verifyToken(token) : null;

  let response: NextResponse;

  // If protected route and no valid user → redirect
  if (isProtectedPath(pathname)) {
    if (!token || !user) {
      response = NextResponse.redirect(new URL("/admin/login/admin", req.url));
    } else {
      response = NextResponse.next();
    }
  } else {
    response = NextResponse.next();
  }

  // ✅ Apply no-cache headers to ALL admin responses
  if (pathname.startsWith("/admin")) {
    response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}
