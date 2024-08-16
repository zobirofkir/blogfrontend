import axios from 'axios';
import React, { useState, useEffect } from 'react';
import HeaderComponent from '../../Components/auth/HeaderComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProductScreen = () => {
  const [name, setName] = useState('');
  const [filePath, setFilePath] = useState(''); // Change to null
  const [description, setDescription] = useState(''); 
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    // Fetch the list of products when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/products`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setProducts(response.data.data);
      } catch (err) {
        console.error('Error fetching Products', err);
      }
    };

    fetchProducts();
  }, [token]);

  const handleProduct = async (e) => {
    e.preventDefault();

    // Basic validation
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('file_path', filePath);
    formData.append('thumbnail', thumbnail);
    formData.append('description', description);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/products`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data" // Set content type
        }
      });

      toast.success("Product created successfully !", {
        position: "top-right"
      });

      setError('');
      // Refresh the list of products
      const updateProducts = [...products, response.data];
      setProducts(updateProducts);
      setName('');
      setDescription('');
      setPrice('');
    } catch (err) {
      setError('Error creating Product');
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      toast.success("Product Deleted successfully !", {
        position: "top-right"
      });

      // Remove the Product from the list
      const updateProducts = products.filter(product => product.id !== id);
      setProducts(updateProducts);
    } catch (err) {
      setError('Error deleting Product');
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer/>

      <HeaderComponent />
      
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create Product</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name:</label>
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Price:</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Thumbnail:</label>
              <input 
                type="text" 
                value={thumbnail} 
                onChange={(e) => setThumbnail(e.target.value)} 
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Link For Download:</label>
              <input 
                type="text" 
                value={filePath} 
                onChange={(e) => setFilePath(e.target.value)} 
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>


            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Product
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {products.map(product => (
            <div key={product.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
              <img src={product.thumbnail} alt={product.name} className="mt-2 w-full h-40 object-cover rounded-lg" />
              <p className="mt-2 text-gray-700 dark:text-gray-300">{product.description?.substring(0, 100) || 'No description available'}</p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{product.price} MAD</p>
              <button 
                onClick={() => handleDelete(product.id)} 
                className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
              <a href={product.file_path} target='__blank'>
                <button className='mt-4 bg-gray-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mx-5'>
                  Download
                </button>
              </a>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default CreateProductScreen;
