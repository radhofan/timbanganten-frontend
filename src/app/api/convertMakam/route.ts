import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = body.id;

    if (!id || typeof id !== "string" || id.trim() === "") {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const status = await prisma.makamStatus.findUnique({
      where: { id: id },
    });

    if (!status) {
      return NextResponse.json({ error: "Makam status tidak ditemukan" }, { status: 404 });
    }

    // --- CREATE NEW MAKAM ---
    const newMakam = await prisma.makam.create({
      data: {
        silsilah: status.silsilah,
        description: status.description,
        tanggalPemesanan: status.tanggalPemesanan,
        jenazahId: status.jenazahId,
        blokId: status.blokId,
      },
    });

    // --- UPDATE PENANGGUNG JAWAB BY MAKAMSTATUS ID ---
    // 1. Find all PJs linked to the old MakamStatus
    const pjs = await prisma.penanggungJawab.findMany({
      where: { makamStatus: { some: { id: status.id } } },
    });

    // 2. Update each PJ: connect new Makam and disconnect old MakamStatus
    await Promise.all(
      pjs.map((pj) =>
        prisma.penanggungJawab.update({
          where: { id: pj.id },
          data: {
            makam: { connect: { id: newMakam.id } },
            makamStatus: { disconnect: { id: status.id } },
          },
        })
      )
    );

    // --- DELETE OLD MAKAM ---
    await prisma.makamStatus.delete({ where: { id } });

    // --- UPDATE JENAZAH STATUS IF DIPESAN ---
    // if (status.jenazahId) {
    //   const jenazahData = await prisma.jenazah.findUnique({
    //     where: { id: status.jenazahId },
    //   });

    //   if (jenazahData && jenazahData.statusJenazah === "DIPESAN" && jenazahData.blokId) {
    //     // Get related blok
    //     const blokData = await prisma.blok.findUnique({
    //       where: { id: jenazahData.blokId },
    //     });

    //     let newJenazahStatus: string | null = null;
    //     let newBlokStatus: string | null = null;

    //     if (blokData?.statusBlok === "KOSONG") {
    //       newJenazahStatus = "DIKUBURKAN";
    //       newBlokStatus = "DIGUNAKAN-1";
    //     } else if (blokData?.statusBlok === "DIGUNAKAN-1") {
    //       newJenazahStatus = "DITUMPUK-2";
    //       newBlokStatus = "DIGUNAKAN-2";
    //     } else if (blokData?.statusBlok === "DIGUNAKAN-2") {
    //       newJenazahStatus = "DITUMPUK-3";
    //       newBlokStatus = "DIGUNAKAN-3";
    //     }

    //     if (jenazahData.tanggalPemakaman) {
    //       const oneYearLater = new Date(jenazahData.tanggalPemakaman);
    //       oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

    //       await prisma.jenazah.update({
    //         where: { id: jenazahData.id },
    //         data: {
    //           statusJenazah: newJenazahStatus,
    //           masaAktif: oneYearLater,
    //         },
    //       });
    //     }

    //     let newBlokAvailability: string | null = null;
    //     if (newBlokStatus === "DIGUNAKAN-3") {
    //       newBlokAvailability = "TIDAK TERSEDIA";
    //     } else {
    //       newBlokAvailability = "TERSEDIA";
    //     }

    //     if (newBlokStatus && blokData) {
    //       await prisma.blok.update({
    //         where: { id: blokData.id },
    //         data: {
    //           statusBlok: newBlokStatus,
    //           statusPesanan: "TIDAK DIPESAN",
    //           availability: newBlokAvailability,
    //           tanggalPemakamanTerakhir: new Date(),
    //         },
    //       });
    //     }
    //   }
    // }

    // --- UPDATE BLOK REGARDLESS ---
    if (status.jenazahId) {
      const jenazahData = await prisma.jenazah.findUnique({
        where: { id: status.jenazahId },
      });

      if (!jenazahData?.blokId) return;

      const blokData = await prisma.blok.findUnique({
        where: { id: jenazahData.blokId },
      });
      if (!blokData) return;

      await prisma.blok.update({
        where: { id: blokData.id },
        data: {
          statusPesanan: "TIDAK DIPESAN",
          availability: blokData.statusBlok === "DIGUNAKAN-3" ? "TIDAK TERSEDIA" : "TERSEDIA",
        },
      });
    }

    return NextResponse.json({
      message: "Berhasil disetujui dan status user diupdate",
      makam: newMakam,
    });
  } catch (err) {
    console.error("[approveMakam]", err);
    return NextResponse.json(
      { error: "Terjadi kesalahan saat menyetujui makam." },
      { status: 500 }
    );
  }
}
