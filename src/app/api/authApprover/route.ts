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

    const approver = await prisma.approver.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });

    if (!approver) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, approver.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      {
        approverId: approver.id,
        email: approver.email,
        role: 'approver',
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    );

    // ✅ Create the response object
    const response = NextResponse.json({
      message: 'Login successful',
      approver: {
        id: approver.id,
        email: approver.email,
        name: approver.name,
        role: 'approver',
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
