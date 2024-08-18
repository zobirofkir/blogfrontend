import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeaderComponent from '../../Components/auth/HeaderComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to generate a slug from a title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-') // Replace spaces and non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ''); // Trim hyphens from the start and end
};

const UpdateProjectScreen = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    filePath: '',
    price: '',
    slug: ''
  });
  const [image, setImage] = useState(null); // Separate state for image file
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const token = localStorage.getItem('access_token'); // Retrieve token from local storage

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/auth/projects`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response.data.data);
        setProjects(response.data.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        toast.error("Failed to fetch projects.");
      }
    };

    fetchProjects();
  }, [token]);

  // Open modal with project details
  const openModal = (project) => {
    setSelectedProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      filePath: project.filePath,
      price: project.price,
      slug: project.slug
    });
    setImage(null); // Reset image when opening modal
    setShowModal(true);
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "title") {
      // Update title and generate slug
      const slug = generateSlug(value);
      setFormData(prevData => ({
        ...prevData,
        title: value,
        slug: slug
      }));
    } else if (e.target.type === "file") {
      // For file inputs, store the selected file
      setFormData(prevData => ({
        ...prevData,
        [name]: files[0], // Store the file object
      }));
    } else {
      // For text inputs, store the text value
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Handle image file change
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Submit form to update project
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const form = new FormData();
    form.append('title', formData.title);
    form.append('description', formData.description);
    form.append('price', formData.price);
    if (image) {
      form.append('image', image); // Append image file if provided
    }
    form.append('filePath', formData.filePath);
    form.append('slug', formData.slug);

    try {
      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/projects/${selectedProject.slug}`,
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data' // Set header for file upload
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(progress);
          }
        }
      );
      setProjects(projects.map(project =>
        (project.slug === selectedProject.slug ? { ...project, ...formData, image: URL.createObjectURL(image) } : project)
      ));
      toast.success("Project updated successfully!");
      setShowModal(false);
      setUploadProgress(0);
    } catch (error) {
      setError('Error updating project. Please try again.');
      console.error("Error updating project:", error);
      toast.error("Failed to update project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <HeaderComponent />
      <div className="p-4 md:p-6 dark:bg-black min-h-screen">
        <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Update Projects</h1>

        <div className="space-y-4">
          {projects.map(project => (
            <div
              key={project.slug}
              className="p-4 bg-white dark:bg-gray-800 shadow-md rounded-lg flex flex-col md:flex-row md:justify-between items-center"
            >
              <div className="flex-shrink-0 mb-4 md:mb-0">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
              <div className="flex-grow text-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{project.title}</h2>
                <p className="text-md font-semibold text-gray-900 dark:text-white">{project.description.substring(0, 100)}</p>
              </div>
              <button
                onClick={() => openModal(project)}
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
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Update Project</h2>
              {error && <p className="text-red-600 mb-4">{error}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
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
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Image</label>
                  <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Filepath</label>
                  <input
                    type="file"
                    name="filePath"
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    className="w-full border border-gray-300 dark:border-gray-700 p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    readOnly // Read-only as it is auto-generated
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
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update'}
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
                {loading && <div className="mt-4"><p>Upload Progress: {uploadProgress}%</p></div>}
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateProjectScreen;
