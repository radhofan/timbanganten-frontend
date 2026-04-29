"use client";

import { useState, useEffect, useMemo, JSX } from "react";
import Link from "next/link";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { Makam } from "@/lib/types";
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
  GovukPagination,
} from "@/components/govuk";

export default function MakamTable(): JSX.Element {
  const [data, setData] = useState<Makam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(12);
  const [current, setCurrent] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<string>("Semua");
  const [sortField, setSortField] = useState<string>("blok");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const router = useRouter();

  const user = useStore(authStore, (s) => s.user);
  const isGuest = user?.role === "guest";

  useEffect(() => {
    let mounted = true;
    fetch("/api/makam")
      .then((r) => r.json())
      .then((res: Makam[]) => {
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

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = data.filter((item) => {
      const matchesSearch =
        item.jenazah?.user?.name?.toLowerCase().includes(q) ||
        item.pj.some((pj) => pj.user?.name?.toLowerCase().includes(q));
      const matchesLocation =
        selectedLocation === "Semua" || item.blok?.lokasi === selectedLocation;
      return matchesSearch && matchesLocation;
    });

    // Sort
    result.sort((a, b) => {
      let aVal: string = "";
      let bVal: string = "";

      switch (sortField) {
        case "blok":
          aVal = a.blok?.id ?? "";
          bVal = b.blok?.id ?? "";
          break;
        case "statusBlok":
          aVal = a.blok?.statusBlok ?? "";
          bVal = b.blok?.statusBlok ?? "";
          break;
        case "nama":
          aVal = a.jenazah?.user?.name ?? "";
          bVal = b.jenazah?.user?.name ?? "";
          break;
        case "statusJenazah":
          aVal = a.jenazah?.statusJenazah ?? "";
          bVal = b.jenazah?.statusJenazah ?? "";
          break;
        case "lokasi":
          aVal = a.blok?.lokasi ?? "";
          bVal = b.blok?.lokasi ?? "";
          break;
        case "namaPJ":
          aVal = a.pj.map((pj) => pj.user?.name || "").join(", ");
          bVal = b.pj.map((pj) => pj.user?.name || "").join(", ");
          break;
        case "kontakPJ":
          aVal = a.pj.map((pj) => pj.user?.contact || "").join(", ");
          bVal = b.pj.map((pj) => pj.user?.contact || "").join(", ");
          break;
      }

      const comparison = aVal.localeCompare(bVal, undefined, {
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

  return (
    <div style={{ background: "#f3f2f1", minHeight: "100%" }}>
      {/* Page title */}
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
          Daftar Pemakaman
        </h2>
        {!loading && (
          <span style={{ fontSize: "0.75rem", color: "#505a5f", fontWeight: 600 }}>
            {total} data
          </span>
        )}
      </div>

      {/* Toolbar */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 10, padding: "10px 12px", background: "#f3f2f1", border: "1px solid #505a5f", marginBottom: 0 }}>
        {/* Filters - left */}
        <div style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0b0c0c" }} htmlFor="makam-search">Cari</label>
            <GovukInput
              id="makam-search"
              placeholder="Nama, blok, atau penanggung jawab..."
              onChange={(e) => { setSearch(e.target.value); setCurrent(1); }}
              value={search}
              style={{ width: "clamp(180px, 28vw, 280px)" }}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0b0c0c" }} htmlFor="makam-lokasi">Lokasi</label>
            <GovukSelect
              id="makam-lokasi"
              value={selectedLocation}
              onChange={(e) => { setSelectedLocation(e.target.value); setCurrent(1); }}
              style={{ width: "clamp(120px, 14vw, 160px)" }}
            >
              <option value="Semua">Semua</option>
              <option value="Karang Anyar">Karang Anyar</option>
              <option value="Dalem Kaum">Dalem Kaum</option>
              <option value="Dayeuhkolot">Dayeuhkolot</option>
            </GovukSelect>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0b0c0c" }} htmlFor="makam-pagesize">Baris</label>
            <GovukSelect
              id="makam-pagesize"
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
          Menampilkan {visibleData.length} dari {total} makam
          {filtered.length !== data.length && ` (difilter dari ${data.length} total)`}
        </div>
      )}

      {loading ? (
        <div style={{ padding: "2rem", textAlign: "center", background: "#fff", border: "1px solid #b1b4b6" }}>
          <p style={{ color: "#505a5f", fontSize: "0.875rem", margin: 0 }}>Memuat data...</p>
        </div>
      ) : (
        <GovukTable>
          <GovukTableHead>
            <GovukTableRow>
              <GovukTableHeader sortKey="blok" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>Blok Makam</GovukTableHeader>
              <GovukTableHeader sortKey="statusBlok" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>Status Blok</GovukTableHeader>
              <GovukTableHeader sortKey="nama" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>Nama Jenazah</GovukTableHeader>
              <GovukTableHeader sortKey="statusJenazah" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>Status Jenazah</GovukTableHeader>
              <GovukTableHeader sortKey="lokasi" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>Lokasi</GovukTableHeader>
              <GovukTableHeader sortKey="namaPJ" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>Nama PJ</GovukTableHeader>
              {!isGuest && (
                <>
                  <GovukTableHeader sortKey="kontakPJ" currentSort={sortField} sortDir={sortOrder} onSort={handleSort}>No. Kontak PJ</GovukTableHeader>
                  <GovukTableHeader>Penjelasan</GovukTableHeader>
                  <GovukTableHeader last>Ubah</GovukTableHeader>
                </>
              )}
            </GovukTableRow>
          </GovukTableHead>
          <GovukTableBody>
            {visibleData.length === 0 ? (
              <GovukTableRow>
                <GovukTableCell colSpan={isGuest ? 6 : 9} style={{ textAlign: "center", color: "#505a5f" }}>
                  Tidak ada data ditemukan
                </GovukTableCell>
              </GovukTableRow>
            ) : (
              visibleData.map((record) => (
                <GovukTableRow key={record.id}>
                  <GovukTableCell>{record.blok?.id}</GovukTableCell>
                  <GovukTableCell style={{ fontWeight: 700 }}>{record.blok?.statusBlok || ""}</GovukTableCell>
                  <GovukTableCell style={{ fontWeight: 700 }}>{record.jenazah?.user?.name || "-"}</GovukTableCell>
                  <GovukTableCell style={{ fontWeight: 700 }}>{record.jenazah?.statusJenazah}</GovukTableCell>
                  <GovukTableCell>{record.blok?.lokasi || "-"}</GovukTableCell>
                  <GovukTableCell>
                    {record.pj.length > 0
                      ? record.pj.map((pj, index) => (
                          <span key={pj.id}>
                            {pj.user?.name || "-"}
                            {index < record.pj.length - 1 ? ", " : ""}
                          </span>
                        ))
                      : "-"}
                  </GovukTableCell>
                  {!isGuest && (
                    <>
                      <GovukTableCell>
                        {record.pj.length === 0
                          ? "-"
                          : record.pj.map((pj, index) => {
                              const num = pj.user?.contact;
                              if (!num) return null;
                              return (
                                <span key={pj.id}>
                                  <a
                                    href={`https://wa.me/${num}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "#1d70b8", textDecoration: "underline" }}
                                  >
                                    {num}
                                  </a>
                                  {index < record.pj.length - 1 ? ", " : ""}
                                </span>
                              );
                            })}
                      </GovukTableCell>
                      <GovukTableCell>
                        {record.pj.length === 0
                          ? "-"
                          : record.pj.map((pj, index) => {
                              const userId = pj.user?.id;
                              const userName = pj.user?.name || "-";
                              if (!userId) return null;
                              return (
                                <span key={pj.id}>
                                  <button
                                    onClick={() => router.push(`/layanan/histori/user/${userId}`)}
                                    style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#1d70b8", textDecoration: "underline", fontSize: "0.8125rem" }}
                                  >
                                    {userName}
                                  </button>
                                  {index < record.pj.length - 1 ? ", " : ""}
                                </span>
                              );
                            })}
                      </GovukTableCell>
                      <GovukTableCell last>
                        <Link href={`/layanan/makam/${record.id}`}>
                          <GovukButton>Ubah</GovukButton>
                        </Link>
                      </GovukTableCell>
                    </>
                  )}
                </GovukTableRow>
              ))
            )}
          </GovukTableBody>
        </GovukTable>
      )}

      {/* Pagination */}
      {!loading && filtered.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <GovukPagination
            currentPage={current}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}
