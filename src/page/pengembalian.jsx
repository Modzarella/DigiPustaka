import React, { useState } from 'react';
import Navbar from '../components/navbar';
import SidebarBooks from '../components/sidebar_books';

// Import book covers
import hujanCover from '../assets/hujan.jpg';
import filosofiTerasCover from '../assets/filosofi-teras.jpg';

const PengembalianPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSplash, setShowSplash] = useState(false);

  // Sample borrowed books data
  const borrowedBooks = [
    {
      id: 1,
      title: 'Hujan',
      author: 'Tere Liye',
      cover: hujanCover,
      year: '2002',
      status: 'Terlambat',
      dueDate: '2025-09-15'
    },
    {
      id: 2,
      title: 'Filosofi Teras',
      author: 'Henry Manamping',
      cover: filosofiTerasCover,
      year: '2003',
      status: 'Kembalikan',
      dueDate: '2025-10-01'
    }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReturn = (bookId) => {
    setShowSplash(true);
  };

  return (
    <div className={`min-h-screen bg-gray-50 flex flex-col relative ${showSplash ? "overflow-hidden" : ""}`}>
      {/* Splash screen overlay */}
      {showSplash && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg px-10 py-12 flex flex-col items-center">
            <svg className="h-16 w-16 text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="text-green-200" fill="white"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4" className="text-green-500" stroke="currentColor" />
            </svg>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Pengembalian Berhasil!</h2>
            <p className="text-gray-700 mb-4">Buku berhasil dikembalikan. Terima kasih telah mengembalikan tepat waktu.</p>
            <button
              onClick={() => setShowSplash(false)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      <div className="bg-white shadow-lg shadow-gray-200/50 border-b border-gray-100 relative z-50">
        <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </div>
      
      <div className="flex h-[calc(100vh-64px)]">
        <div className="flex w-full">
          {/* Sidebar */}
          <SidebarBooks activeTab="pengembalian" />

          {/* Main Content */}
          <div className="flex-1 bg-white shadow-lg overflow-hidden">
            <div className="p-8 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 sticky top-0 bg-white py-4 z-10">Pengembalian Buku</h2>
              
              <div className="space-y-6">
                {borrowedBooks.map((book) => (
                  <div key={book.id} className="flex items-center gap-6 bg-gray-50 p-6 rounded-lg">
                    <div className="flex-shrink-0">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-28 h-40 object-cover rounded-md shadow-md"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold">{book.title}</h3>
                          <p className="text-gray-600">{book.author}</p>
                          <p className="text-sm text-gray-500">Tenggat: {book.dueDate}</p>
                        </div>
                        <button
                          onClick={() => handleReturn(book.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium ${
                            book.status === 'Terlambat'
                              ? 'bg-red-500 text-white'
                              : 'bg-black text-white hover:bg-gray-800'
                          } transition-colors`}
                        >
                          {book.status}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Late Return Warning */}
              <div className="mt-8 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3 sticky bottom-0">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="text-red-700">
                  Keterlambatan pengembalian akan dikenakan denda Rp 1.000/HARI
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PengembalianPage;