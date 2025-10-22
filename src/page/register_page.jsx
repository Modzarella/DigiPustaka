import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  address: '',
  password: '',
  confirmPassword: ''
});



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  fetch("http://localhost/digipustaka/api/register.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      membership_id: Math.floor(Math.random() * 1000000) + 1,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      level: "user",
      phone: formData.phone,
      address: formData.address,
      membership_date: new Date().toISOString().split('T')[0],
      expiration_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],


    }),
  })
    .then(async res => {
    const text = await res.text();
    try {
      const data = JSON.parse(text);
      if (data.status === "success") {
        alert("Registrasi berhasil!");
        navigate("/login");
      } else {
        alert("Registrasi gagal: " + (data.message || "Silakan coba lagi."));
      }
    } catch (err) {
      console.error("Invalid JSON:", text);
      alert("Server returned invalid response.");
    }
  })
  .catch(error => {
    console.error("Registration error:", error);
    alert("Terjadi kesalahan saat registrasi.");
  });
};

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:block w-2/3 bg-cover bg-center" 
           style={{
             backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
             url('/src/assets/bookshelf-bg.jpg')`
           }}>
      </div>

      <div className="w-full md:w-1/3 flex flex-col justify-center items-center p-8 bg-white">
          <div className="w-full max-w-md">
            <h1 className="text-center text-3xl font-bold mb-8">Registrasi Akun!</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>


                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nama"
                  required
                />
              </div>

              <div>

                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email"
                  required
                />
              </div>

              <input type="text" 
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,12}$/.test(value)) {
                  setFormData(prev => ({ ...prev, phone: value }));
                }
              }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Phone"
              required
              />

              <div>

                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Address"
                  required
                />
              </div>
              <div>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (value.length <= 12) {
                          setFormData(prev => ({ ...prev, password: value }));
    }
  }}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Konfirmasi Password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-400 text-white py-2 px-4 rounded-md hover:bg-green-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Register
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Sudah Memiliki Akun?{' '}
                <Link to="/login" className="text-blue-600 hover:text-blue-800">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
  );
};

export default RegisterPage;