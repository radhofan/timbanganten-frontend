"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { useStore } from "zustand";
// import { authStore } from "@/stores/useAuthStore";
import { User } from "@/lib/types";

export default function UserDetail() {
  const { id } = useParams();
  // const userObj = useStore(authStore, (s) => s.user);
  // const router = useRouter();
  // const role = userObj?.role;

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user?id=${id}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
  }, [id]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header hideBanner />

      <main className="flex-1 px-6 py-10 md:px-12 lg:px-20 xl:px-32 mb-24">
        {loading && !user ? (
          <div className="min-h-[50vh] flex items-center justify-center">
            <p className="text-gray-500">Memuat data penanggung jawab...</p>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
              Detail Penanggung Jawab
            </h1>

            <div className="bg-white border border-gray-300 shadow-md rounded-lg p-8 max-w-6xl mx-auto">
              <div className="grid grid-cols-[auto_20px_1fr] gap-y-2 text-gray-800 text-sm">
                <div>
                  <span className="font-bold text-2xl">{user?.name || ""} </span>
                  <span className="text-red-600 font-bold text-2xl">(Penanggung Jawab)</span>
                </div>
                <div className="md:col-span-2" />

                <div>Silsilah</div>
                <div>: </div>
                <div>{""}</div>

                <div>No KTP</div>
                <div>: </div>
                <div>{""}</div>

                <div>Email</div>
                <div>: </div>
                <div className="text-blue-600 underline">{user?.email || ""}</div>

                <div>No HP</div>
                <div>: </div>
                <div>{user?.contact || ""}</div>

                <div>Kontak Darurat</div>
                <div>: </div>
                <div>{""}</div>

                <div>Nama Kontak Darurat</div>
                <div>: </div>
                <div>{""}</div>

                <div>Alamat</div>
                <div>: </div>
                <div>{""}</div>
              </div>

              <h3 className="font-bold text-gray-900 text-lg mt-10 mb-3">Daftar Makam</h3>

              <div className="overflow-x-auto">
                <table className="w-full border border-gray-400 text-sm text-gray-800">
                  <thead className="bg-black text-white">
                    <tr>
                      <th className="border border-gray-400 px-2 py-2">Nomor Makam</th>
                      <th className="border border-gray-400 px-2 py-2">Status Makam</th>
                      <th className="border border-gray-400 px-2 py-2">Atas Nama</th>
                      <th className="border border-gray-400 px-2 py-2">Hubungan</th>
                      <th className="border border-gray-400 px-2 py-2">Perpanjangan</th>
                      <th className="border border-gray-400 px-2 py-2">Masa Aktif Pesanan</th>
                      <th className="border border-gray-400 px-2 py-2">Iuran Pemeliharaan</th>
                      <th className="border border-gray-400 px-2 py-2">Masa Aktif Iuran</th>
                      <th className="border border-gray-400 px-2 py-2">Billing (Rp)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.makams?.length || user?.statuses?.length ? (
                      <>
                        {user?.makams?.map((m) => (
                          <tr key={`makam-${m.id}`}>
                            <td className="border border-gray-400 px-2 py-2">{m.nama}</td>
                            <td className="border border-gray-400 px-2 py-2">Digunakan</td>
                            <td className="border border-gray-400 px-2 py-2">
                              {m.nama_penanggung_jawab}
                            </td>
                            <td className="border border-gray-400 px-2 py-2">{m.silsilah}</td>
                            <td className="border border-gray-400 px-2 py-2">{m.masa_aktif}</td>
                            <td className="border border-gray-400 px-2 py-2">{m.payment}</td>
                          </tr>
                        ))}

                        {user?.statuses?.map((m) => (
                          <tr key={`status-${m.id}`}>
                            <td className="border border-gray-400 px-2 py-2">{m.nama}</td>
                            <td className="border border-gray-400 px-2 py-2">Dipesan</td>
                            <td className="border border-gray-400 px-2 py-2">
                              {m.nama_penanggung_jawab}
                            </td>
                            <td className="border border-gray-400 px-2 py-2">{m.silsilah}</td>
                            <td className="border border-gray-400 px-2 py-2">{m.masa_aktif}</td>
                            <td className="border border-gray-400 px-2 py-2">{m.payment}</td>
                          </tr>
                        ))}
                      </>
                    ) : (
                      <tr>
                        <td className="border border-gray-400 px-2 py-2 text-center" colSpan={9}>
                          Belum ada data makam.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
