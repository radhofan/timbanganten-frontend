"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User } from "@/components/types";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Histori() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [filterByNameOnly, setFilterByNameOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();

        const formattedData = data.map((user: User) => ({
          id: user.id,
          name: user.name,
          status: user.status,
          makams: user.makams,
          statuses: user.statuses,
        }));

        setUsers(formattedData);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const filteredData = users.filter((user) => {
    const matchName = user.name.toLowerCase().includes(search.toLowerCase());
    if (filterByNameOnly) return matchName;
    const matchStatus = statusFilter === "Semua" || user.status === statusFilter;
    return matchName && matchStatus;
  });

  const totalPages = Math.ceil(filteredData.length / usersPerPage) || 1;
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  const currentUsers = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
    setOpenIndex(null);
  }, [search, statusFilter, filterByNameOnly]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOpenIndex(null);
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
    <div className="flex flex-col min-h-screen">
      <Header hideBanner />

      <main className="flex-1 px-6 py-12 bg-white max-w-6xl mx-auto border border-gray-300 rounded-xl mb-24 flex flex-col min-h-[70vh]">
        <h1 className="text-3xl font-bold text-center mb-8">Histori Pengguna</h1>

        <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            type="text"
            placeholder="Cari nama pengguna..."
            className="w-full md:w-1/2 px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              disabled={filterByNameOnly}
              className="px-4 py-2 rounded border border-gray-300"
            >
              <option value="Semua">Semua Status</option>
              <option value="AKTIF">Aktif</option>
              <option value="TIDAK AKTIF">Tidak Aktif</option>
              <option value="PESAN">Pemesanan</option>
            </select>

            <label className="flex items-center text-sm gap-2">
              <input
                type="checkbox"
                checked={filterByNameOnly}
                onChange={() => setFilterByNameOnly(!filterByNameOnly)}
                className="form-checkbox"
              />
              Hanya cari nama
            </label>
          </div>
        </div>

        {!loading && (
          <div className="mb-4 text-sm text-gray-600">
            Menampilkan {currentUsers.length} dari {filteredData.length} pengguna
            {filteredData.length !== users.length && ` (difilter dari ${users.length} total)`}
          </div>
        )}

        <div className="space-y-4 mb-8">
          {loading ? (
            <div className="text-center text-gray-500 italic">Memuat data...</div>
          ) : filteredData.length === 0 ? (
            <div className="text-center text-gray-500 italic">Tidak ada pengguna ditemukan.</div>
          ) : (
            currentUsers.map((user, idx) => (
              <div key={user.id} className="bg-white shadow rounded-xl transition">
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-4 flex justify-between items-center text-left hover:bg-gray-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-t-xl"
                >
                  <div>
                    <div className="text-lg font-semibold text-gray-400">{user.name}</div>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {user.status.split("/").map((status, index) => (
                        <div
                          key={index}
                          className={`text-sm font-medium inline-block px-2 py-0.5 rounded-full
                            ${
                              status === "AKTIF"
                                ? "bg-green-100 text-green-700"
                                : status === "TIDAK AKTIF"
                                ? "bg-red-100 text-red-700"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                        >
                          {status}
                        </div>
                      ))}
                    </div>
                  </div>
                  <span
                    className={`text-gray-500 transform transition-transform duration-300 ${
                      openIndex === idx ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown size={20} />
                  </span>
                </button>

                {openIndex === idx && (
                  <div className="border-t px-6 pb-6 pt-4 space-y-6 transition-all duration-300 ease-in-out">
                    <div>
                      <h3 className="font-medium text-gray-800 mb-2">Makam</h3>
                      {(user.makams ?? []).length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {user.makams.map((m) => (
                            <button
                              type="button"
                              key={m.id}
                              className="text-left p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                            >
                              <div className="font-medium text-gray-800 truncate">{m.nama}</div>
                              <div className="text-sm text-gray-600">{m.lokasi}</div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Tidak ada data pemakaman.</p>
                      )}
                    </div>

                    <div>
                      <h3 className="font-medium text-gray-800 mb-2">Pesanan Makam</h3>
                      {(user.statuses ?? []).length > 0 ? (
                        <div className="space-y-3">
                          {user.statuses.map((s) => (
                            <button
                              type="button"
                              key={s.id}
                              className="text-left p-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition"
                            >
                              <div className="font-medium text-gray-800 truncate">{s.nama}</div>
                              <div className="text-sm text-gray-600">{s.lokasi}</div>
                            </button>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Tidak ada pesanan berlangsung.</p>
                      )}
                    </div>

                    <button
                      type="button"
                      className="bg-blue-600 text-white rounded px-3 py-1 text-sm hover:bg-blue-700"
                      onClick={() => router.push(`/admin/layanan/histori/user/${user.id}`)}
                    >
                      Edit Pengguna
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 bg-white px-6 py-4 rounded-lg shadow">
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
      </main>

      <Footer />
    </div>
  );
}
