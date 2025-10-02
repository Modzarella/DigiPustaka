import React, { useState } from 'react';
import Navbar from '../components/navbar';
import SidebarProfile from '../components/sidebar_profile';
import { useNavigate } from "react-router-dom";

const MembershipPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  // Sample user data
  const userData = {
    name: 'Mamat Gunshop',
    email: 'mamatguntank@gmail.com',
    profilePicture: null,
    membership: {
      type: 'Standard',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      daysRemaining: 94,
      benefits: [
        'Peminjaman maksimal 3 buku',
        'Durasi peminjaman 14 hari',
        'Perpanjangan 1x'
      ]
    }
  };

  // Membership plans
  const membershipPlans = [
    {
      id: 1,
      name: 'Basic',
      price: 50000,
      duration: '6 Bulan',
      benefits: [
        'Peminjaman maksimal 2 buku',
        'Durasi peminjaman 7 hari',
        'Tanpa perpanjangan',
        'Akses katalog dasar'
      ]
    },
    {
      id: 2,
      name: 'Standard',
      price: 100000,
      duration: '12 Bulan',
      benefits: [
        'Peminjaman maksimal 3 buku',
        'Durasi peminjaman 14 hari',
        'Perpanjangan 1x',
        'Akses katalog lengkap'
      ],
      isPopular: true
    },
    {
      id: 3,
      name: 'Premium',
      price: 150000,
      duration: '12 Bulan',
      benefits: [
        'Peminjaman maksimal 5 buku',
        'Durasi peminjaman 21 hari',
        'Perpanjangan 2x',
        'Akses katalog lengkap',
        'Prioritas peminjaman buku baru',
        'Notifikasi buku baru'
      ]
    }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Redirect to bayar_denda with price and label
  const handleExtendMembership = (planId) => {
    const plan = membershipPlans.find((p) => p.id === planId);
    if (plan) {
      navigate("/bayar_denda", { state: { price: plan.price, label: `Membership ${plan.name}` } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-lg shadow-gray-200/50 border-b border-gray-100 relative z-50">
        <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </div>
      
      <div className="flex h-[calc(100vh-64px)]">
        <div className="flex w-full">
          {/* Sidebar */}
          <SidebarProfile activeTab="membership" userData={userData} />

          {/* Main Content */}
          <div className="flex-1 bg-white shadow-lg overflow-hidden">
            <div className="p-8 h-full overflow-y-auto">
              {/* Current Membership Status */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Status Membership</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-gray-600">Tipe Membership</p>
                      <p className="text-xl font-bold">{userData.membership.type}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Sisa Waktu</p>
                      <p className="text-xl font-bold">{userData.membership.daysRemaining} Hari</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tanggal Mulai</p>
                      <p className="font-medium">{userData.membership.startDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Tanggal Berakhir</p>
                      <p className="font-medium">{userData.membership.endDate}</p>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="font-medium mb-2">Manfaat Membership:</p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {userData.membership.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Membership Plans */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Perpanjang Membership</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {membershipPlans.map((plan) => (
                    <div 
                      key={plan.id}
                      className={`rounded-lg overflow-hidden ${
                        plan.isPopular ? 'border-2 border-blue-500' : 'border border-gray-200'
                      }`}
                    >
                      {plan.isPopular && (
                        <div className="bg-blue-500 text-white text-center py-1 text-sm font-medium">
                          Terpopuler
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold">
                            Rp {plan.price.toLocaleString()}
                          </span>
                          <span className="text-gray-600">/{plan.duration}</span>
                        </div>
                        <ul className="space-y-3 mb-6">
                          {plan.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                              <span className="text-gray-600">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          onClick={() => handleExtendMembership(plan.id)}
                          className={`w-full py-2 rounded-lg transition-colors ${
                            plan.isPopular
                              ? 'bg-blue-500 text-white hover:bg-blue-600'
                              : 'bg-black text-white hover:bg-gray-800'
                          }`}
                        >
                          Pilih Paket
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Membership Information */}
              <div className="mt-8 sticky bottom-0 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-blue-700 font-medium">Informasi Membership:</p>
                    <p className="text-blue-600">Perpanjangan membership dapat dilakukan sebelum masa aktif berakhir</p>
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

export default MembershipPage;