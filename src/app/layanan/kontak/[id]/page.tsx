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

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kontakSchema, KontakPayload } from "@/validation/kontak";

import { toast } from "react-hot-toast"; // toaster

export default function KontakDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const user = useStore(authStore, (s) => s.user);
  const role = user?.role;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<KontakPayload>({
    defaultValues: { name: "", email: "", contact: "", password: "" },
    resolver: zodResolver(kontakSchema),
  });

  useEffect(() => {
    let mounted = true;

    fetch(`/api/admin?id=${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat data admin");
        return res.json();
      })
      .then((admin) => {
        if (!mounted) return;
        reset({
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
  }, [id, reset]);

  const onSubmit: SubmitHandler<KontakPayload> = async (data) => {
    if (role !== "admin") return;

    setSaving(true);

    const payload: Record<string, string> = {
      name: data.name,
      email: data.email,
      contact: data.contact?.trim() || "",
    };
    if (data.password.trim() !== "") payload.password = data.password;

    try {
      const res = await fetch(`/api/admin?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Gagal memperbarui kontak");

      toast.success("Kontak berhasil diperbarui", { position: "top-center" });
      setTimeout(() => router.push("/layanan/kontak"), 1500);
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat memperbarui kontak", { position: "top-center" });
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
            onSubmit={handleSubmit(onSubmit)}
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

              {/* Name */}
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col">
                    <Label htmlFor="name" className="mb-2">
                      Nama
                    </Label>
                    <Input {...field} id="name" />
                    {fieldState.error && (
                      <span className="text-red-600 text-sm mt-1">{fieldState.error.message}</span>
                    )}
                  </div>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col">
                    <Label htmlFor="email" className="mb-2">
                      Email
                    </Label>
                    <Input {...field} id="email" type="email" />
                    {fieldState.error && (
                      <span className="text-red-600 text-sm mt-1">{fieldState.error.message}</span>
                    )}
                  </div>
                )}
              />

              {/* Contact */}
              <Controller
                name="contact"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col">
                    <Label htmlFor="contact" className="mb-2">
                      No. Kontak
                    </Label>
                    <Input {...field} id="contact" placeholder="08XXXXXXXXX" />
                    {fieldState.error && (
                      <span className="text-red-600 text-sm mt-1">{fieldState.error.message}</span>
                    )}
                  </div>
                )}
              />
            </section>

            <section className="space-y-4">
              <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Keamanan</h3>

              {/* Password */}
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <div className="flex flex-col">
                    <Label htmlFor="password" className="mb-2">
                      Password Baru
                    </Label>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Kosongkan jika tidak diubah"
                    />
                    {fieldState.error && (
                      <span className="text-red-600 text-sm mt-1">{fieldState.error.message}</span>
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
        )}
      </main>

      <Footer />
    </div>
  );
}
