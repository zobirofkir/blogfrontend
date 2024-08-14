import React, { useEffect, useState } from 'react';
import ModalComponent from '../Components/ModalComponent'; // Ensure this path is correct
import axios from 'axios';

const HomeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]); // Corrected variable name

  const openModal = (blog) => {
    console.log("Opening modal for blog:", blog); // Debug log
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal"); // Debug log
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`);
      console.log(response.data.data);
      setBlogs(response.data.data); // Corrected to match state variable name
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://via.placeholder.com/1200x600")' }}>
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Welcome to Our Blog</h1>
            <p className="mt-4 text-xl text-gray-200">Discover the latest news and trends in the tech world.</p>
            <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Explore Now</button>
          </div>
        </div>
      </div>

      {/* Featured Cards Section */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {blog.description.substring(0, 100)}...
            </p>
            <button
              onClick={() => openModal(blog)}
              className="text-blue-500 font-semibold hover:underline dark:text-blue-400"
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* Latest Blog Posts Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
              <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                {blog.description.substring(0, 100)}...
              </p>
              <button
                onClick={() => openModal(blog)}
                className="text-blue-500 font-semibold hover:underline dark:text-blue-400"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && <ModalComponent isOpen={isModalOpen} onClose={closeModal} blog={selectedBlog} />}
    </div>
  );
};

export default HomeScreen;
