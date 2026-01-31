"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { DatePicker, Tooltip } from "antd";
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
      console.log(data);

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
        headers: {
          "Content-Type": "application/json",
        },
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
    console.log("Submitting", data);
    setLoading(true);

    try {
      const validatedData = makamSchema.parse(data);

      const payload = {
        id,
        blok: validatedData.blok,
        nama: validatedData.namajenazah,
        lokasi: validatedData.lokasi,
        // silsilah: validatedData.silsilah,
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

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header hideBanner />

      <main className="flex-1 p-6 md:p-10 bg-white flex justify-center items-start mb-24">
        {loading ? (
          <div className="w-full max-w-4xl text-center py-20">
            <p className="text-gray-500 text-lg animate-pulse">Memuat data status pemesanan...</p>
          </div>
        ) : (
          <form
            className="bg-white border border-gray-400 rounded-lg p-6 md:p-10 w-full max-w-4xl space-y-8"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Status Pemesanan Makam
            </h2>

            {/* Section 1: Basic Information */}
            <section>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Informasi Dasar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nama Jenazah */}
                <Controller
                  name="namajenazah"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="namajenazah">Nama Jenazah</Label>
                      <Input
                        {...field}
                        id="namajenazah"
                        readOnly={!canEdit}
                        className="text-center"
                      />
                      {errors.namajenazah && (
                        <p className="text-red-600 text-sm mt-0">{errors.namajenazah.message}</p>
                      )}
                    </div>
                  )}
                />

                {/* Nama Penanggung Jawab */}
                <Controller
                  name="namapj"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="namapj">Nama Penanggung Jawab</Label>
                      <Input
                        {...field}
                        id="namapj"
                        readOnly
                        disabled
                        className="text-center bg-muted text-muted-foreground"
                      />
                    </div>
                  )}
                />

                {/* No. Kontak PJ */}
                <Controller
                  name="kontak"
                  control={control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-1">
                      <Label htmlFor="kontak">No. Kontak PJ</Label>
                      <Input
                        {...field}
                        id="kontak"
                        readOnly
                        disabled
                        className="text-center bg-muted text-muted-foreground"
                      />
                    </div>
                  )}
                />

                {/* Lokasi */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="lokasi">Lokasi</Label>
                  <Controller
                    name="lokasi"
                    control={control}
                    render={({ field }) => (
                      <Select value={field.value || ""} onValueChange={field.onChange} disabled>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Lokasi Pemakaman" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="Karang Anyar">Karang Anyar</SelectItem>
                          <SelectItem value="Dalem Kaum">Dalem Kaum</SelectItem>
                          <SelectItem value="Dayeuhkolot">Dayeuhkolot</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Blok Makam */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="blok">Blok Makam</Label>
                  <Controller
                    name="blok"
                    control={control}
                    render={({ field }) => (
                      <>
                        <Input {...field} id="blok" className="text-center" disabled />
                        {errors.blok && (
                          <p className="text-red-600 text-sm mt-0">{errors.blok.message}</p>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
            </section>

            {/* Section 2: Dates */}
            <section>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Tanggal</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Tanggal Pemesanan */}
                <div className="flex flex-col gap-1">
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
                <div className="flex flex-col gap-1">
                  <Label htmlFor="tanggalPemakaman">
                    Tanggal Pemakaman *(Harap diisi sebelum di approve)
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
            </section>

            {/* Section 3: Statuses */}
            <section>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Status Blok */}
                <Controller
                  name="statusBlok"
                  control={control}
                  render={({ field }) => (
                    <StatusLabel
                      label="Status Blok Sekarang"
                      id="statusBlok"
                      {...field}
                      readOnly
                      disabled
                    />
                  )}
                />

                {/* Status Jenazah */}
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

                {/* Status Pembayaran Pesanan */}
                <Controller
                  name="statusPembayaranPesanan"
                  control={control}
                  render={({ field }) => (
                    <StatusLabel
                      label="Status Pembayaran Pesanan"
                      id="statusPembayaranPesanan"
                      value={field.value || "UNKNOWN"}
                      readOnly={true}
                      disabled={true}
                    />
                  )}
                />

                {/* Status Pembayaran Iuran Tahunan */}
                {page !== "pesan-status" && (
                  <Controller
                    name="statusPembayaranIuranTahunan"
                    control={control}
                    render={({ field }) => (
                      <StatusLabel
                        label="Status Pembayaran Iuran Tahunan"
                        id="statusPembayaranIuranTahunan"
                        value={field.value || "UNKNOWN"}
                        readOnly={true}
                        disabled={true}
                      />
                    )}
                  />
                )}
              </div>
            </section>

            {/* Notes Section */}
            <section>
              <Label htmlFor="notes">Penjelasan</Label>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="notes"
                    {...field}
                    required
                    rows={4}
                    className="w-full mt-1"
                    readOnly={role !== "admin"}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </section>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="destructive"
                onClick={() => router.push("/layanan/pesan/status")}
              >
                Cancel
              </Button>

              {role === "admin" && (
                <Button type="submit" variant="default">
                  Update
                </Button>
              )}

              {role === "approver" && page === "pesan-status" && (
                <Tooltip
                  placement="top"
                  title={
                    <div className="text-sm">
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
                      disabled={
                        watch("statusPembayaranPesanan") !== "PAID" || !watch("tanggalPemakaman")
                      }
                      onClick={async () => {
                        if (
                          watch("statusPembayaranPesanan") !== "PAID" ||
                          !watch("tanggalPemakaman")
                        )
                          return;

                        const success = await convertMakam(id as string);
                        if (success) router.push("/layanan/makam");
                      }}
                      className={
                        watch("statusPembayaranPesanan") === "PAID" && watch("tanggalPemakaman")
                          ? "bg-green-600 hover:bg-green-700"
                          : ""
                      }
                    >
                      Approve
                    </Button>
                  </span>
                </Tooltip>
              )}
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
