import React, { useEffect, useState } from "react";
import './RequisitosAdmin.css';
import { API } from "../../API";

export default function RequisitosAdmin() {
    const [requisitos, setRequisitos] = useState([]);
    const [nuevoRequisito, setNuevoRequisito] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [idEliminando, setIdEliminando] = useState(null);


    useEffect(() => {
        const cargarRequisitos = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API}/api/requisitos`);
                const data = await response.json();
                setRequisitos(data);
            } catch (error) {
                console.error("Hubo un error al obtener los requisitos", error);
            } finally {
                setIsLoading(false);
            }
        };

        cargarRequisitos();
    }, []);

    const confirmarYEliminarRequisito = async (id) => {
        setIsDeleting(true);
        setIdEliminando(id);

        try {
            const response = await fetch(`${API}/api/adminin/requisito/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Error al eliminar el requisito');
            }
            setRequisitos(requisitos.filter(item => item.id !== id));
        } catch (error) {
            console.error("Error al eliminar el requisito", error);
        } finally {
            setIsDeleting(false);
        }
    };

    const agregarRequisito = async () => {
        if (nuevoRequisito) {
            setIsLoading(true);
            try {
                const requisitoObjeto = { requisito: nuevoRequisito };
                const response = await fetch(`${API}/api/adminin/requisitos`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requisitoObjeto),
                });
                const data = await response.json();
                if (data && data.id && data.requisito) {
                    setRequisitos(prevRequisitos => [...prevRequisitos, data]);
                    setNuevoRequisito("");
                } else {
                    console.error("La estructura del requisito agregado no es la esperada", data);
                }
            } catch (error) {
                console.error("Error al agregar el requisito", error);
            } finally {
                setIsLoading(false);
            }
        }
    };


    return (
        <>
            <div className={`requisitos-admin-container h-screen `}>
                <h1 className="requisitos-admin-title">Requisitos</h1>
                <div className="flex justify-start items-center space-x-2">
                    <input
                        type="text"
                        value={nuevoRequisito}
                        onChange={(e) => setNuevoRequisito(e.target.value)}
                        className="requisitos-input"
                        disabled={isDeleting}
                        onKeyDown={(e) => e.key === 'Enter' && agregarRequisito()}
                    />
                    <button onClick={agregarRequisito} type="button"
                        className={`flex justify-center intems-center px-3 py-2 mt-2 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${isLoading && 'bg-gray-400 cursor-not-allowed'}`}
                        disabled={isDeleting}
                    >
                        Agregar
                        {isLoading && (<svg aria-hidden="true"
                            role="status"
                            className={`inline w-4 h-4 ml-2 text-white animate-spin ${isLoading ? 'visible' : 'invisible'}`}
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>)}
                    </button>
                </div>
                <ul className="requisitos-list mt-4">
                    {requisitos.map((item) => (
                        <li key={item.id} className="requisitos-list-item flex justify-between items-center">
                            {item.requisito}
                            <button onClick={() => confirmarYEliminarRequisito(item.id)} type="button"
                                className={`flex justify-center items-center px-3 py-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 relative ${isDeleting & idEliminando === item.id && 'bg-gray-400 cursor-not-allowed'}`}
                                disabled={isDeleting}
                            >

                                Eliminar

                                {idEliminando === item.id && (
                                    <svg aria-hidden="true"
                                        role="status"
                                        className={`inline w-4 h-4 ml-2 text-white animate-spin ${idEliminando === item.id ? 'visible' : 'invisible'}`}
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                )}

                            </button>
                        </li>
                    ))}
                </ul>
            </div>


        </>



    );
}
