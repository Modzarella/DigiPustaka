import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import SidebarProfile from '../components/sidebar_profile';

//
// Reusable Modal (accessible-ish: close on ESC, lock scroll while open)
//


const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; // lock scroll

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        <button
          type="button"
          aria-label="Tutup"
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        {title && <h3 className="text-lg font-semibold mb-4">{title}</h3>}
        <div>{children}</div>
      </div>
    </div>
  );
};

const ProfileUser = () => {
  const navigate = useNavigate();

  // ---- initial sample user (in real app: fetch from backend) ----
  const initialUser = {
    name: 'Mamat Gunshop',
    email: 'mamatguntank@gmail.com',
    passwordMasked: '••••••••••••',
    denda: 'Rp 3.000.000',
    membership: '12 Bulan',
    profilePicture: null, // can be URL or null
    borrowedBooks: [
      { id: 1, title: 'Laskar Pelangi', dueDate: '2025-10-15' },
      { id: 2, title: 'Atomic Habits', dueDate: '2025-10-20' }
    ],
    readingHistory: [
      { id: 1, title: 'Hujan', returnDate: '2025-09-15' },
      { id: 2, title: 'Filosofi Teras', returnDate: '2025-09-01' }
    ]
  };

  // ---- main state ----
  const [user, setUser] = useState(initialUser);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  // modal control: null | 'name' | 'email' | 'password' | 'photo'
  const [openModal, setOpenModal] = useState(null);

  // form states for modals
  const [nameForm, setNameForm] = useState(user.name);
  const [emailForm, setEmailForm] = useState(user.email);
  const [passwordForm, setPasswordForm] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(user.profilePicture);

  // errors for forms
  const [formErrors, setFormErrors] = useState({});

  // keep local form fields in sync when user changes (or when modal opens)
  const openEdit = useCallback((type) => {
    setFormErrors({});
    if (type === 'name') {
      setNameForm(user.name || '');
    } else if (type === 'email') {
      setEmailForm(user.email || '');
    } else if (type === 'password') {
      setPasswordForm('');
      setConfirmPassword('');
    } else if (type === 'photo') {
      setPhotoFile(null);
      setPhotoPreview(user.profilePicture || null);
    }
    setOpenModal(type);
  }, [user]);

  useEffect(() => {
    // cleanup object URL when component unmounts or when preview changes
    return () => {
      if (photoPreview && typeof photoPreview === 'string' && photoPreview.startsWith('blob:')) {
        try { URL.revokeObjectURL(photoPreview); } catch(e) {}
      }
    };
  }, [photoPreview]);

  // input handlers
  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPhotoFile(file);
    setPhotoPreview(url);
    setFormErrors(prev => ({ ...prev, photo: null }));
  };

  // ---- validation helpers ----
  const isValidEmail = (value) => /\S+@\S+\.\S+/.test(value);

  // ---- save handlers ----
  const saveName = (e) => {
    e.preventDefault();
    if (!nameForm.trim()) {
      setFormErrors({ name: 'Nama harus diisi' });
      return;
    }
    setUser(prev => ({ ...prev, name: nameForm.trim() }));
    setOpenModal(null);
    alert('Nama berhasil diubah');
  };

  const saveEmail = (e) => {
    e.preventDefault();
    if (!emailForm.trim()) {
      setFormErrors({ email: 'Email harus diisi' });
      return;
    }
    if (!isValidEmail(emailForm.trim())) {
      setFormErrors({ email: 'Format email tidak valid' });
      return;
    }
    setUser(prev => ({ ...prev, email: emailForm.trim() }));
    setOpenModal(null);
    alert('Email berhasil diubah');
  };

  const savePassword = (e) => {
    e.preventDefault();
    if (!passwordForm) {
      setFormErrors({ password: 'Password harus diisi' });
      return;
    }
    if (passwordForm.length < 8) {
      setFormErrors({ password: 'Password minimal 8 karakter' });
      return;
    }
    if (passwordForm !== confirmPassword) {
      setFormErrors({ password: 'Password dan konfirmasi tidak sama' });
      return;
    }
    // In a real app: call backend to change password. Here we just mask.
    setUser(prev => ({ ...prev, passwordMasked: '••••••••••••' }));
    setOpenModal(null);
    alert('Password berhasil diubah');
  };

  const savePhoto = (e) => {
    e.preventDefault();
    if (!photoFile && !photoPreview) {
      setFormErrors({ photo: 'Pilih foto terlebih dahulu' });
      return;
    }
    // In a real app: upload photoFile to server and save returned URL.
    // For demo: we store preview URL in user.profilePicture (objectURL)
    setUser(prev => ({ ...prev, profilePicture: photoPreview }));
    setOpenModal(null);
    alert('Foto profil berhasil diperbarui');
  };

  // ---- JSX rendering ----
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white shadow-lg shadow-gray-200/50 border-b border-gray-100 relative z-50">
        <Navbar searchQuery={searchQuery} onSearchChange={(e) => setSearchQuery(e.target.value)} />
      </div>

      <div className="flex h-[calc(100vh-64px)]">
        <div className="flex w-full">
          {/* Sidebar (existing component) */}
          <SidebarProfile activeTab={activeTab} userData={user} />

          {/* Main content */}
          <div className="flex-1 bg-white shadow-lg overflow-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Informasi Profil</h2>

              <div className="space-y-6">
                {/* Nama */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Nama</label>
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                    <span>{user.name}</span>
                    <button
                      type="button"
                      onClick={() => openEdit('name')}
                      className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                    <span>{user.email}</span>
                    <button
                      type="button"
                      onClick={() => openEdit('email')}
                      className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                    <span>{user.passwordMasked}</span>
                    <button
                      type="button"
                      onClick={() => openEdit('password')}
                      className="text-sm text-gray-500 hover:text-black transition-colors"
                    >
                      Ubah
                    </button>
                  </div>
                </div>

                {/* Denda */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Denda</label>
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                    <span className="text-red-500 font-medium">{user.denda}</span>
                    <button
                      onClick={() => navigate('/denda')}
                      className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Bayar
                    </button>
                  </div>
                </div>

                {/* Membership */}
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Membership</label>
                  <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-lg">
                    <span>{user.membership}</span>
                    <button
                      onClick={() => navigate('/membership')}
                      className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Perpanjang
                    </button>
                  </div>
                </div>

                {/* Borrowed books (example) */}
                {activeTab === 'books' && (
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold mb-4">Buku yang Dipinjam</h3>
                    <div className="space-y-4">
                      {user.borrowedBooks.map(book => (
                        <div key={book.id} className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg">
                          <span>{book.title}</span>
                          <span className="text-sm text-gray-500">Jatuh tempo: {book.dueDate}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ---------- MODALS ---------- */}

      {/* Edit Name */}
      <Modal isOpen={openModal === 'name'} onClose={() => setOpenModal(null)} title="Ubah Nama">
        <form onSubmit={saveName} className="space-y-4">
          <input
            name="name"
            type="text"
            value={nameForm}
            onChange={(e) => { setNameForm(e.target.value); setFormErrors(prev => ({ ...prev, name: null })); }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
            placeholder="Masukkan nama baru"
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setOpenModal(null)} className="px-4 py-2 bg-gray-200 rounded-lg">Batal</button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg">Simpan</button>
          </div>
        </form>
      </Modal>

      {/* Edit Email */}
      <Modal isOpen={openModal === 'email'} onClose={() => setOpenModal(null)} title="Ubah Email">
        <form onSubmit={saveEmail} className="space-y-4">
          <input
            name="email"
            type="email"
            value={emailForm}
            onChange={(e) => { setEmailForm(e.target.value); setFormErrors(prev => ({ ...prev, email: null })); }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
            placeholder="Masukkan email baru"
          />
          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setOpenModal(null)} className="px-4 py-2 bg-gray-200 rounded-lg">Batal</button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg">Simpan</button>
          </div>
        </form>
      </Modal>

      {/* Edit Password */}
      <Modal isOpen={openModal === 'password'} onClose={() => setOpenModal(null)} title="Ubah Password">
        <form onSubmit={savePassword} className="space-y-4">
          <input
            name="password"
            type="password"
            value={passwordForm}
            onChange={(e) => { setPasswordForm(e.target.value); setFormErrors(prev => ({ ...prev, password: null })); }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
            placeholder="Password baru (min 8 karakter)"
          />
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setFormErrors(prev => ({ ...prev, password: null })); }}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black"
            placeholder="Konfirmasi password"
          />
          {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setOpenModal(null)} className="px-4 py-2 bg-gray-200 rounded-lg">Batal</button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg">Simpan</button>
          </div>
        </form>
      </Modal>

      {/* Edit Photo */}
      <Modal isOpen={openModal === 'photo'} onClose={() => setOpenModal(null)} title="Ubah Foto Profil">
        <form onSubmit={savePhoto} className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-32 h-32 rounded-full object-cover" />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Preview</span>
              </div>
            )}
            <input type="file" accept="image/*" onChange={handlePhotoChange} />
            {formErrors.photo && <p className="text-red-500 text-sm">{formErrors.photo}</p>}
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={() => setOpenModal(null)} className="px-4 py-2 bg-gray-200 rounded-lg">Batal</button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg">Simpan</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProfileUser;
