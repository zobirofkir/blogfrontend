import axios from 'axios';
import React, { useState, useEffect } from 'react';
import HeaderComponent from '../../Components/auth/HeaderComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateBlogScreen = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null); // Change to null
  const [description, setDescription] = useState(''); 
  const [slug, setSlug] = useState('');
  const [error, setError] = useState('');
  const [blogs, setBlogs] = useState([]);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    // Fetch the list of blogs when the component mounts
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/blogs`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setBlogs(response.data.data);
      } catch (err) {
        console.error('Error fetching blogs', err);
      }
    };

    fetchBlogs();
  }, [token]);

  const handleBlog = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !image || !description || !slug) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image); // Append the file
    formData.append('description', description);
    formData.append('slug', slug);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data" // Set content type
        }
      });

      toast.success("Blog created successfully !", {
        position: "top-right"
      });

      setError('');
      // Refresh the list of blogs
      const updatedBlogs = [...blogs, response.data];
      setBlogs(updatedBlogs);
      setTitle('');
      setImage(null); // Reset image
      setDescription('');
      setSlug('');
    } catch (err) {
      setError('Error creating blog');
      console.error(err);
    }
  };

  const handleDelete = async (slug) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/${slug}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      toast.success("Blog Deleted successfully !", {
        position: "top-right"
      });

      // Remove the blog from the list
      const updatedBlogs = blogs.filter(blog => blog.slug !== slug);
      setBlogs(updatedBlogs);
    } catch (err) {
      setError('Error deleting blog');
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer/>

      <HeaderComponent />
      
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create Blog</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleBlog} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title:</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image:</label>
              <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])}
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Description:</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                rows="4"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Slug:</label>
              <input 
                type="text" 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)} 
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Blog
            </button>
          </form>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {blogs.map(blog => (
              <div key={blog.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{blog.title}</h3>
                <img src={blog.image} alt={blog.title} className="mt-2 w-full h-40 object-cover rounded-lg" />
                <p className="mt-2 text-gray-700 dark:text-gray-300">{blog.description?.substring(0, 100)}</p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{blog.slug}</p>
                <button 
                  onClick={() => handleDelete(blog.slug)} 
                  className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateBlogScreen;
