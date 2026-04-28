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

// 1. Import at the top
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 2. Replace the single <Image> in the banner with a carousel
const bannerImages = ["/images/timbanganten/makam-1.png", "/images/timbanganten/makam-2.jpg"];

function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 right-4 z-20 -translate-y-1/2 opacity-70 hover:opacity-100 text-white p-1 rounded-full shadow-lg"
    >
      <ChevronRight className="w-8 h-8 stroke-2" />
    </button>
  );
}

function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 left-4 z-20 -translate-y-1/2 opacity-70 hover:opacity-100 text-white p-1 rounded-full shadow-lg"
    >
      <ChevronLeft className="w-8 h-8 stroke-2" />
    </button>
  );
}

export default function Header({ hideBanner = false }: { hideBanner?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const user = useStore(authStore, (s) => s.user);

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white shadow-md relative z-50">
        <Link href="/">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 relative">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <h1 className="text-xl font-bold cursor-pointer text-gray-800">Timbanganten</h1>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-7 h-7 text-gray-700" />
          ) : (
            <Menu className="w-7 h-7 text-gray-700" />
          )}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 ml-auto mr-4">
          <Link href="/">
            <h1 className="text-lg font-medium cursor-pointer hover:text-green-600 transition-colors">Home</h1>
          </Link>

          {/* User Info Card - Beautiful Design */}
          <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-xl shadow-sm">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
              <UserCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-gray-800">{user?.name || "Guest"}</span>
              <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full inline-block w-fit">
                {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Guest"}
              </span>
            </div>
          </div>

          {/* Dropdown Menu - Beautiful Design */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-2 hover:bg-gray-100 rounded-lg focus:outline-none transition-all duration-200 hover:shadow-md">
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white border border-gray-200 rounded-xl shadow-2xl p-2"
            >
              <div className="px-3 py-2 mb-2 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Login Sebagai</p>
              </div>
              
              <DropdownMenuItem 
                onClick={() => router.push("/login/pengawas")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 cursor-pointer transition-all duration-200"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">👮</span>
                </div>
                <span className="font-medium text-gray-700">Pengawas</span>
              </DropdownMenuItem>

              <DropdownMenuItem 
                onClick={() => router.push("/login/admin")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 cursor-pointer transition-all duration-200"
              >
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">👨‍💼</span>
                </div>
                <span className="font-medium text-gray-700">Admin</span>
              </DropdownMenuItem>

              <DropdownMenuItem 
                onClick={() => router.push("/login/approver")}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 cursor-pointer transition-all duration-200"
              >
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg">✅</span>
                </div>
                <span className="font-medium text-gray-700">Approver</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Dropdown - Clean Design matching Desktop */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-2xl z-50 border-t border-gray-200">
            <div className="flex flex-col p-6 space-y-4">
              {/* User Info Card */}
              <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-3 rounded-xl shadow-sm">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-md">
                  <UserCircle className="w-8 h-8 text-white" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-base font-bold text-gray-800">{user?.name || "Guest"}</span>
                  <span className="text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full inline-block w-fit">
                    {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Guest"}
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <Link href="/" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-all duration-200 border border-gray-200">
                  <span className="text-lg">🏠</span>
                  <span className="text-base font-medium text-gray-700">Home</span>
                </div>
              </Link>

              {/* Login Options */}
              <div className="pt-2 border-t border-gray-200">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">Login Sebagai</p>
                
                <button
                  onClick={() => {
                    router.push("/login/pengawas");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 transition-all duration-200 border border-gray-200 mb-2"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">👮</span>
                  </div>
                  <span className="text-base font-medium text-gray-700">Pengawas</span>
                </button>

                <button
                  onClick={() => {
                    router.push("/login/admin");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 transition-all duration-200 border border-gray-200 mb-2"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">👨‍💼</span>
                  </div>
                  <span className="text-base font-medium text-gray-700">Admin</span>
                </button>

                <button
                  onClick={() => {
                    router.push("/login/approver");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 transition-all duration-200 border border-gray-200"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg">✅</span>
                  </div>
                  <span className="text-base font-medium text-gray-700">Approver</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {!hideBanner && (
        <div
          className="w-full relative mb-12 bg-gray-900"
          style={{
            height: "clamp(40vh, 60vh, 70vh)",
            clipPath:
              "polygon(0 0, 100% 0, 100% 92%, 90% 94%, 80% 92%, 70% 95%, 60% 92%, 50% 95%, 40% 92%, 30% 95%, 20% 92%, 10% 94%, 0 92%)",
            WebkitClipPath:
              "polygon(0 0, 100% 0, 100% 92%, 90% 94%, 80% 92%, 70% 95%, 60% 92%, 50% 95%, 40% 92%, 30% 95%, 20% 92%, 10% 94%, 0 92%)",
          }}
        >
          {/* Slider */}
          <Slider
            autoplay
            autoplaySpeed={5000}
            infinite
            dots={true}
            arrows={true}
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}
          >
            {bannerImages.map((src, idx) => (
              <div key={idx}>
                <div 
                  className="relative w-full"
                  style={{ height: "clamp(40vh, 60vh, 70vh)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Banner ${idx + 1}`}
                    style={{ 
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block'
                    }}
                  />
                </div>
              </div>
            ))}
          </Slider>

          {/* Dark Overlay - AFTER slider so it's on top */}
          <div className="absolute inset-0 bg-black/60 pointer-events-none" style={{ zIndex: 5 }}></div>

          {/* Text Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4" style={{ zIndex: 10 }}>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight sm:leading-relaxed drop-shadow-lg">
              Sistem Informasi Manajemen <br />
              Yayasan Sajarah Timbanganten Bandung
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
