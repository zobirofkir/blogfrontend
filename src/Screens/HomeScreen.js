import React, { useState } from 'react';
import useFetchData from '../Hooks/useFetchData';
import ModalComponent from '../Components/ModalComponent';
import ProductModal from '../Components/ProductModal';
import ProjectModalComponent from '../Components/ProjectModalComponent';

const HomeScreen = () => {
  const { data: blogs } = useFetchData(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`);
  const { data: products } = useFetchData(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
  const { data: projects } = useFetchData(`${process.env.REACT_APP_BACKEND_URL}/api/projects`);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const openProduct = (product) => {
    setSelectedProduct(product);
    setIsProductOpen(true);
  };

  const closeProduct = () => {
    setIsProductOpen(false);
    setSelectedProduct(null);
  };

  const openProject = (project) => {
    setSelectedProject(project);
    setIsProjectOpen(true);
  };

  const closeProject = () => {
    setIsProjectOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="bg-cover bg-center h-screen dark:bg-dark-image bg-light-image">
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Welcome To CSW-BLOG</h1>
            <p className="mt-4 text-xl text-gray-200">Discover the latest news and trends in the tech world.</p>
            <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Explore Now</button>
          </div>
        </div>
      </div>

      {/* Featured Cards Section */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.slug} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
            <img src={blog.image || 'https://i.gifer.com/35LA.gif'} alt={blog.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">{blog.description.substring(0, 100)}...</p>
            <button onClick={() => openModal(blog)} className="text-blue-500 font-semibold hover:underline dark:text-blue-400">
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* My Products */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-sm md:text-3xl font-bold text-center mb-8 whitespace-nowrap">Download Free Website Templates and Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.slug} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
              <img src={product.thumbnail} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 overflow-hidden">{product.description.substring(0, 100)}...</p>
              <button onClick={() => openProduct(product)} className="text-blue-500 font-semibold hover:underline dark:text-blue-400">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* My Projects */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-sm md:text-3xl font-bold text-center mb-8 whitespace-nowrap">Download Free Web & App Development Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.slug} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 overflow-hidden">{project.description.substring(0, 100)}...</p>
              <button onClick={() => openProject(project)} className="text-blue-500 font-semibold hover:underline dark:text-blue-400">
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Components */}
      {isModalOpen && <ModalComponent isOpen={isModalOpen} onClose={closeModal} blog={selectedBlog} />}
      {isProductOpen && <ProductModal isOpen={isProductOpen} onClose={closeProduct} product={selectedProduct} />}
      {isProjectOpen && <ProjectModalComponent isOpen={isProjectOpen} onClose={closeProject} project={selectedProject} />}
    </div>
  );
};

export default HomeScreen;
