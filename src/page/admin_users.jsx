import React, { useEffect, useState } from "react";

export default function AdminUsers({ users = [], setUsers }) {
  const [newUser, setNewUser] = useState({ name: "", email: "", phone: "", address: "" });
  const [editUserId, setEditUserId] = useState(null);
  const [editUser, setEditUser] = useState({ name: "", email: "", phone: "", address: "" });

  useEffect(() => {
  fetch("http://localhost/digipustaka/api/user_CRUD.php?action=read")
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data.status === "success") {
        setUsers(data.data); 
      } else {
        console.error("Error loading users:", data.message);
      }
    })
    .catch((err) => {
      console.error("Fetch error:", err);
    });
}, []);


  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.email || !newUser.phone || !newUser.address) return;
    fetch("http://localhost/digipustaka/api/user_CRUD.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create",
        membership_id: Math.floor(Math.random() * 1000000) + 1,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address,
        membership_date: new Date().toISOString().split('T')[0],
        expiration_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUsers((prev) => [...prev, { id: data.id, ...newUser }]);
          setNewUser({ name: "", email: "", phone: "", address: "" });
        } else {
          console.error("Error adding user:", data.message);
        }
      })
      .catch((err) => {
        console.error("Add user error:", err);
      });
  };

  const handleDeleteUser = (id) => {
    fetch("http://localhost/digipustaka/api/user_CRUD.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        action: "delete", 
        membership_id: id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUsers((prev) => prev.filter((u) => u.id !== id));
        } else {
          console.error("Error deleting user:", data.message);
        }
      })
      .catch((err) => {
        console.error("Delete user error:", err);
      });
  };

  const handleEditUser = (user) => {
    setEditUserId(user.id);
    setEditUser({ name: user.name, email: user.email, phone: user.phone, address: user.address });
  };

  const handleSaveEditUser = (e) => {
    e.preventDefault();
    fetch("http://localhost/digipustaka/api/user_CRUD.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update",
        membership_id: editUserId,
        name: editUser.name,
        email: editUser.email,
        phone: editUser.phone,
        address: editUser.address
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setUsers((prev) =>
            prev.map((u) =>
              u.id === editUserId
                ? { ...u, name: editUser.name, email: editUser.email, phone: editUser.phone, address: editUser.address }
                : u
            )
          );
          setEditUserId(null);
          setEditUser({ name: "", email: "", phone: "", address: "" });
        } else {
          console.error("Error editing user:", data.message);
        }
      })
      .catch((err) => {
        console.error("Edit user error:", err);
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Kelola User</h2>
      <form onSubmit={handleAddUser} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Nama"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Nomor Telepon"
          value={newUser.phone}
          onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Alamat"
          value={newUser.address}
          onChange={(e) => setNewUser({ ...newUser, address: e.target.value })}
          className="p-2 border rounded"
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
            <th className="py-2 px-4 border-b">Telepon</th>
            <th className="py-2 px-4 border-b">Alamat</th>
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
                <td className="py-2 px-4 border-b">
                  <input
                    type="text"
                    value={editUser.phone}
                    onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                    className="p-1 border rounded"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <input
                    type="text"
                    value={editUser.address}
                    onChange={(e) => setEditUser({ ...editUser, address: e.target.value })}
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
                <td className="py-2 px-4 border-b">{user.phone}</td>
                <td className="py-2 px-4 border-b">{user.address}</td>
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