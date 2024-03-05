// useAdminin.jsx
import { API } from '../../API';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAdminin = () => {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [postulantes, setPostulantes] = useState([]);
  const [filterEstado, setFilterEstado] = useState('');
  const [filterCarrera, setFilterCarrera] = useState('');
  const [filterAsignatura, setFilterAsignatura] = useState('');
  const [filterPostulacion, setFilterPostulacion] = useState('');
  const [filteredPostulantes, setFilteredPostulantes] = useState([]);



  useEffect(() => {
    const cargarPostulantes = async () => {
      try {
        const response = await fetch(`${API}/api/adminin`);
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los datos');
        }
        const data = await response.json();
        const dataOrdenada = data.sort((a, b) => new Date(a.fecha_postulacion) - new Date(b.fecha_postulacion));

        setPostulantes(dataOrdenada);
        setFilteredPostulantes(dataOrdenada);
      } catch (error) {
        console.error('Error al cargar los postulantes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    cargarPostulantes();
  }, []);


  useEffect(() => {
    let results = [...postulantes];

    if (searchTerm) {
      results = results.filter(postulante =>
        postulante && (

          postulante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          postulante.rut.includes(searchTerm)
        )
      );
    }

    if (filterAsignatura) {
      results = results.filter(postulante =>
        postulante.asignatura === filterAsignatura
      );
    }



    // Filtro por estado
    if (filterEstado) {
      results = results.filter(postulante => postulante.estado === filterEstado);
    }

    // Filtro por carrera
    if (filterCarrera) {
      results = results.filter(postulante => postulante.id_carrera === filterCarrera);
    }

    // Filtro por postulación
    if (filterPostulacion) {
      results = results.filter(postulante => postulante.id_asignatura === filterPostulacion);
    }

    if (sortOrder === 'fecha_asc') {
      results.sort((a, b) => new Date(a.fecha_postulacion) - new Date(b.fecha_postulacion));
    } else if (sortOrder === 'fecha_desc') {
      results.sort((a, b) => new Date(b.fecha_postulacion) - new Date(a.fecha_postulacion));
    }


    setFilteredPostulantes(results);
  }, [postulantes, searchTerm, sortOrder, filterAsignatura, filterEstado, filterCarrera, filterPostulacion]);


  const handleSortChange = (e) => {
    console.log(e.target.value);
    setSortOrder(e.target.value === 'Nombre Z-A' ? 'desc' : 'asc');
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = (item) => {
    navigate(`/adminin/${item.rut}`, { state: { postulante: item } });
  };

  const handleSortChangePromedio = (e) => {
    setSortOrder(e.target.value); // 'desc' para Mayor a menor, 'asc' para Menor a mayor
  };

  const handleEstadoChange = (e) => {
    setFilterEstado(e.target.value);
  };
  const handleCarreraChange = (e) => {
    const carrera = parseInt(e.target.value);
    setFilterCarrera(carrera);
  };

  const handlePostulacionChange = (e) => {
    const asignatura = parseInt(e.target.value);
    console.log(asignatura);
    setFilterPostulacion(asignatura);
  };

  const clearFilters = (e) => {
    e.preventDefault();
    setSearchTerm('');
    setSortOrder('asc');
    setFilterAsignatura('');
    setFilterEstado('');
    setFilterCarrera('');
    setFilterPostulacion('');
  }


  return {
    filteredPostulantes,
    isLoading,
    setIsLoading,
    setSearchTerm,
    handleSortChange,
    handleSearchChange,
    handleEstadoChange,
    handleSortChangePromedio,
    handleCarreraChange,
    handlePostulacionChange,
    clearFilters,
    handleItemClick,
    postulantes,
    setFilteredPostulantes,
    setSortOrder,
    sortOrder
  };
};

export default useAdminin;
