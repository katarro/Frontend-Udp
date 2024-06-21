import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Admin.css';
import { API } from '../../API';
import Confirmation from './Confirmation';
import Spinner from '../spinner/Spinner';

export default function Administrador() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(`${API}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();

      if (response.ok) {
        if (data.userType === 'administrador') {
          localStorage.setItem('tokenAdmin', data.token);
          navigate('/admin');
        } else if (data.userType === 'profesor') {
          localStorage.setItem('tokenProfesor', data.token);
          localStorage.setItem('emailProfesor', email);
          localStorage.setItem('idProfesor', data.id_profesor)
          navigate('/profesor');
        }
      } else {
        setErrorMessage(data.message || 'Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      setErrorMessage('No hay credenciales válidas');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API}/api/restablecer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: email })
      });

      if (!response.ok) {
        setErrorMessage('Error al enviar el correo');
        return;
      }

      setShowConfirmation(true);
      setEmail('');
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      setErrorMessage('Error al procesar la solicitud');
    } finally {
      setIsLoading(false);
    }
  };

  const onclose = () => {
    setShowConfirmation(false);
  }

  return (
    <>
      {showConfirmation && <Confirmation show={showConfirmation} onClose={onclose} />}
      {isLoading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Spinner />
        </div>
      )}


      <div className='flex justify-center items-center h-screen'>
        <div className="w-full max-w-sm p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form className="space-y-6" onSubmit={isResettingPassword ? handlePasswordReset : handleLogin}>
            <h5 className="text-xl font-medium text-gray-900">
              {isResettingPassword ? 'Restablecer Contraseña' : 'Iniciar Sesión'}
            </h5>
            {errorMessage && <div className="text-red-500">{errorMessage}</div>}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="nombre@udp.cl"
                required
              />
            </div>
            {!isResettingPassword && (
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                  Contraseña
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="••••••••"
                  required
                />
              </div>
            )}
            <button
              type="submit"
              className={`w-full flex justify-center items-center px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 ${isLoading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              disabled={isLoading}
            >
              {isResettingPassword ? 'Enviar enlace de restablecimiento' : 'Iniciar Sesión'}
            </button>
            {!isResettingPassword ? (
              <div className="flex items-end justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-700 hover:underline"
                  onClick={() => setIsResettingPassword(true)}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            ) : (
              <div className="flex items-end justify-end">
                <button
                  type="button"
                  className="text-sm text-blue-700 hover:underline"
                  onClick={() => setIsResettingPassword(false)}
                >
                  Volver al inicio de sesión
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
