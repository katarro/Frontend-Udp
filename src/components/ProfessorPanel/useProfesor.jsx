import React from 'react';
import useAdminin from '../AadminPanel/useAdminin';
import { useNavigate } from 'react-router-dom';


export default function useProfesor() {
    const {
        postulantes,
        filteredPostulantes,
        searchTerm,
        isLoading,
        setSearchTerm,
        setSortOrder,
        setFilterAsignatura,
        setNotaRange,
        setFilteredPostulantes
    } = useAdminin();
    const navigate = useNavigate();
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleItemClick = (item) => {
        navigate(`/profesor/${item.rut}`, { state: { postulante: item } });
    };

    const handleClearFilters = () => {
        setSearchTerm('');
        setSortOrder('asc');
        setFilterAsignatura('');
        setNotaRange({ min: 1.0, max: 7.0 });
    };

    const filterByApproval = (approved) => {
        const results = postulantes.filter(postulante => postulante.estado === (approved ? 'Aprobado' : 'Rechazado'));
        setFilteredPostulantes(results);
    };

    function formatRut(rut) {
        // Elimina cualquier carácter que no sea dígito o 'k'
        const cleanRut = rut.replace(/[^0-9kK]/g, '');

        // Separa el dígito verificador del resto del RUT
        const body = cleanRut.slice(0, -1);
        const dv = cleanRut.slice(-1).toUpperCase();

        // Formatea el cuerpo del RUT con puntos
        const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

        // Retorna el RUT formateado
        return `${formattedBody}-${dv}`;
    }

    function codigoToCarrera(codigo) {
        const carreras = {
            21030: "Ingeniería en Informática",
            21041: "Ingeniería Civil en Computación mención Informática",
            21049: "Ciencia de Datos"
        };

        return carreras[codigo];
    }




    return { handleSearchChange, handleItemClick, handleClearFilters, filterByApproval, formatRut, codigoToCarrera, isLoading, filteredPostulantes, searchTerm };
}