import React, { useState } from "react";

export default function ModalConfirm({ rechazar }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const abrirModal = () => setIsModalOpen(true);
    const cerrarModal = () => setIsModalOpen(false);

    const handleReject = async (estado) => {
        try {
            await rechazar(estado);
        } catch (error) {
            console.error('Error al rechazar al ayudante:', error);
        } finally {
            cerrarModal();
        }
    };
    

    return (
        <div className="">
            <button
                data-modal-target="popup-modal"
                data-modal-toggle="popup-modal"
                className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
                onClick={abrirModal}
            >
                Rechazar
            </button>
            <div
                id="popup-modal"
                tabIndex={-1}
                className={`${isModalOpen ? '' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}
            >
                <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden justify-center items-center flex" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>

                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                type="button"
                                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="popup-modal"
                                onClick={cerrarModal}

                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Cerrar modal</span>
                            </button>
                            <div className="p-4 md:p-5 text-center">
                                <svg
                                    className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    ¿Seguro que deseas quitar al ayudante?
                                </h3>
                                <div className="flex justify-center space-x-4">
                                    <button
                                        data-modal-hide="popup-modal"
                                        type="button"
                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-4 py-2.5 text-center"
                                        onClick={handleReject} // Llama a la función handleReject cuando se hace click
                                    >
                                        Si, estoy seguro
                                    </button>
                                    <button
                                        data-modal-hide="popup-modal"
                                        type="button"
                                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                        onClick={cerrarModal} // Cierra el modal cuando se hace clic
                                    >
                                        No, cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}