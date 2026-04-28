// CRUD for the Admin role record. All mutations require an authenticated admin
// user; password is always bcrypt-hashed before persistence.
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireRole } from "@/lib/auth";
import { kontakSchema, kontakUpdateSchema } from "@/validation/kontak";

const adminFields = {
  id: true,
  name: true,
  email: true,
  contact: true,
} as const;

// GET
/**
 * @route   GET /api/admin
 * @desc    List admins, fetch one by ?id=, or search by ?query=.
 * @access  admin
 * @returns 200 Admin | Admin[]   404 if id not found   401/403 on auth
 */
export async function GET(request: Request) {
  const guard = await requireRole(request, ["admin"]);
  if (!guard.ok) return guard.response;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const query = url.searchParams.get("query");

  if (id) {
    const admin = await prisma.admin.findUnique({
      where: { id: Number(id) },
      select: adminFields,
    });

    if (!admin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }

    return NextResponse.json(admin);
  }

  let admins;

  if (query) {
    admins = await prisma.admin.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { email: { contains: query, mode: "insensitive" } },
        ],
      },
      select: adminFields,
    });
  } else {
    admins = await prisma.admin.findMany({
      select: adminFields,
    });
  }

  return NextResponse.json(admins);
}

// POST
/**
 * @route   POST /api/admin
 * @desc    Create a new admin. Hashes password, normalizes email, returns 409 on duplicate email.
 * @access  admin
 * @body    { name, email, password, contact? } — validated via kontakSchema.
 * @returns 201 Admin   400 validation   409 duplicate   401/403 on auth
 */
export async function POST(request: Request) {
  const guard = await requireRole(request, ["admin"]);
  if (!guard.ok) return guard.response;

  const body = await request.json();
  const parsed = kontakSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, password, contact } = parsed.data;
  const normalizedEmail = email.toLowerCase();

  const existing = await prisma.admin.findUnique({ where: { email: normalizedEmail } });
  if (existing) {
    return NextResponse.json({ error: "Admin dengan email ini sudah ada" }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);

  const newAdmin = await prisma.admin.create({
    data: { name, email: normalizedEmail, password: hashed, contact: contact ?? "" },
    select: adminFields,
  });

  return NextResponse.json(newAdmin, { status: 201 });
}

// PUT
/**
 * @route   PUT /api/admin?id=:id
 * @desc    Update an admin. Empty password field is treated as "no change".
 * @access  admin
 * @body    { name, email, contact?, password? } — validated via kontakUpdateSchema.
 * @returns 200 Admin   400 validation/missing id   404 not found   401/403 on auth
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
  const parsed = kontakUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { name, email, contact, password } = parsed.data;

  const existingAdmin = await prisma.admin.findUnique({
    where: { id: Number(id) },
  });

  if (!existingAdmin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  const updatedData: {
    name: string;
    email: string;
    contact: string;
    password?: string;
  } = {
    name,
    email: email.toLowerCase(),
    contact: contact ?? "",
  };

  if (password && password.trim() !== "") {
    updatedData.password = await bcrypt.hash(password, 10);
  }

  const updatedAdmin = await prisma.admin.update({
    where: { id: Number(id) },
    data: updatedData,
    select: adminFields,
  });

  const { ...safeAdmin } = updatedAdmin;

  return NextResponse.json(safeAdmin);
}

// DELETE
/**
 * @route   DELETE /api/admin?id=:id
 * @desc    Permanently remove an admin record.
 * @access  admin
 * @returns 200 { message }   400 missing id   500 prisma error   401/403 on auth
 */
export async function DELETE(request: Request) {
  const guard = await requireRole(request, ["admin"]);
  if (!guard.ok) return guard.response;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }

  try {
    await prisma.admin.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Admin deleted successfully" });
  } catch (error) {
    console.error("Delete admin error:", error);
    return NextResponse.json({ error: "Failed to delete admin" }, { status: 500 });
  }
}
