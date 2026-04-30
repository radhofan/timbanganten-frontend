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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header hideBanner />

      <div className="govuk-width-container" style={{ flex: 1 }}>
        <main className="govuk-main-wrapper" id="main-content" role="main">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-l">Tambah Kontak Admin</h1>

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <fieldset className="govuk-fieldset">
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                    <h2 className="govuk-fieldset__heading">Informasi Kontak</h2>
                  </legend>

                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <GovukFormGroup id="name" label="Nama" error={errors.name?.message}>
                        <GovukInput {...field} id="name" error={!!errors.name} style={{ width: "100%" }} />
                      </GovukFormGroup>
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <GovukFormGroup id="email" label="Email" error={errors.email?.message}>
                        <GovukInput {...field} id="email" type="email" error={!!errors.email} style={{ width: "100%" }} />
                      </GovukFormGroup>
                    )}
                  />

                  <Controller
                    name="contact"
                    control={control}
                    render={({ field }) => (
                      <GovukFormGroup id="contact" label="No. Kontak" error={errors.contact?.message}>
                        <GovukInput {...field} id="contact" placeholder="08XXXXXXXXX" error={!!errors.contact} style={{ width: "100%" }} />
                      </GovukFormGroup>
                    )}
                  />
                </fieldset>

                <fieldset className="govuk-fieldset" style={{ marginTop: 8 }}>
                  <legend className="govuk-fieldset__legend govuk-fieldset__legend--m">
                    <h2 className="govuk-fieldset__heading">Keamanan Akun</h2>
                  </legend>

                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <GovukFormGroup id="password" label="Password" error={errors.password?.message}>
                        <GovukInput {...field} id="password" type="password" error={!!errors.password} style={{ width: "100%" }} />
                      </GovukFormGroup>
                    )}
                  />
                </fieldset>

                <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                  <GovukButton
                    type="submit"
                    isLoading={saving}
                    disabled={role !== "admin"}
                  >
                    Simpan
                  </GovukButton>
                  <GovukButton
                    type="button"
                    variant="secondary"
                    onClick={() => router.push("/layanan/kontak")}
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
