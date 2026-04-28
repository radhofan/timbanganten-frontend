// Mark a Jenazah's pesanan (booking) payment as PAID and refresh masaAktif.
// Admin only — this is a money-state-changing operation.
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";

/**
 * @route   PUT /api/bayarPesanan
 * @desc    Mark statusPembayaranPesanan = PAID for a Jenazah and set
 *          masaAktif to tanggal_pemesanan + 4 years.
 * @access  admin
 * @body    { id, tanggal_pemesanan }
 * @returns 200 Jenazah   400 invalid input   500 prisma error   401/403 on auth
 */
export async function PUT(req: Request) {
  const guard = await requireRole(req, ["admin"]);
  if (!guard.ok) return guard.response;

  try {
    const body = await req.json();
    const id = body.id;
    const tanggalPemesanan = body.tanggal_pemesanan;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid or missing id jenazah" }, { status: 400 });
    }

    if (!tanggalPemesanan) {
      return NextResponse.json({ error: "Missing tanggal pemesanan" }, { status: 400 });
    }

    const pemesananDate = new Date(tanggalPemesanan);
    if (isNaN(pemesananDate.getTime())) {
      return NextResponse.json({ error: "Invalid tanggal pemesanan" }, { status: 400 });
    }

    // Bookings are valid for 4 years from the order date.
    const fourYearsLater = new Date(pemesananDate);
    fourYearsLater.setFullYear(fourYearsLater.getFullYear() + 4);

    const updated = await prisma.jenazah.update({
      where: { id },
      data: {
        statusPembayaranPesanan: "PAID",
        masaAktif: fourYearsLater,
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
