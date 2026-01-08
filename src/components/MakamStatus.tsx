"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { DatePicker, Select } from "antd";
import dayjs from "dayjs";

function Input({
  label,
  id,
  value,
  onChange,
  readOnly,
  disabled,
}: {
  label: string;
  id: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  disabled?: boolean;
}) {
  const isInactive = readOnly || disabled;

  const statusStyle =
    value === "PAID"
      ? "border-green-400 text-green-700 bg-green-50"
      : value === "UNPAID"
        ? "border-red-400 text-red-700 bg-red-50"
        : value === "UNKNOWN"
          ? "border-gray-300 text-gray-500 bg-gray-100"
          : "";

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        required
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        disabled={disabled}
        className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 text-center font-medium
          ${
            isInactive
              ? statusStyle || "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
              : "border-gray-300 focus:ring-blue-500"
          }`}
      />
    </div>
  );
}

export default function MakamStatus({ page }: { page: string }) {
  const { id } = useParams();
  const endpoint = page === "pesan-status" ? "makamStatus" : "makam";
  const [backendHadTanggalPemakaman, setBackendHadTanggalPemakaman] = useState<boolean | null>(
    null
  );
  const isTanggalPemakamanLocked = backendHadTanggalPemakaman === true;
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    namapj: "",
    kontak: "",
    namajenazah: "",
    silsilah: "",
    lokasi: "",
    notes: "",
    payment: "",
    ext: "",
    approved: "",
    blok: "",
    tanggalPemesanan: "",
    tanggalPemakaman: "",
    statusBlok: "",
    statusJenazah: "",
    statusPembayaranPesanan: "",
    statusPembayaranIuranTahunan: "",
    jenazahId: "",
  });

  const router = useRouter();
  const user = useStore(authStore, (s) => s.user);
  const role = user?.role;
  const canEdit = role === "admin";

  const fetchData = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);

      const res = await fetch(`/api/${endpoint}?id=${id}`);
      const data = await res.json();
      console.log(data);

      const backendTanggal = data.jenazah?.tanggalPemakaman;

      setBackendHadTanggalPemakaman((prev) => (prev === null ? Boolean(backendTanggal) : prev));

      setFormData({
        namapj: data.pj?.[0]?.user?.name || "",
        kontak: data.pj?.[0]?.user?.contact || "",
        namajenazah: data.jenazah.user.name || "",
        silsilah: data.silsilah || "",
        lokasi: data.blok.lokasi || "",
        notes: data.description || "",
        payment: data.payment || "",
        ext: data.ext || "",
        tanggalPemesanan: data.tanggalPemesanan || "",
        tanggalPemakaman: data.jenazah.tanggalPemakaman || "",
        approved: data.approved,
        blok: data.blok.id,
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
  }, [id, endpoint]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      { field: formData.namapj, name: "Nama Penanggung Jawab" },
      { field: formData.kontak, name: "Kontak Penanggung Jawab" },
      { field: formData.namajenazah, name: "Nama Jenazah" },
      { field: formData.silsilah, name: "Silsilah" },
      { field: formData.lokasi, name: "Lokasi" },
      { field: formData.notes, name: "Penjelasan" },
      { field: formData.blok, name: "Blok Makam" },
    ];

    const emptyField = requiredFields.find(({ field }) => !field || field.trim() === "");
    if (emptyField) {
      alert(`Field "${emptyField.name}" wajib diisi.`);
      return;
    }

    const payload = {
      id,
      blok: formData.blok,
      nama: formData.namajenazah,
      lokasi: formData.lokasi,
      silsilah: formData.silsilah,
      nama_penanggung_jawab: formData.namapj,
      kontak_penanggung_jawab: formData.kontak,
      description: formData.notes,
      tanggal_pemakaman: formData.tanggalPemakaman,
      tanggalPemesanan: formData.tanggalPemesanan,
    };

    try {
      const res = await fetch(`/api/${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error("Update failed:", err);
        alert("Failed to update record!");
      } else {
        alert("Makam updated successfully!");
        router.push(page === "pesan-status" ? "/layanan/pesan/status" : "/layanan/makam");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("An error occurred while submitting the form.");
    }
  };

  const bayarPesanan = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/bayarPesanan", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          tanggal_pemesanan: formData.tanggalPemesanan,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Failed to mark pesanan as PAID");
      }

      await fetchData();
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Pesanan PAID error:", err);
        alert("Gagal mengubah status pembayaran pesanan: " + err.message);
      } else {
        console.error("Unknown error:", err);
        alert("Terjadi kesalahan tidak dikenal.");
      }
      return false;
    }
  };

  const bayarIuranTahunan = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/bayarIuranTahunan", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error?.error || "Failed to mark pesanan as PAID");
      }

      await fetchData();
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Pesanan PAID error:", err);
        alert("Gagal mengubah status pembayaran pesanan: " + err.message);
      } else {
        console.error("Unknown error:", err);
        alert("Terjadi kesalahan tidak dikenal.");
      }
      return false;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header hideBanner />

      <main className="flex-1 p-6 md:p-10 bg-white flex justify-center items-start mb-24">
        {loading ? (
          <div className="w-full max-w-4xl text-center py-20">
            <p className="text-gray-500 text-lg animate-pulse">Memuat data status pemesanan...</p>
          </div>
        ) : (
          <form
            className="bg-white border border-gray-400 rounded-lg p-6 md:p-10 w-full max-w-4xl space-y-8"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-semibold text-center text-gray-800">
              Status Pemesanan Makam
            </h2>

            <section>
              <h3 className="text-lg font-medium text-gray-700 mb-4">Informasi Dasar</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nama Jenazah"
                  id="namajenazah"
                  value={formData.namajenazah}
                  onChange={handleChange}
                  readOnly={!canEdit}
                />
                <Input
                  label="Nama Penanggung Jawab"
                  id="namapj"
                  value={formData.namapj}
                  onChange={handleChange}
                  readOnly
                />
                <Input
                  label="No. Kontak PJ"
                  id="kontak"
                  value={formData.kontak}
                  onChange={handleChange}
                  readOnly
                />
                <Input
                  label="Hubungan Silsilah"
                  id="silsilah"
                  value={formData.silsilah}
                  onChange={handleChange}
                  readOnly={!canEdit}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>

                  <Select
                    value={formData.lokasi || undefined}
                    onChange={(value) => {
                      if (!canEdit) return;
                      setFormData((prev) => ({
                        ...prev,
                        lokasi: value,
                      }));
                    }}
                    disabled={!canEdit}
                    placeholder="Pilih Lokasi Pemakaman"
                    className="w-full"
                    size="middle"
                    options={[
                      { value: "Karang Anyar", label: "Karang Anyar" },
                      { value: "Dalem Kaum", label: "Dalem Kaum" },
                      { value: "Dayeuhkolot", label: "Dayeuhkolot" },
                    ]}
                  />
                </div>
                <Input
                  label="Blok Makam"
                  id="blok"
                  value={formData.blok}
                  onChange={handleChange}
                  readOnly={role !== "admin"}
                />
                <div>
                  <label
                    htmlFor="Tanggal Pemesanan"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Tanggal Pemesanan
                  </label>
                  <DatePicker
                    id="tanggal_pemesanan"
                    value={formData.tanggalPemesanan ? dayjs(formData.tanggalPemesanan) : null}
                    onChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        tanggal_pemesanan: value ? value.toISOString() : "",
                      }));
                    }}
                    disabled={true}
                    className="w-full"
                  />
                </div>
                <Input
                  label="Status Blok Sekarang"
                  id="statusBlok"
                  value={formData.statusBlok}
                  onChange={handleChange}
                  readOnly={true}
                  disabled={true}
                />
                <Input
                  label="Status Jenazah *(Harap approve dan aktifkan makam jika jenazah sudah dikubur)"
                  id="statusJenazah"
                  value={formData.statusJenazah}
                  onChange={handleChange}
                  readOnly={true}
                  disabled={true}
                />
                <div>
                  <label
                    htmlFor="Tanggal Pemakaman"
                    className="block text-sm font-medium text-gray-700 mb-1 mt-6"
                  >
                    Tanggal Pemakaman *(Harap diisi sebelum di approve)
                  </label>
                  <DatePicker
                    value={formData.tanggalPemakaman ? dayjs(formData.tanggalPemakaman) : null}
                    disabled={!canEdit || isTanggalPemakamanLocked}
                    onChange={(value) => {
                      if (isTanggalPemakamanLocked) return;

                      setFormData((prev) => ({
                        ...prev,
                        tanggalPemakaman: value ? value.toISOString() : "",
                      }));
                    }}
                    className="w-full"
                  />
                </div>
                <Input
                  label="Status Pembayaran Pesanan"
                  id="statusPembayaranPesanan"
                  value={formData.statusPembayaranPesanan || "UNKNOWN"}
                  readOnly
                  disabled
                />
                <Input
                  label="Status Pembayaran Iuran Tahunan"
                  id="statusPembayaranIuranTahunan"
                  value={formData.statusPembayaranIuranTahunan || "UNKNOWN"}
                  readOnly
                  disabled
                />
              </div>
            </section>

            <section>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Penjelasan
              </label>
              <textarea
                id="notes"
                name="notes"
                required
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly={role !== "admin"}
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
                  {page === "pesan-status" && !formData.statusPembayaranPesanan && (
                    <button
                      type="button"
                      onClick={async () => {
                        const success = await bayarPesanan(formData.jenazahId);
                        if (success) {
                          await fetchData();
                        }
                      }}
                      className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
                    >
                      Approve Pembayaran Pesanan
                    </button>
                  )}

                  {page === "makam-status" && (
                    <button
                      type="button"
                      onClick={async () => {
                        const success = await bayarIuranTahunan(formData.jenazahId);
                        if (success) {
                          await fetchData();
                        }
                      }}
                      className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
                    >
                      Approve Iuran Tahunan
                    </button>
                  )}

                  <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                  >
                    Update
                  </button>
                </div>
              )}

              {role === "approver" &&
                formData.approved !== "APPROVED" &&
                page === "pesan-status" && (
                  <button
                    type="button"
                    onClick={async () => {
                      if (!formData.tanggalPemakaman) {
                        alert("Tanggal pemakaman wajib diisi sebelum approval.");
                        return;
                      }
                      const success = await convertMakam(id as string);
                      if (success) router.push("/layanan/makam");
                    }}
                    className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                )}
            </div>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
