import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CommentsPerPage = 5;

const DetailsScreen = () => {
  const { slug } = useParams(); // Get slug from URL
  const [blog, setBlog] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch blog details and comments
  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/${slug}`);
        setBlog(response.data.data);
        setComments(response.data.data.comments);
      } catch (error) {
        setError('Error fetching blog details. Please try again later.');
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  // Handle new comment input change
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  // Handle new comment submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/${slug}/comments`, { content: newComment });
      setComments([response.data.data, ...comments]);
      setNewComment('');
    } catch (error) {
      setError('Error posting comment. Please try again.');
      console.error("Error posting comment:", error);
    }
  };

  // Paginate comments
  const totalComments = comments.length;
  const totalPages = Math.ceil(totalComments / CommentsPerPage);
  const paginatedComments = comments.slice((currentPage - 1) * CommentsPerPage, currentPage * CommentsPerPage);

  // Change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 dark:text-red-400">{error}</div>;
  }

  if (!blog) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-400">Blog not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6 sm:p-8 md:p-12 lg:p-16">
      <article className="w-full mx-auto max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{blog.title}</h1>
        <img 
          src={blog.image} 
          alt={blog.title} 
          className="w-full h-auto mb-6 object-cover rounded-lg shadow-md" 
        />
        <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-800 dark:text-gray-300">{blog.description}</p>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Add a Comment</h2>
          <form onSubmit={handleCommentSubmit} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Write your comment here..."
              className="w-full h-24 p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none mb-4 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
              required
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
            >
              Post Comment
            </button>
          </form>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Comments</h2>
          {loading ? (
            <div className="text-gray-600 dark:text-gray-400">Loading comments...</div>
          ) : (
            <div className="space-y-4">
              {paginatedComments.length > 0 ? (
                paginatedComments.map(comment => (
                  <div key={comment.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm">
                    <p className="text-gray-800 dark:text-gray-300">{comment.content}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No comments yet.</p>
              )}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && comments.length > 0 && (
            <div className="mt-6 flex justify-center space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 border rounded-lg ${currentPage === index + 1 ? 'bg-blue-600 text-white dark:bg-blue-500 dark:text-gray-900' : 'bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-300'} border-gray-300 dark:border-gray-600 hover:bg-blue-700 dark:hover:bg-blue-400`}
                  aria-label={`Page ${index + 1}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </section>
      </article>
    </div>
  );
};

export default DetailsScreen;
