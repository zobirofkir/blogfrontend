import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const ProductModal = ({ isOpen, onClose, product }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (product) {
      document.title = product.name;
    }

    return () => {
      document.title = "CSW-BLOG"; // Default name
    };
  }, [product]);


  if (!isOpen) return null;

  const handleRedirect = () => {
    navigate(`/product-info/${product.slug}`); // Redirect to ProductInfoScreen with the slug
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 dark:text-white">{product.name}</h2>
          <div className="flex justify-center mb-6">
            <img
              src={product.thumbnail || 'https://i.gifer.com/35LA.gif'} // Ensure default image path is correct
              alt={product.name}
              className="w-full sm:w-3/4 md:w-1/2 h-auto object-cover rounded-md"
            />
          </div>
          <h3 className='dark:text-white text-black font-bold p-5'>Price: {product.price} MAD</h3>
          <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-800 dark:text-gray-300 break-words whitespace-pre-line">
            {product.description}
          </p>
          <div className="flex justify-center mt-5">
            <a
              href={product.file_path}
              target="_blank"
              rel="noopener noreferrer"
              className="dark:bg-white bg-black px-10 py-2 rounded-full dark:text-black text-white"
            >
              Download
            </a>
          </div>
          <div className="flex justify-center mt-5">
            <button
              onClick={handleRedirect}
              className="dark:bg-white bg-black px-10 py-2 rounded-full dark:text-black text-white"
            >
              View Full Info
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProductModal;
