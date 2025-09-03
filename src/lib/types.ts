export type User = {
  id: number;
  name: string;
  contact: string;
  email: string;
  status: string;
  makams: Makam[];
  statuses: Makam[];
};

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

export type Makam = {
  id: number;
  blok: string;
  nama: string;
  lokasi: string;
  silsilah: string;
  ext: string | null;
  masa_aktif: string;
  nama_penanggung_jawab: string;
  kontak_penanggung_jawab: string;
  description: string;
  payment: string;
  approved: string;
  created_at: string;
  updated_at: string;
};
