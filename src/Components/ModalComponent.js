import React from 'react'
import ReactDOM from 'react-dom'

const ModalComponent = ({ isOpen, onClose, blog }) => {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 w-full max-w-4xl mx-4 rounded-lg shadow-lg">
        <button
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100"
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
        <div className="p-6">
          <h2 className="text-3xl font-bold mb-4 dark:text-white">{blog.title}</h2>
          <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover rounded-md mb-4" />
          <p className="text-gray-700 dark:text-gray-300">{blog.content}</p>
        </div>
      </div>
    </div>,
    document.body
  )
}

export default ModalComponent
