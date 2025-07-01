"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import {
  FiCreditCard,
  FiRefreshCcw,
  FiAlertTriangle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";
import { useAuthStore, } from "@/stores/useAuthStore";

export default function Admin() {
  const role = useAuthStore((state) => state.role);


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
      title: "List Makam",
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
      time: "9:41 AM",
    },
    {
      id: 2,
      user: "Agus",
      type: "approved",
      message: "Pesanan telah di-approve.",
      time: "10:15 AM",
    },
    {
      id: 3,
      user: "Rizky",
      type: "tidak-approved",
      message: "Pesanan tidak di-approve.",
      time: "10:15 AM",
    },
    {
      id: 4,
      user: "Dewi",
      type: "pembayaran",
      message: "Telah melakukan pembayaran.",
      time: "10:15 AM",
    },
    {
      id: 5,
      user: "Sari",
      type: "perpanjangan",
      message: "Telah melakukan perpanjangan.",
      time: "11:05 AM",
    },
    {
      id: 6,
      user: "Fajar",
      type: "lewat-perpanjangan",
      message: "Melewati batas perpanjangan.",
      time: "11:05 AM",
    },
    {
      id: 7,
      user: "Indra",
      type: "perpanjangan",
      message: "Telah melakukan perpanjangan.",
      time: "11:05 AM",
    },
    {
      id: 8,
      user: "Putri",
      type: "perpanjangan",
      message: "Telah melakukan perpanjangan.",
      time: "11:05 AM",
    },
  ]);

  const handleMarkAsRead = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="text-center text-gray-700">
        <h1 className="text-4xl font-bold mb-6">
          Layanan Pemakaman Timbanganten
        </h1>
        <p className="text-lg text-gray-600">
          Your supporting text or description goes here. You can customize this content.
        </p>
      </div>

      {/* Notification Container (only for non-guest users) */}
      {role !== "guest" && (
        <div className="w-[900px] mx-auto px-4 mt-8">
          <div className="bg-[#223D3C] text-white rounded-t-lg px-6 py-4 flex items-center">
            <svg
              className="w-6 h-6 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <h2 className="text-xl font-semibold">Pemberitahuan</h2>
          </div>

          <section
            className="bg-cover bg-center bg-white rounded-b-lg shadow-md p-6 border-x-1 border-b-1 border-black"
            style={{ backgroundImage: `url('/images/18930348_rm435-030-1.png')` }}
          >
            <div className="space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto pr-4">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-300/70 hover:bg-gray-500/80 transition"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <div className="w-6 h-6 text-gray-700 flex-shrink-0">
                      {notif.type === "pembayaran" && <FiCreditCard size={24} />}
                      {notif.type === "perpanjangan" && <FiRefreshCcw size={24} />}
                      {["lewat-pembayaran", "lewat-perpanjangan"].includes(notif.type) && (
                        <FiAlertTriangle size={24} className="text-red-600" />
                      )}
                      {notif.type === "approved" && (
                        <FiCheckCircle size={24} className="text-green-600" />
                      )}
                      {notif.type === "tidak-approved" && (
                        <FiXCircle size={24} className="text-red-600" />
                      )}
                      {![
                        "pembayaran",
                        "perpanjangan",
                        "lewat-pembayaran",
                        "lewat-perpanjangan",
                        "approved",
                        "tidak-approved",
                      ].includes(notif.type) && <FiCreditCard size={24} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{notif.user}</p>
                      <p className="text-sm text-gray-600">{notif.message}</p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">{notif.time}</span>
                  </div>

                  <button
                    onClick={() => handleMarkAsRead(notif.id)}
                    className="ml-4 px-3 py-1 text-sm rounded-md border border-gray-600 text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-colors cursor-pointer"
                    aria-label="Mark notification as read"
                  >
                    Mark as read
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      <main className="flex-1 p-24 relative bg-white">
        <div className="mx-auto w-full max-w-4xl px-4 mt-12 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {cards.map(({ title, imgSrc, href }, i) => {
              const isLastOdd = cards.length % 2 === 1 && i === cards.length - 1;
              return (
                <Link
                  key={i}
                  href={href}
                  className={`w-full max-w-sm mx-auto ${isLastOdd ? "sm:col-span-2 sm:justify-self-center" : ""}`}
                >
                  <div
                    className="bg-white rounded-xl transition duration-300 transform hover:-translate-y-1 flex flex-col items-center p-6 w-full h-full"
                    style={{
                      boxShadow: "-6px 6px 20px rgba(34, 61, 60, 0.2)",
                    }}
                  >
                    <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg bg-white flex items-center justify-center">
                      <Image
                        src={imgSrc}
                        alt={title}
                        fill
                        className="object-contain"
                        priority
                      />
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
