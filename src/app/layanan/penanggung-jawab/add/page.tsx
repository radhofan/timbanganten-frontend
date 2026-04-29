"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "antd";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pjSchema, PJPayload, pjDefaultValues } from "@/validation/pj";
import toast from "react-hot-toast";

const inputOverride: React.CSSProperties = {
  border: "2px solid #0b0c0c",
  borderRadius: 0,
  padding: "6px 10px",
  fontSize: "1rem",
  boxShadow: "none",
};

const errorStyle: React.CSSProperties = {
  color: "#d4351c",
  fontSize: "0.875rem",
  fontWeight: 700,
  padding: "3px 8px",
  borderLeft: "4px solid #d4351c",
  background: "#fdf2f2",
};

export default function AddPenanggungJawab() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PJPayload>({
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

  const fields = [
    { name: "name" as const, label: "Nama Lengkap", placeholder: "Masukkan Nama Lengkap", span: 2 },
    { name: "contact" as const, label: "No. Kontak", placeholder: "08XXXXXXXXX" },
    { name: "email" as const, label: "Email", placeholder: "user@gmail.com", type: "email" },
    { name: "ktpNum" as const, label: "No. KTP", placeholder: "Masukkan 16 digit nomor KTP", span: 2, maxLength: 16 },
    { name: "emergencyName" as const, label: "Nama Kontak Darurat", placeholder: "Masukkan Nama" },
    { name: "emergencyContact" as const, label: "No. Kontak Darurat", placeholder: "08XXXXXXXXX" },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />

      <main style={{ flex: 1, padding: "clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 2vw, 2rem)" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            maxWidth: "clamp(400px, 55vw, 680px)",
            margin: "0 auto",
            background: "#fff",
            border: "1px solid #b1b4b6",
          }}
        >
          {/* Form header */}
          <div style={{ background: "#0b0c0c", padding: "10px 16px" }}>
            <div
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
              }}
            >
              Tambah Penanggung Jawab
            </div>
            <div style={{ color: "#b1b4b6", fontSize: "0.75rem", marginTop: 2 }}>
              Lengkapi data di bawah ini
            </div>
          </div>

          <div style={{ padding: "clamp(14px, 2vw, 22px)" }}>
            <div className="ent-section-heading">Data Pribadi</div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px 16px",
                marginBottom: 16,
              }}
            >
              {fields.map((f) => (
                <div
                  key={f.name}
                  style={{ display: "flex", flexDirection: "column", gap: 4, gridColumn: f.span === 2 ? "1 / -1" : undefined }}
                >
                  <Label
                    htmlFor={f.name}
                    style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0b0c0c" }}
                  >
                    {f.label}
                  </Label>
                  <Controller
                    name={f.name}
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id={f.name}
                        placeholder={f.placeholder}
                        type={f.type || "text"}
                        maxLength={f.maxLength}
                        style={inputOverride}
                      />
                    )}
                  />
                  {errors[f.name] && (
                    <div style={errorStyle}>{errors[f.name]?.message}</div>
                  )}
                </div>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                paddingTop: 12,
                borderTop: "1px solid #b1b4b6",
              }}
            >
              <Button danger onClick={() => router.push("/layanan/penanggung-jawab")}>
                Batal
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Simpan
              </Button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
