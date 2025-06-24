"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminTable() {
  const data = [
    {
      id: 1,
      nama: "Radho Ramdhani",
      kontak: "081234567890",
      email: "radho@example.com",
    },
    {
      id: 2,
      nama: "Dewi Lestari",
      kontak: "089876543210",
      email: "dewi@example.com",
    },
    // Add more dummy users here if needed
  ];

  return (
    <div className="min-h-screen flex flex-col">
        <Header hideBanner />

        <main className="flex-1 p-12">  
        <div className="text-3xl font-bold text-center mb-8">Daftar Kontak</div>

        <table className="w-full border-collapse border border-gray-300 text-sm font-sans text-gray-700">
            <thead className="bg-gray-50 border-b border-gray-300">
            <tr>
                <th className="px-4 py-3 font-semibold text-center">Nama</th>
                <th className="px-4 py-3 font-semibold text-center">Kontak</th>
                <th className="px-4 py-3 font-semibold text-center">Email</th>
                <th className="px-4 py-3 font-semibold text-center">Edit</th>
            </tr>
            </thead>
            <tbody>
            {data.map((user) => (
                <tr
                key={user.id}
                className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                <td className="px-4 py-3 text-center">{user.nama}</td>
                <td className="px-4 py-3 text-center">{user.kontak}</td>
                <td className="px-4 py-3 text-center">{user.email}</td>
                <td className="px-4 py-3 text-center">
                    <Link
                    href={`/admin/users/${user.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Edit ${user.nama}`}
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 013 3L12 14l-4 1 1-4 7.5-7.5z"
                        />
                    </svg>
                    Edit
                    </Link>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
       </main>

      <Footer />
    </div>
  );
}
