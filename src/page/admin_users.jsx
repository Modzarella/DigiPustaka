import React, { useState } from "react";

export default function AdminUsers({ users, setUsers }) {
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [editUserId, setEditUserId] = useState(null);
  const [editUser, setEditUser] = useState({ name: "", email: "" });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email) return;
    setUsers((prev) => [
      ...prev,
      { id: Date.now(), name: newUser.name, email: newUser.email }
    ]);
    setNewUser({ name: "", email: "" });
  };

  const handleDeleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEditUser({ name: user.name, email: user.email });
  };

  const handleSaveEditUser = (e) => {
    e.preventDefault();
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editUserId ? { ...u, name: editUser.name, email: editUser.email } : u
      )
    );
    setEditUserId(null);
    setEditUser({ name: "", email: "" });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kelola User</h2>
      <form onSubmit={handleAddUser} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Nama"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="p-2 border rounded w-1/3"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="p-2 border rounded w-1/3"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Tambah User
        </button>
      </form>
      <table className="w-full bg-white rounded shadow">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nama</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editUserId === user.id ? (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">
                  <input
                    type="text"
                    value={editUser.name}
                    onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                    className="p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="email"
                    value={editUser.email}
                    onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    className="p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border-b flex gap-2">
                  <button
                    onClick={handleSaveEditUser}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Simpan
                  </button>
                  <button
                    onClick={() => setEditUserId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Batal
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">{user.email}</td>
                <td className="py-2 px-4 border-b flex gap-2">
                  <button
                    onClick={() => handleEditUser(user)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}