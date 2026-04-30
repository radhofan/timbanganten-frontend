import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MakamTable from "@/components/MakamTable";

export default function MakamPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f3f2f1" }}>
      <Header hideBanner />
      <main style={{ flex: 1 }} className="page-container">
        <MakamTable />
      </main>
      <Footer />
    </div>
  );
}
