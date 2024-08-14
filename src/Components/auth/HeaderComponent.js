import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarComponent from './SidebarComponent';

const HeaderComponent = () => {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // New state for sidebar

  const token = localStorage.getItem('access_token');
  const apiUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    if (token) {
      axios.get(`${apiUrl}/api/auth/current`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => setUser(response.data.data))
        .catch(error => console.error('Error fetching user data:', error));
    }
  }, [token, apiUrl]);

  const handleLogout = () => {
    axios.post(`${apiUrl}/api/auth/logout`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        localStorage.removeItem('access_token');
        window.location.href = '/login'; 
      })
      .catch(error => console.error('Error logging out:', error));
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center relative">
      <div className="text-lg font-bold">
        <a href='/dashboard'>CSW</a>
      </div>
      <button
        onClick={toggleSidebar}
        className="text-white bg-gray-700 p-2 rounded"
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12h18M3 6h18M3 18h18" />
        </svg>
      </button>
      <SidebarComponent isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} user={user} handleLogout={handleLogout} />
    </header>
  );
};

export default HeaderComponent;
