import React from 'react';

const ContactScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-4">We'd love to hear from you! Please reach out using the contact form below.</p>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="w-full p-2 border border-gray-600 bg-gray-700 rounded text-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your Email"
              className="w-full p-2 border border-gray-600 bg-gray-700 rounded text-gray-100"
            />
          </div>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your Message"
              className="w-full p-2 border border-gray-600 bg-gray-700 rounded text-gray-100"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="bg-purple-800 text-white px-10 py-3 rounded hover:bg-purple-900"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactScreen;
