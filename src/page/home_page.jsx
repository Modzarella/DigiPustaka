import React, { useState } from 'react';
import Navbar from '../components/navbar';
import BookCard from '../components/BookCard';


const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const recommendations = [
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
      title: 'Atomic Habits',
      author: 'James Clear',
      year: '2018',
      rating: '4.8',
      coverUrl: '/src/assets/atomic-habits.jpg'
    },
    {
      id: 6,
      title: 'Tentang Kamu',
      author: 'Tere Liye',
      year: '2016',
      rating: '4.7',
      coverUrl: '/src/assets/tentang-kamu.jpg'
    },
    {
      id: 7,
      title: 'Laskar Pelangi',
      author: 'Andrea Hirata',
      year: '2005',
      rating: '4.6',
      coverUrl: '/src/assets/laskar-pelangi.jpg'
    }
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Recommendations Section */}
        <section className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-8">Rekomendasi dari kami</h2>
          
          {/* Scrollable Book List */}
          <div className="relative">
            <div className="overflow-x-auto scroll-smooth flex space-x-6 pb-4">
              {recommendations.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  year={book.year}
                  rating={book.rating}
                  coverUrl={book.coverUrl}
                />
              ))}
            </div>

            {/* Scroll Buttons */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
              onClick={() => {
                const container = document.querySelector('.overflow-x-auto');
                container.scrollBy({ left: -200, behavior: 'smooth' });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white"
              onClick={() => {
                const container = document.querySelector('.overflow-x-auto');
                container.scrollBy({ left: 200, behavior: 'smooth' });
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
