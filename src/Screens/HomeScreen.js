import React from 'react';

const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <div className="bg-cover bg-center h-96" style={{ backgroundImage: 'url("https://via.placeholder.com/1200x600")' }}>
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Featured Post 1</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">This is a short description of the featured post. Read more to find out the details.</p>
          <a href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">Read More</a>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Featured Post 2</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">This is a short description of the featured post. Read more to find out the details.</p>
          <a href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">Read More</a>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Featured Post 3</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">This is a short description of the featured post. Read more to find out the details.</p>
          <a href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">Read More</a>
        </div>
      </div>

      {/* Latest Blog Posts Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <img src="https://via.placeholder.com/300x200" alt="Blog Post" className="w-full h-40 object-cover rounded-t-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">Blog Post Title</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">A short description of the blog post content goes here.</p>
            <a href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">Read More</a>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <img src="https://via.placeholder.com/300x200" alt="Blog Post" className="w-full h-40 object-cover rounded-t-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">Blog Post Title</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">A short description of the blog post content goes here.</p>
            <a href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">Read More</a>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <img src="https://via.placeholder.com/300x200" alt="Blog Post" className="w-full h-40 object-cover rounded-t-lg mb-4" />
            <h3 className="text-xl font-bold mb-2">Blog Post Title</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">A short description of the blog post content goes here.</p>
            <a href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
