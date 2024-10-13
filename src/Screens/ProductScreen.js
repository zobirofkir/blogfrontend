import React, { useState } from 'react';
import Modal from '../Components/ProductModal';
import useFetchData from '../Hooks/useFetchData';
import ChatIconComponent from '../Components/ChatIconComponent';

/**
 * ProductScreen component
 * @description This component renders the product screen.
 * @param {Object} props Component props
 * @returns {JSX.Element} ProductScreen component
 */
const ProductScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {data:products} = useFetchData(`${process.env.REACT_APP_BACKEND_URL}/api/products`);

  /**
   * Open the modal with the selected product
   * @param {Object} product Product to be displayed in the modal
   */
  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  /**
   * Close the modal
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white bg-cover bg-center h-screen flex items-center justify-center dark:bg-dark-image bg-light-image">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: 'url(https://i.gifer.com/35LA.gif)' }}
        ></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Welcome to Our Product
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Stay updated with the latest products, tips, and insights.
          </p>
          <a href='/contacts'>
              <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Contact Me</button>
          </a>
        </div>
      </section>

      {/* Main Content */}
      <main className="mt-6">
        {/* Product Post Cards */}
        <section id="latest-posts" className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
            Latest Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={product.thumbnail || 'https://i.gifer.com/35LA.gif'} // Ensure default image path is correct
                    alt={product.name || 'Product Image'} // Use product name if available
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{product.name || 'Untitled'}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {product.description ? product.description.substring(0, 100) : 'Content not available...'}
                  </p>
                  <button
                    onClick={() => openModal(product)}
                    className="text-blue-500 font-semibold hover:underline dark:text-blue-400"
                  >
                    Read More
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-700 dark:text-gray-300">No products available.</p>
            )}
          </div>
        </section>
      </main>

      <ChatIconComponent/>

      {/* Modal */}
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />}
    </div>
  );
};

export default ProductScreen;
