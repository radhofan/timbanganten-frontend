import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = parseInt(body.id, 10); // ✅ Convert id to Int

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    // Find the status record
    const status = await prisma.makamStatus.findUnique({
      where: { id },
    });

    if (!status) {
      return NextResponse.json({ error: "Makam status tidak ditemukan" }, { status: 404 });
    }

    // Create the new Makam entry
    const newMakam = await prisma.makam.create({
      data: {
        blok: status.blok,
        nama: status.nama,
        lokasi: status.lokasi,
        silsilah: status.silsilah,
        ext: status.ext,
        masa_aktif: status.masa_aktif,
        nama_penanggung_jawab: status.nama_penanggung_jawab,
        kontak_penanggung_jawab: status.kontak_penanggung_jawab,
        description: status.description,
        payment: status.payment,
        approved: "APPROVED",
        userId: status.userId,
      },
    });

    // Delete from makamStatus
    await prisma.makamStatus.delete({ where: { id } });

    return NextResponse.json({ message: "Berhasil disetujui", makam: newMakam });
  } catch (err) {
    console.error("[approveMakam]", err);
    return NextResponse.json({ error: "Terjadi kesalahan saat menyetujui makam." }, { status: 500 });
  }
}
