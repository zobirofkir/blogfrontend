import React, { useState } from 'react';
import HeaderComponent from '../Components/HeaderComponent';
import SidebarComponent from '../Components/SidebarComponent'; // Corrected import
import FooterComponent from '../Components/FooterComponent';

const LayoutComponent = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent toggleSidebar={toggleSidebar} />
      <div className="flex flex-1">
        <SidebarComponent isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-4 bg-white ml-0 md:ml-64 lg:ml-64">
          {children}
        </main>
      </div>
      <FooterComponent />
    </div>
  );
}

export default LayoutComponent;
