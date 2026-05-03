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

// Fields shared by both flows
const commonFields = z.object({
  namaJenazah: z.string().min(1, "Nama almarhum/ah wajib diisi"),
  blokId: z.string().min(1, "Pilih blok"),
  lokasi: z.string().min(1, "Pilih lokasi"),
  silsilah: z.enum(silsilahValues, { message: "Pilih hubungan" }),
  notes: z.string().optional(),
  tanggalPemesanan: z.string().min(1, "Tanggal pemesanan wajib diisi"),
  tanggalPemakaman: z.string().optional(),
});

// New PJ — all PA fields required
const newPJFields = z.object({
  existingUserId: z.undefined(),
  userPAName: z.string().min(1, "Nama penanggung jawab wajib diisi"),
  userPAContact: z
    .string()
    .min(1, "No. kontak wajib diisi")
    .refine((val) => /^08\d{8,12}$/.test(val), "Format kontak tidak valid"),
  userPAEmail: z
    .string()
    .min(1, "Email wajib diisi")
    .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Email tidak valid"),
  userPAKTP: z
    .string()
    .min(1, "No. KTP wajib diisi")
    .refine((val) => /^\d{16}$/.test(val), "KTP harus 16 digit dan angka saja"),
  emergencyName: z.string().min(1, "Nama kontak darurat wajib diisi"),
  emergencyContact: z
    .string()
    .min(1, "No. kontak darurat wajib diisi")
    .refine((val) => /^08\d{8,12}$/.test(val), "Format kontak darurat tidak valid"),
});

// Existing PJ — PA fields not needed
const existingPJFields = z.object({
  existingUserId: z.string().min(1),
  userPAName: z.string().optional(),
  userPAContact: z.string().optional(),
  userPAEmail: z.string().optional(),
  userPAKTP: z.string().optional(),
  emergencyName: z.string().optional(),
  emergencyContact: z.string().optional(),
});

export const pemesananSchema = z.intersection(
  commonFields,
  z.union([newPJFields, existingPJFields])
);

export type PemesananPayload = z.infer<typeof pemesananSchema>;

export const pemesananDefaultValues: PemesananPayload = {
  namaJenazah: "",
  blokId: "",
  lokasi: "",
  silsilah: "" as Silsilah,
  notes: "",
  existingUserId: undefined,
  emergencyName: "",
  emergencyContact: "",
  userPAName: "",
  userPAContact: "",
  userPAEmail: "",
  userPAKTP: "",
  tanggalPemesanan: "",
  tanggalPemakaman: "",
};
