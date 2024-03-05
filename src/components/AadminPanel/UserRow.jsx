// UserRow.jsx
function getStatusColor(estado) {
    switch (estado) {
        case 'Asignado a':
            return 'bg-green-500'; // Luz verde para Aprobado
        case 'Evaluado Positivamente':
            return 'bg-green-500'; // Luz verde para Aprobado
        case 'Evaluado Negativamente':
            return 'bg-red-500'; // Luz roja para Rechazado
        case 'Postulando a':
            return 'bg-yellow-500'; // Luz amarilla para Pendiente
        default:
            return 'bg-gray-500'; // Un color neutro para cualquier otro estado
    }
}


const carreras = [
    { id: 1, nombre: 'Ingeniería Civil en Computación mención Informática' },
    { id: 2, nombre: 'Ingeniería en Informática' },
    { id: 3, nombre: 'Ingeniería Civil en Ciencias de Datos' },
]

const asignaturas = [
    { id: 1, nombre: 'Introducción a la Ingeniería' },
    { id: 2, nombre: 'Algoritmos y Programación	' },
    { id: 3, nombre: 'Estructura de Datos' },
    { id: 4, nombre: 'Lenguajes de Programación' },
    { id: 5, nombre: 'Bases de Datos' },
    { id: 6, nombre: 'Sistemas de Información' },
]


function UserRow({ user, onClick }) {
    return (
        <tr className="cursor-pointer border-b hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600" onClick={onClick}>
            <td className="w-5 p-4">
            </td>
            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                <div className="ps-3">
                    <div className="text-base font-semibold">{user.nombre}</div>
                    <div className="font-normal text-gray-500">{user.rut}</div>
                </div>
            </th>
            <td className="px-6 py-4">

                {
                    carreras.find(carrera => carrera.id === user.id_carrera)?.nombre
                    || 'Carrera no encontrada'
                }


            </td>

            <td className="px-6 py-4">
                <b>{asignaturas.find(asignatura => asignatura.id === user.id_asignatura)?.nombre || 'Asignatura no encontrada'}</b>
                <br />
                {user.fecha_postulacion}
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full ${getStatusColor(user.estado)} me-2`}></div>{user.estado}
                </div>
            </td>


        </tr>

    );
}
export default UserRow;
