import React, { useState } from 'react';
import Navbar from '../components/navbar';
import SidebarBooks from '../components/sidebar_books';

// Import book covers
import laskarPelangiCover from '../assets/laskar-pelangi.jpg';
import hujanCover from '../assets/hujan.jpg';
import filosofiTerasCover from '../assets/filosofi-teras.jpg';

const PeminjamanPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Sample books data
  const books = [
    {
      id: 1,
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      cover: laskarPelangiCover,
      year: '2005',
      status: 'Pinjam'
    },
    {
      id: 2,
      title: 'Hujan',
      author: 'Tere Liye',
      cover: hujanCover,
      year: '2002',
      status: 'Dipinjam'
    },
    {
      id: 3,
      title: 'Filosofi Teras',
      author: 'Henry Manamping',
      cover: filosofiTerasCover,
      year: '2003',
      status: 'Dipinjam'
    }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBorrow = (bookId) => {
    // Handle borrow action
    console.log('Borrowing book:', bookId);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-lg shadow-gray-200/50 border-b border-gray-100 relative z-50">
        <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </div>
      
      <div className="flex h-[calc(100vh-64px)]">
        <div className="flex w-full">
          {/* Sidebar */}
          <SidebarBooks activeTab="peminjaman" />

          {/* Main Content */}
          <div className="flex-1 bg-white shadow-lg overflow-hidden">
            <div className="p-8 h-full overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 sticky top-0 bg-white py-4 z-10">Peminjaman Buku</h2>
              
              <div className="space-y-6">
                {books.map((book) => (
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
                          <p className="text-sm text-gray-500">{book.year}</p>
                        </div>
                        <button
                          onClick={() => handleBorrow(book.id)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            book.status === 'Pinjam'
                              ? 'bg-green-500 text-white hover:bg-green-600'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={book.status === 'Dipinjam'}
                        >
                          {book.status}
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

export default PeminjamanPage;