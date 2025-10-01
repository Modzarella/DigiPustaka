import React from 'react';
import { useNavigate } from 'react-router-dom';

const SidebarBooks = ({ activeTab }) => {
  const navigate = useNavigate();

  const sidebarItems = [
    { 
      id: 'peminjaman', 
      label: 'Peminjaman',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    { 
      id: 'pengembalian', 
      label: 'Pengembalian',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      )
    },
    { 
      id: 'kembali', 
      label: 'Kembali',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
        </svg>
      )
    }
  ];

  const handleSidebarClick = (id) => {
    switch(id) {
      case 'peminjaman':
        navigate('/peminjaman');
        break;
      case 'pengembalian':
        navigate('/pengembalian');
        break;
      case 'kembali':
        navigate('/profile');
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-80 bg-white shadow-lg">
      <div className="p-8 sticky top-0">
        <nav>
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleSidebarClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-6 py-4 rounded-lg transition-colors ${
                    item.id === activeTab
                      ? 'bg-black text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="text-lg">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarBooks;