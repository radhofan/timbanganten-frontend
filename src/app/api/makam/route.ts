// Read and update active Makam records.
// GET is open to any staff role; mutations require admin.
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";

const STAFF_ROLES = ["admin", "approver", "pengawas"] as const;

const makamInclude = {
  jenazah: {
    include: {
      user: true,
    },
  },
  blok: true,
  pj: { include: { user: true } },
} as const;

// GET
/**
 * @route   GET /api/makam
 * @desc    Fetch a single Makam by ?id= or list every Makam with linked
 *          jenazah/user, blok and PJ relations.
 * @access  admin | approver | pengawas
 * @returns 200 Makam | Makam[]   400 invalid id   404 not found   401/403 on auth
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

    const makam = await prisma.makam.findUnique({
      where: { id },
      include: makamInclude,
    });

    if (!makam) {
      return NextResponse.json({ error: "Not Found" }, { status: 404 });
    }

    return NextResponse.json(makam);
  }

  const makams = await prisma.makam.findMany({
    include: makamInclude,
  });

  return NextResponse.json(makams);
}

// POST
/**
 * @route   POST /api/makam
 * @desc    Create a bare Makam record (description only). Most callers should
 *          use /api/convertMakam which builds Makam from a MakamStatus.
 * @access  admin
 * @body    { description }
 * @returns 201 Makam   401/403 on auth
 */
export async function POST(req: Request) {
  const guard = await requireRole(req, ["admin"]);
  if (!guard.ok) return guard.response;

  const body = await req.json();

  const newEntry = await prisma.makam.create({
    data: {
      description: body.description,
    },
  });

  return NextResponse.json(newEntry, { status: 201 });
}

// PUT
/**
 * @route   PUT /api/makam
 * @desc    Update a Makam's description and the linked jenazah's user name.
 * @access  admin
 * @body    { id, description, nama }
 * @returns 200 Makam   400 invalid id   500 prisma error   401/403 on auth
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
    const updatedEntry = await prisma.makam.update({
      where: {
        id: String(id),
      },
      data: {
        description: body.description,
        jenazah: {
          update: {
            user: {
              update: {
                name: body.nama,
              },
            },
          },
        },
      },
    });
    return NextResponse.json(updatedEntry);
  } catch (err) {
    console.error("Update failed:", err);
    return NextResponse.json({ error: "Failed to update record" }, { status: 500 });
  }
}
