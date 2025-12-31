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
    const data = await prisma.makamStatus.findUnique({
      where: { id: id },
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
        masaAktif: new Date(body.masa_aktif),
        namaPenanggungJawab: body.nama_penanggung_jawab,
        kontakPenanggungJawab: body.kontak_penanggung_jawab,
        description: body.description,
        payment: body.payment,
        approved: body.approved,
        userId: body.userId,
      },
    });
    let newPJ = null;
    if (body.userId) {
      newPJ = await prisma.penanggungJawab.create({
        data: {
          userId: body.userId,
        },
      });
    }
    return NextResponse.json({ makamStatus: newEntry, penanggungJawab: newPJ }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}

// PUT
export async function PUT(req: Request) {
  const body = await req.json();
  const id = body.id;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "Invalid or missing ID" }, { status: 400 });
  }
  try {
    // --- UPDATE MAKAMSTATUS ---
    const makamStatus = await prisma.makamStatus.update({
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
      select: {
        jenazahId: true,
      },
    });

    // ONLY do next-status logic here
    if (body.tanggal_pemakaman && makamStatus.jenazahId) {
      const blokData = await prisma.blok.findUnique({
        where: { id: body.blok },
      });

      // --- NEXT STATUS PROCESSING ---
      let finalJenazahStatus;
      let finalStatusBlok: string;

      if (blokData?.statusBlok === "DIGUNAKAN-1") {
        finalJenazahStatus = "DITUMPUK-2";
        finalStatusBlok = "DIGUNAKAN-2";
      } else if (blokData?.statusBlok === "DIGUNAKAN-2") {
        finalJenazahStatus = "DITUMPUK-3";
        finalStatusBlok = "DIGUNAKAN-3";
      } else {
        finalJenazahStatus = "DIKUBURKAN";
        finalStatusBlok = "DIGUNAKAN-1";
      }

      const oneYearLater = new Date(body.tanggalPemesanan);
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

      let newBlokAvailability: string | null = null;
      if (finalStatusBlok === "DIGUNAKAN-3") {
        newBlokAvailability = "TIDAK TERSEDIA";
      } else {
        newBlokAvailability = "TERSEDIA";
      }

      // --- UPDATE JENAZAH ---
      await prisma.jenazah.update({
        where: {
          id: makamStatus.jenazahId,
        },
        data: {
          tanggalPemakaman: new Date(body.tanggal_pemakaman),
          statusJenazah: finalJenazahStatus,
          blokId: body.blok,
          masaAktif: oneYearLater,
        },
      });

      // --- UPDATE BLOK ---
      await prisma.blok.update({
        where: { id: body.blok },
        data: {
          tanggalPemakamanTerakhir: new Date(body.tanggal_pemakaman),
          statusBlok: finalStatusBlok,
          availability: newBlokAvailability,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}
