"use client";

import { useState, useEffect, useMemo, JSX } from "react";
import { Table, Input, Select, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Jenazah } from "@/lib/types";

const { Search } = Input;
const { Option } = Select;

export default function JenazahTable(): JSX.Element {
  const [data, setData] = useState<Jenazah[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [pageSize, setPageSize] = useState<number>(12);
  const [current, setCurrent] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<string>("Semua");

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

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((item) => {
      const name = item.user?.name?.toLowerCase() || "";
      const block = item.blok?.id?.toLowerCase() || "";
      const matchesSearch = name.includes(q) || block.includes(q);
      const matchesLocation =
        selectedLocation === "Semua" || item.blok?.lokasi === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [data, search, selectedLocation]);

  const total = filtered.length;
  const sliceStart = (current - 1) * pageSize;
  const visibleData = filtered.slice(sliceStart, sliceStart + pageSize);

  const columns: ColumnsType<Jenazah> = [];

  columns.push({
    title: "Blok",
    dataIndex: "blok",
    key: "blok",
    align: "center",
    sorter: (a, b) => (a.blok?.id || "").localeCompare(b.blok?.id || ""),
    render: (_, record) => record.blok?.id || "",
  });

  columns.push({
    title: "Status Blok",
    dataIndex: "blok",
    key: "status_blok",
    align: "center",
    sorter: (a, b) => (a.blok?.statusBlok || "").localeCompare(b.blok?.statusBlok || ""),
    render: (_, record) => record.blok?.statusBlok || "",
  });

  columns.push({
    title: "Nama Jenazah",
    dataIndex: "status_jenazah",
    key: "status_jenazah",
    align: "center",
    sorter: (a, b) => (a.statusJenazah || "").localeCompare(b.statusJenazah || ""),
    render: (_, record) => record.statusJenazah || "",
  });

  columns.push({
    title: "Tanggal Pemakaman",
    dataIndex: "tanggal_pemakaman",
    key: "tanggal_pemakaman",
    align: "center",
    sorter: (a, b) => {
      const ta = recordToDate(a.tanggalPemakaman);
      const tb = recordToDate(b.tanggalPemakaman);
      return ta - tb;
    },
    render: (_, record) =>
      record.tanggalPemakaman ? new Date(record.tanggalPemakaman).toLocaleDateString("id-ID") : "-",
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
      (a.masaAktif ? new Date(a.masaAktif).getTime() : 0) -
      (b.masaAktif ? new Date(b.masaAktif).getTime() : 0),
    render: (_, record) =>
      record.masaAktif ? new Date(record.masaAktif).toLocaleDateString() : "-",
  });

  columns.push({
    title: "Pembayaran Pesanan",
    dataIndex: "status_pembayaran_pesanan",
    key: "status_pembayaran_pesanan",
    align: "center",
    sorter: (a, b) =>
      (a.statusPembayaranPesanan || "").localeCompare(b.statusPembayaranPesanan || ""),
    render: (_, record) => {
      const val = record.statusPembayaranPesanan ?? "";
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
      (a.statusPembayaranIuranTahunan || "").localeCompare(b.statusPembayaranIuranTahunan || ""),
    render: (_, record) => {
      const val = record.statusPembayaranIuranTahunan ?? "";
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

      <Table<Jenazah>
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
