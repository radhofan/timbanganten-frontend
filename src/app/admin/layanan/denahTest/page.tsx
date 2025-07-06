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
        <div onClick={handleClick}>
          <object
            data="/images/Denah.svg"
            type="image/svg+xml"
            className="w-full h-auto"
          />
        </div>
      <Footer />
    </div>
  );
}

