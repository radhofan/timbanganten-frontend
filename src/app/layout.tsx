import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "TIMGRAVID",
  description: "Sistem Layanan Pemakamam Timbanganten",
  icons: {
    icon: "/images/logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="govuk-template">
      <head>
        <link rel="stylesheet" href="/govuk-frontend.min.css" />
      </head>
      <body className="govuk-template__body">
        <a className="govuk-skip-link" href="#main-content">
          Skip to main content
        </a>
        <ClientLayout>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </ClientLayout>
      </body>
    </html>
  );
}
