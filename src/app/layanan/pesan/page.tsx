"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

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

export default function Pemesanan() {
  const [blokList, setBlokList] = useState<
    { id_blok: string; lokasi: string; status_blok: string }[]
  >([]);
  const [lokasi, setLokasi] = useState<string>("");
  const [jenisMakam, setJenisMakam] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const normalizeDate = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const today = normalizeDate(new Date());
  const sixMonthsLater = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
  const fiveYearsLater = new Date(
    sixMonthsLater.getFullYear() + 5,
    sixMonthsLater.getMonth(),
    sixMonthsLater.getDate()
  );

  const minDate = normalizeDate(sixMonthsLater);
  const maxDate = normalizeDate(fiveYearsLater);

  const disableDate = (current: dayjs.Dayjs) => {
    if (!current) return false;
    return current.isBefore(dayjs(minDate), "day") || current.isAfter(dayjs(maxDate), "day");
  };

  const [masaAktif, setMasaAktif] = useState({
    day: minDate.getDate(),
    month: minDate.getMonth() + 1,
    year: minDate.getFullYear(),
  });

  const [useExisting, setUseExisting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!useExisting) return;
      const endpoint = searchTerm.trim()
        ? `/api/penanggungJawab?query=${encodeURIComponent(searchTerm)}`
        : "/api/penanggungJawab";

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
      .then((data) => setBlokList(data))
      .catch(console.error);
  }, [lokasi, jenisMakam]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const selectedDate = new Date(masaAktif.year, masaAktif.month - 1, masaAktif.day);
    if (selectedDate < minDate || selectedDate > maxDate) {
      alert(
        `Masa aktif harus antara ${minDate.toLocaleDateString("id-ID")} dan ${maxDate.toLocaleDateString("id-ID")}`
      );
      setLoading(false);
      return;
    }

    const diriSendiri = (formData.get("silsilah") as string) === "diri sendiri";

    console.log(diriSendiri);

    interface PemesananPayload {
      namaJenazah: string;
      id_blok: string;
      lokasi: string;
      silsilah: string;
      notes: string;
      masaAktif: string;
      diriSendiri: boolean;
      existingUserId?: string;
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
      id_blok: formData.get("id_blok") as string,
      lokasi: formData.get("lokasi") as string,
      silsilah: formData.get("silsilah") as string,
      notes: formData.get("notes") as string,
      masaAktif: `${masaAktif.year}-${masaAktif.month.toString().padStart(2, "0")}-${masaAktif.day.toString().padStart(2, "0")}`,
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
      payload.pjName = selectedUser.name;
      payload.pjContact = selectedUser.contact || undefined;

      payload.userPAName = formData.get("namapj") as string;
      payload.userPAContact = formData.get("kontak") as string;
      payload.userPAEmail = formData.get("email") as string;
      payload.userPAKTP = formData.get("ktp_num") as string;

      if (!diriSendiri) {
        payload.userPBName = formData.get("namajenazah") as string;
        payload.userPBContact = "";
        payload.userPBEmail = "";
      }
    } else {
      payload.userPAName = formData.get("namapj") as string;
      payload.userPAContact = formData.get("kontak") as string;
      payload.userPAEmail = formData.get("email") as string;
      payload.userPAKTP = formData.get("ktp_num") as string;
      payload.pjName = formData.get("namapj") as string;
      payload.pjContact = formData.get("kontak") as string;

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header hideBanner />

      <main className="flex-1 flex justify-center items-start py-12 px-4 sm:px-8 mb-16">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-gray-400 p-8 space-y-10"
        >
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800">Form Pemesanan Makam</h2>
            <p className="text-sm text-gray-500 mt-1">
              Silakan lengkapi data di bawah ini untuk melakukan pemesanan.
            </p>
          </div>

          {/* Penanggung Jawab Section */}
          <section className="space-y-5">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Penanggung Jawab</h3>

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
                  <Label htmlFor="userSearch" className="mb-2">
                    Cari Penanggung Jawab
                  </Label>
                  <Input
                    id="userSearch"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Ketik nama atau kontak..."
                  />
                </div>

                <ul className="border border-gray-200 rounded-lg bg-white divide-y divide-gray-100 max-h-56 overflow-y-auto shadow-sm">
                  {users.length > 0 ? (
                    users.map((u) => (
                      <li
                        key={u.id}
                        onClick={() => {
                          setSelectedUser(u);
                          setSearchTerm(u.name);
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
                <div className="flex flex-col col-span-2">
                  <Label htmlFor="namapj" className="mb-2">
                    Nama Penanggung Jawab
                  </Label>
                  <Input id="namapj" name="namapj" placeholder="Masukkan Nama PJ" required />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="kontak" className="mb-2">
                    No. Kontak
                  </Label>
                  <Input id="kontak" name="kontak" placeholder="08XXXXXXXXX" required />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="email" className="mb-2">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="user@gmail.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="ktp_num" className="mb-2">
                    No KTP Pemesan
                  </Label>
                  <Input
                    id="ktp_num"
                    name="ktp_num"
                    maxLength={16}
                    placeholder="Masukkan 16 digit nomor KTP"
                  />
                </div>
              </div>
            )}
          </section>

          {/* Data Pemesanan Section */}
          <section className="space-y-5">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Data Pemesanan</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col col-span-2">
                <Label htmlFor="namajenazah" className="mb-2">
                  Nama Jenazah
                </Label>
                <Input id="namajenazah" name="namajenazah" required placeholder="Nama Jenazah" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="id_blok" className="mb-2">
                  Blok Kavling
                </Label>
                <Select name="id_blok" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Blok" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {blokList.map((b) => (
                      <SelectItem key={b.id_blok} value={b.id_blok}>
                        {b.id_blok} ({b.lokasi}) ({b.status_blok})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="lokasi" className="mb-2">
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
                <Label htmlFor="silsilah" className="mb-2">
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
                  <Label htmlFor="jenismakam" className="mb-2">
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
                <Label htmlFor="tanggalPemesan" className="mb-2">
                  Tanggal Pemesanan
                </Label>
                <DatePicker
                  id="tanggalPemesanan"
                  name="tanggalPemesanan"
                  className="w-full border border-black"
                  onChange={() => {}}
                />
              </div>
              <div className="flex flex-col flex-1">
                <Label htmlFor="tanggalPemakaman" className="mb-2">
                  Tanggal Pemakaman
                </Label>

                <DatePicker
                  id="tanggalPemakaman"
                  name="tanggalPemakaman"
                  className="w-full border border-black"
                  onChange={() => {}}
                />

                <span className="text-sm text-gray-600 mt-1">
                  *Diisi jika pemesan telah dimakamkan.
                </span>
              </div>
            </div>
          </section>

          {/* Detail Tambahan Section */}
          <section className="space-y-5">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Detail Tambahan</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <Label className="block text-sm text-gray-600 mb-3 w-full">
                  Masa berlaku makam sampai dengan
                </Label>

                <DatePicker
                  className="w-full"
                  format="DD MM YYYY"
                  disabledDate={disableDate}
                  onChange={(value) => {
                    if (!value) return;
                    setMasaAktif({
                      day: value.date(),
                      month: value.month() + 1,
                      year: value.year(),
                    });
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <Label htmlFor="notes" className="mb-2">
                Penjelasan Tambahan
              </Label>
              <Textarea
                id="notes"
                name="notes"
                rows={4}
                required
                placeholder="Tuliskan penjelasan tambahan terkait pemesanan..."
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
