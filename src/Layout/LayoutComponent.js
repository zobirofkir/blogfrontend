import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarComponent from '../Components/SidebarComponent';
import FooterComponent from '../Components/FooterComponent';
import HeaderComponent from '../Components/HeaderComponent';

const LayoutComponent = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Determine whether to show the sidebar, header, and footer based on the current route
  const isDashboardRoute = location.pathname === '/dashboard';
  const isCreateBlogRoute = location.pathname === '/create-blog';
  const isUpdateBlogRoute = location.pathname.startsWith('/update');
  const isCreateUserRoute = location.pathname === '/create-user';
  const isUpdateUserRoute = location.pathname === '/update-user';
  
  // Hide sidebar on certain routes
  const isSidebarVisible = !isDashboardRoute && !isCreateBlogRoute && !isUpdateBlogRoute && !isCreateUserRoute;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Conditionally render HeaderComponent */}
      {!isDashboardRoute && !isCreateBlogRoute && !isUpdateBlogRoute && !isCreateUserRoute && <HeaderComponent />}
      <div className="flex flex-1">
        {/* Conditionally render SidebarComponent */}
        {isSidebarVisible && (
          <SidebarComponent
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        )}
        <main
          className={`flex-grow transition-all overflow-hidden duration-300 ${
            isSidebarOpen && isSidebarVisible ? 'ml-64' : 'ml-0'
          }`}
        >
          {children}
        </main>
      </div>
      {/* Conditionally render FooterComponent */}
      {!isDashboardRoute && !isCreateBlogRoute && !isUpdateBlogRoute && !isCreateUserRoute && !isUpdateUserRoute && <FooterComponent />}
    </div>
  );
};

export default LayoutComponent;
