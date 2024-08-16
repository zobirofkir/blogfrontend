import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderComponent from '../../Components/auth/HeaderComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    file_path: '',
    price: '',
    thumbnail: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('access_token'); // Retrieve token from local storage

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data.data);
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [token]);

  // Open modal with product details
  const openModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      file_path: product.file_path,
      thumbnail: product.thumbnail,      
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

  // Submit form to update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = localStorage.getItem('access_token'); // Retrieve token from local storage

    const form = new FormData();
    form.append('name', formData.name);
    form.append('description', formData.description);
    form.append('price', formData.price);
    form.append('thumbnail', formData.thumbnail);
    form.append('file_path', formData.file_path);

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/products/${selectedProduct.id}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' // Set header for file upload
          }
        }
      );
      setProducts(products.map(product => 
        (product.id === selectedProduct.id ? { ...product, ...formData } : product)
      ));
      toast.success("This Product Has Been Updated Successfully!");
      setShowModal(false);
    } catch (error) {
      setError('Error updating product. Please try again.');
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <HeaderComponent />
      <div className="p-4 md:p-6 dark:bg-black min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Update Products</h1>

        <div className="space-y-4">
          {products.map(product => (
            <div
              key={product.id}
              className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col md:flex-row md:justify-between items-center"
            >
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{product.name}</h2>
                <p className="text-md font-semibold text-gray-900 dark:text-white">{product.description.substring(0, 100)}</p>
              </div>
              <button
                onClick={() => openModal(product)}
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
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Update Product</h2>
              {error && <p className="text-red-600 mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Thumbnail</label>
                  <input
                    type="text"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Filepath</label>
                  <input
                    type="text"
                    name="file_path"
                    value={formData.file_path}
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
                    {loading ? 'Updating...' : 'Update Product'}
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

export default UpdateProductScreen;
