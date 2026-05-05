"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, CheckCircle, Map, List, CreditCard, Users, Phone } from "lucide-react";
import Link from "next/link";

const services = [
  { title: "Pemesanan", subtitle: "Daftar pemesanan makam baru", icon: Calendar, href: "/layanan/pesan", bg: "#d0021b" },
  { title: "Status Pemesanan", subtitle: "Cek dan kelola status pesanan", icon: CheckCircle, href: "/layanan/pesan/status", bg: "#1351a8" },
  { title: "Daftar Makam", subtitle: "Inventaris seluruh blok makam", icon: List, href: "/layanan/makam", bg: "#1a2e5a" },
  { title: "Pembayaran", subtitle: "Rekap iuran dan status bayar", icon: CreditCard, href: "/layanan/pembayaran", bg: "#000000" },
  { title: "Penanggung Jawab", subtitle: "Manajemen data penanggung jawab", icon: Users, href: "/layanan/penanggung-jawab", bg: "#707070" },
  { title: "Kontak Admin", subtitle: "Direktori kontak pengelola", icon: Phone, href: "/layanan/kontak", bg: "#0e7c6e" },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <style>{`
            .page-wrapper { max-width: 1440px; margin: 0 auto; padding: 0 12px; }
            @media (min-width: 601px) { .page-wrapper { margin: 1vw 20vw 1vw; padding: 0 15px; } }
            .card-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.83vw; }
            .card-link { height: 15.3vw; }
            .card-body { padding: 2.2vw 0 1.4vw; }
            .card-icon { width: 4.4vw; height: 4.4vw; }
            .card-title { font-size: 1.1vw; margin: 0.8vw 0 0 0; }
            .card-footer { padding: 0.7vw 0; }
            .card-btn { font-size: 0.8vw; padding: 0.3vw 0.9vw; }
            .denah-link { height: 15.3vw; margin-top: 0.83vw; }
            .denah-icon { width: 5vw; height: 5vw; }
            .denah-title { font-size: 1.2vw; margin: 0.8vw 0 0 0; }
            @media (max-width: 600px) {
              .page-wrapper { margin: 0 4vw !important; padding: 0 12px !important; }
              .card-grid { grid-template-columns: 1fr; gap: 2vw; }
              .card-link { height: 45vw; }
              .card-body { padding: 6vw 0 4vw; }
              .card-icon { width: 12vw; height: 12vw; }
              .card-title { font-size: 4vw; margin: 3vw 0 0 0; }
              .card-footer { padding: 2.5vw 0; }
              .card-btn { font-size: 3vw; padding: 1.5vw 3vw; }
              .denah-link { height: 45vw; margin-top: 2vw; }
              .denah-icon { width: 12vw; height: 12vw; }
              .denah-title { font-size: 4vw; margin: 3vw 0 0 0; }
            }
          `}</style>

      <div className="page-wrapper">
        <main id="main-content" role="main" style={{ display: "block", padding: "40px 0" }}>

          <div style={{ marginBottom: "1.5rem", borderBottom: "1px solid #b1b4b6", paddingBottom: "0.5rem" }}>
            <h2 style={{ margin: 0, fontSize: "1.5rem", fontWeight: 700, color: "#0b0c0c" }}>Layanan Sistem</h2>
          </div>

          <div className="card-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.href}
                  href={service.href}
                  className="card-link"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    color: "#fff",
                    background: service.bg,
                    overflow: "hidden",
                    transition: "filter 0.15s ease, transform 0.15s ease",
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
                    (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  }}
                >
                  <div className="card-body" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <Icon className="card-icon" style={{ strokeWidth: 1.25, color: "#fff" }} />
                    <p className="card-title" style={{ fontWeight: 700, textAlign: "center", color: "#fff" }}>
                      {service.title}
                    </p>
                  </div>
                  <div className="card-footer" style={{ borderTop: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="card-btn" style={{ fontWeight: 600, color: "#fff", border: "1px solid rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                      {service.subtitle} &rsaquo;
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link
            href="/layanan/denah"
            className="denah-link"
            style={{
              display: "flex",
              flexDirection: "column",
              textDecoration: "none",
              color: "#fff",
              background: "#1351a8",
              overflow: "hidden",
              transition: "filter 0.15s ease, transform 0.15s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            <div className="card-body" style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <Map className="denah-icon" style={{ strokeWidth: 1.25, color: "#fff" }} />
              <p className="denah-title" style={{ fontWeight: 700, textAlign: "center", color: "#fff" }}>
                Denah Makam
              </p>
            </div>
            <div className="card-footer" style={{ borderTop: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span className="card-btn" style={{ fontWeight: 600, color: "#fff", border: "1px solid rgba(255,255,255,0.5)", whiteSpace: "nowrap" }}>
                Peta interaktif lokasi makam &rsaquo;
              </span>
            </div>
          </Link>

        </main>
      </div>

      <Footer />
    </div>
  );
}
