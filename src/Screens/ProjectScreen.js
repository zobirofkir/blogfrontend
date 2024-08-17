import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Components/ProjectModalComponent';

const ProjectScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  // Function to fetch project data from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects`);
      setProjects(response.data.data || []); // Ensure to handle cases where data might be undefined
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
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
            Welcome to Our Project
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Stay updated with the latest projects, tips, and insights.
          </p>
          <a
            href="#latest-posts"
            className="mt-6 inline-block bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold dark:bg-gray-800 dark:text-blue-400 hover:underline"
          >
            Explore Now
          </a>
        </div>
      </section>

      {/* Main Content */}
      <main className="mt-6">
        {/* Project Post Cards */}
        <section id="latest-posts" className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
            Latest Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={project.thumbnail || 'https://i.gifer.com/35LA.gif'} // Ensure default image path is correct
                    alt={project.name || 'Project Image'} // Use project name if available
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{project.name || 'Untitled'}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {project.description ? project.description.substring(0, 100) : 'Content not available...'}
                  </p>
                  <button
                    onClick={() => openModal(project)}
                    className="text-blue-500 font-semibold hover:underline dark:text-blue-400"
                  >
                    Read More
                  </button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-700 dark:text-gray-300">No projects available.</p>
            )}
          </div>
        </section>
      </main>

      {/* Modal */}
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />}
    </div>
  );
};

export default ProjectScreen;
