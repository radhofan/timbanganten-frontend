"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import dayjs from "dayjs";

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
  UserCircle,
  MapPin,
  Calendar,
  FileText,
  Building2,
  Mail,
  Phone,
  CreditCard,
  Users,
  Hash,
} from "lucide-react";

export default function Pemesanan() {
  const [blokList, setBlokList] = useState<{ id: string; lokasi: string; statusBlok: string }[]>(
    []
  );
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

    const url = `/api/blok?${params.toString()}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBlokList(data);
        setBlokListFetched(true);
      })
      .catch(console.error);
  }, [lokasi, jenisMakam]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const diriSendiri = (formData.get("silsilah") as string) === "diri sendiri";

    console.log(diriSendiri);

    interface PemesananPayload {
      namaJenazah: string;
      blokId: string;
      lokasi: string;
      silsilah: string;
      notes: string;
      diriSendiri: boolean;
      existingUserId?: string;
      emergencyName?: string;
      emergencyContact?: string;
      pjName?: string;
      pjContact?: string;
      userPAName?: string;
      userPAContact?: string;
      userPAEmail?: string;
      userPAKTP?: string;
      userPBName?: string;
      userPBContact?: string;
      userPBEmail?: string;
      tanggalPemesanan?: Date;
      tanggalPemakaman?: Date;
    }

    const payload: PemesananPayload = {
      namaJenazah: formData.get("namajenazah") as string,
      blokId: selectedBlok,
      lokasi: formData.get("lokasi") as string,
      silsilah: formData.get("silsilah") as string,
      notes: formData.get("notes") as string,
      emergencyName: formData.get("emergencyName") as string,
      emergencyContact: formData.get("emergencyContact") as string,
      diriSendiri,
      tanggalPemakaman: formData.get("tanggalPemakaman")
        ? new Date(formData.get("tanggalPemakaman") as string)
        : undefined,
      tanggalPemesanan: formData.get("tanggalPemesanan")
        ? new Date(formData.get("tanggalPemesanan") as string)
        : undefined,
    };

    if (useExisting && selectedUser) {
      payload.existingUserId = selectedUser.id;
      payload.pjName = selectedUser.name || undefined;
      payload.pjContact = selectedUser.contact || undefined;
      payload.emergencyName = selectedUser.emergencyName || undefined;
      payload.emergencyContact = selectedUser.emergencyContact || undefined;

      payload.userPAName = formData.get("namapj") as string;
      payload.userPAContact = formData.get("kontak") as string;
      payload.userPAEmail = formData.get("email") as string;
      payload.userPAKTP = formData.get("ktpNum") as string;

      if (!diriSendiri) {
        payload.userPBName = formData.get("namajenazah") as string;
        payload.userPBContact = "";
        payload.userPBEmail = "";
      }
    } else {
      payload.userPAName = formData.get("namapj") as string;
      payload.userPAContact = formData.get("kontak") as string;
      payload.userPAEmail = formData.get("email") as string;
      payload.userPAKTP = formData.get("ktpNum") as string;
      payload.pjName = formData.get("namapj") as string;
      payload.pjContact = formData.get("kontak") as string;
      payload.emergencyName = formData.get("emergencyName") as string;
      payload.emergencyContact = formData.get("emergencyContact") as string;

      if (!diriSendiri) {
        payload.userPBName = formData.get("namajenazah") as string;
        payload.userPBContact = "";
        payload.userPBEmail = "";
      }
    }

    try {
      const res = await fetch("/api/pemesanan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        console.log(payload);
        alert("Pemesanan berhasil disimpan!");
        router.push("/layanan/pesan/status");
        form.reset();
        setSelectedUser(null);
        setUseExisting(false);
      } else {
        const data = await res.json();
        alert(data?.error || "Terjadi kesalahan saat menyimpan data.");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal mengirim permintaan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header hideBanner />

      <main className="flex-1 flex justify-center items-start py-12 px-4 sm:px-8 mb-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 space-y-10"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">Form Pemesanan Makam</h2>
            <p className="text-sm text-gray-600 mt-1">
              Silakan lengkapi data di bawah ini untuk melakukan pemesanan.
            </p>
          </div>

          {/* Penanggung Jawab Section */}
          <section className="space-y-5">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2 rounded-lg shadow-md">
                <UserCircle className="w-5 h-5 text-white" />
              </div>
              Penanggung Jawab
            </h3>

            <RadioGroup
              defaultValue={useExisting ? "existing" : "new"}
              onValueChange={(val) => setUseExisting(val === "existing")}
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="new" id="new" />
                <Label htmlFor="new">Buat Baru</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="existing" id="existing" />
                <Label htmlFor="existing">Gunakan Data Ada</Label>
              </div>
            </RadioGroup>

            {useExisting ? (
              <div className="space-y-2">
                <div className="flex flex-col">
                  <Label htmlFor="userSearch" className="mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    Cari Penanggung Jawab
                  </Label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="userSearch"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Ketik nama atau kontak..."
                      className="pl-10"
                    />
                  </div>
                </div>

                <ul className="border border-gray-200 rounded-lg bg-white divide-y divide-gray-100 max-h-56 overflow-y-auto shadow-sm">
                  {users.length > 0 ? (
                    users.map((u) => (
                      <li
                        key={u.id}
                        onClick={() => {
                          setSelectedUser(u);
                          setSearchTerm(u.name || "");
                        }}
                        className={`px-4 py-2 text-sm cursor-pointer transition ${selectedUser?.id === u.id ? "bg-blue-50 text-blue-700" : "hover:bg-gray-50 text-gray-700"}`}
                      >
                        {u.name} — {u.contact}
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-2 text-sm text-gray-500">Tidak ada hasil ditemukan</li>
                  )}
                </ul>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Label htmlFor="namapj" className="mb-2 flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-purple-600" />
                    Nama Penanggung Jawab
                  </Label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="namapj"
                      name="namapj"
                      placeholder="Masukkan Nama PJ"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="kontak" className="mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-600" />
                    No. Kontak
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="kontak"
                      name="kontak"
                      placeholder="08XXXXXXXXX"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex flex-col col-span-2">
                  <Label htmlFor="email" className="mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-blue-600" />
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="user@gmail.com"
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="emergencyName" className="mb-2 flex items-center gap-2">
                    <UserCircle className="w-4 h-4 text-indigo-600" />
                    Nama Kontak Darurat
                  </Label>
                  <div className="relative">
                    <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="emergencyNamet"
                      name="emergencyName"
                      placeholder="Masukkan Nama"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <Label htmlFor="emergencyContact" className="mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-teal-600" />
                    No. Kontak Darurat
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="emergencyContact"
                      name="emergencyContact"
                      placeholder="08XXXXXXXXX"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex flex-col col-span-2">
                  <Label htmlFor="ktpNum" className="mb-2 flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-amber-600" />
                    No KTP Pemesan
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="ktpNum"
                      name="ktpNum"
                      maxLength={16}
                      placeholder="Masukkan 16 digit nomor KTP"
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Data Pemesanan Section */}
          <section className="space-y-5">
            <h3 className="text-lg font-bold text-slate-800 border-b pb-2 flex items-center gap-2">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg shadow-md">
                <FileText className="w-5 h-5 text-white" />
              </div>
              Data Pemesanan
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col col-span-2">
                <Label htmlFor="namajenazah" className="mb-2 flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-rose-600" />
                  Nama Jenazah
                </Label>
                <div className="relative">
                  <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="namajenazah"
                    name="namajenazah"
                    required
                    placeholder="Nama Jenazah"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="blokId" className="mb-2 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-indigo-600" />
                  Blok Kavling
                </Label>
                <Select
                  name="blokId"
                  required
                  onValueChange={(value) => setSelectedBlok(value)} // Keep this for state tracking if needed
                >
                  <SelectTrigger className="w-full">
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
              </div>
              <div className="flex flex-col">
                <Label htmlFor="lokasi" className="mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  Lokasi Pemakaman
                </Label>
                <Select name="lokasi" required onValueChange={(value) => setLokasi(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Lokasi Pemakaman" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Karang Anyar">Karang Anyar</SelectItem>
                    <SelectItem value="Dalem Kaum">Dalem Kaum</SelectItem>
                    <SelectItem value="Dayeuh Kolot">Dayeuh Kolot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="silsilah" className="mb-2 flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-600" />
                  Hubungan dengan pemesan
                </Label>
                <Select name="silsilah" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Silsilah" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="diri sendiri">Diri Sendiri</SelectItem>
                    <SelectItem value="anak">Anak</SelectItem>
                    <SelectItem value="orang tua">Orang Tua</SelectItem>
                    <SelectItem value="kakak/adik">Kakak/Adik</SelectItem>
                    <SelectItem value="sepupu">Sepupu</SelectItem>
                    <SelectItem value="keponakan">Keponakan</SelectItem>
                    <SelectItem value="paman/bibi">Paman/Bibi</SelectItem>
                    <SelectItem value="kakek/nenek">Kakek/Nenek</SelectItem>
                    <SelectItem value="cucu">Cucu</SelectItem>
                    <SelectItem value=">2 generasi di atas">{">2 Generasi di Atas"}</SelectItem>
                    <SelectItem value=">2 generasi di bawah">{">2 Generasi di Bawah"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col flex-1">
                  <Label htmlFor="jenismakam" className="mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-cyan-600" />
                    Jenis Makam
                  </Label>
                  <Select
                    name="jenismakam"
                    required
                    onValueChange={(value) => setJenisMakam(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih Jenis Makam" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="baru">Baru</SelectItem>
                      <SelectItem value="tumpuk">Tumpuk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col flex-1">
                <Label htmlFor="tanggalPemesan" className="mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" />
                  Tanggal Pemesanan
                </Label>
                <DatePicker
                  id="tanggalPemesanan"
                  name="tanggalPemesanan"
                  className="w-full border border-gray-300 rounded-md hover:border-blue-400 transition-colors"
                  onChange={() => {}}
                />
              </div>
              <div className="flex flex-col flex-1">
                <Label htmlFor="tanggalPemakaman" className="mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-600" />
                  Tanggal Pemakaman
                </Label>

                <DatePicker
                  id="tanggalPemakaman"
                  name="tanggalPemakaman"
                  className="w-full border border-gray-300 rounded-md hover:border-blue-400 transition-colors"
                  onChange={() => {}}
                />

                <span className="text-sm text-gray-600 mt-1">*Diisi jika telah dimakamkan.</span>
              </div>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="notes" className="mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4 text-violet-600" />
                Penjelasan Tambahan
              </Label>
              <Textarea
                id="notes"
                name="notes"
                rows={4}
                required
                placeholder="Tuliskan penjelasan tambahan terkait pemesanan..."
                className="resize-none"
              />
            </div>
          </section>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button danger onClick={() => router.push("/")} className="min-w-[100px]">
              Batal
            </Button>

            <Button type="primary" htmlType="submit" loading={loading} className="min-w-[100px]">
              Kirim
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
