import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';

const SidebarComponent = ({ isOpen, toggleSidebar, user, handleLogout }) => {
  const [editMode, setEditMode] = useState(false);
  const [showBlogActions, setShowBlogActions] = useState(false);
  const [showUserActions, setShowUserActions] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('access_token');
  const apiUrl = process.env.REACT_APP_BACKEND_URL;
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setLoading(true);
    setMessage('');
    try {
      await axios.put(`${apiUrl}/api/auth/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('User information updated successfully!');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user information:', error);
      setMessage('Error updating user information.');
    } finally {
      setLoading(false);
    }
  };

  const handleBlogCreate = () => {
    navigate("/create-blog");
  };
  
  const handleBlogUpdate = () => {
    navigate("/update-blog");
  };

  const handleUserUpdate = () => {
    alert('Update User clicked');
  };

  const handleUserCreate = () => {
    alert('Create User clicked');
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
    >
      <div className="p-4">
        {/* Logo */}
        <div className="flex items-center mb-6">
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
        </div>


        {/* Blog Management */}
        <div className='mt-10'>
          <button
            onClick={() => setShowBlogActions(!showBlogActions)}
            className="text-white p-2 rounded w-full text-center bg-blue-800 hover:bg-blue-700"
          >
            Blog
          </button>
          {/* Drop-down Blog Actions */}
          <div
            className={`mt-2 bg-gray-700 text-white transition-transform transform ${showBlogActions ? 'scale-100' : 'scale-0'} z-40 origin-top-left`}
            style={{ width: '16rem', transition: 'transform 0.3s ease-in-out' }}
          >
            <div className="p-4">
              <button
                className="block w-full p-2 mb-2 bg-green-600 hover:bg-green-700 rounded"
                onClick={handleBlogCreate}
              >
                Create Blog
              </button>
              <button
                className="block w-full p-2 bg-yellow-500 hover:bg-yellow-600 rounded"
                onClick={handleBlogUpdate}
              >
                Update Blog
              </button>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className='-mt-28'>
          <button
            onClick={() => setShowUserActions(!showUserActions)}
            className="text-white p-2 rounded w-full text-center bg-blue-800 hover:bg-blue-700"
          >
            User
          </button>
          {/* Drop-down User Actions */}
          <div
            className={`mt-2 bg-gray-700 text-white transition-transform transform ${showUserActions ? 'scale-100' : 'scale-0'} z-40 origin-top-left`}
            style={{ width: '16rem', transition: 'transform 0.3s ease-in-out' }}
          >
            <div className="p-4">
              <button
                className="block w-full p-2 mb-2 bg-green-600 hover:bg-green-700 rounded"
                onClick={handleUserCreate}
              >
                Create User
              </button>
              <button
                className="block w-full p-2 bg-yellow-500 hover:bg-yellow-600 rounded"
                onClick={handleUserUpdate}
              >
                Update User
              </button>
            </div>
          </div>
        </div>
        {/* User Info and Sidebar Links */}
        <div className="mt-6 border-t border-gray-600 pt-4">
          {user && (
            <div className="mb-4">
              <p className="text-lg mb-2">{user.name}</p>
              <p className="text-sm">{user.email}</p>
            </div>
          )}
          {editMode ? (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="border border-gray-600 bg-gray-700 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="border border-gray-600 bg-gray-700 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleFormChange}
                  className="border border-gray-600 bg-gray-700 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleFormChange}
                  className="border border-gray-600 bg-gray-700 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-300">Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleFormChange}
                  className="border border-gray-600 bg-gray-700 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              {message && (
                <div className={`text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                  {message}
                </div>
              )}
              <div className="flex gap-2">
                <button
                  type="submit"
                  className={`bg-blue-500 text-white p-2 rounded flex-1 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Update'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="bg-gray-500 text-white p-2 rounded flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div>
              <button
                onClick={() => setEditMode(true)}
                className="block w-full text-left mb-2 p-2 hover:bg-gray-700 rounded"
              >
                Edit Info
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left p-2 hover:bg-gray-700 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
