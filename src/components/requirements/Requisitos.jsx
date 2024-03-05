import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import './Requisitos.css';
import { API } from '../../API';
import Ilustration from './ilustration.png';
import Spinner from '../spinner/Spinner';

const fechaInicio = new Date('2023-01-10');
const fechaFin = new Date('2024-12-31');

export default function Requisitos() {

    const [periodo, setPeriodo] = useState([]);
    const [habilitarPostulacion, setHabilitarPostulacion] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {

      

        const cargarPeriodo = async () => {
            try {
                const response = await fetch(`${API}/api/adminin/periodo`);
                const data = await response.json();

                setPeriodo(data);



            } catch (error) {
                console.error("Hubo un error al obtener los requisitos", error);
            } finally {
                setIsLoading(false);
            }
        }

        cargarPeriodo();


        const fechaActual = new Date();
        if (fechaActual >= fechaInicio && fechaActual <= fechaFin) {
            setHabilitarPostulacion(true);
        }
    }, []);

    function formatearFecha(fecha) {
        const fechaParsed = new Date(fecha);
        const año = fechaParsed.getFullYear();
        const mes = fechaParsed.getMonth() + 1;
        if (año === 2024 && mes < 8) {
            return `${año}-01`;
        } else {
            return fecha;
        }
    }

    return (
        <>
            {/* Utiliza 'min-h-screen' para asegurarte de que el contenedor sea al menos tan alto como la pantalla, pero puede crecer si el contenido es mayor */}
            <div className="min-h-screen flex flex-col">

                <div className="requisitos-title p-4">
                    <h1 id='requisitos-h1'><b>Postulación</b></h1>
                </div>
                <div className='flex justify-center mb-2'>
                    <img src={Ilustration} alt="ilustration"
                        width={300}
                    />
                </div>

                <p className='flex justify-center'>
                    {
                        isLoading ? (<Spinner />) : (

                            periodo.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <b><p>Periodo: {formatearFecha(item.fecha_hasta)}</p></b>
                                    </div>
                                )
                            })

                        )
                    }

                </p>

                <br />

                <div className="flex justify-center">
                    {habilitarPostulacion && <Link to="/postular" className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Postular Ahora</Link>}
                </div>


            </div>
        </>
    );

}
