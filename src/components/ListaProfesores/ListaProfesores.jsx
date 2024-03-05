//ListaProfesores.jsx
import React from "react";
import UserRow from "./UserRow";
import HeadTable from './HeadTable';
import Spinner from "../spinner/Spinner";
import Filter from "./Filter";
import useProfesores from "./useProfesores";

export default function ListaProfesores() {
    const {
        filteredProfesores,
        isLoading,
        handleSortChange,
        handleSearchChange,
        clearFilters,
    } = useProfesores();

    return (
        <div>
            <div className="flex justify-center mt-5 mb-5"><h1><b>Lista de Profesores</b></h1></div>
            
            <Filter handleSearchChange={handleSearchChange}
                handleSortChange={handleSortChange}
                clearFilters={clearFilters} />


            {isLoading ? (
                <div className="flex justify-center mb-5"> <Spinner /> </div>
            ) : (
                <table className="mb-5 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <HeadTable />
                    <tbody>
                        {filteredProfesores.map((user) => (
                            <UserRow className="UserRow" key={user.id} user={user} />
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
