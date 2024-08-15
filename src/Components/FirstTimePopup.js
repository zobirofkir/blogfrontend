import React from "react";
import Logo from '../images/logo.png';

const FirstTimePopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-full mx-auto text-center">
        <img
          src={Logo}
          alt="Popup Icon"
          className="mx-auto mb-4"
        />
        <h2 className="text-xl font-bold mb-2">Welcome to CSW-BLOG!</h2>
        <p className="text-gray-600 mb-4">
          Hey there! We're glad to have you here. Explore our content and enjoy the experience.
        </p>
        <p className="text-gray-700 mb-6">
          If you need to be an admin to create blogs, just contact me.
        </p>
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FirstTimePopup;
