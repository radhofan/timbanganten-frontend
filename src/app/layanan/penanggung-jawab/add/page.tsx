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

      <main style={{ flex: 1, padding: "clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 2vw, 2rem)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          style={{ width: "100%", maxWidth: "clamp(480px, 60vw, 760px)", background: "#fff", border: "1px solid #b1b4b6" }}
        >
          <div style={{ padding: "clamp(12px, 2vw, 18px) clamp(14px, 2vw, 22px)", borderBottom: "1px solid #b1b4b6" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", fontWeight: 700, color: "#0b0c0c" }}>
              Tambah Penanggung Jawab
            </h1>
          </div>

          <div style={{ padding: "clamp(14px, 2vw, 22px)" }}>
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
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
