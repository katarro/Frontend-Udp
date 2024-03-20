import React, { useState, useEffect } from "react";
import HeadTable from "./HeadTable";
import AsignaturasRow from "./AsignaturasRow";
import { API } from "../../API";
import Spinner from "../spinner/Spinner";

export default function KeepSubject() {
    const [asignaturas, setAsignaturas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [newNombre, setNewNombre] = useState('');
    const [newCodigoCarrera, setNewCodigoCarrera] = useState('');

    const handleAddAsignatura = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const newAsignatura = {
            nombre: newNombre,
            codigo_carrera: newCodigoCarrera,
        };

        try {
            const response = await fetch(`${API}/api/adminin/asignaturas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newAsignatura),
            });

            if (!response.ok) {
                throw new Error('Error al crear la nueva asignatura');
            }

            await response.json();
            setNewNombre(''); // Resetear el campo del formulario
            setNewCodigoCarrera(''); // Resetear el campo del formulario
            fetchAsignaturas(); // Recargar lista de asignaturas
        } catch (error) {
            console.error('Error al crear la asignatura:', error);
            alert('Hubo un error al agregar la asignatura.');
        } finally {
            setIsLoading(false);
        }
    };



    const fetchAsignaturas = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API}/api/adminin/asignaturas`);
            if (!response.ok) {
                throw new Error('No se pudieron obtener las asignaturas');
            }
            const data = await response.json();
            setAsignaturas(data);
        } catch (error) {
            console.error('Error al obtener las asignaturas:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchAsignaturas();
    }, []);


    return (
        <>
            <div className="flex justify-center mt-2">
                <form onSubmit={handleAddAsignatura} className="mb-4">
                    <input
                        type="text"
                        placeholder="Nombre de la asignatura"
                        value={newNombre}
                        onChange={(e) => setNewNombre(e.target.value)}
                        required
                        className="text-sm text-gray-700 p-2 rounded border-2 border-gray-300 mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Código de la carrera"
                        value={newCodigoCarrera}
                        onChange={(e) => setNewCodigoCarrera(e.target.value)}
                        required
                        className="text-sm text-gray-700 p-2 rounded border-2 border-gray-300 mr-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">Agregar</button>
                </form>
            </div>

            {
                isLoading ?
                    (<div className="flex justify-center items-center h-screen">
                        <Spinner />
                    </div>) :
                    (

                        <>

                            <div className="flex justify-center">
                                <table className="w-1/2 text-sm text-left text-gray-500 dark:text-gray-400">
                                    <HeadTable />
                                    <tbody>
                                        {asignaturas.map((asignatura) => (
                                            <AsignaturasRow key={asignatura.codigo_carrera} asignatura={asignatura} reloadAsignaturas={fetchAsignaturas} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    )
            }

        </>

    )
}