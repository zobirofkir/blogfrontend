import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderComponent from '../../Components/auth/HeaderComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateBlogScreen = () => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    slug: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('access_token'); // Retrieve token from local storage

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/blogs`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBlogs(response.data.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [token]);

  // Open modal with blog details
  const openModal = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      description: blog.description,
      slug: blog.slug
    });
    setShowModal(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Submit form to update blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('access_token'); // Retrieve token from local storage

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('slug', formData.slug);

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/blogs/${selectedBlog.slug}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' // Set header for file upload
          }
        }
      );
      setBlogs(blogs.map(blog => (blog.id === selectedBlog.id ? { ...blog, ...formData } : blog)));
      toast.success("This Blog Has Been Updated Successfully!");
      setShowModal(false);
    } catch (error) {
      setError('Error updating blog. Please try again.');
      console.error("Error updating blog:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <HeaderComponent />
      <div className="p-4 md:p-6 dark:bg-black min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Update Blogs</h1>

        <div className="space-y-4">
          {blogs.map(blog => (
            <div
              key={blog.id}
              className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col md:flex-row md:justify-between items-center"
            >
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{blog.title}</h2>
                <p className="text-gray-600 dark:text-gray-300">{blog.description}</p>
              </div>
              <button
                onClick={() => openModal(blog)}
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
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Update Blog</h2>
              {error && <p className="text-red-600 mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Blog'}
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

export default UpdateBlogScreen;
