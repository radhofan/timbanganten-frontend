"use client";
import { useState } from "react";
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
import { Modal, Input, Button } from "antd";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Supervisor {
  id: number;
  name: string;
  contact: string;
  email: string;
}

interface MakamItem {
  id: number;
  nama: string;
  nama_penanggung_jawab: string;
  silsilah: string;
  masa_aktif: string;
  payment: string;
  supervisor: Supervisor | null;
}

interface StatusItem {
  id: number;
  nama: string;
  nama_penanggung_jawab: string;
  silsilah: string;
  masa_aktif: string;
  payment: string;
  supervisor: Supervisor | null;
}

interface UserData {
  name: string;
  email: string;
  contact: string;
  makams: MakamItem[];
  statuses: StatusItem[];
}

interface AllMakamItem {
  id: number;
  nama: string;
  nama_penanggung_jawab: string;
  silsilah: string;
  masa_aktif: string;
  payment: string;
  supervisor: Supervisor | null;
  type: string;
  status: string;
}

// Dummy data for demonstration
const dummyUser: UserData = {
  name: "Ahmad Sudrajat",
  email: "ahmad.sudrajat@email.com",
  contact: "081234567890",
  makams: [
    {
      id: 1,
      nama: "A-001",
      nama_penanggung_jawab: "Siti Aminah",
      silsilah: "Istri",
      masa_aktif: "2025-12-31",
      payment: "Lunas",
      supervisor: null,
    },
    {
      id: 2,
      nama: "A-002",
      nama_penanggung_jawab: "Budi Santoso",
      silsilah: "Anak",
      masa_aktif: "2026-06-30",
      payment: "Belum Lunas",
      supervisor: { id: 2, name: "Dewi Kusuma", contact: "082345678901", email: "dewi@email.com" },
    },
  ],
  statuses: [
    {
      id: 3,
      nama: "B-015",
      nama_penanggung_jawab: "Rini Wijaya",
      silsilah: "Adik",
      masa_aktif: "2025-09-15",
      payment: "Lunas",
      supervisor: null,
    },
  ],
};

const availableSupervisors: Supervisor[] = [
  { id: 1, name: "Andi Permana", contact: "081234567890", email: "andi@email.com" },
  { id: 2, name: "Dewi Kusuma", contact: "082345678901", email: "dewi@email.com" },
  { id: 3, name: "Rudi Hartono", contact: "083456789012", email: "rudi@email.com" },
  { id: 4, name: "Sari Lestari", contact: "084567890123", email: "sari@email.com" },
];

