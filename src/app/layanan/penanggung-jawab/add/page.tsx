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
  type?: string;
  maxLength?: number;
  fullWidth?: boolean;
}[] = [
  { name: "name", label: "Nama Lengkap", placeholder: "Masukkan Nama Lengkap", fullWidth: true },
  { name: "contact", label: "No. Kontak", placeholder: "08XXXXXXXXX" },
  { name: "email", label: "Email", placeholder: "user@gmail.com", type: "email" },
  { name: "ktpNum", label: "No. KTP", placeholder: "Masukkan 16 digit nomor KTP", maxLength: 16, fullWidth: true },
  { name: "emergencyName", label: "Nama Kontak Darurat", placeholder: "Masukkan Nama" },
  { name: "emergencyContact", label: "No. Kontak Darurat", placeholder: "08XXXXXXXXX" },
];

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

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header hideBanner />

      <div className="govuk-width-container" style={{ flex: 1 }}>
        <main className="govuk-main-wrapper" id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-l">Tambah Penanggung Jawab</h1>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <fieldset className="govuk-fieldset">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                    <h2 className="govuk-fieldset__heading">Data Pribadi</h2>
                  </legend>

                  {fields.map((f) => (
                    <Controller
                      key={f.name}
                      name={f.name}
                      control={control}
                      render={({ field }) => (
                        <GovukFormGroup
                          id={f.name}
                          label={f.label}
                          error={errors[f.name]?.message}
                        >
                          <GovukInput
                            {...field}
                            id={f.name}
                            type={f.type || "text"}
                            placeholder={f.placeholder}
                            maxLength={f.maxLength}
                            error={!!errors[f.name]}
                            style={f.fullWidth ? { width: "100%" } : undefined}
                          />
                        </GovukFormGroup>
                      )}
                    />
                  ))}
                </fieldset>

                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <GovukButton type="submit" isLoading={loading}>
                    Simpan
                  </GovukButton>
                  <GovukButton
                    type="button"
                    variant="secondary"
                    onClick={() => router.push("/layanan/penanggung-jawab")}
                  >
                    Batal
                  </GovukButton>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
