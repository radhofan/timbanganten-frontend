import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const id = body.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid or missing id_jenazah" }, { status: 400 });
    }

    const jenazah = await prisma.jenazah.findUnique({
      where: { id_jenazah: id },
    });

    if (!jenazah) {
      return NextResponse.json({ error: "Jenazah not found" }, { status: 404 });
    }

    const currentMasaAktif = jenazah.masa_aktif ?? new Date();
    const newMasaAktif = new Date(currentMasaAktif);
    newMasaAktif.setFullYear(newMasaAktif.getFullYear() + 1);

    const updated = await prisma.jenazah.update({
      where: { id_jenazah: id },
      data: {
        status_pembayaran_iuran_tahunan: "PAID",
        masa_aktif: newMasaAktif,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PUT /api/bayarIuranTahunan]", err);
    return NextResponse.json(
      { error: "Failed to update status_pembayaran_iuran_tahunan" },
      { status: 500 }
    );
  }
}
