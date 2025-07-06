"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from 'next/router'

export default function Denah() {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    const id = (e.target as HTMLElement).id
    if (id?.startsWith('makam-')) {
      const num = id.replace('makam-', '')
      router.push(`/makam/${num}`)
    }
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

