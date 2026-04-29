"use client";

import { useState, useEffect, useMemo, JSX } from "react";
import { Table, Input, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { Admin } from "@/lib/types";



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

  const columns: ColumnsType<Admin> = [];

  columns.push({
    title: "Nama",
    dataIndex: "name",
    key: "name",
    align: "center",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (_, record) => <span style={{ fontWeight: 600 }}>{record.name}</span>,
  });

  columns.push({
    title: "Kontak",
    dataIndex: "contact",
    key: "contact",
    align: "center",
    sorter: (a, b) => (a.contact ?? "").localeCompare(b.contact ?? ""),
    render: (_, record) => <span>{record.contact ?? "-"}</span>,
  });

  columns.push({
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
    sorter: (a, b) => a.email.localeCompare(b.email),
    render: (_, record) => <span>{record.email}</span>,
  });

  columns.push({
    title: "Role",
    key: "role",
    align: "center",
    render: () => (
      <span
        style={{
          fontSize: "0.6875rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          padding: "2px 6px",
          border: "1px solid #1d70b8",
          color: "#1d70b8",
          background: "#e8f0fe",
        }}
      >
        Admin
      </span>
    ),
  });

  if (role === "admin") {
    columns.push({
      title: "Ubah",
      key: "edit",
      align: "center",
      render: (_, record) => (
        <Link href={`/layanan/kontak/${record.id}`}>
          <Button type="primary" size="small">Ubah</Button>
        </Link>
      ),
    });
  }

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
        <div className="ent-table-toolbar">
          <Input
            placeholder="Cari nama, email, atau kontak..."
            allowClear
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrent(1); }}
            style={{ maxWidth: "clamp(180px, 30vw, 300px)" }}
          />

          {role === "admin" && (
            <div style={{ marginLeft: "auto" }}>
              <Link href="/layanan/kontak/add">
                <Button type="primary">Tambah Kontak Baru</Button>
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

        <Table<Admin>
          columns={columns}
          dataSource={visibleData}
          loading={loading}
          pagination={false}
          rowKey="id"
          bordered
          scroll={{ x: "max-content" }}
          size="small"
          className="no-gap-table"
        />

        {/* Pagination */}
        {!loading && filtered.length > 0 && (
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
              Halaman {current} dari {totalPages}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <button
                onClick={() => handlePageChange(current - 1)}
                disabled={current === 1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  padding: "4px 10px",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  background: current === 1 ? "#f3f2f1" : "#fff",
                  color: current === 1 ? "#b1b4b6" : "#0b0c0c",
                  border: "1px solid",
                  borderColor: current === 1 ? "#b1b4b6" : "#505a5f",
                  cursor: current === 1 ? "not-allowed" : "pointer",
                }}
              >
                ← Prev
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
                    background: page === current ? "#1d70b8" : "#fff",
                    color: page === current ? "#fff" : page === "..." ? "#b1b4b6" : "#0b0c0c",
                    border: "1px solid",
                    borderColor: page === current ? "#003078" : "#b1b4b6",
                    cursor: page === "..." ? "default" : "pointer",
                    minWidth: 32,
                  }}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(current + 1)}
                disabled={current === totalPages}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  padding: "4px 10px",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  background: current === totalPages ? "#f3f2f1" : "#fff",
                  color: current === totalPages ? "#b1b4b6" : "#0b0c0c",
                  border: "1px solid",
                  borderColor: current === totalPages ? "#b1b4b6" : "#505a5f",
                  cursor: current === totalPages ? "not-allowed" : "pointer",
                }}
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
