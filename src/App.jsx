import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './page/landing_page';
import TentangPage from './page/tentang';
import FiturPage from './page/fitur';
import KontakPage from './page/kontak';
import LoginPage from './page/login_page';
import RegisterPage from './page/register_page';
import ForgotPasswordPage from './page/forget_password';
import HomePage from './page/home_page';
import DaftarBukuPage from './page/daftar_buku';
import ForumPage from './page/forum';
import UlasanPage from './page/ulasan';
import ProfileUser from './page/profile_user';
import RiwayatUser from './page/riwayat_user';
import PeminjamanPage from './page/peminjaman';
import PengembalianPage from './page/pengembalian';
import DendaPage from './page/denda';
import MembershipPage from './page/membership';
import BookDetail from './page/book_detail';
import BayarDenda from './page/bayar_denda'; 
import AdminPage from './page/admin_page';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
         <Route path="/tentang" element={< TentangPage />} />
         <Route path="/fitur" element={< FiturPage />} />
         <Route path="/kontak" element={< KontakPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/daftar-buku" element={<DaftarBukuPage />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/ulasan" element={<UlasanPage />} />
        <Route path="/profile" element={<ProfileUser />} />
        <Route path="/riwayat" element={<RiwayatUser />} />
        <Route path="/peminjaman" element={<PeminjamanPage />} />
        <Route path="/pengembalian" element={<PengembalianPage />} />
        <Route path="/denda" element={<DendaPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/book/:id" element={<BookDetail />} />
        <Route path="/bayar_denda" element={<BayarDenda />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App
