import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LayoutComponent from './Layout/LayoutComponent';

// Import your pages here
import HomeScreen from './Screens/HomeScreen';
import AboutScreen from './Screens/AboutScreen';
import BlogScreen from './Screens/BlogScreen';
import NewsScreen from './Screens/NewsScreen';
import ContactScreen from './Screens/ContactScreen';
import LoginScreen from './Screens/auth/LoginScreen'

const App = () => {
  return (
    <Router>
      <LayoutComponent>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/abouts" element={<AboutScreen />} />
          <Route path="/blogs" element={<BlogScreen />} />
          <Route path="/news" element={<NewsScreen />} />
          <Route path="/contacts" element={<ContactScreen />} />
          <Route path="/login" element={<LoginScreen/>}/>
        </Routes>
      </LayoutComponent>
    </Router>
  );
}

export default App;