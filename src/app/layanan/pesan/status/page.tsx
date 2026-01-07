"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { MakamStatus } from "@/lib/types";
export default function Status() {
  const [data, setData] = useState<MakamStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPayment, setFilterPayment] = useState<string[]>([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchMakam = async () => {
      try {
        const res = await fetch("/api/makamStatus");
        const result = await res.json();
        const sortedResult = result.sort((a: MakamStatus, b: MakamStatus) => {
          const aId = typeof a.id === "string" ? a.id : String(a.id);
          const bId = typeof b.id === "string" ? b.id : String(b.id);
          return bId.localeCompare(aId);
        });
        setData(sortedResult);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMakam();
  }, []);

  const filteredData = data.filter((item) => {
    const query = searchName.toLowerCase();

    const matchNama = item.nama?.toLowerCase().includes(query);

    // Check if **any pj's name matches** the search
    const matchPenanggungJawab = item.pj.some((pj) => pj.user?.name?.toLowerCase().includes(query));

    const matchBlok = item.blok?.id.toLowerCase().includes(query);

    const matchPayment = filterPayment.length === 0 || filterPayment.includes("");

    return (matchNama || matchPenanggungJawab || matchBlok) && matchPayment;
  });

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchName]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
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
        <div className="text-xl text-center">Status Pemesanan</div>

        {/* Filters */}
        <div className="w-full max-w-2xl mb-4 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Cari Nama Jenazah / Nama PJ / Blok
            </label>
            <input
              type="text"
              placeholder="Contoh: John Doe, Blok A, atau 123"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Payment filter */}
            <div className="flex flex-col">
              <span className="text-xs font-medium text-gray-600 mb-1">Filter Pembayaran</span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={filterPayment.includes("PAID")}
                    onChange={(e) =>
                      setFilterPayment((prev) =>
                        e.target.checked ? [...prev, "PAID"] : prev.filter((x) => x !== "PAID")
                      )
                    }
                  />
                  PAID
                </label>
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={filterPayment.includes("PENDING")}
                    onChange={(e) =>
                      setFilterPayment((prev) =>
                        e.target.checked
                          ? [...prev, "PENDING"]
                          : prev.filter((x) => x !== "PENDING")
                      )
                    }
                  />
                  PENDING
                </label>
              </div>
            </div>
          </div>
        </div>

        {!loading && (
          <div className="w-full max-w-2xl mb-2 text-sm text-gray-600">
            Menampilkan {currentItems.length} dari {filteredData.length} pemesanan
            {filteredData.length !== data.length && ` (difilter dari ${data.length} total)`}
          </div>
        )}

        <div className="w-full max-w-2xl space-y-4 mb-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : filteredData.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">Tidak ada data pemesanan ditemukan.</p>
          ) : (
            currentItems.map((item) => (
              <Link
                key={item.id}
                href={`/layanan/pesan/status/${item.id}`}
                className="block bg-white shadow-sm rounded-xl p-4 border-l-4 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.01] cursor-pointer"
                // style={{
                //   borderColor:
                //     item.approved === "APPROVED" && item.payment === "PAID" && item.ext === "PAID"
                //       ? "#22c55e"
                //       : "#facc15",
                // }}
                style={{
                  borderColor: "#facc15",
                }}
              >
                <div className="flex justify-between items-start mb-1">
                  <h2 className="text-base font-semibold text-gray-800">{item.nama}</h2>
                  <div className="flex flex-col text-left gap-y-2">
                    <div className="flex items-center gap-x-2">
                      <div className="text-sm font-medium">Status Pembayaran Pesanan:</div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${
                          item.jenazah?.statusPembayaranPesanan === "PAID"
                            ? "border-green-400 text-green-700 bg-green-50"
                            : item.jenazah?.statusPembayaranPesanan === "UNPAID"
                              ? "border-red-400 text-red-700 bg-red-50"
                              : "border-gray-300 text-gray-500 bg-gray-100"
                        }`}
                      >
                        {item.jenazah?.statusPembayaranPesanan || "UNKNOWN"}
                      </span>
                    </div>

                    <div className="flex items-center gap-x-2">
                      <div className="text-sm font-medium">Status Iuran Tahunan:</div>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${
                          item.jenazah?.statusPembayaranIuranTahunan === "PAID"
                            ? "border-green-400 text-green-700 bg-green-50"
                            : item.jenazah?.statusPembayaranIuranTahunan === "UNPAID"
                              ? "border-red-400 text-red-700 bg-red-50"
                              : "border-gray-300 text-gray-500 bg-gray-100"
                        }`}
                      >
                        {item.jenazah?.statusPembayaranIuranTahunan || "UNKNOWN"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
                  <p>
                    <span className="font-medium">ID:</span> {item.id}
                  </p>
                  <p>
                    <span className="font-medium">Lokasi:</span> {item.lokasi}
                  </p>
                  <p>
                    <span className="font-medium">Silsilah:</span> {item.silsilah}
                  </p>
                  <p>
                    <span className="font-medium">Tanggal Pemesanan:</span>{" "}
                    {/* {new Date(item.created_at).toLocaleDateString("id-ID")} */}
                    {item.tanggalPemesanan
                      ? new Date(item.tanggalPemesanan).toLocaleDateString("id-ID")
                      : "-"}
                  </p>
                  <p className="col-span-2">
                    <span className="font-medium">Penanggung Jawab:</span>{" "}
                    {item.pj.map((pj, index) => (
                      <span key={pj.id}>
                        {pj.user?.name} ({pj.user?.contact}){index < item.pj.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </p>
                </div>

                <p className="mt-2 text-gray-700 text-xs line-clamp-2">{item.description}</p>
              </Link>
            ))
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
