"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Makam, MakamStatus, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { GovukButton, GovukTag, GovukPagination, GovukTable, GovukTableHead, GovukTableBody, GovukTableRow, GovukTableHeader, GovukTableCell, GovukInput } from "@/components/govuk";

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
    const s = search.toLowerCase();
    return (pj.userName?.toLowerCase() || "").includes(s) || (pj.userContact?.toLowerCase() || "").includes(s);
  });

  const totalPages = Math.ceil(filteredData.length / usersPerPage) || 1;
  const startIndex = (currentPage - 1) * usersPerPage;
  const currentPJList = filteredData.slice(startIndex, startIndex + usersPerPage);

  useEffect(() => { setCurrentPage(1); }, [search]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header hideBanner />

      <div style={{ flex: 1 }} className="page-container">
        <main id="main-content" role="main">
          <div style={{ borderBottom: "1px solid #b1b4b6", paddingBottom: 8, marginBottom: 12 }}>
            <h1 style={{ fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", color: "#0b0c0c", margin: 0 }}>
              Daftar Penanggung Jawab
            </h1>
          </div>

          {/* Search toolbar */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 10, padding: "10px 12px", background: "#f3f2f1", border: "1px solid #b1b4b6", marginBottom: 0 }}>
            {/* Filters - left */}
            <div style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0b0c0c" }} htmlFor="pj-search">Cari</label>
                <GovukInput
                  id="pj-search"
                  type="text"
                  placeholder="Nama atau kontak..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{ width: "clamp(180px, 28vw, 280px)" }}
                />
              </div>
            </div>
            {/* Actions - right */}
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <GovukButton onClick={() => router.push("/layanan/penanggung-jawab/add")}>
                Tambah PJ
              </GovukButton>
            </div>
          </div>

          {!loading && (
            <p style={{ fontSize: "0.75rem", color: "#505a5f", margin: "4px 0 6px" }}>
              Menampilkan {currentPJList.length} dari {filteredData.length} pengguna
              {filteredData.length !== penanggungJawabList.length && ` (difilter dari ${penanggungJawabList.length} total)`}
            </p>
          )}

          {loading ? (
            <div style={{ padding: "2rem", textAlign: "center", background: "#fff", border: "1px solid #b1b4b6" }}>
              <p style={{ color: "#505a5f", fontSize: "0.875rem" }}>Memuat data...</p>
            </div>
          ) : (
            <GovukTable>
              <GovukTableHead>
                <GovukTableRow>
                  <GovukTableHeader>Nama Pengguna</GovukTableHeader>
                  <GovukTableHeader>No. Kontak</GovukTableHeader>
                  <GovukTableHeader>Jml. Makam</GovukTableHeader>
                  <GovukTableHeader last>Aksi</GovukTableHeader>
                </GovukTableRow>
              </GovukTableHead>
              <GovukTableBody>
                {filteredData.length === 0 ? (
                  <GovukTableRow>
                    <GovukTableCell colSpan={4} style={{ textAlign: "center", color: "#505a5f" }}>Tidak ada pengguna ditemukan.</GovukTableCell>
                  </GovukTableRow>
                ) : (
                  currentPJList.map((pj) => {
                    const totalMakams = pj.makams.length + pj.makamStatuses.length;
                    const hasActive = pj.makams.length > 0;
                    return (
                      <GovukTableRow key={pj.userId}>
                        <GovukTableCell style={{ fontWeight: 700 }}>{pj.userName || "Nama Tidak Tersedia"}</GovukTableCell>
                        <GovukTableCell>{pj.userContact || "-"}</GovukTableCell>
                        <GovukTableCell>
                          <GovukTag color={hasActive ? "green" : "orange"}>{String(totalMakams)}</GovukTag>
                        </GovukTableCell>
                        <GovukTableCell last>
                          <GovukButton onClick={() => router.push(`/layanan/penanggung-jawab/${pj.userId}`)}>
                            Ubah
                          </GovukButton>
                        </GovukTableCell>
                      </GovukTableRow>
                    );
                  })
                )}
              </GovukTableBody>
            </GovukTable>
          )}

          {!loading && filteredData.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <GovukPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
