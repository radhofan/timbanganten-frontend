import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

/**
 * GET /api/getBlok
 * Retrieves blok (cemetery block) information by ID or location
 * Query params: id (optional), lokasi (optional)
 * Returns: Single blok object if id provided, or array of bloks filtered by lokasi
 */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const lokasi = searchParams.get("lokasi");

    if (id) {
      const blok = await prisma.blok.findUnique({
        where: { id },
      });

      if (!blok) {
        return NextResponse.json({ error: "Blok not found" }, { status: 404 });
      }

      return NextResponse.json(blok);
    }

    const bloks = await prisma.blok.findMany({
      where: lokasi ? { lokasi } : undefined,
      orderBy: { id: "asc" },
    });

    return NextResponse.json(bloks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch blok" }, { status: 500 });
  }
}
