import React from "react";

export default function AdminInfo() {
  // Dummy data untuk informasi admin
  const admins = [
    {
      name: "Asep Kejepit",
      email: "asep@digipustaka.com",
      role: "Administrator",
      phone: "0812-3456-7890",
      foto: "https://i.pinimg.com/736x/1a/2f/bf/1a2fbfaffc9629cafd31cf459723a15b.jpg"
    },
    {
      name: "Rina Putri",
      email: "rina@digipustaka.com",
      role: "Staff Pustaka",
      phone: "0813-9876-5432",
      foto: "https://i.pinimg.com/736x/f8/88/43/f88843d1cc3408beb23fff7018bcb796.jpg"
    },
    {
      name: "Budi Santoso",
      email: "budi@digipustaka.com",
      role: "Petugas Layanan",
      phone: "0821-2345-6789",
      foto: "https://i.pinimg.com/736x/00/30/6a/00306a791bc8af00f9b39b2ae965c755.jpg"
    }
  ];
``
  return (
    <div className="bg-white p-6 rounded shadow">
      <h3 className="text-2xl font-bold mb-6">Informasi Admin</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {admins.map((admin, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 border rounded shadow-sm"
          >
            <img
              src={admin.foto}
              alt={`Foto ${admin.name}`}
              className="w-24 h-24 rounded-full border mb-4"
            />
            <p className="text-lg font-semibold">{admin.name}</p>
            <p className="text-gray-600">{admin.email}</p>
            <p className="text-gray-600">{admin.phone}</p>
            <p className="text-gray-600 italic">{admin.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
