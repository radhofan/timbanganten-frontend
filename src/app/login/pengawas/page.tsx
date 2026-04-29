"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "antd";

export default function LoginPengawas() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("pengawas");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUnauthorized, setShowUnauthorized] = useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("unauthorized") === "1") setShowUnauthorized(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch("/api/authPengawas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");
      window.location.href = "/";
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <div style={{ background: "#0b0c0c", borderBottom: "4px solid #1d70b8" }}>
        <div style={{ background: "#1d70b8", padding: "3px clamp(0.75rem, 2vw, 2rem)", fontSize: "0.6875rem", color: "#fff", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          TIMGRAVID — Sistem Informasi Manajemen Yayasan Sajarah Timbanganten
        </div>
        <div style={{ padding: "0 clamp(0.75rem, 2vw, 2rem)", height: 44, display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 24, height: 24, position: "relative" }}>
              <Image src="/images/logo.png" alt="Logo" fill style={{ objectFit: "contain" }} priority />
            </div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.9375rem" }}>Timbanganten</span>
          </div>
        </div>
      </div>

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(1rem, 3vh, 2rem) clamp(0.75rem, 2vw, 2rem)" }}>
        <div style={{ width: "100%", maxWidth: "clamp(300px, 40vw, 440px)", background: "#fff", border: "2px solid #0b0c0c" }}>
          <div style={{ background: "#0b0c0c", padding: "12px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>Login Pengawas</div>
              <div style={{ color: "#b1b4b6", fontSize: "0.75rem" }}>Akses sistem pengawas</div>
            </div>
            <Image src="/images/pengawas.png" alt="Pengawas" width={28} height={28} style={{ objectFit: "contain", opacity: 0.8 }} />
          </div>

          <div style={{ padding: "20px" }}>
            {showUnauthorized && (
              <div style={{ marginBottom: 16, padding: "10px 14px", background: "#fff4e5", borderLeft: "4px solid #f47738", color: "#0b0c0c", fontSize: "0.875rem", fontWeight: 600 }}>
                Harap login terlebih dahulu untuk mengakses fitur ini.
              </div>
            )}
            <div style={{ marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#505a5f", textTransform: "uppercase", letterSpacing: "0.06em" }}>Role:</span>
              <select
                name="role"
                value={role}
                onChange={(e) => { const r = e.target.value; setRole(r); router.push(`/login/${r}`); }}
                style={{ border: "2px solid #0b0c0c", padding: "4px 8px", fontSize: "0.875rem", fontWeight: 600, color: "#0b0c0c", background: "#fff", cursor: "pointer", outline: "none" }}
              >
                <option value="admin">Admin</option>
                <option value="approver">Approver</option>
                <option value="pengawas">Pengawas</option>
              </select>
            </div>

            {error && (
              <div style={{ marginBottom: 14, padding: "8px 12px", background: "#fdf2f2", borderLeft: "4px solid #d4351c", color: "#d4351c", fontSize: "0.875rem", fontWeight: 700 }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 14 }}>
                <label htmlFor="email" style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: "#0b0c0c", marginBottom: 4 }}>Email</label>
                <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="pengawas@example.com" required
                  style={{ width: "100%", border: "2px solid #0b0c0c", padding: "7px 10px", fontSize: "1rem", outline: "none", background: "#fff", boxSizing: "border-box" }} />
              </div>

              <div style={{ marginBottom: 18 }}>
                <label htmlFor="password" style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: "#0b0c0c", marginBottom: 4 }}>Password</label>
                <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Masukkan password" required
                  style={{ width: "100%", border: "2px solid #0b0c0c", padding: "7px 10px", fontSize: "1rem", outline: "none", background: "#fff", boxSizing: "border-box" }} />
              </div>

              <Button htmlType="submit" loading={isLoading} block type="primary" style={{ marginBottom: 8 }}>Masuk</Button>
            </form>
            <Button block onClick={handleGuestLogin} style={{ borderColor: "#505a5f" }}>Masuk sebagai Guest</Button>
          </div>
        </div>
      </main>

      <div style={{ background: "#0b0c0c", borderTop: "4px solid #1d70b8", padding: "8px clamp(0.75rem, 2vw, 2rem)" }}>
        <p style={{ color: "#505a5f", fontSize: "0.8125rem", margin: 0 }}>© 2025 Yayasan Sejarah Timbanganten</p>
      </div>
    </div>
  );
}
