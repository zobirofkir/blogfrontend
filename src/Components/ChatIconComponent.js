import axios from 'axios';
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatIconComponent = () => {
  const [modal, setModal] = useState(false);
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('Send your name and email, and we will contact you soon.');

  const handleModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setMessage('');
  };

  const handleSendMessage = async () => {
    try {
      const formData = new FormData();
      formData.append('message', message);

      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/messages`, formData);
      setResponseMessage('Thank you! Your message has been sent.');

      toast.success("Thanks We Will Contact You Soon ", {
        position: "top-right"
      });

      console.log(response.data.data);
    } catch (error) {
      console.error('Error sending message:', error);
      setResponseMessage('Sorry, there was an error sending your message.');
    }
  };

  return (
    <div>
      <ToastContainer/>

      {/* Chat Icon */}
      <svg
        height="40px"
        width="40px"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 60 60"
        className="size-10 fixed bottom-0 right-0 m-5 dark:bg-white dark:rounded cursor-pointer"
        onClick={handleModal}
      >
        <path d="M30,1.5c-16.542,0-30,12.112-30,27c0,5.205,1.647,10.246,4.768,14.604c-0.591,6.537-2.175,11.39-4.475,13.689c-0.304,0.304-0.38,0.769-0.188,1.153C0.276,58.289,0.625,58.5,1,58.5c0.046,0,0.093-0.003,0.14-0.01c0.405-0.057,9.813-1.412,16.617-5.338C21.622,54.711,25.738,55.5,30,55.5c16.542,0,30-12.112,30-27S46.542,1.5,30,1.5z" />
      </svg>

      {/* Modal */}
      <Transition show={modal}>
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <Transition.Child
            enter="transform transition duration-300"
            enterFrom="scale-75 opacity-0"
            enterTo="scale-100 opacity-100"
            leave="transform transition duration-200"
            leaveFrom="scale-100 opacity-100"
            leaveTo="scale-75 opacity-0"
          >
            <div
              className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-lg w-80 relative"
              onClick={(e) => e.stopPropagation()} // Prevent modal close on click inside
            >
              <svg
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                viewBox="0 0 26 26"
                className="size-5 mb-10 dark:bg-white rounded cursor-pointer absolute top-2 right-2"
                onClick={closeModal}
              >
                <g>
                  <path d="M21.125,0H4.875C2.182,0,0,2.182,0,4.875v16.25C0,23.818,2.182,26,4.875,26h16.25C23.818,26,26,23.818,26,21.125V4.875C26,2.182,23.818,0,21.125,0z M18.78,17.394l-1.388,1.387c-0.254,0.255-0.67,0.255-0.924,0L13,15.313L9.533,18.78c-0.255,0.255-0.67,0.255-0.925-0.002L7.22,17.394c-0.253-0.256-0.253-0.669,0-0.926l3.468-3.467L7.221,9.534c-0.254-0.256-0.254-0.672,0-0.925l1.388-1.388c0.255-0.257,0.671-0.257,0.925,0L13,10.689l3.468-3.468c0.255-0.257,0.671-0.257,0.924,0l1.388,1.386c0.254,0.255,0.254,0.671,0.001,0.927l-3.468,3.467l3.468,3.467C19.033,16.725,19.033,17.138,18.78,17.394z"/>
                </g>
              </svg>

              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Chat Window</h2>

              {/* Chat Messages Display */}
              <div className="mb-4 h-40 overflow-y-auto">
                <p className="text-gray-900 dark:text-gray-100">
                  {responseMessage} {/* Display the response message */}
                </p>
              </div>

              {/* Input Field */}
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full p-2 mb-4 border border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
              />

              {/* Send Button */}
              <button
                className="w-full bg-gray-200 dark:text-white text-gray-800 hover:bg-gray-400 hover:text-white px-4 py-2 rounded mb-2 dark:bg-gray-500"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </div>
  );
};

export default ChatIconComponent;
