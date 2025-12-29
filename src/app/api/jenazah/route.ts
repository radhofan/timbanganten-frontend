import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("id");

  if (search) {
    const data = await prisma.jenazah.findUnique({
      where: { id: search },
      include: {
        user: true,
        blok: true,
      },
    });
    return NextResponse.json(data);
  }

  const data = await prisma.jenazah.findMany({
    include: {
      user: true,
      blok: true,
    },
  });

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const data = await prisma.jenazah.create({
    data: {
      id: body.id_user ?? null,
      tanggalPemakaman: body.tanggal_pemakaman ? new Date(body.tanggal_pemakaman) : null,
      statusJenazah: body.status_jenazah ?? null,
      masaAktif: body.masa_aktif ?? null,
      blokId: body.id_blok ?? null,
      statusPembayaranPesanan: body.status_pembayaran_pesanan ?? null,
      statusPembayaranIuranTahunan: body.status_pembayaran_iuran_tahunan ?? null,
    },
  });
  return NextResponse.json(data);
}
