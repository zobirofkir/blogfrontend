import React from 'react'
import ReactDOM from 'react-dom'

const ModalComponent = ({ isOpen, onClose, blog }) => {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative bg-white dark:bg-gray-800 w-full max-w-3xl h-auto max-h-[90vh] overflow-y-auto rounded-lg shadow-lg p-6">
        {/* Close Button */}
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

        {/* Blog Content */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white">{blog.title}</h2>
          <div className="flex justify-center mb-6">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full sm:w-3/4 md:w-1/2 h-auto object-cover rounded-md"
            />
          </div>
          <p className="text-gray-700 dark:text-gray-300">{blog.content}</p>
        </div>

        {/* Add Comment Section */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-2xl font-semibold mb-4 dark:text-white">Add a Comment</h3>
          <form className="mb-6">
            <textarea
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

        {/* Display Comments */}
        <div>
          <h3 className="text-lg sm:text-2xl font-semibold mb-4 dark:text-white">Comments</h3>
          <div className="space-y-4">
            {Array.isArray(blog.comments) && blog.comments.length > 0 ? (
              blog.comments.map((comment, index) => (
                <div key={index} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                  <p className="text-gray-800 dark:text-gray-200">{comment}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-400">{blog.comments}</p>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ModalComponent
