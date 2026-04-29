"use client";

import Image from "next/image";
import { UserCircle, Menu, X, ChevronRight, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerImages = ["/images/timbanganten/makam-1.png", "/images/timbanganten/makam-2.jpg"];

function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-3 z-20 -translate-y-1/2 text-white opacity-80 hover:opacity-100 p-1"
      style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.4)" }}
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}

function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-3 z-20 -translate-y-1/2 text-white opacity-80 hover:opacity-100 p-1"
      style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.4)" }}
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}

export default function Header({ hideBanner = false }: { hideBanner?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const user = useStore(authStore, (s) => s.user);

  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Guest";

  return (
    <>
      {/* ── Top bar ────────────────────────────────────────────────────────── */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "4px solid #b1b4b6",
        }}
      >
        {/* System identity strip */}
        <div
          style={{
            background: "#1d70b8",
            padding: "2px clamp(0.75rem, 2vw, 2rem)",
            fontSize: "0.6875rem",
            color: "#fff",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          TIMGRAVID — Sistem Informasi Manajemen Yayasan Sajarah Timbanganten
        </div>

        {/* Main nav row */}
        <div
          className="flex items-center justify-between"
          style={{ padding: "0 clamp(0.75rem, 2vw, 2rem)", height: "clamp(44px, 5vh, 56px)" }}
        >
          {/* Logo + name */}
          <Link href="/" className="flex items-center gap-2" style={{ textDecoration: "none" }}>
            <div style={{ width: 28, height: 28, position: "relative", flexShrink: 0 }}>
              <Image src="/images/logo.png" alt="Logo" fill style={{ objectFit: "contain" }} priority />
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: "clamp(0.875rem, 1.5vw, 1.0625rem)",
                color: "#0b0c0c",
                letterSpacing: "0.01em",
              }}
            >
              Timbanganten
            </span>
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-1"
            style={{ border: "1px solid #b1b4b6", color: "#0b0c0c" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-0" style={{ height: "100%" }}>
            <Link
              href="/"
              style={{
                color: "#0b0c0c",
                fontSize: "0.875rem",
                fontWeight: 600,
                padding: "0 14px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                borderLeft: "1px solid #b1b4b6",
              }}
              className="hover:bg-[#f3f2f1] transition-colors"
            >
              Beranda
            </Link>

            {/* User info */}
            <div
              style={{
                borderLeft: "1px solid #b1b4b6",
                padding: "0 14px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <UserCircle className="w-4 h-4 text-[#505a5f]" />
              <div>
                <div style={{ color: "#0b0c0c", fontWeight: 700, fontSize: "0.8125rem", lineHeight: 1.2 }}>
                  {user?.name || "Guest"}
                </div>
                <div
                  style={{
                    color: "#505a5f",
                    fontSize: "0.625rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {roleLabel}
                </div>
              </div>
            </div>

            {/* Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  style={{
                    borderLeft: "1px solid #b1b4b6",
                    padding: "0 14px",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    background: "transparent",
                    color: "#0b0c0c",
                    cursor: "pointer",
                    outline: "none",
                  }}
                  className="hover:bg-[#f3f2f1] transition-colors"
                >
                  <Menu className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                style={{
                  background: "#fff",
                  border: "2px solid #0b0c0c",
                  minWidth: 200,
                  padding: 0,
                  boxShadow: "3px 3px 0 #0b0c0c",
                }}
              >
                <div
                  style={{
                    padding: "6px 12px",
                    fontSize: "0.625rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "#505a5f",
                    background: "#f3f2f1",
                    borderBottom: "1px solid #b1b4b6",
                  }}
                >
                  Login Sebagai
                </div>

                {[
                  { label: "Pengawas", path: "/login/pengawas" },
                  { label: "Admin", path: "/login/admin" },
                  { label: "Approver", path: "/login/approver" },
                ].map((item) => (
                  <DropdownMenuItem
                    key={item.path}
                    onClick={() => router.push(item.path)}
                    style={{
                      padding: "8px 12px",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "#0b0c0c",
                      cursor: "pointer",
                      borderBottom: "1px solid #f3f2f1",
                    }}
                    className="hover:bg-[#f3f2f1] transition-colors"
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div
            style={{
              background: "#f3f2f1",
              borderTop: "1px solid #b1b4b6",
            }}
          >
            {/* User info row */}
            <div
              style={{
                padding: "10px clamp(0.75rem, 2vw, 2rem)",
                borderBottom: "1px solid #b1b4b6",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <UserCircle className="w-5 h-5 text-[#505a5f]" />
              <div>
                <div style={{ color: "#0b0c0c", fontWeight: 700, fontSize: "0.875rem" }}>
                  {user?.name || "Guest"}
                </div>
                <div
                  style={{
                    color: "#505a5f",
                    fontSize: "0.6875rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  {roleLabel}
                </div>
              </div>
            </div>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: "block",
                padding: "10px clamp(0.75rem, 2vw, 2rem)",
                color: "#0b0c0c",
                fontWeight: 600,
                fontSize: "0.875rem",
                textDecoration: "none",
                borderBottom: "1px solid #b1b4b6",
              }}
            >
              Beranda
            </Link>

            <div
              style={{
                padding: "6px clamp(0.75rem, 2vw, 2rem)",
                fontSize: "0.625rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "#505a5f",
              }}
            >
              Login Sebagai
            </div>

            {[
              { label: "Pengawas", path: "/login/pengawas" },
              { label: "Admin", path: "/login/admin" },
              { label: "Approver", path: "/login/approver" },
            ].map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  router.push(item.path);
                  setMobileMenuOpen(false);
                }}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  padding: "10px clamp(0.75rem, 2vw, 2rem)",
                  color: "#0b0c0c",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  background: "transparent",
                  cursor: "pointer",
                  borderBottom: "1px solid #b1b4b6",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ── Banner ─────────────────────────────────────────────────────────── */}
      {!hideBanner && (
        <div
          className="w-full relative"
          style={{ height: "clamp(30vh, 42vh, 52vh)", background: "#0b0c0c" }}
        >
          <Slider
            autoplay
            autoplaySpeed={5000}
            infinite
            dots
            arrows
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {bannerImages.map((src, idx) => (
              <div key={idx}>
                <div style={{ height: "clamp(30vh, 42vh, 52vh)", width: "100%" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Banner ${idx + 1}`}
                    style={{ 
                      width: "100%", 
                      height: "100%", 
                      objectFit: "cover", 
                      display: "block" 
                    }}
                  />
                </div>
              </div>
            ))}
          </Slider>

          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.65)", zIndex: 5 }}
          />

          <div
            className="absolute inset-0 flex flex-col items-center justify-center text-white text-center"
            style={{ zIndex: 10, padding: "0 clamp(1rem, 4vw, 4rem)" }}
          >
            {/* System badge */}
            <div
              style={{
                background: "#1d70b8",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.6875rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "4px 12px",
                marginBottom: 12,
                border: "1px solid rgba(255,255,255,0.3)",
              }}
            >
              Sistem Informasi Manajemen Pemakaman
            </div>
            <h1
              style={{
                fontWeight: 700,
                fontSize: "clamp(1.25rem, 3.5vw, 2.5rem)",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
              }}
            >
              Yayasan Sajarah Timbanganten
              <br />
              <span style={{ color: "#b1b4b6", fontSize: "0.75em", fontWeight: 400 }}>
                Bandung — Portal Layanan Resmi
              </span>
            </h1>
          </div>

          {/* Bottom border accent */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 4,
              background: "#1d70b8",
              zIndex: 15,
            }}
          />
        </div>
      )}
    </>
  );
}
