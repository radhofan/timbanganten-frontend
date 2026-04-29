"use client";

import { useState, useEffect, useMemo, JSX } from "react";
import { Table, Input, Select } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Modal, Button, Descriptions, message } from "antd";

import { Jenazah } from "@/lib/types";
import { StatusLabel } from "./StatusLabel";

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
      record.tanggalPemakaman
        ? new Date(record.tanggalPemakaman).toLocaleDateString("id-ID")
        : "-",
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
    title: "Bayar Pesanan",
    dataIndex: "status_pembayaran_pesanan",
    key: "status_pembayaran_pesanan",
    align: "center",
    sorter: (a, b) =>
      (a.statusPembayaranPesanan || "").localeCompare(b.statusPembayaranPesanan || ""),
    render: (_, record) => {
      const val = record.statusPembayaranPesanan ?? "";
      const clickable = val !== "PAID";
      return (
        <div
          style={{ display: "inline-block", cursor: clickable ? "pointer" : "default" }}
          onClick={() => {
            if (clickable) openPesananModal(record);
          }}
        >
          <div style={{ pointerEvents: "none" }}>
            <StatusLabel
              label=""
              id={`status-${record.id}`}
              value={val || "-"}
              readOnly
              size="small"
            />
          </div>
        </div>
      );
    },
  });

  columns.push({
    title: "Bayar Iuran",
    dataIndex: "status_pembayaran_iuran_tahunan",
    key: "status_pembayaran_iuran_tahunan",
    align: "center",
    sorter: (a, b) =>
      (a.statusPembayaranIuranTahunan || "").localeCompare(b.statusPembayaranIuranTahunan || ""),
    render: (_, record) => {
      const val = record.statusPembayaranIuranTahunan ?? "";
      const clickable = val !== "PAID";
      return (
        <div
          style={{ display: "inline-block", cursor: clickable ? "pointer" : "default" }}
          onClick={() => {
            if (clickable) openIuranModal(record);
          }}
        >
          <div style={{ pointerEvents: "none" }}>
            <StatusLabel
              label=""
              id={`status-iuran-${record.id}`}
              value={val || "-"}
              readOnly
              size="small"
            />
          </div>
        </div>
      );
    },
  });

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
          Daftar Jenazah &amp; Pembayaran
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
          padding: "8px 10px",
          background: "#f3f2f1",
          border: "1px solid #505a5f",
          marginBottom: 0,
        }}
      >
        <Input
          placeholder="Cari nama atau blok..."
          allowClear
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrent(1);
          }}
          value={search}
          style={{ width: "clamp(180px, 30vw, 300px)" }}
        />

        <span style={{ fontSize: "0.8125rem", color: "#505a5f", fontWeight: 600 }}>Lokasi:</span>
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
          <Option value="Dayeuh Kolot">Dayeuh Kolot</Option>
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
          Menampilkan {visibleData.length} dari {total} jenazah
          {filtered.length !== data.length && ` (difilter dari ${data.length} total)`}
        </div>
      )}

      <Table<Jenazah>
        columns={columns}
        dataSource={visibleData}
        loading={loading}
        pagination={false}
        rowKey="id"
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

      {/* Pesanan Modal */}
      <Modal
        open={pesananModalOpen}
        title="Konfirmasi Pembayaran Pesanan"
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

      {/* Iuran Modal */}
      <Modal
        open={iuranModalOpen}
        title="Konfirmasi Pembayaran Iuran Tahunan"
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
                body: JSON.stringify({ id: selectedIuran.id }),
              });
              message.success("Iuran tahunan berhasil diperbarui");
              setData((prev) =>
                prev.map((j) =>
                  j.id === selectedIuran.id
                    ? { ...j, statusPembayaranIuranTahunan: "PAID" }
                    : j
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
