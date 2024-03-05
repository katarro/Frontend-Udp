// AdminIn.jsx
import useAdminin from './useAdminin';
import React from 'react';
import Spinner from '../spinner/Spinner';
import UserRow from './UserRow';
import Filter from './Filter';
import HeadTable from './HeadTable';

export default function ListApplications() {
    const {
        filteredPostulantes,
        isLoading,
        handleSortChange,
        handleSearchChange,
        handleEstadoChange,
        handleSortChangePromedio,
        handleCarreraChange,
        handlePostulacionChange,
        clearFilters,
        handleItemClick,
    } = useAdminin();
    return (
        <>
            <div className='container-adminin'>
                <div className='container'>

                    <div className="flex justify-center items-center mt-5">
                        <h1><b>Lista de Ayudantes</b></h1>
                    </div>

                    <Filter
                        handleSearchChange={handleSearchChange}
                        handleSortChange={handleSortChange}
                        handleEstadoChange={handleEstadoChange}
                        handleSortChangePromedio={handleSortChangePromedio}
                        handleCarreraChange={handleCarreraChange}
                        handlePostulacionChange={handlePostulacionChange}
                        clearFilters={clearFilters}
                    />

                    <div className="mb-5 relative overflow-x-auto shadow-md sm:rounded-lg">

                        {
                            isLoading
                                ? (
                                    <div className="h-screen flex justify-center items-start">
                                        <Spinner />
                                    </div>
                                ) : (
                                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <HeadTable />

                                        <tbody>

                                            {
                                                filteredPostulantes.map((user) => (
                                                    user.estado === "Asignado a" ? (
                                                        <UserRow
                                                            className="UserRow"
                                                            key={user.id_postulante}
                                                            user={user}
                                                            onClick={() => handleItemClick(user)}
                                                        />
                                                    ) : null

                                                ))

                                            }
                                        </tbody>
                                    </table>


                                )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}
