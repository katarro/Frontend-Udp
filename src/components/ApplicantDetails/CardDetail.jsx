//CardDetail.jsx
import React from "react";
import Toggle from "./Toggle";
import ModalConfirm from "./ModalConfirm";
import Spinner from "../spinner/Spinner";

export function CardDetail({ postulante, profesores, formatRut, carreras, formatearFecha, tokenAdmin, handleReject, asignaturas, actualizarEstadoPostulante, actualizarDatosPostulante, isLoading }) {


    const nombreProfesor = profesores.find(prof => prof.id === postulante.id_profesor)?.nombre || 'Sin profesor aún';



    return (
        <>

            {isLoading && (
                <div className="fixed inset-0 z-50 flex justify-center items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <Spinner />
                </div>
            )}

            <div className="bg-white max-w-2xl mx-auto shadow overflow-hidden sm:rounded-lg my-8">
                <div className="flex flex-col items-center justify-center px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Detalles del Estudiante
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 text-center">
                        Información Detallada del Estudiante.
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
                            <dt className="text-sm font-medium text-gray-500">Carrera</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {carreras.find(carrera => carrera.id === postulante.id_carrera)?.nombre || 'Carrera no encontrada'}
                            </dd>
                        </div>



                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Estado</dt>
                            <dd className={`mt-1 text-sm ${postulante.estado === 'Asignado a' ? 'text-green-500' : 'text-yellow-500'} sm:mt-0 sm:col-span-2`}>
                                {postulante.estado} {asignaturas.find(asignatura => asignatura.id === postulante.id_asignatura)?.nombre || 'Carrera no encontrada'}
                            </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Correo</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {postulante.correo}
                            </dd>
                        </div>

                        <div className="bg-white-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Profesor</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {nombreProfesor}
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
                            <dt className="text-sm font-medium text-gray-500">Fecha Asignación</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {postulante.fecha_asignacion || 'No asignado'}
                            </dd>
                        </div>

                        <div className="bg-white-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Fecha Cambio de Estado</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {postulante.fecha_cambio_estado || 'Sin cambios'}
                            </dd>
                        </div>



                        {tokenAdmin && (
                            <div className="bg-gray-50 px-4 py-5 sm:px-6 flex justify-between  space-x-2">

                                <ModalConfirm rechazar={handleReject} />


                                <Toggle
                                    rutPostulante={formatRut(postulante.rut)}
                                    postulante={postulante}
                                    onActualizarEstado={actualizarEstadoPostulante}
                                    actualizarDatosPostulante={actualizarDatosPostulante}
                                />

                            </div>
                        )}
                    </dl>
                </div>
            </div>
        </>
    );
}