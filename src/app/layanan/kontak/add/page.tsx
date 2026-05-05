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
import Image from "next/image";

const steps = [
  { id: 1, label: "Tambah Kontak Admin" },
];

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

      <main style={{ flex: 1, padding: "12px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Page title */}
          <div style={{ borderBottom: "1px solid #b1b4b6", paddingBottom: 8, marginBottom: 12 }}>
            <h1 style={{ fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", color: "#0b0c0c", margin: 0 }}>
              Tambah Kontak Admin
            </h1>
          </div>

          {/* Top branding bar */}
          <div style={{
            background: "#fff",
            border: "1px solid #b1b4b6",
            borderBottom: "none",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}>
            <Image src="/images/logo.png" alt="Logo" width={40} height={40} style={{ objectFit: "contain" }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0b0c0c", lineHeight: 1.2 }}>TIMGRAVID</div>
              <div style={{ fontSize: "0.75rem", color: "#505a5f", lineHeight: 1.3 }}>Sistem Manajemen Pemakaman Timbanganten</div>
            </div>
          </div>

          {/* Main layout: sidebar + content */}
          <div style={{ display: "flex", background: "#fff", border: "1px solid #b1b4b6" }}>

            {/* Left sidebar */}
            <div style={{ width: 200, flexShrink: 0, borderRight: "1px solid #b1b4b6" }}>
              <div style={{ padding: "8px 12px", background: "#f3f2f1", borderBottom: "1px solid #b1b4b6", fontSize: "0.6875rem", fontWeight: 700, color: "#505a5f", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Formulir
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {steps.map((step) => (
                  <li key={step.id}>
                    <div style={{
                      padding: "10px 12px",
                      background: "#1d70b8",
                      color: "#fff",
                      borderBottom: "1px solid #b1b4b6",
                      fontSize: "0.8125rem",
                      fontWeight: 700,
                      lineHeight: 1.4,
                    }}>
                      <span style={{ display: "block", fontSize: "0.6875rem", opacity: 0.75, marginBottom: 2 }}>{step.id}.</span>
                      {step.label}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right content area */}
            <div style={{ flex: 1, padding: "16px 20px" }}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>

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

              </form>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
