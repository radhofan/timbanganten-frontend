// Read and create PenanggungJawab (PJ) records. A PJ is a User with an associated
// PenanggungJawab row. Reads require any authenticated staff role; writes require
// admin so PII isn't created via unauthenticated calls.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { pjSchema } from "@/validation/pj";

const STAFF_ROLES = ["admin", "approver", "pengawas"] as const;

/**
 * @route   GET /api/penanggungJawab
 * @desc    Fetch a single user (with their PJ + makam + makamStatus) by ?id=
 *          or list every user that has a PJ row.
 * @access  admin | approver | pengawas
 * @returns 200 User | User[]   404 if id not found   401/403 on auth
 */
export async function GET(request: Request) {
  const guard = await requireRole(request, STAFF_ROLES);
  if (!guard.ok) return guard.response;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (id) {
    // Get a single user by ID
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
      include: {
        penanggungJawab: {
          include: {
            makam: true,
            makamStatus: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "PJ not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  }

  // Get all users who have a PenanggungJawab
  const users = await prisma.user.findMany({
    where: {
      penanggungJawab: {
        isNot: null, // only users with a PJ record
      },
    },
    include: {
      penanggungJawab: {
        include: {
          makam: true,
          makamStatus: true,
        },
      },
    },
  });

  return NextResponse.json(users);
}

/**
 * @route   POST /api/penanggungJawab
 * @desc    Create a new User and the matching PenanggungJawab row. Email is
 *          normalized to lowercase; conflicts on email or ktpNum return 409.
 * @access  admin
 * @body    pjSchema { name, contact, email, ktpNum?, emergencyName?, emergencyContact? }
 * @returns 201 { user, penanggung_jawab }   400 validation   409 conflict
 *          401/403 on auth
 */
export async function POST(request: Request) {
  const guard = await requireRole(request, ["admin"]);
  if (!guard.ok) return guard.response;

  const body = await request.json();
  const parsed = pjSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, contact, email, ktpNum, emergencyName, emergencyContact } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  // Surface conflicts as 409 instead of letting Prisma throw a raw P2002.
  const errors: Record<string, string> = {};
  if (await prisma.user.findUnique({ where: { email: normalizedEmail } })) {
    errors.email = "Email sudah digunakan";
  }
  if (ktpNum && (await prisma.user.findUnique({ where: { ktpNum } }))) {
    errors.ktpNum = "KTP sudah digunakan";
  }
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ errors }, { status: 409 });
  }

  const newUser = await prisma.user.create({
    data: {
      name,
      contact,
      email: normalizedEmail,
      ktpNum: ktpNum || null,
      emergencyName: emergencyName || null,
      emergencyContact: emergencyContact || null,
    },
  });

  const newPJ = await prisma.penanggungJawab.create({
    data: {
      userId: newUser.id,
    },
  });

  return NextResponse.json(
    {
      user: newUser,
      penanggung_jawab: newPJ,
    },
    { status: 201 }
  );
}
