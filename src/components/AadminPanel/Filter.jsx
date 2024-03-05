import React from "react";

export default function Filter({ handleSortChangeFecha,handleSearchChange, handleSortChange, handleEstadoChange, handleSortChangePromedio, handleCarreraChange, handlePostulacionChange, clearFilters }) {
    return (
        <>
            <div className="mt-5 mb-5 flex items-center justify-center">
                <div className="flex flex-col">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
                        <form className="">

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                                <div className="flex flex-col xl:col-span-5"> {/* Ajusta el ancho en pantallas xl */}
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-medium text-stone-600"
                                    >
                                        Buscador
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Nombre Rut Carrera..."
                                        onChange={handleSearchChange}
                                        className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                    />
                                </div>

                                

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="status"
                                        className="text-sm font-medium text-stone-600"
                                    >
                                        Estado
                                    </label>
                                    <select
                                        id="status"
                                        className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        onChange={handleEstadoChange}
                                    >
                                        <option value="">Todos los Estados</option>
                                        <option value="Postulando a">Postulando</option>
                                        <option value="Asignado a">Seleccionado</option>
                                        <option value="Evaluado Positivamente">Evaluación Positiva</option>
                                        <option value="Evaluado Negativamente">Evaluación Negativa</option>

                                    </select>
                                </div>

                              

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="manufacturer"
                                        className="text-sm font-medium text-stone-600"
                                    >
                                        Carrera
                                    </label>
                                    <select
                                        id="manufacturer"
                                        className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        onChange={handleCarreraChange}
                                    >
                                        <option value="">Todas las Carreras</option>
                                        <option value="1">Ingeniería Civil en Computación mención Informática</option>
                                        <option value="2">Ingeniería en Informática</option>
                                        <option value="3">Ingeniería Civil en Ciencias de Datos</option>

                                    </select>
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="manufacturer"
                                        className="text-sm font-medium text-stone-600"
                                    >
                                        Postulación
                                    </label>
                                    <select
                                        id="manufacturer"
                                        className="mt-2 block w-full rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                                        onChange={handlePostulacionChange}
                                    >
                                        <option value="">Todas las Carreras</option>
                                        <option value="1">Introducción a la Ingeniería</option>
                                        <option value="2">Algoritmos y Programación</option>
                                        <option value="3">Estructura de datos</option>
                                        <option value="4">Lenguajes de Programación</option>
                                        <option value="5">Base de Datos</option>
                                        <option value="6">Sistemas de Información</option>


                                    </select>
                                </div>

                              

                                {/* *********** */}

                            </div>
                            <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
                                <button onClick={clearFilters} className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring">
                                    Limpiar
                                </button>
                                <button onClick={(e) => e.preventDefault()} className="rounded-lg bg-blue-600 px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring">
                                    Buscar
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>


        </>
    )
}