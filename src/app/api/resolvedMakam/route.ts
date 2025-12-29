import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const id = body.id;
    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Invalid or missing ID" }, { status: 400 });
    }
    const makam = await prisma.makam.findUnique({
      where: { id: String(id) },
    });
    if (!makam || !makam.masaAktif) {
      return NextResponse.json({ error: "Makam not found or masaAktif missing" }, { status: 404 });
    }
    const newMasaAktif = new Date(makam.masaAktif);
    newMasaAktif.setFullYear(newMasaAktif.getFullYear() + 1);
    const updated = await prisma.makam.update({
      where: { id: makam.id },
      data: {
        ext: "PAID",
        masaAktif: newMasaAktif,
      },
    });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[PUT /api/resolvedMakam]", err);
    return NextResponse.json({ error: "Failed to update status to PAID" }, { status: 500 });
  }
}
