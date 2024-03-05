//CardDetail.jsx
import React, { useState } from "react";
import Modal from "./Modal";
import Spinner from "../spinner/Spinner";

export function CardDetail({
    postulante,
    profesores,
    formatRut,
    carreras,
    formatearFecha,
    tokenProfesor,
    asignaturas,
    isLoading,
    seleccionarPostulante }) {

    const nombreProfesor = profesores.find(prof => prof.id === postulante.id_profesor)?.nombre;


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [actionType, setActionType] = useState("");

    const handleOpenModal = (type) => () => {
        setActionType(type);
        setModalMessage(`${type === "Evaluado Positivamente" ? "Evaluado Positivamente" : "Evaluado Negativamente"}`);
        setIsModalOpen(true);
    };





    const handleConfirm = () => {
        setIsModalOpen(false);
        seleccionarPostulante(actionType);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };




    return (
        <>
            {isLoading && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <Spinner />
                </div>
            )}

            <div className="bg-white max-w-2xl mx-auto shadow overflow-hidden sm:rounded-lg my-8">

                <div className="flex flex-col items-center justify-center px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Detalles del Postulante
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 text-center">
                        Información detallada sobre el postulante.
                    </p>
                </div>

                <div className="border-t border-gray-200">
                    <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Nombre</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {postulante.nombre}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">RUT</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {formatRut(postulante.rut)}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Correo</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {postulante.correo}
                            </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Estado</dt>
                            <dd className={`mt-1 text-sm ${postulante.estado === 'Asignado a' || postulante.estado === 'Evaluado Positivamente'
                                ? 'text-green-500'
                                : postulante.estado === 'Evaluado Negativamente'
                                    ? 'text-red-500'
                                    : 'text-yellow-500'
                                } sm:mt-0 sm:col-span-2`}>
                                {postulante.estado} {asignaturas.find(asignatura => asignatura.id === postulante.id_asignatura)?.nombre || 'Carrera no encontrada'}
                            </dd>
                        </div>


                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Fecha Postulación</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {postulante.fecha_postulacion}
                            </dd>
                        </div>

                        <div className="bg-white-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Período</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {formatearFecha(postulante.fecha_postulacion)}
                            </dd>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Carrera</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {carreras.find(carrera => carrera.id === postulante.id_carrera)?.nombre || 'Carrera no encontrada'}
                            </dd>
                        </div>

                        <div className="bg-white-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Fecha Asignación</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {postulante.fecha_asignacion || 'No asignado'}
                            </dd>
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Fecha Cambio de Estado</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {postulante.fecha_cambio_estado || 'Sin cambios'}
                            </dd>
                        </div>

                        <div className="bg-white-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Profesor</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {nombreProfesor}

                            </dd>
                        </div>

                        <div className="flex justify-center bg-gray-50 px-4 py-3 sm:grid pt-5 border-t border-gray-200">
                            <dd className="flex justify-center mt-1 text-lg leading-6 font-medium text-gray-900">
                                <h3>Desempeño del ayudante</h3>
                            </dd>
                        </div>

                        {tokenProfesor && (


                            <div className="bg-gray-50 px-4 py-5 sm:px-6 flex justify-between  space-x-2">
                                <button
                                    onClick={handleOpenModal('Evaluado Negativamente')}
                                    type="button"
                                    className="w-full sm:w-auto focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                >Deficiente</button>

                                <button
                                    onClick={handleOpenModal('Evaluado Positivamente')}
                                    type="button"
                                    className="w-full sm:w-auto focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                >Excelente</button>


                                <Modal
                                    isOpen={isModalOpen}
                                    onConfirm={handleConfirm}
                                    onCancel={handleCancel}
                                    message={modalMessage}
                                />




                            </div>
                        )}
                    </dl>
                </div>
            </div>
        </>
    );
}

