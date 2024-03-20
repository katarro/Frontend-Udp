//Toggle.jsx
import React, { useState, useEffect } from 'react';
import { API } from '../../API';
import Spinner from '../spinner/Spinner';
import { useNavigate } from 'react-router-dom';
export default function Toggle({ rutPostulante, postulante, onActualizarEstado, actualizarDatosPostulante }) {

    const navigate = useNavigate();
    const asignatura = postulante.id_asignatura;
    const id_postulante = postulante.id_postulante;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoadingAsignacion, setIsLoadingAsignacion] = useState(false);
    const [profesores, setProfesores] = useState([]);
    const [filteredProfesores, setFilteredProfesores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const openModal = () => setIsModalOpen(true);

    const closeModal = () => {
        setIsModalOpen(false);
        navigate('/admin')
    }

    useEffect(() => {
        cargarProfesores();
        console.log("ID Asignatura: ", asignatura);
    }, []);


    const manejarCambio = (nuevoEstado, profesorId) => {
        const fechaCambioEstado = new Date().toISOString().split('T')[0];
        const fechaAsignacion = new Date().toISOString().split('T')[0];

        onActualizarEstado(nuevoEstado, fechaCambioEstado, profesorId, fechaAsignacion);
    };

    const cargarProfesores = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API}/api/adminin/profesores`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            setFilteredProfesores(data);
            setProfesores(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const asignarProfesor = async (profesorId) => {

        const estado = 'Asignado a';

        try {
            setIsLoadingAsignacion(true);
            const response = await fetch(`${API}/api/adminin/asignar-profesor`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ profesorId, rutPostulante, asignatura, estado, id_postulante }),
            });
            manejarCambio(estado, profesorId);
            actualizarDatosPostulante();
        }
        catch (error) {
            console.error('Error al asignar el profesor:', error);
        }
        finally {
            setIsLoadingAsignacion(false);
        }

    };


    return (
        <>

            {isLoadingAsignacion && (
                <div className="fixed inset-0 z-50 flex justify-center items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <Spinner />
                </div>
            )}
            <button
                className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={openModal}
            >
                Asignar
            </button>

            {isModalOpen && (
                <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-40 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex">
                    <div className="relative p-4 w-full max-w-2xl max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Encabezado del modal */}
                            <div className="flex items-start justify-between p-4 border-b rounded-t">
                                <h3 className="text-xl font-semibold">Asignar Profesor</h3>
                                <button onClick={closeModal}
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                                    {/* Ícono de cierre */}
                                </button>
                            </div>

                            {/* Cuerpo del modal */}
                            <div className="p-6 space-y-6">
                                {isLoading ? (
                                    <Spinner />
                                ) : error ? (
                                    <p>Error: {error}</p>
                                ) : (
                                    <ul className="space-y-3">
                                        {filteredProfesores.map((profesor) => (
                                            <li key={profesor.id}
                                                className="flex items-center justify-between hover:bg-gray-100 cursor-pointer p-2 rounded"
                                                onClick={() => asignarProfesor(profesor.id)}>
                                                <span className="font-medium">{profesor.nombre}</span>
                                                <span>{profesor.correo}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Pie del modal */}
                            <div className="flex justify-end items-end p-6 space-x-2 rounded-b border-t border-gray-200">
                                <button onClick={closeModal} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Aceptar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

/* 

Carrera: Ciencias de Datos
Asignatura: Bases de datos

*/