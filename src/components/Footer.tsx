export default function Footer() {
  return (
    <footer
      style={{
        background: "#0b0c0c",
        borderTop: "4px solid #1d70b8",
        padding: "clamp(10px, 1.5vh, 16px) clamp(0.75rem, 2vw, 2rem)",
        marginTop: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        <p
          style={{
            color: "#b1b4b6",
            fontSize: "0.8125rem",
            margin: 0,
          }}
        >
          © 2025 Yayasan Sejarah Timbanganten
        </p>
        <p
          style={{
            color: "#505a5f",
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          TIMGRAVID v1.0 — Sistem Manajemen Pemakaman
        </p>
      </div>
    </footer>
  );
}
