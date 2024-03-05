import { useState, useEffect } from 'react';
import { API } from '../../API';

const useProfesores = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState('asc');
    const [profesores, setProfesores] = useState([]);
    const [filteredProfesores, setFilteredProfesores] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarProfesores = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${API}/api/adminin/profesores`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();
                setFilteredProfesores(data);
                setProfesores(data);

            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        cargarProfesores();
    }, []);

    useEffect(() => {

        let results = [...profesores];

        if (searchTerm) {
            results = results.filter(profesor =>
                (profesor.nombre && profesor.nombre.toLowerCase().includes(searchTerm.toLowerCase())) ||
                (profesor.correo && profesor.correo.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }


        results.sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.nombre.localeCompare(b.nombre);
            } else {
                return b.nombre.localeCompare(a.nombre);
            }
        });

        setFilteredProfesores(results);
    }, [profesores, searchTerm, sortOrder]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value === 'Nombre Z-A' ? 'desc' : 'asc');
    };

    const clearFilters = (e) => {
        e.preventDefault();
        setSearchTerm('');
        setSortOrder('asc');
    };

    return {
        filteredProfesores,
        profesores,
        isLoading,
        error,
        handleSortChange,
        handleSearchChange,
        clearFilters,
    };
};

export default useProfesores;
