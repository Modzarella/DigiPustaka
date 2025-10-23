import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import BookCard from '../components/BookCard';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch genres (once)
  useEffect(() => {
    fetchGenres();
  }, []);

  // Fetch books (every time selectedGenre changes)
  useEffect(() => {
    fetchBooks();
  }, [selectedGenre]);

  // Fetch genre list
  const fetchGenres = async () => {
    try {
      const response = await fetch('http://localhost/digipustaka/api/genres.php');
      const data = await response.json();

      if (data.status === "success") {
        setGenres(data.data);
      } else {
        console.error("Failed to load genres:", data);
      }
    } catch (error) {
      console.error("Fetch genres error:", error);
    }
  };

  // Fetch book list
 const fetchBooks = async (search = '') => {
  setLoading(true);
  setError(null);

  try {
    let url = 'http://localhost/digipustaka/api/book.php?limit=20';
    if (search) url += `&search=${encodeURIComponent(search)}`;
    if (selectedGenre) url += `&genre_id=${selectedGenre}`;

    const response = await fetch(url);
    const text = await response.text();

    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}: ${text}`);
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("❌ JSON parse error:", text);
      throw new Error("Response bukan JSON valid");
    }

    if (data.status === "success") {
      setRecommendations(data.data);
    } else {
      throw new Error(data.message || "Gagal memuat data buku");
    }

  } catch (error) {
    console.error("Fetch error:", error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
  // Search handler (only updates query)
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Debounce search — fetch after user stops typing 500ms
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchBooks(searchQuery);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Handle genre filter click
  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setSearchQuery('');
  };

  // Scroll navigation buttons
  const handleScrollLeft = () => {
    const container = document.querySelector('.overflow-x-auto');
    if (container) {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    const container = document.querySelector('.overflow-x-auto');
    if (container) {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Genre Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-3 overflow-x-auto pb-2">
            <button
              onClick={() => handleGenreChange('')}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedGenre === '' 
                  ? 'bg-green-500 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Semua Genre
            </button>
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreChange(genre.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedGenre === genre.id 
                    ? 'bg-green-500 text-white shadow-md' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {genre.name} ({genre.bookCount})
              </button>
            ))}
          </div>
        </div>

        {/* Books Section */}
        <section className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-8">
            {searchQuery 
              ? `Hasil pencarian "${searchQuery}"`
              : selectedGenre 
                ? `Genre: ${genres.find(g => g.id === selectedGenre)?.name || ''}`
                : 'Rekomendasi dari kami'}
          </h2>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && recommendations.length === 0 && (
            <div className="text-center py-20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-gray-500 text-lg">Tidak ada buku yang ditemukan</p>
            </div>
          )}

          {/* Book List */}
          {!loading && !error && recommendations.length > 0 && (
            <div className="relative">
              <div className="overflow-x-auto scroll-smooth flex space-x-6 pb-4">
                {recommendations.map((book) => (
                  <BookCard
                    key={book.id}
                    id={book.id}
                    title={book.title}
                    author={book.author}
                    year={book.year}
                    rating={book.rating}
                    coverUrl={book.coverUrl}
                    genres={book.genres}
                  />
                ))}
              </div>

              {/* Scroll Buttons */}
              {recommendations.length > 3 && (
                <>
                  <button
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all z-10"
                    onClick={handleScrollLeft}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-all z-10"
                    onClick={handleScrollRight}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default HomePage;
