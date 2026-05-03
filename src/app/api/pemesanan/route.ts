// POST /api/pemesanan
//
// Creates a MakamStatus (pending makam booking) plus the supporting User /
// Jenazah / PenanggungJawab / RelasiOrang rows in a single transaction.
//
// Two flows are handled:
//   - new PJ           -> create PA user + (optional) PB user + jenazah + new PJ
//   - existing PJ      -> reuse selected user, create PB user + jenazah, link PJ
//                         to the new MakamStatus
//
// Auth: any authenticated staff role (admin/approver/pengawas).
// Validation: form fields are validated against pemesananSchema; extra payload
// fields the client sends (diriSendiri, userPBName) are passed through to the
// transaction unchanged.
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireRole } from "@/lib/auth";
import { pemesananSchema } from "@/validation/pemesanan";

const STAFF_ROLES = ["admin", "approver", "pengawas"] as const;

/**
 * @route   POST /api/pemesanan
 * @desc    Create a pending makam booking. Inside one transaction it (1)
 *          creates or reuses the PA user, (2) creates the PB user + jenazah
 *          when the booking is for someone else, (3) creates the MakamStatus,
 *          (4) attaches a PJ to that MakamStatus, (5) flips the Blok flags,
 *          and (6) records the silsilah relation between PA and PB.
 * @access  admin | approver | pengawas
 * @body    pemesananSchema fields + ad-hoc { diriSendiri, userPBName, ... }
 * @returns 200 MakamStatus   400 validation   409 duplicate email/KTP
 *          500 transaction error   401/403 on auth
 */
