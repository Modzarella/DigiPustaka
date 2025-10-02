import React, { useState } from 'react';
import Navbar from '../components/navbar';

// Import book covers
import laskarPelangiCover from '../assets/laskar-pelangi.jpg';
import hujanCover from '../assets/hujan.jpg';
import atomicHabitsCover from '../assets/atomic-habits.jpg';
import filosofiTerasCover from '../assets/filosofi-teras.jpg';
import lautBerceritaCover from '../assets/laut-bercerita.jpg';
import pulangCover from '../assets/pulang.jpg';
import seribuWajahAyahCover from '../assets/seribu-wajah-ayah.jpg';
import tentangKamuCover from '../assets/tentang-kamu.jpg';

const UlasanPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(null);  
  const [selectedBook, setSelectedBook] = useState(null);
  
  // Available books data
  const availableBooks = [
    { id: 1, title: 'Laskar Pelangi', cover: laskarPelangiCover, author: 'Andrea Hirata' },
    { id: 2, title: 'Hujan', cover: hujanCover, author: 'Tere Liye' },
    { id: 3, title: 'Atomic Habits', cover: atomicHabitsCover, author: 'James Clear' },
    { id: 4, title: 'Filosofi Teras', cover: filosofiTerasCover, author: 'Henry Manampiring' },
    { id: 5, title: 'Laut Bercerita', cover: lautBerceritaCover, author: 'Leila S. Chudori' },
    { id: 6, title: 'Pulang', cover: pulangCover, author: 'Tere Liye' },
    { id: 7, title: 'Seribu Wajah Ayah', cover: seribuWajahAyahCover, author: 'Rudi Hartanto' },
    { id: 8, title: 'Tentang Kamu', cover: tentangKamuCover, author: 'Tere Liye' }
  ];

  // Sample review data - in a real app, this would come from a backend
  const [reviews, setReviews] = useState([
    {
      id: 1,
      bookTitle: 'Laskar Pelangi',
      bookCover: laskarPelangiCover,
      author: 'BebekHitamPakQris',
      rating: 4,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec lacinia justo, non gravida arcu. Pellentesque sodales volutpat lorem, id facilisis dui bibendum at.',
      timestamp: '2 jam yang lalu',
      likes: 12,
      comments: 3
    },
    {
      id: 2,
      bookTitle: 'Hujan',
      bookCover: hujanCover,
      author: 'Uget-Uget Magelang',
      rating: 5,
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec lacinia justo, non gravida arcu. Pellentesque sodales volutpat lorem, id facilisis dui bibendum at.',
      timestamp: '3 jam yang lalu',
      likes: 8,
      comments: 2
    }
  ]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!selectedBook || !rating || !newReview.trim()) return;

    const newReviewObj = {
      id: reviews.length + 1,
      bookTitle: selectedBook.title,
      bookCover: selectedBook.cover,
      author: 'Mamat Gunshop', // This would normally come from authenticated user
      rating: rating,
      content: newReview,
      timestamp: 'Baru saja',
      likes: 0,
      comments: 0
    };

    setReviews([newReviewObj, ...reviews]);
    setNewReview('');
    setRating(0);
    setSelectedBook(null);
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
    <div className="min-h-screen bg-gray-50">
      <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Ulasan Buku</h1>
        
        {/* Add New Review Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Tambah Ulasan Baru</h2>
          <form onSubmit={handleReviewSubmit}>
            {/* Book Selection */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Pilih Buku</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <select
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black appearance-none bg-white"
                    onChange={(e) => setSelectedBook(availableBooks.find(book => book.id === parseInt(e.target.value)))}
                    value={selectedBook?.id || ''}
                  >
                    <option value="">Pilih buku untuk diulas</option>
                    {availableBooks.map(book => (
                      <option key={book.id} value={book.id}>{book.title} - {book.author}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                
                {/* Selected Book Preview */}
                {selectedBook && (
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedBook.cover}
                      alt={selectedBook.title}
                      className="w-24 h-36 object-cover rounded-md shadow"
                    />
                    <div>
                      <h3 className="font-semibold">{selectedBook.title}</h3>
                      <p className="text-gray-600">{selectedBook.author}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

             
      <div className="mb-4">
      <label className="block text-gray-700 mb-2">Rating</label>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className={`h-8 w-8 transition-colors duration-200 ${
                star <= (hovered ?? rating) ? 'text-yellow-400' : 'text-gray-300'
              }`}
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.245 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z" />
            </svg>
          </button>
        ))}
      </div>
    </div>



            {/* Review Text */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Ulasan Anda</label>
              <textarea
                value={newReview}
                onChange={(e) => setNewReview(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                rows="4"
                placeholder="Bagikan pendapat Anda tentang buku ini..."
                disabled={!selectedBook}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg transition-colors ${
                selectedBook
                  ? 'bg-black text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!selectedBook}
            >
              Kirim Ulasan
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex space-x-6">
                {/* Book Cover */}
                <div className="flex-shrink-0">
                  <img
                    src={review.bookCover}
                    alt={review.bookTitle}
                    className="w-32 h-48 object-cover rounded-md shadow"
                  />
                </div>

                {/* Review Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{review.bookTitle}</h3>
                    <span className="text-sm text-gray-500">{review.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    {renderStars(review.rating)}
                    <span className="text-gray-600">({review.rating})</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="font-medium">{review.author}</span>
                  </div>

                  <p className="text-gray-600 mb-4">{review.content}</p>

                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span>{review.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>{review.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default UlasanPage;