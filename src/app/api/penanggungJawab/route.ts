import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get("id");
  if (search) {
    const data = await prisma.penanggung_Jawab.findUnique({
      where: { id_penanggung_jawab: search },
    });
    return NextResponse.json(data);
  }
  const data = await prisma.penanggung_Jawab.findMany();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  const data = await prisma.penanggung_Jawab.create({
    data: {
      id_user: body.id_user ?? null,
    },
  });
  return NextResponse.json(data);
}
