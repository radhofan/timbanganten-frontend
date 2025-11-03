"use client";

import { useState, useEffect, useMemo, JSX } from "react";
import { Table, Input, Select, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";

const { Search } = Input;
const { Option } = Select;

export interface Makam {
  id: number;
  blok: string;
  nama: string;
  lokasi: string;
  silsilah: string;
  ext?: string | null;
  masa_aktif?: string | null;
  nama_penanggung_jawab: string;
  kontak_penanggung_jawab?: string | null;
  description?: string | null;
  payment?: string | null;
  approved?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  userId?: number | null;
}

export default function MakamTable(): JSX.Element {
  const [data, setData] = useState<Makam[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(12);
  const [current, setCurrent] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<string>("Semua");

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
        item.nama.toLowerCase().includes(q) ||
        item.nama_penanggung_jawab.toLowerCase().includes(q) ||
        item.blok.toLowerCase().includes(q);
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
      a.blok.localeCompare(b.blok, undefined, { numeric: true, sensitivity: "base" }),
    defaultSortOrder: "ascend",
    sortDirections: ["ascend", "descend"],
    render: (value, record) => <span>{record.blok}</span>,
  });

  columns.push({
    title: "Nama Jenazah",
    dataIndex: "nama",
    key: "nama",
    align: "center",
    sorter: (a, b) => a.nama.localeCompare(b.nama),
    render: (value, record) => <span className="font-medium">{record.nama}</span>,
  });

  columns.push({
    title: "Lokasi",
    dataIndex: "lokasi",
    key: "lokasi",
    align: "center",
    sorter: (a, b) => a.lokasi.localeCompare(b.lokasi),
    render: (value, record) => <span>{record.lokasi}</span>,
  });

  columns.push({
    title: "Nama PJ",
    dataIndex: "nama_penanggung_jawab",
    key: "nama_penanggung_jawab",
    align: "center",
    sorter: (a, b) => a.nama_penanggung_jawab.localeCompare(b.nama_penanggung_jawab),
    render: (value, record) => <span>{record.nama_penanggung_jawab}</span>,
  });

  columns.push({
    title: "Hubungan",
    dataIndex: "silsilah",
    key: "silsilah",
    align: "center",
    sorter: (a, b) => a.silsilah.localeCompare(b.silsilah),
    render: (value, record) => <span>{record.silsilah}</span>,
  });

  if (!isGuest) {
    columns.push({
      title: "No. Kontak PJ",
      dataIndex: "kontak_penanggung_jawab",
      key: "kontak_penanggung_jawab",
      align: "center",
      sorter: (a, b) => {
        const aa = a.kontak_penanggung_jawab ?? "";
        const bb = b.kontak_penanggung_jawab ?? "";
        return aa.localeCompare(bb);
      },
      render: (value, record) => <span>{record.kontak_penanggung_jawab ?? "-"}</span>,
    });

    columns.push({
      title: "Perpanjangan",
      dataIndex: "ext",
      key: "ext",
      align: "center",
      sorter: (a, b) => (a.ext ?? "").localeCompare(b.ext ?? ""),
      render: (value, record) => {
        const ext = record.ext ?? "";
        const color =
          ext === "PAID"
            ? "green"
            : ext === "LEWAT BATAS"
              ? "red"
              : ext === "BELUM AKTIF"
                ? "default"
                : ["PENDING", "VERIFICATION", "RESOLVING"].includes(ext)
                  ? "gold"
                  : "default";
        return <Tag color={color === "default" ? undefined : color}>{ext || "-"}</Tag>;
      },
    });

    columns.push({
      title: "Masa Aktif",
      dataIndex: "masa_aktif",
      key: "masa_aktif",
      align: "center",
      sorter: (a, b) => {
        const ta = a.masa_aktif ? new Date(a.masa_aktif).getTime() : 0;
        const tb = b.masa_aktif ? new Date(b.masa_aktif).getTime() : 0;
        return ta - tb;
      },
      render: (value, record) =>
        record.masa_aktif ? (
          <Tag color={new Date(record.masa_aktif) >= new Date() ? "green" : "red"}>
            {new Date(record.masa_aktif).toLocaleDateString("id-ID")}
          </Tag>
        ) : (
          <span>-</span>
        ),
    });

    columns.push({
      title: "Penjelasan",
      dataIndex: "description",
      key: "description",
      align: "center",
      sorter: (a, b) => (a.description ?? "").localeCompare(b.description ?? ""),
      render: (value, record) =>
        record.description && record.description.trim() !== "" ? (
          <details>
            <summary className="cursor-pointer text-blue-600 underline">Lihat Detail</summary>
            <div>{record.description}</div>
          </details>
        ) : (
          <span style={{ color: "#999" }}>Tidak ada penjelasan</span>
        ),
    });

    columns.push({
      title: "Edit",
      key: "edit",
      align: "center",
      render: (value, record) => (
        <Link href={`/admin/layanan/makam/${record.id}`} legacyBehavior>
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
