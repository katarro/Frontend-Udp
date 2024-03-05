import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaProtegidaAdmin = ({ children }) => {
  const tokenAdmin = localStorage.getItem('tokenAdmin');

  return tokenAdmin ? children : <Navigate to="/login" />;
};

export default RutaProtegidaAdmin;
