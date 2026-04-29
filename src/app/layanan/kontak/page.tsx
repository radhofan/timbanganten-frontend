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

        <Table<Admin>
          columns={columns}
          dataSource={visibleData}
          loading={loading}
          pagination={{
            current,
            pageSize,
            total,
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 20],
            onChange: (page, size) => {
              setCurrent(page);
              if (pageSize !== size) setPageSize(size);
            },
          }}
          rowKey="id"
          bordered
          scroll={{ x: "max-content" }}
          size="small"
          className="no-gap-table"
        />
      </main>

      <Footer />
    </div>
  );
}
