import React, { useState } from 'react'
import Modal from '../Components/ModalComponent'

const BlogScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState(null)

  const blogs = [
    {
      id: 1,
      title: 'Blog Post Title 1',
      image: 'https://i.gifer.com/origin/fa/fa9e27a7534060df383ab54354fcead3_w200.gif',
      content: 'A detailed description of the blog post. This section will include the full content of the blog post.'
    },
    {
      id: 2,
      title: 'Blog Post Title 2',
      image: 'https://i.gifer.com/origin/fa/fa9e27a7534060df383ab54354fcead3_w200.gif',
      content: 'A detailed description of the blog post. This section will include the full content of the blog post.'
    },
    {
      id: 3,
      title: 'Blog Post Title 3',
      image: 'https://i.gifer.com/origin/fa/fa9e27a7534060df383ab54354fcead3_w200.gif',
      content: 'A detailed description of the blog post. This section will include the full content of the blog post.'
    },
  ]

  const openModal = (blog) => {
    setSelectedBlog(blog)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedBlog(null)
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-blue-500 text-white py-16 dark:bg-blue-800">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/path/to/your/image.jpg)' }}></div>
        <div className="relative container mx-auto text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Welcome to Our Blog
          </h1>
          <p className="mt-4 text-lg md:text-xl">
            Stay updated with the latest news, tips, and insights.
          </p>
          <a href="#latest-posts" className="mt-6 inline-block bg-white text-blue-500 px-6 py-3 rounded-lg font-semibold dark:bg-gray-800 dark:text-blue-400 hover:underline">
            Explore Now
          </a>
        </div>
      </section>

      {/* Main Content */}
      <main className="mt-6">
        {/* Blog Post Cards */}
        <section id="latest-posts" className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6 text-center dark:text-white">Latest Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md dark:bg-gray-800 dark:text-white">
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {blog.content.substring(0, 100)}...
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
        </section>
      </main>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} blog={selectedBlog} />
    </div>
  )
}

export default BlogScreen
