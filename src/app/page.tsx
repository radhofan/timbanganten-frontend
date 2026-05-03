"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, CheckCircle, Map, List, CreditCard, Users, Phone } from "lucide-react";
import Link from "next/link";

const services = [
  {
    title: "Pemesanan",
    subtitle: "Daftar pemesanan makam baru",
    icon: <Calendar className="w-5 h-5" />,
    href: "/layanan/pesan",
    tag: "blue" as const,
  },
  {
    title: "Status Pemesanan",
    subtitle: "Cek dan kelola status pesanan",
    icon: <CheckCircle className="w-5 h-5" />,
    href: "/layanan/pesan/status",
    tag: "green" as const,
  },
  {
    title: "Daftar Makam",
    subtitle: "Inventaris seluruh blok makam",
    icon: <List className="w-5 h-5" />,
    href: "/layanan/makam",
    tag: "grey" as const,
  },
  {
    title: "Pembayaran",
    subtitle: "Rekap iuran dan status bayar",
    icon: <CreditCard className="w-5 h-5" />,
    href: "/layanan/pembayaran",
    tag: "red" as const,
  },
  {
    title: "Daftar Penanggung Jawab",
    subtitle: "Manajemen data penanggung jawab",
    icon: <Users className="w-5 h-5" />,
    href: "/layanan/penanggung-jawab",
    tag: "purple" as const,
  },
  {
    title: "Kontak Admin",
    subtitle: "Direktori kontak pengelola",
    icon: <Phone className="w-5 h-5" />,
    href: "/layanan/kontak",
    tag: undefined as undefined,
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />

      <div className="govuk-width-container">
        <main className="govuk-main-wrapper" id="main-content" role="main" style={{ flex: 1 }}>
          <div style={{ marginBottom: "1rem", borderBottom: "1px solid #b1b4b6", paddingBottom: "0.5rem" }}>
            <h2 className="govuk-heading-m" style={{ margin: 0 }}>Layanan Sistem</h2>
          </div>

          <style>{`
            .services-grid { grid-template-columns: repeat(2, 1fr); }
            @media (max-width: 600px) {
              .services-grid { grid-template-columns: 1fr !important; }
            }
          `}</style>
          <div className="services-grid" style={{ display: "grid", gap: 1, background: "#b1b4b6", border: "1px solid #b1b4b6", margin: 0 }}>
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
                }}
                className="group"
              >
                <div
                  style={{ padding: "clamp(10px, 1.2vw, 16px)", display: "flex", alignItems: "center", gap: 14, width: "100%" }}
                  className="group-hover:bg-[#f3f2f1] transition-colors"
                >
                  <div style={{ flexShrink: 0, width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {service.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p className="govuk-body" style={{ fontWeight: 700, marginBottom: 2 }}>
                      {service.title}
                    </p>
                    <p className="govuk-body-s" style={{ color: "#505a5f", margin: 0 }}>
                      {service.subtitle}
                    </p>
                  </div>
                  <span style={{ color: "#b1b4b6", flexShrink: 0 }} className="group-hover:text-[#1d70b8] transition-colors">
                    →
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Denah Makam — standalone featured block */}
          <div style={{ marginTop: 48 }}>
            <Link
              href="/layanan/denah"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "#fff",
                border: "1px solid #b1b4b6",
                textDecoration: "none",
                color: "inherit",
                gap: 16,
                padding: "60px 40px",
                minHeight: 280,
                textAlign: "center",
              }}
              className="group"
            >
              <div
                style={{ color: "#0b0c0c" }}
                className="group-hover:text-[#1d70b8] transition-colors"
              >
                <Map style={{ width: 64, height: 64 }} />
              </div>

              <div>
                <p
                  className="govuk-body"
                  style={{ fontWeight: 700, fontSize: "1.5rem", marginBottom: 8 }}
                >
                  Denah Makam
                </p>
                <p className="govuk-body-s" style={{ color: "#505a5f", margin: 0, fontSize: "1rem" }}>
                  Peta interaktif lokasi makam — lihat dan pilih blok makam secara visual
                </p>
              </div>
            </Link>
          </div>

          {/* <div className="govuk-inset-text" style={{ marginTop: "1rem" }}>
            <dl className="govuk-summary-list" style={{ marginBottom: 0 }}>
              <div className="govuk-summary-list__row" style={{ border: "none", padding: "2px 0" }}>
                <dt className="govuk-summary-list__key" style={{ width: "auto", paddingRight: 24 }}>Sistem</dt>
                <dd className="govuk-summary-list__value">TIMGRAVID</dd>
              </div>
              <div className="govuk-summary-list__row" style={{ border: "none", padding: "2px 0" }}>
                <dt className="govuk-summary-list__key" style={{ width: "auto", paddingRight: 24 }}>Pengelola</dt>
                <dd className="govuk-summary-list__value">Yayasan Sajarah Timbanganten</dd>
              </div>
              <div className="govuk-summary-list__row" style={{ border: "none", padding: "2px 0" }}>
                <dt className="govuk-summary-list__key" style={{ width: "auto", paddingRight: 24 }}>Status</dt>
                <dd className="govuk-summary-list__value">
                  <strong className="govuk-tag govuk-tag--green">Operasional</strong>
                </dd>
              </div>
            </dl>
          </div> */}
        </main>
      </div>

      <Footer />
    </div>
  );
}
