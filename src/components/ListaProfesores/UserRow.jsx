// UserRow.jsx

function UserRow({ user }) {
    return (
        <>
            <tr className="cursor-pointer border-b hover:bg-gray-200 " >
                <td className="w-5 p-4">
                </td>
                <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                    <div className="ps-3">
                        <div className="text-base font-semibold text-gray-900">{user.nombre}</div>
                    </div>
                </th>
                <td className="px-6 py-4 text-gray-900">{user.correo}</td>


            </tr>

        </>
    );
}
export default UserRow;
