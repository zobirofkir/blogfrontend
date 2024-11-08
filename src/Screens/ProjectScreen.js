import React, { useState } from 'react';
import Modal from '../Components/ProjectModalComponent';
import useFetchData from '../Hooks/useFetchData';
import DonateButtonComponent from '../Components/DonateButtonComponent';

/**
 * ProjectScreen component
 * @description This component renders the project screen.
 * @returns {JSX.Element} ProjectScreen component
 */
const ProjectScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { data: projects } = useFetchData(`${process.env.REACT_APP_BACKEND_URL}/api/projects`);

  /**
   * Open the modal with the selected project
   * @param {Object} project Project to be displayed in the modal
   */
  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  /**
   * Close the modal
   */
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  /**
   * Format the created_at date to show time and year
   * @param {string} dateString The date string to format
   * @returns {string} Formatted time and year
   */
  const formatTimeAndYear = (dateString) => {
    const date = new Date(dateString);
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
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
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">Project</h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="mt-6 py-10">
        {/* Project Post Cards */}
        <section id="latest-posts" className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Latest Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={project.image || 'https://i.gifer.com/35LA.gif'}
                    alt={project.name || 'Project Image'}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{project.title || 'Untitled'}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {project.description ? project.description.substring(0, 100) : 'Content not available...'}
                  </p>
                  <div className='flex justify-between w-full items-center'>
                    <button
                      onClick={() => openModal(project)}
                      className="text-blue-500 font-semibold hover:underline dark:text-blue-400"
                    >
                      Read More
                    </button>
                    <p>{formatTimeAndYear(project.created_at)}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-700 dark:text-gray-300">No projects available.</p>
            )}
          </div>
        </section>
      </main>

      <DonateButtonComponent />

      {/* Modal */}
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} project={selectedProject} />}
    </div>
  );
};

export default ProjectScreen;
