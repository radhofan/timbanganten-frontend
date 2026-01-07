"use client";

import { useState, useEffect, useMemo, JSX } from "react";
import { Table, Input, Select, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { useRouter } from "next/navigation";
import { Makam } from "@/lib/types";

const { Search } = Input;
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
        console.log("API returned", res);
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
        item.nama?.toLowerCase().includes(q) || item.namaPenanggungJawab?.toLowerCase().includes(q);
      const matchesLocation = selectedLocation === "Semua" || item.lokasi === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [data, search, selectedLocation]);

  const total = filtered.length;

  const sliceStart = (current - 1) * pageSize;
  const visibleData = filtered.slice(sliceStart, sliceStart + pageSize);

  const columns: ColumnsType<Makam> = [];

  // <-- REPLACED: Blok Makam sorter uses numeric-aware localeCompare -->
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
    render: (value, record) => <span>{record.blok?.id}</span>,
  });

  columns.push({
    title: "Status Blok",
    dataIndex: "blok",
    key: "blok",
    align: "center",
    sorter: (a, b) => {
      const sa = a.blok?.statusBlok || "";
      const sb = b.blok?.statusBlok || "";
      return sa.localeCompare(sb);
    },
    render: (_, record) => {
      const status = record.blok?.statusBlok || "";
      return <span className="font-medium">{status}</span>;
    },
  });

  columns.push({
    title: "Nama Jenazah",
    dataIndex: "nama",
    key: "nama",
    align: "center",
    sorter: (a, b) => (a.nama || "").localeCompare(b.nama || ""),
    render: (value, record) => <span className="font-medium">{record.nama || "-"}</span>,
  });

  columns.push({
    title: "Status Jenazah",
    dataIndex: "status_jenazah",
    key: "status_jenazah",
    align: "center",
    sorter: (a, b) =>
      (a.jenazah?.statusJenazah ?? "").localeCompare(b.jenazah?.statusJenazah ?? ""),
    render: (value, record) => <span className="font-medium">{record.jenazah?.statusJenazah}</span>,
  });

  columns.push({
    title: "Lokasi",
    dataIndex: "lokasi",
    key: "lokasi",
    align: "center",
    sorter: (a, b) => (a.lokasi || "").localeCompare(b.lokasi || ""),
    render: (value, record) => <span>{record.lokasi || "-"}</span>,
  });
  columns.push({
    title: "Nama PJ",
    dataIndex: "namaPenanggungJawab",
    key: "namaPenanggungJawab",
    align: "center",
    sorter: (a, b) => (a.namaPenanggungJawab || "").localeCompare(b.namaPenanggungJawab || ""),
    render: (value, record) => <span>{record.namaPenanggungJawab || "-"}</span>,
  });

  columns.push({
    title: "Hubungan",
    dataIndex: "silsilah",
    key: "silsilah",
    align: "center",
    sorter: (a, b) => (a.silsilah || "").localeCompare(b.silsilah || ""),
    render: (value, record) => <span>{record.silsilah || "-"}</span>,
  });

  if (!isGuest) {
    columns.push({
      title: "No. Kontak PJ",
      dataIndex: "kontakPenanggungJawab",
      key: "kontakPenanggungJawab",
      align: "center",
      sorter: (a, b) => {
        const aa = a.kontakPenanggungJawab ?? "";
        const bb = b.kontakPenanggungJawab ?? "";
        return aa.localeCompare(bb);
      },
      render: (_, record) => {
        const num = record.kontakPenanggungJawab;
        if (!num) return "-";
        return (
          <a
            href={`https://wa.me/${num}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            {num}
          </a>
        );
      },
    });

    columns.push({
      title: "Penjelasan",
      key: "penjelasan",
      align: "center",
      render: (_, record: Makam) => {
        const userId = record.userId;

        return (
          <span
            className="cursor-pointer text-blue-600 underline"
            onClick={() => router.push(`/layanan/histori/user/${userId}`)}
          >
            Lihat Detail
          </span>
        );
      },
    });

    columns.push({
      title: "Edit",
      key: "edit",
      align: "center",
      render: (value, record) => (
        <Link href={`/layanan/makam/${record.id}`} legacyBehavior>
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
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Daftar Pemakaman</h2>

      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <Search
          placeholder="Cari nama, blok, atau penanggung jawab..."
          allowClear
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrent(1);
          }}
          value={search}
          style={{ minWidth: 240, flex: "1 1 40%" }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>Tempat Makam:</span>
          <Select
            value={selectedLocation}
            onChange={(val) => {
              setSelectedLocation(val);
              setCurrent(1);
            }}
            style={{ width: 200 }}
          >
            <Option value="Semua">Semua</Option>
            <Option value="Karang Anyar">Karang Anyar</Option>
            <Option value="Dalem Kaum">Dalem Kaum</Option>
            <Option value="Dayeuhkolot">Dayeuhkolot</Option>
          </Select>
        </div>

        <Select
          value={pageSize}
          onChange={(val) => {
            setPageSize(val);
            setCurrent(1);
          }}
          style={{ width: 120 }}
        >
          <Option value={5}>Show 5</Option>
          <Option value={10}>Show 10</Option>
          <Option value={12}>Show 12</Option>
          <Option value={20}>Show 20</Option>
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
        bordered
      />
    </div>
  );
}
