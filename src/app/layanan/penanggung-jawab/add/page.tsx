"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "antd";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UserCircle, Mail, Phone, CreditCard, MapPin, Home } from "lucide-react";

export default function AddPenanggungJawab() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    interface AddPJPayload {
      name: string;
      contact: string;
      email: string;
      ktp_num?: string;
      alamat?: string;
      kontakDarurat?: string;
      namaKontakDarurat?: string;
      notes?: string;
    }

    const payload: AddPJPayload = {
      name: formData.get("name") as string,
      contact: formData.get("contact") as string,
      email: formData.get("email") as string,
      ktp_num: formData.get("ktp_num") as string,
      alamat: formData.get("alamat") as string,
      kontakDarurat: formData.get("kontakDarurat") as string,
      namaKontakDarurat: formData.get("namaKontakDarurat") as string,
      notes: formData.get("notes") as string,
    };

    try {
      const res = await fetch("/api/penanggungJawab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          contact: payload.contact,
          email: payload.email,
          ktp_num: payload.ktp_num,
        }),
      });

      if (res.ok) {
        alert("Penanggung Jawab berhasil ditambahkan!");
        router.push("/layanan/penanggung-jawab");
        form.reset();
      } else {
        const data = await res.json();
        alert(data?.error || "Terjadi kesalahan saat menyimpan data.");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim permintaan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header hideBanner />

      <main className="flex-1 flex justify-center items-start py-12 px-4 sm:px-8 mb-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-10"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">Tambah Penanggung Jawab</h2>
            <p className="text-sm text-gray-600 mt-1">
              Silakan lengkapi data di bawah ini untuk menambahkan penanggung jawab baru.
            </p>
          </div>

          {/* Data Pribadi Section */}
          <section className="space-y-5">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg shadow-md">
                <UserCircle className="w-5 h-5 text-white" />
              </div>
              Data Pribadi
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col col-span-2">
                <Label htmlFor="name" className="mb-2 flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-purple-600" />
                  Nama Lengkap
                </Label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    placeholder="Masukkan Nama Lengkap"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <Label htmlFor="contact" className="mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  No. Kontak
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="contact"
                    name="contact"
                    placeholder="08XXXXXXXXX"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <Label htmlFor="email" className="mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="user@gmail.com"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-col col-span-2">
                <Label htmlFor="ktp_num" className="mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  No KTP
                </Label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="ktp_num"
                    name="ktp_num"
                    maxLength={16}
                    placeholder="Masukkan 16 digit nomor KTP"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-col col-span-2">
                <Label htmlFor="alamat" className="mb-2 flex items-center gap-2">
                  <Home className="w-4 h-4 text-rose-600" />
                  Alamat
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Textarea
                    id="alamat"
                    name="alamat"
                    rows={3}
                    placeholder="Masukkan alamat lengkap..."
                    className="resize-none pl-10"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="namaKontakDarurat" className="mb-2 flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-indigo-600" />
                  Nama Kontak Darurat
                </Label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="namaKontakDarurat"
                    name="namaKontakDarurat"
                    placeholder="Masukkan Nama"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <Label htmlFor="kontakDarurat" className="mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-600" />
                  No. Kontak Darurat
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="kontakDarurat"
                    name="kontakDarurat"
                    placeholder="08XXXXXXXXX"
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              danger
              onClick={() => router.push("/layanan/penanggung-jawab")}
              className="min-w-[100px]"
            >
              Batal
            </Button>

            <Button type="primary" htmlType="submit" loading={loading} className="min-w-[100px]">
              Simpan
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
