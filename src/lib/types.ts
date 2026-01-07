export interface CurrentUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export type Admin = {
  id: number;
  name: string;
  email: string;
  password: string;
  contact: string;
};

export type Approver = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type Pengawas = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export type User = {
  id: string;
  name: string | null;
  contact: string | null;
  email: string | null;
  // status: string | null;
  ktpNum: string | null;
  emergencyName: string | null;
  emergencyContact: string | null;
  // Relations
  // makams: Makam[];
  // statuses: MakamStatus[];
  jenazah: Jenazah | null;
  penanggungJawab: PenanggungJawab | null;
};

export type PenanggungJawab = {
  id: string;
  // Foreign key IDs
  userId: string | null;
  makamId: string | null;
  makamStatusId: string | null;
  // Relations
  user: User | null;
  makam: Makam | null;
  makamStatus: MakamStatus | null;
};

export type Jenazah = {
  id: string;
  tanggalPemakaman: Date | null;
  statusJenazah: string | null;
  masaAktif: Date | null;
  statusPembayaranPesanan: string | null;
  statusPembayaranIuranTahunan: string | null;
  // Foreign key IDs
  userId: string | null;
  blokId: string | null;
  // Relations
  user: User | null;
  blok: Blok | null;
  makam: Makam | null;
  makamStatus: MakamStatus | null;
};

export type Blok = {
  id: string;
  lokasi: string | null;
  tanggalPemakamanTerakhir: Date | null;
  statusBlok: string | null;
  statusPesanan: string | null;
  availability: string | null;
  // statusPembayaran: string | null;
  // Relations
  jenazah: Jenazah[];
  makam: Makam[];
  makamStatus: MakamStatus[];
};

export type MakamStatus = {
  id: string;
  nama: string | null;
  lokasi: string | null;
  silsilah: string | null;
  // ext: string | null;
  // masaAktif: Date | null;
  // namaPenanggungJawab: string | null;
  // kontakPenanggungJawab: string | null;
  description: string | null;
  // payment: string | null;
  // approved: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  tanggalPemesanan: Date | null;
  // Foreign key IDs
  // userId: string | null;
  jenazahId: string | null;
  blokId: string | null;
  // Relations
  // user: User | null;
  jenazah: Jenazah | null;
  blok: Blok | null;
  // pj: PenanggungJawab[];
};

export type MakamStatusWithPJ = MakamStatus & {
  pj: PenanggungJawab[];
};

export type Makam = {
  id: string;
  nama: string | null;
  lokasi: string | null;
  silsilah: string | null;
  // ext: string | null;
  // masaAktif: Date | null;
  // namaPenanggungJawab: string | null;
  // kontakPenanggungJawab: string | null;
  description: string | null;
  // payment: string | null;
  // approved: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
  tanggalPemesanan: Date | null;
  // Foreign key IDs
  // userId: string | null;
  jenazahId: string | null;
  blokId: string | null;
  // Relations
  // user: User | null;
  jenazah: Jenazah | null;
  blok: Blok | null;
  // pj: PenanggungJawab[];
};

export type MakamWithPJ = Makam & {
  pj: PenanggungJawab[];
};
