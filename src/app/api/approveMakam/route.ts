import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body; // ID of the makamStatus record

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Find the status record
    const status = await prisma.makamStatus.findUnique({
      where: { id },
    });

    if (!status) {
      return NextResponse.json({ error: "Status not found" }, { status: 404 });
    }

    // Create new makam record with approved: "APPROVED"
    const newMakam = await prisma.makam.create({
      data: {
        blok: status.blok,
        nama: status.nama,
        lokasi: status.lokasi,
        silsilah: status.silsilah,
        ext: status.ext,
        masa_aktif: status.masa_aktif,
        nama_penanggung_jawab: status.nama_penanggung_jawab,
        kontak_penanggung_jawab: status.kontak_penanggung_jawab,
        description: status.description,
        payment: status.payment,
        approved: "APPROVED",
        userId: status.userId,
      },
    });

    // Delete the status record
    await prisma.makamStatus.delete({
      where: { id },
    });

    return NextResponse.json(newMakam, { status: 201 });
  } catch (error) {
    console.error("[approveMakam]", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
