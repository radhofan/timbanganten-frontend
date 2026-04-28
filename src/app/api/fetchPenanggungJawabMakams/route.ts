// Return every Makam and MakamStatus a given user supervises, plus the
// related Blok / Jenazah / RelasiOrang context. Auth: any staff role.
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth";

const STAFF_ROLES = ["admin", "approver", "pengawas"] as const;

export async function POST(request: Request) {
  const guard = await requireRole(request, STAFF_ROLES);
  if (!guard.ok) return guard.response;

  const body = await request.json();
  const { userId } = body;
  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const penanggungJawab = await prisma.penanggungJawab.findMany({
    where: { userId },
    include: {
      makam: {
        include: {
          blok: true,
          jenazah: {
            include: {
              user: {
                include: {
                  relasiOrang1: { where: { orang2Id: userId } },
                  relasiOrang2: { where: { orang1Id: userId } },
                },
              },
            },
          },
        },
      },
      makamStatus: {
        include: {
          blok: true,
          jenazah: {
            include: {
              user: {
                include: {
                  relasiOrang1: { where: { orang2Id: userId } },
                  relasiOrang2: { where: { orang1Id: userId } },
                },
              },
            },
          },
        },
      },
    },
  });

  return NextResponse.json(penanggungJawab);
}
