import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();

  const errors: Record<string, string> = {};

  // --- UNIQUE FIELD CHECKS --- //////////////////////////
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
    return NextResponse.json({ errors }, { status: 400 });
  }

  // --- TRANSACTION --- //////////////////////////
  try {
    const result = await prisma.$transaction(async (prisma) => {
      // --- DEFINE BODY VARS --- //////////////////////////
      let paId: string | undefined; // Orang ke-1 (Pemesan)
      let pbId: string | undefined; // Orang ke-2 (Dimakamkan)
      let pjId: string | undefined; // ID PJ Orang ke-1
      let jenazahId: string | undefined; // ID Jenazah Orang ke-2

      const useExistingPJ = !!body.existingUserId;
      const diriSendiri = body.diriSendiri === true;

      let existingPJ = null;
      if (body.existingUserId) {
        existingPJ = await prisma.penanggungJawab.findUnique({
          where: { userId: body.existingUserId },
        });
      }

      // --- CEK APAKAH JENAZAH SUDAH DIKUBUR --- //////////////////////////
      let finalJenazahStatus;
      let finalStatusBlok: string | undefined;

      const blokData = await prisma.blok.findUnique({
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
        const newUserPA = await prisma.user.create({
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
          const newUserPB = await prisma.user.create({
            data: {
              name: body.userPBName,
            },
          });
          pbId = newUserPB.id;

          // 2. Buat Akun Jenazah (PB)
          const newJenazahPB = await prisma.jenazah.create({
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
          const newJenazahPA = await prisma.jenazah.create({
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
        const makamStatus = await prisma.makamStatus.create({
          data: {
            description: body.notes,
            tanggalPemesanan: body.tanggalPemesanan,
            jenazahId: jenazahId ?? null,
            blokId: body.blokId ?? null,
          },
        });

        // 2. NOW create PJ with makamStatusId
        const newPJ = await prisma.penanggungJawab.create({
          data: {
            userId: paId,
            makamStatus: {
              connect: { id: makamStatus.id },
            },
          },
        });
        pjId = newPJ.id;

        // 3. Update Blok
        await prisma.blok.update({
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
          await prisma.relasiOrang.create({
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
          const newUserPB = await prisma.user.create({
            data: {
              name: body.userPBName,
            },
          });
          pbId = newUserPB.id;

          // 2. Buat Akun Jenazah (PB) minimal
          const newJenazahPB = await prisma.jenazah.create({
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
          const newJenazahPA = await prisma.jenazah.create({
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
        const makamStatus = await prisma.makamStatus.create({
          data: {
            description: body.notes,
            tanggalPemesanan: body.tanggalPemesanan,
            jenazahId: jenazahId ?? null,
            blokId: body.blokId ?? null,
          },
        });

        // 2. Update existing PJ to link to this MakamStatus
        await prisma.penanggungJawab.update({
          where: { id: pjId },
          data: {
            makamStatus: {
              connect: { id: makamStatus.id },
            },
          },
        });

        // 3. Update Blok
        await prisma.blok.update({
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
          await prisma.relasiOrang.create({
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
