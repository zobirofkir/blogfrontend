import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectInfoScreen = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/projects/${slug}`);
        setProject(response.data.data);
      } catch (error) {
        setError('Error fetching project details. Please try again later.');
        console.error('Error fetching project details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-400">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 dark:text-red-400">{error}</div>;
  }

  if (!project) {
    return <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-400">Project not found.</div>;
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6 sm:p-8 md:p-12 lg:p-16">
        <article className="w-full mx-auto max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{project.title}</h1>
          <img
            src={project.image || 'https://via.placeholder.com/800x400'}
            alt={project.title}
            className="w-full h-auto mb-6 object-cover rounded-lg shadow-md"
          />
          <p className="text-base md:text-lg leading-relaxed mb-6 text-gray-800 dark:text-gray-300">{project.description}</p>
          <div className="flex justify-center mt-5">
            <a
              href={project.filePath}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 dark:bg-gray-700 text-gray-100 px-6 py-3 rounded-full text-lg hover:bg-gray-700 dark:hover:bg-gray-600 transition"
              >
              Download
            </a>
          </div>
        </article>
      </div>
    </>
  );
};

export default ProjectInfoScreen;
