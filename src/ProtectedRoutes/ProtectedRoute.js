import React from 'react';
import { Navigate } from 'react-router-dom';

// Function to check if the user is authenticated
const isAuthenticated = () => {
  return !!localStorage.getItem('access_token');
};

// ProtectedRoute component
const ProtectedRoute = ({ element: Component }) => {
  return isAuthenticated() ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
