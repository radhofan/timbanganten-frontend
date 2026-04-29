import Image from "next/image";

export default function Footer() {
  return (
    <footer style={{
      background: "#f3f2f1",
      borderTop: "4px solid #1d70b8",
      padding: "30px 16px",
    }}>
      <div style={{
        maxWidth: "1440px",
        margin: "0 auto",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 24,
      }}>
        {/* Left: text content */}
        <div>
          <ul style={{
            listStyle: "none",
            margin: "0 0 16px 0",
            padding: 0,
            display: "flex",
            flexWrap: "wrap",
            gap: "4px 20px",
          }}>
            <li><span style={{ fontSize: "0.875rem", color: "#505a5f" }}>TIMGRAVID v1.0</span></li>
            <li><span style={{ fontSize: "0.875rem", color: "#505a5f" }}>Sistem Manajemen Pemakaman</span></li>
            <li><span style={{ fontSize: "0.875rem", color: "#505a5f" }}>Yayasan Sajarah Timbanganten</span></li>
          </ul>
          <p style={{ fontSize: "0.875rem", color: "#505a5f", margin: 0 }}>
            © 2026 Yayasan Sejarah Timbanganten
          </p>
        </div>

        {/* Right: logo */}
        <div style={{ flexShrink: 0 }}>
          <Image
            src="/images/logo.png"
            alt="Logo Timbanganten"
            width={60}
            height={60}
            style={{ objectFit: "contain", opacity: 0.6 }}
          />
        </div>
      </div>
    </footer>
  );
}
