// Search endpoint backing the PJ autocomplete in the booking form.
// Auth: any staff role.
//
// NOTE: behaviour intentionally mirrors the legacy implementation — it returns
// users with their PenanggungJawab include regardless of whether they actually
// have a PJ row. Adjust callers, not this endpoint, if scoping is needed.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";

const STAFF_ROLES = ["admin", "approver", "pengawas"] as const;

export async function GET(request: Request) {
  const guard = await requireRole(request, STAFF_ROLES);
  if (!guard.ok) return guard.response;

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const query = url.searchParams.get("query");

  if (id) {
    const user = await prisma.user.findUnique({
      where: { id: String(id) },
      include: {
        penanggungJawab: {
          include: { makam: true, makamStatus: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ error: "PJ not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  }

  const users = query
    ? await prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { contact: { contains: query, mode: "insensitive" } },
          ],
        },
        include: {
          penanggungJawab: {
            include: { makam: true, makamStatus: true },
          },
        },
      })
    : await prisma.user.findMany({
        include: {
          penanggungJawab: {
            include: { makam: true, makamStatus: true },
          },
        },
      });

  return NextResponse.json(users);
}
