import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const query = url.searchParams.get("query");

  let users;

  if (id) {
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  }

  if (query) {
    users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { contact: { contains: query, mode: "insensitive" } },
        ],
      },
    });
  } else {
    users = await prisma.user.findMany({});
  }

  return NextResponse.json(users);
}

// POST
export async function POST(request: Request) {
  const body = await request.json();

  const { name, contact, email, ktpNum } = body;

  const newUser = await prisma.user.create({
    data: {
      name,
      contact,
      email,
      ktpNum,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}

// PUT
export async function PUT(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const body = await request.json();
  const { name, contact, email } = body;

  const userId = String(id);

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
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
    },
  });

  const finalUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  return NextResponse.json(finalUser);
}
