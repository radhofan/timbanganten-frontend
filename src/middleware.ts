import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
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
    
    if (!authRole || authRole === 'guest') {
      return NextResponse.redirect(new URL('/admin/login/admin', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};