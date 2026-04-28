import { z } from "zod";

export const silsilahValues = [
  "Diri Sendiri",
  "Anak",
  "Orang Tua",
  "Kakak Adik",
  "Sepupu",
  "Keponakan",
  "Paman Bibi",
  "Kakek Nenek",
  "Cucu",
  "Lebih 2 Generasi di Atas",
  "Lebih 2 Generasi di Bawah",
] as const;

export type Silsilah = (typeof silsilahValues)[number];

export const pemesananSchema = z.object({
  namaJenazah: z.string().min(1, "Nama jenazah wajib diisi"),
  blokId: z.string().min(1, "Pilih blok"),
  lokasi: z.string().min(1, "Pilih lokasi"),
  silsilah: z.enum(silsilahValues, { message: "Pilih hubungan" }),
  notes: z.string().optional(),
  existingUserId: z.string().optional(),
  emergencyName: z.string().optional(),
  emergencyContact: z
    .string()
    .optional()
    .refine((val) => !val || /^08\d{8,12}$/.test(val), "Format kontak darurat tidak valid"),
  userPAName: z.string().optional(),
  userPAContact: z
    .string()
    .optional()
    .refine((val) => !val || /^08\d{8,12}$/.test(val), "Format kontak tidak valid"),
  userPAEmail: z
    .string()
    .optional()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Email tidak valid"),
  userPAKTP: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{16}$/.test(val), "KTP harus 16 digit dan angka saja"),
  tanggalPemesanan: z.string().optional(),
  tanggalPemakaman: z.string().optional(),
});

export type PemesananPayload = z.infer<typeof pemesananSchema>;

export const pemesananDefaultValues: PemesananPayload = {
  namaJenazah: "",
  blokId: "",
  lokasi: "",
  silsilah: "" as Silsilah,
  notes: "",
  emergencyName: "",
  emergencyContact: "",
  userPAName: "",
  userPAContact: "",
  userPAEmail: "",
  userPAKTP: "",
  tanggalPemesanan: "",
  tanggalPemakaman: "",
};
