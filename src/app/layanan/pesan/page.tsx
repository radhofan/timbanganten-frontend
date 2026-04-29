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
  Silsilah,
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
  const [blokListFetched, setBlokListFetched] = useState(false);
  const [selectedBlok, setSelectedBlok] = useState<string>("");

  const [step, setStep] = useState(1);
  const [stepError, setStepError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm<PemesananPayload>({
    resolver: zodResolver(pemesananSchema),
    mode: "onChange",
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
      if (!useExisting) {
        const valid = await trigger(["userPAName", "userPAContact", "userPAEmail", "emergencyName", "emergencyContact", "userPAKTP"]);
        if (!valid) return;
      }
    }

    if (step === 2) {
      const valid = await trigger(["namaJenazah", "blokId", "lokasi", "silsilah", "tanggalPemesanan"]);
      if (!valid) return;
    }

    setStep((s) => s + 1);
  };

  const handlePrevStep = () => {
    setStepError("");
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

  const selectedBlokData = blokList.find((b) => b.id === selectedBlok);

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
            }}
          >
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

          {/* Step indicator */}
          <div style={{ display: "flex", borderBottom: "2px solid #0b0c0c" }}>
            {STEPS.map((label, idx) => {
              const stepNum = idx + 1;
              const isActive = step === stepNum;
              const isDone = step > stepNum;
              return (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    padding: "8px 12px",
                    background: isActive ? "#1d70b8" : isDone ? "#005a30" : "#f3f2f1",
                    borderRight: idx < STEPS.length - 1 ? "2px solid #0b0c0c" : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: isActive ? "#fff" : isDone ? "#00703c" : "#b1b4b6",
                      color: isActive ? "#1d70b8" : isDone ? "#fff" : "#505a5f",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      flexShrink: 0,
                    }}
                  >
                    {isDone ? "✓" : stepNum}
                  </span>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: isActive || isDone ? "#fff" : "#505a5f",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ padding: "clamp(14px, 2vw, 22px)" }}>
            {stepError && (
              <div style={{ ...errorStyle, marginBottom: 14 }}>{stepError}</div>
            )}

            {/* ── Step 1: Penanggung Jawab ── */}
            {step === 1 && (
              <>
                <div className="ent-section-heading">Penanggung Jawab</div>

                <GovukRadios
                  name="pj-type"
                  value={useExisting ? "existing" : "new"}
                  onChange={(val) => {
                    setUseExisting(val === "existing");
                    setSelectedUser(null);
                    setSearchTerm("");
                  }}
                >
                  <GovukRadioItem value="new" label="Buat Baru" />
                  <GovukRadioItem value="existing" label="Gunakan Data Ada" />
                </GovukRadios>

                {useExisting ? (
                  <div style={{ marginBottom: 16 }}>
                    <GovukFormGroup label="Cari Penanggung Jawab">
                      <GovukInput
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Ketik nama atau kontak..."
                      />
                    </GovukFormGroup>
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
                    {selectedUser && (
                      <div
                        style={{
                          marginTop: 8,
                          padding: "8px 12px",
                          background: "#e8f5e9",
                          borderLeft: "4px solid #00703c",
                          fontSize: "0.875rem",
                          fontWeight: 600,
                          color: "#005a30",
                        }}
                      >
                        Dipilih: {selectedUser.name} ({selectedUser.contact})
                      </div>
                    )}
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
                      <Controller
                        key={f.name}
                        name={f.name}
                        control={control}
                        render={({ field }) => (
                          <GovukFormGroup label={f.label} error={errors[f.name]?.message}>
                            <GovukInput {...field} placeholder={f.placeholder} type={f.type || "text"} />
                          </GovukFormGroup>
                        )}
                      />
                    ))}

                    <div style={{ gridColumn: "1 / -1" }}>
                      <Controller
                        name="userPAKTP"
                        control={control}
                        render={({ field }) => (
                          <GovukFormGroup label="No. KTP Pemesan" error={errors.userPAKTP?.message}>
                            <GovukInput
                              {...field}
                              maxLength={16}
                              placeholder="Masukkan 16 digit nomor KTP"
                            />
                          </GovukFormGroup>
                        )}
                      />
                    </div>
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
                  {/* Nama Jenazah — full width */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <Controller
                      name="namaJenazah"
                      control={control}
                      render={({ field }) => (
                        <GovukFormGroup label="Nama Jenazah" error={errors.namaJenazah?.message}>
                          <GovukInput {...field} placeholder="Nama Jenazah" />
                        </GovukFormGroup>
                      )}
                    />
                  </div>

                  {/* Lokasi */}
                  <Controller
                    name="lokasi"
                    control={control}
                    render={({ field }) => (
                      <GovukFormGroup label="Lokasi Pemakaman" error={errors.lokasi?.message}>
                        <GovukSelect
                          value={field.value}
                          onChange={(value) => { field.onChange(value); setLokasi(value); }}
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

                  {/* Jenis Makam */}
                  <GovukFormGroup label="Jenis Makam">
                    <GovukSelect
                      value={jenisMakam}
                      onChange={(value) => setJenisMakam(value)}
                      options={[
                        { value: "", label: "Pilih Jenis Makam" },
                        { value: "baru", label: "Baru" },
                        { value: "tumpuk", label: "Tumpuk" },
                      ]}
                    />
                  </GovukFormGroup>

                  {/* Blok Kavling */}
                  <div style={{ gridColumn: "1 / -1" }}>
                    <Controller
                      name="blokId"
                      control={control}
                      render={({ field }) => (
                        <GovukFormGroup 
                          label="Blok Kavling" 
                          error={errors.blokId?.message}
                          hint={
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
                                color: "#1d70b8",
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                padding: 0,
                                textDecoration: "underline",
                              }}
                            >
                              Reset pilihan blok
                            </button>
                          }
                        >
                          <GovukSelect
                            value={field.value}
                            onChange={(value) => {
                              field.onChange(value);
                              handleBlokSelect(value);
                            }}
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
                  </div>

                  {/* Silsilah */}
                  <Controller
                    name="silsilah"
                    control={control}
                    render={({ field }) => (
                      <GovukFormGroup label="Hubungan dengan Pemesan" error={errors.silsilah?.message}>
                        <GovukSelect
                          value={field.value}
                          onChange={field.onChange}
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
                      <GovukFormGroup label="Tanggal Pemesanan" error={errors.tanggalPemesanan?.message}>
                        <GovukDateInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </GovukFormGroup>
                    )}
                  />

                  {/* Tanggal Pemakaman */}
                  <Controller
                    name="tanggalPemakaman"
                    control={control}
                    render={({ field }) => (
                      <GovukFormGroup 
                        label="Tanggal Pemakaman" 
                        error={errors.tanggalPemakaman?.message}
                        hint="Diisi jika telah dimakamkan"
                      >
                        <GovukDateInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </GovukFormGroup>
                    )}
                  />

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
                  <div style={{ padding: "10px 14px", borderBottom: "1px solid #b1b4b6", background: "#0b0c0c" }}>
                    <div style={{ color: "#b1b4b6", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
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
                  <div style={{ padding: "10px 14px", borderBottom: "1px solid #b1b4b6", borderTop: "1px solid #b1b4b6", background: "#0b0c0c" }}>
                    <div style={{ color: "#b1b4b6", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      Data Makam
                    </div>
                  </div>
                  <div style={{ padding: "12px 14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
                    <ReviewField label="Nama Jenazah" value={watchedValues.namaJenazah || "-"} />
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
                  <GovukButton variant="secondary" onClick={handlePrevStep} disabled={loading}>
                    ← Kembali
                  </GovukButton>
                )}
                {step === 1 && (
                  <GovukButton variant="warning" onClick={() => router.push("/")}>
                    Batal
                  </GovukButton>
                )}
              </div>

              <div>
                {step < 3 && (
                  <GovukButton onClick={handleNextStep}>
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
