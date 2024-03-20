// UserRow.jsx
function formatRUT(rut) {
    // Asumimos que el RUT viene sin formato, ej: '197787317'
    const rutBody = rut.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Añade puntos cada tres dígitos
    const dv = rut.slice(-1); // Dígito verificador
    return `${rutBody}-${dv}`;
}

function UserRow({ user }) {
    const formattedRUT = formatRUT(user.rut);
    return (
        <>
            <tr className="cursor-pointer border-b hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-600" >
                <td className="w-5 p-4">
                </td>
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="ps-3">
                        <div className="text-base font-semibold">{user.nombre}</div>
                        <div className="font-normal text-gray-500">{formattedRUT}</div>

                    </div>
                </th>
                <td className="px-6 py-4">{user.correo}</td>


            </tr>

        </>
    );
}
export default UserRow;
