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
        penanggung_jawab: true,
        makams: true,
        statuses: true,
      },
    });

    if (!user || !user.penanggung_jawab) {
      return NextResponse.json({ error: "PJ not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  }

  let users;

  if (query) {
    users = await prisma.user.findMany({
      where: {
        penanggung_jawab: { isNot: null },
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { contact: { contains: query, mode: "insensitive" } },
        ],
      },
      include: {
        penanggung_jawab: true,
        makams: true,
        statuses: true,
      },
    });
  } else {
    users = await prisma.user.findMany({
      where: { penanggung_jawab: { isNot: null } },
      include: {
        penanggung_jawab: true,
        makams: true,
        statuses: true,
      },
    });
  }

  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const body = await request.json();

  const { name, contact, email, status, ktp_num } = body;

  const newUser = await prisma.user.create({
    data: {
      name,
      contact,
      email,
      status: status || "PESAN",
      ktp_num,
    },
  });

  const newPJ = await prisma.penanggung_Jawab.create({
    data: {
      id_user: newUser.id,
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
