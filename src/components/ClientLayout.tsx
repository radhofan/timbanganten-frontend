"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Spin } from "antd";
import AuthBootstrapper from "./AuthBootstrapper";

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();
  const authPages = ["/admin/login/admin", "/admin/login/approver", "/admin/login/pengawas"];
  const isAuthPage = authPages.includes(pathname);

  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  if (isAuthPage) return <>{children}</>;

  if (!isReady) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" />
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
