"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, CheckCircle, MapPin, List, CreditCard, Users, Phone } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Pemesanan",
    subtitle: "Daftar pemesanan makam baru",
    icon: <Calendar className="w-4 h-4" />,
    href: "/layanan/pesan",
    accent: "#1d70b8",
  },
  {
    title: "Status Pemesanan",
    subtitle: "Cek dan kelola status pesanan",
    icon: <CheckCircle className="w-4 h-4" />,
    href: "/layanan/pesan/status",
    accent: "#00703c",
  },
  {
    title: "Daftar Makam",
    subtitle: "Inventaris seluruh blok makam",
    icon: <List className="w-4 h-4" />,
    href: "/layanan/makam",
    accent: "#505a5f",
  },
  {
    title: "Denah Makam",
    subtitle: "Peta interaktif lokasi makam",
    icon: <MapPin className="w-4 h-4" />,
    href: "/layanan/denah",
    accent: "#f47738",
  },
  {
    title: "Pembayaran",
    subtitle: "Rekap iuran dan status bayar",
    icon: <CreditCard className="w-4 h-4" />,
    href: "/layanan/pembayaran",
    accent: "#d4351c",
  },
  {
    title: "Daftar Penanggung Jawab",
    subtitle: "Manajemen data penanggung jawab",
    icon: <Users className="w-4 h-4" />,
    href: "/layanan/penanggung-jawab",
    accent: "#4c2c92",
  },
  {
    title: "Kontak Admin",
    subtitle: "Direktori kontak pengelola",
    icon: <Phone className="w-4 h-4" />,
    href: "/layanan/kontak",
    accent: "#0b0c0c",
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header />

      <main style={{ flex: 1, padding: "clamp(1rem, 2vw, 2rem) clamp(0.75rem, 2vw, 2rem)" }}>
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "2px solid #0b0c0c",
            paddingBottom: 8,
            marginBottom: 16,
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontSize: "clamp(0.9375rem, 1.5vw, 1.125rem)",
              color: "#0b0c0c",
              margin: 0,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
            }}
          >
            Layanan Sistem
          </h2>
          <span
            style={{
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "#505a5f",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {services.length} Modul Aktif
          </span>
        </div>

        {/* Polaris-style action list grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(clamp(220px, 25vw, 300px), 1fr))",
            gap: 1,
            border: "1px solid #b1b4b6",
            background: "#b1b4b6",
          }}
        >
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              style={{
                display: "flex",
                alignItems: "stretch",
                background: "#fff",
                textDecoration: "none",
                color: "inherit",
                transition: "background 0.08s",
              }}
              className="group"
            >
              {/* Accent bar */}
              <div
                style={{
                  width: 4,
                  background: service.accent,
                  flexShrink: 0,
                }}
              />

              {/* Content */}
              <div
                style={{
                  padding: "clamp(10px, 1.2vw, 16px) clamp(10px, 1.2vw, 16px)",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
                className="group-hover:bg-[#f3f2f1] transition-colors"
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    background: service.accent,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {service.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      color: "#0b0c0c",
                      lineHeight: 1.3,
                      marginBottom: 2,
                    }}
                  >
                    {service.title}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "#505a5f",
                      lineHeight: 1.3,
                    }}
                  >
                    {service.subtitle}
                  </div>
                </div>
                <div
                  style={{
                    marginLeft: "auto",
                    color: "#b1b4b6",
                    fontSize: "1rem",
                    flexShrink: 0,
                  }}
                  className="group-hover:text-[#1d70b8] transition-colors"
                >
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* System info bar */}
        <div
          style={{
            marginTop: 16,
            padding: "8px 12px",
            background: "#fff",
            border: "1px solid #b1b4b6",
            display: "flex",
            flexWrap: "wrap",
            gap: "8px 24px",
          }}
        >
          {[
            { label: "Sistem", value: "TIMGRAVID" },
            { label: "Pengelola", value: "Yayasan Sajarah Timbanganten" },
            { label: "Status", value: "Operasional" },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span
                style={{
                  fontSize: "0.6875rem",
                  fontWeight: 700,
                  color: "#505a5f",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {label}:
              </span>
              <span style={{ fontSize: "0.8125rem", color: "#0b0c0c", fontWeight: 600 }}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
