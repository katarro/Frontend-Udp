//PostulanteDetails.jsx
import React from 'react';
import { CardDetail } from './CardDetail';
import useCardDetail from './useCardDetail';
import { API } from '../../API';

export default function PostulanteDetails() {

  const { formatearFecha, seleccionarPostulante, postulante, formatRut, setPostulante, profesores, isLoading } = useCardDetail();

  const tokenAdmin = localStorage.getItem('tokenAdmin')

  const handleAccept = () => { seleccionarPostulante('Asignado a'); };
  const handleReject = () => { seleccionarPostulante('Postulando a'); };

  const actualizarEstadoPostulante = (nuevoEstado, fechaCambioEstado, profesorId, fechaAsignacion) => {
    setPostulante((prevState) => (
      {
        ...prevState,
        estado: nuevoEstado,
        id_profesor: profesorId,
        fecha_cambio_estado: fechaCambioEstado,
        fecha_asignacion: fechaAsignacion

      }));
  };

  const actualizarDatosPostulante = async () => {
    const response = await fetch(`${API}/api/adminin/${postulante.rut}`);
    const datosActualizados = await response.json();
    setPostulante(datosActualizados);
    
  };


  if (!postulante) { return <div>No se encontró el postulante.</div>; }


  const carreras = [
    { id: 1, nombre: 'Ingeniería Civil Industrial	' },
    { id: 2, nombre: 'Ingeniería Civil Informática y Telecomunicaciones	' },
    { id: 3, nombre: 'Ingeniería Civil en Obras Civiles	' },
  ];
  
  

  const asignaturas = [
    { id: 1, nombre: 'Introducción a la Ingeniería' },
    { id: 2, nombre: 'Algoritmos y Programación' },
    { id: 3, nombre: 'Estructura de Datos' },
    { id: 4, nombre: 'Lenguajes de Programación' },
    { id: 5, nombre: 'Bases de Datos' },
    { id: 6, nombre: 'Sistemas de Información' },
    { id: 22, nombre: 'Tìtulo 2' },
    { id: 23, nombre: 'Álgebra y Geometría' },
    { id: 24, nombre: 'Cálculo I' },
    { id: 25, nombre: 'Química' },
    { id: 26, nombre: 'Comunicación para la Ingeniería' },
    { id: 27, nombre: 'Programación' },
    { id: 28, nombre: 'Álgebra Lineal' },
    { id: 29, nombre: 'Cálculo II' },
    { id: 30, nombre: 'Mecánica' },
    { id: 31, nombre: 'Programación Avanzada' },
    { id: 32, nombre: 'Ecuaciones Diferenciales' },
    { id: 33, nombre: 'Cálculo III' },
    { id: 34, nombre: 'Calor y Ondas' },
    { id: 35, nombre: 'Estructuras de datos y algoritmos' },
    { id: 36, nombre: 'Redes de Datos' },
    { id: 37, nombre: 'Electricidad y Magnetismo' },
    { id: 38, nombre: 'Inglés I' },
    { id: 39, nombre: 'Electrónica y Electrotecnia' },
    { id: 40, nombre: 'Bases de Datos' } // Puedes eliminar o cambiar el id para evitar duplicados
  ];




  return (
    <>
      <CardDetail
        postulante={postulante}
        profesores={profesores}
        formatRut={formatRut}
        carreras={carreras}
        asignaturas={asignaturas}
        formatearFecha={formatearFecha}
        tokenAdmin={tokenAdmin}
        handleAccept={handleAccept}
        handleReject={handleReject}
        actualizarEstadoPostulante={actualizarEstadoPostulante}
        actualizarDatosPostulante={actualizarDatosPostulante}
        isLoading={isLoading}
      />
    </>

  );
}

