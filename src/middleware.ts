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
    pathname === "/api/authApprover" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/")
  ) {
    return NextResponse.next();
  }

  // Only check auth for protected routes
  if (isProtectedPath(pathname)) {
    const token = getTokenFromRequest(req);

    if (!token) {
      const redirectUrl = new URL("/admin/login/admin", req.url);
      const response = NextResponse.redirect(redirectUrl, 307); // Use 307 for temporary redirect

      // Prevent any caching on Vercel
      response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate, private");
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");
      response.headers.set("X-Middleware-Auth", "required");

      return response;
    }

    try {
      const user = await verifyToken(token);

      if (!user || !user.role) {
        const redirectUrl = new URL("/admin/login/admin", req.url);
        const response = NextResponse.redirect(redirectUrl, 307);

        response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate, private");
        response.headers.set("Pragma", "no-cache");
        response.headers.set("Expires", "0");
        response.headers.set("X-Middleware-Auth", "failed");

        return response;
      }

      // Add auth success header
      const response = NextResponse.next();
      response.headers.set("X-Middleware-Auth", "success");
      return response;
    } catch {
      const redirectUrl = new URL("/admin/login/admin", req.url);
      const response = NextResponse.redirect(redirectUrl, 307);

      response.headers.set("Cache-Control", "no-cache, no-store, must-revalidate, private");
      response.headers.set("Pragma", "no-cache");
      response.headers.set("Expires", "0");
      response.headers.set("X-Middleware-Auth", "error");

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
  // Force middleware to run on all matched routes
  unstable_allowDynamic: ["/lib/**"],
};
