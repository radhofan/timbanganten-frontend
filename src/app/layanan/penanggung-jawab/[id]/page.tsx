"use client";
import { useState, useEffect, useCallback } from "react";
import { X, UserPlus, Users, Mail, Phone, User as UserIcon } from "lucide-react";
import { GovukButton, GovukInput } from "@/components/govuk";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Makam, PenanggungJawab, MakamStatus } from "@/lib/types";
import { useParams } from "next/navigation";
import { StatusLabel } from "@/components/StatusLabel";
import toast from "react-hot-toast";

type MakamOrStatus = (Makam & { __isMakam: true }) | (Makam & { __isMakam: false });

export default function UserDetail() {
  const params = useParams();
  const id = params.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [penanggungJawabs, setPenanggungJawabs] = useState<PenanggungJawab[]>([]);
  const [userMakams, setUserMakams] = useState<MakamOrStatus[]>([]);
  const [selectedMakam, setSelectedMakam] = useState<MakamOrStatus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [addingPJ, setAddingPJ] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/user?id=${id}`);
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setUser(data);
    } catch {
      toast.error("Gagal memuat data penanggung jawab", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchUserMakams = useCallback(async () => {
    try {
      const response = await fetch("/api/fetchPenanggungJawabMakams", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: id }),
      });

      if (!response.ok) throw new Error("Failed to fetch user makams");

      const data = await response.json();
      const makams: MakamOrStatus[] = [];

      data.forEach((pj: PenanggungJawab) => {
        if (pj.makam?.length) {
          pj.makam.forEach((m: Makam) => makams.push({ ...m, __isMakam: true }));
        }
        if (pj.makamStatus?.length) {
          pj.makamStatus.forEach((ms: MakamStatus) => makams.push({ ...ms, __isMakam: false }));
        }
      });

      setUserMakams(makams);
    } catch (error) {
      console.error("Error fetching user makams:", error);
      toast.error("Gagal memuat data makam", { position: "top-center" });
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchUserData();
    fetchUserMakams();
    fetchPenanggungJawabs();
  }, [id, fetchUserData, fetchUserMakams]);

  const fetchPenanggungJawabs = async () => {
    try {
      const response = await fetch("/api/updatePenanggungJawab");
      if (!response.ok) throw new Error("Failed to fetch penanggung jawabs");
      const data = await response.json();
      setPenanggungJawabs(data);
    } catch (error) {
      console.error("Error fetching penanggung jawabs:", error);
    }
  };

  const openModal = (makam: MakamOrStatus) => {
    setSelectedMakam(makam);
    setSearchTerm("");
    setIsAddingNew(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMakam(null);
    setSearchTerm("");
    setIsAddingNew(false);
  };

  const assignSupervisor = async (supervisor: PenanggungJawab) => {
    if (!selectedMakam || !selectedMakam.__isMakam) return;

    try {
      setAddingPJ(true);
      const response = await fetch("/api/updatePenanggungJawab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ makamId: selectedMakam.id, pjId: supervisor.id }),
      });

      if (!response.ok) throw new Error("Failed to add penanggung jawab");

      toast.success("Penanggung jawab berhasil ditambahkan", { position: "top-center" });
      await fetchPenanggungJawabs();
      setIsAddingNew(false);
      setSearchTerm("");
    } catch (error) {
      console.error("Error adding supervisor:", error);
      toast.error("Gagal menambahkan penanggung jawab", { position: "top-center" });
    } finally {
      setAddingPJ(false);
    }
  };

  const removeSupervisor = async (pjId: string) => {
    if (!selectedMakam || !selectedMakam.__isMakam) return;

    try {
      const response = await fetch("/api/updatePenanggungJawab", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ makamId: selectedMakam.id, pjId }),
      });

      if (!response.ok) throw new Error("Failed to remove penanggung jawab");

      toast.success("Penanggung jawab berhasil dihapus", { position: "top-center" });
      await fetchPenanggungJawabs();
    } catch (error) {
      console.error("Error removing supervisor:", error);
      toast.error("Gagal menghapus penanggung jawab", { position: "top-center" });
    }
  };

  const confirmRemoveSupervisor = (pjId: string, pjName: string) => {
    if (window.confirm(`Yakin ingin menghapus ${pjName} dari makam ini? Aksi ini tidak dapat dibatalkan.`)) {
      removeSupervisor(pjId);
    }
  };

  const getSupervisors = (makamId: string): PenanggungJawab[] => {
    return penanggungJawabs.filter((pj) => pj.makam?.some((m) => m.id === makamId));
  };

  const currentSupervisors = selectedMakam ? getSupervisors(selectedMakam.id) : [];

  const filteredAvailable = penanggungJawabs.filter(
    (pj) =>
      pj.user &&
      (!pj.makam || pj.makam.length === 0) &&
      (
        !searchTerm ||
        pj.user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pj.user.contact?.includes(searchTerm) ||
        pj.user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const TABLE_HEADERS = [
    "Nomor Makam", "Status Makam", "Atas Nama", "Hubungan",
    "Perpanjangan", "Masa Aktif Pesanan", "Iuran Pemeliharaan",
    "Masa Aktif Iuran", "Billing (Rp)", "PJ Lainnya",
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />

      <main style={{ flex: 1 }} className="page-container">
        {loading && !user ? (
          <div style={{ padding: "40px 0", color: "#505a5f", fontSize: "0.875rem" }}>
            Memuat data penanggung jawab...
          </div>
        ) : (
          <>
            {/* Page title */}
            <div style={{ borderBottom: "1px solid #b1b4b6", paddingBottom: 8, marginBottom: 14 }}>
              <h1 style={{ fontWeight: 700, fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", color: "#0b0c0c", margin: 0 }}>
                Detail Penanggung Jawab
              </h1>
            </div>

            {/* ── User Info Panel ── */}
            <div style={{ background: "#fff", border: "1px solid #505a5f", borderTop: "3px solid #1d70b8", marginBottom: 12 }}>
              {/* Header bar */}
              <div style={{ background: "#f3f2f1", padding: "10px 16px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid #b1b4b6" }}>
                <div style={{ background: "#1d70b8", padding: "5px 8px", display: "flex", alignItems: "center" }}>
                  <UserIcon style={{ color: "#fff", width: 18, height: 18 }} />
                </div>
                <div>
                  <div style={{ color: "#0b0c0c", fontWeight: 700, fontSize: "clamp(0.875rem, 1.2vw, 1.1rem)" }}>
                    {user?.name || ""}
                  </div>
                  <span style={{
                    fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase",
                    letterSpacing: "0.05em", padding: "1px 6px",
                    background: "#d4351c", color: "#fff", marginTop: 2, display: "inline-block",
                  }}>
                    Penanggung Jawab
                  </span>
                </div>
              </div>

              {/* Info grid */}
              <div style={{
                padding: "12px 16px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(clamp(160px, 20vw, 220px), 1fr))",
                gap: "10px 20px",
              }}>
                {[
                  { label: "Email", value: user?.email, href: user?.email ? `mailto:${user.email}` : undefined },
                  { label: "No HP", value: user?.contact },
                  { label: "No KTP", value: user?.ktpNum },
                  { label: "Kontak Darurat", value: user?.emergencyContact },
                  { label: "Nama Kontak Darurat", value: user?.emergencyName },
                ].map(({ label, value, href }) => (
                  <div key={label}>
                    <div style={{ fontSize: "0.6875rem", fontWeight: 700, color: "#505a5f", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                      {label}
                    </div>
                    {href ? (
                      <a href={href} style={{ color: "#1d70b8", fontWeight: 600, fontSize: "0.875rem" }}>
                        {value || "-"}
                      </a>
                    ) : (
                      <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "#0b0c0c" }}>
                        {value || "-"}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Makam Table ── */}
            <div style={{ background: "#fff", border: "1px solid #505a5f" }}>
              {/* Table header bar */}
              <div style={{
                background: "#f3f2f1", padding: "8px 14px",
                borderBottom: "1px solid #b1b4b6",
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span style={{ fontWeight: 700, fontSize: "0.8125rem", color: "#0b0c0c", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Daftar Makam
                </span>
                <span style={{ fontSize: "0.75rem", color: "#505a5f", fontWeight: 600 }}>
                  {userMakams.length} data
                </span>
              </div>

              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.8125rem" }}>
                  <thead>
                    <tr style={{ background: "#f3f2f1", borderBottom: "1px solid #b1b4b6" }}>
                      {TABLE_HEADERS.map((h) => (
                        <th key={h} style={{
                          padding: "clamp(4px,0.4vw,6px) clamp(6px,0.6vw,10px)",
                          textAlign: "left", fontWeight: 700,
                          fontSize: "0.6875rem", textTransform: "uppercase",
                          letterSpacing: "0.04em", whiteSpace: "nowrap",
                          color: "#0b0c0c",
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {userMakams.length > 0 ? (
                      userMakams.map((m, index) => {
                        const supervisors = getSupervisors(m.id);
                        const isMakam = m.__isMakam;

                        return (
                          <tr
                            key={m.id}
                            style={{
                              background: index % 2 === 0 ? "#fff" : "#f3f2f1",
                              borderBottom: "1px solid #e4e4e4",
                            }}
                          >
                            <td style={{ padding: "clamp(4px,0.4vw,6px) clamp(6px,0.6vw,10px)", fontWeight: 700, color: "#0b0c0c" }}>
                              {m.blok?.id}
                            </td>
                            <td style={{ padding: "clamp(4px,0.4vw,6px) clamp(6px,0.6vw,10px)" }}>
                              <span style={{
                                fontSize: "0.6875rem", fontWeight: 700,
                                padding: "2px 6px", background: "#e8f5e9",
                                color: "#00703c", border: "1px solid #00703c",
                              }}>
                                {m.blok?.statusBlok || ""}
                              </span>
                            </td>
                            <td style={{ padding: "clamp(4px,0.4vw,6px) clamp(6px,0.6vw,10px)", color: "#0b0c0c" }}>
                              {m.jenazah?.user?.name || "-"}
                            </td>
                            <td style={{ padding: "clamp(4px,0.4vw,6px) clamp(6px,0.6vw,10px)", color: "#505a5f" }}>
                              {m.jenazah?.user?.relasiOrang2?.[0]?.jenisHubungan || "-"}
                            </td>
                            <td style={{ padding: "clamp(4px,0.4vw,6px) clamp(6px,0.6vw,10px)", color: "#505a5f" }}>
                              {m.tanggalPemesanan
                                ? new Date(m.tanggalPemesanan).toLocaleDateString("id-ID")
                                : "-"}
                            </td>
                            <td style={{ padding: "clamp(4px,0.4vw,6px) clamp(6px,0.6vw,10px)" }}>
                              <StatusLabel
                                id={`statusPesanan-${m.id}`}
                                label=""
                                value={m.jenazah?.statusPembayaranPesanan || "-"}
                                readOnly
                                disabled
                                size="small"
                              />
                            </td>
                            <td style={{ padding: "clamp(4px,0.4vw,6px) clamp(6px,0.6vw,10px)", color: "#505a5f" }}>
                              {"-"}
                            </td>
                            <td style={{ padding: "clamp(4px,0.4vw,6px) clamp(6px,0.6vw,10px)", color: "#505a5f" }}>
                              {m.jenazah?.masaAktif
                                ? new Date(m.jenazah.masaAktif).toLocaleDateString("id-ID")
                                : "-"}
                            </td>
                            <td style={{ padding: "clamp(4px,0.4vw,6px) clamp(6px,0.6vw,10px)" }}>
                              <StatusLabel
                                id={`statusIuran-${m.id}`}
                                label=""
                                value={m.jenazah?.statusPembayaranIuranTahunan || "-"}
                                readOnly
                                disabled
                                size="small"
                              />
                            </td>
                            <td style={{ padding: "clamp(4px,0.4vw,6px) clamp(6px,0.6vw,10px)" }}>
                              {isMakam ? (
                                <GovukButton
                                  variant="secondary"
                                  onClick={() => openModal(m)}
                                >
                                  <Users size={13} style={{ marginRight: 4 }} />
                                  Daftar PJ ({supervisors.length})
                                </GovukButton>
                              ) : (
                                <span style={{ fontSize: "0.6875rem", color: "#505a5f" }}>
                                  Hanya Makam Aktif
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td
                          colSpan={10}
                          style={{ padding: "24px", textAlign: "center", color: "#505a5f", fontSize: "0.875rem" }}
                        >
                          Belum ada data makam.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />

      {/* ── Modal: Daftar PJ ── */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              background: "#fff",
              border: "3px solid #0b0c0c",
              maxWidth: "660px",
              width: "90%",
              maxHeight: "90vh",
              overflow: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div style={{ borderBottom: "1px solid #b1b4b6", padding: "12px 16px" }}>
              <div style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0b0c0c" }}>
                Daftar Penanggung Jawab Lainnya
              </div>
              <div style={{ fontSize: "0.8125rem", color: "#505a5f", marginTop: 4 }}>
                Makam:{" "}
                <strong style={{ color: "#1d70b8" }}>{selectedMakam?.jenazah?.user?.name}</strong>
                {" — "}{user?.name}
              </div>
            </div>

            <div style={{ padding: "16px" }}>
              {!isAddingNew ? (
                <>
                  {/* View existing PJs */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.8125rem", color: "#0b0c0c", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      PJ Sudah Ditambahkan
                    </div>
                    {selectedMakam?.__isMakam && (
                      <GovukButton
                        variant="secondary"
                        onClick={() => setIsAddingNew(true)}
                      >
                        <UserPlus size={14} style={{ marginRight: 4 }} />
                        Tambah PJ Baru
                      </GovukButton>
                    )}
                  </div>

                  {currentSupervisors.length > 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: "clamp(18rem,30vh,24rem)", overflowY: "auto" }}>
                      {currentSupervisors.map((pj) => (
                        <div
                          key={pj.id}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "8px 12px",
                            border: "1px solid #b1b4b6",
                            background: "#fff",
                            borderLeft: "4px solid #1d70b8",
                          }}
                        >
                          <div>
                            <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0b0c0c" }}>
                              {pj.user?.name || "N/A"}
                            </div>
                            <div style={{ fontSize: "0.8125rem", color: "#505a5f", display: "flex", gap: 12, marginTop: 2 }}>
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <Phone size={12} /> {pj.user?.contact || "N/A"}
                              </span>
                              <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                <Mail size={12} /> {pj.user?.email || "N/A"}
                              </span>
                            </div>
                          </div>
                          {selectedMakam?.__isMakam && (
                            <button
                              onClick={() => confirmRemoveSupervisor(pj.id, pj.user?.name || "PJ ini")}
                              style={{
                                background: "none", border: "none", cursor: "pointer",
                                color: "#d4351c", padding: "4px 6px", display: "flex", alignItems: "center",
                              }}
                              title="Hapus"
                            >
                              <X size={18} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{
                      padding: "24px", textAlign: "center",
                      border: "2px dashed #b1b4b6", background: "#f3f2f1",
                    }}>
                      <Users style={{ width: 36, height: 36, color: "#b1b4b6", margin: "0 auto 8px" }} />
                      <div style={{ color: "#505a5f", fontSize: "0.875rem" }}>
                        Belum ada penanggung jawab lainnya
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* Add new PJ */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ fontWeight: 700, fontSize: "0.8125rem", color: "#0b0c0c", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                      Pilih Penanggung Jawab
                    </div>
                    <GovukButton variant="secondary" onClick={() => setIsAddingNew(false)}>
                      ← Kembali
                    </GovukButton>
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <GovukInput
                      placeholder="Cari nama, nomor HP, atau email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: "clamp(22rem,38vh,28rem)", overflowY: "auto" }}>
                    {filteredAvailable.length > 0 ? (
                      filteredAvailable.map((pj) => {
                        const isAlreadyAdded = currentSupervisors.some(
                          (existing) => existing.userId === pj.userId
                        );

                        return (
                          <div
                            key={pj.id}
                            onClick={() => { if (!isAlreadyAdded && !addingPJ) assignSupervisor(pj); }}
                            style={{
                              display: "flex", alignItems: "center", justifyContent: "space-between",
                              padding: "8px 12px",
                              border: `1px solid ${isAlreadyAdded || addingPJ ? "#b1b4b6" : "#505a5f"}`,
                              background: isAlreadyAdded || addingPJ ? "#f3f2f1" : "#fff",
                              cursor: isAlreadyAdded || addingPJ ? "not-allowed" : "pointer",
                              opacity: isAlreadyAdded || addingPJ ? 0.6 : 1,
                              borderLeft: isAlreadyAdded ? "4px solid #b1b4b6" : "4px solid #1d70b8",
                              transition: "background 0.1s",
                            }}
                          >
                            <div>
                              <div style={{ fontWeight: 700, fontSize: "0.875rem", color: "#0b0c0c" }}>
                                {pj.user?.name}
                              </div>
                              <div style={{ fontSize: "0.8125rem", color: "#505a5f", display: "flex", gap: 12, marginTop: 2 }}>
                                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                  <Phone size={12} /> {pj.user?.contact}
                                </span>
                                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                  <Mail size={12} /> {pj.user?.email}
                                </span>
                              </div>
                            </div>
                            {isAlreadyAdded && (
                              <span style={{
                                fontSize: "0.6875rem", fontWeight: 700,
                                padding: "2px 8px", background: "#b1b4b6",
                                color: "#0b0c0c",
                              }}>
                                Sudah ditambahkan
                              </span>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <div style={{
                        padding: "24px", textAlign: "center",
                        border: "2px dashed #b1b4b6", background: "#f3f2f1",
                      }}>
                        <Users style={{ width: 36, height: 36, color: "#b1b4b6", margin: "0 auto 8px" }} />
                        <div style={{ color: "#505a5f", fontSize: "0.875rem" }}>
                          Tidak ada penanggung jawab yang tersedia.
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}

              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid #b1b4b6", textAlign: "right" }}>
                <GovukButton variant="secondary" onClick={closeModal}>
                  Tutup
                </GovukButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
