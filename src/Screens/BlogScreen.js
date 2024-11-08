import React, { useState } from 'react';
import Modal from '../Components/ModalComponent';
import useFetchData from '../Hooks/useFetchData';
import DonateButtonComponent from '../Components/DonateButtonComponent';

const BlogScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { data: blogs } = useFetchData(`${process.env.REACT_APP_BACKEND_URL}/api/blogs`);

  const openModal = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
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
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative text-white bg-cover bg-center h-screen flex items-center justify-center dark:bg-dark-image bg-light-image">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-50"
            style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}
          ></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Blog
            </h1>
          </div>
        </section>

      {/* Main Content */}
      <main className="mt-6 py-10">
        {/* Blog Post Cards */}
        <section id="latest-posts" className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">
            Latest Posts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white hover:shadow-lg transition-shadow duration-300"
                >
                  <img
                    src={blog.image || 'https://i.gifer.com/35LA.gif'}
                    alt={blog.title || 'Blog Post'} // Use default alt text if title is missing
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h3 className="text-xl font-semibold mb-2">{blog.title || 'Untitled'}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {blog.content ? blog.content.substring(0, 100) : 'Content not available...'}
                  </p>
                  <div className='flex justify-between w-full items-center'>
                      <button onClick={() => openModal(blog)} className="text-blue-500 font-semibold hover:underline dark:text-blue-400">
                        Read More
                      </button>
                      <p className="mb-4 overflow-hidden text-black dark:text-white">{formatTimeAndYear(blog.created_at)}</p>
                  </div>

                </div>
              ))
            ) : (
              <p className="text-center text-gray-700 dark:text-gray-300">No blogs available.</p>
            )}
          </div>
        </section>
      </main>

      <DonateButtonComponent/>

      {/* Modal */}
      {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} blog={selectedBlog} />}
    </div>
  );
};

export default BlogScreen;
