"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "antd";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle, Mail, Phone, CreditCard } from "lucide-react";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pjSchema, PJPayload, pjDefaultValues } from "@/validation/pj";
import toast from "react-hot-toast";

export default function AddPenanggungJawab() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PJPayload>({
    defaultValues: pjDefaultValues,
    resolver: zodResolver(pjSchema),
  });

  const onSubmit: SubmitHandler<PJPayload> = async (data) => {
    setLoading(true);

    try {
      const res = await fetch("/api/penanggungJawab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Penanggung Jawab berhasil ditambahkan!", { position: "top-center" });
        setTimeout(() => router.push("/layanan/penanggung-jawab"), 1500);
      } else {
        const err = await res.json();
        toast.error(err?.error || "Terjadi kesalahan saat menyimpan data.", {
          position: "top-center",
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengirim permintaan.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header hideBanner />

      <main className="flex-1 flex justify-center items-start page-container">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-10"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">Tambah Penanggung Jawab</h2>
            <p className="text-sm text-gray-600 mt-1">
              Silakan lengkapi data di bawah ini untuk menambahkan penanggung jawab baru.
            </p>
          </div>

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
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        {...field}
                        id="name"
                        placeholder="Masukkan Nama Lengkap"
                        className="pl-10"
                      />
                    </div>
                  )}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-2">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="contact" className="mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  No. Kontak
                </Label>
                <Controller
                  name="contact"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        {...field}
                        id="contact"
                        placeholder="08XXXXXXXXX"
                        className="pl-10"
                      />
                    </div>
                  )}
                />
                {errors.contact && (
                  <p className="text-red-600 text-sm mt-2">{errors.contact.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="email" className="mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-blue-600" />
                  Email
                </Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="user@gmail.com"
                        className="pl-10"
                      />
                    </div>
                  )}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm mt-2">{errors.email.message}</p>
                )}
              </div>

              <div className="flex flex-col col-span-2">
                <Label htmlFor="ktpNum" className="mb-2 flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-600" />
                  No KTP
                </Label>
                <Controller
                  name="ktpNum"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        {...field}
                        id="ktpNum"
                        maxLength={16}
                        placeholder="Masukkan 16 digit nomor KTP"
                        className="pl-10"
                      />
                    </div>
                  )}
                />
                {errors.ktpNum && (
                  <p className="text-red-600 text-sm mt-2">{errors.ktpNum.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <Label htmlFor="emergencyName" className="mb-2 flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-indigo-600" />
                  Nama Kontak Darurat
                </Label>
                <Controller
                  name="emergencyName"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        {...field}
                        id="emergencyName"
                        placeholder="Masukkan Nama"
                        className="pl-10"
                      />
                    </div>
                  )}
                />
                {errors.emergencyName && (
                  <p className="text-red-600 text-sm mt-2">{errors.emergencyName.message}</p>
                )}
              </div>

              <div className="flex flex-col">
                <Label htmlFor="emergencyContact" className="mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-600" />
                  No. Kontak Darurat
                </Label>
                <Controller
                  name="emergencyContact"
                  control={control}
                  render={({ field }) => (
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        {...field}
                        id="emergencyContact"
                        placeholder="08XXXXXXXXX"
                        className="pl-10"
                      />
                    </div>
                  )}
                />
                {errors.emergencyContact && (
                  <p className="text-red-600 text-sm mt-2">{errors.emergencyContact.message}</p>
                )}
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              danger
              onClick={() => router.push("/layanan/penanggung-jawab")}
              className="min-w-[clamp(6.25rem,10vw,8rem)]"
            >
              Batal
            </Button>

            <Button type="primary" htmlType="submit" loading={loading} className="min-w-[clamp(6.25rem,10vw,8rem)]">
              Simpan
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
