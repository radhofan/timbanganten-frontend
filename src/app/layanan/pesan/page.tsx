"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button, DatePicker } from "antd";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { User } from "@prisma/client";
import {
  pemesananDefaultValues,
  PemesananPayload,
  pemesananSchema,
  Silsilah,
} from "@/validation/pemesanan";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const fieldStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: 700,
  color: "#0b0c0c",
};

const inputOverride: React.CSSProperties = {
  border: "2px solid #0b0c0c",
  borderRadius: 0,
  padding: "6px 10px",
  fontSize: "1rem",
  boxShadow: "none",
};

const errorStyle: React.CSSProperties = {
  color: "#d4351c",
  fontSize: "0.875rem",
  fontWeight: 700,
  padding: "3px 8px",
  borderLeft: "4px solid #d4351c",
  background: "#fdf2f2",
};

export default function Pemesanan() {
  const [blokList, setBlokList] = useState<{ id: string; lokasi: string; statusBlok: string }[]>([]);
  const [lokasi, setLokasi] = useState<string>("");
  const [jenisMakam, setJenisMakam] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [useExisting, setUseExisting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [blokListFetched, setBlokListFetched] = useState(false);
  const [selectedBlok, setSelectedBlok] = useState<string>("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<PemesananPayload>({
    resolver: zodResolver(pemesananSchema),
    mode: "onChange",
    defaultValues: pemesananDefaultValues,
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!useExisting) return;
      const endpoint = searchTerm.trim()
        ? `/api/filterPenanggungJawab?query=${encodeURIComponent(searchTerm)}`
        : "/api/filterPenanggungJawab";
      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch(console.error);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, useExisting]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (lokasi) params.set("lokasi", lokasi);
    if (jenisMakam) params.set("jenismakam", jenisMakam);
    fetch(`/api/blok?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        setBlokList(data);
        setBlokListFetched(true);
      })
      .catch(console.error);
  }, [lokasi, jenisMakam]);

  const handleBlokSelect = (blokId: string) => {
    const selectedBlokData = blokList.find((b) => b.id === blokId);
    if (selectedBlokData) {
      setValue("blokId", blokId);
      setSelectedBlok(blokId);
      setValue("lokasi", selectedBlokData.lokasi);
      setLokasi(selectedBlokData.lokasi);
      const jenisFromStatus = selectedBlokData.statusBlok === "KOSONG" ? "baru" : "tumpuk";
      setJenisMakam(jenisFromStatus);
    }
  };

  const onSubmit = async (data: PemesananPayload) => {
    setLoading(true);
    const diriSendiri = data.silsilah === "Diri Sendiri";
    const basePayload = {
      namaJenazah: data.namaJenazah,
      blokId: selectedBlok,
      lokasi: data.lokasi,
      silsilah: data.silsilah,
      notes: data.notes,
      diriSendiri,
      tanggalPemakaman: data.tanggalPemakaman ? new Date(data.tanggalPemakaman) : undefined,
      tanggalPemesanan: data.tanggalPemesanan ? new Date(data.tanggalPemesanan) : undefined,
    };
    const userPayload =
      useExisting && selectedUser
        ? {
            existingUserId: selectedUser.id,
            pjName: selectedUser.name,
            pjContact: selectedUser.contact,
            emergencyName: selectedUser.emergencyName,
            emergencyContact: selectedUser.emergencyContact,
            userPAName: data.userPAName,
            userPAContact: data.userPAContact,
            userPAEmail: data.userPAEmail,
            userPAKTP: data.userPAKTP,
          }
        : {
            userPAName: data.userPAName,
            userPAContact: data.userPAContact,
            userPAEmail: data.userPAEmail,
            userPAKTP: data.userPAKTP,
            pjName: data.userPAName,
            pjContact: data.userPAContact,
            emergencyName: data.emergencyName,
            emergencyContact: data.emergencyContact,
          };
    const payload = {
      ...basePayload,
      ...userPayload,
      ...(!diriSendiri && {
        userPBName: data.namaJenazah,
        userPBContact: "",
        userPBEmail: "",
      }),
    };
    try {
      const res = await fetch("/api/pemesanan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success("Pemesanan berhasil disimpan!", { position: "top-center", duration: 1000 });
        setSelectedUser(null);
        setUseExisting(false);
        setTimeout(() => router.push("/layanan/pesan/status"), 1500);
      } else {
        const responseData = await res.json();
        if (responseData.errors) {
          const allMessages = Object.values(responseData.errors).join("\n");
          toast.error(allMessages, { position: "top-center", duration: 5000 });
        } else {
          toast.error(responseData?.error || "Terjadi kesalahan saat menyimpan data.", {
            position: "top-center",
            duration: 5000,
          });
        }
      }
    } catch (err) {
      console.error(err);
      toast.error("Gagal mengirim permintaan. Periksa koneksi internet.", {
        position: "top-center",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />

      <main style={{ flex: 1, padding: "clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 2vw, 2rem)" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            maxWidth: "clamp(480px, 60vw, 760px)",
            margin: "0 auto",
            background: "#fff",
            border: "1px solid #b1b4b6",
          }}
        >
          {/* Form header */}
          <div
            style={{
              background: "#0b0c0c",
              padding: "10px 16px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                }}
              >
                Form Pemesanan Makam
              </div>
              <div style={{ color: "#b1b4b6", fontSize: "0.75rem", marginTop: 2 }}>
                Lengkapi semua field yang diperlukan
              </div>
            </div>
          </div>

          <div style={{ padding: "clamp(14px, 2vw, 22px)" }}>
            {/* ── Penanggung Jawab ──────────────────────────────────────────── */}
            <div className="ent-section-heading">Penanggung Jawab</div>

            <div style={{ marginBottom: 14 }}>
              <RadioGroup
                defaultValue={useExisting ? "existing" : "new"}
                onValueChange={(val) => setUseExisting(val === "existing")}
                style={{ display: "flex", gap: 20 }}
              >
                {[
                  { value: "new", label: "Buat Baru" },
                  { value: "existing", label: "Gunakan Data Ada" },
                ].map((opt) => (
                  <div key={opt.value} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <RadioGroupItem value={opt.value} id={opt.value} />
                    <Label
                      htmlFor={opt.value}
                      style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0b0c0c", cursor: "pointer" }}
                    >
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {useExisting ? (
              <div style={{ marginBottom: 16 }}>
                <div style={fieldStyle}>
                  <label style={labelStyle}>Cari Penanggung Jawab</label>
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ketik nama atau kontak..."
                    style={inputOverride}
                  />
                </div>
                <div
                  style={{
                    border: "1px solid #505a5f",
                    background: "#fff",
                    maxHeight: 180,
                    overflowY: "auto",
                    marginTop: 4,
                  }}
                >
                  {users.length > 0 ? (
                    users.map((u) => (
                      <div
                        key={u.id}
                        onClick={() => {
                          setSelectedUser(u);
                          setSearchTerm(u.name || "");
                        }}
                        style={{
                          padding: "6px 12px",
                          fontSize: "0.875rem",
                          cursor: "pointer",
                          borderBottom: "1px solid #f3f2f1",
                          background: selectedUser?.id === u.id ? "#dce7f5" : "#fff",
                          color: selectedUser?.id === u.id ? "#1d70b8" : "#0b0c0c",
                          fontWeight: selectedUser?.id === u.id ? 700 : 400,
                        }}
                      >
                        {u.name} — {u.contact}
                      </div>
                    ))
                  ) : (
                    <div style={{ padding: "6px 12px", fontSize: "0.875rem", color: "#505a5f" }}>
                      Tidak ada hasil ditemukan
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(clamp(180px, 25vw, 240px), 1fr))",
                  gap: "10px 16px",
                  marginBottom: 16,
                }}
              >
                {[
                  { name: "userPAName" as const, label: "Nama Penanggung Jawab", placeholder: "Masukkan Nama PJ" },
                  { name: "userPAContact" as const, label: "No. Kontak", placeholder: "08XXXXXXXXX" },
                  { name: "userPAEmail" as const, label: "Email", placeholder: "user@gmail.com", type: "email" },
                  { name: "emergencyName" as const, label: "Nama Kontak Darurat", placeholder: "Masukkan Nama" },
                  { name: "emergencyContact" as const, label: "No. Kontak Darurat", placeholder: "08XXXXXXXXX" },
                ].map((f) => (
                  <div key={f.name} style={fieldStyle}>
                    <label style={labelStyle}>{f.label}</label>
                    <Controller
                      name={f.name}
                      control={control}
                      render={({ field }) => (
                        <Input {...field} placeholder={f.placeholder} type={f.type || "text"} style={inputOverride} />
                      )}
                    />
                    {errors[f.name] && (
                      <div style={errorStyle}>{errors[f.name]?.message}</div>
                    )}
                  </div>
                ))}

                <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
                  <label style={labelStyle}>No. KTP Pemesan</label>
                  <Controller
                    name="userPAKTP"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        maxLength={16}
                        placeholder="Masukkan 16 digit nomor KTP"
                        style={inputOverride}
                      />
                    )}
                  />
                  {errors.userPAKTP && <div style={errorStyle}>{errors.userPAKTP.message}</div>}
                </div>
              </div>
            )}

            {/* ── Data Pemesanan ────────────────────────────────────────────── */}
            <div className="ent-section-heading">Data Pemesanan</div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(clamp(180px, 25vw, 240px), 1fr))",
                gap: "10px 16px",
                marginBottom: 16,
              }}
            >
              {/* Nama Jenazah — full width */}
              <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Nama Jenazah</label>
                <Controller
                  name="namaJenazah"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Nama Jenazah" style={inputOverride} />
                  )}
                />
                {errors.namaJenazah && <div style={errorStyle}>{errors.namaJenazah.message}</div>}
              </div>

              {/* Blok Kavling */}
              <div style={fieldStyle}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <label style={labelStyle}>Blok Kavling</label>
                  <button
                    type="button"
                    onClick={() => {
                      setValue("blokId", "");
                      setSelectedBlok("");
                      const params = new URLSearchParams();
                      if (lokasi) params.set("lokasi", lokasi);
                      if (jenisMakam) params.set("jenismakam", jenisMakam);
                      fetch(`/api/blok?${params.toString()}`)
                        .then((res) => res.json())
                        .then((data) => setBlokList(data))
                        .catch(console.error);
                    }}
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 600,
                      color: "#505a5f",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0 4px",
                    }}
                  >
                    Reset
                  </button>
                </div>
                <Controller
                  name="blokId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        handleBlokSelect(value);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger style={{ ...inputOverride, height: "auto", padding: "6px 10px" }}>
                        <SelectValue placeholder="Pilih Blok" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {blokList.length > 0 ? (
                          blokList.map((b) => (
                            <SelectItem key={b.id} value={b.id}>
                              {b.id} ({b.lokasi}) ({b.statusBlok})
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value="no-blok-available" disabled>
                            {blokListFetched ? "Tidak ada blok tersedia" : "Memuat data blok..."}
                          </SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.blokId && <div style={errorStyle}>{errors.blokId.message}</div>}
              </div>

              {/* Lokasi */}
              <div style={fieldStyle}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <label style={labelStyle}>Lokasi Pemakaman</label>
                  <button
                    type="button"
                    onClick={() => { setValue("lokasi", ""); setLokasi(""); }}
                    style={{ fontSize: "0.75rem", fontWeight: 600, color: "#505a5f", background: "none", border: "none", cursor: "pointer", padding: "0 4px" }}
                  >
                    Reset
                  </button>
                </div>
                <Controller
                  name="lokasi"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={(value) => { field.onChange(value); setLokasi(value); }}
                      value={field.value}
                    >
                      <SelectTrigger style={{ ...inputOverride, height: "auto", padding: "6px 10px" }}>
                        <SelectValue placeholder="Pilih Lokasi" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Karang Anyar">Karang Anyar</SelectItem>
                        <SelectItem value="Dalem Kaum">Dalem Kaum</SelectItem>
                        <SelectItem value="Dayeuh Kolot">Dayeuh Kolot</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.lokasi && <div style={errorStyle}>{errors.lokasi.message}</div>}
              </div>

              {/* Silsilah */}
              <div style={fieldStyle}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <label style={labelStyle}>Hubungan dengan Pemesan</label>
                  <button
                    type="button"
                    onClick={() => setValue("silsilah", "" as Silsilah)}
                    style={{ fontSize: "0.75rem", fontWeight: 600, color: "#505a5f", background: "none", border: "none", cursor: "pointer", padding: "0 4px" }}
                  >
                    Reset
                  </button>
                </div>
                <Controller
                  name="silsilah"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger style={{ ...inputOverride, height: "auto", padding: "6px 10px" }}>
                        <SelectValue placeholder="Pilih Silsilah" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {["Diri Sendiri","Anak","Orang Tua","Kakak Adik","Sepupu","Keponakan","Paman Bibi","Kakek Nenek","Cucu","Lebih 2 Generasi di Atas","Lebih 2 Generasi di Bawah"].map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.silsilah && <div style={errorStyle}>{errors.silsilah.message}</div>}
              </div>

              {/* Jenis Makam */}
              <div style={fieldStyle}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <label style={labelStyle}>Jenis Makam</label>
                  <button
                    type="button"
                    onClick={() => setJenisMakam("")}
                    style={{ fontSize: "0.75rem", fontWeight: 600, color: "#505a5f", background: "none", border: "none", cursor: "pointer", padding: "0 4px" }}
                  >
                    Reset
                  </button>
                </div>
                <Select onValueChange={(value) => setJenisMakam(value)} value={jenisMakam}>
                  <SelectTrigger style={{ ...inputOverride, height: "auto", padding: "6px 10px" }}>
                    <SelectValue placeholder="Pilih Jenis Makam" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="baru">Baru</SelectItem>
                    <SelectItem value="tumpuk">Tumpuk</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Tanggal Pemesanan */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Tanggal Pemesanan</label>
                <Controller
                  name="tanggalPemesanan"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      id="tanggalPemesanan"
                      style={{ width: "100%", ...inputOverride }}
                      onChange={(_, dateString) => field.onChange(dateString)}
                    />
                  )}
                />
                {errors.tanggalPemesanan && (
                  <div style={errorStyle}>{errors.tanggalPemesanan.message}</div>
                )}
              </div>

              {/* Tanggal Pemakaman */}
              <div style={fieldStyle}>
                <label style={labelStyle}>Tanggal Pemakaman</label>
                <Controller
                  name="tanggalPemakaman"
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      id="tanggalPemakaman"
                      style={{ width: "100%", ...inputOverride }}
                      onChange={(_, dateString) => field.onChange(dateString)}
                    />
                  )}
                />
                {errors.tanggalPemakaman && (
                  <div style={errorStyle}>{errors.tanggalPemakaman.message}</div>
                )}
                <span style={{ fontSize: "0.8125rem", color: "#505a5f" }}>
                  *Diisi jika telah dimakamkan.
                </span>
              </div>

              {/* Notes — full width */}
              <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Penjelasan Tambahan</label>
                <Controller
                  name="notes"
                  control={control}
                  render={({ field }) => (
                    <Textarea
                      {...field}
                      rows={4}
                      placeholder="Tuliskan penjelasan tambahan terkait pemesanan..."
                      style={{ ...inputOverride, resize: "none" }}
                    />
                  )}
                />
                {errors.notes && <div style={errorStyle}>{errors.notes.message}</div>}
              </div>
            </div>

            {/* Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 10,
                paddingTop: 12,
                borderTop: "1px solid #b1b4b6",
              }}
            >
              <Button danger onClick={() => router.push("/")}>
                Batal
              </Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                Kirim Pemesanan
              </Button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
