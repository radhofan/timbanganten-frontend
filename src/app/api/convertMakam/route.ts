import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const id = parseInt(body.id, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const status = await prisma.makamStatus.findUnique({
      where: { id },
    });

    if (!status) {
      return NextResponse.json({ error: "Makam status tidak ditemukan" }, { status: 404 });
    }

    const newMakam = await prisma.makam.create({
      data: {
        nama: status.nama,
        lokasi: status.lokasi,
        silsilah: status.silsilah,
        ext: status.ext,
        masa_aktif: status.masa_aktif,
        nama_penanggung_jawab: status.nama_penanggung_jawab,
        kontak_penanggung_jawab: status.kontak_penanggung_jawab,
        description: status.description,
        payment: status.payment,
        tanggal_pemesanan: status.tanggal_pemesanan,
        approved: status.approved,
        userId: status.userId,
        pjId: status.pjId,
        jenazahId: status.jenazahId,
        blokId: status.blokId,
      },
    });

    await prisma.makamStatus.delete({ where: { id } });

    if (status.userId) {
      const remainingStatusCount = await prisma.makamStatus.count({
        where: { userId: status.userId },
      });

      const newStatus = remainingStatusCount > 0 ? "AKTIF/PESAN" : "AKTIF";

      await prisma.user.update({
        where: { id: status.userId },
        data: { status: newStatus },
      });
    }

    // --- UPDATE JENAZAH STATUS IF DIPESAN ---
    if (status.jenazahId) {
      const jenazahData = await prisma.jenazah.findUnique({
        where: { id_jenazah: status.jenazahId },
      });

      if (jenazahData && jenazahData.status_jenazah === "DIPESAN" && jenazahData.id_blok) {
        // Get related blok
        const blokData = await prisma.blok.findUnique({
          where: { id_blok: jenazahData.id_blok },
        });

        let newJenazahStatus: string | null = null;
        let newBlokStatus: string | null = null;

        if (blokData?.status_blok === "KOSONG") {
          newJenazahStatus = "DIKUBURKAN";
          newBlokStatus = "DIGUNAKAN-1";
        } else if (blokData?.status_blok === "DIGUNAKAN-1") {
          newJenazahStatus = "DITUMPUK-2";
          newBlokStatus = "DIGUNAKAN-2";
        } else if (blokData?.status_blok === "DIGUNAKAN-2") {
          newJenazahStatus = "DITUMPUK-3";
          newBlokStatus = "DIGUNAKAN-3";
        }

        if (jenazahData.tanggal_pemakaman) {
          const oneYearLater = new Date(jenazahData.tanggal_pemakaman);
          oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

          await prisma.jenazah.update({
            where: { id_jenazah: jenazahData.id_jenazah },
            data: {
              status_jenazah: newJenazahStatus,
              masa_aktif: oneYearLater,
            },
          });
        }

        let newBlokAvailability: string | null = null;
        if (newBlokStatus === "DIGUNAKAN-3") {
          newBlokAvailability = "TIDAK TERSEDIA";
        } else {
          newBlokAvailability = "TERSEDIA";
        }

        if (newBlokStatus && blokData) {
          await prisma.blok.update({
            where: { id_blok: blokData.id_blok },
            data: {
              status_blok: newBlokStatus,
              status_pesanan: "TIDAK DIPESAN",
              availability: newBlokAvailability,
              tanggal_pemakaman_terakhir: new Date(),
            },
          });
        }
      }
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
