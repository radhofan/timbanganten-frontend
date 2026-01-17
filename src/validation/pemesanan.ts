import { z } from "zod";

export const pemesananSchema = z.object({
  namaJenazah: z.string().min(1, "Nama jenazah wajib diisi"),
  blokId: z.string().min(1, "Pilih blok"),
  lokasi: z.string().min(1, "Pilih lokasi"),
  silsilah: z.string().min(1, "Pilih hubungan"),
  notes: z.string().optional(),
  existingUserId: z.string().optional(),
  emergencyName: z.string().optional(),
  emergencyContact: z.string().optional(),
  pjName: z.string().optional(),
  pjContact: z.string().optional(),
  userPAName: z.string().optional(),
  userPAContact: z.string().optional(),
  userPAEmail: z
    .string()
    .optional()
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), "Email tidak valid"),
  userPAKTP: z
    .string()
    .optional()
    .refine((val) => !val || /^\d{16}$/.test(val), "KTP harus 16 digit dan angka saja"),
  userPBName: z.string().optional(),
  userPBContact: z.string().optional(),
  userPBEmail: z.string().optional(),
  tanggalPemesanan: z.string().optional(),
  tanggalPemakaman: z.string().optional(),
});

export type PemesananPayload = z.infer<typeof pemesananSchema>;

export const pemesananDefaultValues: PemesananPayload = {
  namaJenazah: "",
  blokId: "",
  lokasi: "",
  silsilah: "",
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
