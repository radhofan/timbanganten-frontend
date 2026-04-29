"use client";

import { useState, useEffect, useMemo, JSX } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { Admin } from "@/lib/types";
import {
  GovukTable,
  GovukTableHead,
  GovukTableBody,
  GovukTableRow,
  GovukTableHeader,
  GovukTableCell,
  GovukInput,
  GovukButton,
  GovukPagination,
  GovukTag,
} from "@/components/govuk";



export default function AdminTable(): JSX.Element {
  const [data, setData] = useState<Admin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(10);
  const [current, setCurrent] = useState<number>(1);

  const user = useStore(authStore, (s) => s.user);
  const role = user?.role;

  useEffect(() => {
    let mounted = true;
    fetch("/api/admin")
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch admins");
        return r.json();
      })
      .then((res: Admin[]) => {
        if (!mounted) return;
        setData(Array.isArray(res) ? res : []);
        setLoading(false);
      })
      .catch(() => {
        if (!mounted) return;
        setData([]);
        setLoading(false);
      });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;
    return data.filter((item) =>
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      (item.contact ?? "").toLowerCase().includes(q)
    );
  }, [data, search]);

  const total = filtered.length;
  const sliceStart = (current - 1) * pageSize;
  const visibleData = filtered.slice(sliceStart, sliceStart + pageSize);
  const totalPages = Math.ceil(total / pageSize) || 1;

  const handlePageChange = (page: number) => {
    setCurrent(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (current <= 3) {
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
    }
    return pages;
  };

  const [sortField, setSortField] = useState<keyof Admin | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Admin) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortField) return visibleData;
    return [...visibleData].sort((a, b) => {
      const aVal = a[sortField] ?? "";
      const bVal = b[sortField] ?? "";
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [visibleData, sortField, sortDirection]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />

      <main style={{ flex: 1 }} className="page-container">
        {/* Page title */}
        <div style={{ borderBottom: "2px solid #0b0c0c", paddingBottom: 8, marginBottom: 12, display: "flex", alignItems: "baseline", gap: 12 }}>
          <h2 style={{ fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.25rem)", color: "#0b0c0c", margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Daftar Kontak Admin
          </h2>
          {!loading && (
            <span style={{ fontSize: "0.75rem", color: "#505a5f", fontWeight: 600 }}>{total} data</span>
          )}
        </div>

        {/* Toolbar */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 10, padding: "10px 12px", background: "#f3f2f1", border: "1px solid #505a5f", marginBottom: 0 }}>
          {/* Filters - left */}
          <div style={{ display: "flex", alignItems: "flex-end", flexWrap: "wrap", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0b0c0c" }} htmlFor="kontak-search">Cari</label>
              <GovukInput
                id="kontak-search"
                placeholder="Nama, email, atau kontak..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setCurrent(1); }}
                style={{ width: "clamp(180px, 28vw, 280px)" }}
              />
            </div>
          </div>
          {/* Actions - right */}
          {role === "admin" && (
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <Link href="/layanan/kontak/add">
                <GovukButton>Tambah Kontak Baru</GovukButton>
              </Link>
            </div>
          )}
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
            Menampilkan {visibleData.length} dari {total} admin
            {filtered.length !== data.length && ` (difilter dari ${data.length} total)`}
          </div>
        )}

        <GovukTable>
          <GovukTableHead>
            <GovukTableRow>
              <GovukTableHeader sortKey="name" currentSort={sortField ?? ""} sortDir={sortDirection} onSort={(k) => handleSort(k as keyof Admin)} style={{ minWidth: 120 }}>Nama</GovukTableHeader>
              <GovukTableHeader sortKey="contact" currentSort={sortField ?? ""} sortDir={sortDirection} onSort={(k) => handleSort(k as keyof Admin)}>Kontak</GovukTableHeader>
              <GovukTableHeader sortKey="email" currentSort={sortField ?? ""} sortDir={sortDirection} onSort={(k) => handleSort(k as keyof Admin)}>Email</GovukTableHeader>
              <GovukTableHeader>Role</GovukTableHeader>
              {role === "admin" && <GovukTableHeader last>Ubah</GovukTableHeader>}
            </GovukTableRow>
          </GovukTableHead>
          <GovukTableBody>
            {loading ? (
              <GovukTableRow>
                <GovukTableCell colSpan={role === "admin" ? 5 : 4} style={{ textAlign: "center", color: "#505a5f" }}>
                  Memuat data...
                </GovukTableCell>
              </GovukTableRow>
            ) : sortedData.length > 0 ? (
              sortedData.map((admin) => (
                <GovukTableRow key={admin.id}>
                  <GovukTableCell style={{ fontWeight: 700 }}>{admin.name}</GovukTableCell>
                  <GovukTableCell>{admin.contact ?? "-"}</GovukTableCell>
                  <GovukTableCell>{admin.email}</GovukTableCell>
                  <GovukTableCell>
                    <GovukTag color="blue">Admin</GovukTag>
                  </GovukTableCell>
                  {role === "admin" && (
                    <GovukTableCell last>
                      <Link href={`/layanan/kontak/${admin.id}`}>
                        <GovukButton>Ubah</GovukButton>
                      </Link>
                    </GovukTableCell>
                  )}
                </GovukTableRow>
              ))
            ) : (
              <GovukTableRow>
                <GovukTableCell colSpan={role === "admin" ? 5 : 4} style={{ textAlign: "center", color: "#505a5f" }}>
                  Tidak ada data ditemukan
                </GovukTableCell>
              </GovukTableRow>
            )}
          </GovukTableBody>
        </GovukTable>

        {/* Pagination */}
        {!loading && filtered.length > 0 && (
          <GovukPagination
            currentPage={current}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
