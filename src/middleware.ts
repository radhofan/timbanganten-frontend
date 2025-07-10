import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow access to login page
  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  const protectedRoutes = [
    '/admin/layanan/pesan',
    '/admin/layanan/histori',
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected) {
    const authRole = request.cookies.get('auth-role')?.value;
    const token = request.cookies.get('token')?.value;

    if (!authRole || authRole === 'guest' || (authRole === 'admin' && !token)) {
      return NextResponse.redirect(new URL('/admin/login/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
