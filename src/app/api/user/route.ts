// Read / create / update User records. PII surface — staff roles only.
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";

const STAFF_ROLES = ["admin", "approver", "pengawas"] as const;

/**
 * @route   GET /api/user
 * @desc    Fetch a single user by ?id=, search by ?query= (name/contact),
 *          or list every user.
 * @access  admin | approver | pengawas
 * @returns 200 User | User[]   404 if id not found   401/403 on auth
 */
export async function GET(request: Request) {
  const guard = await requireRole(request, STAFF_ROLES);
  if (!guard.ok) return guard.response;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const query = url.searchParams.get("query");

  let users;

  if (id) {
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  }

  if (query) {
    users = await prisma.user.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { contact: { contains: query, mode: "insensitive" } },
        ],
      },
    });
  } else {
    users = await prisma.user.findMany({});
  }

  return NextResponse.json(users);
}

// POST
/**
 * @route   POST /api/user
 * @desc    Create a User record.
 * @access  admin
 * @body    { name, contact, email, ktpNum }
 * @returns 201 User   401/403 on auth
 */
export async function POST(request: Request) {
  const guard = await requireRole(request, ["admin"]);
  if (!guard.ok) return guard.response;

  const body = await request.json();

  const { name, contact, email, ktpNum } = body;

  const newUser = await prisma.user.create({
    data: {
      name,
      contact,
      email,
      ktpNum,
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}

// PUT
/**
 * @route   PUT /api/user?id=:id
 * @desc    Update a User's name / contact / email.
 * @access  admin
 * @body    { name, contact, email }
 * @returns 200 User   400 missing id   404 not found   401/403 on auth
 */
export async function PUT(request: Request) {
  const guard = await requireRole(request, ["admin"]);
  if (!guard.ok) return guard.response;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  const body = await request.json();
  const { name, contact, email } = body;

  const userId = String(id);

  const existingUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!existingUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      name,
      contact,
      email,
    },
  });

  const finalUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  return NextResponse.json(finalUser);
}
