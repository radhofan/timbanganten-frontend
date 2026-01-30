"use client";
// import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, CheckCircle, MapPin, List, CreditCard, Users, Phone } from "lucide-react";
// import NotificationBoard from "@/components/NotificationsBoard";

export default function Admin() {
  // const [notifications, setNotifications] = useState([
  //   {
  //     id: 1,
  //     user: "Budi",
  //     type: "lewat-pembayaran",
  //     message: "Telah melewati batas pembayaran.",
  //     date: "2025-08-25",
  //     time: "9:41 AM",
  //   },
  //   {
  //     id: 2,
  //     user: "Agus",
  //     type: "approved",
  //     message: "Pesanan telah di-approve.",
  //     date: "2025-08-25",
  //     time: "10:15 AM",
  //   },
  //   {
  //     id: 3,
  //     user: "Rizky",
  //     type: "tidak-approved",
  //     message: "Pesanan tidak di-approve.",
  //     date: "2025-08-25",
  //     time: "10:15 AM",
  //   },
  //   {
  //     id: 4,
  //     user: "Dewi",
  //     type: "pembayaran",
  //     message: "Telah melakukan pembayaran.",
  //     date: "2025-08-25",
  //     time: "10:15 AM",
  //   },
  //   {
  //     id: 5,
  //     user: "Sari",
  //     type: "perpanjangan",
  //     message: "Telah melakukan perpanjangan.",
  //     date: "2025-08-25",
  //     time: "11:05 AM",
  //   },
  // ]);

  // const handleMarkAsRead = (id: number) => {
  //   setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  // };

  const services = [
    {
      title: "Pemesanan",
      icon: <Calendar className="w-12 h-12" />,
      color: "from-blue-500 to-blue-600",
      href: "/layanan/pesan",
    },
    {
      title: "Status Pemesanan",
      icon: <CheckCircle className="w-12 h-12" />,
      color: "from-emerald-500 to-emerald-600",
      href: "/layanan/pesan/status",
    },
    {
      title: "Daftar Makam",
      icon: <List className="w-12 h-12" />,
      color: "from-purple-500 to-purple-600",
      href: "/layanan/makam",
    },
    {
      title: "Denah Makam",
      icon: <MapPin className="w-12 h-12" />,
      color: "from-amber-500 to-amber-600",
      href: "/layanan/denah",
    },
    {
      title: "Pembayaran",
      icon: <CreditCard className="w-12 h-12" />,
      color: "from-rose-500 to-rose-600",
      href: "/layanan/pembayaran",
    },
    {
      title: "Daftar Penanggung Jawab",
      icon: <Users className="w-12 h-12" />,
      color: "from-indigo-500 to-indigo-600",
      href: "/layanan/penanggung-jawab",
    },
    {
      title: "Kontak Admin",
      icon: <Phone className="w-12 h-12" />,
      color: "from-teal-500 to-teal-600",
      href: "/layanan/kontak",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Notifications Section */}
        {/* <NotificationBoard notifications={notifications} handleMarkAsRead={handleMarkAsRead} /> */}

        {/* Services Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center">Layanan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const isLastCard = index === services.length - 1;
              return (
                <a
                  key={index}
                  href={service.href}
                  className={`group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden ${
                    isLastCard ? "lg:col-start-2" : ""
                  }`}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                  <div className="p-8 flex flex-col items-center text-center relative z-10">
                    <div
                      className={`bg-gradient-to-br ${service.color} text-white p-6 rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </a>
              );
            })}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
