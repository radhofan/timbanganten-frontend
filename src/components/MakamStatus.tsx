"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { GovukButton } from "@/components/govuk";
import { StatusLabel } from "./StatusLabel";
import { useUserRoles } from "./CheckRole";
import { makamDefaultValues, MakamPayload, makamSchema } from "@/validation/makam";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

// ── Compact field label+value display (read-only rows) ──────────────────────
function InfoField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: "0.625rem", fontWeight: 700, color: "#505a5f", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontSize: "0.8125rem", color: "#0b0c0c" }}>
        {children}
      </div>
    </div>
  );
}

// ── Compact editable field ───────────────────────────────────────────────────
function CompactField({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontSize: "0.625rem", fontWeight: 700, color: "#505a5f", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>
        {label}
      </div>
      {error && (
        <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#d4351c", borderLeft: "3px solid #d4351c", paddingLeft: 5, marginBottom: 3 }}>
          {error}
        </div>
      )}
      {children}
    </div>
  );
}

export default function MakamStatus({ page }: { page: string }) {
  const { id } = useParams();
  const { isAdmin } = useUserRoles();
  const endpoint = page === "pesan-status" ? "makamStatus" : "makam";
  const [backendHadTanggalPemakaman, setBackendHadTanggalPemakaman] = useState<boolean | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<MakamPayload>({
    resolver: zodResolver(makamSchema),
    mode: "onChange",
    defaultValues: makamDefaultValues,
    shouldUnregister: false,
  });

  const isTanggalPemakamanLocked = backendHadTanggalPemakaman === true;
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const user = useStore(authStore, (s) => s.user);
  const role = user?.role;
  const canEdit = isAdmin;

  const fetchData = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/${endpoint}?id=${id}`);
      const data = await res.json();

      const backendTanggal = data.jenazah?.tanggalPemakaman;
      setBackendHadTanggalPemakaman((prev) => (prev === null ? Boolean(backendTanggal) : prev));

      const toDateStr = (val: string | null | undefined) =>
        val ? new Date(val).toISOString().slice(0, 10) : "";

      reset({
        namapj: data.pj?.[0]?.user?.name || "",
        kontak: data.pj?.[0]?.user?.contact || "",
        namajenazah: data.jenazah.user.name || "",
        lokasi: data.blok.lokasi || "",
        notes: data.description || "",
        tanggalPemesanan: toDateStr(data.tanggalPemesanan),
        tanggalPemakaman: toDateStr(data.jenazah.tanggalPemakaman),
        blok: data.blok?.id || "",
        statusBlok: data.blok.statusBlok || "",
        statusJenazah: data.jenazah.statusJenazah || "",
        statusPembayaranPesanan: data.jenazah.statusPembayaranPesanan || "",
        statusPembayaranIuranTahunan: data.jenazah.statusPembayaranIuranTahunan || "",
        jenazahId: data.jenazah.id || "",
      });
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  }, [id, endpoint, reset]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  async function convertMakam(id: string): Promise<boolean> {
    try {
      const res = await fetch("/api/convertMakam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Konversi makam gagal");
      }
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Convert error:", err);
        alert("Gagal mengaktifkan makam: " + err.message);
      } else {
        console.error("Unknown error:", err);
        alert("Terjadi kesalahan tidak dikenal.");
      }
      return false;
    }
  }

  const onSubmit = async (data: MakamPayload) => {
    setLoading(true);
    try {
      const validatedData = makamSchema.parse(data);
      const payload = {
        id,
        blok: validatedData.blok,
        nama: validatedData.namajenazah,
        lokasi: validatedData.lokasi,
        nama_penanggung_jawab: validatedData.namapj,
        kontak_penanggung_jawab: validatedData.kontak,
        description: validatedData.notes,
        tanggal_pemakaman: validatedData.tanggalPemakaman,
        tanggalPemesanan: validatedData.tanggalPemesanan,
      };
      const res = await fetch(`/api/${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Blok makam berhasil diperbarui!", { position: "top-center", duration: 2000 });
        setTimeout(
          () => router.push(page === "pesan-status" ? "/layanan/pesan/status" : "/layanan/makam"),
          1500
        );
      } else {
        const responseData = await res.json();
        if (responseData.errors) {
          toast.error(Object.values(responseData.errors).join("\n"), { position: "top-center", duration: 5000 });
        } else {
          toast.error(responseData?.error || "Terjadi kesalahan saat memperbarui data.", { position: "top-center", duration: 5000 });
        }
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error(err instanceof Error ? "Validasi atau pengiriman gagal: " + err.message : "Terjadi kesalahan tidak diketahui.", { position: "top-center", duration: 5000 });
    } finally {
      setLoading(false);
    }
  };

  const isApproveReady = watch("statusPembayaranPesanan") === "PAID" && !!watch("tanggalPemakaman");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />

      <main style={{ flex: 1, padding: "12px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Page title */}
          <h1 style={{ fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", color: "#0b0c0c", margin: "0 0 12px", paddingBottom: 8, borderBottom: "1px solid #b1b4b6" }}>
            {page === "pesan-status" ? "Status Pemesanan Makam" : "Detail Makam"}
          </h1>

          {loading ? (
            <div style={{ color: "#505a5f", fontSize: "0.8125rem" }}>Memuat data...</div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div style={{ background: "#fff", border: "1px solid #b1b4b6", borderTop: "4px solid #1d70b8", padding: "20px 24px" }}>

                {/* ── Row 1: all info fields flat in one grid ── */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px 24px", marginBottom: 20 }}>

                  {canEdit ? (
                    <Controller
                      name="namajenazah"
                      control={control}
                      render={({ field, fieldState }) => (
                        <CompactField label="Nama Almarhum/ah" error={fieldState.error?.message}>
                          <input
                            {...field}
                            style={{ width: "100%", fontSize: "0.8125rem", padding: "3px 6px", border: "1px solid #b1b4b6", fontFamily: "inherit", boxSizing: "border-box", background: "#fff" }}
                          />
                        </CompactField>
                      )}
                    />
                  ) : (
                    <Controller
                      name="namajenazah"
                      control={control}
                      render={({ field }) => (
                        <InfoField label="Nama Almarhum/ah"><strong>{field.value || "-"}</strong></InfoField>
                      )}
                    />
                  )}

                  <Controller name="namapj" control={control} render={({ field }) => (
                    <InfoField label="Penanggung Jawab">{field.value || "-"}</InfoField>
                  )} />

                  <Controller name="kontak" control={control} render={({ field }) => (
                    <InfoField label="No. Kontak PJ">{field.value || "-"}</InfoField>
                  )} />

                  <Controller name="lokasi" control={control} render={({ field }) => (
                    <InfoField label="Lokasi">{field.value || "-"}</InfoField>
                  )} />

                  <Controller name="blok" control={control} render={({ field }) => (
                    <InfoField label="Blok Makam"><strong style={{ color: "#1d70b8" }}>{field.value || "-"}</strong></InfoField>
                  )} />

                  <Controller name="tanggalPemesanan" control={control} render={({ field }) => (
                    <InfoField label="Tgl. Pemesanan">
                      {field.value ? new Date(field.value).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                    </InfoField>
                  )} />

                  <Controller name="tanggalPemakaman" control={control} render={({ field }) => (
                    canEdit && !isTanggalPemakamanLocked ? (
                      <CompactField label="Tgl. Pemakaman" error={errors.tanggalPemakaman?.message}>
                        <input
                          type="date"
                          value={field.value || ""}
                          onChange={(e) => field.onChange(e.target.value)}
                          style={{ width: "100%", fontSize: "0.8125rem", padding: "3px 6px", border: "1px solid #b1b4b6", fontFamily: "inherit", boxSizing: "border-box", background: "#fff" }}
                        />
                      </CompactField>
                    ) : (
                      <InfoField label="Tgl. Pemakaman">
                        {field.value ? new Date(field.value).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "-"}
                      </InfoField>
                    )
                  )} />

                  <Controller name="statusBlok" control={control} render={({ field }) => (
                    <InfoField label="Status Blok"><StatusBadge value={field.value} /></InfoField>
                  )} />

                  <Controller name="statusJenazah" control={control} render={({ field }) => (
                    <InfoField label="Status Almarhum/ah"><StatusBadge value={field.value} /></InfoField>
                  )} />

                  <Controller name="statusPembayaranPesanan" control={control} render={({ field }) => (
                    <InfoField label="Pembayaran Pesanan"><StatusBadge value={field.value || "UNKNOWN"} /></InfoField>
                  )} />

                  {page !== "pesan-status" && (
                    <Controller name="statusPembayaranIuranTahunan" control={control} render={({ field }) => (
                      <InfoField label="Iuran Tahunan"><StatusBadge value={field.value || "UNKNOWN"} /></InfoField>
                    )} />
                  )}
                </div>

                {/* ── Notes ── */}
                <Controller name="notes" control={control} render={({ field }) => (
                  canEdit ? (
                    <div style={{ marginBottom: 20 }}>
                      <div style={{ fontSize: "0.625rem", fontWeight: 700, color: "#505a5f", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Penjelasan</div>
                      <textarea
                        {...field}
                        rows={3}
                        style={{ width: "100%", fontSize: "0.8125rem", padding: "4px 6px", border: "1px solid #b1b4b6", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box" }}
                      />
                    </div>
                  ) : (
                    <div style={{ marginBottom: field.value ? 20 : 0 }}>
                      {field.value && (
                        <>
                          <div style={{ fontSize: "0.625rem", fontWeight: 700, color: "#505a5f", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Penjelasan</div>
                          <div style={{ fontSize: "0.8125rem", color: "#0b0c0c" }}>{field.value}</div>
                        </>
                      )}
                    </div>
                  )
                )} />

                {/* ── Actions ── */}
                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 8, flexWrap: "wrap", paddingTop: 12, borderTop: "1px solid #f0f0f0" }}>
                  {role === "approver" && page === "pesan-status" && !isApproveReady && (
                    <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#d4351c", marginRight: "auto" }}>
                      {watch("statusPembayaranPesanan") !== "PAID" && "Pembayaran belum PAID. "}
                      {!watch("tanggalPemakaman") && "Tanggal pemakaman belum diisi."}
                    </div>
                  )}
                  <GovukButton type="button" variant="secondary" onClick={() => router.push(page === "pesan-status" ? "/layanan/pesan/status" : "/layanan/makam")}>
                    ← Kembali
                  </GovukButton>
                  {role === "admin" && <GovukButton type="submit">Simpan</GovukButton>}
                  {role === "approver" && page === "pesan-status" && (
                    <GovukButton
                      type="button"
                      disabled={!isApproveReady}
                      onClick={() => {
                        if (!isApproveReady) return;
                        if (window.confirm("Aksi ini akan mengaktifkan makam dan memindahkan data dari status pemesanan ke makam aktif. Lanjutkan?")) {
                          convertMakam(id as string).then((success) => {
                            if (success) router.push("/layanan/makam");
                          });
                        }
                      }}
                    >
                      Approve
                    </GovukButton>
                  )}
                </div>

              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// ── Inline status badge ──────────────────────────────────────────────────────
function StatusBadge({ value }: { value: string | null | undefined }) {
  if (!value) return <span style={{ color: "#505a5f", fontSize: "0.8125rem" }}>-</span>;

  const colorMap: Record<string, { bg: string; color: string }> = {
    PAID:      { bg: "#00703c", color: "#fff" },
    UNPAID:    { bg: "#d4351c", color: "#fff" },
    ACTIVE:    { bg: "#00703c", color: "#fff" },
    INACTIVE:  { bg: "#505a5f", color: "#fff" },
    KOSONG:    { bg: "#00703c", color: "#fff" },
    TERISI:    { bg: "#d4351c", color: "#fff" },
    UNKNOWN:   { bg: "#b1b4b6", color: "#0b0c0c" },
  };

  const style = colorMap[value.toUpperCase()] ?? { bg: "#1d70b8", color: "#fff" };

  return (
    <span style={{
      display: "inline-block",
      padding: "1px 7px",
      fontSize: "0.6875rem",
      fontWeight: 700,
      background: style.bg,
      color: style.color,
      letterSpacing: "0.04em",
    }}>
      {value}
    </span>
  );
}
