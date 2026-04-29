"use client";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Makam, MakamStatus, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import { GovukButton, GovukTag, GovukPagination } from "@/components/govuk";

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

      <div className="govuk-width-container" style={{ flex: 1 }}>
        <main className="govuk-main-wrapper" id="main-content" role="main">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", borderBottom: "2px solid #0b0c0c", paddingBottom: 8, marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
              <h1 className="govuk-heading-l" style={{ margin: 0 }}>Daftar Penanggung Jawab</h1>
              {!loading && <span className="govuk-body-s" style={{ color: "#505a5f" }}>{filteredData.length} data</span>}
            </div>
            <GovukButton onClick={() => router.push("/layanan/penanggung-jawab/add")}>
              Tambah PJ
            </GovukButton>
          </div>

          {/* Search toolbar */}
          <div className="govuk-form-group" style={{ background: "#f3f2f1", padding: "12px 14px", border: "1px solid #505a5f", marginBottom: 0 }}>
            <label className="govuk-label" htmlFor="search">Cari Nama / Kontak</label>
            <input
              className="govuk-input"
              type="text"
              id="search"
              placeholder="Contoh: John Doe atau 08XXXXXXXXX"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ maxWidth: "clamp(200px, 35vw, 360px)" }}
            />
          </div>

          {!loading && (
            <div className="govuk-body-s" style={{ padding: "4px 10px", background: "#fff", border: "1px solid #b1b4b6", borderTop: "none", borderBottom: "2px solid #0b0c0c", color: "#505a5f", fontWeight: 600, marginBottom: 8 }}>
              Menampilkan {currentPJList.length} dari {filteredData.length} pengguna
              {filteredData.length !== penanggungJawabList.length && ` (difilter dari ${penanggungJawabList.length} total)`}
            </div>
          )}

          {/* Table */}
          <table className="govuk-table" style={{ marginBottom: 0 }}>
            <thead className="govuk-table__head">
              <tr className="govuk-table__row">
                <th scope="col" className="govuk-table__header">Nama Pengguna</th>
                <th scope="col" className="govuk-table__header">No. Kontak</th>
                <th scope="col" className="govuk-table__header govuk-table__header--numeric">Jml. Makam</th>
                <th scope="col" className="govuk-table__header">Aksi</th>
              </tr>
            </thead>
            <tbody className="govuk-table__body">
              {loading ? (
                <tr className="govuk-table__row">
                  <td className="govuk-table__cell" colSpan={4} style={{ textAlign: "center", color: "#505a5f" }}>Memuat data...</td>
                </tr>
              ) : filteredData.length === 0 ? (
                <tr className="govuk-table__row">
                  <td className="govuk-table__cell" colSpan={4} style={{ textAlign: "center", color: "#505a5f" }}>Tidak ada pengguna ditemukan.</td>
                </tr>
              ) : (
                currentPJList.map((pj) => {
                  const totalMakams = pj.makams.length + pj.makamStatuses.length;
                  const hasActive = pj.makams.length > 0;
                  return (
                    <tr key={pj.userId} className="govuk-table__row">
                      <td className="govuk-table__cell">
                        <span style={{ fontWeight: 700 }}>{pj.userName || "Nama Tidak Tersedia"}</span>
                      </td>
                      <td className="govuk-table__cell">{pj.userContact || "-"}</td>
                      <td className="govuk-table__cell govuk-table__cell--numeric">
                        <GovukTag color={hasActive ? "green" : "orange"}>{String(totalMakams)}</GovukTag>
                      </td>
                      <td className="govuk-table__cell">
                        <GovukButton
                          variant="secondary"
                          onClick={() => router.push(`/layanan/penanggung-jawab/${pj.userId}`)}
                          style={{ margin: 0 }}
                        >
                          Edit
                        </GovukButton>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {!loading && filteredData.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <GovukPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
