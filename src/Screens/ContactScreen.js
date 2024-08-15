import axios from 'axios';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactScreen = () => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const handleContact = async (e) => {
    e.preventDefault();
  
    const data = {
      name: name,
      email: email,
      message: message,
    };
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/contacts`, data);
      toast.success(`We will contact you soon at this email ${response.data.data.email}`);
    } catch (error) {
      toast.error('There was an error sending your message. Please try again.');
    }
  };
  
  return (
    <>
    <ToastContainer/>
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <div className="w-full max-w-lg bg-gray-800 p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg mb-4">We'd love to hear from you! Please reach out using the contact form below.</p>
        <form className="space-y-4" onSubmit={handleContact}>
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your Name"
              className="w-full p-2 border border-gray-600 bg-gray-700 rounded text-gray-100"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
    </>
  );
};

export default ContactScreen;
