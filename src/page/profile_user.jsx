import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import SidebarProfile from '../components/sidebar_profile';

const ProfileUser = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  // Sample user data - in a real app, this would come from your backend
  const userData = {
    name: 'Mamat Gunshop',
    email: 'mamatguntank@gmail.com',
    password: '••••••••••••',
    denda: 'Rp 3.000.000',
    membership: '12 Bulan',
    profilePicture: null,
    borrowedBooks: [
      { id: 1, title: 'Laskar Pelangi', dueDate: '2025-10-15' },
      { id: 2, title: 'Atomic Habits', dueDate: '2025-10-20' }
    ],
    readingHistory: [
      { id: 1, title: 'Hujan', returnDate: '2025-09-15' },
      { id: 2, title: 'Filosofi Teras', returnDate: '2025-09-01' }
    ]
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const sidebarItems = [
    { id: 'profile', label: 'Profile', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { id: 'history', label: 'Riwayat', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { id: 'fine', label: 'Denda', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
    { id: 'membership', label: 'Membership', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    )},
    { id: 'books', label: 'Buku', icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    )}
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-lg shadow-gray-200/50 border-b border-gray-100 relative z-50">
        <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </div>
      
      <div className="flex h-[calc(100vh-64px)]"> {/* 64px is navbar height */}
        <div className="flex w-full">
          {/* Sidebar */}
          <SidebarProfile activeTab="profile" userData={userData} />

          {/* Main Content */}
          <div className="flex-1 bg-white shadow-lg">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Informasi Profil</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Nama
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                    <span>{userData.name}</span>
                    <button className="text-sm text-gray-500 hover:text-black transition-colors">
                      Edit
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Email
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                    <span>{userData.email}</span>
                    <button className="text-sm text-gray-500 hover:text-black transition-colors">
                      Edit
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Password
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                    <span>{userData.password}</span>
                    <button className="text-sm text-gray-500 hover:text-black transition-colors">
                      Ubah
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Denda
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                    <span className="text-red-500 font-medium">{userData.denda}</span>
                    <button 
                      onClick={() => navigate('/denda')}
                      className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Bayar
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    Membership
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                    <span>{userData.membership}</span>
                    <button 
                      onClick={() => navigate('/membership')}
                      className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Perpanjang
                    </button>
                  </div>
                </div>

                {activeTab === 'books' && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Buku yang Dipinjam</h3>
                    <div className="space-y-4">
                      {userData.borrowedBooks.map(book => (
                        <div key={book.id} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
                          <span>{book.title}</span>
                          <span className="text-sm text-gray-500">Jatuh tempo: {book.dueDate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;