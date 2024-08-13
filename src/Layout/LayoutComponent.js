import React, { useState } from 'react';
import SidebarComponent from '../Components/SidebarComponent';
import HomeScreen from '../Screens/HomeScreen';
import FooterComponent from '../Components/FooterComponent';
import HeaderComponent from '../Components/HeaderComponent';

const LayoutComponent = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent/>
      <SidebarComponent isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-grow transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
        <HomeScreen />
      </div>
      <FooterComponent/>
    </div>
  );
};

export default LayoutComponent;
