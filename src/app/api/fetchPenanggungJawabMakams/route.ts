import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId } = body;

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const penanggungJawab = await prisma.penanggungJawab.findMany({
    where: {
      userId,
    },
    include: {
      makam: {
        include: {
          blok: true,
          jenazah: {
            include: {
              user: true,
            },
          },
        },
      },
      makamStatus: {
        include: {
          blok: true,
          jenazah: {
            include: {
              user: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(penanggungJawab);
}
