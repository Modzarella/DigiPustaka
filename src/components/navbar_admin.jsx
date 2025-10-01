import React from "react";

export default function NavbarAdmin({ activeTab, setActiveTab }) {
  return (
    <nav className="bg-white shadow-lg shadow-gray-200/50 border-b border-gray-100 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16">
        <div className="flex-shrink-0 text-2xl font-bold text-black tracking-tight mr-8">
          Admin DigiPustaka
        </div>
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              activeTab === "dashboard"
                ? "bg-black text-white"
                : "text-black hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              activeTab === "books"
                ? "bg-black text-white"
                : "text-black hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("books")}
          >
            Buku
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              activeTab === "users"
                ? "bg-black text-white"
                : "text-black hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("users")}
          >
            Users
          </button>
          <button
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              activeTab === "borrow"
                ? "bg-black text-white"
                : "text-black hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab("borrow")}
          >
            Riwayat Peminjaman
          </button>
        </div>
      </div>
    </nav>
  );
}