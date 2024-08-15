import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HeaderComponent from '../../Components/auth/HeaderComponent';
import { Line, Bar } from 'react-chartjs-2'; // Import the necessary chart types
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement, 
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const DashboardScreen = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [darkMode, setDarkMode] = useState(false); 
  const [currentPage, setCurrentPage] = useState(1);

  const token = localStorage.getItem('access_token');
  const commentsPerPage = 5;

  const handleBlog = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`);
      setBlogs(response.data.data);
    } catch (err) {
      console.error('Error fetching blogs:', err);
    }
  };

  useEffect(() => {
    handleBlog();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/current`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data.data);
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

  // Handle blog click
  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  // Handle close popup
  const handleClosePopup = () => {
    setSelectedBlog(null);
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.documentElement.classList.toggle('dark', newDarkMode); // Toggle dark mode on the root element
    localStorage.setItem('darkMode', newDarkMode); // Save preference to localStorage
  };

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    document.documentElement.classList.toggle('dark', savedDarkMode);
  }, []);

  // Sample chart data for three charts
  const chartData1 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Monthly Visitors',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartData2 = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1,
      },
    ],
  };

  const chartData3 = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue',
        data: [15000, 20000, 18000, 22000],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgb(153, 102, 255)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  // Calculate total pages and current comments
  const totalPages = selectedBlog ? Math.ceil(selectedBlog.comments.length / commentsPerPage) : 0;
  const startIndex = (currentPage - 1) * commentsPerPage;
  const currentComments = selectedBlog ? selectedBlog.comments.slice(startIndex, startIndex + commentsPerPage) : [];

  return (
    <>
      <HeaderComponent />
      <div className={`flex flex-col items-center min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-white'} transition-colors duration-500`}>
        <main className="flex-1 p-4 w-full max-w-7xl">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold dark:text-gray-500">Dashboard</h1>
            <button
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-500 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m4.36 1.36l-.71-.71m5.65 5.65h-1m-1.36 4.36l.71-.71m-5.65 5.65v-1m-4.36 1.36l.71-.71m-5.65-5.65h1m1.36-4.36l-.71.71M12 3a9 9 0 110 18 9 9 0 010-18z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m4.36 1.36l-.71-.71m5.65 5.65h-1m-1.36 4.36l.71-.71m-5.65 5.65v-1m-4.36 1.36l.71-.71m-5.65-5.65h1m1.36-4.36l-.71.71M12 3a9 9 0 110 18 9 9 0 010-18z" />
                </svg>
              )}
            </button>
          </div>
          {loading ? (
            <p className="dark:text-gray-500">Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : user ? (
            <>
              <p className="mt-2 text-lg dark:text-gray-500">Hello, {user.name}</p>
              {/* Charts Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-semibold dark:text-gray-500">Analytics</h2>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold dark:text-gray-500">Chart 1</h3>
                    <div className="mt-2">
                      <Line data={chartData1} options={chartOptions} />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold dark:text-gray-500">Chart 2</h3>
                    <div className="mt-2">
                      <Bar data={chartData2} options={chartOptions} />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold dark:text-gray-500">Chart 3</h3>
                    <div className="mt-2">
                      <Bar data={chartData3} options={chartOptions} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Blog Cards Section */}
              <div className="mt-8">
                <h2 className="text-2xl font-semibold dark:text-gray-500">Blogs</h2>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer" onClick={() => handleBlogClick(blog)}>
                      <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-md" />
                      <h3 className="text-xl font-semibold mt-4 dark:text-gray-500">{blog.title}</h3>
                      <p className="mt-2 dark:text-gray-400">{blog.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Blog Comments Section */}
              {selectedBlog && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                    <button className="absolute top-2 right-2 text-gray-600 dark:text-gray-400" onClick={handleClosePopup}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    <h3 className="text-xl font-semibold dark:text-gray-500">{selectedBlog.title}</h3>
                    <img src={selectedBlog.image} alt={selectedBlog.title} className="w-full h-48 object-cover rounded-md" />
                      <h3 className="text-xl font-semibold mt-4 dark:text-gray-500">{selectedBlog.title}</h3>
                      <p className="mt-2 dark:text-gray-400">{selectedBlog.description}</p>
                    <p className="mt-2 dark:text-gray-400">{selectedBlog.content}</p>
                    <div className="mt-4">
                      <h4 className="text-lg font-semibold dark:text-gray-500">Comments</h4>
                      {currentComments.length > 0 ? (
                        <ul className="mt-2">
                          {currentComments.map((comment) => (
                            <li key={comment.id} className="p-2 border-b dark:border-gray-600">
                              <p className="font-semibold dark:text-gray-300">{comment.author}</p>
                              <p className="dark:text-gray-400">{comment.content}</p>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="dark:text-gray-500">No comments available.</p>
                      )}
                      {/* Pagination */}
                      {totalPages > 1 && (
                        <div className="flex justify-between mt-4">
                          <button
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-500 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                          <span className="self-center dark:text-gray-500">
                            Page {currentPage} of {totalPages}
                          </span>
                          <button
                            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 dark:text-gray-500 rounded hover:bg-gray-400 dark:hover:bg-gray-600 transition"
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="dark:text-gray-500">No user data available.</p>
          )}
        </main>
      </div>
    </>
  );
};

export default DashboardScreen;