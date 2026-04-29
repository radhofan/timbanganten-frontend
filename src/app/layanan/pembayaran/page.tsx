import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PembayaranTable from "@/components/PembayaranTable";

export default function PembayaranPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header hideBanner />
      <div className="govuk-width-container" style={{ flex: 1 }}>
        <main className="govuk-main-wrapper" id="main-content" role="main">
          <PembayaranTable />
        </main>
      </div>
      <Footer />
    </div>
  );
}
