"use client";

import Image from "next/image";
import { UserCircle, Menu, X } from "lucide-react";
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

export default function Header({ hideBanner = false }: { hideBanner?: boolean }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const user = useStore(authStore, (s) => s.user);

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-white relative">
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
            <h1 className="text-xl font-bold cursor-pointer">Timbanganten</h1>
          </div>
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 ml-auto mr-8">
          <Link href="/">
            <h1 className="text-lg font-medium cursor-pointer hover:text-green-600">Home</h1>
          </Link>

          <div className="flex flex-col items-end text-right">
            <span className="text-base font-semibold">{user?.name || "Guest"}</span>
            <span className="text-sm text-gray-600">
              {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Guest"}
            </span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="hover:text-green-600 focus:outline-none">
                <UserCircle className="w-8 h-8" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 bg-white border border-gray-300 rounded-md shadow-lg"
            >
              <DropdownMenuItem onClick={() => router.push("/login/pengawas")}>
                Pengawas
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/login/admin")}>Admin</DropdownMenuItem>
              <DropdownMenuItem onClick={() => router.push("/login/approver")}>
                Approver
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t z-50">
            <div className="flex flex-col items-start p-4 space-y-4">
              <Link href="/" className="w-full">
                <span className="block w-full text-left text-lg font-medium hover:text-green-600">
                  Home
                </span>
              </Link>
              <Link href="/layanan" className="w-full">
                <span className="block w-full text-left text-lg font-medium hover:text-green-600">
                  Pelayanan
                </span>
              </Link>
              <div className="text-left">
                <span className="text-base font-semibold">{user?.name || "Guest"}</span>
                <br />
                <span className="text-sm text-gray-600">
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Guest"}
                </span>
              </div>
              <div className="w-full border-t pt-2">
                <button
                  onClick={() => router.push("/login/pengawas")}
                  className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Pengawas
                </button>
                <button
                  onClick={() => router.push("/login/admin")}
                  className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Admin
                </button>
                <button
                  onClick={() => router.push("/login/approver")}
                  className="block w-full text-left px-2 py-1 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Approver
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {!hideBanner && (
        <div
          className="w-full relative mb-12 overflow-hidden"
          style={{
            height: "800px",
            clipPath:
              "polygon(0 0, 100% 0, 100% 92%, 90% 94%, 80% 92%, 70% 95%, 60% 92%, 50% 95%, 40% 92%, 30% 95%, 20% 92%, 10% 94%, 0 92%)",
            WebkitClipPath:
              "polygon(0 0, 100% 0, 100% 92%, 90% 94%, 80% 92%, 70% 95%, 60% 92%, 50% 95%, 40% 92%, 30% 95%, 20% 92%, 10% 94%, 0 92%)",
          }}
        >
          <Image
            src="/images/makam-1.png"
            alt="Banner image"
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="(max-width: 1024px) 100vw, 1920px"
          />

          <div className="absolute inset-0 bg-black opacity-60 pointer-events-none"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 z-10">
            <h1 className="text-xl md:text-6xl font-bold mb-4 leading-relaxed">
              Sistem Informasi Manajemen <br />
              Yayasan Sajarah Timbanganten Bandung
            </h1>
          </div>
        </div>
      )}
    </>
  );
}
