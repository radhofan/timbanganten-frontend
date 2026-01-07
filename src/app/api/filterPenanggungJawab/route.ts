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

  let users;

  if (query) {
    users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { contact: { contains: query, mode: "insensitive" } },
        ],
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
  } else {
    users = await prisma.user.findMany({
      include: {
        penanggungJawab: {
          include: {
            makam: true,
            makamStatus: true,
          },
        },
      },
    });
  }

  return NextResponse.json(users);
}
