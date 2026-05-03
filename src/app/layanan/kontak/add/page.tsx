"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kontakSchema, KontakPayload, kontakDefaultValues } from "@/validation/kontak";
import toast from "react-hot-toast";
import { GovukButton, GovukFormGroup, GovukInput } from "@/components/govuk";

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

      <main style={{ flex: 1, padding: "clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 2vw, 2rem)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{ width: "100%", maxWidth: "clamp(480px, 60vw, 760px)", background: "#fff", border: "1px solid #b1b4b6" }}
        >
          <div style={{ padding: "clamp(12px, 2vw, 18px) clamp(14px, 2vw, 22px)", borderBottom: "1px solid #b1b4b6" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", fontWeight: 700, color: "#0b0c0c" }}>
              Tambah Kontak Admin
            </h1>
          </div>

          <div style={{ padding: "clamp(14px, 2vw, 22px)" }}>
            <div className="ent-section-heading">Informasi Kontak</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(180px, 25vw, 240px), 1fr))", gap: "10px 16px", marginBottom: 16 }}>
              <Controller name="name" control={control} render={({ field }) => (
                <GovukFormGroup label="Nama" error={errors.name?.message}>
                  <GovukInput {...field} error={!!errors.name} style={{ width: "100%" }} />
                </GovukFormGroup>
              )} />
              <Controller name="email" control={control} render={({ field }) => (
                <GovukFormGroup label="Email" error={errors.email?.message}>
                  <GovukInput {...field} type="email" error={!!errors.email} style={{ width: "100%" }} />
                </GovukFormGroup>
              )} />
              <Controller name="contact" control={control} render={({ field }) => (
                <GovukFormGroup label="No. Kontak" hint="Diawali 08, 10–14 digit" error={errors.contact?.message}>
                  <GovukInput {...field} placeholder="08XXXXXXXXX" error={!!errors.contact} style={{ width: "100%" }} />
                </GovukFormGroup>
              )} />
            </div>

            <div className="ent-section-heading">Keamanan Akun</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(180px, 25vw, 240px), 1fr))", gap: "10px 16px", marginBottom: 16 }}>
              <Controller name="password" control={control} render={({ field }) => (
                <GovukFormGroup label="Password" error={errors.password?.message}>
                  <GovukInput {...field} type="password" error={!!errors.password} style={{ width: "100%" }} />
                </GovukFormGroup>
              )} />
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, paddingTop: 12, borderTop: "1px solid #b1b4b6" }}>
              <GovukButton type="button" variant="secondary" onClick={() => router.push("/layanan/kontak")}>
                Batal
              </GovukButton>
              <GovukButton type="submit" isLoading={saving} disabled={role !== "admin"}>
                Simpan
              </GovukButton>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
