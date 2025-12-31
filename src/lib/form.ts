export type PemesananFormValues = {
  useExisting: "new" | "existing";

  existingUserId?: string;

  namapj?: string;
  kontak?: string;
  email?: string;
  ktp_num?: string;

  namajenazah: string;
  id_blok: string;
  lokasi: string;
  silsilah: string;
  jenismakam: string;

  tanggalPemesanan?: Date;
  tanggalPemakaman?: Date;

  notes: string;
};
