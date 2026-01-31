import { z } from "zod";

export const makamSchema = z.object({
  namapj: z.string().min(1, "Nama Penanggung Jawab wajib diisi"),
  kontak: z.string().min(1, "Kontak Penanggung Jawab wajib diisi"),
  namajenazah: z.string().min(1, "Nama Jenazah wajib diisi"),
  // silsilah: z.string().min(1, "Hubungan wajib diisi"),
  lokasi: z.string().min(1, "Lokasi wajib diisi"),
  notes: z.string().min(1, "Penjelasan wajib diisi"),
  blok: z.string().min(1, "Blok wajib diisi"),
  tanggalPemesanan: z.string().min(1, "Tanggal Pemesanan wajib diisi"),
  tanggalPemakaman: z.string().optional(),
  statusBlok: z.string().min(1, "Status Blok wajib diisi"),
  statusJenazah: z.string().min(1, "Status Jenazah wajib diisi"),
  statusPembayaranPesanan: z.string().min(1, "Status Pembayaran Pesanan wajib diisi"),
  statusPembayaranIuranTahunan: z.string().min(1, "Status Pembayaran Iuran Tahunan wajib diisi"),
  jenazahId: z.string().min(1, "Jenazah ID wajib diisi"),
});

export type MakamPayload = z.infer<typeof makamSchema>;

export const makamDefaultValues: MakamPayload = {
  namapj: "",
  kontak: "",
  namajenazah: "",
  // silsilah: "",
  lokasi: "",
  notes: "",
  blok: "",
  tanggalPemesanan: "",
  tanggalPemakaman: "",
  statusBlok: "",
  statusJenazah: "",
  statusPembayaranPesanan: "",
  statusPembayaranIuranTahunan: "",
  jenazahId: "",
};
