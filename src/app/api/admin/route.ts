import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

// GET admin(s)
export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (id) {
    const admin = await prisma.admin.findUnique({
      where: { id: Number(id) },
    });

    if (!admin) {
      return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
    }

    return NextResponse.json(admin);
  }

  const admins = await prisma.admin.findMany();
  return NextResponse.json(admins);
}

// POST create new admin
export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, password } = body;

  const newAdmin = await prisma.admin.create({
    data: { name, email, password },
  });

  return NextResponse.json(newAdmin, { status: 201 });
}

// PUT update admin
export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  const body = await request.json();
  const { name, email, password } = body;

  const existingAdmin = await prisma.admin.findUnique({
    where: { id: Number(id) },
  });

  if (!existingAdmin) {
    return NextResponse.json({ error: 'Admin not found' }, { status: 404 });
  }

  const updatedAdmin = await prisma.admin.update({
    where: { id: Number(id) },
    data: { name, email, password },
  });

  return NextResponse.json(updatedAdmin);
}

// DELETE admin
export async function DELETE(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
  }

  try {
    await prisma.admin.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: 'Admin deleted successfully' });
  } catch (error) {
    console.error('Delete admin error:', error);
    return NextResponse.json({ error: 'Failed to delete admin' }, { status: 500 });
  }
}
