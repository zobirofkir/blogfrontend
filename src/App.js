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
          <Route path='details/:slug' element={<DetailsScreen />} />
          <Route path="/login" element={<LoginScreen />} />

          <Route path="/dashboard" element={<ProtectedRoute element={<DashboardScreen />} />} />
          <Route path="/create-blog" element={<ProtectedRoute element={<CreateBlogScreen />} />} />
          <Route path="/update-blog" element={<ProtectedRoute element={<UpdateBlogScreen />} />} />
          <Route path="/create-user" element={<ProtectedRoute element={<CreateUserScreen />} />} />
          <Route path="/update-user" element={<ProtectedRoute element={<UpdateUserScreen />} />} />
        </Routes>
      </LayoutComponent>
    </Router>
  );
};

export default App;
