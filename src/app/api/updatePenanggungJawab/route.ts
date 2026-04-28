// Manage the many-to-many link between PenanggungJawab and Makam.
// Reads: any staff role. Add/remove links: admin only.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";

const STAFF_ROLES = ["admin", "approver", "pengawas"] as const;

/**
 * @route   GET /api/updatePenanggungJawab
 * @desc    List PenanggungJawab rows (optionally filtered by ?query= against
 *          the linked user's name or contact) including user, makam and
 *          makamStatus relations.
 * @access  admin | approver | pengawas
 * @returns 200 PenanggungJawab[]   401/403 on auth
 */
export async function GET(request: Request) {
  const guard = await requireRole(request, STAFF_ROLES);
  if (!guard.ok) return guard.response;

  const url = new URL(request.url);
  const query = url.searchParams.get("query");
  const pjs = await prisma.penanggungJawab.findMany({
    where: query
      ? {
          user: {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { contact: { contains: query, mode: "insensitive" } },
            ],
          },
        }
      : undefined,
    include: {
      user: true,
      makam: true,
      makamStatus: true,
    },
  });
  return NextResponse.json(pjs);
}

/**
 * @route   POST /api/updatePenanggungJawab
 * @desc    Attach an existing PJ to a Makam via the m2m relation.
 * @access  admin
 * @body    { pjId, makamId }
 * @returns 200 { success, penanggungJawab }   400 missing fields
 *          404 not found   500 prisma error   401/403 on auth
 */
export async function POST(req: Request) {
  const guard = await requireRole(req, ["admin"]);
  if (!guard.ok) return guard.response;

  try {
    const body = await req.json();
    const { pjId, makamId } = body;

    if (!pjId || !makamId) {
      return NextResponse.json({ error: "pjId and makamId are required" }, { status: 400 });
    }

    const existingPJ = await prisma.penanggungJawab.findUnique({
      where: { id: pjId },
    });

    if (!existingPJ) {
      return NextResponse.json({ error: "PenanggungJawab not found" }, { status: 404 });
    }

    const makam = await prisma.makam.findUnique({
      where: { id: makamId },
    });

    if (!makam) {
      return NextResponse.json({ error: "Makam not found" }, { status: 404 });
    }

    const updatedPJ = await prisma.penanggungJawab.update({
      where: { id: pjId },
      data: {
        makam: {
          connect: [{ id: makamId }], // ✅ link PJ to this Makam
          // OR use `set` if you want to replace all existing Makam links:
          // set: [{ id: makamId }],
        },
      },
      include: {
        user: true,
        makam: true, // will now return an array
      },
    });

    return NextResponse.json({ success: true, penanggungJawab: updatedPJ }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update PenanggungJawab" }, { status: 500 });
  }
}

/**
 * @route   DELETE /api/updatePenanggungJawab
 * @desc    Detach a PJ from a single Makam (does not delete the PJ).
 * @access  admin
 * @body    { pjId, makamId }
 * @returns 200 { success, penanggungJawab }   400 missing/unlinked
 *          404 not found   500 prisma error   401/403 on auth
 */
export async function DELETE(req: Request) {
  const guard = await requireRole(req, ["admin"]);
  if (!guard.ok) return guard.response;

  try {
    const body = await req.json();
    const { pjId, makamId } = body;

    if (!pjId || !makamId) {
      return NextResponse.json({ error: "pjId and makamId are required" }, { status: 400 });
    }

    // 1. Check if PJ exists
    const pj = await prisma.penanggungJawab.findUnique({
      where: { id: pjId },
      include: { makam: true }, // include all linked Makams
    });

    if (!pj) {
      return NextResponse.json({ error: "PenanggungJawab not found" }, { status: 404 });
    }

    // 2. Check if the PJ is linked to this Makam
    const isLinked = pj.makam.some((m) => m.id === makamId);
    if (!isLinked) {
      return NextResponse.json(
        { error: "Makam does not belong to this PenanggungJawab" },
        { status: 400 }
      );
    }

    // 3. Remove the link in the many-to-many table
    const updatedPJ = await prisma.penanggungJawab.update({
      where: { id: pjId },
      data: {
        makam: {
          disconnect: { id: makamId }, // ✅ disconnect from this Makam
        },
      },
      include: {
        user: true,
        makam: true, // updated array of linked Makams
      },
    });

    return NextResponse.json({ success: true, penanggungJawab: updatedPJ }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to remove makam from PenanggungJawab" },
      { status: 500 }
    );
  }
}
