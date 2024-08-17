import React, { useEffect, useState } from 'react';
import ModalComponent from '../Components/ModalComponent'; // Ensure this path is correct
import axios from 'axios';
import ProductModal from '../Components/ProductModal';
import ProjectModalComponent from '../Components/ProjectModalComponent';

const HomeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [blogs, setBlogs] = useState([]); // Corrected variable name
  const [products, setProducts] = useState([]);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [projects, setProjects] = useState([]);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);


  const handleProducts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
    setProducts(response.data.data)
  }
  

  useEffect(() => {
    handleProducts()
  }, [projects])


  const handleProjects = async () => {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects`)
    setProjects(response.data.data)
  }
  

  useEffect(() => {
    handleProjects()
  }, [projects])



  const openModal = (blog) => {
    console.log("Opening modal for blog:", blog); // Debug log
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal"); // Debug log
    setIsModalOpen(false);
    setSelectedBlog(null);
  };
  
  const openProduct = (product) => {
    setSelectedProduct(product);
    setIsProductOpen(true);
  };

  const closeProduct = () => {
    console.log("Closing Product"); // Debug log
    setIsProductOpen(false);
    setSelectedProduct(null);
  };


  const openProject = (project) => {
    setSelectedProject(project);
    setIsProjectOpen(true);
  };

  const closeProject = () => {
    console.log("Closing Project"); // Debug log
    setIsProjectOpen(false);
    setSelectedProject(null);
  };


  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`);
      console.log(response.data.data);
      setBlogs(response.data.data); 
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="bg-cover bg-center h-screen dark:bg-dark-image bg-light-image">
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white">Welcome to Our Blog</h1>
            <p className="mt-4 text-xl text-gray-200">Discover the latest news and trends in the tech world.</p>
            <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Explore Now</button>
          </div>
        </div>
      </div>

      {/* Featured Cards Section */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {blog.description.substring(0, 100)}...
            </p>
            <button
              onClick={() => openModal(blog)}
              className="text-blue-500 font-semibold hover:underline dark:text-blue-400"
            >
              Read More
            </button>
          </div>
        ))}
      </div>

      {/* My Products */}
      <div className="container mx-auto px-4 py-12">
      <h2 className="text-sm md:text-3xl font-bold text-center mb-8 whitespace-nowrap">
        Download Free Website Templates and Games
      </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
              <img src={product.thumbnail} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 overflow-hidden">
                {product.description.substring(0, 100)}...
              </p>
              <button
                onClick={() => openProduct(product)}
                className="text-blue-500 font-semibold hover:underline dark:text-blue-400"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* My Projects */}
      <div className="container mx-auto px-4 py-12">
      <h2 className="text-sm md:text-3xl font-bold text-center mb-8 whitespace-nowrap">
        Download Free Web & App Development Projects
      </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 overflow-hidden">
                {project.description.substring(0, 100)}...
              </p>
              <button
                onClick={() => openProject(project)}
                className="text-blue-500 font-semibold hover:underline dark:text-blue-400"
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Component */}
      {isModalOpen && <ModalComponent isOpen={isModalOpen} onClose={closeModal} blog={selectedBlog} />} 
      {/* Product Component */}
      {isProductOpen && <ProductModal isOpen={isProductOpen} onClose={closeProduct} product={selectedProduct} />} 
      {/* Project Component */}
      {isProjectOpen && <ProjectModalComponent isOpen={isProjectOpen} onClose={closeProject} project={selectedProject} />} 
    </div>
  );
};

export default HomeScreen;
