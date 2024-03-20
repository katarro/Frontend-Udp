//import "./Register.css";
import React, { useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { API } from '../../API';
import Spinner from '../spinner/Spinner';

export default function CambiarPassword() {
  const API_URL = API
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [repetirNuevaContraseña, setRepetirNuevaContraseña] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nuevaContraseña !== repetirNuevaContraseña) {
      setError('Las contraseñas nuevas no coinciden.');
      setIsLoading(false);

      // Establece un temporizador para limpiar el mensaje de error después de 3 segundos
      setTimeout(() => {
        setError('');
      }, 3000);

      return;
    }


    let correoUsuario;

    const tokenProfesor = localStorage.getItem("tokenProfesor");
    const tokenAdmin = localStorage.getItem("tokenAdmin");

    if (tokenProfesor) {
      const usuarioInfo = jwtDecode(tokenProfesor);
      correoUsuario = usuarioInfo.email;
    } else if (tokenAdmin) {
      const usuarioInfo = jwtDecode(tokenAdmin);
      correoUsuario = usuarioInfo.email;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/api/cambiar-contrasena`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correoUsuario,
          contrasenaActual: contraseñaActual,
          contrasenaNueva: nuevaContraseña
        })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la contraseña');
      }
      setSuccessMessage('Contraseña cambiada con éxito');
      setContraseñaActual('');
      setNuevaContraseña('');
      setRepetirNuevaContraseña('');

      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setError('Error al cambiar la contraseña');
    } finally {
      setIsLoading(false);

    }


  };

  return (
    <>
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}

      <div className="mt-5 max-w-md mx-auto px-4">
        <h1 className="text-2xl font-bold text-center mb-6">Cambiar Contraseña</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label htmlFor="contraseñaActual" className="block text-gray-700 text-sm font-bold mb-2">Contraseña Actual</label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="contraseñaActual"
              value={contraseñaActual}
              onChange={(e) => setContraseñaActual(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nuevaContraseña" className="block text-gray-700 text-sm font-bold mb-2">Nueva Contraseña</label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nuevaContraseña"
              value={nuevaContraseña}
              onChange={(e) => setNuevaContraseña(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="repetirNuevaContraseña" className="block text-gray-700 text-sm font-bold mb-2">Repetir Nueva Contraseña</label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="repetirNuevaContraseña"
              value={repetirNuevaContraseña}
              onChange={(e) => setRepetirNuevaContraseña(e.target.value)}
              required
            />
          </div>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
          {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">{successMessage}</div>}

          <div className='flex justify-end items-center mt-4'>
            <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Cambiar</button>
          </div>
        </form>
      </div>

    </>
  );
}