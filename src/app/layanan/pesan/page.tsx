"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  GovukButton,
  GovukInput,
  GovukTextarea,
  GovukSelect,
  GovukRadios,
  GovukRadioItem,
  GovukDateInput,
  GovukFormGroup,
} from "@/components/govuk";
import { User } from "@prisma/client";
import {
  pemesananDefaultValues,
  PemesananPayload,
  pemesananSchema,
} from "@/validation/pemesanan";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

const errorStyle: React.CSSProperties = {
  color: "#d4351c",
  fontSize: "0.875rem",
  fontWeight: 700,
  padding: "3px 8px",
  borderLeft: "4px solid #d4351c",
  background: "#fdf2f2",
};

const STEPS = ["Penanggung Jawab", "Data Makam", "Konfirmasi"];

const SILSILAH_OPTIONS = [
  "Diri Sendiri",
  "Anak",
  "Orang Tua",
  "Kakak Adik",
  "Sepupu",
  "Keponakan",
  "Paman Bibi",
  "Kakek Nenek",
  "Cucu",
  "Lebih 2 Generasi di Atas",
  "Lebih 2 Generasi di Bawah",
];

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
  const [, setBlokListFetched] = useState(false);
  const [selectedBlok, setSelectedBlok] = useState<string>("");

  const [step, setStep] = useState(1);
  const [stepError, setStepError] = useState("");
  const [step2Attempted, setStep2Attempted] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
    clearErrors,
  } = useForm<PemesananPayload>({
    resolver: zodResolver(pemesananSchema),
    mode: "onTouched",
    defaultValues: pemesananDefaultValues,
  });

  const watchedValues = watch();

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

  const handleNextStep = async () => {
    setStepError("");

    if (step === 1) {
      if (useExisting && !selectedUser) {
        setStepError("Pilih penanggung jawab terlebih dahulu.");
        return;
      }
      if (useExisting && selectedUser) {
        setValue("existingUserId", selectedUser.id);
      }
      if (!useExisting) {
        setValue("existingUserId", undefined);
        const valid = await trigger(["userPAName", "userPAContact", "userPAEmail", "emergencyName", "emergencyContact", "userPAKTP"]);
        if (!valid) return;
      }
      clearErrors(["namaJenazah", "blokId", "lokasi", "silsilah", "tanggalPemesanan"]);
    }

    if (step === 2) {
      setStep2Attempted(true);
      const valid = await trigger(["namaJenazah", "blokId", "lokasi", "silsilah", "tanggalPemesanan"]);
      if (!valid) return;
      setStepError("");
    }

    setStep((s) => s + 1);
  };

  const handlePrevStep = () => {
    setStepError("");
    if (step === 2) {
      setStep2Attempted(false);
      clearErrors(["userPAName", "userPAContact", "userPAEmail", "emergencyName", "emergencyContact", "userPAKTP"]);
    }
    setStep((s) => s - 1);
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

  const selectedBlokData = blokList.find((b) => b.id === selectedBlok);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />

      <main style={{ flex: 1, padding: "12px 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Page title */}
          <div style={{ borderBottom: "1px solid #b1b4b6", paddingBottom: 8, marginBottom: 12 }}>
            <h1 style={{ fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", color: "#0b0c0c", margin: 0 }}>
              Form Pemesanan Makam
            </h1>
          </div>

          {/* Branding bar */}
          <div style={{ background: "#fff", border: "1px solid #b1b4b6", borderBottom: "none", padding: "12px 16px", display: "flex", alignItems: "center", gap: 14 }}>
            <img src="/images/logo.png" alt="Logo" width={40} height={40} style={{ objectFit: "contain" }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0b0c0c", lineHeight: 1.2 }}>TIMGRAVID</div>
              <div style={{ fontSize: "0.75rem", color: "#505a5f", lineHeight: 1.3 }}>Sistem Manajemen Pemakaman Timbanganten</div>
            </div>
          </div>

          {/* Sidebar + content */}
          <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", background: "#fff", border: "1px solid #b1b4b6" }}>

            {/* Left sidebar */}
            <div style={{ width: 200, flexShrink: 0, borderRight: "1px solid #b1b4b6" }}>
              <div style={{ padding: "8px 12px", background: "#f3f2f1", borderBottom: "1px solid #b1b4b6", fontSize: "0.6875rem", fontWeight: 700, color: "#505a5f", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Langkah
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {STEPS.map((label, idx) => {
                  const stepNum = idx + 1;
                  const isActive = step === stepNum;
                  const isDone = step > stepNum;
                  return (
                    <li key={label}>
                      <div style={{
                        padding: "10px 12px",
                        background: isActive ? "#1d70b8" : "transparent",
                        color: isActive ? "#fff" : isDone ? "#00703c" : "#0b0c0c",
                        borderBottom: "1px solid #b1b4b6",
                        fontSize: "0.8125rem",
                        fontWeight: isActive || isDone ? 700 : 400,
                        lineHeight: 1.4,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}>
                        <span style={{
                          width: 20, height: 20, flexShrink: 0,
                          background: isActive ? "#fff" : isDone ? "#00703c" : "#b1b4b6",
                          color: isActive ? "#1d70b8" : "#fff",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "0.6875rem", fontWeight: 700,
                        }}>
                          {isDone ? "✓" : stepNum}
                        </span>
                        {label}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Right content */}
            <div style={{ flex: 1, padding: "16px 20px" }}>
            {stepError && (
              <div style={{ ...errorStyle, marginBottom: 14 }}>{stepError}</div>
            )}

            {/* ── Step 1: Penanggung Jawab ── */}
            {step === 1 && (
              <>
                <div className="ent-section-heading">Penanggung Jawab</div>

                <GovukRadios name="pj-type" inline small>
                  <GovukRadioItem
                    name="pj-type"
                    value="new"
                    label="Buat Baru"
                    checked={!useExisting}
                    onChange={() => { setUseExisting(false); setSelectedUser(null); setSearchTerm(""); }}
                  />
                  <GovukRadioItem
                    name="pj-type"
                    value="existing"
                    label="Gunakan Data Ada"
                    checked={useExisting}
                    onChange={() => setUseExisting(true)}
                  />
                </GovukRadios>

                {useExisting ? (
                  <div style={{ marginBottom: 16 }}>
                    <GovukFormGroup label="Pilih Penanggung Jawab">
                      <GovukSelect
                        value={selectedUser?.id || ""}
                        onChange={(e) => {
                          const found = users.find((u) => u.id === e.target.value) || null;
                          setSelectedUser(found);
                        }}
                        style={{ width: "100%" }}
                        options={[
                          { value: "", label: "Pilih penanggung jawab..." },
                          ...users.map((u) => ({ value: u.id, label: `${u.name} — ${u.contact}` })),
                        ]}
                      />
                    </GovukFormGroup>
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
                      { name: "userPAName" as const, label: "Nama Penanggung Jawab", placeholder: "Masukkan Nama PJ", hint: "Nama lengkap penanggung jawab" },
                      { name: "userPAContact" as const, label: "No. Kontak", placeholder: "08XXXXXXXXX", hint: "Diawali 08, 10–14 digit. Contoh: 081234567890" },
                      { name: "userPAEmail" as const, label: "Email", placeholder: "user@gmail.com", type: "email", hint: "Format: nama@domain.com" },
                    ].map((f) => (
                      <Controller
                        key={f.name}
                        name={f.name}
                        control={control}
                        render={({ field }) => (
                          <GovukFormGroup label={f.label} hint={f.hint} error={errors[f.name]?.message}>
                            <GovukInput {...field} placeholder={f.placeholder} type={f.type || "text"} style={{ width: "100%" }} />
                          </GovukFormGroup>
                        )}
                      />
                    ))}

                    <Controller
                      name="userPAKTP"
                      control={control}
                      render={({ field }) => (
                        <GovukFormGroup label="No. KTP Pemesan" hint="16 digit angka. Contoh: 3201012345670001" error={errors.userPAKTP?.message}>
                          <GovukInput
                            {...field}
                            maxLength={16}
                            placeholder="Masukkan 16 digit nomor KTP"
                            style={{ width: "100%" }}
                          />
                        </GovukFormGroup>
                      )}
                    />

                    {[
                      { name: "emergencyName" as const, label: "Nama Kontak Darurat", placeholder: "Masukkan Nama", hint: "Nama lengkap kontak darurat" },
                      { name: "emergencyContact" as const, label: "No. Kontak Darurat", placeholder: "08XXXXXXXXX", hint: "Diawali 08, 10–14 digit. Contoh: 081234567890" },
                    ].map((f) => (
                      <Controller
                        key={f.name}
                        name={f.name}
                        control={control}
                        render={({ field }) => (
                          <GovukFormGroup label={f.label} hint={f.hint} error={errors[f.name]?.message}>
                            <GovukInput {...field} placeholder={f.placeholder} style={{ width: "100%" }} />
                          </GovukFormGroup>
                        )}
                      />
                    ))}
                  </div>
                )}
              </>
            )}

            {/* ── Step 2: Data Makam ── */}
            {step === 2 && (
              <>
                <div className="ent-section-heading">Data Pemesanan</div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(clamp(180px, 25vw, 240px), 1fr))",
                    gap: "10px 16px",
                    marginBottom: 16,
                  }}
                >
                  {/* Nama Almarhum/ah — full width */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <Controller
                      name="namaJenazah"
                      control={control}
                      render={({ field }) => (
                        <GovukFormGroup label="Nama Almarhum/ah" hint="Nama lengkap almarhum/almarhumah" error={step2Attempted ? errors.namaJenazah?.message : undefined}>
                          <GovukInput {...field} placeholder="Nama Almarhum/ah" style={{ width: "100%" }} />
                        </GovukFormGroup>
                      )}
                    />
                  </div>

                  {/* Lokasi */}
                  <Controller
                    name="lokasi"
                    control={control}
                    render={({ field }) => (
                      <GovukFormGroup label="Lokasi Pemakaman" hint="Pilih lokasi pemakaman yang tersedia" error={step2Attempted ? errors.lokasi?.message : undefined}>
                        <GovukSelect
                          value={field.value}
                          onChange={(e) => { const v = e.target.value; field.onChange(v); setLokasi(v); }}
                          style={{ width: "100%" }}
                          options={[
                            { value: "", label: "Pilih Lokasi" },
                            { value: "Karang Anyar", label: "Karang Anyar" },
                            { value: "Dalem Kaum", label: "Dalem Kaum" },
                            { value: "Dayeuh Kolot", label: "Dayeuh Kolot" },
                          ]}
                        />
                      </GovukFormGroup>
                    )}
                  />

                  {/* Blok Kavling */}
                  <div>
                    <Controller
                      name="blokId"
                      control={control}
                      render={({ field }) => (
                        <GovukFormGroup
                          label="Blok Kavling"
                          hint="Pilih lokasi dan jenis makam terlebih dahulu"
                          error={step2Attempted ? errors.blokId?.message : undefined}
                        >
                          <GovukSelect
                            value={field.value}
                            onChange={(e) => {
                              const v = e.target.value;
                              field.onChange(v);
                              handleBlokSelect(v);
                            }}
                            style={{ width: "100%" }}
                            options={[
                              { value: "", label: lokasi ? "Pilih Blok" : "Pilih lokasi dahulu" },
                              ...blokList.map((b) => ({
                                value: b.id,
                                label: `${b.id} (${b.lokasi}) (${b.statusBlok})`,
                              })),
                            ]}
                          />
                        </GovukFormGroup>
                      )}
                    />
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
                        padding: 0,
                        textDecoration: "underline",
                        marginTop: -20,
                        display: "block",
                      }}
                    >
                      Reset pilihan blok
                    </button>
                  </div>

                  {/* Jenis Makam — derived from selected blok, read-only */}
                  <GovukFormGroup label="Jenis Makam">
                    <div style={{
                      padding: "5px 8px",
                      border: "2px solid #b1b4b6",
                      background: "#f3f2f1",
                      fontSize: "0.875rem",
                      color: jenisMakam ? "#0b0c0c" : "#505a5f",
                      minHeight: 35,
                      display: "flex",
                      alignItems: "center",
                    }}>
                      {jenisMakam === "baru" ? "Baru" : jenisMakam === "tumpuk" ? "Tumpuk" : "Ditentukan otomatis setelah pilih blok"}
                    </div>
                  </GovukFormGroup>

                  {/* Silsilah */}
                  <Controller
                    name="silsilah"
                    control={control}
                    render={({ field }) => (
                      <GovukFormGroup label="Hubungan dengan Almarhum/ah Sebagai:" hint="Pilih hubungan antara pemesan dengan almarhum/ah" error={step2Attempted ? errors.silsilah?.message : undefined}>
                        <GovukSelect
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          style={{ width: "100%" }}
                          options={[
                            { value: "", label: "Pilih Silsilah" },
                            ...SILSILAH_OPTIONS.map((s) => ({ value: s, label: s })),
                          ]}
                        />
                      </GovukFormGroup>
                    )}
                  />

                  {/* Tanggal Pemesanan */}
                  <Controller
                    name="tanggalPemesanan"
                    control={control}
                    render={({ field }) => (
                      <GovukFormGroup label="Tanggal Pemesanan" hint="Tanggal saat pemesanan dilakukan" error={step2Attempted ? errors.tanggalPemesanan?.message : undefined}>
                        <GovukDateInput
                          id="tanggalPemesanan"
                          value={field.value}
                          onChange={(v) => field.onChange(v)}
                        />
                      </GovukFormGroup>
                    )}
                  />

                  {/* Tanggal Pemakaman */}
                  <div>
                    <Controller
                      name="tanggalPemakaman"
                      control={control}
                      render={({ field }) => (
                        <GovukFormGroup
                          label="Tanggal Pemakaman"
                          error={errors.tanggalPemakaman?.message}
                        >
                          <GovukDateInput
                            id="tanggalPemakaman"
                            value={field.value}
                            onChange={(v) => field.onChange(v)}
                          />
                        </GovukFormGroup>
                      )}
                    />
                    <p className="govuk-hint" style={{ marginTop: -20, fontSize: "0.75rem" }}>Diisi jika telah dimakamkan</p>
                  </div>

                  {/* Notes — full width */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <Controller
                      name="notes"
                      control={control}
                      render={({ field }) => (
                        <GovukFormGroup label="Penjelasan Tambahan" error={errors.notes?.message}>
                          <GovukTextarea
                            {...field}
                            rows={4}
                            placeholder="Tuliskan penjelasan tambahan terkait pemesanan..."
                          />
                        </GovukFormGroup>
                      )}
                    />
                  </div>
                </div>
              </>
            )}

            {/* ── Step 3: Konfirmasi ── */}
            {step === 3 && (
              <>
                <div className="ent-section-heading">Konfirmasi Data</div>

                <div style={{ background: "#f3f2f1", border: "1px solid #b1b4b6", marginBottom: 16 }}>
                  {/* PJ section */}
                  <div style={{ padding: "8px 14px", borderBottom: "1px solid #b1b4b6", background: "#f3f2f1", borderTop: "4px solid #1d70b8" }}>
                    <div style={{ color: "#0b0c0c", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Penanggung Jawab
                    </div>
                  </div>
                  <div style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
                    {useExisting && selectedUser ? (
                      <>
                        <ReviewField label="Nama" value={selectedUser.name || "-"} />
                        <ReviewField label="No. Kontak" value={selectedUser.contact || "-"} />
                      </>
                    ) : (
                      <>
                        <ReviewField label="Nama" value={watchedValues.userPAName || "-"} />
                        <ReviewField label="No. Kontak" value={watchedValues.userPAContact || "-"} />
                        <ReviewField label="Email" value={watchedValues.userPAEmail || "-"} />
                        <ReviewField label="No. KTP" value={watchedValues.userPAKTP || "-"} />
                        <ReviewField label="Kontak Darurat" value={watchedValues.emergencyName || "-"} />
                        <ReviewField label="No. Kontak Darurat" value={watchedValues.emergencyContact || "-"} />
                      </>
                    )}
                  </div>

                  {/* Makam section */}
                  <div style={{ padding: "8px 14px", borderBottom: "1px solid #b1b4b6", borderTop: "1px solid #b1b4b6", background: "#f3f2f1" }}>
                    <div style={{ color: "#0b0c0c", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Data Makam
                    </div>
                  </div>
                  <div style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
                    <ReviewField label="Nama Almarhum/ah" value={watchedValues.namaJenazah || "-"} />
                    <ReviewField label="Lokasi" value={watchedValues.lokasi || "-"} />
                    <ReviewField label="Blok Kavling" value={selectedBlok || "-"} />
                    <ReviewField label="Status Blok" value={selectedBlokData?.statusBlok || "-"} />
                    <ReviewField label="Jenis Makam" value={jenisMakam || "-"} />
                    <ReviewField label="Hubungan" value={watchedValues.silsilah || "-"} />
                    <ReviewField label="Tgl. Pemesanan" value={watchedValues.tanggalPemesanan ? String(watchedValues.tanggalPemesanan) : "-"} />
                    <ReviewField label="Tgl. Pemakaman" value={watchedValues.tanggalPemakaman ? String(watchedValues.tanggalPemakaman) : "-"} />
                    {watchedValues.notes && (
                      <div style={{ gridColumn: "1 / -1" }}>
                        <ReviewField label="Penjelasan" value={watchedValues.notes} />
                      </div>
                    )}
                  </div>
                </div>

                <div
                  style={{
                    padding: "10px 14px",
                    background: "#fff4e5",
                    borderLeft: "4px solid #f47738",
                    fontSize: "0.875rem",
                    color: "#0b0c0c",
                    marginBottom: 16,
                  }}
                >
                  Periksa kembali data di atas sebelum mengirim. Data yang telah dikirim tidak dapat diubah melalui form ini.
                </div>
              </>
            )}

            {/* Actions */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                paddingTop: 12,
                borderTop: "1px solid #b1b4b6",
              }}
            >
              <div>
                {step > 1 && (
                  <GovukButton type="button" variant="secondary" onClick={handlePrevStep} disabled={loading}>
                    ← Kembali
                  </GovukButton>
                )}
                {step === 1 && (
                  <GovukButton type="button" variant="warning" onClick={() => router.push("/")}>
                    Batal
                  </GovukButton>
                )}
              </div>

              <div>
                {step < 3 && (
                  <GovukButton type="button" onClick={handleNextStep}>
                    Lanjut →
                  </GovukButton>
                )}
                {step === 3 && (
                  <GovukButton type="submit" disabled={loading}>
                    {loading ? "Mengirim..." : "Kirim Pemesanan"}
                  </GovukButton>
                )}
              </div>
            </div>
          </div>
          </form>
          </div>
      </main>

      <Footer />
    </div>
  );
}

function ReviewField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#505a5f", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
        {label}
      </div>
      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0b0c0c" }}>{value}</div>
    </div>
  );
}
