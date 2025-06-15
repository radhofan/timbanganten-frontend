import { prisma } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');
  const query = url.searchParams.get('query');

  let users;

  if (id) {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      include: {
        makams: true,
        statuses: true
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  }

  if (query) {
    users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { contact: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: {
        makams: true,
        statuses: true
      }
    });
  } else {
    users = await prisma.user.findMany({
      include: {
        makams: true,
        statuses: true
      }
    });
  }

  return NextResponse.json(users);
}

// POST new makam record
export async function POST(request: Request) {
  const body = await request.json();

  const { name, contact, email, status } = body;

  const newUser = await prisma.user.create({
    data: {
      name,
      contact,
      email,
      status: status || 'PESAN', // default to PESAN
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}

// PUT update user
export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const body = await request.json();
  const { name, contact, email, status } = body;

  const userId = Number(id);

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      makams: true,
      statuses: true,
    },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      contact,
      email,
      status,
    },
  });

  // 2. Update all related `makam` entries with new PJ info
  await prisma.makam.updateMany({
    where: { userId },
    data: {
      nama_penanggung_jawab: name,
      kontak_penanggung_jawab: contact,
    },
  });

  // 3. Update all related `makamStatus` entries as well
  await prisma.makamStatus.updateMany({
    where: { userId },
    data: {
      nama_penanggung_jawab: name,
      kontak_penanggung_jawab: contact,
    },
  });

  // 4. Return updated user + fresh related data
  const finalUser = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      makams: true,
      statuses: true,
    },
  });

  return NextResponse.json(finalUser);
}


