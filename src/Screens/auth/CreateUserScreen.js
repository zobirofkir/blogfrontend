import React, { useState, useEffect } from 'react';
import HeaderComponent from '../../Components/auth/HeaderComponent';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUserScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('access_token');

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setUsers(response.data.data);
      } catch (err) {
        if (err.response && err.response.status === 403) {
          toast.error('You are not authorized to access this resource', {
            position: "top-right"
          });
        } else {
          toast.error('You are not authorized to access this resource', {
            position: "top-right"
          });
  
          console.error(err);
        }
      }
    };

    fetchUsers();
  }, [token]);

  const handleUserCreation = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      setError('All fields are required');
      return;
    }

    const data = {
      name,
      email,
      password
    };

    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/users`, data, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      toast.success("User created successfully!", {
        position: "top-right"
      });

      // Refresh users list
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setUsers(response.data.data);

      setError('');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.error('You are not authorized to create a user', {
          position: "top-right"
        });
      } else {
        setError('You are not authorized to access this resource');
        toast.error('You are not authorized to access this resource', {
          position: "top-right"
        });
        console.error(err);
      }
    }
  };

  const handleUserDeletion = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      toast.success("User deleted successfully!", {
        position: "top-right"
      });

      // Refresh users list
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setUsers(response.data.data);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        toast.error('You are not authorized to delete this user', {
          position: "top-right"
        });
      } else {
        setError('Error deleting user');
        console.error(err);
      }
    }
  };

  return (
    <>
      <ToastContainer />

      <HeaderComponent />

      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create User</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleUserCreation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email:</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password:</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create User
            </button>
          </form>
          
          <h2 className="text-xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">User List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.length > 0 ? (
              users.map(user => (
                <div key={user.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md space-y-4 overflow-hidden">
                  <p className="text-gray-900 dark:text-white text-lg font-semibold">{user.name}</p>
                  <p className="text-gray-700 dark:text-gray-400">{user.email}</p>
                    <button 
                      onClick={() => handleUserDeletion(user.id)} 
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No users found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUserScreen;
