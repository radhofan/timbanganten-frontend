"use client";

import { useState, useEffect, useMemo, JSX } from "react";
import { Table, Input, Select, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { User, Blok, Jenazah } from "@prisma/client";

const { Search } = Input;
const { Option } = Select;

interface JenazahRow extends Jenazah {
  user: User | null;
  blok: Blok | null;
}

export default function JenazahTable(): JSX.Element {
  const [data, setData] = useState<JenazahRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(12);
  const [current, setCurrent] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<string>("Semua");

  useEffect(() => {
    let mounted = true;
    fetch("/api/jenazah")
      .then((r) => r.json())
      .then((res: JenazahRow[]) => {
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
      const name = item.user?.name?.toLowerCase() || "";
      const block = item.blok?.id_blok?.toLowerCase() || "";
      const matchesSearch = name.includes(q) || block.includes(q);
      const matchesLocation =
        selectedLocation === "Semua" || item.blok?.lokasi === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [data, search, selectedLocation]);

  const total = filtered.length;
  const sliceStart = (current - 1) * pageSize;
  const visibleData = filtered.slice(sliceStart, sliceStart + pageSize);

  const columns: ColumnsType<JenazahRow> = [];

  columns.push({
    title: "Blok",
    dataIndex: "blok",
    key: "blok",
    align: "center",
    sorter: (a, b) => (a.blok?.id_blok || "").localeCompare(b.blok?.id_blok || ""),
    render: (_, record) => record.blok?.id_blok || "",
  });

  columns.push({
    title: "Status Blok",
    dataIndex: "blok",
    key: "status_blok",
    align: "center",
    sorter: (a, b) => (a.blok?.status_blok || "").localeCompare(b.blok?.status_blok || ""),
    render: (_, record) => record.blok?.status_blok || "",
  });

  columns.push({
    title: "Nama Jenazah",
    dataIndex: "status_jenazah",
    key: "status_jenazah",
    align: "center",
    sorter: (a, b) => (a.status_jenazah || "").localeCompare(b.status_jenazah || ""),
    render: (_, record) => record.status_jenazah || "",
  });

  columns.push({
    title: "Tanggal Pemakaman",
    dataIndex: "tanggal_pemakaman",
    key: "tanggal_pemakaman",
    align: "center",
    sorter: (a, b) => {
      const ta = recordToDate(a.tanggal_pemakaman);
      const tb = recordToDate(b.tanggal_pemakaman);
      return ta - tb;
    },
    render: (_, record) =>
      record.tanggal_pemakaman
        ? new Date(record.tanggal_pemakaman).toLocaleDateString("id-ID")
        : "-",
  });

  columns.push({
    title: "Penanggung Jawab",
    dataIndex: "user",
    key: "user",
    align: "center",
    sorter: (a, b) => (a.user?.name || "").localeCompare(b.user?.name || ""),
    render: (_, record) => record.user?.name || "",
  });

  columns.push({
    title: "Masa Aktif",
    dataIndex: "masa_aktif",
    key: "masa_aktif",
    align: "center",
    sorter: (a, b) =>
      (a.masa_aktif ? new Date(a.masa_aktif).getTime() : 0) -
      (b.masa_aktif ? new Date(b.masa_aktif).getTime() : 0),
    render: (_, record) =>
      record.masa_aktif ? new Date(record.masa_aktif).toLocaleDateString() : "-",
  });

  columns.push({
    title: "Pembayaran Pesanan",
    dataIndex: "status_pembayaran_pesanan",
    key: "status_pembayaran_pesanan",
    align: "center",
    sorter: (a, b) =>
      (a.status_pembayaran_pesanan || "").localeCompare(b.status_pembayaran_pesanan || ""),
    render: (_, record) => {
      const val = record.status_pembayaran_pesanan ?? "";
      const color =
        val === "PAID"
          ? "green"
          : val === "UNPAID"
            ? "red"
            : ["PENDING", "VERIFICATION", "RESOLVING"].includes(val)
              ? "gold"
              : "default";

      return <Tag color={color}>{val || "-"}</Tag>;
    },
  });

  columns.push({
    title: "Pembayaran Iuran",
    dataIndex: "status_pembayaran_iuran_tahunan",
    key: "status_pembayaran_iuran_tahunan",
    align: "center",
    sorter: (a, b) =>
      (a.status_pembayaran_iuran_tahunan || "").localeCompare(
        b.status_pembayaran_iuran_tahunan || ""
      ),
    render: (_, record) => {
      const val = record.status_pembayaran_iuran_tahunan ?? "";
      const color =
        val === "PAID"
          ? "green"
          : val === "UNPAID"
            ? "red"
            : ["PENDING", "VERIFICATION", "RESOLVING"].includes(val)
              ? "gold"
              : "default";

      return <Tag color={color}>{val || "-"}</Tag>;
    },
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Daftar Jenazah</h2>

      <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
        <Search
          placeholder="Cari nama atau blok"
          allowClear
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrent(1);
          }}
          value={search}
          style={{ minWidth: 240, flex: "1 1 40%" }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span>Lokasi</span>
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
            <Option value="Dayeuh Kolot">Dayeuh Kolot</Option>
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

      <Table<JenazahRow>
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
        rowKey="id_jenazah"
        bordered
      />
    </div>
  );
}

function recordToDate(d: string | Date | null): number {
  if (!d) return 0;
  return new Date(d).getTime();
}
