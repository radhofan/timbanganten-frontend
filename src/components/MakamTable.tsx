"use client";

import { useState, useEffect, useMemo, JSX } from "react";
import { Table, Input, Select, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { Makam } from "@/lib/types";

const { Option } = Select;

export default function MakamTable(): JSX.Element {
  const [data, setData] = useState<Makam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(12);
  const [current, setCurrent] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<string>("Semua");

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
    return data.filter((item) => {
      const matchesSearch =
        item.jenazah?.user?.name?.toLowerCase().includes(q) ||
        item.pj.some((pj) => pj.user?.name?.toLowerCase().includes(q));
      const matchesLocation =
        selectedLocation === "Semua" || item.blok?.lokasi === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [data, search, selectedLocation]);

  const total = filtered.length;
  const sliceStart = (current - 1) * pageSize;
  const visibleData = filtered.slice(sliceStart, sliceStart + pageSize);

  const columns: ColumnsType<Makam> = [];

  columns.push({
    title: "Blok Makam",
    dataIndex: "blok",
    key: "blok",
    align: "center",
    sorter: (a, b) =>
      (a.blok?.id ?? "").localeCompare(b.blok?.id ?? "", undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    defaultSortOrder: "ascend",
    sortDirections: ["ascend", "descend"],
    render: (_, record) => <span>{record.blok?.id}</span>,
  });

  columns.push({
    title: "Status Blok",
    dataIndex: "blok",
    key: "status_blok",
    align: "center",
    sorter: (a, b) => {
      const sa = a.blok?.statusBlok || "";
      const sb = b.blok?.statusBlok || "";
      return sa.localeCompare(sb);
    },
    render: (_, record) => {
      const status = record.blok?.statusBlok || "";
      return <span style={{ fontWeight: 600 }}>{status}</span>;
    },
  });

  columns.push({
    title: "Nama Jenazah",
    dataIndex: "nama",
    key: "nama",
    align: "center",
    sorter: (a, b) => (a.jenazah?.user?.name || "").localeCompare(b.jenazah?.user?.name || ""),
    render: (_, record) => (
      <span style={{ fontWeight: 600 }}>{record.jenazah?.user?.name || "-"}</span>
    ),
  });

  columns.push({
    title: "Status Jenazah",
    dataIndex: "status_jenazah",
    key: "status_jenazah",
    align: "center",
    sorter: (a, b) =>
      (a.jenazah?.statusJenazah ?? "").localeCompare(b.jenazah?.statusJenazah ?? ""),
    render: (_, record) => (
      <span style={{ fontWeight: 600 }}>{record.jenazah?.statusJenazah}</span>
    ),
  });

  columns.push({
    title: "Lokasi",
    dataIndex: "lokasi",
    key: "lokasi",
    align: "center",
    sorter: (a, b) => (a.blok?.lokasi || "").localeCompare(b.blok?.lokasi || ""),
    render: (_, record) => <span>{record.blok?.lokasi || "-"}</span>,
  });

  columns.push({
    title: "Nama PJ",
    key: "namaPJ",
    align: "center",
    sorter: (a, b) => {
      const nameA = a.pj.map((pj) => pj.user?.name || "").join(", ");
      const nameB = b.pj.map((pj) => pj.user?.name || "").join(", ");
      return nameA.localeCompare(nameB);
    },
    render: (_, record) => (
      <span>
        {record.pj.length > 0
          ? record.pj.map((pj, index) => (
              <span key={pj.id}>
                {pj.user?.name || "-"}
                {index < record.pj.length - 1 ? ", " : ""}
              </span>
            ))
          : "-"}
      </span>
    ),
  });

  if (!isGuest) {
    columns.push({
      title: "No. Kontak PJ",
      key: "kontakPJ",
      align: "center",
      sorter: (a, b) => {
        const aContacts = a.pj.map((pj) => pj.user?.contact || "").join(", ");
        const bContacts = b.pj.map((pj) => pj.user?.contact || "").join(", ");
        return aContacts.localeCompare(bContacts);
      },
      render: (_, record) => {
        if (!record.pj || record.pj.length === 0) return "-";
        return record.pj.map((pj, index) => {
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
        });
      },
    });

    columns.push({
      title: "Penjelasan",
      key: "penjelasan",
      align: "center",
      render: (_, record: Makam) => {
        if (!record.pj || record.pj.length === 0) return "-";
        return record.pj.map((pj, index) => {
          const userId = pj.user?.id;
          const userName = pj.user?.name || "-";
          if (!userId) return null;
          return (
            <span key={pj.id} className="mr-2">
              <span
                style={{ cursor: "pointer", color: "#1d70b8", textDecoration: "underline" }}
                onClick={() => router.push(`/layanan/histori/user/${userId}`)}
              >
                {userName}
              </span>
              {index < record.pj.length - 1 ? ", " : ""}
            </span>
          );
        });
      },
    });

    columns.push({
      title: "Ubah",
      key: "edit",
      align: "center",
      render: (_, record) => (
        <Link href={`/layanan/makam/${record.id}`} legacyBehavior>
          <a>
            <Button type="primary" size="small">
              Ubah
            </Button>
          </a>
        </Link>
      ),
    });
  }

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
      <div 
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
          alignItems: "center",
          padding: "10px 12px",
          background: "#f3f2f1",
          border: "2px solid #0b0c0c",
          borderBottom: "none"
        }}
      >
        <Input
          placeholder="Cari nama, blok, atau penanggung jawab..."
          allowClear
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrent(1);
          }}
          value={search}
          style={{ width: "clamp(180px, 30vw, 300px)" }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8125rem", color: "#505a5f", fontWeight: 600 }}>
          Lokasi:
        </div>
        <Select
          value={selectedLocation}
          onChange={(val) => {
            setSelectedLocation(val);
            setCurrent(1);
          }}
          style={{ width: "clamp(120px, 15vw, 160px)" }}
        >
          <Option value="Semua">Semua</Option>
          <Option value="Karang Anyar">Karang Anyar</Option>
          <Option value="Dalem Kaum">Dalem Kaum</Option>
          <Option value="Dayeuhkolot">Dayeuhkolot</Option>
        </Select>

        <Select
          value={pageSize}
          onChange={(val) => {
            setPageSize(val);
            setCurrent(1);
          }}
          style={{ width: 100 }}
        >
          <Option value={5}>5 baris</Option>
          <Option value={10}>10 baris</Option>
          <Option value={12}>12 baris</Option>
          <Option value={20}>20 baris</Option>
        </Select>
      </div>

      <Table<Makam>
        columns={columns}
        dataSource={visibleData}
        loading={loading}
        pagination={{
          current,
          pageSize,
          total,
          showSizeChanger: false,
          onChange: (page, size) => {
            setCurrent(page);
            if (pageSize !== size) setPageSize(size);
          },
        }}
        rowKey="id"
        scroll={{ x: "max-content" }}
        size="small"
        className="no-gap-table"
      />
    </div>
  );
}
