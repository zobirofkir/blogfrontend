import React, { useState } from 'react';
import Modal from '../Components/ProductModal';
import useFetchData from '../Hooks/useFetchData';
import DonateButtonComponent from '../Components/DonateButtonComponent';

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

  const formatTimeAndYear = (dateString) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString([], {
       hour: '2-digit',
       minute: '2-digit'   
    });
    const year = date.getFullYear();
    return `${time}, ${year}`;
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
            Product
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="mt-6 py-10">
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
                  <div className='flex justify-between w-full items-center'>
                      <button
                        onClick={() => openModal(product)}
                        className="text-blue-500 font-semibold hover:underline dark:text-blue-400"
                      >
                          Read More
                      </button>

                      <p className="overflow-hidden text-black dark:text-white">{formatTimeAndYear(product.created_at)}</p>
                  </div>

                </div>
              ))
            ) : (
              <p className="text-center text-gray-700 dark:text-gray-300">No products available.</p>
            )}
          </div>
        </section>
      </main>

      <DonateButtonComponent/>

      {/* Modal */}
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />}
    </div>
  );
};

export default ProductScreen;
