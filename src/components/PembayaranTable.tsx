"use client";

import { useState, useEffect, useMemo, JSX } from "react";
import { Table, Input, Select, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Modal, Button, Descriptions, message } from "antd";

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

  const [pesananModalOpen, setPesananModalOpen] = useState(false);
  const [selectedPesanan, setSelectedPesanan] = useState<Jenazah | null>(null);

  const [iuranModalOpen, setIuranModalOpen] = useState(false);
  const [selectedIuran, setSelectedIuran] = useState<Jenazah | null>(null);

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

  function openPesananModal(record: Jenazah) {
    setSelectedPesanan(record);
    setPesananModalOpen(true);
  }

  function openIuranModal(record: Jenazah) {
    setSelectedIuran(record);
    setIuranModalOpen(true);
  }

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
    key: "pj",
    align: "center",
    sorter: (a, b) => {
      const allA = [...(a.makam?.pj || []), ...(a.makamStatus?.pj || [])];
      const allB = [...(b.makam?.pj || []), ...(b.makamStatus?.pj || [])];

      const nameA = allA.map((p) => p.user?.name || "").join(", ");
      const nameB = allB.map((p) => p.user?.name || "").join(", ");
      return nameA.localeCompare(nameB);
    },
    render: (_, record) => {
      const allPJs = [...(record.makam?.pj || []), ...(record.makamStatus?.pj || [])];

      return allPJs.length > 0
        ? allPJs.map((p, i) => (
            <span key={p.id}>
              {p.user?.name || "-"}
              {i < allPJs.length - 1 ? ", " : ""}
            </span>
          ))
        : "-";
    },
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

      const clickable = val !== "PAID";

      return (
        <Tag
          color={color}
          style={{ cursor: clickable ? "pointer" : "default" }}
          onClick={() => {
            if (clickable) openPesananModal(record);
          }}
        >
          {val || "-"}
        </Tag>
      );
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

      const clickable = val !== "PAID";

      return (
        <Tag
          color={color}
          style={{ cursor: clickable ? "pointer" : "default" }}
          onClick={() => {
            if (clickable) openIuranModal(record);
          }}
        >
          {val || "-"}
        </Tag>
      );
    },
  });

  return (
    <div className="p-6 bg-white">
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
        rowKey="id"
        bordered
      />

      <Modal
        open={pesananModalOpen}
        title="Pembayaran Pesanan"
        onCancel={() => {
          setPesananModalOpen(false);
          setSelectedPesanan(null);
        }}
        footer={[
          <Button key="cancel" onClick={() => setPesananModalOpen(false)}>
            Batal
          </Button>,
          <Button
            key="paid"
            type="primary"
            onClick={async () => {
              if (!selectedPesanan) return;

              await fetch("/api/bayarPesanan", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: selectedPesanan.id,
                  tanggal_pemesanan: selectedPesanan.tanggalPemakaman,
                }),
              });

              message.success("Status pesanan diperbarui");

              setData((prev) =>
                prev.map((j) =>
                  j.id === selectedPesanan.id ? { ...j, statusPembayaranPesanan: "PAID" } : j
                )
              );

              setPesananModalOpen(false);
            }}
          >
            Tandai LUNAS
          </Button>,
        ]}
      >
        {selectedPesanan && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Blok">{selectedPesanan.blok?.id}</Descriptions.Item>

            <Descriptions.Item label="Nama Jenazah">
              {selectedPesanan.user?.name || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Status Saat Ini">
              {selectedPesanan.statusPembayaranPesanan}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
      <Modal
        open={iuranModalOpen}
        title="Pembayaran Iuran Tahunan"
        onCancel={() => {
          setIuranModalOpen(false);
          setSelectedIuran(null);
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIuranModalOpen(false);
              setSelectedIuran(null);
            }}
          >
            Batal
          </Button>,
          <Button
            key="paid"
            type="primary"
            onClick={async () => {
              if (!selectedIuran) return;

              await fetch("/api/bayarIuranTahunan", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: selectedIuran.id,
                }),
              });

              message.success("Iuran tahunan berhasil diperbarui");

              setData((prev) =>
                prev.map((j) =>
                  j.id === selectedIuran.id ? { ...j, statusPembayaranIuranTahunan: "PAID" } : j
                )
              );

              setIuranModalOpen(false);
              setSelectedIuran(null);
            }}
          >
            Tandai LUNAS
          </Button>,
        ]}
      >
        {selectedIuran && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Blok">{selectedIuran.blok?.id}</Descriptions.Item>

            <Descriptions.Item label="Nama Jenazah">
              {selectedIuran.user?.name || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Masa Aktif Saat Ini">
              {selectedIuran.masaAktif
                ? new Date(selectedIuran.masaAktif).toLocaleDateString("id-ID")
                : "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Status Saat Ini">
              {selectedIuran.statusPembayaranIuranTahunan}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}

function recordToDate(d: string | Date | null): number {
  if (!d) return 0;
  return new Date(d).getTime();
}
