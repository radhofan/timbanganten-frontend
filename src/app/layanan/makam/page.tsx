import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MakamTable from "@/components/MakamTable";

export default function MakamPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header hideBanner />
      <div className="govuk-width-container" style={{ flex: 1 }}>
        <main className="govuk-main-wrapper" id="main-content" role="main">
          <MakamTable />
        </main>
      </div>
      <Footer />
    </div>
  );
}
