"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";

import { Button } from "antd";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function KontakDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const user = useStore(authStore, (s) => s.user);
  const role = user?.role;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let mounted = true;

    fetch(`/api/admin?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch admin data");
        return res.json();
      })
      .then((admin) => {
        if (!mounted) return;
        setFormData({
          name: admin.name || "",
          email: admin.email || "",
          contact: admin.contact || "",
          password: "",
        });
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (role !== "admin") return;

    setSaving(true);

    const payload: Record<string, string> = {
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
    };

    if (formData.password.trim() !== "") {
      payload.password = formData.password;
    }

    try {
      const res = await fetch(`/api/admin?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update admin");

      setSuccess(true);
      setTimeout(() => {
        router.push("/layanan/kontak");
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header hideBanner />

      <main className="flex-1 flex justify-center items-start py-12 px-4 sm:px-8 mb-16">
        {loading ? (
          <p className="text-gray-600">Memuat data kontak...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-xl bg-white rounded-2xl shadow-xl border border-gray-400 p-8 space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-800">Edit Kontak Admin</h2>
              <p className="text-sm text-gray-500 mt-1">
                Perbarui informasi kontak admin di bawah ini.
              </p>
            </div>

            <section className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Informasi Kontak</h3>

              <div className="flex flex-col">
                <Label htmlFor="name" className="mb-2">
                  Nama
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
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
              <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Keamanan</h3>

              <div className="flex flex-col">
                <Label htmlFor="password" className="mb-2">
                  Password Baru
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Kosongkan jika tidak diubah"
                />
              </div>
            </section>

            {success && (
              <p className="text-green-600 text-center text-sm">✔ Kontak berhasil diperbarui</p>
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
        )}
      </main>

      <Footer />
    </div>
  );
}
