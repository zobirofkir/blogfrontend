import React from "react";
import Logo from '../../images/logo.png';

const FirstTimePopup = ({ onClose, user }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-full mx-auto text-center">
        <img
          src={Logo}
          alt="Popup Icon"
          className="mx-auto mb-4"
        />
        <h2 className="text-xl font-bold mb-2">Hello {user.name}</h2>
        <p className="text-gray-600 mb-4">
          Hey there! Now You Are Admin You Can Create A Blog But You Don't Have Access To User Management (For create and update and delete a user) .
        </p>
        <h2 className="text-black mb-2 text-xl font-bold">
          Your Info 
        </h2>
        <p>{user.name}</p>
        <p>{user.email}</p>
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
