import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderComponent from '../../Components/auth/HeaderComponent';

const DashboardScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/current`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          // Log response to check its structure
          console.log('User data response:', response);
          setUser(response.data.data); // Adjust if the response structure is different
        } else {
          setError('No token found');
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  return (
    <>
      <HeaderComponent/>
      <div className="flex">
        <main className="flex-1 p-4 md:ml-64 ml-0 lg:ml-64 transition-margin duration-300">
          {/* Adjust margin based on sidebar state if needed */}
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : user ? (
            <p className="mt-2">Hello, {user.name}</p>
          ) : (
            <p>No user data available</p>
          )}
        </main>
      </div>
    </>
  );
};

export default DashboardScreen;
