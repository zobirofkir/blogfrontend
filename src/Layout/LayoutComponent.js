import React, { useState } from 'react';
import SidebarComponent from '../Components/SidebarComponent';
import FooterComponent from '../Components/FooterComponent';
import HeaderComponent from '../Components/HeaderComponent';

const LayoutComponent = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      <div className="flex flex-1">
        <SidebarComponent isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className={`flex-grow transition-all overflow-hidden duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
          {children}
        </main>
      </div>
      <FooterComponent />
    </div>
  );
};

export default LayoutComponent;
