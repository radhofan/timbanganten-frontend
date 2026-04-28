// Record yearly maintenance payment for a Jenazah and extend masaAktif by 1 year.
// Admin only.
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";

export async function PUT(req: Request) {
  const guard = await requireRole(req, ["admin"]);
  if (!guard.ok) return guard.response;

  try {
    const body = await req.json();
    const id = body.id;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid or missing id jenazah" }, { status: 400 });
    }

    const jenazah = await prisma.jenazah.findUnique({ where: { id } });

    if (!jenazah) {
      return NextResponse.json({ error: "Jenazah not found" }, { status: 404 });
    }

    const currentMasaAktif = jenazah.masaAktif ?? new Date();
    const newMasaAktif = new Date(currentMasaAktif);
    newMasaAktif.setFullYear(newMasaAktif.getFullYear() + 1);

    const updated = await prisma.jenazah.update({
      where: { id },
      data: {
        statusPembayaranIuranTahunan: "PAID",
        masaAktif: newMasaAktif,
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
