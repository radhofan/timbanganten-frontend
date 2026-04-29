"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AuthBootstrapper from "./AuthBootstrapper";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const authPages = ["/login/admin", "/login/approver", "/login/pengawas"];
  const isAuthPage = authPages.includes(pathname);

  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (isAuthPage) return <>{children}</>;

  if (!isReady) {
    return (
      <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: "4px solid #b1b4b6",
            borderTopColor: "#1d70b8",
            borderRadius: "50%",
            animation: "govuk-spin 0.8s linear infinite",
          }}
        />
        <p className="govuk-body" style={{ color: "#505a5f", margin: 0 }}>Memuat sistem...</p>
        <style>{`@keyframes govuk-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <AuthBootstrapper />
      {children}
    </>
  );
}
