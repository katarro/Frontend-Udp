import React, { useState } from 'react';
import Cleave from 'cleave.js/react';
import "./State.css";
import { API } from '../../API';
import { Spinner } from 'react-bootstrap';
import Error from './Error';

export default function State() {
  const [postulaciones, setPostulaciones] = useState([]);
  const [estadoPostulacion, setEstadoPostulacion] = useState('');
  const [formData, setFormData] = useState({ rut: '', });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChangeRut = (e) => {
    let inputValue = e.target.value;
    let rutSinFormato = inputValue.replace(/\./g, '').replace('-', '');
    let cuerpo = rutSinFormato.slice(0, -1);
    let dv = rutSinFormato.slice(-1).toUpperCase();

    const rutFormateado = cuerpo.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '-' + dv;
    setFormData({ ...formData, rut: rutFormateado });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verificarPostulacion();
  };

  const obtenerPostulaciones = async () => {
    const response = await fetch(`${API}/api/adminin`);
    const data = await response.json();
    setPostulaciones(data);

  }

  const verificarPostulacion = async () => {
    const rut = formData.rut;
    const url = `${API}/api/estado/${rut}`;
    obtenerPostulaciones();

    try {
      setIsLoading(true);
      const response = await fetch(url);

      if (response.ok) {
        const result = await response.json();
        // Actualizar el estado con la información obtenida de la API
        setEstadoPostulacion(result.estado);
      } else {
        setError(true);
        // throw new Error('El rut ingresado no está registrado');
      }
    } catch (error) {
      setError(true);
      console.error('Error al realizar la petición:', error);
      alert('Error al verificar el estado de la postulación: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const asignaturas = [
    { id: 1, nombre: 'Introducción a la Ingeniería' },
    { id: 2, nombre: 'Algoritmos y Programación	' },
    { id: 3, nombre: 'Estructura de Datos' },
    { id: 4, nombre: 'Lenguajes de Programación' },
    { id: 5, nombre: 'Bases de Datos' },
    { id: 6, nombre: 'Sistemas de Información' },
  ]

  function formatearFecha(fecha) {
    const fechaParsed = new Date(fecha);
    const año = fechaParsed.getFullYear();
    const mes = fechaParsed.getMonth() + 1;
    if (año === 2024 && mes < 8) {
      return `${año}-01`;
    } else {
      return fecha;
    }
  }
  const onClose = () => {
    setError(false);
  }


  return (
    < >
      {error && <Error show={error} onClose={onClose} />}

      <div className="container mx-auto px-5 sm:px-6 lg:px-8 min-h-screen mb-5 ">
        <div className="mt-5">
          <h1 className='text-2xl sm:text-3xl text-center sm:text-left'><b>Estado de mi Postulación</b></h1>
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="mb-3">
              <label htmlFor="rut" className="block text-sm font-medium text-gray-700">Ingresa tu RUT</label>
              <Cleave
                options={{
                  blocks: [2, 3, 3, 1],
                  delimiters: ['.', '.', '-'],
                  numericOnly: false
                }}
                onChange={handleChangeRut}
                value={formData.rut}
                className=" p-2 mt-1 block w-full rounded-md border-1 border-black-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
            <div className='flex justify-center'>
              <button
                type="submit"
                className={`mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed transition ease-in-out duration-150 ${isLoading ? "cursor-not-allowed" : "cursor-pointer"}`}
                disabled={isLoading}
              >
                Verificar Estado
                {isLoading && <Spinner className='ml-2 w-4 h-4' />}
              </button>
            </div>
          </form>
          {formData.rut && estadoPostulacion && (
            <div className={`mt-4 px-4 py-3 rounded relative ${estadoPostulacion === 'Asignado a' ? 'bg-green-200' : 'bg-yellow-200'} max-w-xl mx-auto`} role="alert">
              {postulaciones.filter(postulacion => postulacion.rut === formData.rut)
                .map((postulacionFiltrada) => (
                  <div key={postulacionFiltrada.id_postulante} className="mb-4 p-4 border rounded shadow-sm bg-green-100">
                    <p className="font-bold">{postulacionFiltrada.nombre}</p>
                    <p>{estadoPostulacion} {asignaturas.find(asignatura => asignatura.id === postulacionFiltrada.id_asignatura)?.nombre || 'Carrera no encontrada'} </p>
                    <p>Periodo {formatearFecha(postulacionFiltrada.fecha_postulacion)}</p>
                  </div>
                ))
              }
            </div>
          )}

        </div>
      </div>


    </>
  );
}
