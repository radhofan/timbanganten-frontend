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
  userId: string;
  pjId: string;
  userName: string | null;
  userContact: string | null;
  makams: Makam[];
  makamStatuses: MakamStatus[];
};

export default function PenanggungJawab() {
  const [penanggungJawabList, setPenanggungJawabList] = useState<PenanggungJawabData[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
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
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
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
              Daftar Penanggung Jawab
            </h2>
            {!loading && (
              <span style={{ fontSize: "0.75rem", color: "#505a5f", fontWeight: 600 }}>
                {filteredData.length} data
              </span>
            )}
          </div>
          <Button
            type="primary"
            icon={<UserAddOutlined />}
            onClick={() => router.push("/layanan/penanggung-jawab/add")}
          >
            Tambah PJ
          </Button>
        </div>

        {/* Toolbar */}
        <div
          style={{
            padding: "8px 10px",
            background: "#f3f2f1",
            border: "1px solid #505a5f",
            marginBottom: 0,
          }}
        >
          <label className="ent-label">Cari Nama / Kontak</label>
          <input
            type="text"
            placeholder="Contoh: John Doe atau 08XXXXXXXXX"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="ent-input"
            style={{ maxWidth: "clamp(200px, 35vw, 360px)" }}
          />
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
            Menampilkan {currentPJList.length} dari {filteredData.length} pengguna
            {filteredData.length !== penanggungJawabList.length &&
              ` (difilter dari ${penanggungJawabList.length} total)`}
          </div>
        )}

        {/* Table-style list */}
        {/* Column header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 120px 80px 100px",
            gap: 0,
            background: "#f3f2f1",
            border: "1px solid #505a5f",
            borderBottom: "2px solid #505a5f",
          }}
        >
          {["Nama Pengguna", "No. Kontak", "Jml. Makam", "Aksi"].map((col) => (
            <div
              key={col}
              style={{
                padding: "5px 10px",
                fontSize: "0.6875rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                color: "#0b0c0c",
                borderRight: "1px solid #b1b4b6",
              }}
            >
              {col}
            </div>
          ))}
        </div>

        <div style={{ border: "1px solid #b1b4b6", borderTop: "none" }}>
          {loading ? (
            <div style={{ padding: 24, textAlign: "center", color: "#505a5f", background: "#fff" }}>
              Memuat data...
            </div>
          ) : filteredData.length === 0 ? (
            <div style={{ padding: 24, textAlign: "center", color: "#505a5f", background: "#fff" }}>
              Tidak ada pengguna ditemukan.
            </div>
          ) : (
            currentPJList.map((pj, idx) => {
              const totalMakams = pj.makams.length + pj.makamStatuses.length;
              const hasActiveMakams = pj.makams.length > 0;

              return (
                <div
                  key={pj.userId}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 120px 80px 100px",
                    background: idx % 2 === 0 ? "#fff" : "#fafafa",
                    borderBottom: "1px solid #b1b4b6",
                    borderLeft: `4px solid ${hasActiveMakams ? "#00703c" : "#f47738"}`,
                    transition: "background 0.08s",
                  }}
                  className="hover:bg-[#dce7f5]"
                >
                  <div style={{ padding: "6px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0b0c0c" }}>
                      {pj.userName || "Nama Tidak Tersedia"}
                    </span>
                  </div>
                  <div
                    style={{
                      padding: "6px 10px",
                      fontSize: "0.8125rem",
                      color: "#505a5f",
                      borderLeft: "1px solid #e8e8e8",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {pj.userContact || "-"}
                  </div>
                  <div
                    style={{
                      padding: "6px 10px",
                      borderLeft: "1px solid #e8e8e8",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        padding: "1px 6px",
                        border: `1px solid ${hasActiveMakams ? "#00703c" : "#f47738"}`,
                        color: hasActiveMakams ? "#00703c" : "#a05a00",
                        background: hasActiveMakams ? "#e3f4eb" : "#fef7e0",
                      }}
                    >
                      {totalMakams}
                    </span>
                  </div>
                  <div
                    style={{
                      padding: "4px 8px",
                      borderLeft: "1px solid #e8e8e8",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => router.push(`/layanan/penanggung-jawab/${pj.userId}`)}
                      style={{
                        background: "#1d70b8",
                        color: "#fff",
                        border: "2px solid #003078",
                        padding: "3px 10px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              );
            })
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
