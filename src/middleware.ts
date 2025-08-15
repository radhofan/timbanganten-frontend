import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "./lib/auth";

const protectedRoutes = ["/admin/layanan/histori", "/admin/layanan/pesan"];

function isProtectedPath(pathname: string) {
  return protectedRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"));
}

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;

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

  // Retry mechanism: try to get token up to 3 times
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const t = getTokenFromRequest(req);
      if (typeof t === "string") {
        token = t;
        break;
      }
    } catch {
      // ignore errors
    }
    // wait 100ms before retrying
    await new Promise((resolve) => setTimeout(resolve, 100));
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
