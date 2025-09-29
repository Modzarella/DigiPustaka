import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 pt-16">
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="text-2xl font-bold">DigiPustaka</span>
          </Link>
          <div className="space-x-6">
            <a href="#about" className="text-gray-600 hover:text-gray-900">Tentang</a>
            <a href="#features" className="text-gray-600 hover:text-gray-900">Fitur</a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">Kontak</a>
            <Link to="/login" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">Login</Link>
            <Link to="/register" className="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">Registrasi</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">Selamat Datang di DigiPustaka</h1>
          <p className="text-xl mb-10 text-gray-600 max-w-3xl mx-auto">
            Platform perpustakaan digital untuk membaca, berdiskusi, dan menemukan buku terbaik untukmu.
          </p>
          <div className="space-x-4">
            <Link to="/login" className="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
              Mulai Jelajah
            </Link>
            <Link to="/register" className="inline-block bg-gray-100 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-4 py-20 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Akses Ribuan Buku</h3>
            <p className="text-gray-600">
              Temukan koleksi buku digital dari berbagai genre dan penulis.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">💭</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Forum Diskusi</h3>
            <p className="text-gray-600">
              Bergabung dengan komunitas pembaca untuk bertukar pikiran.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">Ulasan & Rekomendasi</h3>
            <p className="text-gray-600">
              Dapatkan rekomendasi berdasarkan ulasan pembaca lain.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