export async function POST(request: Request) {
  const guard = await requireRole(request, STAFF_ROLES);
  if (!guard.ok) return guard.response;

  const body = await request.json();

  // Validate the user-supplied form fields. We keep the raw body afterwards
  // because the transaction also reads ad-hoc fields (diriSendiri, userPBName)
  // that the client appends outside the schema.
  const parsed = pemesananSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Normalize email to avoid case-different duplicates leaking through.
  if (typeof body.userPAEmail === "string") {
    body.userPAEmail = body.userPAEmail.toLowerCase();
  }

  const errors: Record<string, string> = {};

  // --- UNIQUE FIELD CHECKS --- //////////////////////////
  // Skip when reusing an existing PJ — the user already exists in the DB.
  if (!body.existingUserId) {
    if (body.userPAEmail) {
      const existingEmail = await prisma.user.findUnique({
        where: { email: body.userPAEmail },
      });
      if (existingEmail) errors.userPAEmail = "Email sudah digunakan";
    }

    if (body.userPAKTP) {
      const existingKTP = await prisma.user.findUnique({
        where: { ktpNum: body.userPAKTP },
      });
      if (existingKTP) errors.userPAKTP = "KTP sudah digunakan";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 409 });
    }
  }

  // --- TRANSACTION --- //////////////////////////
  try {
    const result = await prisma.$transaction(async (tx) => {
      // --- DEFINE BODY VARS --- //////////////////////////
      let paId: string | undefined; // Orang ke-1 (Pemesan)
      let pbId: string | undefined; // Orang ke-2 (Dimakamkan)
      let pjId: string | undefined; // ID PJ Orang ke-1
      let jenazahId: string | undefined; // ID Jenazah Orang ke-2

      const useExistingPJ = !!body.existingUserId;
      const diriSendiri = body.diriSendiri === true;

      let existingPJ = null;
      if (body.existingUserId) {
        existingPJ = await tx.penanggungJawab.findUnique({
          where: { userId: body.existingUserId },
        });
        if (!existingPJ) {
          throw new Error("PenanggungJawab tidak ditemukan untuk user yang dipilih.");
        }
      }

      // --- CEK APAKAH JENAZAH SUDAH DIKUBUR --- //////////////////////////
      let finalJenazahStatus;
      let finalStatusBlok: string | undefined;

      const blokData = await tx.blok.findUnique({
        where: { id: body.blokId },
      });

      if (body.tanggalPemakaman) {
        if (blokData?.statusBlok === "DIGUNAKAN-1") {
          finalJenazahStatus = "DITUMPUK-2";
          finalStatusBlok = "DIGUNAKAN-2";
        } else if (blokData?.statusBlok === "DIGUNAKAN-2") {
          finalJenazahStatus = "DITUMPUK-3";
          finalStatusBlok = "DIGUNAKAN-3";
        } else {
          finalJenazahStatus = "DIKUBURKAN";
          finalStatusBlok = "DIGUNAKAN-1";
        }
      } else {
        finalJenazahStatus = "DIPESAN";
      }

      // --- PESAN MAKAM DENGAN USER BARU --- //////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (!useExistingPJ) {
        // --- BUAT AKUN USER PJ--- //////////////////////////
        // 1. Buat Akun User (PA)
        const newUserPA = await tx.user.create({
          data: {
            name: body.userPAName,
            contact: body.userPAContact,
            email: body.userPAEmail,
            ktpNum: body.userPAKTP ?? null,
            emergencyName: body.emergencyName,
            emergencyContact: body.emergencyContact,
          },
        });
        paId = newUserPA.id;

        // --- ORANG LAIN--- //////////////////////////
        if (!diriSendiri) {
          // 1. Buat Akun User (PB)
          const newUserPB = await tx.user.create({
            data: {
              name: body.userPBName,
            },
          });
          pbId = newUserPB.id;

          // 2. Buat Akun Jenazah (PB)
          const newJenazahPB = await tx.jenazah.create({
            data: {
              tanggalPemakaman: body.tanggalPemakaman,
              statusJenazah: finalJenazahStatus,
              blokId: body.blokId,
              statusPembayaranPesanan: "UNPAID",
              statusPembayaranIuranTahunan: "UNPAID",
              masaAktif: new Date(
                new Date().setFullYear(new Date().getFullYear() + (body.tanggalPemakaman ? 1 : 4))
              ),
              userId: pbId,
            },
          });
          jenazahId = newJenazahPB.id;
        }

        // --- DIRI SENDIRI --- //////////////////////////
        if (diriSendiri) {
          // 1. Buat Akun Jenazah diri sendiri
          const newJenazahPA = await tx.jenazah.create({
            data: {
              tanggalPemakaman: body.tanggalPemakaman,
              statusJenazah: finalJenazahStatus,
              blokId: body.blokId,
              statusPembayaranPesanan: "UNPAID",
              statusPembayaranIuranTahunan: "UNPAID",
              masaAktif: new Date(
                new Date().setFullYear(new Date().getFullYear() + (body.tanggalPemakaman ? 1 : 4))
              ),
              userId: paId,
            },
          });
          pbId = paId;
          jenazahId = newJenazahPA.id;
        }

        // --- UPDATE CHANGES --- //////////////////////////
        // 1. Create Makam Status
        const makamStatus = await tx.makamStatus.create({
          data: {
            description: body.notes,
            tanggalPemesanan: body.tanggalPemesanan,
            jenazahId: jenazahId ?? null,
            blokId: body.blokId ?? null,
          },
        });

        // 2. NOW create PJ with makamStatusId
        const newPJ = await tx.penanggungJawab.create({
          data: {
            userId: paId,
            makamStatus: {
              connect: { id: makamStatus.id },
            },
          },
        });
        pjId = newPJ.id;

        // 3. Update Blok
        await tx.blok.update({
          where: { id: body.blokId },
          data: {
            ...(body.tanggalPemakaman ? { tanggalPemakamanTerakhir: body.tanggalPemakaman } : {}),
            ...(finalStatusBlok ? { statusBlok: finalStatusBlok } : {}),
            availability: "TIDAK TERSEDIA",
            statusPesanan: "DIPESAN",
          },
        });

        // 4. Create new relation
        if (paId && pbId) {
          await tx.relasiOrang.create({
            data: {
              orang1Id: paId,
              orang2Id: pbId,
              jenisHubungan: body.silsilah,
            },
          });
        }

        return makamStatus;
      }

      // --- PESAN MAKAM DENGAN USER SUDAH ADA --- //////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (useExistingPJ) {
        paId = body.existingUserId;
        pjId = existingPJ?.id;

        // --- ORANG LAIN --- //////////////////////////
        if (!diriSendiri) {
          // 1. Buat Akun User (PB)
          const newUserPB = await tx.user.create({
            data: {
              name: body.userPBName,
            },
          });
          pbId = newUserPB.id;

          // 2. Buat Akun Jenazah (PB) minimal
          const newJenazahPB = await tx.jenazah.create({
            data: {
              tanggalPemakaman: body.tanggalPemakaman,
              statusJenazah: finalJenazahStatus,
              blokId: body.blokId,
              statusPembayaranPesanan: "UNPAID",
              statusPembayaranIuranTahunan: "UNPAID",
              masaAktif: new Date(
                new Date().setFullYear(new Date().getFullYear() + (body.tanggalPemakaman ? 1 : 4))
              ),
              userId: pbId,
            },
          });
          jenazahId = newJenazahPB.id;
        }

        // --- DIRI SENDIRI --- //////////////////////////
        if (diriSendiri) {
          // 1. Buat Akun Jenazah diri sendiri
          const newJenazahPA = await tx.jenazah.create({
            data: {
              tanggalPemakaman: body.tanggalPemakaman,
              statusJenazah: finalJenazahStatus,
              blokId: body.blokId,
              statusPembayaranPesanan: "UNPAID",
              statusPembayaranIuranTahunan: "UNPAID",
              masaAktif: new Date(
                new Date().setFullYear(new Date().getFullYear() + (body.tanggalPemakaman ? 1 : 4))
              ),
              userId: body.existingUserId,
            },
          });
          jenazahId = newJenazahPA.id;
        }

        // --- UPDATE CHANGES --- //////////////////////////
        // 1. Create Makam Status
        const makamStatus = await tx.makamStatus.create({
          data: {
            description: body.notes,
            tanggalPemesanan: body.tanggalPemesanan,
            jenazahId: jenazahId ?? null,
            blokId: body.blokId ?? null,
          },
        });

        // 2. Update existing PJ to link to this MakamStatus
        await tx.penanggungJawab.update({
          where: { id: pjId },
          data: {
            makamStatus: {
              connect: { id: makamStatus.id },
            },
          },
        });

        // 3. Update Blok
        await tx.blok.update({
          where: { id: body.blokId },
          data: {
            ...(body.tanggalPemakaman ? { tanggalPemakamanTerakhir: body.tanggalPemakaman } : {}),
            ...(finalStatusBlok ? { statusBlok: finalStatusBlok } : {}),
            availability: "TIDAK TERSEDIA",
            statusPesanan: "DIPESAN",
          },
        });

        // 4. Create new relation
        if (paId && pbId) {
          await tx.relasiOrang.create({
            data: {
              orang1Id: paId,
              orang2Id: pbId,
              jenisHubungan: body.silsilah,
            },
          });
        }

        return makamStatus;
      }
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal membuat pemesanan." }, { status: 500 });
  }
}
