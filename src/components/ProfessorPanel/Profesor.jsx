import React, { useEffect, useState } from 'react';
import '../admin/Admin.css'; // Asegúrate de importar tu archivo CSS
import useProfesor from './useProfesor';
import Filter from '../ListaProfesores/Filter';
import HeadTable from '../AadminPanel/HeadTable';
import Spinner from '../spinner/Spinner';
import UserRow from './UserRow';
import { API } from '../../API';
/*

El Profesor solo visualiza los alumnos que esten asociados a él.

*/
export default function Profesor() {

  const { handleSearchChange, handleItemClick, handleClearFilters, filterByApproval, formatRut, codigoToCarrera, isLoading, filteredPostulantes, searchTerm } = useProfesor();

  const [profesores, setProfesores] = useState("");

  useEffect(() => {

    const getNameProfesor = async () => {
      const data = await fetch(`${API}/api/adminin/profesores`)
      const profesor = await data.json();
      setProfesores(profesor[0].nombre);

    }

    getNameProfesor();
  }, [])

  return (

    <>
      <div className="container-adminin">
        <div className='container'>

          <div className="mt-4 flex justify-center container-h1">
            <b> <h1>{profesores}</h1></b>
          </div>

          <Filter
          /* handleSearchChange={handleSearchChange}
          handleSortChange={handleSortChange}
          handleEstadoChange={handleEstadoChange}
          handleSortChangePromedio={handleSortChangePromedio}
          handleCarreraChange={handleCarreraChange}
          handlePostulacionChange={handlePostulacionChange}
          clearFilters={clearFilters} */
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
                          <UserRow
                            className="UserRow"
                            key={user.id_postulante}
                            user={user}
                            onClick={() => handleItemClick(user)}
                          />
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
