import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signToken, setAuthCookie } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    console.log("HIT /api/authApprover");
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const approver = await prisma.approver.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!approver) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isValidPassword = await bcrypt.compare(password, approver.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const userPayload = {
      id: approver.id,
      name: approver.name,
      email: approver.email,
      role: "approver",
    };

    const token = signToken(userPayload);

    const response = NextResponse.json({
      message: "Login successful",
      approver: userPayload,
    });

    setAuthCookie(response, token);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
