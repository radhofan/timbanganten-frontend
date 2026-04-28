// Create an admin account. Bootstrap rule: when zero admin records exist this
// endpoint is open so the first admin can be provisioned without credentials.
// Once any admin exists the endpoint requires an authenticated admin caller.
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireRole } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const adminCount = await prisma.admin.count();
    if (adminCount > 0) {
      const guard = await requireRole(request, ["admin"]);
      if (!guard.ok) return guard.response;
    }

    const { name, email, password, contact } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase();

    const existingAdmin = await prisma.admin.findUnique({
      where: { email: normalizedEmail },
    });

    if (existingAdmin) {
      return NextResponse.json({ error: "Admin with this email already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.admin.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        contact: contact || null,
      },
      select: { id: true, name: true, email: true, contact: true },
    });

    return NextResponse.json(
      { message: "Admin created successfully", admin },
      { status: 201 }
    );
  } catch (error) {
    console.error("Admin creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
