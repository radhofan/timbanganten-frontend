import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const id = body.id;
    const tanggalPemesanan = body.tanggal_pemesanan;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid or missing id_jenazah" }, { status: 400 });
    }

    if (!tanggalPemesanan) {
      return NextResponse.json({ error: "Missing tanggal_pemesanan" }, { status: 400 });
    }

    const pemesananDate = new Date(tanggalPemesanan);
    if (isNaN(pemesananDate.getTime())) {
      return NextResponse.json({ error: "Invalid tanggal_pemesanan" }, { status: 400 });
    }

    const fourYearsLater = new Date(pemesananDate);
    fourYearsLater.setFullYear(fourYearsLater.getFullYear() + 4);

    const updated = await prisma.jenazah.update({
      where: { id_jenazah: id },
      data: {
        status_pembayaran_pesanan: "PAID",
        masa_aktif: fourYearsLater,
      },
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PUT /api/bayarPesanan]", err);
    return NextResponse.json(
      { error: "Failed to update status_pembayaran_pesanan" },
      { status: 500 }
    );
  }
}
