import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutComponent from './Layout/LayoutComponent';

// Import your pages here
import HomeScreen from './Screens/HomeScreen';
import AboutScreen from './Screens/AboutScreen';
import BlogScreen from './Screens/BlogScreen';
import ContactScreen from './Screens/ContactScreen';
import LoginScreen from './Screens/auth/LoginScreen';
import DetailsScreen from './Screens/DetailsScreen';
import DashboardScreen from './Screens/dashboard/DashboardScreen';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoute';
import CreateBlogScreen from './Screens/auth/CreateBlogScreen';
import UpdateBlogScreen from './Screens/auth/UpdateBlogScreen';
import CreateUserScreen from './Screens/auth/CreateUserScreen';
import UpdateUserScreen from './Screens/auth/UpdateUserScreen';
import FirstTimePopup from './Components/FirstTimePopup';
import CreateProductScreen from './Screens/auth/CreateProductScreen'
import UpdateProductScreen from './Screens/auth/UpdateProductScreen'
import ProductScreen from './Screens/ProductScreen'
import CreateProjectScreen from './Screens/auth/CreateProjectScreen';
import UpdateProjectScreen from './Screens/auth/UpdateProjectScreen';
import ProjectScreen from './Screens/ProjectScreen';
import ProjectInfoScreen from './Screens/ProjectInfoScreen';
import ProductInfoScreen from './Screens/ProductInfoScreen'

const App = () => {

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const isFirstVisit = localStorage.getItem("firstVisit");
    if (!isFirstVisit) {
      setShowPopup(true);
      localStorage.setItem("firstVisit", "true");
    }
  }, []);


  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <Router>
      {showPopup && <FirstTimePopup onClose={closePopup} />}
      <LayoutComponent>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/abouts" element={<AboutScreen />} />
          <Route path="/blogs" element={<BlogScreen />} />
          <Route path="/contacts" element={<ContactScreen />} />
          <Route path='/:slug' element={<DetailsScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/products" element={<ProductScreen />} />
          <Route path="/products" element={<ProductScreen />} />
          <Route path="/product-info/:slug" element={<ProductInfoScreen />} />

          <Route path="/projects" element={<ProjectScreen />} /> {/* Updated route */}
          <Route path="/project-info/:slug" element={<ProjectInfoScreen/>}/>

          <Route path="/dashboard" element={<ProtectedRoute element={<DashboardScreen />} />} />
          <Route path="/create-blog" element={<ProtectedRoute element={<CreateBlogScreen />} />} />
          <Route path="/update-blog" element={<ProtectedRoute element={<UpdateBlogScreen />} />} />
          <Route path="/create-user" element={<ProtectedRoute element={<CreateUserScreen />} />} />
          <Route path="/update-user" element={<ProtectedRoute element={<UpdateUserScreen />} />} />
          <Route path="/create-product" element={<ProtectedRoute element={<CreateProductScreen />} />} />
          <Route path="/update-product" element={<ProtectedRoute element={<UpdateProductScreen />} />} />
          <Route path="/create-project" element={<ProtectedRoute element={<CreateProjectScreen />} />} />
          <Route path="/update-project" element={<ProtectedRoute element={<UpdateProjectScreen />} />} />
        </Routes>
      </LayoutComponent>
    </Router>
  );
};

export default App;
