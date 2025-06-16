"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User } from "@/components/types";
import { useAuthStore } from "@/stores/useAuthStore";

export default function UserDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    data: "",
  });
  const [success, setSuccess] = useState(false);
  const { role } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`/api/user?id=${id}`);
        const data = await res.json();
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          contact: data.contact || "",
          data: data.status,
        });
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user?id=${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedUser = await res.json();
        setUser(updatedUser);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        console.error("Gagal memperbarui user");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Memuat data pengguna...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Pengguna tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col mb-24">
      <Header hideBanner />

      <main className="flex-1 px-4 py-8 md:px-8 lg:px-16 xl:px-24 mb-24">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">
          Detail Pengguna
        </h1>

        <div className="bg-white shadow-xl rounded-lg p-8 max-w-5xl mx-auto space-y-10">
          {/* Edit Form */}
          <form onSubmit={handleUpdate} className="space-y-6 max-w-lg mx-auto">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Nama Lengkap
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                required
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-gray-700 font-medium mb-2">
                Kontak
              </label>
              <input
                id="contact"
                name="contact"
                type="text"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={() => router.push("/admin/layanan/histori")}
                className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400 transition transform hover:scale-105 active:scale-95"
              >
                Batal
              </button>
              <button
                type="submit"
                onClick={() => router.push(`/admin/layanan/histori`)}
                disabled={role !== "admin"}
                className={`px-6 py-3 font-semibold rounded-lg transition transform active:scale-95 ${
                  role === "admin"
                    ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Simpan Perubahan
              </button>
            </div>
            {success && (
              <p className="text-green-600 text-center text-sm mt-2 animate-fade-in-down">
                ✔ Berhasil diperbarui!
              </p>
            )}
          </form>

            {/* Makam Terkait - Centered */}
            <section className="max-w-lg mx-auto w-full">
                <h3 className="font-bold text-gray-800 text-xl mb-4 text-center">Status Makam</h3>
                <div className="grid grid-cols-1 gap-4">
                {user.makams && user.makams.length > 0 ? (
                    user.makams.map((m) => (
                    <button
                        key={m.id}
                        onClick={() => router.push(`/admin/layanan/histori/${m.id}?type=makam`)}
                        className="p-5 border border-gray-400 rounded-lg hover:border-blue-400 hover:bg-blue-50 text-left shadow-sm transition-all w-full"
                    >
                        <div className="font-semibold text-gray-800">{m.nama}</div>
                        <div className="text-sm text-gray-600 mt-1">{m.lokasi}</div>
                    </button>
                    ))
                ) : (
                    <p className="text-gray-500 italic text-center">Tidak ada makam aktif.</p>
                )}
                </div>
            </section>

            {/* Status Pesanan Makam - Centered */}
            <section className="max-w-lg mx-auto w-full mb-12">
                <h3 className="font-bold text-gray-800 text-xl mb-4 text-center">Status Pesanan Makam</h3>
                <div className="space-y-3">
                {user.statuses && user.statuses.length > 0 ? (
                    user.statuses.map((s) => (
                    <button
                        key={s.id}
                        onClick={() => router.push(`/admin/layanan/histori/${s.id}?type=makamStatus`)}
                        className="w-full p-4 border border-gray-400 rounded-lg hover:border-green-400 hover:bg-green-50 text-left shadow-sm transition-all"
                    >
                        <div className="font-medium text-gray-800">{s.nama}</div>
                        <div className="text-sm text-gray-600 mt-1">{s.lokasi}</div>
                    </button>
                    ))
                ) : (
                    <p className="text-gray-500 italic text-center">Tidak ada pesanan berlangsung.</p>
                )}
                </div>
            </section>
            </div>
      </main>

      <Footer />
    </div>
  );
}