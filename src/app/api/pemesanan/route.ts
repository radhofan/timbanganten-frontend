import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();

  const blokData = await prisma.blok.findUnique({
    where: { id: body.blokId },
  });

  let existingPJ = null;
  if (body.existingUserId) {
    existingPJ = await prisma.penanggungJawab.findUnique({
      where: { userId: body.existingUserId },
    });
    console.log("existingUserId from body:", body.existingUserId);
    console.log("existingPJ fetched:", existingPJ);
  }

  let finalJenazahStatus;
  let finalStatusBlok: string;
  // CEK APAKAH SUDAH DIMAKAMKAN ATAU BELUM
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

  try {
    const result = await prisma.$transaction(async (prisma) => {
      let paId: string | undefined;
      let pbId: string | undefined;
      let pjId: string | undefined;
      let jenazahId: string | undefined;

      const useExistingPJ = !!body.existingUserId;
      const diriSendiri = body.diriSendiri === true;

      // --- PESAN MAKAM USER BARU --- //////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (!useExistingPJ) {
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

        if (!diriSendiri) {
          // --- ORANG LAIN--- //////////////////////////
          // 2. Buat Akun User (PB)
          const newUserPB = await prisma.user.create({
            data: {
              name: body.userPBName,
            },
          });
          pbId = newUserPB.id;

          // 3. Buat Akun Jenazah (PB) minimal
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
        } else {
          // --- DIRI SENDIRI --- //////////////////////////
          // diri sendiri: jenazah = PA
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
          jenazahId = newJenazahPA.id;
        }

        // 4. Buat Makam Status FIRST (before PJ)
        const makamStatus = await prisma.makamStatus.create({
          data: {
            nama: body.namaJenazah,
            lokasi: body.lokasi,
            silsilah: body.silsilah,
            description: body.notes,
            tanggalPemesanan: body.tanggalPemesanan,
            jenazahId: jenazahId ?? null,
            blokId: body.blokId ?? null,
          },
        });

        // 5. NOW create PJ with makamStatusId
        const newPJ = await prisma.penanggungJawab.create({
          data: {
            userId: paId,
            makamStatus: {
              connect: { id: makamStatus.id }, // ✅ Connect via relation
            },
          },
        });
        pjId = newPJ.id;

        // Update Blok
        await prisma.blok.update({
          where: { id: body.blokId },
          data: {
            ...(body.tanggalPemakaman ? { tanggalPemakamanTerakhir: body.tanggalPemakaman } : {}),
            ...(finalStatusBlok ? { statusBlok: finalStatusBlok } : {}),
            availability: "TIDAK TERSEDIA",
            statusPesanan: "DIPESAN",
          },
        });

        return makamStatus;
      }

      // --- PESAN MAKAM USER EXISTING PJ --- //////////////////////////////////////////////////////////////////////////////////////////////////////////
      if (useExistingPJ) {
        pjId = existingPJ?.id;

        if (!diriSendiri) {
          // --- ORANG LAIN --- //////////////////////////
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
          paId = body.existingUserId;
          jenazahId = newJenazahPB.id;
        } else {
          // --- DIRI SENDIRI --- //////////////////////////
          // diri sendiri: jenazah = PJ user
          // --- DIRI SENDIRI --- //////////////////////////
          console.log("=== DIRI SENDIRI BRANCH ===");
          console.log("body.existingUserId:", body.existingUserId);
          console.log("existingPJ:", existingPJ);
          console.log("blokData:", blokData);
          console.log("finalJenazahStatus:", finalJenazahStatus);
          console.log("finalStatusBlok:", finalStatusBlok);
          console.log("paId before jenazah.create:", paId);
          console.log("pjId before jenazah.create:", pjId);
          console.log("body.tanggalPemakaman:", body.tanggalPemakaman);
          console.log("body.blokId:", body.blokId);
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

          paId = body.existingUserId;
          jenazahId = newJenazahPA.id;
        }

        // 3. Create Makam Status
        const makamStatus = await prisma.makamStatus.create({
          data: {
            nama: body.namaJenazah,
            lokasi: body.lokasi,
            silsilah: body.silsilah,
            description: body.notes,
            tanggalPemesanan: body.tanggalPemesanan,
            jenazahId: jenazahId ?? null,
            blokId: body.blokId ?? null,
          },
        });

        // 4. Update existing PJ to link to this MakamStatus
        await prisma.penanggungJawab.update({
          where: { id: pjId },
          data: {
            makamStatus: {
              connect: { id: makamStatus.id }, // ✅ Connect via relation
            },
          },
        });

        // Update Blok
        await prisma.blok.update({
          where: { id: body.blokId },
          data: {
            ...(body.tanggalPemakaman ? { tanggalPemakamanTerakhir: body.tanggalPemakaman } : {}),
            ...(finalStatusBlok ? { statusBlok: finalStatusBlok } : {}),
            availability: "TIDAK TERSEDIA",
            statusPesanan: "DIPESAN",
          },
        });

        return makamStatus;
      }
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal membuat pemesanan." }, { status: 500 });
  }
}
