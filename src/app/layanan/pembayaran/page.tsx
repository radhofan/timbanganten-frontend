import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PembayaranTable from "@/components/PembayaranTable";

export default function PembayaranPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />
      <main style={{ flex: 1 }} className="page-container">
        <PembayaranTable />
      </main>
      <Footer />
    </div>
  );
}
