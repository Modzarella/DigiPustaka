import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/footer';
import { HiMiniBuildingLibrary } from "react-icons/hi2";

const Kontak = () => {
  // State buat data form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State buat error handling
  const [errors, setErrors] = useState({});

  // Fungsi handle perubahan input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fungsi submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama harus diisi";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Pesan harus diisi";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Pesan berhasil dikirim!");
      setFormData({ name: "", email: "", message: "" });
    }
  };

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
            <Link to="/fitur" className="text-gray-600 hover:text-gray-900">Fitur</Link>
            <Link to="/kontak" className="text-gray-900 font-semibold">Kontak</Link>
            <Link to="/login" className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">Login</Link>
            <Link to="/register" className="px-6 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">Registrasi</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6 text-gray-900">Kontak Kami</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Punya pertanyaan atau masukan? Silakan hubungi kami melalui form di bawah.
        </p>
      </div>

      {/* Contact Form */}
      <div className="container mx-auto px-4 pb-20">
        <div className="bg-gray-50 p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Nama</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">Pesan</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tulis pesanmu..."
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
            >
              Kirim Pesan
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Kontak;
