import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// GET
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const lokasi = searchParams.get("lokasi");
  const jenismakam = searchParams.get("jenismakam");

  let availabilityList: string[] = ["KOSONG", "DIGUNAKAN-1", "DIGUNAKAN-2"];

  if (jenismakam === "baru") {
    availabilityList = ["KOSONG"];
  }

  if (jenismakam === "tumpuk") {
    availabilityList = ["DIGUNAKAN-1", "DIGUNAKAN-2"];
  }

  const data = await prisma.blok.findMany({
    where: {
      ...(lokasi ? { lokasi } : {}),
      status_blok: { in: availabilityList },
      status_pesanan: "TIDAK DIPESAN",
      availability: "TERSEDIA",
    },
  });

  return NextResponse.json(data);
}
