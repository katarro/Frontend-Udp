import React from 'react';
import { Navigate } from 'react-router-dom';

const RutaProtegida = ({ children }) => {
  const tokenProfesor = localStorage.getItem('tokenProfesor');
  return tokenProfesor ? children : <Navigate to="/" />;
};

export default RutaProtegida;
