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

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 4, marginBottom: 12 };
const errorStyle: React.CSSProperties = {
  fontSize: "0.75rem", fontWeight: 700, color: "#d4351c",
  borderLeft: "4px solid #d4351c", background: "#fdf2f2", padding: "2px 8px", marginTop: 2,
};

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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />

      <main style={{ flex: 1 }} className="page-container">
        <div style={{ maxWidth: 560 }}>
          {/* Page title */}
          <div style={{ borderBottom: "2px solid #0b0c0c", paddingBottom: 8, marginBottom: 16 }}>
            <h2 style={{ fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "#0b0c0c", margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Tambah Kontak Admin
            </h2>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ background: "#fff", border: "1px solid #505a5f" }}
          >
            {/* Form header */}
            <div style={{ background: "#0b0c0c", padding: "8px 14px" }}>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.8125rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Informasi Kontak
              </span>
            </div>

            <div style={{ padding: "clamp(12px, 2vw, 20px)" }}>
              {/* Name */}
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <div style={fieldStyle}>
                    <Label htmlFor="name">Nama</Label>
                    <Input {...field} id="name" style={{ width: "100%" }} />
                    {errors.name && <span style={errorStyle}>{errors.name.message}</span>}
                  </div>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <div style={fieldStyle}>
                    <Label htmlFor="email">Email</Label>
                    <Input {...field} id="email" type="email" style={{ width: "100%" }} />
                    {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
                  </div>
                )}
              />

              {/* Contact */}
              <Controller
                name="contact"
                control={control}
                render={({ field }) => (
                  <div style={fieldStyle}>
                    <Label htmlFor="contact">No. Kontak</Label>
                    <Input {...field} id="contact" placeholder="08XXXXXXXXX" style={{ width: "100%" }} />
                    {errors.contact && <span style={errorStyle}>{errors.contact.message}</span>}
                  </div>
                )}
              />

              {/* Divider */}
              <div style={{ borderTop: "1px solid #b1b4b6", margin: "14px 0 14px" }} />
              <div style={{ fontWeight: 700, fontSize: "0.75rem", color: "#505a5f", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 12 }}>
                Keamanan Akun
              </div>

              {/* Password */}
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div style={fieldStyle}>
                    <Label htmlFor="password">Password</Label>
                    <Input {...field} id="password" type="password" style={{ width: "100%" }} />
                    {errors.password && <span style={errorStyle}>{errors.password.message}</span>}
                  </div>
                )}
              />

              {/* Actions */}
              <div style={{ borderTop: "1px solid #b1b4b6", paddingTop: 12, marginTop: 8, display: "flex", justifyContent: "flex-end", gap: 8 }}>
                <Button danger onClick={() => router.push("/layanan/kontak")}>
                  Batal
                </Button>
                <Button type="primary" htmlType="submit" loading={saving} disabled={role !== "admin"}>
                  Simpan
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
