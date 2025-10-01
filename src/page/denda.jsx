import React, { useState } from 'react';
import Navbar from '../components/navbar';
import SidebarProfile from '../components/sidebar_profile';
import { useNavigate } from "react-router-dom";

const DendaPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample user data
  const userData = {
    name: 'Mamat Gunshop',
    email: 'mamatguntank@gmail.com',
    profilePicture: null,
    totalFine: 3000000,
    unpaidFines: [
      {
        id: 1,
        bookTitle: 'Hujan',
        dueDate: '2025-09-15',
        returnDate: '2025-09-28',
        daysLate: 13,
        amount: 13000,
        status: 'Belum Dibayar'
      },
      {
        id: 2,
        bookTitle: 'Filosofi Teras',
        dueDate: '2025-09-01',
        returnDate: '2025-09-28',
        daysLate: 27,
        amount: 27000,
        status: 'Belum Dibayar'
      }
    ],
    paidFines: [
      {
        id: 3,
        bookTitle: 'Laskar Pelangi',
        dueDate: '2025-08-15',
        returnDate: '2025-08-25',
        daysLate: 10,
        amount: 10000,
        status: 'Lunas',
        paymentDate: '2025-08-26'
      }
    ]
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const navigate = useNavigate();

  // Helper to navigate to payment with price and label
  const goToPayment = (price, label) => {
    navigate("/bayar_denda", { state: { price, label } });
  };

  const handlePayFine = (fineId) => {
    const fine = userData.unpaidFines.find((f) => f.id === fineId);
    if (fine) {
      goToPayment(fine.amount, fine.bookTitle);
    }
  };

  const handlePayAllFines = (e) => {
    e.preventDefault();
    goToPayment(userData.totalFine, "Bayar Semua Denda");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-lg shadow-gray-200/50 border-b border-gray-100 relative z-50">
        <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </div>
      
      <div className="flex h-[calc(100vh-64px)]">
        <div className="flex w-full">
          {/* Sidebar */}
          <SidebarProfile activeTab="fine" userData={userData} />

          {/* Main Content */}
          <div className="flex-1 bg-white shadow-lg overflow-hidden">
            <div className="p-8 h-full overflow-y-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Informasi Denda</h2>
                <div className="bg-red-50 p-6 rounded-lg border border-red-200">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-medium text-red-800">Total Denda</span>
                    <span className="text-2xl font-bold text-red-600">Rp {userData.totalFine.toLocaleString()}</span>
                  </div>
                  <button
                    className="w-full block text-center bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors"
                    onClick={handlePayAllFines}
                  >
                    Bayar Semua Denda
                  </button>
                </div>
              </div>

              {/* Unpaid Fines */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Denda Belum Dibayar</h3>
                <div className="space-y-4">
                  {userData.unpaidFines.map((fine) => (
                    <div key={fine.id} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-semibold text-lg">{fine.bookTitle}</h4>
                          <p className="text-sm text-gray-600">Jatuh tempo: {fine.dueDate}</p>
                          <p className="text-sm text-gray-600">Dikembalikan: {fine.returnDate}</p>
                          <p className="text-sm text-gray-600">Terlambat: {fine.daysLate} hari</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-red-600 mb-2">
                            Rp {fine.amount.toLocaleString()}
                          </p>
                          <button
                            className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors"
                            onClick={() => handlePayFine(fine.id)}
                          >
                            Bayar Denda
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Paid Fines History */}
              <div>
                <h3 className="text-xl font-bold mb-4">Riwayat Pembayaran Denda</h3>
                <div className="space-y-4">
                  {userData.paidFines.map((fine) => (
                    <div key={fine.id} className="bg-gray-50 p-6 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-lg">{fine.bookTitle}</h4>
                          <p className="text-sm text-gray-600">Jatuh tempo: {fine.dueDate}</p>
                          <p className="text-sm text-gray-600">Dikembalikan: {fine.returnDate}</p>
                          <p className="text-sm text-gray-600">Terlambat: {fine.daysLate} hari</p>
                          <p className="text-sm text-gray-600">Dibayar pada: {fine.paymentDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600 mb-2">
                            Rp {fine.amount.toLocaleString()}
                          </p>
                          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            Lunas
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fine Information */}
              <div className="mt-8 sticky bottom-0 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-red-700 font-medium">Informasi Denda:</p>
                    <p className="text-red-600">Keterlambatan pengembalian dikenakan denda Rp 1.000/hari/buku</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DendaPage;