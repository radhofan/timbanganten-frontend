import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("id");
  if (search) {
    const data = await prisma.jenazah.findUnique({
      where: { id_jenazah: search },
    });
    return NextResponse.json(data);
  }
  const data = await prisma.jenazah.findMany();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const data = await prisma.jenazah.create({
    data: {
      id_user: body.id_user ?? null,
      tanggal_pemakaman: body.tanggal_pemakaman ? new Date(body.tanggal_pemakaman) : null,
      status_jenazah: body.status_jenazah ?? null,
      masa_aktif: body.masa_aktif ?? null,
      id_blok: body.id_blok ?? null,
      status_pembayaran: body.status_pembayaran ?? null,
    },
  });
  return NextResponse.json(data);
}
