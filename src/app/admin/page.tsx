"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { NotificationBoard } from "@/components/NotificationsBoard";

export default function Admin() {
  const user = useStore(authStore, (s) => s.user);

  const cards = [
    {
      title: "Pemesanan",
      imgSrc: "/images/booking-removebg-preview 1.png",
      href: "/admin/layanan/pesan",
    },
    {
      title: "Status Pemesanan",
      imgSrc: "/images/status pemesanan.png",
      href: "/admin/layanan/pesan/status",
    },
    {
      title: "Daftar Makam",
      imgSrc: "/images/list makam1.png",
      href: "/admin/layanan/makam",
    },
    {
      title: "Denah Makam",
      imgSrc: "/images/denah makam1.png",
      href: "/admin/layanan/denah",
    },
    {
      title: "Histori Pengguna",
      imgSrc: "/images/history pengguna.png",
      href: "/admin/layanan/histori",
    },
    {
      title: "Kontak Admin",
      imgSrc: "/images/kontak.png",
      href: "/admin/layanan/kontak",
    },
  ];

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      user: "Budi",
      type: "lewat-pembayaran",
      message: "Telah melewati batas pembayaran.",
      date: "2025-08-25",
      time: "9:41 AM",
    },
    {
      id: 2,
      user: "Agus",
      type: "approved",
      message: "Pesanan telah di-approve.",
      date: "2025-08-25",
      time: "10:15 AM",
    },
    {
      id: 3,
      user: "Rizky",
      type: "tidak-approved",
      message: "Pesanan tidak di-approve.",
      date: "2025-08-25",
      time: "10:15 AM",
    },
    {
      id: 4,
      user: "Dewi",
      type: "pembayaran",
      message: "Telah melakukan pembayaran.",
      date: "2025-08-25",
      time: "10:15 AM",
    },
    {
      id: 5,
      user: "Sari",
      type: "perpanjangan",
      message: "Telah melakukan perpanjangan.",
      date: "2025-08-25",
      time: "11:05 AM",
    },
    {
      id: 6,
      user: "Fajar",
      type: "lewat-perpanjangan",
      message: "Melewati batas perpanjangan.",
      date: "2025-08-25",
      time: "11:05 AM",
    },
    {
      id: 7,
      user: "Indra",
      type: "perpanjangan",
      message: "Telah melakukan perpanjangan.",
      date: "2025-08-25",
      time: "11:05 AM",
    },
    {
      id: 8,
      user: "Putri",
      type: "perpanjangan",
      message: "Telah melakukan perpanjangan.",
      date: "2025-08-25",
      time: "11:05 AM",
    },
  ]);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {user?.role !== "guest" && (
        <div>
          <div className="text-center text-gray-700">
            <h1 className="text-4xl font-bold mb-6">Pemberitahuan</h1>
          </div>
          <div className="w-full max-w-[900px] mx-auto px-4 sm:px-6 mt-8">
            <NotificationBoard
              notifications={notifications}
              onMarkAsRead={handleMarkAsRead}
              backgroundImage="/images/18930348_rm435-030-1.png"
            />
          </div>
        </div>
      )}

      <main className="flex-1 p-4 sm:p-8 lg:p-24 pb-28 relative bg-white">
        <div className="text-center text-gray-700">
          <h1 className="text-4xl font-bold mb-18">Layanan</h1>
        </div>
        <div className="w-full px-2 sm:px-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
            {cards.map(({ title, imgSrc, href }, i) => {
              const isLastOdd = cards.length % 2 === 1 && i === cards.length - 1;
              return (
                <Link
                  key={i}
                  href={href}
                  className={`w-full ${isLastOdd ? "sm:col-span-2 sm:justify-self-center" : ""}`}
                >
                  <div className="bg-white border border-gray-400 rounded-xl transition duration-300 transform hover:-translate-y-1 flex flex-col items-center p-4 sm:p-6 w-full h-full">
                    <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-white flex items-center justify-center">
                      <Image src={imgSrc} alt={title} fill className="object-contain" priority />
                    </div>
                    <h3 className="text-lg font-semibold text-center">{title}</h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
