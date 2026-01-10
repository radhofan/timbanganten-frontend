import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MakamTable from "@/components/MakamTable";

export default function Admin() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header hideBanner />

      <main className="flex-1 p-12 bg-white">
        <MakamTable />
      </main>

      <Footer />
    </div>
  );
}
