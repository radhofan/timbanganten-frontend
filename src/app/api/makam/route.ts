import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// GET
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
      include: {
        jenazah: true,
        blok: true,
        pj: { include: { user: true } }, // <-- include all PJs linked to this makam
      },
    });

    if (!makam) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(makam);
  }

  const makams = await prisma.makam.findMany({
    include: {
      jenazah: true,
      blok: true,
      pj: { include: { user: true } }, // <-- include all PJs for each makam
    },
  });

  return NextResponse.json(makams);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  const newEntry = await prisma.makam.create({
    data: {
      nama: body.nama,
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
