"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { DatePicker, Tooltip, Modal } from "antd";
import dayjs from "dayjs";
import { StatusLabel } from "./StatusLabel";
import { useUserRoles } from "./CheckRole";
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select } from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { makamDefaultValues, MakamPayload, makamSchema } from "@/validation/makam";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const fieldStyle: React.CSSProperties = { display: "flex", flexDirection: "column", gap: 4 };
const errorStyle: React.CSSProperties = {
  fontSize: "0.75rem", fontWeight: 700, color: "#d4351c",
  borderLeft: "4px solid #d4351c", background: "#fdf2f2", padding: "2px 8px", marginTop: 2,
};
const fieldLabelStyle: React.CSSProperties = {
  fontSize: "0.6875rem", fontWeight: 700, color: "#505a5f",
  textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4,
};

export default function MakamStatus({ page }: { page: string }) {
  const { id } = useParams();
  const { isAdmin } = useUserRoles();
  const endpoint = page === "pesan-status" ? "makamStatus" : "makam";
  const [backendHadTanggalPemakaman, setBackendHadTanggalPemakaman] = useState<boolean | null>(
    null
  );

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

      reset({
        namapj: data.pj?.[0]?.user?.name || "",
        kontak: data.pj?.[0]?.user?.contact || "",
        namajenazah: data.jenazah.user.name || "",
        lokasi: data.blok.lokasi || "",
        notes: data.description || "",
        tanggalPemesanan: data.tanggalPemesanan || "",
        tanggalPemakaman: data.jenazah.tanggalPemakaman || "",
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
        toast.success("Blok makam berhasil diperbarui!", {
          position: "top-center",
          duration: 2000,
        });
        setTimeout(
          () => router.push(page === "pesan-status" ? "/layanan/pesan/status" : "/layanan/makam"),
          1500
        );
      } else {
        const responseData = await res.json();
        if (responseData.errors) {
          const allMessages = Object.values(responseData.errors).join("\n");
          toast.error(allMessages, { position: "top-center", duration: 5000 });
        } else {
          toast.error(responseData?.error || "Terjadi kesalahan saat memperbarui data.", {
            position: "top-center",
            duration: 5000,
          });
        }
      }
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        toast.error("Validasi atau pengiriman gagal: " + err.message, {
          position: "top-center",
          duration: 5000,
        });
      } else {
        toast.error("Terjadi kesalahan tidak diketahui.", {
          position: "top-center",
          duration: 5000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const isApproveReady =
    watch("statusPembayaranPesanan") === "PAID" && !!watch("tanggalPemakaman");

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />

      <main style={{ flex: 1 }} className="page-container">
        {loading ? (
          <div style={{ padding: "40px 0", color: "#505a5f", fontSize: "0.875rem" }}>
            Memuat data status pemesanan...
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ background: "#fff", border: "1px solid #505a5f", marginBottom: 24 }}
          >
            {/* Form header bar */}
            <div style={{ background: "#0b0c0c", padding: "10px 16px" }}>
              <h2 style={{
                color: "#fff", fontWeight: 700, margin: 0,
                fontSize: "clamp(0.875rem, 1.2vw, 1rem)",
                textTransform: "uppercase", letterSpacing: "0.04em",
              }}>
                Status Pemesanan Makam
              </h2>
            </div>

            <div style={{ padding: "clamp(12px, 2vw, 20px)" }}>

              {/* ── Section 1: Informasi Dasar ── */}
              <div className="ent-section-heading" style={{ marginBottom: 12 }}>Informasi Dasar</div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(clamp(200px, 28vw, 280px), 1fr))",
                gap: "10px 16px",
                marginBottom: 20,
              }}>
                {/* Nama Jenazah */}
                <Controller
                  name="namajenazah"
                  control={control}
                  render={({ field }) => (
                    <div style={fieldStyle}>
                      <Label htmlFor="namajenazah">Nama Jenazah</Label>
                      <Input
                        {...field}
                        id="namajenazah"
                        readOnly={!canEdit}
                        style={{ width: "100%" }}
                      />
                      {errors.namajenazah && (
                        <div style={errorStyle}>{errors.namajenazah.message}</div>
                      )}
                    </div>
                  )}
                />

                {/* Nama Penanggung Jawab */}
                <Controller
                  name="namapj"
                  control={control}
                  render={({ field }) => (
                    <div style={fieldStyle}>
                      <Label htmlFor="namapj">Nama Penanggung Jawab</Label>
                      <Input
                        {...field}
                        id="namapj"
                        readOnly
                        disabled
                        style={{ width: "100%" }}
                      />
                    </div>
                  )}
                />

                {/* No. Kontak PJ */}
                <Controller
                  name="kontak"
                  control={control}
                  render={({ field }) => (
                    <div style={fieldStyle}>
                      <Label htmlFor="kontak">No. Kontak PJ</Label>
                      <Input
                        {...field}
                        id="kontak"
                        readOnly
                        disabled
                        style={{ width: "100%" }}
                      />
                    </div>
                  )}
                />

                {/* Lokasi */}
                <div style={fieldStyle}>
                  <Label htmlFor="lokasi">Lokasi</Label>
                  <Controller
                    name="lokasi"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value || ""} onValueChange={field.onChange} disabled>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Lokasi Pemakaman" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Karang Anyar">Karang Anyar</SelectItem>
                          <SelectItem value="Dalem Kaum">Dalem Kaum</SelectItem>
                          <SelectItem value="Dayeuhkolot">Dayeuhkolot</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Blok Makam */}
                <Controller
                  name="blok"
                  control={control}
                  render={({ field }) => (
                    <div style={fieldStyle}>
                      <Label htmlFor="blok">Blok Makam</Label>
                      <Input {...field} id="blok" disabled style={{ width: "100%" }} />
                      {errors.blok && <div style={errorStyle}>{errors.blok.message}</div>}
                    </div>
                  )}
                />
              </div>

              {/* ── Section 2: Tanggal ── */}
              <div className="ent-section-heading" style={{ marginBottom: 12 }}>Tanggal</div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(clamp(200px, 28vw, 280px), 1fr))",
                gap: "10px 16px",
                marginBottom: 20,
              }}>
                {/* Tanggal Pemesanan */}
                <div style={fieldStyle}>
                  <Label htmlFor="tanggalPemesanan">Tanggal Pemesanan</Label>
                  <Controller
                    name="tanggalPemesanan"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        id="tanggalPemesanan"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(value) => field.onChange(value ? value.toISOString() : "")}
                        disabled
                        className="w-full"
                      />
                    )}
                  />
                </div>

                {/* Tanggal Pemakaman */}
                <div style={fieldStyle}>
                  <Label htmlFor="tanggalPemakaman">
                    Tanggal Pemakaman{" "}
                    <span style={{ fontWeight: 400, color: "#505a5f", fontSize: "0.6875rem" }}>
                      * harap diisi sebelum approve
                    </span>
                  </Label>
                  <Controller
                    name="tanggalPemakaman"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        id="tanggalPemakaman"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(value) => field.onChange(value ? value.toISOString() : "")}
                        disabled={!canEdit || isTanggalPemakamanLocked}
                        className="w-full"
                      />
                    )}
                  />
                </div>
              </div>

              {/* ── Section 3: Status ── */}
              <div className="ent-section-heading" style={{ marginBottom: 12 }}>Status</div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(clamp(200px, 28vw, 280px), 1fr))",
                gap: "10px 16px",
                marginBottom: 20,
              }}>
                <Controller
                  name="statusBlok"
                  control={control}
                  render={({ field }) => (
                    <StatusLabel
                      label="Status Blok"
                      id="statusBlok"
                      {...field}
                      readOnly
                      disabled
                    />
                  )}
                />

                <Controller
                  name="statusJenazah"
                  control={control}
                  render={({ field }) => (
                    <StatusLabel
                      label="Status Jenazah"
                      id="statusJenazah"
                      {...field}
                      readOnly
                      disabled
                    />
                  )}
                />

                <Controller
                  name="statusPembayaranPesanan"
                  control={control}
                  render={({ field }) => (
                    <StatusLabel
                      label="Status Pembayaran Pesanan"
                      id="statusPembayaranPesanan"
                      value={field.value || "UNKNOWN"}
                      readOnly
                      disabled
                    />
                  )}
                />

                {page !== "pesan-status" && (
                  <Controller
                    name="statusPembayaranIuranTahunan"
                    control={control}
                    render={({ field }) => (
                      <StatusLabel
                        label="Status Pembayaran Iuran Tahunan"
                        id="statusPembayaranIuranTahunan"
                        value={field.value || "UNKNOWN"}
                        readOnly
                        disabled
                      />
                    )}
                  />
                )}
              </div>

              {/* ── Section 4: Penjelasan ── */}
              <div className="ent-section-heading" style={{ marginBottom: 12 }}>Penjelasan</div>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="notes"
                    {...field}
                    required
                    rows={4}
                    style={{ width: "100%" }}
                    readOnly={role !== "admin"}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />

              {/* ── Action Buttons ── */}
              <div style={{
                borderTop: "1px solid #b1b4b6",
                paddingTop: 12,
                marginTop: 16,
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
              }}>
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => router.push(page === "pesan-status" ? "/layanan/pesan/status" : "/layanan/makam")}
                >
                  Batal
                </Button>

                {role === "admin" && (
                  <Button type="submit" variant="default">
                    Perbarui
                  </Button>
                )}

                {role === "approver" && page === "pesan-status" && (
                  <Tooltip
                    placement="top"
                    title={
                      <div style={{ fontSize: "0.8125rem" }}>
                        {watch("statusPembayaranPesanan") !== "PAID" && (
                          <div>• Pembayaran pesanan belum PAID</div>
                        )}
                        {!watch("tanggalPemakaman") && <div>• Tanggal pemakaman belum diisi</div>}
                      </div>
                    }
                  >
                    <span>
                      <Button
                        type="button"
                        variant="default"
                        disabled={!isApproveReady}
                        style={isApproveReady ? { background: "#00703c", boxShadow: "0 2px 0 #005a30" } : {}}
                        onClick={() => {
                          if (!isApproveReady) return;
                          Modal.confirm({
                            title: "Konfirmasi Approve Makam",
                            content: "Aksi ini akan mengaktifkan makam dan memindahkan data dari status pemesanan ke makam aktif. Lanjutkan?",
                            okText: "Approve",
                            okButtonProps: { style: { background: "#00703c", borderColor: "#00703c" } },
                            cancelText: "Batal",
                            onOk: async () => {
                              const success = await convertMakam(id as string);
                              if (success) router.push("/layanan/makam");
                            },
                          });
                        }}
                      >
                        Approve
                      </Button>
                    </span>
                  </Tooltip>
                )}
              </div>
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
