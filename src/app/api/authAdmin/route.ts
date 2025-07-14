import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        adminId: admin.id,
        email: admin.email,
        role: 'admin',
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    const response = NextResponse.json({
      message: 'Login successful',
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name, 
        role: 'admin',
      },
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, 
      // maxAge: 15,
      path: '/',
    });

    response.cookies.set('auth-role', 'admin', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


// import { prisma } from '@/lib/db';
// import { NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const email = searchParams.get('email');
//     const password = searchParams.get('password');

//     if (!email || !password) {
//       return NextResponse.redirect(new URL('/admin/login/admin?error=missing', request.url));
//     }

//     const admin = await prisma.admin.findUnique({
//       where: { email: email.toLowerCase() },
//     });

//     if (!admin) {
//       return NextResponse.redirect(new URL('/admin/login/admin?error=invalid', request.url));
//     }

//     const isValidPassword = await bcrypt.compare(password, admin.password);
//     if (!isValidPassword) {
//       return NextResponse.redirect(new URL('/admin/login/admin?error=invalid', request.url));
//     }

//     const token = jwt.sign(
//       { adminId: admin.id, email: admin.email, role: 'admin' },
//       process.env.JWT_SECRET!,
//       { expiresIn: '1d' }
//     );

//     const res = NextResponse.redirect(new URL('/admin', request.url));

//     res.cookies.set('token', token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 60 * 60 * 24,
//       path: '/',
//     });

//     res.cookies.set('auth-role', 'admin', {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 60 * 60 * 24,
//       path: '/',
//     });

//     return res;
//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.redirect(new URL('/admin/login/admin?error=server', request.url));
//   }
// }