export default function UserDetail() {
  const [user] = useState<UserData>(dummyUser);
  const [loading] = useState(false);
  const [selectedMakam, setSelectedMakam] = useState<AllMakamItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [makamSupervisors, setMakamSupervisors] = useState<Record<string, Supervisor[]>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const openModal = (makam: AllMakamItem, type: string) => {
    setSelectedMakam({ ...makam, type });
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

  const assignSupervisor = (supervisor: Supervisor) => {
    if (!selectedMakam) return;

    const key = `${selectedMakam.type}-${selectedMakam.id}`;
    const existing = makamSupervisors[key] || [];

    if (existing.find((s) => s.id === supervisor.id)) {
      return;
    }

    setMakamSupervisors({
      ...makamSupervisors,
      [key]: [...existing, supervisor],
    });
  };

  const removeSupervisor = (supervisorId: number) => {
    if (!selectedMakam) return;

    const key = `${selectedMakam.type}-${selectedMakam.id}`;
    const existing = makamSupervisors[key] || [];

    setMakamSupervisors({
      ...makamSupervisors,
      [key]: existing.filter((s) => s.id !== supervisorId),
    });
  };

  const getSupervisors = (makamId: number, type: string): Supervisor[] => {
    const key = `${type}-${makamId}`;
    return makamSupervisors[key] || [];
  };

  const filteredSupervisors = availableSupervisors.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.contact.includes(searchTerm) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allMakams: AllMakamItem[] = [
    ...(user?.makams?.map((m) => ({ ...m, type: "makam", status: "Digunakan" })) || []),
    ...(user?.statuses?.map((m) => ({ ...m, type: "status", status: "Dipesan" })) || []),
  ];

  const currentSupervisors = selectedMakam
    ? getSupervisors(selectedMakam.id, selectedMakam.type)
    : [];

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
                        <UserIcon className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Silsilah</p>
                        <p className="text-gray-800 font-medium">-</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-lg mt-0.5">
                        <CreditCard className="w-5 h-5 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">No KTP</p>
                        <p className="text-gray-800 font-medium">-</p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-start gap-3">
                      <div className="bg-rose-100 p-2 rounded-lg mt-0.5">
                        <MapPin className="w-5 h-5 text-rose-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Alamat</p>
                        <p className="text-gray-800 font-medium">-</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-teal-100 p-2 rounded-lg mt-0.5">
                      <Phone className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Kontak Darurat</p>
                      <p className="text-gray-800 font-medium">-</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="bg-indigo-100 p-2 rounded-lg mt-0.5">
                      <UserIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Nama Kontak Darurat</p>
                      <p className="text-gray-800 font-medium">-</p>
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
                          const supervisors = getSupervisors(m.id, m.type);
                          const isEven = index % 2 === 0;
                          return (
                            <tr
                              key={`${m.type}-${m.id}`}
                              className={`${isEven ? "bg-slate-50" : "bg-white"} hover:bg-blue-50 transition-colors`}
                            >
                              <td className="px-4 py-3 font-medium text-slate-800">{m.nama}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                    m.status === "Digunakan"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {m.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-700">{m.nama_penanggung_jawab}</td>
                              <td className="px-4 py-3 text-gray-700">{m.silsilah}</td>
                              <td className="px-4 py-3 text-gray-700">{m.masa_aktif}</td>
                              <td className="px-4 py-3">
                                <span
                                  className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                                    m.payment === "Lunas"
                                      ? "bg-green-100 text-green-700"
                                      : "bg-red-100 text-red-700"
                                  }`}
                                >
                                  {m.payment}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-gray-700">-</td>
                              <td className="px-4 py-3 text-gray-700">-</td>
                              <td className="px-4 py-3 text-gray-700">-</td>
                              <td className="px-4 py-3">
                                <button
                                  onClick={() => openModal(m, m.type)}
                                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg font-medium"
                                >
                                  <Users size={16} />
                                  <span>Daftar PJ ({supervisors.length})</span>
                                </button>
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
              {selectedMakam?.nama_penanggung_jawab}
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
                  <Button
                    type="primary"
                    icon={<UserPlus size={16} />}
                    onClick={() => setIsAddingNew(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Tambah PJ Baru
                  </Button>
                </div>

                {currentSupervisors.length > 0 ? (
                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {currentSupervisors.map((supervisor) => (
                      <div
                        key={supervisor.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">{supervisor.name}</h3>
                          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                            <Phone size={14} /> {supervisor.contact}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail size={14} /> {supervisor.email}
                          </p>
                        </div>
                        <button
                          onClick={() => removeSupervisor(supervisor.id)}
                          className="flex-shrink-0 text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <X size={20} />
                        </button>
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
                  {filteredSupervisors.map((supervisor) => {
                    const isAlreadyAdded = currentSupervisors.find((s) => s.id === supervisor.id);
                    return (
                      <div
                        key={supervisor.id}
                        onClick={() => {
                          if (!isAlreadyAdded) {
                            assignSupervisor(supervisor);
                            setIsAddingNew(false);
                            setSearchTerm("");
                          }
                        }}
                        className={`flex items-center justify-between p-4 border rounded-xl transition-all ${
                          isAlreadyAdded
                            ? "border-gray-300 bg-gray-100 cursor-not-allowed opacity-50"
                            : "border-gray-200 hover:border-blue-500 hover:bg-blue-50 cursor-pointer hover:shadow-md"
                        }`}
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-800">{supervisor.name}</h3>
                          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                            <Phone size={14} /> {supervisor.contact}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Mail size={14} /> {supervisor.email}
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
