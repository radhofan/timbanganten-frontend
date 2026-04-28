// Read and create Jenazah records. Reads require any staff role; writes admin only.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";

const STAFF_ROLES = ["admin", "approver", "pengawas"] as const;

const jenazahInclude = {
  user: true,
  blok: true,
  makam: {
    include: {
      pj: {
        include: { user: true },
      },
    },
  },
  makamStatus: {
    include: {
      pj: {
        include: { user: true },
      },
    },
  },
} as const;

/**
 * @route   GET /api/jenazah
 * @desc    Fetch a single Jenazah by ?id= (with user/blok/makam/makamStatus +
 *          their PJ relations) or list every Jenazah with the same shape.
 * @access  admin | approver | pengawas
 * @returns 200 Jenazah | Jenazah[]   401/403 on auth
 */
export async function GET(request: Request) {
  const guard = await requireRole(request, STAFF_ROLES);
  if (!guard.ok) return guard.response;

  const url = new URL(request.url);
  const search = url.searchParams.get("id");

  if (search) {
    const data = await prisma.jenazah.findUnique({
      where: { id: search },
      include: jenazahInclude,
    });

    return NextResponse.json(data);
  }

  const data = await prisma.jenazah.findMany({
    include: jenazahInclude,
  });

  return NextResponse.json(data);
}

/**
 * @route   POST /api/jenazah
 * @desc    Create a Jenazah record. Body keys are snake_case mirroring the
 *          legacy schema mapping.
 * @access  admin
 * @body    { id_user, tanggal_pemakaman, status_jenazah, masa_aktif,
 *            id_blok, status_pembayaran_pesanan, status_pembayaran_iuran_tahunan }
 * @returns 200 Jenazah   401/403 on auth
 */
export async function POST(request: Request) {
  const guard = await requireRole(request, ["admin"]);
  if (!guard.ok) return guard.response;

  const body = await request.json();
  const data = await prisma.jenazah.create({
    data: {
      id: body.id_user ?? null,
      tanggalPemakaman: body.tanggal_pemakaman ? new Date(body.tanggal_pemakaman) : null,
      statusJenazah: body.status_jenazah ?? null,
      masaAktif: body.masa_aktif ?? null,
      blokId: body.id_blok ?? null,
      statusPembayaranPesanan: body.status_pembayaran_pesanan ?? null,
      statusPembayaranIuranTahunan: body.status_pembayaran_iuran_tahunan ?? null,
    },
  });
  return NextResponse.json(data);
}
