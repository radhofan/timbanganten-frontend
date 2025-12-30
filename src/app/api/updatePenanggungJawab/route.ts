import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const pjs = await prisma.penanggungJawab.findMany({
    where: query
      ? {
          user: {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { contact: { contains: query, mode: "insensitive" } },
            ],
          },
        }
      : undefined,
    include: {
      user: true,
      makam: true,
      makamStatus: true,
    },
  });
  return NextResponse.json(pjs);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pjId, makamId } = body;

    if (!pjId || !makamId) {
      return NextResponse.json({ error: "pjId and makamId are required" }, { status: 400 });
    }

    const existingPJ = await prisma.penanggungJawab.findUnique({
      where: { id: pjId },
    });

    if (!existingPJ) {
      return NextResponse.json({ error: "PenanggungJawab not found" }, { status: 404 });
    }

    const makam = await prisma.makam.findUnique({
      where: { id: makamId },
    });

    if (!makam) {
      return NextResponse.json({ error: "Makam not found" }, { status: 404 });
    }

    const updatedPJ = await prisma.penanggungJawab.update({
      where: { id: pjId },
      data: {
        makamId: makamId,
      },
      include: {
        user: true,
        makam: true,
      },
    });

    return NextResponse.json({ success: true, penanggungJawab: updatedPJ }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update PenanggungJawab" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const { pjId, makamId } = body;

    if (!pjId || !makamId) {
      return NextResponse.json({ error: "pjId and makamId are required" }, { status: 400 });
    }

    const pj = await prisma.penanggungJawab.findUnique({
      where: { id: pjId },
    });

    if (!pj) {
      return NextResponse.json({ error: "PenanggungJawab not found" }, { status: 404 });
    }

    if (pj.makamId !== makamId) {
      return NextResponse.json(
        { error: "Makam does not belong to this PenanggungJawab" },
        { status: 400 }
      );
    }

    const updatedPJ = await prisma.penanggungJawab.update({
      where: { id: pjId },
      data: {
        makamId: null,
      },
      include: {
        user: true,
        makam: true,
      },
    });

    return NextResponse.json({ success: true, penanggungJawab: updatedPJ }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to remove makam from PenanggungJawab" },
      { status: 500 }
    );
  }
}
