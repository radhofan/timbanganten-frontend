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

export default function AddKontakPage() {
  const router = useRouter();

  const user = useStore(authStore, (s) => s.user);
  const role = user?.role;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (role !== "admin") return;

    setSaving(true);

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menambahkan kontak");

      setSuccess(true);
      setTimeout(() => {
        router.push("/layanan/kontak");
      }, 1500);
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menambahkan kontak.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header hideBanner />

      <main className="flex-1 flex justify-center items-start py-12 px-4 sm:px-8 mb-16">
        <form
          onSubmit={handleSubmit}
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

            <div className="flex flex-col">
              <Label htmlFor="name" className="mb-2">
                Nama
              </Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col">
              <Label htmlFor="contact" className="mb-2">
                No. Kontak
              </Label>
              <Input
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="08XXXXXXXXX"
              />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Keamanan Akun</h3>

            <div className="flex flex-col">
              <Label htmlFor="password" className="mb-2">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {success && (
            <p className="text-green-600 text-center text-sm">✔ Kontak berhasil ditambahkan</p>
          )}

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
