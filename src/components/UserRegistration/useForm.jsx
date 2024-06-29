//useForm.jsx
import { useState } from 'react';
import { API } from '../../API';

export const useForm = (initialState = {}) => {
  const API_URL = `${API}/api/postular`;


  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      rut: '',
      correo: '',
      estado: 'Postulando a',
      codigoCarrera: '',
      asignatura: '',
    });
  };

  const enviarDatos = async (datosFormulario) => {

    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosFormulario),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en el servidor');
      }

      const result = await response.json();
      limpiarFormulario();
      return result; // Devolver el resultado para su uso posterior si es necesario
    } catch (error) {
      throw error; // Propagar el error para que pueda ser manejado más arriba en la cadena de promesas
    } finally {
      setIsLoading(false);
    }
  };

  const manejarRespuesta = async (response) => {
    try {
      if (response.ok) {
        limpiarFormulario(); // Si tienes una función para limpiar el formulario
      } else {
        // La respuesta del servidor fue un error HTTP
        // mostrarErroresDeRespuesta(data);
      }
    } catch (error) {
      // Hubo un problema procesando la respuesta o lanzando el error
      console.error('Error procesando la respuesta:', error);
      throw error; // Opcional: lanza el error para manejarlo más adelante
    }
  };




  const finalizarEnvio = async () => {
    let id_carrera;
    let id_asignatura;

    if (formData.codigoCarrera === "21041 - Ingeniería Civil Industrial") id_carrera = 1;
    if (formData.codigoCarrera === "21030 - Ingeniería Civil en Informática") id_carrera = 2;
    if (formData.codigoCarrera === "21049 - Ingeniería Civil en Obras Civiles") id_carrera = 3;

    if (formData.asignatura === "Bases de Datos") id_asignatura = 5;
    if (formData.asignatura === "Lenguajes de Programación") id_asignatura = 4;
    if (formData.asignatura === "Estructura de Datos") id_asignatura = 3;
    if (formData.asignatura === "Algoritmos y Programación") id_asignatura = 2;
    if (formData.asignatura === "Introducción a la Ingeniería") id_asignatura = 1;
    if (formData.asignatura === "Sistemas de Información") id_asignatura = 6;
    if (formData.asignatura === "Tìtulo 2") id_asignatura = 22;
    if (formData.asignatura === "Álgebra y Geometría") id_asignatura = 23;
    if (formData.asignatura === "Cálculo I") id_asignatura = 24;
    if (formData.asignatura === "Química") id_asignatura = 25;
    if (formData.asignatura === "Comunicación para la Ingeniería") id_asignatura = 26;
    if (formData.asignatura === "Programación") id_asignatura = 27;
    if (formData.asignatura === "Álgebra Lineal") id_asignatura = 28;
    if (formData.asignatura === "Cálculo II") id_asignatura = 29;
    if (formData.asignatura === "Mecánica") id_asignatura = 30;
    if (formData.asignatura === "Programación Avanzada") id_asignatura = 31;
    if (formData.asignatura === "Ecuaciones Diferenciales") id_asignatura = 32;
    if (formData.asignatura === "Cálculo III") id_asignatura = 33;
    if (formData.asignatura === "Calor y Ondas") id_asignatura = 34;
    if (formData.asignatura === "Estructuras de datos y algoritmos") id_asignatura = 35;
    if (formData.asignatura === "Redes de Datos") id_asignatura = 36;
    if (formData.asignatura === "Electricidad y Magnetismo") id_asignatura = 37;
    if (formData.asignatura === "Inglés I") id_asignatura = 38;
    if (formData.asignatura === "Electrónica y Electrotecnia") id_asignatura = 39;
    if (formData.asignatura === "Bases de Datos") id_asignatura = 40;


    /*
    if (formData.codigoCarrera === "21030 - Ingeniería en Informática") id_carrera = 2;
    if (formData.codigoCarrera === "21049 - Ingeniería Civil en Ciencias de Datos") id_carrera = 3;
    if (formData.codigoCarrera === "21041 - Ingeniería Civil en Computación mención Informática") id_carrera = 1;
    */

    /*
    if (formData.asignatura === "Introducción a la Ingeniería") id_asignatura = 1;
    if (formData.asignatura === "Algoritmos y Programación") id_asignatura = 2;
    if (formData.asignatura === "Estructura de Datos") id_asignatura = 3;

    if (formData.asignatura === "Lenguajes de Programación") id_asignatura = 4;
    if (formData.asignatura === "Bases de Datos") id_asignatura = 5;
    if (formData.asignatura === "Sistemas de Información") id_asignatura = 6;
    */

    try {
      const datosFormulario = {
        nombre: formData.nombre,
        rut: formData.rut,
        correo: formData.correo,
        estado: 'Postulando a',

        fecha_postulacion: new Date().toISOString().split('T')[0],
        fecha_asignacion: null,
        fecha_cambio_estado: null,

        id_carrera: id_carrera,

        id_asignatura: id_asignatura,
        id_profesor: null,
        id_periodo: 1
      };
      const response = await enviarDatos(datosFormulario);
      await manejarRespuesta(response);

    } catch (error) {
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleChangeRut = (e) => {
    let inputValue = e.target.value;
    let rutSinFormato = inputValue.replace(/\./g, '').replace('-', '');
    let cuerpo = rutSinFormato.slice(0, -1);
    let dv = rutSinFormato.slice(-1).toUpperCase();

    const rutFormateado = cuerpo.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + '-' + dv;
    setFormData({ ...formData, rut: rutFormateado });
  };

  const validarRut = (rut) => {
    // Limpiar el RUT y convertir a mayúsculas
    const rutLimpio = rut.replace(/\./g, '').replace('-', '').toUpperCase();
    const cuerpo = rutLimpio.slice(0, -1);
    let dv = rutLimpio.slice(-1); // 'K' ya está en mayúsculas

    // Verifica la longitud mínima del cuerpo
    if (cuerpo.length < 7) {
      return false;
    }

    // Calcula el dígito verificador esperado
    let suma = 0;
    let multiplo = 2;
    for (let i = 1; i <= cuerpo.length; i++) {
      const index = multiplo * parseInt(cuerpo.charAt(cuerpo.length - i), 10);
      suma = suma + index;
      if (multiplo < 7) {
        multiplo += 1;
      } else {
        multiplo = 2;
      }
    }

    let dvEsperado = 11 - (suma % 11);

    // Ajusta los valores especiales para el dígito verificador
    if (dvEsperado === 10) {
      dvEsperado = 'K';
    } else if (dvEsperado === 11) {
      dvEsperado = '0';
    } else {
      dvEsperado = dvEsperado.toString();
    }

    // Compara el dígito verificador calculado con el proporcionado
    return dv === dvEsperado;
  };


  const validarCorreo = (correo) => {
    const regex = /^[^\s@]+@mail\.udp\.cl$/;
    return regex.test(correo);
  };

  return { formData, handleChange, handleChangeRut, isLoading, finalizarEnvio, validarRut, validarCorreo };
};
