import React, { useState } from "react";
import AdminUsers from "./admin_users";
import AdminBuku from "./admin_buku";
import AdminRiwayat from "./admin_riwayat";
import NavbarAdmin from "../components/navbar_admin";
import AdminInfo from "./admin_info";



const initialUsers = [
  { id: 1, name: "Mamat Gunshop", email: "mamatguntank@gmail.com" },
  { id: 2, name: "Budi Santoso", email: "budi@gmail.com" }
];

const initialBorrowed = [
  { id: 1, bookTitle: "Hujan", user: "Mamat Gunshop", dueDate: "2025-10-10" },
  { id: 2, bookTitle: "Filosofi Teras", user: "Budi Santoso", dueDate: "2025-10-15" }
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [books, setBooks] = useState(initialBooks);
  const [users, setUsers] = useState(initialUsers);
  const [borrowed, setBorrowed] = useState(initialBorrowed);

  // Dashboard counts
  const availableBooks = books.filter((b) => b.available).length;
  const borrowedBooks = books.length - availableBooks;

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarAdmin activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="max-w-5xl mx-auto py-8">
        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div>
            <h3 className="text-2xl font-bold mb-6"> Selamat Datang Admin!</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded shadow flex flex-col items-center">
                <span className="text-4xl font-bold text-blue-700">{availableBooks}</span>
                <span className="text-gray-700 mt-2">Buku Tersedia</span>
              </div>
              <div className="bg-white p-6 rounded shadow flex flex-col items-center">
                <span className="text-4xl font-bold text-red-600">{borrowedBooks}</span>
                <span className="text-gray-700 mt-2">Buku Sedang Dipinjam</span>
              </div>
            </div>
          </div>
        )}

        {/* Books Management */}
        {activeTab === "books" && (
          <AdminBuku books={books} setBooks={setBooks} />
        )}

        {/* Users Management */}
        {activeTab === "users" && (
          <AdminUsers users={users} setUsers={setUsers} />
        )}

        {/* Borrowed Books Info */}
        {activeTab === "borrow" && (
          <AdminRiwayat borrowed={borrowed} />
        )}

        {/* Admin Info */}
        {activeTab === "info" && (
          <AdminInfo />
          )}

      </div>
    </div>
  );
}