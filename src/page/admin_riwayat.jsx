import React from "react";

export default function AdminRiwayat({ borrowed }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Informasi Peminjaman</h2>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Judul Buku</th>
            <th className="py-2 px-4 border-b">Peminjam</th>
            <th className="py-2 px-4 border-b">Jatuh Tempo</th>
          </tr>
        </thead>
        <tbody>
          {borrowed.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-b">{item.bookTitle}</td>
              <td className="py-2 px-4 border-b">{item.user}</td>
              <td className="py-2 px-4 border-b">{item.dueDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}