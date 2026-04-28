import { z } from "zod";

export const pjSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  contact: z
    .string()
    .min(1, "Kontak wajib diisi")
    .refine((v) => /^08\d{8,12}$/.test(v), "Format kontak tidak valid"),
  email: z.string().min(1, "Email wajib diisi").email("Email tidak valid"),
  ktpNum: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{16}$/.test(v), "KTP harus 16 digit dan angka saja"),
  emergencyName: z.string().optional(),
  emergencyContact: z
    .string()
    .optional()
    .refine((v) => !v || /^08\d{8,12}$/.test(v), "Format kontak darurat tidak valid"),
});

export type PJPayload = z.infer<typeof pjSchema>;

export const pjDefaultValues: PJPayload = {
  name: "",
  contact: "",
  email: "",
  ktpNum: "",
  emergencyName: "",
  emergencyContact: "",
};
