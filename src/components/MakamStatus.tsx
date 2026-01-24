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
  // const [formData, setFormData] = useState({
  //   namapj: "",
  //   kontak: "",
  //   namajenazah: "",
  //   silsilah: "",
  //   lokasi: "",
  //   notes: "",
  //   payment: "",
  //   ext: "",
  //   approved: "",
  //   blok: "",
  //   tanggalPemesanan: "",
  //   tanggalPemakaman: "",
  //   statusBlok: "",
  //   statusJenazah: "",
  //   statusPembayaranPesanan: "",
  //   statusPembayaranIuranTahunan: "",
  //   jenazahId: "",
  // });

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
        silsilah: data.silsilah || "",
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

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const requiredFields = [
  //     { field: formData.namapj, name: "Nama Penanggung Jawab" },
  //     { field: formData.kontak, name: "Kontak Penanggung Jawab" },
  //     { field: formData.namajenazah, name: "Nama Jenazah" },
  //     { field: formData.silsilah, name: "Silsilah" },
  //     { field: formData.lokasi, name: "Lokasi" },
  //     { field: formData.notes, name: "Penjelasan" },
  //     { field: formData.blok, name: "Blok Makam" },
  //   ];

  //   const emptyField = requiredFields.find(({ field }) => !field || field.trim() === "");
  //   if (emptyField) {
  //     alert(`Field "${emptyField.name}" wajib diisi.`);
  //     return;
  //   }

  //   const payload = {
  //     id,
  //     blok: formData.blok,
  //     nama: formData.namajenazah,
  //     lokasi: formData.lokasi,
  //     silsilah: formData.silsilah,
  //     nama_penanggung_jawab: formData.namapj,
  //     kontak_penanggung_jawab: formData.kontak,
  //     description: formData.notes,
  //     tanggal_pemakaman: formData.tanggalPemakaman,
  //     tanggalPemesanan: formData.tanggalPemesanan,
  //   };

  //   try {
  //     const res = await fetch(`/api/${endpoint}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     if (!res.ok) {
  //       const err = await res.json();
  //       console.error("Update failed:", err);
  //       alert("Failed to update record!");
  //     } else {
  //       alert("Makam updated successfully!");
  //       router.push(page === "pesan-status" ? "/layanan/pesan/status" : "/layanan/makam");
  //     }
  //   } catch (err) {
  //     console.error("Network error:", err);
  //     alert("An error occurred while submitting the form.");
  //   }
  // };

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
        silsilah: validatedData.silsilah,
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

                {/* Hubungan Silsilah */}
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="silsilah" className="flex items-center gap-2">
                      Hubungan dengan pemesan
                    </Label>
                  </div>

                  <Controller
                    name="silsilah"
                    control={control}
                    render={({ field }) => (
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
                        disabled={!canEdit}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Pilih Silsilah" />
                        </SelectTrigger>

                        <SelectContent className="bg-white">
                          <SelectItem value="diri sendiri">Diri Sendiri</SelectItem>
                          <SelectItem value="anak">Anak</SelectItem>
                          <SelectItem value="orang tua">Orang Tua</SelectItem>
                          <SelectItem value="kakak/adik">Kakak/Adik</SelectItem>
                          <SelectItem value="sepupu">Sepupu</SelectItem>
                          <SelectItem value="keponakan">Keponakan</SelectItem>
                          <SelectItem value="paman/bibi">Paman/Bibi</SelectItem>
                          <SelectItem value="kakek/nenek">Kakek/Nenek</SelectItem>
                          <SelectItem value="cucu">Cucu</SelectItem>
                          <SelectItem value=">2 generasi di atas">
                            {">2 Generasi di Atas"}
                          </SelectItem>
                          <SelectItem value=">2 generasi di bawah">
                            {">2 Generasi di Bawah"}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 mb-1">
                    Lokasi
                  </label>

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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blok Makam</label>
                  <Controller
                    name="blok"
                    control={control}
                    render={({ field }) => (
                      <div className="flex flex-col gap-1">
                        <Input {...field} className="text-sm rounded-lg text-center" disabled />
                        {errors.blok && (
                          <p className="text-red-600 text-sm mt-0">{errors.blok.message}</p>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="Tanggal Pemesanan"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tanggal Pemesanan
                  </label>
                  <Controller
                    name="tanggalPemesanan"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(value) => field.onChange(value ? value.toISOString() : "")}
                        disabled
                        className="w-full"
                      />
                    )}
                  />
                </div>
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

                <Controller
                  name="statusJenazah"
                  control={control}
                  render={({ field }) => (
                    <StatusLabel
                      label="Status Jenazah *(Harap approve dan aktifkan makam jika jenazah sudah dikubur)"
                      id="statusJenazah"
                      {...field}
                      readOnly
                      disabled
                    />
                  )}
                />

                <div>
                  <label
                    htmlFor="Tanggal Pemakaman"
                    className="block text-sm font-medium text-gray-700 mb-1 mt-6"
                  >
                    Tanggal Pemakaman *(Harap diisi sebelum di approve)
                  </label>
                  <Controller
                    name="tanggalPemakaman"
                    control={control}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(value) => field.onChange(value ? value.toISOString() : "")}
                        disabled={!canEdit || isTanggalPemakamanLocked}
                        className="w-full"
                      />
                    )}
                  />
                </div>
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

            <section>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Penjelasan
              </label>
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <textarea
                    id="notes"
                    {...field}
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    readOnly={role !== "admin"}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </section>

            <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-3 pt-6 border-t">
              <button
                type="button"
                className="px-6 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition"
                onClick={() => router.push("/layanan/pesan/status")}
              >
                Cancel
              </button>

              {role === "admin" && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                </div>
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
                    <button
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
                      className={`px-6 py-2 rounded-lg font-medium transition ${
                        watch("statusPembayaranPesanan") === "PAID" && watch("tanggalPemakaman")
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Approve
                    </button>
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
