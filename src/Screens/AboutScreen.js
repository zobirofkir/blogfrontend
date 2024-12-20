import React from 'react';
import DonateButtonComponent from '../Components/DonateButtonComponent';

/**
 * AboutScreen
 *
 * A functional component that renders the about page of the application.
 *
 * @returns {JSX.Element} The about page component.
 */
const AboutScreen = () => {
  return (

    <>
        <div className="bg-cover bg-center h-screen dark:bg-dark-image bg-light-image">
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white">About Us</h1>
          </div>
        </div>
      </div>

    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800">
      {/* The main container element */}
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg">
        {/* The title element */}
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About Us</h1>
        {/* The first paragraph element */}
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Welcome to CSW-ZOBIR! We are dedicated to bringing you the latest news, insights, and trends in the world of technology, lifestyle, and much more. Our team is passionate about delivering high-quality content to keep you informed and engaged.
        </p>
        {/* The second paragraph element */}
        <p className="text-gray-700 dark:text-gray-300">
          Our mission is to create a platform that fosters knowledge sharing and community engagement. Whether you are here to learn, explore, or contribute, we hope you find our content valuable and enjoyable.
        </p>
      </div>

      {/* The chat icon component */}
      <DonateButtonComponent/>
    </div>
    </>
  );
}
export default AboutScreen;
