"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { ChevronRight, ChevronLeft, Menu, X } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

const bannerImages = ["/images/timbanganten/makam-1.png", "/images/timbanganten/makam-2.jpg"];

function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute", top: "50%", right: 12, zIndex: 20,
        transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.4)", color: "#fff",
        padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center",
      }}
      aria-label="Next slide"
    >
      <ChevronRight style={{ width: 20, height: 20 }} />
    </button>
  );
}

function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "absolute", top: "50%", left: 12, zIndex: 20,
        transform: "translateY(-50%)", background: "rgba(0,0,0,0.5)",
        border: "1px solid rgba(255,255,255,0.4)", color: "#fff",
        padding: "6px 8px", cursor: "pointer", display: "flex", alignItems: "center",
      }}
      aria-label="Previous slide"
    >
      <ChevronLeft style={{ width: 20, height: 20 }} />
    </button>
  );
}

export default function Header({ hideBanner = false, hideNav = false }: { hideBanner?: boolean; hideNav?: boolean }) {
  const user = useStore(authStore, (s) => s.user);
  const logout = useStore(authStore, (s) => s.logout);
  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : null;
  const isLoggedIn = !!user && user.role !== "guest";

  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    logout();
    setMenuOpen(false);
    router.push("/login/admin");
  };

  return (
    <>
      <style>{`
        .header-nav-items { display: flex; align-items: center; gap: 16px; }
        .mobile-menu-item { display: none; }
        @media (max-width: 640px) {
          .header-nav-items { display: none; }
          .header-service-name { display: none !important; }
          .mobile-menu-item { display: block; }
        }
      `}</style>
      <header role="banner" style={{ background: "#1d70b8", color: "#fff", position: "relative", zIndex: 100 }}>
        <div style={{
          maxWidth: "1440px", margin: "0 auto", padding: "0 16px",
          display: "flex", alignItems: "center", justifyContent: "space-between", height: 52,
        }}>
          {/* Left: logo + service name */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: "1.0625rem" }}>
              <Image src="/images/logo.png" alt="Logo Timbanganten" width={28} height={28} priority style={{ objectFit: "contain" }} />
              <span>TIMGRAVID</span>
            </Link>
            <span style={{ borderLeft: "1px solid rgba(255,255,255,0.3)", paddingLeft: 12, fontSize: "0.8125rem", color: "rgba(255,255,255,0.8)", fontWeight: 400 }}
              className="header-service-name">
              Sistem Manajemen Pemakaman Timbanganten
            </span>
          </div>

          {/* Right: Beranda + user info + burger */}
          <div style={{ display: hideNav ? "none" : "flex", alignItems: "center", gap: 16, position: "relative" }}>
            <div className="header-nav-items">
              <Link href="/" style={{ color: "#fff", textDecoration: "none", fontSize: "0.875rem", fontWeight: 600 }}>
                Beranda
              </Link>
              {isLoggedIn && (
                <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>
                  {user.name} · {roleLabel}
                </span>
              )}
            </div>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={menuOpen}
              style={{
                background: menuOpen ? "#fff" : "transparent",
                border: "2px solid rgba(255,255,255,0.7)",
                color: menuOpen ? "#1d70b8" : "#fff",
                height: 36,
                padding: "0 12px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                fontSize: "0.875rem",
                fontWeight: 700,
                whiteSpace: "nowrap",
                boxSizing: "border-box",
              }}
            >
              {menuOpen ? <X style={{ width: 16, height: 16, flexShrink: 0 }} /> : <Menu style={{ width: 16, height: 16, flexShrink: 0 }} />}
              Menu
            </button>

            {/* Dropdown */}
            {menuOpen && (
              <div style={{
                position: "absolute",
                top: "100%",
                right: 0,
                background: "#1d70b8",
                width: "auto",
                minWidth: "100%",
                zIndex: 200,
                borderTop: "3px solid #ffdd00",
                border: "1px solid #003078",
                borderTopColor: "#ffdd00",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              }}>
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <li className="mobile-menu-item" style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}>
                    <Link href="/" onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 20px", color: "#fff", textDecoration: "none", fontSize: "0.9375rem", fontWeight: 600, whiteSpace: "nowrap" }}>
                      Beranda
                    </Link>
                  </li>
                  {isLoggedIn && (
                    <li className="mobile-menu-item" style={{ padding: "10px 20px", borderBottom: "1px solid rgba(255,255,255,0.15)", fontSize: "0.875rem", color: "rgba(255,255,255,0.8)", fontWeight: 600, whiteSpace: "nowrap" }}>
                      {user.name} · {roleLabel}
                    </li>
                  )}
                  {isLoggedIn ? (
                    <li>
                      <button onClick={handleLogout} style={{ display: "block", width: "100%", textAlign: "left", padding: "12px 20px", color: "#fff", background: "none", border: "none", fontSize: "0.9375rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>
                        Logout
                      </button>
                    </li>
                  ) : (
                    <li>
                      <Link href="/login/admin" onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 20px", color: "#fff", textDecoration: "none", fontSize: "0.9375rem", fontWeight: 600, whiteSpace: "nowrap" }}>
                        Login
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

      </header>

      {!hideBanner && (
        <div style={{ width: "100%", height: "clamp(420px, 58vh, 680px)", background: "#0b0c0c", position: "relative", overflow: "hidden" }}>
          <Slider autoplay autoplaySpeed={5000} infinite dots arrows nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
            {bannerImages.map((src, idx) => (
              <div key={idx}>
                <div style={{ height: "clamp(420px, 58vh, 680px)", width: "100%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Banner ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              </div>
            ))}
          </Slider>

          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.6)", zIndex: 5, pointerEvents: "none" }} />

          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", zIndex: 10, padding: "0 clamp(1rem, 5vw, 5rem)" }}>
            <strong style={{ display: "inline-block", background: "#1d70b8", color: "#fff", padding: "4px 12px", fontSize: "0.8125rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16 }}>
              Sistem Informasi Manajemen Pemakaman
            </strong>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 700, color: "#fff", margin: "0 0 10px 0", textShadow: "0 2px 6px rgba(0,0,0,0.7)", lineHeight: 1.15 }}>
              Yayasan Sajarah Timbanganten
            </h1>
            <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.375rem)", color: "#b1b4b6", fontWeight: 400, margin: 0 }}>
              Bandung — Portal Layanan Resmi
            </p>
          </div>

          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 4, background: "#1d70b8", zIndex: 15 }} />
        </div>
      )}
    </>
  );
}
