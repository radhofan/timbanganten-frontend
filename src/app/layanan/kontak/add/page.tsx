"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";

import { Button } from "antd";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kontakSchema, KontakPayload, kontakDefaultValues } from "@/validation/kontak";
import toast from "react-hot-toast";

export default function AddKontakPage() {
  const router = useRouter();
  const user = useStore(authStore, (s) => s.user);
  const role = user?.role;

  const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<KontakPayload>({
    defaultValues: kontakDefaultValues,
    resolver: zodResolver(kontakSchema),
  });

  const onSubmit: SubmitHandler<KontakPayload> = async (data) => {
    if (role !== "admin") return;

    setSaving(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Gagal menambahkan kontak");

      toast.success("Kontak berhasil ditambahkan", { position: "top-center" });
      setTimeout(() => router.push("/layanan/kontak"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat menambahkan kontak", { position: "top-center" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header hideBanner />

      <main className="flex-1 flex justify-center items-start py-12 px-4 sm:px-8 mb-16">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-400 p-8 space-y-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Tambah Kontak Admin</h2>
            <p className="text-sm text-gray-500 mt-1">
              Masukkan data admin baru untuk ditambahkan ke sistem.
            </p>
          </div>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Informasi Kontak</h3>

            {/* Name */}
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <Label htmlFor="name" className="mb-2">
                    Nama
                  </Label>
                  <Input {...field} id="name" />
                  {errors.name && (
                    <span className="text-red-600 text-sm mt-1">{errors.name.message}</span>
                  )}
                </div>
              )}
            />

            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <Label htmlFor="email" className="mb-2">
                    Email
                  </Label>
                  <Input {...field} id="email" type="email" />
                  {errors.email && (
                    <span className="text-red-600 text-sm mt-1">{errors.email.message}</span>
                  )}
                </div>
              )}
            />

            {/* Contact */}
            <Controller
              name="contact"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <Label htmlFor="contact" className="mb-2">
                    No. Kontak
                  </Label>
                  <Input {...field} id="contact" placeholder="08XXXXXXXXX" />
                  {errors.contact && (
                    <span className="text-red-600 text-sm mt-1">{errors.contact.message}</span>
                  )}
                </div>
              )}
            />
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Keamanan Akun</h3>

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col">
                  <Label htmlFor="password" className="mb-2">
                    Password
                  </Label>
                  <Input {...field} id="password" type="password" />
                  {errors.password && (
                    <span className="text-red-600 text-sm mt-1">{errors.password.message}</span>
                  )}
                </div>
              )}
            />
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button danger onClick={() => router.push("/layanan/kontak")}>
              Batal
            </Button>

            <Button type="primary" htmlType="submit" loading={saving} disabled={role !== "admin"}>
              Simpan
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
