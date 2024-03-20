import React from 'react';


export default function ConfirmSubmission({ handleConfirm, handleCancel }) {

    return (
        <>

            <div
                id="popup-modal"
                tabIndex={-1}
                className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 w-full h-full flex items-center justify-center"
                aria-modal="true"
                role="dialog"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} // Asegúrate de que el fondo sea visible

            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                            type="button"
                            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="popup-modal"
                            onClick={handleCancel}

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
                        <div className=" p-4  md:p-5 text-center">
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
                                ¿Seguro que deseas confirmar tu postulación?
                            </h3>
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="sm:mr-2 mr-6 mb-4 py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                onClick={handleCancel}
                            >
                                Cancelar
                            </button>
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-gray-900 bg-green-500 border border-green-600 focus:outline-none hover:bg-green-600 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-700 dark:text-white dark:border-green-800 dark:hover:bg-green-800 dark:hover:border-green-900 dark:focus:ring-green-900"
                                onClick={handleConfirm}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </>


    )
}