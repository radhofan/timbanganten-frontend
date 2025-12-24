import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// GET
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const parsedId = parseInt(id, 10);
    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const data = await prisma.makamStatus.findUnique({
      where: { id: parsedId },
      include: {
        jenazah: true,
        blok: true,
      },
    });

    if (!data) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(data);
  }

  const data = await prisma.makamStatus.findMany({
    include: {
      jenazah: true,
      blok: true,
    },
  });

  return NextResponse.json(data);
}

// POST
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newEntry = await prisma.makamStatus.create({
      data: {
        nama: body.nama,
        lokasi: body.lokasi,
        silsilah: body.silsilah,
        ext: body.ext ?? null,
        masa_aktif: new Date(body.masa_aktif),
        nama_penanggung_jawab: body.nama_penanggung_jawab,
        kontak_penanggung_jawab: body.kontak_penanggung_jawab,
        description: body.description,
        payment: body.payment,
        approved: body.approved,
        userId: body.userId,
      },
    });

    let newPJ = null;
    if (body.userId) {
      newPJ = await prisma.penanggung_Jawab.create({
        data: {
          id_user: body.userId,
        },
      });
    }

    return NextResponse.json({ makamStatus: newEntry, penanggung_jawab: newPJ }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// PUT
export async function PUT(req: Request) {
  const body = await req.json();
  const id = body.id;

  if (!id || isNaN(parseInt(id, 10))) {
    return NextResponse.json({ error: "Invalid or missing ID" }, { status: 400 });
  }

  try {
    // update makamStatus first and get jenazahId
    const makamStatus = await prisma.makamStatus.update({
      where: {
        id: parseInt(id, 10),
      },
      data: {
        nama: body.nama,
        lokasi: body.lokasi,
        silsilah: body.silsilah,
        nama_penanggung_jawab: body.nama_penanggung_jawab,
        kontak_penanggung_jawab: body.kontak_penanggung_jawab,
        description: body.description,
      },
      select: {
        jenazahId: true,
      },
    });

    // update jenazah.tanggal_pemakaman explicitly
    if (body.tanggal_pemakaman && makamStatus.jenazahId) {
      await prisma.jenazah.update({
        where: {
          id_jenazah: makamStatus.jenazahId,
        },
        data: {
          tanggal_pemakaman: new Date(body.tanggal_pemakaman),
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}
