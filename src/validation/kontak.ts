import { z } from "zod";

export const kontakSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().min(1, "Email wajib diisi").email("Email tidak valid"),
  contact: z
    .string()
    .optional()
    .refine((val) => !val || /^08\d{8,12}$/.test(val), "Format kontak tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export type KontakPayload = z.infer<typeof kontakSchema>;

export const kontakDefaultValues: KontakPayload = {
  name: "",
  email: "",
  contact: "",
  password: "",
};
