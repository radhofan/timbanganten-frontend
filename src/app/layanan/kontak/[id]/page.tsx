"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kontakUpdateSchema, KontakUpdatePayload, kontakUpdateDefaultValues } from "@/validation/kontak";
import { toast } from "react-hot-toast";
import { GovukButton, GovukFormGroup, GovukInput } from "@/components/govuk";

export default function KontakDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const user = useStore(authStore, (s) => s.user);
  const role = user?.role;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<KontakUpdatePayload>({
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
    const payload: Record<string, string> = {
      name: data.name,
      email: data.email,
      contact: data.contact?.trim() || "",
    };
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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header hideBanner />

      <div className="govuk-width-container" style={{ flex: 1 }}>
        <main className="govuk-main-wrapper" id="main-content" role="main">
          {loading ? (
            <p className="govuk-body" style={{ color: "#505a5f" }}>Memuat data kontak...</p>
          ) : fetchError ? (
            <div className="govuk-error-summary" role="alert">
              <h2 className="govuk-error-summary__title">Terjadi kesalahan</h2>
              <div className="govuk-error-summary__body">
                <p className="govuk-body">{fetchError}</p>
              </div>
            </div>
          ) : (
            <div className="govuk-grid-row">
              <div className="govuk-grid-column-two-thirds">
                <h1 className="govuk-heading-l">Edit Kontak Admin</h1>

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
                        <GovukFormGroup
                          id="password"
                          label="Password Baru"
                          hint="Kosongkan jika tidak ingin mengubah password"
                          error={errors.password?.message}
                        >
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
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
