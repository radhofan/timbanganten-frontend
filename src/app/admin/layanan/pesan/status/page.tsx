"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Makam } from "@/components/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Status() {
  const [data, setData] = useState<Makam[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchMakam = async () => {
        try {
        const res = await fetch("/api/makamStatus"); 
        const result = await res.json();
        setData(result);
        } catch (error) {
        console.error("Failed to fetch data:", error);
        } finally {
        setLoading(false);
        }
    };

    fetchMakam();
    }, []);

  // Filter data based on search criteria
  const filteredData = data.filter((item) => {
    const matchName = item.nama.toLowerCase().includes(searchName.toLowerCase()) ||
                      item.id.toString().includes(searchName);
    
    let matchDate = true;
    if (fromDate || toDate) {
      const itemDate = new Date(item.masa_aktif);
      if (fromDate) {
        matchDate = matchDate && itemDate >= new Date(fromDate);
      }
      if (toDate) {
        matchDate = matchDate && itemDate <= new Date(toDate);
      }
    }

    return matchName && matchDate;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchName, fromDate, toDate]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the list
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
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
            <label className="block text-xs font-medium text-gray-600 mb-1">Cari Nama Pemesan</label>
            <input
              type="text"
              placeholder="Contoh: John Doe atau 123"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Dari Tanggal</label>
              <input 
                type="date" 
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300" 
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Sampai Tanggal</label>
              <input 
                type="date" 
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300" 
              />
            </div>
          </div>
        </div>

        {/* Results Info */}
        {!loading && (
          <div className="w-full max-w-2xl mb-2 text-sm text-gray-600">
            Menampilkan {currentItems.length} dari {filteredData.length} pemesanan
            {filteredData.length !== data.length && ` (difilter dari ${data.length} total)`}
          </div>
        )}

        {/* Data List */}
        <div className="w-full max-w-2xl space-y-4 mb-6">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : filteredData.length === 0 ? (
          <p className="text-sm text-gray-500 text-center">Tidak ada data pemesanan ditemukan.</p>
        ) : (
          currentItems.map((item) => (
            <Link
              key={item.id}
              href={`/admin/layanan/pesan/status/${item.id}`}
              className="block bg-white shadow-sm rounded-xl p-4 border-l-4 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.01] cursor-pointer"
              style={{
                borderColor: item.approved === "APPROVED" ? "#22c55e" : "#facc15",
              }}
            >
              <div className="flex justify-between items-start mb-1">
                <h2 className="text-base font-semibold text-gray-800">{item.nama}</h2>
                <div className="flex flex-col text-left gap-y-2">
                  {/* First row */}
                  <div className="flex items-center gap-x-2">
                    <div className="text-sm font-medium">Status Approval:</div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        item.approved === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-500"
                      }`}
                    >
                      {item.approved}
                    </span>
                  </div>

                  {/* Second row */}
                  <div className="flex items-center gap-x-2">
                    <div className="text-sm font-medium">Status Pembayaran:</div>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        item.payment === "PAID"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-500"
                      }`}
                    >
                      {item.payment}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
                <p><span className="font-medium">ID:</span> {item.id}</p>
                <p><span className="font-medium">Lokasi:</span> {item.lokasi}</p>
                <p><span className="font-medium">Silsilah:</span> {item.silsilah}</p>
                <p><span className="font-medium">Masa Aktif:</span> {new Date(item.masa_aktif).toLocaleDateString("id-ID")}</p>
                <p className="col-span-2">
                  <span className="font-medium">Penanggung Jawab:</span> {item.nama_penanggung_jawab} ({item.kontak_penanggung_jawab})
                </p>
              </div>

              <p className="mt-2 text-gray-700 text-xs line-clamp-2">
                {item.description}
              </p>
            </Link>
          ))
        )}
      </div>

        {/* Pagination */}
        {!loading && filteredData.length > 0 && (
          <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-white px-6 py-4 rounded-lg shadow mb-12">
            <div className="text-sm text-gray-700">
              Halaman {currentPage} dari {totalPages}
            </div>
            
            <div className="flex items-center gap-2">
              {/* Previous Button */}
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

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    disabled={page === '...'}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition ${
                      page === currentPage
                        ? "bg-blue-500 text-white"
                        : page === '...'
                        ? "text-gray-400 cursor-default"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
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