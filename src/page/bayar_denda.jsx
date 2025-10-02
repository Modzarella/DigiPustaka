import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../components/navbar';
import fotoQris from '../assets/qris.jpg';

export default function BayarDenda() {
  const location = useLocation();
  const navigate = useNavigate();

  const isInvalid = !location.state || typeof location.state.price === "undefined" || typeof location.state.label === "undefined";

  const [form, setForm] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    address: "",
    ewalletNumber: "",
    bankAccount: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "cardNumber" || name === "cvv" || name === "ewalletNumber" || name === "bankAccount") {
      newValue = value.replace(/\D/g, "");
    }
    if (name === "expiry") {
      newValue = value.replace(/[^0-9/]/g, "");
      if (/^\d{3,}$/.test(newValue)) {
        newValue = newValue.replace(/^(\d{2})(\d{1,2}).*/, "$1/$2");
      }
    }

    setForm({ ...form, [name]: newValue });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSplash(true);
  };

  if (isInvalid) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow text-center">
          <h2 className="text-xl font-bold mb-4 text-red-600">Data pembayaran tidak ditemukan</h2>
          <p className="mb-4 text-gray-700">Silakan kembali ke halaman denda untuk memilih pembayaran.</p>
          <button
            onClick={() => navigate("/denda")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            Kembali ke Denda
          </button>
        </div>
      </div>
    );
  }

  const price = location.state.price;
  const label = location.state.label;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center">
          <svg className="animate-spin h-12 w-12 text-green-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
          </svg>
          <span className="text-green-700 font-semibold text-lg">Memuat halaman pembayaran...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-100 relative ${showSplash ? "overflow-hidden" : ""}`}>
      {showSplash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg px-10 py-12 flex flex-col items-center">
            <svg className="h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-green-200" fill="white"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4" className="text-green-500" stroke="currentColor" />
            </svg>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Pembayaran Berhasil!</h2>
            <p className="text-gray-700 mb-4">Terima kasih, pembayaran Anda telah dikonfirmasi.</p>
            <button
              onClick={() => navigate("/denda")}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Kembali ke Denda
            </button>
          </div>
        </div>
      )}

      <div className={showSplash ? "pointer-events-none filter blur-sm select-none" : ""}>
        <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
          <div className="bg-white p-6 shadow rounded">
            <h2 className=" border-b text-lg font-semibold mb-4">DigiPustaka</h2>
            <div className="padding-t-2 flex justify-between border-b py-2 mb-2">
              <span>{label}</span>
              <span>Rp {price.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between font-bold py-4">
              <span>Total</span>
              <span>Rp {price.toLocaleString("id-ID")}</span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-200 p-6 shadow rounded space-y-4"
          >
            <div>
              <label className="block font-medium mb-2">Metode Pembayaran</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="credit_card"
                    checked={paymentMethod === "credit_card"}
                    onChange={handlePaymentMethodChange}
                    className="mr-2"
                  />
                  Kartu Kredit/Debit
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="ewallet"
                    checked={paymentMethod === "ewallet"}
                    onChange={handlePaymentMethodChange}
                    className="mr-2"
                  />
                  E-Wallet (OVO, GoPay, DANA)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="qris"
                    checked={paymentMethod === "qris"}
                    onChange={handlePaymentMethodChange}
                    className="mr-2"
                  />
                  Qris
                </label>
              </div>
            </div>

            {paymentMethod === "credit_card" && (
              <>
                <div>
                  <label className="block font-medium mb-1">Nomor Kartu</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleChange}
                    placeholder="Nomor Kartu"
                    className="w-full p-2 border rounded"
                    required
                    inputMode="numeric"
                    maxLength={16}
                    autoComplete="cc-number"
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block font-medium mb-1">MM/YY</label>
                    <input
                      type="text"
                      name="expiry"
                      value={form.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="w-full p-2 border rounded"
                      required
                      inputMode="numeric"
                      maxLength={5}
                      autoComplete="cc-exp"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block font-medium mb-1">CVV2/CVC2</label>
                    <input
                      type="text"
                      name="cvv"
                      value={form.cvv}
                      onChange={handleChange}
                      placeholder="CVV"
                      className="w-full p-2 border rounded"
                      required
                      inputMode="numeric"
                      maxLength={4}
                      autoComplete="cc-csc"
                    />
                  </div>
                </div>
              </>
            )}

            {paymentMethod === "ewallet" && (
              <div>
                <label className="block font-medium mb-1">Nomor E-Wallet</label>
                <input
                  type="text"
                  name="ewalletNumber"
                  value={form.ewalletNumber}
                  onChange={handleChange}
                  placeholder="Masukkan nomor E-Wallet"
                  className="w-full p-2 border rounded"
                  required
                  inputMode="numeric"
                  maxLength={14}
                />
              </div>
            )}

            {paymentMethod === "qris" && (
              <div className="flex flex-col items-center">
                <img
                  src={fotoQris}
                  alt="QRIS"
                  className="w-100 h-120 shadow-md mb-2"
                />
                <span className="text-sm text-gray-700">Scan QRIS untuk membayar, lalu klik konfirmasi</span>
              </div>
            )}

            {paymentMethod === "credit_card" && (
              <div>
                <label className="block font-medium mb-1">Alamat</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="Alamat"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded font-bold hover:bg-green-600 transition"
              disabled={showSplash}
            >
              Konfirmasi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
