import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "./lib/auth";

const protectedRoutes = ["/admin/layanan/histori", "/admin/layanan/pesan"];

function isProtectedPath(pathname: string) {
  return protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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

  if (!token) {
    if (isProtectedPath(pathname)) {
      return NextResponse.redirect(new URL("/admin/login/admin", req.url));
    }
    return NextResponse.next();
  }

  const user = await verifyToken(token);
  if (!user) {
    if (isProtectedPath(pathname)) {
      return NextResponse.redirect(new URL("/admin/login/admin", req.url));
    }
    return NextResponse.next();
  }

  if (user.role) return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
  runtime: "nodejs",
};
