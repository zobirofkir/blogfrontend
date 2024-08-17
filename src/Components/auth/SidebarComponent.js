import React, { useState } from 'react';
import Logo from '../../images/logo.png';
import { useNavigate } from 'react-router-dom';
import ThemeSwitcher from '../../Components/ThemeSwitcher';

const SidebarComponent = ({ isOpen, toggleSidebar, user, handleLogout }) => {
  const [showBlogActions, setShowBlogActions] = useState(false);
  const [showUserActions, setShowUserActions] = useState(false);
  const [showProductActions, setShowProductActions] = useState(false);
  const [showProjectActions, setShowProjectActions] = useState(false);
  const navigate = useNavigate();

  const handleBlogCreate = () => navigate("/create-blog");
  const handleBlogUpdate = () => navigate("/update-blog");
  const handleUserUpdate = () => navigate('/update-user');
  const handleUserCreate = () => navigate('/create-user');
  const handleProductCreate = () => navigate('/create-product');
  const handleProductUpdate = () => navigate('/update-product');
  const handleProjectCreate = () => navigate('/create-project');
  const handleProjectUpdate = () => navigate('/update-project');

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-50 shadow-md`}
    >
      <div className="flex flex-col h-full">
        {/* Logo and Sidebar Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
          <button
            onClick={toggleSidebar}
            className="text-gray-300 hover:text-white"
          >
            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Menu */}
        <div className="flex-grow overflow-y-auto">
          <nav className="mt-4">
            {/* Blog Management */}
            <div className="relative">
              <button
                onClick={() => setShowBlogActions(!showBlogActions)}
                className="flex items-center w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-700 transition-colors"
              >
                <span className="flex-grow">Blog</span>
                <svg className={`w-4 h-4 transform ${showBlogActions ? 'rotate-180' : 'rotate-0'} transition-transform`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`mt-2 space-y-2 ${showBlogActions ? 'block' : 'hidden'}`}>
                <button
                  className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600"
                  onClick={handleBlogCreate}
                >
                  Create Blog
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600"
                  onClick={handleBlogUpdate}
                >
                  Update Blog
                </button>
              </div>
            </div>

            {/* User Management */}
            <div className="relative mt-2">
              <button
                onClick={() => setShowUserActions(!showUserActions)}
                className="flex items-center w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-700 transition-colors"
              >
                <span className="flex-grow">User</span>
                <svg className={`w-4 h-4 transform ${showUserActions ? 'rotate-180' : 'rotate-0'} transition-transform`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`mt-2 space-y-2 ${showUserActions ? 'block' : 'hidden'}`}>
                <button
                  className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600"
                  onClick={handleUserCreate}
                >
                  Create User
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600"
                  onClick={handleUserUpdate}
                >
                  Update User
                </button>
              </div>
            </div>

            {/* Product Management */}
            <div className="relative mt-2">
              <button
                onClick={() => setShowProductActions(!showProductActions)}
                className="flex items-center w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-700 transition-colors"
              >
                <span className="flex-grow">Product</span>
                <svg className={`w-4 h-4 transform ${showProductActions ? 'rotate-180' : 'rotate-0'} transition-transform`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`mt-2 space-y-2 ${showProductActions ? 'block' : 'hidden'}`}>
                <button
                  className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600"
                  onClick={handleProductCreate}
                >
                  Create Product
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600"
                  onClick={handleProductUpdate}
                >
                  Update Product
                </button>
              </div>
            </div>

            {/* Project Management */}
            <div className="relative mt-2">
              <button
                onClick={() => setShowProjectActions(!showProjectActions)}
                className="flex items-center w-full px-4 py-2 text-left text-gray-200 hover:bg-gray-700 transition-colors"
              >
                <span className="flex-grow">Project</span>
                <svg className={`w-4 h-4 transform ${showProjectActions ? 'rotate-180' : 'rotate-0'} transition-transform`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`mt-2 space-y-2 ${showProjectActions ? 'block' : 'hidden'}`}>
                <button
                  className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600"
                  onClick={handleProjectCreate}
                >
                  Create Project
                </button>
                <button
                  className="block w-full px-4 py-2 text-left text-gray-300 hover:bg-gray-600"
                  onClick={handleProjectUpdate}
                >
                  Update Project
                </button>
              </div>
            </div>
          </nav>
        </div>

        {/* User Info, Logout, and ThemeSwitcher */}
        <div className="bg-gray-900 border-t border-gray-700 p-4">
          {user && (
            <div className="mb-4">
              <p className="text-lg font-semibold">{user.name}</p>
              <p className="text-sm text-gray-300">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-gray-200 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            Logout
          </button>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
