import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/navbar';

const BookDetail = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    // In a real app, you would fetch the book data based on the id
    console.log('Book ID:', id);
  }, [id]);

  // Sample book data
  const bookData = {
    id: 1,
    title: 'Hujan',
    author: 'Tere Liye',
    year: '2022',
    publisher: 'Gramedia Pustaka Utama',
    isbn: '978-602-03-XXXX-X',
    pages: 324,
    rating: 4.5,
    language: 'Indonesia',
    category: 'Novel',
    cover: '/src/assets/hujan.jpg',
    status: 'TERSEDIA',
    synopsis: `Novel Hujan merupakan novel yang mengisahkan kisah cinta serta perjuangan hidup Lail. Saat usianya baru menginjak 13 tahun, Lail menjadi seorang yatim piatu akibat ayah dan ibu Lail yang terkena letusan Gunung Api Purba dan gempa yang membuat kota tempat mereka tinggal hancur.

    Lail yang pada saat itu juga termasuk korban bencana berhasil diselamatkan oleh anak laki-laki bernama Esok. Lail dan Esok akhirnya menjadi sepasang yang tak terpisahkan sampai akhirnya mereka harus berpisah karena tempat pengungsian yang mereka tinggali tutup. Lail akhirnya menetap di sebuah panti sosial dan Esok diangkat menjadi anak salah satu keluarga.
    
    Mereka menjalani kehidupannya masing-masing. Pertemuan mereka untuk melepas rindu dilakukan rutin sebulan sekali meski akhirnya jadwal pertemuan harus diubah akibat Esok yang harus meneruskan pendidikan di luar kota. Pertemuan mereka berubah menjadi setiap Esok berlibur semester. Frekuensi pertemuan keduanya semakin jarang.`,
    availability: {
      totalCopies: 5,
      availableCopies: 3,
      borrowedCopies: 2
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleBorrow = () => {
    navigate('/peminjaman');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-lg shadow-gray-200/50 border-b border-gray-100 relative z-50">
        <Navbar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      </div>

      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-black mb-6 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Kembali
        </button>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Book Cover and Quick Info */}
            <div className="md:w-1/3">
              <img
                src={bookData.cover}
                alt={bookData.title}
                className="w-full h-auto rounded-lg shadow-md mb-6"
              />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <span className="text-lg font-bold mr-2">{bookData.rating}</span>
                    <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    bookData.status === 'TERSEDIA'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {bookData.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ketersediaan</span>
                  <span className="font-medium">{bookData.availability.availableCopies} dari {bookData.availability.totalCopies}</span>
                </div>
                <button
                  onClick={handleBorrow}
                  className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors mt-4"
                  disabled={bookData.status !== 'TERSEDIA'}
                >
                  Pinjam Buku
                </button>
              </div>
            </div>

            {/* Book Details */}
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{bookData.title}</h1>
              <h2 className="text-xl text-gray-600 mb-6">{bookData.author}</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-gray-600 mb-1">Tahun Terbit</h3>
                  <p className="font-medium">{bookData.year}</p>
                </div>
                <div>
                  <h3 className="text-gray-600 mb-1">Penerbit</h3>
                  <p className="font-medium">{bookData.publisher}</p>
                </div>
                <div>
                  <h3 className="text-gray-600 mb-1">ISBN</h3>
                  <p className="font-medium">{bookData.isbn}</p>
                </div>
                <div>
                  <h3 className="text-gray-600 mb-1">Jumlah Halaman</h3>
                  <p className="font-medium">{bookData.pages} halaman</p>
                </div>
                <div>
                  <h3 className="text-gray-600 mb-1">Bahasa</h3>
                  <p className="font-medium">{bookData.language}</p>
                </div>
                <div>
                  <h3 className="text-gray-600 mb-1">Kategori</h3>
                  <p className="font-medium">{bookData.category}</p>
                </div>
              </div>

              {/* Synopsis */}
              <div>
                <h3 className="text-xl font-bold mb-4">Sinopsis</h3>
                <div className="prose max-w-none">
                  {bookData.synopsis.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;