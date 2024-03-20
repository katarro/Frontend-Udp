import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaProtegidaAmbos = ({ children }) => {
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const tokenProfesor = localStorage.getItem('tokenProfesor');

  return tokenAdmin || tokenProfesor ? children : <Navigate to="/login" />;
};

export default RutaProtegidaAmbos;
