import React, { useState } from "react";

export default function AdminBuku({ books, setBooks }) {
  const [newBook, setNewBook] = useState({ title: "", author: "" });

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author) return;
    setBooks((prev) => [
      ...prev,
      { id: Date.now(), title: newBook.title, author: newBook.author, available: true }
    ]);
    setNewBook({ title: "", author: "" });
  };

  const handleDeleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kelola Buku</h2>
      <form onSubmit={handleAddBook} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Judul Buku"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          className="p-2 border rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Penulis"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          className="p-2 border rounded w-1/3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah Buku
        </button>
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Judul</th>
            <th className="py-2 px-4 border-b">Penulis</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td className="py-2 px-4 border-b">{book.title}</td>
              <td className="py-2 px-4 border-b">{book.author}</td>
              <td className="py-2 px-4 border-b">
                {book.available ? (
                  <span className="text-green-600 font-semibold">Tersedia</span>
                ) : (
                  <span className="text-red-600 font-semibold">Dipinjam</span>
                )}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}