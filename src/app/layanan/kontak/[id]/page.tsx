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
import { kontakUpdateSchema, KontakUpdatePayload, kontakUpdateDefaultValues } from "@/validation/kontak";
import { toast } from "react-hot-toast";

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

export default function KontakDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const user = useStore(authStore, (s) => s.user);
  const role = user?.role;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<KontakUpdatePayload>({
    defaultValues: kontakUpdateDefaultValues,
    resolver: zodResolver(kontakUpdateSchema),
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
        reset({ name: admin.name || "", email: admin.email || "", contact: admin.contact || "", password: "" });
        setLoading(false);
      })
      .catch((err) => {
        if (!mounted) return;
        setFetchError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      });
    return () => { mounted = false; };
  }, [id, reset]);

  const onSubmit: SubmitHandler<KontakUpdatePayload> = async (data) => {
    if (role !== "admin") return;
    setSaving(true);
    const payload: Record<string, string> = { name: data.name, email: data.email, contact: data.contact?.trim() || "" };
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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />

      <main style={{ flex: 1, padding: "clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 2vw, 2rem)" }}>
        {loading ? (
          <div style={{ padding: "40px 0", color: "#505a5f", fontSize: "0.875rem" }}>
            Memuat data kontak...
          </div>
        ) : fetchError ? (
          <div style={{ ...errorStyle, display: "block" }}>{fetchError}</div>
        ) : (
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
                Edit Kontak Admin
              </div>
              <div style={{ color: "#b1b4b6", fontSize: "0.75rem", marginTop: 2 }}>
                Perbarui data kontak di bawah ini
              </div>
            </div>

            <div style={{ padding: "clamp(14px, 2vw, 22px)" }}>
              <div className="ent-section-heading">Informasi Kontak</div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 16px", marginBottom: 16 }}>
                <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <Label htmlFor="name" style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0b0c0c" }}>Nama</Label>
                        <Input {...field} id="name" style={inputOverride} />
                        {fieldState.error && <span style={errorStyle}>{fieldState.error.message}</span>}
                      </>
                    )}
                  />
                </div>

                <div style={fieldStyle}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <Label htmlFor="email" style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0b0c0c" }}>Email</Label>
                        <Input {...field} id="email" type="email" style={inputOverride} />
                        {fieldState.error && <span style={errorStyle}>{fieldState.error.message}</span>}
                      </>
                    )}
                  />
                </div>

                <div style={fieldStyle}>
                  <Controller
                    name="contact"
                    control={control}
                    render={({ field, fieldState }) => (
                      <>
                        <Label htmlFor="contact" style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0b0c0c" }}>No. Kontak</Label>
                        <Input {...field} id="contact" placeholder="08XXXXXXXXX" style={inputOverride} />
                        {fieldState.error && <span style={errorStyle}>{fieldState.error.message}</span>}
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
                  render={({ field, fieldState }) => (
                    <div style={fieldStyle}>
                      <Label htmlFor="password" style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0b0c0c" }}>Password Baru</Label>
                      <Input {...field} id="password" type="password" placeholder="Kosongkan jika tidak diubah" style={inputOverride} />
                      {fieldState.error && <span style={errorStyle}>{fieldState.error.message}</span>}
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
        )}
      </main>

      <Footer />
    </div>
  );
}
