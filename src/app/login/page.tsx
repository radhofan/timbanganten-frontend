"use client";
import React, { useState } from "react";
import { GovukButton, GovukFormGroup, GovukInput, GovukSelect, GovukNotificationBanner } from "@/components/govuk";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Role = "admin" | "approver" | "pengawas";

const API_ENDPOINT: Record<Role, string> = {
  admin: "/api/authAdmin",
  approver: "/api/authApprover",
  pengawas: "/api/authPengawas",
};

const ROLE_LABEL: Record<Role, string> = {
  admin: "Admin",
  approver: "Approver",
  pengawas: "Pengawas",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("admin");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showUnauthorized, setShowUnauthorized] = useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("unauthorized") === "1") setShowUnauthorized(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(API_ENDPOINT[role], {
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
      <Header hideBanner hideNav />

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(0.75rem, 2vw, 1.5rem) clamp(0.75rem, 2vw, 2rem)" }}>
        <div style={{ width: "100%", maxWidth: 480, background: "#fff", border: "1px solid #b1b4b6" }}>

          {/* Heading */}
          <div style={{ padding: "clamp(12px, 2vw, 18px) clamp(14px, 2vw, 22px)", borderBottom: "1px solid #b1b4b6", textAlign: "center" }}>
            <h1 style={{ margin: 0, fontSize: "clamp(1rem, 1.5vw, 1.1875rem)", fontWeight: 700, color: "#0b0c0c" }}>
              Website Pemakaman Timbanganten
            </h1>
            <span style={{ display: "block", fontSize: "0.8125rem", color: "#505a5f", marginTop: 4 }}>
              Masuk sebagai {ROLE_LABEL[role]}
            </span>
          </div>

          <div style={{ padding: "clamp(14px, 2vw, 22px)" }}>
            {showUnauthorized && (
              <GovukNotificationBanner type="important" title="Akses ditolak">
                <p className="govuk-body">Harap login terlebih dahulu untuk mengakses fitur ini.</p>
              </GovukNotificationBanner>
            )}

            {error && (
              <div className="govuk-error-summary" data-module="govuk-error-summary">
                <div role="alert">
                  <h2 className="govuk-error-summary__title">Terjadi masalah</h2>
                  <div className="govuk-error-summary__body">
                    <p className="govuk-body">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <GovukFormGroup label="Role">
              <GovukSelect
                id="role"
                name="role"
                value={role}
                onChange={(e) => { setRole(e.target.value as Role); setError(""); }}
                style={{ width: "100%" }}
              >
                <option value="admin">Admin</option>
                <option value="approver">Approver</option>
                <option value="pengawas">Pengawas</option>
              </GovukSelect>
            </GovukFormGroup>

            <form onSubmit={handleSubmit} noValidate>
              <GovukFormGroup id="email" label="Email" error={error ? " " : undefined}>
                <GovukInput
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  error={!!error}
                  style={{ width: "100%" }}
                />
              </GovukFormGroup>

              <GovukFormGroup id="password" label="Password" error={error ? " " : undefined}>
                <GovukInput
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  error={!!error}
                  style={{ width: "100%" }}
                />
              </GovukFormGroup>

              <div style={{ display: "flex", gap: 12, paddingTop: 4 }}>
                <GovukButton type="button" variant="secondary" onClick={handleGuestLogin} style={{ flex: 1 }}>
                  Masuk sebagai Guest
                </GovukButton>
                <GovukButton type="submit" isLoading={isLoading} style={{ flex: 1 }}>
                  Masuk
                </GovukButton>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
