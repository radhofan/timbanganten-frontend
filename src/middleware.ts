import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "./lib/auth";

// All authenticated areas of the app. Anything under these paths requires a valid
// session cookie; otherwise the user is bounced to the admin login page.
const protectedRoutes = [
  "/layanan/penanggung-jawab",
  "/layanan/pesan",
  "/layanan/kontak",
  "/layanan/makam",
  "/layanan/pembayaran",
  "/layanan/denah",
];

// Public auth endpoints + login pages must always pass through. API auth/role checks
// for everything else are enforced inside individual route handlers (see lib/auth.ts:requireRole).
const publicPaths = new Set([
  "/login/admin",
  "/login/approver",
  "/login/pengawas",
  "/api/authAdmin",
  "/api/authApprover",
  "/api/authPengawas",
  "/api/logout",
  "/api/me",
]);

// Static assets identified by an extension (e.g. /favicon.ico, /_next/static/foo.js).
function isStaticAsset(pathname: string): boolean {
  const last = pathname.split("/").pop() ?? "";
  return last.includes(".");
}

function isProtectedPath(pathname: string): boolean {
  return protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"));
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (publicPaths.has(pathname) || isStaticAsset(pathname)) {
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
  if (!user && isProtectedPath(pathname)) {
    return NextResponse.redirect(new URL("/login/admin", req.url));
  }

  return NextResponse.next();
}
