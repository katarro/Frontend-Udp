import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { API } from '../../API';

export default function LoginProfesor() {
  const API_URL = `${API}/api/login`;
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para el indicador de carga
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Iniciar la carga
    setErrorMessage(''); // Limpiar mensajes de error anteriores

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('tokenProfesor', data.token); // Guarda el token
        navigate('/profesor'); // Redirige al usuario
      } else {
        setErrorMessage(data.message || 'Credenciales incorrectas'); // Establecer mensaje de error
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      setErrorMessage('No hay crdenciales validas');
    } finally {
      setIsLoading(false); // Finalizar la carga
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
  };

  return (

    <>
      <div className="container-admin">
        <div className="admin-container">
          <h1>Profesor</h1>

          {isLoading && <div>Cargando...</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form onSubmit={isResettingPassword ? handlePasswordReset : handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /* required */
              />
            </div>
            {!isResettingPassword && (
              <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /* required */
                />
              </div>
            )}
            <button type="submit" className="btn">
          {isResettingPassword ? 'Restablecer Contraseña' : 'Iniciar Sesión'}
        </button>

          </form>
          {!isResettingPassword ? (
            <p className="reset-password" onClick={() => setIsResettingPassword(true)}>
              ¿Olvidaste tu contraseña?
            </p>
          ) : (
            <p className="reset-password" onClick={() => setIsResettingPassword(false)}>
              Volver al inicio de sesión
            </p>
          )}
        </div>
      </div>
    </>

  );
}

