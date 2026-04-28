// List available blok rows for the booking form. Filters by lokasi and
// jenismakam (baru = empty plots, tumpuk = already-used 1- or 2-stack plots).
// Auth: any staff role.
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";

const STAFF_ROLES = ["admin", "approver", "pengawas"] as const;

// GET
/**
 * @route   GET /api/blok
 * @desc    List Blok plots that match ?lokasi= and ?jenismakam=, restricted
 *          to plots that are not yet ordered and currently TERSEDIA.
 * @access  admin | approver | pengawas
 * @returns 200 Blok[]   401/403 on auth
 */
export async function GET(request: Request) {
  const guard = await requireRole(request, STAFF_ROLES);
  if (!guard.ok) return guard.response;

  const { searchParams } = new URL(request.url);

  const lokasi = searchParams.get("lokasi");
  const jenismakam = searchParams.get("jenismakam");

  let availabilityList: string[] = ["KOSONG", "DIGUNAKAN-1", "DIGUNAKAN-2"];

  if (jenismakam === "baru") {
    availabilityList = ["KOSONG"];
  }

  if (jenismakam === "tumpuk") {
    availabilityList = ["DIGUNAKAN-1", "DIGUNAKAN-2"];
  }

  const data = await prisma.blok.findMany({
    where: {
      ...(lokasi ? { lokasi } : {}),
      statusBlok: { in: availabilityList },
      statusPesanan: "TIDAK DIPESAN",
      availability: "TERSEDIA",
    },
  });

  return NextResponse.json(data);
}
