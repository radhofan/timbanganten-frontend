// Create a pengawas account. Admin only.
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { requireRole } from "@/lib/auth";

export async function POST(request: Request) {
  const guard = await requireRole(request, ["admin"]);
  if (!guard.ok) return guard.response;

  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const normalizedEmail = String(email).toLowerCase();

    const existing = await prisma.pengawas.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Pengawas with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const pengawas = await prisma.pengawas.create({
      data: { name, email: normalizedEmail, password: hashedPassword },
      select: { id: true, name: true, email: true },
    });

    return NextResponse.json(
      { message: "Pengawas created successfully", pengawas },
      { status: 201 }
    );
  } catch (error) {
    console.error("Pengawas creation error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
