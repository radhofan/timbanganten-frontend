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

    const pengawas = await prisma.pengawas.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!pengawas) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, pengawas.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        pengawasId: pengawas.id,
        email: pengawas.email,
        role: 'pengawas',
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    // ✅ Create the response object
    const response = NextResponse.json({
      message: 'Login successful',
      pengawas: {
        id: pengawas.id,
        email: pengawas.email,
        name: pengawas.name,
        role: 'pengawas',
      },
    });

    // ✅ Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
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
