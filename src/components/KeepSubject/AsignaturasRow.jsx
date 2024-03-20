import DropdownMenu from "./DropdownMenu";
import CRUDModal from "./CRUDModal";
import React, { useState } from "react";
import { API } from "../../API";

function AsignaturasRow({ asignatura, reloadAsignaturas }) {
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleDelete = async () => {
        console.log("Dentro de handleDelete")
        if (window.confirm("¿Estás seguro de que deseas eliminar esta asignatura?")) {
            try {
                const response = await fetch(`${API}/api/adminin/asignaturas/${asignatura.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Algo salió mal al intentar eliminar la asignatura');
                }

                reloadAsignaturas();
            } catch (error) {
                console.error('Error al eliminar la asignatura:', error);
                alert('No se pudo eliminar la asignatura.');
            }
        }
    };

    return (
        <tr className="cursor-pointer border-b hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600" >
            <td className="w-5 ">
            </td>
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="ps-3">
                    <div className="text-base font-semibold">{asignatura.nombre}</div>
                    <div className="font-normal text-gray-500">{asignatura.codigo_carrera}</div>

                </div>
            </th>

            <th>
                <DropdownMenu options={[
                    { label: 'Editar', href: '#edit', action: () => setIsModalOpen(true) },
                    { label: 'Eliminar', href: '#delete', action: handleDelete }

                ]} />
            </th>
            {isModalOpen && <CRUDModal closeModal={() => setIsModalOpen(false)} asignatura={asignatura} reloadAsignaturas={reloadAsignaturas} />}


        </tr>


    );
}
export default AsignaturasRow;
