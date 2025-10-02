import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import { HiMiniBuildingLibrary } from "react-icons/hi2";

const Fitur = () => {
  const fiturList = [
    { icon: "📚", title: "Akses Ribuan Buku", desc: "Nikmati koleksi buku digital dari berbagai genre dan penulis." },
    { icon: "💬", title: "Forum Diskusi", desc: "Tempat bertukar pikiran dengan pembaca lain melalui forum." },
    { icon: "⭐", title: "Ulasan & Rekomendasi", desc: "Dapatkan rekomendasi berdasarkan ulasan pembaca lain." },
    { icon: "🔖", title: "Bookmark & Koleksi", desc: "Simpan buku favoritmu ke dalam koleksi pribadimu." },
    { icon: "📱", title: "Akses Mobile", desc: "Baca buku dari mana saja lewat perangkat mobile." },
    { icon: "⚡", title: "Pencarian Cepat", desc: "Temukan buku favoritmu dengan fitur pencarian yang cepat." },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800 pt-16">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <HiMiniBuildingLibrary className="h-8 w-8" />
            <span className="text-2xl font-bold">DigiPustaka</span>
          </Link>
          <div className="space-x-6">
            <Link to="/tentang" className="text-gray-600 hover:text-gray-900">Tentang</Link>
            <Link to="/fitur" className="text-gray-900 font-semibold">Fitur</Link>
            <Link to="/kontak" className="text-gray-600 hover:text-gray-900">Kontak</Link>
            <Link to="/login" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">Login</Link>
            <Link to="/register" className="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">Registrasi</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">Fitur Utama</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Fitur-fitur unggulan yang tersedia di DigiPustaka untuk menunjang
          pengalaman literasi digitalmu.
        </p>
      </div>

      {/* Features List */}
      <div className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {fiturList.map((f, i) => (
          <div key={i} className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center">
            <div className="text-4xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Fitur;
