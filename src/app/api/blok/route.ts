import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// GET
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const lokasi = searchParams.get("lokasi");

  if (lokasi) {
    const data = await prisma.blok.findMany({
      where: {
        lokasi,
        availability: "TERSEDIA",
      },
    });

    return NextResponse.json(data);
  }

  const data = await prisma.blok.findMany({
    where: {
      availability: "TERSEDIA",
    },
  });

  return NextResponse.json(data);
}
