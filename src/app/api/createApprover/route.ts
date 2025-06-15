import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if approver already exists
    const existingApprover = await prisma.approver.findUnique({
      where: {
        email: email.toLowerCase()
      }
    });

    if (existingApprover) {
      return NextResponse.json(
        { error: 'Approver with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create approver
    const approver = await prisma.approver.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword
      }
    });

    // Return approver data (excluding password)
    const { ...approverData } = approver;

    return NextResponse.json({
      message: 'Approver created successfully',
      approver: approverData
    }, { status: 201 });

  } catch (error) {
    console.error('Approver creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
