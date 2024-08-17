import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const ModalComponent = ({ isOpen, onClose, blog }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [comment, setComment] = useState('');
  const commentsPerPage = 5;

  if (!isOpen) return null;

  const totalPages = Math.ceil(blog.comments.length / commentsPerPage);
  const startIndex = (currentPage - 1) * commentsPerPage;
  const currentComments = blog.comments.slice(startIndex, startIndex + commentsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNavigateToDetails = () => {
    navigate(`/${blog.slug}`);
    onClose();
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/${blog.slug}/comments`, { content: comment });
      setComment('');
      toast.success('Comment posted successfully!'); // Display success notification
    } catch (error) {
      console.error('Error posting comment:', error);
      toast.error('Failed to post comment.'); // Display error notification
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-3xl h-auto max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
        <button
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white">{blog.title}</h2>
          <div className="flex justify-center mb-6">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full sm:w-3/4 md:w-1/2 h-auto object-cover rounded-md"
            />
          </div>
          <p className="text-gray-700 dark:text-gray-300">{blog.description}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg sm:text-2xl font-semibold mb-4 dark:text-white">Add a Comment</h3>
          <form onSubmit={handleCommentSubmit} className="mb-6">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              className="w-full p-4 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write your comment..."
              rows="4"
            ></textarea>
            <button
              type="submit"
              className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>

        <div>
          <h3 className="text-lg sm:text-2xl font-semibold mb-4 dark:text-white">Comments</h3>
          <div className="space-y-4">
            {Array.isArray(blog.comments) && blog.comments.length > 0 ? (
              currentComments.map((comment) => (
                <div key={comment.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                  <p className="text-gray-800 dark:text-gray-200">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">No comments yet.</p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-4">
              <button
                className={`px-3 py-1 rounded-md mx-1 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 rounded-md mx-1 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className={`px-3 py-1 rounded-md mx-1 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleNavigateToDetails}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            More Details
          </button>
        </div>
      </div>
      <ToastContainer /> {/* Add ToastContainer */}
    </div>,
    document.body
  );
};

export default ModalComponent;
