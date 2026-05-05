"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pjSchema, PJPayload, pjDefaultValues } from "@/validation/pj";
import toast from "react-hot-toast";
import { GovukButton, GovukFormGroup, GovukInput } from "@/components/govuk";
import Image from "next/image";

const fields: {
  name: keyof PJPayload;
  label: string;
  placeholder: string;
  hint?: string;
  type?: string;
  maxLength?: number;
  fullWidth?: boolean;
}[] = [
  { name: "name", label: "Nama Lengkap", placeholder: "Masukkan Nama Lengkap", fullWidth: true },
  { name: "contact", label: "No. Kontak", placeholder: "08XXXXXXXXX", hint: "Diawali 08, 10–14 digit" },
  { name: "email", label: "Email", placeholder: "user@gmail.com", type: "email" },
  { name: "ktpNum", label: "No. KTP", placeholder: "Masukkan 16 digit nomor KTP", maxLength: 16, hint: "16 digit angka", fullWidth: true },
  { name: "emergencyName", label: "Nama Kontak Darurat", placeholder: "Masukkan Nama" },
  { name: "emergencyContact", label: "No. Kontak Darurat", placeholder: "08XXXXXXXXX", hint: "Diawali 08, 10–14 digit" },
];

export default function AddPenanggungJawab() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { control, handleSubmit, formState: { errors } } = useForm<PJPayload>({
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
        toast.error(err?.error || "Terjadi kesalahan saat menyimpan data.", { position: "top-center" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengirim permintaan.", { position: "top-center" });
    } finally {
      setLoading(false);
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
              Tambah Penanggung Jawab
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
              <div style={{
                padding: "10px 12px",
                background: "#1d70b8",
                color: "#fff",
                borderBottom: "1px solid #b1b4b6",
                fontSize: "0.8125rem",
                fontWeight: 700,
                lineHeight: 1.4,
              }}>
                <span style={{ display: "block", fontSize: "0.6875rem", opacity: 0.75, marginBottom: 2 }}>1.</span>
                Tambah Penanggung Jawab
              </div>
            </div>

            {/* Right content area */}
            <div style={{ flex: 1, padding: "16px 20px" }}>
              <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <div className="ent-section-heading">Data Pribadi</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(clamp(180px, 25vw, 240px), 1fr))", gap: "10px 16px", marginBottom: 16 }}>
                  {fields.map((f) => (
                    <div key={f.name} style={f.fullWidth ? { gridColumn: "1 / -1" } : {}}>
                      <Controller
                        name={f.name}
                        control={control}
                        render={({ field }) => (
                          <GovukFormGroup label={f.label} hint={f.hint} error={errors[f.name]?.message}>
                            <GovukInput
                              {...field}
                              type={f.type || "text"}
                              placeholder={f.placeholder}
                              maxLength={f.maxLength}
                              error={!!errors[f.name]}
                              style={{ width: "100%" }}
                            />
                          </GovukFormGroup>
                        )}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, paddingTop: 12, borderTop: "1px solid #b1b4b6" }}>
                  <GovukButton type="button" variant="secondary" onClick={() => router.push("/layanan/penanggung-jawab")}>
                    Batal
                  </GovukButton>
                  <GovukButton type="submit" isLoading={loading}>
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
