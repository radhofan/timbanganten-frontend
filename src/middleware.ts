// TODO
// 1. Cek Redirect dari path selain login yang protected kalau tokennya valid maka next, kalau tidak lempar ke login
// 2. Cek kalau sudah di login page, kita cek apakah token atau tidak, kalau iya tidak usah login, cek token apa rolenya, kalau string guest masuk sbg guest, kalau token jwt maka verify
// 3. Semua page prot dan login page, middleware harus jalan

import { NextRequest, NextResponse } from "next/server";
import { verifyToken, getTokenFromRequest } from "./lib/auth";

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
    return NextResponse.redirect(new URL("/admin/login/admin", req.url));
  }

  const user = await verifyToken(token);
  if (!user) {
    return NextResponse.redirect(new URL("/admin/login/admin", req.url));
  }

  return NextResponse.next();
}
