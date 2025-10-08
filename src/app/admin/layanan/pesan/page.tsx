"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User } from "@/lib/types";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";

import { Button } from "antd";

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

export default function Pemesanan() {
  const user = useStore(authStore, (s) => s.user);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const normalizeDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  const today = normalizeDate(new Date());
  const sixMonthsLater = new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());
  const fiveYearsLater = new Date(
    sixMonthsLater.getFullYear() + 5,
    sixMonthsLater.getMonth(),
    sixMonthsLater.getDate()
  );

  const minDate = normalizeDate(sixMonthsLater);
  const maxDate = normalizeDate(fiveYearsLater);

  const years = Array.from(
    { length: maxDate.getFullYear() - minDate.getFullYear() + 1 },
    (_, i) => minDate.getFullYear() + i
  );

  const [masaAktif, setMasaAktif] = useState({
    day: minDate.getDate(),
    month: minDate.getMonth() + 1,
    year: minDate.getFullYear(),
  });

  const [useExisting, setUseExisting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getValidDays = (month: number, year: number) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    const validDays = [];
    for (let day = 1; day <= daysInMonth; day++) validDays.push(day);
    return validDays;
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const endpoint = searchTerm.trim()
        ? `/api/user?query=${encodeURIComponent(searchTerm)}`
        : "/api/user";

      fetch(endpoint)
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error(err));
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

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
      return;
    }

    const requiredFields = [
      { key: "namajenazah", label: "Nama Jenazah" },
      { key: "blok", label: "Blok Kavling" },
      { key: "silsilah", label: "Silsilah PJ" },
      { key: "lokasi", label: "Lokasi Pemakaman" },
      { key: "notes", label: "Penjelasan" },
    ];

    if (!useExisting) {
      requiredFields.push(
        { key: "namapj", label: "Nama Penanggung Jawab" },
        { key: "kontak", label: "Kontak Penanggung Jawab" },
        { key: "email", label: "Email Penanggung Jawab" }
      );
    }

    for (const { key, label } of requiredFields) {
      const value = formData.get(key);
      if (!value || (typeof value === "string" && value.trim() === "")) {
        alert(`Field "${label}" wajib diisi.`);
        return;
      }
    }

    const day = masaAktif.day.toString().padStart(2, "0");
    const month = masaAktif.month.toString().padStart(2, "0");
    const year = masaAktif.year.toString();
    const masaAktifStr = `${year}-${month}-${day}`;
    let pjId;

    if (useExisting && selectedUser) {
      pjId = selectedUser.id;
      await fetch(`/api/user?id=${pjId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedUser.name,
          contact: selectedUser.contact,
          email: selectedUser.email,
          status: selectedUser.status === "AKTIF" ? "AKTIF/PESAN" : "PESAN",
        }),
      });
    } else {
      const newUserRes = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("namapj"),
          contact: formData.get("kontak"),
          email: formData.get("email"),
          status: "PESAN",
        }),
      });

      if (!newUserRes.ok) {
        alert("Gagal membuat penanggung jawab baru.");
        return;
      }

      const newUser = await newUserRes.json();
      pjId = newUser.id;
    }

    const payload = {
      nama_penanggung_jawab: (formData.get("namapj") as string) ?? selectedUser?.name,
      kontak_penanggung_jawab: (formData.get("kontak") as string) ?? selectedUser?.contact,
      nama: formData.get("namajenazah") as string,
      blok: formData.get("blok") as string,
      silsilah: formData.get("silsilah") as string,
      lokasi: formData.get("lokasi") as string,
      description: formData.get("notes") as string,
      masa_aktif: masaAktifStr,
      userId: pjId,
      ext: "PENDING",
      payment: "PENDING",
      approved: "PENDING",
    };

    try {
      const res = await fetch("/api/makamStatus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Pemesanan berhasil disimpan!");
        router.push("/admin/layanan/pesan/status");
        form.reset();
      } else {
        alert("Terjadi kesalahan saat menyimpan data.");
      }
    } catch (err) {
      console.error("Error:", err);
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
                        className={`px-4 py-2 text-sm cursor-pointer transition ${
                          selectedUser?.id === u.id
                            ? "bg-blue-50 text-blue-700"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
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
              </div>
            )}
          </section>

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
                <Label htmlFor="blok" className="mb-2">
                  Blok Kavling
                </Label>
                <Input id="blok" name="blok" required placeholder="Masukkan kode blok" />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="silsilah" className="mb-2">
                  Silsilah PJ
                </Label>
                <Select name="silsilah" required>
                  <SelectTrigger>
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
              <div className="flex flex-col col-span-2">
                <Label htmlFor="lokasi" className="mb-2">
                  Lokasi Pemakaman
                </Label>
                <Select name="lokasi" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Lokasi Pemakaman" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Karang Anyar">Karang Anyar</SelectItem>
                    <SelectItem value="Dalem Kaum">Dalem Kaum</SelectItem>
                    <SelectItem value="Dayeuhkolot">Dayeuhkolot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </section>

          <section className="space-y-5">
            <h3 className="text-lg font-medium text-gray-800 border-b pb-2">Detail Tambahan</h3>

            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col">
                <Label className="mb-2">Hari</Label>
                <Select
                  value={masaAktif.day.toString()}
                  onValueChange={(v) => setMasaAktif({ ...masaAktif, day: parseInt(v) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Hari" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {getValidDays(masaAktif.month, masaAktif.year).map((d) => (
                      <SelectItem key={d} value={d.toString()}>
                        {d}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col">
                <Label className="mb-2">Bulan</Label>
                <Select
                  value={masaAktif.month.toString()}
                  onValueChange={(v) => setMasaAktif({ ...masaAktif, month: parseInt(v) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bulan" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                      <SelectItem key={m} value={m.toString()}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col">
                <Label className="mb-2">Tahun</Label>
                <Select
                  value={masaAktif.year.toString()}
                  onValueChange={(v) => setMasaAktif({ ...masaAktif, year: parseInt(v) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Tahun" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {years.map((y) => (
                      <SelectItem key={y} value={y.toString()}>
                        {y}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col">
              <Label htmlFor="notes" className="mb-2">
                Penjelasan
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
            <Button danger onClick={() => router.push("/admin")} className="min-w-[100px]">
              Batal
            </Button>

            {user?.role === "admin" && (
              <Button type="primary" htmlType="submit" loading={loading} className="min-w-[100px]">
                Kirim
              </Button>
            )}
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
