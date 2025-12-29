import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const query = url.searchParams.get("query");

  if (id) {
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
      include: {
        penanggungJawab: true,
        makams: true,
        statuses: true,
      },
    });

    if (!user || !user.penanggungJawab) {
      return NextResponse.json({ error: "PJ not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  }

  let users;

  if (query) {
    users = await prisma.user.findMany({
      where: {
        penanggungJawab: { isNot: null },
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { contact: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        penanggungJawab: true,
        makams: true,
        statuses: true,
      },
    });
  } else {
    users = await prisma.user.findMany({
      where: { penanggungJawab: { isNot: null } },
      include: {
        penanggungJawab: true,
        makams: true,
        statuses: true,
      },
    });
  }

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { name, contact, email, status, ktpNum } = body;

  const newUser = await prisma.user.create({
    data: {
      name,
      contact,
      email,
      status: status || "PESAN",
      ktpNum,
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
