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
        penanggungJawab: {
          makamStatusId: null,
        },
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
        makams: true,
        statuses: true,
      },
    });
  } else {
    users = await prisma.user.findMany({
      where: {
        penanggungJawab: {
          makamStatusId: null,
        },
      },
      include: {
        penanggungJawab: {
          include: {
            makam: true,
            makamStatus: true,
          },
        },
        makams: true,
        statuses: true,
      },
    });
  }

  return NextResponse.json(users);
}
