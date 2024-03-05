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
export default function PostulanteProfesor() {

  const {
    handleItemClick,
    isLoading,
  } = useProfesor();

  const [profesores, setProfesores] = useState([]);
  const [ayudantes, setAyudantes] = useState([]);
  const [originalAyudantes, setOriginalAyudantes] = useState([]); // Aquí se define el estado para almacenar todos los ayudantes


  const handleSearchChange = (event) => {

    const term = event.target.value;
    const filtered = originalAyudantes.filter(postulante =>
        postulante.nombre.toLowerCase().includes(term.toLowerCase()) ||
        postulante.rut.toLowerCase().includes(term.toLowerCase())
    );
    setAyudantes(filtered);

};


  useEffect(() => {
    const obtenerProfesores = async () => {
      const respuesta = await fetch(`${API}/api/adminin/profesores`);
      const datosProfesores = await respuesta.json();
      setProfesores(datosProfesores);
    };

    obtenerProfesores();
  }, []);

  useEffect(() => {
    const obtenerPostulaciones = async () => {

      const profesorId = localStorage.getItem('idProfesor');

      try {
        const respuesta = await fetch(`${API}/api/profesor/${profesorId}`);
        const datosPostulaciones = await respuesta.json();
        setOriginalAyudantes(datosPostulaciones);
        setAyudantes(datosPostulaciones);
      } catch (error) {
        console.error('Error al obtener las postulaciones:', error);
      }

    };

    obtenerPostulaciones();
  }, []);


  return (

    <>
      <div className="container-adminin">
        <div className='container'>

          <div className="mt-4 flex justify-center">
            {profesores.find(profesor => profesor.correo === localStorage.getItem('emailProfesor')) ? (
              <h1 className="text-2xl font-bold">Bienvenido Profesor {
                profesores.find(profesor => profesor.correo === localStorage.getItem('emailProfesor')).nombre
              }</h1>
            ) : (
              <h1 className="text-2xl font-bold">Profesor no identificado</h1>
            )}
          </div>


          <Filter
            handleSearchChange={handleSearchChange}
          // handleSortChange={handleSortChange}
          />



          <div className="mb-5 relative overflow-x-auto shadow-md sm:rounded-lg">

            {
              isLoading ? (
                <div className="h-screen flex justify-center items-start">
                  <Spinner />
                </div>
              ) : (
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <HeadTable />
                  <tbody>
                    {ayudantes.length === 0 ? (
                      <tr>
                        <td colSpan="100%" className="text-center py-3">No tienes ayudantes designados</td>
                      </tr>
                    ) : (
                      ayudantes.map((user) => (
                        <UserRow
                          className="UserRow"
                          key={user.id_postulante}
                          user={user}
                          onClick={() => handleItemClick(user)}
                        />
                      ))
                    )}
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
