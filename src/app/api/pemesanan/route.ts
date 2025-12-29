import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();

  const blokData = await prisma.blok.findUnique({
    where: { id: body.id_blok },
  });

  let existingPJ = null;
  if (body.existingUserId) {
    existingPJ = await prisma.penanggungJawab.findUnique({
      where: { userId: body.existingUserId },
    });
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

      // --- PESAN MAKAM USER BARU ---
      if (!useExistingPJ) {
        // 1. Buat Akun User (PA)
        const newUserPA = await prisma.user.create({
          data: {
            name: body.userPAName,
            contact: body.userPAContact,
            email: body.userPAEmail,
            status: "PESAN",
            ktpNum: body.userPAKTP ?? null,
          },
        });
        paId = newUserPA.id;

        if (!diriSendiri) {
          // 2. Buat Akun User (PB)
          const newUserPB = await prisma.user.create({
            data: {
              name: body.userPBName,
              status: "PENDING",
            },
          });
          pbId = newUserPB.id;

          // 3. Buat Akun Jenazah (PB) minimal
          const newJenazahPB = await prisma.jenazah.create({
            data: {
              id: pbId,
              tanggalPemakaman: body.tanggalPemakaman,
              statusJenazah: finalJenazahStatus,
              blokId: body.id_blok,
              statusPembayaranPesanan: "UNPAID",
              statusPembayaranIuranTahunan: "UNPAID",
            },
          });
          jenazahId = newJenazahPB.id;
        } else {
          // diri sendiri: jenazah = PA
          const newJenazahPA = await prisma.jenazah.create({
            data: {
              id: paId,
              tanggalPemakaman: body.tanggalPemakaman,
              statusJenazah: finalJenazahStatus,
              blokId: body.id_blok,
              statusPembayaranPesanan: "UNPAID",
              statusPembayaranIuranTahunan: "UNPAID",
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
            ext: "PENDING",
            payment: "PENDING",
            approved: "PENDING",
            description: body.notes,
            namaPenanggungJawab: body.pjName,
            kontakPenanggungJawab: body.pjContact,
            tanggalPemesanan: body.tanggalPemesanan,
            userId: paId ?? null,
            jenazahId: jenazahId ?? null,
            blokId: body.id_blok ?? null,
          },
        });

        // 5. NOW create PJ with makamStatusId
        const newPJ = await prisma.penanggungJawab.create({
          data: {
            userId: paId,
            makamStatusId: makamStatus.id, // ✅ Link to MakamStatus
          },
        });
        pjId = newPJ.id;

        // Update Blok
        await prisma.blok.update({
          where: { id: body.id_blok },
          data: {
            ...(body.tanggalPemakaman ? { tanggalPemakamanTerakhir: body.tanggalPemakaman } : {}),
            ...(finalStatusBlok ? { statusBlok: finalStatusBlok } : {}),
            availability: "TIDAK TERSEDIA",
            statusPesanan: "DIPESAN",
          },
        });

        return makamStatus;
      }

      // --- PESAN MAKAM USER EXISTING PJ ---
      if (useExistingPJ) {
        pjId = existingPJ?.id;

        if (!diriSendiri) {
          // 1. Buat Akun User (PB)
          const newUserPB = await prisma.user.create({
            data: {
              name: body.userPBName,
              status: "PENDING",
            },
          });
          pbId = newUserPB.id;

          // 2. Buat Akun Jenazah (PB) minimal
          const newJenazahPB = await prisma.jenazah.create({
            data: {
              id: pbId,
              tanggalPemakaman: body.tanggalPemakaman,
              statusJenazah: finalJenazahStatus,
              blokId: body.id_blok,
              statusPembayaranPesanan: "UNPAID",
              statusPembayaranIuranTahunan: "UNPAID",
            },
          });
          paId = body.existingUserId;
          jenazahId = newJenazahPB.id;
        } else {
          // diri sendiri: jenazah = PJ user
          const newJenazahPA = await prisma.jenazah.create({
            data: {
              id: pjId,
              tanggalPemakaman: body.tanggalPemakaman,
              statusJenazah: finalJenazahStatus,
              blokId: body.id_blok,
              statusPembayaranPesanan: "UNPAID",
              statusPembayaranIuranTahunan: "UNPAID",
            },
          });

          paId = pjId;
          jenazahId = newJenazahPA.id;
        }

        // 3. Create Makam Status
        const makamStatus = await prisma.makamStatus.create({
          data: {
            nama: body.namaJenazah,
            lokasi: body.lokasi,
            silsilah: body.silsilah,
            ext: "PENDING",
            payment: "PENDING",
            approved: "PENDING",
            description: body.notes,
            namaPenanggungJawab: body.pjName,
            kontakPenanggungJawab: body.pjContact,
            tanggalPemesanan: body.tanggalPemesanan,
            userId: paId ?? null,
            jenazahId: jenazahId ?? null,
            blokId: body.id_blok ?? null,
          },
        });

        // 4. Update existing PJ to link to this MakamStatus
        await prisma.penanggungJawab.update({
          where: { id: pjId },
          data: {
            makamStatusId: makamStatus.id, // ✅ Link existing PJ to new MakamStatus
          },
        });

        // Update Blok
        await prisma.blok.update({
          where: { id: body.id_blok },
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
