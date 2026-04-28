import { z } from "zod";

const baseFields = {
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().min(1, "Email wajib diisi").email("Email tidak valid"),
  contact: z
    .string()
    .optional()
    .refine((val) => !val || /^08\d{8,12}$/.test(val), "Format kontak tidak valid"),
};

export const kontakSchema = z.object({
  ...baseFields,
  password: z.string().min(6, "Password minimal 6 karakter"),
});

export const kontakUpdateSchema = z.object({
  ...baseFields,
  password: z
    .string()
    .refine((v) => v === "" || v.length >= 6, "Password minimal 6 karakter"),
});

export type KontakPayload = z.infer<typeof kontakSchema>;
export type KontakUpdatePayload = z.infer<typeof kontakUpdateSchema>;

export const kontakDefaultValues: KontakPayload = {
  name: "",
  email: "",
  contact: "",
  password: "",
};

export const kontakUpdateDefaultValues: KontakUpdatePayload = {
  name: "",
  email: "",
  contact: "",
  password: "",
};
