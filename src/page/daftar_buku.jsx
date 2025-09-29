import React, { useState } from 'react';
import Navbar2 from '../components/navbar';
import BookCard from '../components/BookCard';

const DaftarBukuPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const books = [
    {
      id: 1,
      title: 'Hujan',
      author: 'Tere Liye',
      year: '2022',
      rating: '4.5',
      coverUrl: '/src/assets/hujan.jpg'
    },
    {
      id: 2,
      title: 'Laut Bercerita',
      author: 'Leila S. Chudori',
      year: '2017',
      rating: '4.6',
      coverUrl: '/src/assets/laut-bercerita.jpg'
    },
    {
      id: 3,
      title: 'Filosofi Teras',
      author: 'Henry Manampiring',
      year: '2023',
      rating: '4.5',
      coverUrl: '/src/assets/filosofi-teras.jpg'
    },
    {
      id: 4,
      title: 'Pulang',
      author: 'Tere Liye',
      year: '2018',
      rating: '4.1',
      coverUrl: '/src/assets/pulang.jpg'
    },
    {
      id: 5,
      title: 'Seribu Wajah Ayah',
      author: 'Nurun Ala',
      year: '2020',
      rating: '4.3',
      coverUrl: '/src/assets/seribu-wajah-ayah.jpg'
    },
    {
      id: 6,
      title: 'Atomic Habits',
      author: 'James Clear',
      year: '2018',
      rating: '4.8',
      coverUrl: '/src/assets/atomic-habits.jpg'
    },
    {
      id: 7,
      title: 'Tentang Kamu',
      author: 'Tere Liye',
      year: '2016',
      rating: '4.7',
      coverUrl: '/src/assets/tentang-kamu.jpg'
    },
    {
      id: 8,
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      year: '2005',
      rating: '4.6',
      coverUrl: '/src/assets/laskar-pelangi.jpg'
    }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter books based on search query
  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar2 searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Daftar Buku</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {currentBooks.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              year={book.year}
              rating={book.rating}
              coverUrl={book.coverUrl}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === index + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {index + 1}
              </button>
            ))}
            
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DaftarBukuPage;