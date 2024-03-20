//useCardDetail.jsx
import { useState, useEffect } from 'react';
import { API } from '../../API';
import { useLocation, useNavigate } from 'react-router-dom';

export default function useCardDetail() {
    const API_URL = `${API}/api/adminin/seleccionar`;

    const location = useLocation();
    const navigate = useNavigate();

    const [postulante, setPostulante] = useState(location.state?.postulante);
    const [observacion, setObservacion] = useState('');
    const [profesores, setProfesores] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchProfesores = async () => {
            // Obtén la lista de profesores de tu API
            const response = await fetch(`${API}/api/adminin/profesores`);
            const data = await response.json();
            setProfesores(data);
        };

        fetchProfesores();
    }, []);



    function formatRut(rut) {
        const cleanRut = rut.replace(/[^0-9kK]/g, '');
        const body = cleanRut.slice(0, -1);
        const dv = cleanRut.slice(-1).toUpperCase();
        const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `${formattedBody}-${dv}`;
    }


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

    const seleccionarPostulante = async (estado) => {

        setIsLoading(true);
        try {
            const id_postulante = postulante.id_postulante;

            const response = await fetch(API_URL, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ estado, id_postulante }),
            });

            if (response.ok) {

                setPostulante(prevPostulante => ({
                    ...prevPostulante,
                    estado,
                }));
                setObservacion('');
                navigate('/profesor')
                
            } else {
                throw new Error('No se pudo actualizar el estado de la postulación');
            }
        } catch (error) {
            console.error('Error al realizar la petición:', error);
            alert(`Error en la postulación: ` + error.message);
        } finally {
            setIsLoading(false);
        }
    };


    return { isLoading, formatearFecha, seleccionarPostulante, postulante, observacion, setObservacion, formatRut, setPostulante, profesores }
}