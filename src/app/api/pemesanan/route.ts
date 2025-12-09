import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const body = await request.json();

  const blokData = await prisma.blok.findUnique({
    where: { id_blok: body.id_blok },
  });

  let finalJenazahStatus;
  let finalStatusBlok: string;
  // CEK APAKAH SUDAH DIMAKAMKAN ATAU BELUM
  if (body.tanggalPemakaman) {
    if (blokData?.status_blok === "DIGUNAKAN-1") {
      finalJenazahStatus = "DITUMPUK-2";
      finalStatusBlok = "DIGUNAKAN-2";
    } else if (blokData?.status_blok === "DIGUNAKAN-2") {
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

      const useExistingPJ = !!body.existingPJId;
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
            ktp_num: body.userPAKTP ?? null,
          },
        });
        paId = newUserPA.id;

        // 2. Buat Akun PJ (PA)
        const newPJ = await prisma.penanggung_Jawab.create({
          data: {
            id_user: paId,
          },
        });
        pjId = newPJ.id_penanggung_jawab;

        if (!diriSendiri) {
          // 3. Buat Akun User (PB)
          const newUserPB = await prisma.user.create({
            data: {
              name: body.userPBName,
              // contact: body.userPBContact,
              // email: body.userPBEmail,
              status: "PENDING",
            },
          });
          pbId = newUserPB.id;

          // 4. Buat Akun Jenazah (PB) minimal
          const newJenazahPB = await prisma.jenazah.create({
            data: {
              id_user: pbId,
              tanggal_pemakaman: body.tanggalPemakaman,
              status_jenazah: finalJenazahStatus,
              id_blok: body.id_blok,
            },
          });
          jenazahId = newJenazahPB.id_jenazah;
        } else {
          // diri sendiri: jenazah = PA
          const newJenazahPA = await prisma.jenazah.create({
            data: {
              id_user: paId,
              tanggal_pemakaman: body.tanggalPemakaman,
              status_jenazah: finalJenazahStatus,
              id_blok: body.id_blok,
            },
          });
          jenazahId = newJenazahPA.id_jenazah;
        }
      }

      // --- PESAN MAKAM USER EXISTING PJ ---
      if (useExistingPJ) {
        pjId = body.existingPJId;

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
              id_user: pbId,
              tanggal_pemakaman: body.tanggalPemakaman,
              status_jenazah: finalJenazahStatus,
              id_blok: body.id_blok,
            },
          });
          paId = pjId;
          jenazahId = newJenazahPB.id_jenazah;
        } else {
          // diri sendiri: jenazah = PJ user
          const newJenazahPA = await prisma.jenazah.create({
            data: {
              id_user: pjId,
              tanggal_pemakaman: body.tanggalPemakaman,
              status_jenazah: finalJenazahStatus,
              id_blok: body.id_blok,
            },
          });

          paId = pjId;
          jenazahId = newJenazahPA.id_jenazah;
        }
      }

      // --- Buat Makam Status ---
      const makamStatus = await prisma.makamStatus.create({
        data: {
          nama: body.namaJenazah,
          blok: body.blok,
          lokasi: body.lokasi,
          silsilah: body.silsilah,
          ext: "PENDING",
          payment: "PENDING",
          approved: "PENDING",
          description: body.notes,
          nama_penanggung_jawab: body.pjName,
          kontak_penanggung_jawab: body.pjContact,
          tanggal_pemesanan: body.tanggalPemesanan,
          userId: paId ?? null,
          pjId: pjId ?? null,
          jenazahId: jenazahId ?? null,
          blokId: body.id_blok ?? null,
        },
      });

      // --- Update Blok to be unavailable ---
      await prisma.blok.update({
        where: { id_blok: body.id_blok },
        data: {
          ...(body.tanggalPemakaman ? { tanggal_pemakaman_terakhir: body.tanggalPemakaman } : {}),
          ...(finalStatusBlok ? { status_blok: finalStatusBlok } : {}),
          availability: "TIDAK TERSEDIA",
          status_pesanan: "DIPESAN",
        },
      });

      return makamStatus;
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Gagal membuat pemesanan." }, { status: 500 });
  }
}
