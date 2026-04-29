"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { MakamStatus } from "@/lib/types";
import { StatusLabel } from "@/components/StatusLabel";
import { GovukInput } from "@/components/govuk";

export default function Status() {
  const [data, setData] = useState<MakamStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterPayment, setFilterPayment] = useState<string[]>([]);
  const itemsPerPage = 10;

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
    const matchNama = item.jenazah?.user?.name?.toLowerCase().includes(query);
    const matchPenanggungJawab = item.pj.some((pj) =>
      pj.user?.name?.toLowerCase().includes(query)
    );
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
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />

      <main style={{ flex: 1, padding: "clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 2vw, 2rem)" }}>
        {/* Header row */}
        <div
          style={{
            borderBottom: "2px solid #0b0c0c",
            paddingBottom: 8,
            marginBottom: 12,
            display: "flex",
            alignItems: "baseline",
            gap: 12,
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
              color: "#0b0c0c",
              margin: 0,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
            }}
          >
            Status Pemesanan
          </h2>
          {!loading && (
            <span style={{ fontSize: "0.75rem", color: "#505a5f", fontWeight: 600 }}>
              {filteredData.length} data
            </span>
          )}
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 10, padding: "10px 12px", background: "#f3f2f1", border: "1px solid #505a5f", marginBottom: 0 }}>
          <div style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0b0c0c" }} htmlFor="status-search">Cari</label>
              <GovukInput
                id="status-search"
                type="text"
                placeholder="Nama, blok, atau PJ..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                style={{ width: "clamp(180px, 28vw, 280px)" }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0b0c0c" }}>Filter Pembayaran</label>
              <div style={{ display: "flex", gap: 12, alignItems: "center", height: 34 }}>
                {["PAID", "PENDING"].map((opt) => (
                  <label key={opt} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "0.875rem", fontWeight: 600, color: "#0b0c0c", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={filterPayment.includes(opt)}
                      onChange={(e) => setFilterPayment((prev) => e.target.checked ? [...prev, opt] : prev.filter((x) => x !== opt))}
                      style={{ width: 16, height: 16, accentColor: "#1d70b8" }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result count */}
        {!loading && (
          <div
            style={{
              padding: "4px 10px",
              background: "#fff",
              border: "1px solid #b1b4b6",
              borderTop: "none",
              borderBottom: "2px solid #0b0c0c",
              fontSize: "0.75rem",
              color: "#505a5f",
              fontWeight: 600,
              marginBottom: 8,
            }}
          >
            Menampilkan {currentItems.length} dari {filteredData.length} pemesanan
            {filteredData.length !== data.length && ` (difilter dari ${data.length} total)`}
          </div>
        )}

        {/* List */}
        <div style={{ border: "1px solid #b1b4b6" }}>
          {loading ? (
            <div style={{ padding: 24, textAlign: "center", color: "#505a5f", background: "#fff" }}>
              Memuat data...
            </div>
          ) : filteredData.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", color: "#505a5f", background: "#fff" }}>
              Tidak ada data pemesanan ditemukan.
            </div>
          ) : (
            currentItems.map((item, idx) => (
              <Link
                key={item.id}
                href={`/layanan/pesan/status/${item.id}`}
                style={{
                  display: "block",
                  background: idx % 2 === 0 ? "#fff" : "#fafafa",
                  borderBottom: "1px solid #b1b4b6",
                  padding: "clamp(8px, 1vw, 12px) clamp(10px, 1.5vw, 16px)",
                  textDecoration: "none",
                  color: "inherit",
                  borderLeft: "4px solid #1d70b8",
                  transition: "background 0.08s",
                }}
                className="hover:bg-[#dce7f5]"
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: 12,
                    marginBottom: 6,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.9375rem",
                        color: "#0b0c0c",
                        marginBottom: 3,
                      }}
                    >
                      {item.jenazah?.user?.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "#505a5f",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        Status Bayar:
                      </span>
                      <div style={{ width: 80 }}>
                        <StatusLabel
                          id={`statusPembayaran-${item.id}`}
                          label=""
                          value={item.jenazah?.statusPembayaranPesanan || "UNKNOWN"}
                          readOnly
                          disabled
                          size="small"
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 700,
                      color: "#1d70b8",
                      fontFamily: "monospace",
                      flexShrink: 0,
                    }}
                  >
                    ID: {item.id}
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: "3px 16px",
                    fontSize: "0.8125rem",
                    color: "#505a5f",
                  }}
                >
                  <div>
                    <span style={{ fontWeight: 700, color: "#0b0c0c" }}>Lokasi:</span>{" "}
                    {item.blok?.lokasi}
                  </div>
                  <div>
                    <span style={{ fontWeight: 700, color: "#0b0c0c" }}>Tgl. Pesan:</span>{" "}
                    {item.tanggalPemesanan
                      ? new Date(item.tanggalPemesanan).toLocaleDateString("id-ID")
                      : "-"}
                  </div>
                  <div style={{ gridColumn: "span 2" }}>
                    <span style={{ fontWeight: 700, color: "#0b0c0c" }}>PJ:</span>{" "}
                    {item.pj.map((pj, i) => (
                      <span key={pj.id}>
                        {pj.user?.name} ({pj.user?.contact}){i < item.pj.length - 1 ? ", " : ""}
                      </span>
                    ))}
                  </div>
                </div>

                {item.description && (
                  <div
                    style={{
                      marginTop: 4,
                      fontSize: "0.75rem",
                      color: "#505a5f",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.description}
                  </div>
                )}
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        {!loading && filteredData.length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 10,
              padding: "6px 10px",
              background: "#fff",
              border: "1px solid #b1b4b6",
            }}
          >
            <div style={{ fontSize: "0.8125rem", color: "#505a5f", fontWeight: 600 }}>
              Halaman {currentPage} dari {totalPages}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  padding: "4px 10px",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  background: currentPage === 1 ? "#f3f2f1" : "#fff",
                  color: currentPage === 1 ? "#b1b4b6" : "#0b0c0c",
                  border: "1px solid",
                  borderColor: currentPage === 1 ? "#b1b4b6" : "#505a5f",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                <ChevronLeft size={14} />
                Prev
              </button>

              {getPageNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === "number" && handlePageChange(page)}
                  disabled={page === "..."}
                  style={{
                    padding: "4px 10px",
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    background: page === currentPage ? "#1d70b8" : "#fff",
                    color: page === currentPage ? "#fff" : page === "..." ? "#b1b4b6" : "#0b0c0c",
                    border: "1px solid",
                    borderColor: page === currentPage ? "#003078" : "#b1b4b6",
                    cursor: page === "..." ? "default" : "pointer",
                    minWidth: 32,
                  }}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  padding: "4px 10px",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  background: currentPage === totalPages ? "#f3f2f1" : "#fff",
                  color: currentPage === totalPages ? "#b1b4b6" : "#0b0c0c",
                  border: "1px solid",
                  borderColor: currentPage === totalPages ? "#b1b4b6" : "#505a5f",
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                Next
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
