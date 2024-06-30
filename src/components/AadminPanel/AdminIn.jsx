// AdminIn.jsx
import useAdminin from './useAdminin';
import React from 'react';
import Spinner from '../spinner/Spinner';
import UserRow from './UserRow';
import Filter from './Filter';
import HeadTable from './HeadTable';

export default function AdminIn() {
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

  function estaEnRango(fecha, inicio, fin) {
    const fechaObj = new Date(fecha);
    const fechaInicio = new Date(fechaObj.getFullYear(), inicio.mes - 1, inicio.dia);
    const fechaFin = new Date(fechaObj.getFullYear(), fin.mes - 1, fin.dia);

    return fechaObj >= fechaInicio && fechaObj <= fechaFin;
  }


  return (
    <>
      <div className='container-adminin'>
        <div className='container'>

          <div className="flex justify-center items-center mt-5">
            <h1><b>Lista de Postulantes</b></h1>
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
                  <table className="w-full text-sm text-left rtl:text-right text-gray-900 dark:text-gray-900">
                    <HeadTable />

                    <tbody>

                      {
                        filteredPostulantes.map((user) => {
                          const fechaPostulacion = new Date(user.fecha_postulacion);
                          const hoy = new Date();

                          // Define los rangos de fechas
                          const primerRango = { inicio: { dia: 1, mes: 1 }, fin: { dia: 27, mes: 7 } };
                          const segundoRango = { inicio: { dia: 28, mes: 7 }, fin: { dia: 31, mes: 12 } };

                          // Verifica si hoy y fechaPostulacion están en el mismo rango
                          const enPrimerRango = estaEnRango(hoy, primerRango.inicio, primerRango.fin) && estaEnRango(fechaPostulacion, primerRango.inicio, primerRango.fin);
                          const enSegundoRango = estaEnRango(hoy, segundoRango.inicio, segundoRango.fin) && estaEnRango(fechaPostulacion, segundoRango.inicio, segundoRango.fin);

                          // Renderiza UserRow solo si ambas fechas están en el mismo rango
                          if (enPrimerRango || enSegundoRango) {
                            return (
                              <UserRow
                                className="UserRow"
                                key={user.id_postulante}
                                user={user}
                                onClick={() => handleItemClick(user)}
                              />
                            );
                          } else {
                            return null; // No renderizar si las fechas no están en el mismo rango
                          }
                        })
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
