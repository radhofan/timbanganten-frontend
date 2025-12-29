import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// GET
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (id) {
    if (typeof id !== "string" || !id.trim()) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }
    const data = await prisma.makam.findUnique({
      where: { id: id },
      include: {
        user: true,
        pj: true,
        jenazah: true,
        blok: true,
      },
    });
    if (!data) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }
    return NextResponse.json(data);
  }
  const data = await prisma.makam.findMany({
    include: {
      user: true,
      pj: true,
      jenazah: true,
      blok: true,
    },
  });
  return NextResponse.json(data);
}

// POST
export async function POST(req: Request) {
  const body = await req.json();

  const newEntry = await prisma.makam.create({
    data: {
      nama: body.nama,
      lokasi: body.lokasi,
      silsilah: body.silsilah,
      ext: body.ext ?? null,
      masaAktif: new Date(body.masa_aktif),
      namaPenanggungJawab: body.nama_penanggung_jawab,
      kontakPenanggungJawab: body.kontak_penanggung_jawab,
      description: body.description,
      payment: body.payment,
      approved: body.approved,
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
        namaPenanggungJawab: body.nama_penanggung_jawab,
        kontakPenanggungJawab: body.kontak_penanggung_jawab,
        description: body.description,
      },
    });
    return NextResponse.json(updatedEntry);
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}
