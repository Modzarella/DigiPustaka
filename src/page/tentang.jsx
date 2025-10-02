import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import { HiMiniBuildingLibrary } from "react-icons/hi2";

const Tentang = () => {
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
            <Link to="/tentang" className="text-gray-900 font-semibold">Tentang</Link>
            <Link to="/fitur" className="text-gray-600 hover:text-gray-900">Fitur</Link>
            <Link to="/kontak" className="text-gray-600 hover:text-gray-900">Kontak</Link>
            <Link to="/login" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">Login</Link>
            <Link to="/register" className="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">Registrasi</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">Tentang DigiPustaka</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          DigiPustaka adalah platform perpustakaan digital yang hadir untuk
          mendukung budaya membaca, berdiskusi, dan menemukan buku terbaik
          di era modern.
        </p>
      </div>

      {/* Visi Misi */}
      <div className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-8">
        <div className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">Visi</h2>
          <p className="text-gray-600">
            Menjadi platform literasi digital terdepan di Indonesia, memberikan
            akses buku tanpa batas bagi semua orang.
          </p>
        </div>
        <div className="bg-gray-50 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-3 text-gray-900">Misi</h2>
          <p className="text-gray-600">
            Menyediakan koleksi digital, forum diskusi interaktif, dan rekomendasi
            buku sesuai minat pembaca.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tentang;
