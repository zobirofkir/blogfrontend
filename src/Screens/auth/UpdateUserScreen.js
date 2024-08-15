import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderComponent from '../../Components/auth/HeaderComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateUserScreen = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all users
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('access_token'); // Retrieve token from local storage
      
      try {
        // Fetch all users
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}` // Attach token to headers
          }
        });

        // Ensure the response structure matches your API
        const allUsers = response.data.data; // Adjust this if needed
        setUsers(allUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("You are not authorized to access this resource !");
      }
    };

    fetchUsers();
  }, []);

  // Open modal with user details
  const openModal = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email, // Set email but will not be updated
      password: ''
    });
    setShowModal(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Submit form to update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem('access_token'); // Retrieve token from local storage

    try {
      // Prepare data for the update, excluding the email field
      const updateData = { ...formData };
      delete updateData.email;

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/${selectedUser.id}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}` // Attach token to headers
          }
        }
      );

      // Update the user in the state
      setUsers(users.map(user => (user.id === selectedUser.id ? { ...user, ...updateData } : user)));
      toast.success("User updated successfully!");
      setShowModal(false);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Full error response:", error.response.data); // Log the full error response
        const errorMessages = error.response.data.message || [];
        // Adjust based on the actual structure of your error response
        const formattedErrors = errorMessages && Array.isArray(errorMessages) 
        ? errorMessages.join(' ') 
        : "Add Password with a minimum of 8 characters";
        toast.error(formattedErrors);
      } else {
        toast.error('Error updating user. Please try again.');
        console.error("Error updating user:", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <HeaderComponent />
      <div className="p-4 md:p-6 dark:bg-black min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Update Users</h1>

        <div className="space-y-4">
          {users.map(user => (
            <div
              key={user.id}
              className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col md:flex-row md:justify-between items-center"
            >
              <div className="flex-grow text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{user.name}</h2>
                <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
              </div>
              <button
                onClick={() => openModal(user)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 md:mt-0 mt-5"
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-lg">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Update User</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                    readOnly
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update User'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateUserScreen;
