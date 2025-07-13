import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Always allow login page
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

  // Check if user is on main admin page - we want to validate their token here too
  const isOnMainAdmin = pathname === '/admin' || pathname === '/admin/';

  if (isProtected || isOnMainAdmin) {
    const authRole = request.cookies.get('auth-role')?.value;
    const token = request.cookies.get('token')?.value;
    
    // Check if user lacks proper authentication
    if (!authRole || authRole === 'guest' || (authRole === 'admin' && !token)) {
      return NextResponse.redirect(new URL('/admin/login/admin', request.url));
    }
    
    // Additional check: Validate token expiration if you have token structure
    if (token && authRole === 'admin') {
      try {
        // If your token is a JWT, you can decode and check expiration
        const tokenPayload = JSON.parse(atob(token.split('.')[1]));
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (tokenPayload.exp && tokenPayload.exp < currentTime) {
          // Token is expired, redirect to login
          const response = NextResponse.redirect(new URL('/admin/login/admin', request.url));
          // Clear expired cookies
          response.cookies.delete('token');
          response.cookies.delete('auth-role');
          return response;
        }
      } catch {
        // If token parsing fails, treat as invalid token
        const response = NextResponse.redirect(new URL('/admin/login/admin', request.url));
        response.cookies.delete('token');
        response.cookies.delete('auth-role');
        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};