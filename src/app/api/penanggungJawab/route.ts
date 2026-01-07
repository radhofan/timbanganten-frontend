import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    // Get a single user by ID
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
      include: {
        penanggungJawab: {
          include: {
            makam: true,
            makamStatus: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "PJ not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  }

  // Get all users who have a PenanggungJawab
  const users = await prisma.user.findMany({
    where: {
      penanggungJawab: {
        isNot: null, // only users with a PJ record
      },
    },
    include: {
      penanggungJawab: {
        include: {
          makam: true,
          makamStatus: true,
        },
      },
    },
  });

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { name, contact, email, ktpNum, emergencyName, emergencyContact } = body;

  const newUser = await prisma.user.create({
    data: {
      name,
      contact,
      email,
      ktpNum,
      emergencyName,
      emergencyContact,
    },
  });

  const newPJ = await prisma.penanggungJawab.create({
    data: {
      userId: newUser.id,
    },
  });

  return NextResponse.json(
    {
      user: newUser,
      penanggung_jawab: newPJ,
    },
    { status: 201 }
  );
}
