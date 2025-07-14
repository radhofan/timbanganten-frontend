// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   if (pathname.startsWith('/admin/login')) {
//     return NextResponse.next();
//   }

//   const protectedRoutes = [
//     '/admin/layanan/pesan',
//     '/admin/layanan/histori',
//   ];

//   const isProtected = protectedRoutes.some((route) =>
//     pathname.startsWith(route)
//   );

//   const isOnMainAdmin = pathname === '/admin' || pathname === '/admin/';

//   if (isProtected || isOnMainAdmin) {
//     const authRole = request.cookies.get('auth-role')?.value;
//     const token = request.cookies.get('token')?.value;

//     if (isProtected && (!authRole || authRole === 'guest' || (authRole === 'admin' && !token))) {
//       return NextResponse.redirect(new URL('/admin/login/admin?expired=true', request.url));
//     }
  
//     if (isOnMainAdmin && authRole === 'admin' && !token) {
//       return NextResponse.redirect(new URL('/admin/login/admin?expired=true', request.url));
//     }
  
//     if (token && authRole === 'admin') {
//       try {
//         const tokenPayload = JSON.parse(atob(token.split('.')[1]));
//         const currentTime = Math.floor(Date.now() / 1000);
      
//         if (tokenPayload.exp && tokenPayload.exp < currentTime) {
//           const response = NextResponse.redirect(new URL('/admin/login/admin?expired=true', request.url));
//           response.cookies.delete('token');
//           response.cookies.delete('auth-role');
//           return response;
//         }
//       } catch {
//         const response = NextResponse.redirect(new URL('/admin/login/admin?expired=true', request.url));
//         response.cookies.delete('token');
//         response.cookies.delete('auth-role');
//         return response;
//       }
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// };

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow login and main admin page
  if (pathname.startsWith('/admin/login') || pathname === '/admin' || pathname === '/admin/') {
    return NextResponse.next();
  }

  // Define protected routes
  const protectedRoutes = [
    '/admin/layanan/pesan',
    '/admin/layanan/histori',
  ];

  // Check if current route is protected
  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));

  if (isProtected) {
    const token = request.cookies.get('token')?.value;

    // If no token, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login/admin', request.url));
    }

    // Verify token validity
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      
      // If token expired
      if (tokenPayload.exp && tokenPayload.exp < currentTime) {
        throw new Error('Token expired');
      }
    } catch {
      // Clear invalid token and redirect
      const response = NextResponse.redirect(new URL('/admin/login/admin?expired=true', request.url));
      response.cookies.delete('token');
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};