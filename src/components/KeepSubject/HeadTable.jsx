import DropdownMenu from "./DropdownMenu";

export default function HeadTable() {
    return (
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="px-6 py-3 p-8">Nombre</th>

                <th scope="col" className="px-6 py-3 p-8">Accion</th>


            </tr>
        </thead>
    );
}
