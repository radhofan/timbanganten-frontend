"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const bannerImages = ["/images/timbanganten/makam-1.png", "/images/timbanganten/makam-2.jpg"];

function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-3 z-20 -translate-y-1/2 p-1"
      style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", opacity: 0.8 }}
      aria-label="Next slide"
    >
      <ChevronRight className="w-5 h-5" />
    </button>
  );
}

function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-3 z-20 -translate-y-1/2 p-1"
      style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", opacity: 0.8 }}
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
}

export default function Header({ hideBanner = false }: { hideBanner?: boolean }) {
  const user = useStore(authStore, (s) => s.user);
  const roleLabel = user?.role
    ? user.role.charAt(0).toUpperCase() + user.role.slice(1)
    : "Guest";

  return (
    <>
      <header className="govuk-header" role="banner" data-module="govuk-header">
        <div className="govuk-header__container govuk-width-container">
          <div className="govuk-header__logo">
            <Link href="/" className="govuk-header__link govuk-header__link--homepage">
              <Image
                src="/images/logo.png"
                alt="Logo Timbanganten"
                width={24}
                height={24}
                priority
                style={{ objectFit: "contain", verticalAlign: "middle", marginRight: 8, display: "inline" }}
              />
              <span className="govuk-header__logotype-text">TIMGRAVID</span>
            </Link>
          </div>

          <div className="govuk-header__content">
            <span className="govuk-header__service-name">
              Sistem Manajemen Pemakaman Timbanganten
            </span>

            <nav className="govuk-header__navigation" aria-label="Menu">
              <ul className="govuk-header__navigation-list">
                <li className="govuk-header__navigation-item">
                  <Link href="/" className="govuk-header__link">
                    Beranda
                  </Link>
                </li>
                <li className="govuk-header__navigation-item">
                  <span
                    className="govuk-header__link"
                    style={{ cursor: "default", opacity: 0.75, fontSize: "0.875rem" }}
                  >
                    {user?.name || "Guest"} · {roleLabel}
                  </span>
                </li>
                <li className="govuk-header__navigation-item">
                  <Link href="/login/admin" className="govuk-header__link">
                    Login Admin
                  </Link>
                </li>
                <li className="govuk-header__navigation-item">
                  <Link href="/login/approver" className="govuk-header__link">
                    Login Approver
                  </Link>
                </li>
                <li className="govuk-header__navigation-item">
                  <Link href="/login/pengawas" className="govuk-header__link">
                    Login Pengawas
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
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
            <strong className="govuk-tag" style={{ marginBottom: 12 }}>
              Sistem Informasi Manajemen Pemakaman
            </strong>
            <h1
              className="govuk-heading-xl"
              style={{ color: "#fff", marginBottom: 0, textShadow: "0 1px 3px rgba(0,0,0,0.6)" }}
            >
              Yayasan Sajarah Timbanganten
              <br />
              <span className="govuk-body-l" style={{ color: "#b1b4b6", fontWeight: 400 }}>
                Bandung — Portal Layanan Resmi
              </span>
            </h1>
          </div>

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
