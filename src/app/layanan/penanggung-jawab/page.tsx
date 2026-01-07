"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Makam, MakamStatus, User } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

type PenanggungJawabData = {
  userId: string; // User ID
  pjId: string; // PJ ID
  userName: string | null;
  userContact: string | null;
  makams: Makam[]; // array of active makams
  makamStatuses: MakamStatus[]; // array of reserved makams
};

export default function PenanggungJawab() {
  const [penanggungJawabList, setPenanggungJawabList] = useState<PenanggungJawabData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/penanggungJawab");
        const data = await res.json();

        const formattedData = data.map((user: User) => {
          const pj = user.penanggungJawab;

          return {
            userId: user.id,
            pjId: pj?.id || "",
            userName: user.name || null,
            userContact: user.contact || null,
            makams: Array.isArray(pj?.makam) ? pj.makam : [],
            makamStatuses: Array.isArray(pj?.makamStatus) ? pj.makamStatus : [],
          };
        });

        setPenanggungJawabList(formattedData);
      } catch (error) {
        console.error("Failed to fetch penanggung jawab:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredData = penanggungJawabList.filter((pj) => {
    if (!search) return true;
    const userName = pj.userName?.toLowerCase() || "";
    const userContact = pj.userContact?.toLowerCase() || "";
    const searchLower = search.toLowerCase();
    return userName.includes(searchLower) || userContact.includes(searchLower);
  });

  const totalPages = Math.ceil(filteredData.length / usersPerPage) || 1;
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentPJList = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header hideBanner />

      <main className="flex-1 p-6 relative bg-white flex flex-col items-center gap-4">
        <div className="text-xl text-center">Daftar Penanggung Jawab</div>

        {/* Search Filter with Add Button */}
        <div className="w-full max-w-2xl mb-4 flex gap-3">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Cari Nama Pengguna
            </label>
            <input
              type="text"
              placeholder="Contoh: John Doe"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex items-end">
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              size="large"
              onClick={() => router.push("/layanan/penanggung-jawab/add")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Tambah PJ
            </Button>
          </div>
        </div>

        {!loading && (
          <div className="w-full max-w-2xl mb-2 text-sm text-gray-600">
            Menampilkan {currentPJList.length} dari {filteredData.length} pengguna
            {filteredData.length !== penanggungJawabList.length &&
              ` (difilter dari ${penanggungJawabList.length} total)`}
          </div>
        )}

        <div className="w-full max-w-2xl space-y-4 mb-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : filteredData.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">Tidak ada pengguna ditemukan.</p>
          ) : (
            currentPJList.map((pj) => {
              const totalMakams = pj.makams.length + pj.makamStatuses.length;
              const hasActiveMakams = pj.makams.length > 0;

              return (
                <div
                  key={pj.userId}
                  className="block bg-white shadow-sm rounded-xl p-4 border-l-4 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.01]"
                  style={{
                    borderColor: hasActiveMakams ? "#22c55e" : "#facc15",
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h2 className="text-base font-semibold text-gray-800">
                        {pj.userName || "Nama Tidak Tersedia"}
                      </h2>
                      <p className="text-xs text-gray-600">
                        {pj.userContact || "Kontak Tidak Tersedia"}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${
                        hasActiveMakams
                          ? "border-green-400 text-green-700 bg-green-50"
                          : "border-yellow-400 text-yellow-700 bg-yellow-50"
                      }`}
                    >
                      {totalMakams} Makam
                    </span>
                  </div>

                  {/* Makam List */}
                  {totalMakams > 0 ? (
                    <div className="mt-3 space-y-1.5">
                      {pj.makams.map((m) => (
                        <div
                          key={`aktif-${m.id}`}
                          className="flex justify-between items-center py-2 px-3 hover:bg-green-50 rounded-md transition-colors border-l-2 border-green-500"
                        >
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-800">{m.nama}</div>
                            <div className="text-xs text-gray-600">{m.lokasi}</div>
                          </div>
                          <div className="flex-shrink-0 text-xs font-semibold text-green-700">
                            AKTIF
                          </div>
                        </div>
                      ))}

                      {pj.makamStatuses.map((s) => (
                        <div
                          key={`pesan-${s.id}`}
                          className="flex justify-between items-center py-2 px-3 hover:bg-yellow-50 rounded-md transition-colors border-l-2 border-yellow-500"
                        >
                          <div className="flex-1">
                            <div className="text-sm font-medium text-gray-800">{s.nama}</div>
                            <div className="text-xs text-gray-600">{s.lokasi}</div>
                          </div>
                          <div className="flex-shrink-0 text-xs font-semibold text-yellow-700">
                            PESAN
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 mt-2">
                      Tidak ada data pemakaman atau pesanan berlangsung.
                    </p>
                  )}

                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      className="bg-blue-600 text-white rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-blue-700 transition"
                      onClick={() => router.push(`/layanan/penanggung-jawab/${pj.userId}`)}
                    >
                      Edit Pengguna
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {!loading && filteredData.length > 0 && (
          <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-white px-6 py-4 rounded-lg shadow mb-12">
            <div className="text-sm text-gray-700">
              Halaman {currentPage} dari {totalPages}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                }`}
              >
                <ChevronLeft size={16} />
                Sebelumnya
              </button>

              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === "number" && handlePageChange(page)}
                    disabled={page === "..."}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                      page === currentPage
                        ? "bg-blue-500 text-white"
                        : page === "..."
                          ? "text-gray-400 cursor-default"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition ${
                  currentPage === totalPages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                }`}
              >
                Selanjutnya
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
