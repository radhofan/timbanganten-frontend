import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PembayaranTable from "@/components/PembayaranTable";

export default function Admin() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header hideBanner />

      <main className="flex-1 bg-white page-container">
        <PembayaranTable />
      </main>

      <Footer />
    </div>
  );
}
