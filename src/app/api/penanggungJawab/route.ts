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
  const data = await prisma.penanggung_Jawab.create({
    data: {
      id_user: body.id_user ?? null,
    },
  });
  return NextResponse.json(data);
}
