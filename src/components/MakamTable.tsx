"use client";

import { useState, useEffect } from "react";
import { Makam } from "@/components/types";
import Link from "next/link";

export default function MakamTable() {

  const [data, setData] = useState<Makam[]>([]);

  useEffect(() => {
    fetch('/api/makam')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  const [search, setSearch] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-4 ">

      <div className="text-3xl font-bold text-center mb-8">
        Status Pemakaman
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Cari nama, id, kerabat dll..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-2 py-1 rounded w-1/2 border-gray-300"
        />
        <div className="flex items-center space-x-2 border-gray-300">
          <div>Tempat Makam:</div>
          <select
            onChange={() => {
              // your handler here
            }}
            className="border px-2 py-1 rounded border-gray-300"
          >
            <option>Karang Anyar</option>
            <option>Dalem Kaum</option>
            <option>Dayeuhkolot</option>
          </select>
        </div>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(parseInt(e.target.value));
            setCurrentPage(1);
          }}
          className="border px-2 py-1 rounded border-gray-300"
        >
          <option value={1}>Show 1</option>
          <option value={5}>Show 5</option>
          <option value={10}>Show 10</option>
          <option value={12}>Show 12</option>
        </select>
      </div>

      <table className="w-full border-collapse border border-gray-300 text-sm font-sans text-gray-700">
        <thead className="bg-gray-50 border-b border-gray-300">
          <tr>
            {[
              "Blok Makam",
              "Nama Jenazah",
              "Lokasi",
              "Nama PJ",
              "Hubungan",
              "No. Kontak PJ",
              "Perpanjangan",
              "Masa Aktif",
              "Penjelasan",
              "Edit",
            ].map((header) => (
              <th key={header} className="px-4 py-3 font-semibold text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center py-6 text-gray-400 italic">
                No results found.
              </td>
            </tr>
          ) : (
            paginatedData.map((item) => (
              <tr
                key={item.blok}
                className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap text-center">{item.blok}</td>
                <td className="px-4 py-3 whitespace-nowrap font-medium text-center">{item.nama}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">{item.lokasi}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">{item.nama_penanggung_jawab}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">{item.silsilah}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">{item.kontak_penanggung_jawab}</td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        item.ext === "PAID"
                          ? "bg-green-100 text-green-800"
                          : ["PENDING", "VERIFICATION", "RESOLVING"].includes(item.ext ?? "")
                          ? "bg-yellow-100 text-yellow-800"
                          : item.ext === "LEWAT BATAS"
                          ? "bg-red-100 text-red-800"
                          : item.ext === "BELUM AKTIF"
                          ? "bg-gray-300 text-gray-700"
                          : ""
                      }
                    `}
                  >
                    {item.ext}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-center">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold
                      ${
                        item.ext === "BELUM AKTIF"
                          ? "bg-gray-300 text-gray-700"
                          : (() => {
                              if (!item.masa_aktif) return "";

                              const masaAktifDate = new Date(item.masa_aktif);
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);

                              return masaAktifDate >= today
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800";
                            })()
                      }
                    `}
                  >
                    {new Date(item.masa_aktif).toLocaleDateString("id-ID")}
                  </span>
                </td>
                {/* <td className="px-4 py-3 whitespace-nowrap text-center">{item.description}</td> */}
                <td className="px-4 py-3 max-w-xs break-words text-center">
                  {item.description && item.description.trim() !== "" ? (
                    <details className="group cursor-pointer">
                      <summary className="text-black underline underline-offset-2 list-none [&::-webkit-details-marker]:hidden">
                        <span className="group-open:hidden">Lihat Detail</span>
                        <span className="hidden group-open:inline">Tutup</span>
                      </summary>
                      <p className="mt-1 text-gray-800">{item.description}</p>
                    </details>
                  ) : (
                    <span className="text-gray-400 italic">Tidak ada penjelasan</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  <Link
                    href={`/admin/layanan/makam/${item.id}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label={`Edit ${item.nama}`}
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
            ))
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 border rounded disabled:opacity-50 border-gray-300"
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-1 border rounded disabled:opacity-50 border-gray-300"
        >
          Next
        </button>
      </div>
      
    </div>
  );
}
