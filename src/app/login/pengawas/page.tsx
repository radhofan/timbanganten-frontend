"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GovukButton, GovukFormGroup, GovukInput, GovukSelect, GovukNotificationBanner } from "@/components/govuk";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header hideBanner hideNav />

      <div className="govuk-width-container" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "2rem", paddingBottom: "2rem" }}>
        <main className="govuk-main-wrapper" id="main-content" role="main" style={{ width: "100%", maxWidth: 500 }}>
          <h1 className="govuk-heading-l">Masuk sebagai Pengawas</h1>

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

          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="role">Role</label>
            <GovukSelect
              id="role"
              name="role"
              value={role}
              onChange={(e) => { const r = e.target.value; setRole(r); router.push(`/login/${r}`); }}
              style={{ width: "100%" }}
            >
              <option value="admin">Admin</option>
              <option value="approver">Approver</option>
              <option value="pengawas">Pengawas</option>
            </GovukSelect>
          </div>

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

            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <GovukButton type="submit" isLoading={isLoading} style={{ flex: 1 }}>
                Masuk
              </GovukButton>
              <GovukButton type="button" variant="secondary" onClick={handleGuestLogin} style={{ flex: 1 }}>
                Masuk sebagai Guest
              </GovukButton>
            </div>
          </form>
        </main>
      </div>

      <Footer />
    </div>
  );
}
