"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuthStore } from "@/stores/useAuthStore";

// Move Input component outside to prevent recreation on every render
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

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
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
        className={`w-full px-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 ${
          isInactive
            ? "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      />
    </div>
  );
}

// Move StatusCard component outside as well
function StatusCard({
  title,
  status,
  onResolve,
}: {
  title: string;
  status: string;
  onResolve: () => void;
}) {
  const color =
    status === 'YES' ? 'bg-green-100 text-green-700' :
    status === 'PAID' ? 'bg-green-100 text-green-700' :
    status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
    'bg-yellow-100 text-yellow-800';

  return (
    <div className="space-y-2">
      {/* Title */}
      <label className="block text-sm font-medium text-gray-700">{title}</label>

      {/* Status Badge + Button */}
      <div className="flex items-center justify-center gap-3">
        <span className={`px-4 py-2 text-sm rounded-full font-semibold ${color}`}>
          {status}
        </span>

        {status === 'RESOLVING' && (
          <button
            type="button"
            onClick={onResolve}
            className="text-sm px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100 transition whitespace-nowrap"
          >
            Mark as Resolved
          </button>
        )}
      </div>
    </div>
  );
}

export default function Edit() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const type = typeParam === "makam" ? "makam" : "makamStatus"; // default fallback
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
    userId: "",
  });

  const router = useRouter();
  const { role } = useAuthStore();

  useEffect(() => {
    if (!id) return;
    fetch(`/api/${type}?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          namapj: data.nama_penanggung_jawab || "",
          kontak: data.kontak_penanggung_jawab || "",
          namajenazah: data.nama || "",
          silsilah: data.silsilah || "",
          lokasi: data.lokasi || "",
          notes: data.description || "",
          payment: data.payment || "",
          ext: data.ext || "",
          approved: data.approved,
          blok: data.blok,
          userId: data.userId,
        });
      })
      .catch((err) => console.error("Failed to fetch data:", err));
  }, [id, type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    };

    try {
      const res = await fetch(`/api/${type}`, {
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
        router.push("/admin/layanan/histori");
      }
    } catch (err) {
      console.error("Network error:", err);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header hideBanner />
      <main className="flex-1 p-6 md:p-10 bg-gray-100 flex justify-center items-start">
        <form
          className="bg-white rounded-2xl shadow-md p-6 md:p-10 w-full max-w-4xl space-y-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold text-center text-gray-800">Status Pemesanan Makam</h2>

          {/* Informasi Dasar */}
          <section>
            <h3 className="text-lg font-medium text-gray-700 mb-4">Informasi Dasar</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nama Penanggung Jawab" id="namapj" value={formData.namapj} onChange={handleChange} readOnly/>
              <Input label="No. Kontak PJ" id="kontak" value={formData.kontak} onChange={handleChange} readOnly/>
              <Input label="Hubungan Silsilah" id="silsilah" value={formData.silsilah} onChange={handleChange} readOnly={role !== "admin"}/>
              <Input label="Nama Jenazah" id="namajenazah" value={formData.namajenazah} onChange={handleChange} readOnly={role !== "admin"}/>
              <div>
                <label htmlFor="lokasi" className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                <select
                  id="lokasi"
                  name="lokasi"
                  required
                  value={formData.lokasi}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Pilih Lokasi Pemakaman</option>
                  <option value="Karang Anyar">Karang Anyar</option>
                  <option value="Dalem Kaum">Dalem Kaum</option>
                  <option value="Dayeuhkolot">Dayeuhkolot</option>
                </select>
              </div>
              <Input label="Blok Makam" id="blok" value={formData.blok} onChange={handleChange} readOnly={role !== "admin"}/>
            </div>
          </section>

          {/* Penjelasan */}
          <section>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">Penjelasan</label>
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

          {/* Status */}
          <section className="flex flex-wrap gap-6">
            <StatusCard
              title="Status Approval"
              status={formData.approved}
              onResolve={() => {}} // implement later
            />
            <StatusCard
              title="Status Pembayaran"
              status={formData.payment}
              onResolve={() => {}} // implement later
            />
            <StatusCard
              title="Status Perpanjangan"
              status={formData.ext}
              onResolve={() => {/* you can wire this later */}}
            />
          </section>

         {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            {role === "admin" && (
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
              >
                Submit
              </button>
            )}

            {role === "approver" && (
              <button
                type="button"
                onClick={() => {
                  // implement approval logic here
                  alert("Approved (TODO: implement logic)");
                }}
                className="px-6 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition"
              >
                Approve
              </button>
            )}
          </div>
        </form>
      </main>
      <Footer />
    </div>
  );
}