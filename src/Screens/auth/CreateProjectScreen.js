import axios from 'axios';
import React, { useState, useEffect } from 'react';
import HeaderComponent from '../../Components/auth/HeaderComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateProjectScreen = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [filePath, setFilePath] = useState(null); 
  const [error, setError] = useState('');
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/projects`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        setProjects(response.data.data);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects');
      }
    };

    if (token) {
      fetchProjects();
    } else {
      setError('No token found');
    }
  }, [token]);

  const handleProject = async (e) => {
    e.preventDefault();

    if (!title || !image || !description || !filePath) {
      setError('All fields are required');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('image', image);
    formData.append('description', description);
    formData.append('filePath', filePath);

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/projects`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      toast.success("Project created successfully!", {
        position: "top-right"
      });

      setError('');
      setProjects([...projects, response.data]);
      setTitle('');
      setImage(null);
      setDescription('');
      setFilePath(null);
    } catch (err) {
      setError('Error creating project');
      console.error(err);
    }
  };

  const handleDelete = async (projectId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/projects/${projectId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      toast.success("Project deleted successfully!", {
        position: "top-right"
      });

      setProjects(projects.filter(project => project.id !== projectId));
    } catch (err) {
      setError('Error deleting project');
      console.error(err);
    }
  };

  return (
    <>
      <ToastContainer/>
      <HeaderComponent />
      
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4">
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create Project</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleProject} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Title:</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Image:</label>
              <input 
                type="file" 
                onChange={(e) => setImage(e.target.files[0])}
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:text-white"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">File:</label>
              <input 
                type="file" 
                onChange={(e) => setFilePath(e.target.files[0])} 
                required 
                className="mt-1 block w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:text-white"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Create Project
            </button>
          </form>
        </div>

        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {projects.map(project => (
              <div key={project.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.title}</h3>
                <img src={project.image} alt={project.title} className="mt-2 w-full h-40 object-cover rounded-lg" />
                <p className="mt-2 text-gray-700 dark:text-gray-300">{project.description?.substring(0, 100)}</p>
                <div>
                <button 
                  onClick={() => handleDelete(project.id)} 
                  className="mt-4 bg-red-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
                  <a href={project.filePath} target='__blank'>
                    <button className='mt-4 bg-gray-600 text-white py-2 px-4 rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mx-5'>
                      Download
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProjectScreen;
