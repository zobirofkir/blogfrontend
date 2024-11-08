import React, { useState } from 'react';
import useFetchData from '../Hooks/useFetchData';
import ModalComponent from '../Components/ModalComponent';
import ProductModal from '../Components/ProductModal';
import ProjectModalComponent from '../Components/ProjectModalComponent';
import DonateButtonComponent from '../Components/DonateButtonComponent';

const HomeScreen = () => {
  // Fetch data from the backend API
  const { data: blogs } = useFetchData(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`);
  const { data: products } = useFetchData(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
  const { data: projects } = useFetchData(`${process.env.REACT_APP_BACKEND_URL}/api/projects`);

  // State variables to track the status of the modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  // State variable to track the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search query changes
  const handleSearchChange = (event) => {
    // Update the search query state variable
    setSearchQuery(event.target.value.toLowerCase());
  };

  // Filter the data based on the search query
  const filteredBlogs = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchQuery) || 
    blog.description.toLowerCase().includes(searchQuery)
  );

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery) || 
    product.description.toLowerCase().includes(searchQuery)
  );

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery) || 
    project.description.toLowerCase().includes(searchQuery)
  );

  // Function to open the blog modal
  const openModal = (blog) => {
    // Set the selected blog state variable
    setSelectedBlog(blog);
    // Set the isModalOpen state variable to true
    setIsModalOpen(true);
  };

  // Function to close the blog modal
  const closeModal = () => {
    // Set the isModalOpen state variable to false
    setIsModalOpen(false);
    // Set the selectedBlog state variable to null
    setSelectedBlog(null);
  };

  // Function to open the product modal
  const openProduct = (product) => {
    // Set the selected product state variable
    setSelectedProduct(product);
    // Set the isProductOpen state variable to true
    setIsProductOpen(true);
  };

  const closeProduct = () => {
  // Function to close the product modal
    setIsProductOpen(false);
    // Set the isProductOpen state variable to false
    setSelectedProduct(null);
    // Set the selected product state variable to null
  };

  const openProject = (project) => {
  // Function to open the project modal
    setSelectedProject(project);
    // Set the selected project state variable
    setIsProjectOpen(true);
    // Set the isProjectOpen state variable to true
  };

  const closeProject = () => {
  // Function to close the project modal
    setIsProjectOpen(false);
    // Set the isProjectOpen state variable to false
    setSelectedProject(null);
    // Set the selected project state variable to null
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="bg-cover bg-center h-screen dark:bg-dark-image bg-light-image">
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white">CSW-ZOBIR</h1>
            <p className="mt-4 text-xl text-gray-200">Discover the latest news and trends in the tech world.</p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="container mx-auto px-4 py-6">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-3 py-2 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white w-full"
        />
      </div>

      {/* My Projects */}
      <div className="container mx-auto px-4 py-12">
        {/* <h2 className="text-sm md:text-3xl font-bold text-center mb-8 whitespace-nowrap">My Projects </h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.slug} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 overflow-hidden">{project.description.substring(0, 100)}...</p>
              <div className='flex justify-between w-full items-center'>
                <button onClick={() => openProject(project)} className="text-blue-500 font-semibold hover:underline dark:text-blue-400">
                  Read More
                </button>
                <p className="mb-4 overflow-hidden text-black dark:text-white">{formatTimeAndYear(project.created_at)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Cards Section */}
      <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {filteredBlogs.map((blog) => (
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
        {/* <h2 className="text-sm md:text-3xl font-bold text-center mb-8 whitespace-nowrap">Download Free Website Templates and Games</h2> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
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

      <DonateButtonComponent />
      {/* Modal Components */}
      {isModalOpen && <ModalComponent isOpen={isModalOpen} onClose={closeModal} blog={selectedBlog} />}
      {isProductOpen && <ProductModal isOpen={isProductOpen} onClose={closeProduct} product={selectedProduct} />}
      {isProjectOpen && <ProjectModalComponent isOpen={isProjectOpen} onClose={closeProject} project={selectedProject} />}
    </div>
  );
};

export default HomeScreen;
