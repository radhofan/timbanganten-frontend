// Read and update pending makam bookings (MakamStatus). Reads require any
// staff role; create/update require admin.
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";

const STAFF_ROLES = ["admin", "approver", "pengawas"] as const;

const makamStatusInclude = {
  jenazah: { include: { user: true } },
  blok: true,
  pj: { include: { user: true } },
} as const;

// GET
/**
 * @route   GET /api/makamStatus
 * @desc    Fetch a single MakamStatus by ?id= or list every pending booking
 *          with jenazah/user, blok and PJ relations.
 * @access  admin | approver | pengawas
 * @returns 200 MakamStatus | MakamStatus[]   400 invalid id   404 not found
 *          401/403 on auth
 */
export async function GET(request: Request) {
  const guard = await requireRole(request, STAFF_ROLES);
  if (!guard.ok) return guard.response;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    if (!id.trim()) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const makamStatus = await prisma.makamStatus.findUnique({
      where: { id },
      include: makamStatusInclude,
    });

    if (!makamStatus) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(makamStatus);
  }

  // Fetch all MakamStatuses
  const makamStatuses = await prisma.makamStatus.findMany({
    include: makamStatusInclude,
  });

  return NextResponse.json(makamStatuses);
}

// POST
/**
 * @route   POST /api/makamStatus
 * @desc    Create a MakamStatus row and (optionally) a PenanggungJawab linked
 *          to a userId.
 * @access  admin
 * @body    { description, userId? }
 * @returns 201 { makamStatus, penanggungJawab|null }   500 prisma error
 *          401/403 on auth
 */
export async function POST(req: Request) {
  const guard = await requireRole(req, ["admin"]);
  if (!guard.ok) return guard.response;

  try {
    const body = await req.json();
    const newEntry = await prisma.makamStatus.create({
      data: {
        description: body.description,
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
/**
 * @route   PUT /api/makamStatus
 * @desc    Update a MakamStatus description plus the linked user's name. When
 *          tanggal_pemakaman is provided, propagate the next-status transition
 *          to Jenazah and Blok.
 * @access  admin
 * @body    { id, description, nama, tanggal_pemakaman?, blok?, tanggalPemesanan? }
 * @returns 200 { success }   400 invalid id / missing jenazah   500 prisma error
 *          401/403 on auth
 */
export async function PUT(req: Request) {
  const guard = await requireRole(req, ["admin"]);
  if (!guard.ok) return guard.response;

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
        description: body.description,
      },
      select: {
        jenazahId: true,
      },
    });

    if (!makamStatus.jenazahId) {
      return NextResponse.json({ error: "Jenazah ID is required" }, { status: 400 });
    }

    const jenazah = await prisma.jenazah.findUnique({
      where: { id: makamStatus.jenazahId },
      select: {
        userId: true,
      },
    });

    if (jenazah?.userId) {
      await prisma.user.update({
        where: {
          id: jenazah.userId,
        },
        data: {
          name: body.nama,
        },
      });
    }

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
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}
