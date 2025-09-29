import React, { useState } from 'react';
import Navbar from '../components/navbar';
import SidebarProfile from '../components/sidebar_profile';

// Import book covers
import laskarPelangiCover from '../assets/laskar-pelangi.jpg';
import atomicHabitsCover from '../assets/atomic-habits.jpg';

const RiwayatUser = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample user data - should be fetched from backend in real application
  const userData = {
    name: 'Mamat Gunshop',
    email: 'mamatguntank@gmail.com',
    profilePicture: null,
    readingHistory: [
      {
        id: 1,
        title: 'Laskar Pelangi',
        author: 'Andrea Hirata',
        cover: laskarPelangiCover,
        returnDate: '2025-09-15',
        rating: 5,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec lacinia justo, non gravida arcu. Pellentesque sodales volutpat lorem, id facilisis dui bibendum at.',
        status: 'Selesai'
      },
      {
        id: 2,
        title: 'Atomic Habits',
        author: 'James Clear',
        cover: atomicHabitsCover,
        returnDate: '2025-09-01',
        rating: 4,
        review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec lacinia justo, non gravida arcu. Pellentesque sodales volutpat lorem, id facilisis dui bibendum at.',
        status: 'Selesai'
      }
    ]
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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSidebarClick = (id) => {
    switch(id) {
      case 'profile':
        navigate('/profile');
        break;
      case 'history':
        navigate('/riwayat');
        break;
      case 'fine':
        navigate('/denda');
        break;
      case 'membership':
        navigate('/membership');
        break;
      case 'books':
        navigate('/books');
        break;
      default:
        break;
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`h-5 w-5 ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-lg shadow-gray-200/50 border-b border-gray-100 relative z-50">
        <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </div>
      
      <div className="flex h-[calc(100vh-64px)]">
        <div className="flex w-full">
          {/* Sidebar */}
          <SidebarProfile activeTab="history" userData={userData} />

          {/* Main Content */}
          <div className="flex-1 bg-white shadow-lg">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">Riwayat Bacaan</h2>
              
              <div className="space-y-8">
                {userData.readingHistory.map((book) => (
                  <div key={book.id} className="flex gap-6 bg-gray-50 p-6 rounded-lg">
                    {/* Book Cover */}
                    <div className="flex-shrink-0">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-32 h-48 object-cover rounded-md shadow-md"
                      />
                    </div>

                    {/* Book Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-semibold">{book.title}</h3>
                          <p className="text-gray-600">{book.author}</p>
                        </div>
                        <span className="text-sm text-gray-500">
                          Dikembalikan: {book.returnDate}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2 mb-4">
                        {renderStars(book.rating)}
                        <span className="text-gray-600">({book.rating}/5)</span>
                      </div>

                      <p className="text-gray-700 mb-4">{book.review}</p>

                      <div className="flex items-center justify-between">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          book.status === 'Selesai' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {book.status}
                        </span>
                        <button className="text-sm text-gray-600 hover:text-black transition-colors">
                          Tulis Ulasan
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatUser;
