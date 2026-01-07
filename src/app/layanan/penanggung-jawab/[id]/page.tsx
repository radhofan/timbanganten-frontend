"use client";
import { useState, useEffect, useCallback } from "react";
import {
  X,
  UserPlus,
  Users,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  User as UserIcon,
} from "lucide-react";
import { Modal, Input, Button, message } from "antd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Makam, PenanggungJawab } from "@/lib/types";
import { useParams } from "next/navigation";

// Union type for both Makam and MakamStatus with a discriminator
type MakamOrStatus = (Makam & { __isMakam: true }) | (Makam & { __isMakam: false });

export default function UserDetail() {
  const params = useParams();
  const id = params.id as string;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [availableSupervisors, setAvailableSupervisors] = useState<User[]>([]);
  const [penanggungJawabs, setPenanggungJawabs] = useState<PenanggungJawab[]>([]);
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
      message.error("Gagal memuat data penanggung jawab");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) return;
    fetchUserData();
    fetchAvailableSupervisors();
    fetchPenanggungJawabs();
  }, [id, fetchUserData]);

  const fetchAvailableSupervisors = async () => {
    try {
      const response = await fetch("/api/user");
      if (!response.ok) throw new Error("Failed to fetch supervisors");
      const data = await response.json();
      setAvailableSupervisors(data);
    } catch (error) {
      console.error("Error fetching supervisors:", error);
    }
  };

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          makamId: selectedMakam.id,
          pjId: supervisor.id,
        }),
      });

      if (!response.ok) throw new Error("Failed to add penanggung jawab");

      message.success("Penanggung jawab berhasil ditambahkan");
      await fetchPenanggungJawabs();
      setIsAddingNew(false);
      setSearchTerm("");
    } catch (error) {
      console.error("Error adding supervisor:", error);
      message.error("Gagal menambahkan penanggung jawab");
    } finally {
      setAddingPJ(false);
    }
  };

  const removeSupervisor = async (pjId: string) => {
    if (!selectedMakam || !selectedMakam.__isMakam) return;

    try {
      const response = await fetch("/api/updatePenanggungJawab", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          makamId: selectedMakam.id,
          pjId: pjId,
        }),
      });

      if (!response.ok) throw new Error("Failed to remove penanggung jawab");

      message.success("Penanggung jawab berhasil dihapus");
      await fetchPenanggungJawabs();
    } catch (error) {
      console.error("Error removing supervisor:", error);
      message.error("Gagal menghapus penanggung jawab");
    }
  };

  const getSupervisors = (makamId: string): PenanggungJawab[] => {
    return penanggungJawabs.filter((pj) => pj.makamId !== null && pj.makamId === makamId);
  };

  const filteredSupervisors = availableSupervisors.filter(
    (s) =>
      s.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.contact?.includes(searchTerm) ||
      s.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tag makams and statuses with discriminator
  const allMakams: MakamOrStatus[] = [
    ...(user?.makams || []).map((m) => ({ ...m, __isMakam: true as const })),
    ...(user?.statuses || []).map((s) => ({ ...s, __isMakam: false as const })),
  ];

  const currentSupervisors = selectedMakam ? getSupervisors(selectedMakam.id) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 flex flex-col">
      <Header hideBanner />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {loading && !user ? (
            <div className="min-h-[50vh] flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Memuat data penanggung jawab...</p>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">
                Detail Penanggung Jawab
              </h1>

              {/* User Info Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                <div className="flex items-start gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
                    <UserIcon className="w-12 h-12" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-800 mb-1">{user?.name || ""}</h2>
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                      Penanggung Jawab
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-lg mt-0.5">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <a
                          href={`mailto:${user?.email}`}
                          className="text-blue-600 hover:underline font-medium"
                        >
                          {user?.email || "-"}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-lg mt-0.5">
                        <Phone className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">No HP</p>
                        <a
                          href={`https://wa.me/${user?.contact}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:underline font-medium"
                        >
                          {user?.contact || "-"}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-purple-100 p-2 rounded-lg mt-0.5">
                        <MapPin className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <p className="text-gray-800 font-medium">{user?.status || "-"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-lg mt-0.5">
                        <CreditCard className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">No KTP</p>
                        <p className="text-gray-800 font-medium">{user?.ktpNum || "-"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-teal-100 p-2 rounded-lg mt-0.5">
                      <Phone className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Kontak Darurat</p>
                      <p className="text-gray-800 font-medium">{user?.emergencyContact || "-"}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg mt-0.5">
                      <UserIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Nama Kontak Darurat</p>
                      <p className="text-gray-800 font-medium">{user?.emergencyName || "-"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Makam List Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
                <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-600" />
                  Daftar Makam
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-black">
                        <th className="px-4 py-3 text-left font-semibold rounded-tl-lg">
                          Nomor Makam
                        </th>
                        <th className="px-4 py-3 text-left font-semibold">Status Makam</th>
                        <th className="px-4 py-3 text-left font-semibold">Atas Nama</th>
                        <th className="px-4 py-3 text-left font-semibold">Hubungan</th>
                        <th className="px-4 py-3 text-left font-semibold">Perpanjangan</th>
                        <th className="px-4 py-3 text-left font-semibold">Masa Aktif Pesanan</th>
                        <th className="px-4 py-3 text-left font-semibold">Iuran Pemeliharaan</th>
                        <th className="px-4 py-3 text-left font-semibold">Masa Aktif Iuran</th>
                        <th className="px-4 py-3 text-left font-semibold">Billing (Rp)</th>
                        <th className="px-4 py-3 text-left font-semibold rounded-tr-lg">
                          Penanggung Jawab Lainnya
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {allMakams.length > 0 ? (
                        allMakams.map((m, index) => {
                          const supervisors = getSupervisors(m.id);
                          const isEven = index % 2 === 0;
                          const isMakam = m.__isMakam;

                          return (
                            <tr
                              key={m.id}
                              className={`${isEven ? "bg-slate-50" : "bg-white"} hover:bg-blue-50 transition-colors`}
                            >
                              <td className="px-4 py-3 font-medium text-slate-800">{m.blok?.id}</td>
                              <td className="px-4 py-3">
                                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                  {m.blok?.statusBlok || ""}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-700">
                                {m.namaPenanggungJawab || user?.name || "-"}
                              </td>
                              <td className="px-4 py-3 text-gray-700">{m.silsilah || "-"}</td>
                              <td className="px-4 py-3 text-gray-700">
                                {m.tanggalPemesanan
                                  ? new Date(m.tanggalPemesanan).toLocaleDateString("id-ID")
                                  : "-"}
                              </td>
                              <td className="px-4 py-3">
                                <span className="inline-block px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                  {m.payment === "lunas" ? "Lunas" : m.payment || "-"}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-700">{m.payment || "-"}</td>
                              <td className="px-4 py-3 text-gray-700">
                                {m.masaAktif
                                  ? new Date(m.masaAktif).toLocaleDateString("id-ID")
                                  : "-"}
                              </td>
                              <td className="px-4 py-3 text-gray-700">-</td>
                              <td className="px-4 py-3">
                                {isMakam ? (
                                  <button
                                    onClick={() => openModal(m)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium"
                                  >
                                    <Users size={16} />
                                    <span>Daftar PJ ({supervisors.length})</span>
                                  </button>
                                ) : (
                                  <span className="text-xs text-gray-500 text-center block">
                                    Hanya untuk Makam Aktif
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td className="px-4 py-8 text-center text-gray-500" colSpan={10}>
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
        </div>
      </main>

      <Footer />

      {/* Modal */}
      <Modal
        title={
          <div className="border-b pb-4">
            <h2 className="text-xl font-bold text-slate-800">Daftar Penanggung Jawab Lainnya</h2>
            <p className="text-sm text-gray-600 mt-1">
              Untuk makam:{" "}
              <span className="font-semibold text-blue-600">{selectedMakam?.nama}</span> -{" "}
              {user?.name}
            </p>
          </div>
        }
        open={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width={700}
        centered
      >
        <div className="py-4">
          {!isAddingNew ? (
            <>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-slate-800 text-lg">
                    PJ yang Sudah Ditambahkan
                  </h3>
                  {selectedMakam?.__isMakam && (
                    <Button
                      type="primary"
                      icon={<UserPlus size={16} />}
                      onClick={() => setIsAddingNew(true)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Tambah PJ Baru
                    </Button>
                  )}
                </div>

                {currentSupervisors.length > 0 ? (
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {currentSupervisors.map((pj) => (
                      <div
                        key={pj.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">{pj.user?.name || "N/A"}</h3>
                          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                            <Phone size={14} /> {pj.user?.contact || "N/A"}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail size={14} /> {pj.user?.email || "N/A"}
                          </p>
                        </div>
                        {selectedMakam?.__isMakam && (
                          <button
                            onClick={() => removeSupervisor(pj.id)}
                            className="flex-shrink-0 text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Hapus"
                          >
                            <X size={20} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Belum ada penanggung jawab lainnya</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-slate-800 text-lg">Pilih Penanggung Jawab</h3>
                  <Button onClick={() => setIsAddingNew(false)}>Kembali</Button>
                </div>

                <Input
                  placeholder="Cari nama, nomor HP, atau email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  size="large"
                  className="mb-4"
                  prefix={<Users size={16} className="text-gray-400" />}
                />

                <div className="space-y-3 max-h-[400px] overflow-y-auto mt-4">
                  {penanggungJawabs
                    .filter((pj) => pj.user) // selectable PJ only
                    .map((pj) => {
                      const isAlreadyAdded = currentSupervisors.some(
                        (existing) => existing.userId === pj.userId
                      );

                      return (
                        <div
                          key={pj.id}
                          onClick={() => {
                            if (!isAlreadyAdded && !addingPJ) {
                              assignSupervisor(pj);
                            }
                          }}
                          className={`flex items-center justify-between p-4 border rounded-xl transition-all ${
                            isAlreadyAdded || addingPJ
                              ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-50"
                              : "border-gray-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer hover:shadow-md"
                          }`}
                        >
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800">{pj.user?.name}</h3>
                            <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                              <Phone size={14} /> {pj.user?.contact}
                            </p>
                            <p className="text-sm text-gray-500 flex items-center gap-1">
                              <Mail size={14} /> {pj.user?.email}
                            </p>
                          </div>
                          {isAlreadyAdded && (
                            <span className="text-xs text-gray-500 font-medium bg-gray-200 px-3 py-1 rounded-full">
                              Sudah ditambahkan
                            </span>
                          )}
                        </div>
                      );
                    })}
                  {filteredSupervisors.length === 0 && (
                    <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">
                        Tidak ada penanggung jawab yang sesuai dengan pencarian.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Modal>
    </div>
  );
}
