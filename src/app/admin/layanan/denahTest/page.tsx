"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Denah() {

  const handleClick = (e: React.MouseEvent) => {
    const id = (e.target as HTMLElement).id
    console.log('Clicked ID:', id)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header hideBanner />
      <div className="text-3xl font-bold text-center mb-4">
        Status Pemakaman
      </div>
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6 text-left">Pilih Kavling</h1>
        <div className="flex justify-between items-center mb-6">
          <div>
            <label htmlFor="graveyard-select" className="mr-2 font-semibold">
              Pilih Daerah:
            </label>
            <select
              id="graveyard-select"
              defaultValue="Dalem Kaum"
              className="border border-gray-300 rounded-md p-1"
            >
              <option>Dalem Kaum</option>
              <option>Dayeuhkolot</option>
              <option>Karang Anyar</option>
            </select>
          </div>
        </div>
        <div onClick={handleClick}>
        <object
            data="/images/Denah.svg"
            type="image/svg+xml"
            className="w-full h-auto"
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

