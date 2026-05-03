"use client";

import { useState, useEffect, useMemo, JSX } from "react";
import { Jenazah } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  GovukTable,
  GovukTableHead,
  GovukTableBody,
  GovukTableRow,
  GovukTableHeader,
  GovukTableCell,
  GovukInput,
  GovukSelect,
  GovukButton,
  GovukTag,
  statusToTag,
  GovukSummaryList,
  GovukSummaryListRow,
} from "@/components/govuk";
import toast from "react-hot-toast";

export default function JenazahTable(): JSX.Element {
  const [data, setData] = useState<Jenazah[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(12);
  const [current, setCurrent] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<string>("Semua");
  const [sortField, setSortField] = useState<string>("blok");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [pesananModalOpen, setPesananModalOpen] = useState(false);
  const [selectedPesanan, setSelectedPesanan] = useState<Jenazah | null>(null);

  const [iuranModalOpen, setIuranModalOpen] = useState(false);
  const [selectedIuran, setSelectedIuran] = useState<Jenazah | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/jenazah")
      .then((r) => r.json())
      .then((res: Jenazah[]) => {
        if (!mounted) return;
        setData(Array.isArray(res) ? res : []);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setData([]);
        setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  function openPesananModal(record: Jenazah) {
    setSelectedPesanan(record);
    setPesananModalOpen(true);
  }

  function openIuranModal(record: Jenazah) {
    setSelectedIuran(record);
    setIuranModalOpen(true);
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = data.filter((item) => {
      const name = item.user?.name?.toLowerCase() || "";
      const block = item.blok?.id?.toLowerCase() || "";
      const matchesSearch = name.includes(q) || block.includes(q);
      const matchesLocation =
        selectedLocation === "Semua" || item.blok?.lokasi === selectedLocation;
      return matchesSearch && matchesLocation;
    });

    // Sort
    result.sort((a, b) => {
      let aVal: string | number = "";
      let bVal: string | number = "";

      switch (sortField) {
        case "blok":
          aVal = a.blok?.id || "";
          bVal = b.blok?.id || "";
          break;
        case "statusBlok":
          aVal = a.blok?.statusBlok || "";
          bVal = b.blok?.statusBlok || "";
          break;
        case "statusJenazah":
          aVal = a.statusJenazah || "";
          bVal = b.statusJenazah || "";
          break;
        case "tanggalPemakaman":
          aVal = a.tanggalPemakaman ? new Date(a.tanggalPemakaman).getTime() : 0;
          bVal = b.tanggalPemakaman ? new Date(b.tanggalPemakaman).getTime() : 0;
          break;
        case "pj":
          const allA = [...(a.makam?.pj || []), ...(a.makamStatus?.pj || [])];
          const allB = [...(b.makam?.pj || []), ...(b.makamStatus?.pj || [])];
          aVal = allA.map((p) => p.user?.name || "").join(", ");
          bVal = allB.map((p) => p.user?.name || "").join(", ");
          break;
        case "masaAktif":
          aVal = a.masaAktif ? new Date(a.masaAktif).getTime() : 0;
          bVal = b.masaAktif ? new Date(b.masaAktif).getTime() : 0;
          break;
        case "statusPembayaranPesanan":
          aVal = a.statusPembayaranPesanan || "";
          bVal = b.statusPembayaranPesanan || "";
          break;
        case "statusPembayaranIuranTahunan":
          aVal = a.statusPembayaranIuranTahunan || "";
          bVal = b.statusPembayaranIuranTahunan || "";
          break;
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      const comparison = String(aVal).localeCompare(String(bVal), undefined, {
        numeric: true,
        sensitivity: "base",
      });
      return sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [data, search, selectedLocation, sortField, sortOrder]);

  const total = filtered.length;
  const sliceStart = (current - 1) * pageSize;
  const visibleData = filtered.slice(sliceStart, sliceStart + pageSize);
  const totalPages = Math.ceil(total / pageSize) || 1;

  const handlePageChange = (page: number) => {
    setCurrent(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (current <= 3) {
      for (let i = 1; i <= 4; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    } else if (current >= totalPages - 2) {
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      pages.push("...");
      for (let i = current - 1; i <= current + 1; i++) pages.push(i);
      pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div style={{ background: "#f3f2f1", minHeight: "100%" }}>
      {/* Page title */}
      <div style={{ borderBottom: "1px solid #b1b4b6", paddingBottom: 8, marginBottom: 12 }}>
        <h1 style={{ fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", color: "#0b0c0c", margin: 0 }}>
          Daftar Almarhum/ah &amp; Pembayaran
        </h1>
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 10, padding: "10px 12px", background: "#f3f2f1", border: "1px solid #b1b4b6", marginBottom: 0 }}>
        {/* Filters - left */}
        <div style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0b0c0c" }} htmlFor="bayar-search">Cari</label>
            <GovukInput
              id="bayar-search"
              placeholder="Nama atau blok..."
              onChange={(e) => { setSearch(e.target.value); setCurrent(1); }}
              value={search}
              style={{ width: "clamp(180px, 28vw, 280px)" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0b0c0c" }} htmlFor="bayar-lokasi">Lokasi</label>
            <GovukSelect
              id="bayar-lokasi"
              value={selectedLocation}
              onChange={(e) => { setSelectedLocation(e.target.value); setCurrent(1); }}
              style={{ width: "clamp(120px, 14vw, 160px)" }}
            >
              <option value="Semua">Semua</option>
              <option value="Karang Anyar">Karang Anyar</option>
              <option value="Dalem Kaum">Dalem Kaum</option>
              <option value="Dayeuh Kolot">Dayeuh Kolot</option>
            </GovukSelect>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0b0c0c" }} htmlFor="bayar-pagesize">Baris</label>
            <GovukSelect
              id="bayar-pagesize"
              value={pageSize}
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrent(1); }}
              style={{ width: 90 }}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={12}>12</option>
              <option value={20}>20</option>
            </GovukSelect>
          </div>
        </div>
      </div>

      {/* Result count */}
      {!loading && (
        <p style={{ fontSize: "0.75rem", color: "#505a5f", margin: "4px 0 6px" }}>
          Menampilkan {visibleData.length} dari {total} almarhum/ah
          {filtered.length !== data.length && ` (difilter dari ${data.length} total)`}
        </p>
      )}

      {loading ? (
        <div style={{ padding: "2rem", textAlign: "center", color: "#505a5f", fontSize: "0.875rem" }}>
          Memuat data...
        </div>
      ) : (
        <GovukTable>
          <GovukTableHead>
            <GovukTableRow>
              <GovukTableHeader sortKey="blok" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>Blok</GovukTableHeader>
              <GovukTableHeader sortKey="statusBlok" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>Status Blok</GovukTableHeader>
              <GovukTableHeader sortKey="statusJenazah" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>Nama Almarhum/ah</GovukTableHeader>
              <GovukTableHeader sortKey="tanggalPemakaman" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>Tanggal Pemakaman</GovukTableHeader>
              <GovukTableHeader sortKey="pj" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>Penanggung Jawab</GovukTableHeader>
              <GovukTableHeader sortKey="masaAktif" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>Masa Aktif</GovukTableHeader>
              <GovukTableHeader sortKey="statusPembayaranPesanan" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>Bayar Pesanan</GovukTableHeader>
              <GovukTableHeader sortKey="statusPembayaranIuranTahunan" currentSort={sortField} sortDir={sortOrder} onSort={handleSort} last>Bayar Iuran</GovukTableHeader>
            </GovukTableRow>
          </GovukTableHead>
          <GovukTableBody>
            {visibleData.length === 0 ? (
              <GovukTableRow>
                <GovukTableCell colSpan={8} style={{ textAlign: "center", color: "#505a5f" }}>
                  Tidak ada data ditemukan
                </GovukTableCell>
              </GovukTableRow>
            ) : (
              visibleData.map((record) => {
                const allPJs = [...(record.makam?.pj || []), ...(record.makamStatus?.pj || [])];
                const pesananTag = statusToTag(record.statusPembayaranPesanan ?? "");
                const iuranTag = statusToTag(record.statusPembayaranIuranTahunan ?? "");
                const pesananClickable = record.statusPembayaranPesanan !== "PAID";
                const iuranClickable = record.statusPembayaranIuranTahunan !== "PAID";

                return (
                  <GovukTableRow key={record.id}>
                    <GovukTableCell>{record.blok?.id || ""}</GovukTableCell>
                    <GovukTableCell style={{ fontWeight: 700 }}>{record.blok?.statusBlok || ""}</GovukTableCell>
                    <GovukTableCell style={{ fontWeight: 700 }}>{record.statusJenazah || ""}</GovukTableCell>
                    <GovukTableCell>
                      {record.tanggalPemakaman
                        ? new Date(record.tanggalPemakaman).toLocaleDateString("id-ID")
                        : "-"}
                    </GovukTableCell>
                    <GovukTableCell>
                      {allPJs.length > 0
                        ? allPJs.map((p, i) => (
                            <span key={p.id}>
                              {p.user?.name || "-"}
                              {i < allPJs.length - 1 ? ", " : ""}
                            </span>
                          ))
                        : "-"}
                    </GovukTableCell>
                    <GovukTableCell>
                      {record.masaAktif ? new Date(record.masaAktif).toLocaleDateString() : "-"}
                    </GovukTableCell>
                    <GovukTableCell>
                      <button
                        onClick={() => pesananClickable && openPesananModal(record)}
                        disabled={!pesananClickable}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: pesananClickable ? "pointer" : "default",
                          padding: 0,
                        }}
                      >
                        <GovukTag color={pesananTag.color}>{pesananTag.label}</GovukTag>
                      </button>
                    </GovukTableCell>
                    <GovukTableCell>
                      <button
                        onClick={() => iuranClickable && openIuranModal(record)}
                        disabled={!iuranClickable}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: iuranClickable ? "pointer" : "default",
                          padding: 0,
                        }}
                      >
                        <GovukTag color={iuranTag.color}>{iuranTag.label}</GovukTag>
                      </button>
                    </GovukTableCell>
                  </GovukTableRow>
                );
              })
            )}
          </GovukTableBody>
        </GovukTable>
      )}

      {/* Pagination */}
      {!loading && filtered.length > 0 && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginTop: 10, padding: "6px 10px", background: "#fff", border: "1px solid #b1b4b6" }}>
          <div style={{ fontSize: "0.8125rem", color: "#505a5f", fontWeight: 600 }}>
            Halaman {current} dari {totalPages}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <button onClick={() => handlePageChange(current - 1)} disabled={current === 1} style={{ display: "flex", alignItems: "center", gap: 3, padding: "4px 10px", fontSize: "0.8125rem", fontWeight: 600, background: current === 1 ? "#f3f2f1" : "#fff", color: current === 1 ? "#b1b4b6" : "#0b0c0c", border: "1px solid", borderColor: current === 1 ? "#b1b4b6" : "#505a5f", cursor: current === 1 ? "not-allowed" : "pointer" }}>
              <ChevronLeft size={14} /> Prev
            </button>
            {getPageNumbers().map((page, index) => (
              <button key={index} onClick={() => typeof page === "number" && handlePageChange(page)} disabled={page === "..."} style={{ padding: "4px 10px", fontSize: "0.8125rem", fontWeight: 600, background: page === current ? "#1d70b8" : "#fff", color: page === current ? "#fff" : page === "..." ? "#b1b4b6" : "#0b0c0c", border: "1px solid", borderColor: page === current ? "#003078" : "#b1b4b6", cursor: page === "..." ? "default" : "pointer", minWidth: 32 }}>
                {page}
              </button>
            ))}
            <button onClick={() => handlePageChange(current + 1)} disabled={current === totalPages} style={{ display: "flex", alignItems: "center", gap: 3, padding: "4px 10px", fontSize: "0.8125rem", fontWeight: 600, background: current === totalPages ? "#f3f2f1" : "#fff", color: current === totalPages ? "#b1b4b6" : "#0b0c0c", border: "1px solid", borderColor: current === totalPages ? "#b1b4b6" : "#505a5f", cursor: current === totalPages ? "not-allowed" : "pointer" }}>
              Next <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Pesanan Modal */}
      {pesananModalOpen && selectedPesanan && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setPesananModalOpen(false)}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #b1b4b6",
              maxWidth: 600,
              width: "90%",
              maxHeight: "90vh",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ background: "#f3f2f1", padding: "12px 16px", borderBottom: "1px solid #b1b4b6", borderTop: "4px solid #1d70b8" }}>
              <h2 className="govuk-heading-m" style={{ color: "#0b0c0c", margin: 0 }}>
                Konfirmasi Pembayaran Pesanan
              </h2>
            </div>
            <div style={{ padding: 16 }}>
              <GovukSummaryList>
                <GovukSummaryListRow label="Blok" value={selectedPesanan.blok?.id || "-"} />
                <GovukSummaryListRow
                  label="Nama Almarhum/ah"
                  value={selectedPesanan.user?.name || "-"}
                />
                <GovukSummaryListRow
                  label="Status Saat Ini"
                  value={selectedPesanan.statusPembayaranPesanan || "-"}
                />
              </GovukSummaryList>

              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <GovukButton
                  variant="secondary"
                  onClick={() => {
                    setPesananModalOpen(false);
                    setSelectedPesanan(null);
                  }}
                >
                  Batal
                </GovukButton>
                <GovukButton
                  onClick={async () => {
                    await fetch("/api/bayarPesanan", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        id: selectedPesanan.id,
                        tanggal_pemesanan: selectedPesanan.tanggalPemakaman,
                      }),
                    });
                    toast.success("Status pesanan diperbarui");
                    setData((prev) =>
                      prev.map((j) =>
                        j.id === selectedPesanan.id ? { ...j, statusPembayaranPesanan: "PAID" } : j
                      )
                    );
                    setPesananModalOpen(false);
                  }}
                >
                  Tandai LUNAS
                </GovukButton>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Iuran Modal */}
      {iuranModalOpen && selectedIuran && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={() => setIuranModalOpen(false)}
        >
          <div
            style={{
              background: "#fff",
              border: "1px solid #b1b4b6",
              maxWidth: 600,
              width: "90%",
              maxHeight: "90vh",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ background: "#f3f2f1", padding: "12px 16px", borderBottom: "1px solid #b1b4b6", borderTop: "4px solid #1d70b8" }}>
              <h2 className="govuk-heading-m" style={{ color: "#0b0c0c", margin: 0 }}>
                Konfirmasi Pembayaran Iuran Tahunan
              </h2>
            </div>
            <div style={{ padding: 16 }}>
              <GovukSummaryList>
                <GovukSummaryListRow label="Blok" value={selectedIuran.blok?.id || "-"} />
                <GovukSummaryListRow
                  label="Nama Almarhum/ah"
                  value={selectedIuran.user?.name || "-"}
                />
                <GovukSummaryListRow
                  label="Masa Aktif Saat Ini"
                  value={
                    selectedIuran.masaAktif
                      ? new Date(selectedIuran.masaAktif).toLocaleDateString("id-ID")
                      : "-"
                  }
                />
                <GovukSummaryListRow
                  label="Status Saat Ini"
                  value={selectedIuran.statusPembayaranIuranTahunan || "-"}
                />
              </GovukSummaryList>

              <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                <GovukButton
                  variant="secondary"
                  onClick={() => {
                    setIuranModalOpen(false);
                    setSelectedIuran(null);
                  }}
                >
                  Batal
                </GovukButton>
                <GovukButton
                  onClick={async () => {
                    await fetch("/api/bayarIuranTahunan", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ id: selectedIuran.id }),
                    });
                    toast.success("Iuran tahunan berhasil diperbarui");
                    setData((prev) =>
                      prev.map((j) =>
                        j.id === selectedIuran.id
                          ? { ...j, statusPembayaranIuranTahunan: "PAID" }
                          : j
                      )
                    );
                    setIuranModalOpen(false);
                    setSelectedIuran(null);
                  }}
                >
                  Tandai LUNAS
                </GovukButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
