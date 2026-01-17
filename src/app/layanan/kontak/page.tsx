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

const { Search } = Input;

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

    return () => {
      mounted = false;
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return data;

    return data.filter((item) => {
      return (
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        (item.contact ?? "").toLowerCase().includes(q)
      );
    });
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
    render: (_, record) => <span className="font-medium">{record.name}</span>,
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
    render: () => <span className="font-medium">Admin</span>,
  });

  if (role === "admin") {
    columns.push({
      title: "Edit",
      key: "edit",
      align: "center",
      render: (_, record) => (
        <Link href={`/layanan/kontak/${record.id}`} legacyBehavior>
          <a>
            <Button type="primary" size="small">
              Edit
            </Button>
          </a>
        </Link>
      ),
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header hideBanner />

      <main className="flex-1 p-6 sm:p-12">
        <h2 className="text-3xl font-bold text-center mb-6">Daftar Kontak</h2>

        <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
          <Search
            placeholder="Cari nama, email, atau kontak..."
            allowClear
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrent(1);
            }}
            style={{ minWidth: 260, flex: "1 1 40%" }}
          />

          {role === "admin" && (
            <Link href="/layanan/kontak/add" legacyBehavior>
              <a>
                <Button type="primary">Tambah Kontak Baru</Button>
              </a>
            </Link>
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
        />
      </main>

      <Footer />
    </div>
  );
}
