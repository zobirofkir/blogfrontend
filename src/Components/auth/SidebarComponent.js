import React, { useState } from 'react';
import Logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../../Components/ThemeSwitcher';

const SidebarComponent = ({ isOpen, toggleSidebar, user, handleLogout }) => {
  const [showBlogActions, setShowBlogActions] = useState(false);
  const [showUserActions, setShowUserActions] = useState(false);
  const [showProductActions, setShowProductActions] = useState(false);
  const navigate = useNavigate();

  const handleBlogCreate = () => navigate("/create-blog");
  const handleBlogUpdate = () => navigate("/update-blog");
  const handleUserUpdate = () => navigate('/update-user');
  const handleUserCreate = () => navigate('/create-user');
  const handleProductCreate = () => navigate('/create-product');
  const handleProductUpdate = () => navigate('/update-product')

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50 flex flex-col justify-between`}
    >
      <div className="p-4 flex-grow">
        {/* Logo */}
        <div className="flex items-center mb-8">
          <img src={Logo} alt="Logo" className="h-12 w-auto" />
        </div>

        {/* Blog Management */}
        <div className='-mt-0'>
          <button
            onClick={() => setShowBlogActions(!showBlogActions)}
            className="text-white p-3 rounded-lg w-full text-left bg-blue-800 hover:bg-blue-700 flex items-center justify-between"
          >
            <span>Blog</span>
            <svg className={`w-4 h-4 transform ${showBlogActions ? 'rotate-180' : 'rotate-0'} transition-transform`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {/* Drop-down Blog Actions */}
          <div
            className={`mt-2 bg-gray-700 text-white transition-transform ${showBlogActions ? 'scale-100' : 'scale-0'} origin-top-left`}
            style={{ width: '16rem', transition: 'transform 0.3s ease-in-out' }}
          >
            <div className="p-4">
              <button
                className="block w-full p-3 mb-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                onClick={handleBlogCreate}
              >
                Create Blog
              </button>
              <button
                className="block w-full p-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors"
                onClick={handleBlogUpdate}
              >
                Update Blog
              </button>
            </div>
          </div>
        </div>

        {/* User Management */}
        <div className='-mt-20'>
          <button
            onClick={() => setShowUserActions(!showUserActions)}
            className="text-white p-3 rounded-lg w-full text-left bg-blue-800 hover:bg-blue-700 flex items-center justify-between"
          >
            <span>User</span>
            <svg className={`w-4 h-4 transform ${showUserActions ? 'rotate-180' : 'rotate-0'} transition-transform`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {/* Drop-down User Actions */}
          <div
            className={`mt-2 bg-gray-700 text-white transition-transform ${showUserActions ? 'scale-100' : 'scale-0'} origin-top-left`}
            style={{ width: '16rem', transition: 'transform 0.3s ease-in-out' }}
          >
            <div className="p-4">
              <button
                className="block w-full p-3 mb-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                onClick={handleUserCreate}
              >
                Create User
              </button>
              <button
                className="block w-full p-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors"
                onClick={handleUserUpdate}
              >
                Update User
              </button>
            </div>
          </div>
        </div>



        {/* Product Management */}
        <div className='-mt-20'>
          <button
            onClick={() => setShowProductActions(!showProductActions)}
            className="text-white p-3 rounded-lg w-full text-left bg-blue-800 hover:bg-blue-700 flex items-center justify-between"
          >
            <span>Product</span>
            <svg className={`w-4 h-4 transform ${showProductActions ? 'rotate-180' : 'rotate-0'} transition-transform`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {/* Drop-down User Actions */}
          <div
            className={`mt-2 bg-gray-700 text-white transition-transform ${showProductActions ? 'scale-100' : 'scale-0'} origin-top-left`}
            style={{ width: '16rem', transition: 'transform 0.3s ease-in-out' }}
          >
            <div className="p-4">
              <button
                className="block w-full p-3 mb-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                onClick={handleProductCreate}
              >
                Create Product
              </button>
              <button
                className="block w-full p-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg transition-colors"
                onClick={handleProductUpdate}
              >
                Update Product
              </button>
            </div>
          </div>
        </div>
      </div>


      

      {/* User Info, Logout, and ThemeSwitcher */}
      <div className="p-4 bg-gray-700">
        {user && (
          <div className="mb-6">
            <p className="text-lg font-semibold mb-1">{user.name}</p>
            <p className="text-sm text-gray-300">{user.email}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="block w-full text-left p-3 mb-4 hover:bg-gray-600 rounded-lg transition-colors"
        >
          Logout
        </button>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default SidebarComponent;
