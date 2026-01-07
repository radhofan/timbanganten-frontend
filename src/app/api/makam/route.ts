import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// GET
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    if (!id.trim()) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const makam = await prisma.makam.findUnique({
      where: { id },
      include: { jenazah: true, blok: true },
    });

    if (!makam) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    const pj = await prisma.penanggungJawab.findMany({
      where: { makamId: id },
      include: { user: true },
    });

    return NextResponse.json({ ...makam, pj });
  }

  const makams = await prisma.makam.findMany({
    include: { jenazah: true, blok: true },
  });

  const allIds = makams.map((m) => m.id);
  const pjs = await prisma.penanggungJawab.findMany({
    where: { makamId: { in: allIds } },
    include: { user: true },
  });

  const result = makams.map((m) => ({
    ...m,
    pj: pjs.filter((p) => p.makamId === m.id),
  }));

  return NextResponse.json(result);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  const newEntry = await prisma.makam.create({
    data: {
      nama: body.nama,
      lokasi: body.lokasi,
      silsilah: body.silsilah,
      description: body.description,
    },
  });

  return NextResponse.json(newEntry, { status: 201 });
}

// PUT
export async function PUT(req: Request) {
  const body = await req.json();
  const id = body.id;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid or missing ID" }, { status: 400 });
  }
  try {
    const updatedEntry = await prisma.makam.update({
      where: {
        id: String(id),
      },
      data: {
        nama: body.nama,
        lokasi: body.lokasi,
        silsilah: body.silsilah,
        description: body.description,
      },
    });
    return NextResponse.json(updatedEntry);
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}
