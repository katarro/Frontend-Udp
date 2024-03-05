//DetailApplicationProfessor.jsx
import React from 'react';
import { CardDetail } from './CardDetail';
import { API } from '../../API';
import { useNavigate } from 'react-router-dom';
import useCardDetail from './useCardDetail';

export default function DetailApplicationProfessor() {

    const navigate = useNavigate();
    const {
        formatearFecha,
        seleccionarPostulante,
        postulante,
        formatRut,
        setPostulante,
        profesores,
        isLoading,
        
    } = useCardDetail();

    const tokenProfesor = localStorage.getItem('tokenProfesor')

    const handleAccept = () => { seleccionarPostulante('Evaluado Positivamente'); };
    const handleReject = () => { seleccionarPostulante('Evaluado Negativamente'); };


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
        navigate('/profesor');

    };


    if (!postulante) { return <div>No se encontró el postulante.</div>; }

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



    return (
        <>
            <CardDetail
                postulante={postulante}
                profesores={profesores}
                formatRut={formatRut}
                carreras={carreras}
                asignaturas={asignaturas}
                formatearFecha={formatearFecha}
                tokenProfesor={tokenProfesor}
                handleAccept={handleAccept}
                handleReject={handleReject}
                actualizarEstadoPostulante={actualizarEstadoPostulante}
                actualizarDatosPostulante={actualizarDatosPostulante}
                seleccionarPostulante={seleccionarPostulante}
                isLoading={isLoading}
            />
        </>

    );
}




