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

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 4 };
const errorStyle: React.CSSProperties = {
  fontSize: "0.75rem", fontWeight: 700, color: "#d4351c",
  borderLeft: "4px solid #d4351c", background: "#fdf2f2", padding: "2px 8px", marginTop: 2,
};
const inputOverride: React.CSSProperties = {
  border: "2px solid #0b0c0c",
  borderRadius: 0,
  padding: "6px 10px",
  fontSize: "1rem",
  boxShadow: "none",
};

export default function AddKontakPage() {
  const router = useRouter();
  const user = useStore(authStore, (s) => s.user);
  const role = user?.role;
  const [saving, setSaving] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<KontakPayload>({
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

      <main style={{ flex: 1, padding: "clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 2vw, 2rem)" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            maxWidth: "clamp(400px, 55vw, 560px)",
            margin: "0 auto",
            background: "#fff",
            border: "1px solid #b1b4b6",
          }}
        >
          {/* Form header */}
          <div style={{ background: "#0b0c0c", padding: "10px 16px" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Tambah Kontak Admin
            </div>
            <div style={{ color: "#b1b4b6", fontSize: "0.75rem", marginTop: 2 }}>
              Lengkapi data di bawah ini
            </div>
          </div>

          <div style={{ padding: "clamp(14px, 2vw, 22px)" }}>
            <div className="ent-section-heading">Informasi Kontak</div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: 16 }}>
              <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="name" style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0b0c0c" }}>Nama</Label>
                      <Input {...field} id="name" style={inputOverride} />
                      {errors.name && <span style={errorStyle}>{errors.name.message}</span>}
                    </>
                  )}
                />
              </div>

              <div style={fieldStyle}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="email" style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0b0c0c" }}>Email</Label>
                      <Input {...field} id="email" type="email" style={inputOverride} />
                      {errors.email && <span style={errorStyle}>{errors.email.message}</span>}
                    </>
                  )}
                />
              </div>

              <div style={fieldStyle}>
                <Controller
                  name="contact"
                  control={control}
                  render={({ field }) => (
                    <>
                      <Label htmlFor="contact" style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0b0c0c" }}>No. Kontak</Label>
                      <Input {...field} id="contact" placeholder="08XXXXXXXXX" style={inputOverride} />
                      {errors.contact && <span style={errorStyle}>{errors.contact.message}</span>}
                    </>
                  )}
                />
              </div>
            </div>

            <div className="ent-section-heading">Keamanan Akun</div>

            <div style={{ marginBottom: 16 }}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <div style={fieldStyle}>
                    <Label htmlFor="password" style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0b0c0c" }}>Password</Label>
                    <Input {...field} id="password" type="password" style={inputOverride} />
                    {errors.password && <span style={errorStyle}>{errors.password.message}</span>}
                  </div>
                )}
              />
            </div>

            <div style={{ borderTop: "1px solid #b1b4b6", paddingTop: 12, display: "flex", justifyContent: "flex-end", gap: 8 }}>
              <Button danger onClick={() => router.push("/layanan/kontak")}>Batal</Button>
              <Button type="primary" htmlType="submit" loading={saving} disabled={role !== "admin"}>Simpan</Button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
