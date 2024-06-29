//Register.jsx
// import "./Register.css";
import React, { useState } from 'react';
import { useForm } from './useForm';
import Cleave from 'cleave.js/react';
import InputField from './InputField';
import SelectField from './SelectField';
import Spinner from '../spinner/Spinner';
import ConfirmSubmission from './ConfirmSubmission';
import Toasts from './Toasts';
import ToastsError from './ToatsError'

const carreraOptions = [
  { value: "21041 - Ingeniería Civil Industrial", label: "Ingeniería Civil Industrial" },
  { value: "21030 - Ingeniería Civil en Informática", label: "Ingeniería Civil en Informática" },
  { value: "21049 - Ingeniería Civil en Obras Civiles", label: "Ingeniería Civil en Obras Civiles" },
];

const asignaturaOptions = [
  { value: "Álgebra y Geometría", label: "Álgebra y Geometría | Código CBM-1000" },
  { value: "Cálculo I", label: "Cálculo I | Código CBM-1001" },
  { value: "Química", label: "Química | Código CBQ-1000" },
  { value: "Comunicación para la Ingeniería", label: "Comunicación para la Ingeniería | Código FIC-1010" },
  { value: "Programación", label: "Programación | Código CIT-1000" },
  { value: "Álgebra Lineal", label: "Álgebra Lineal | Código CBM-1002" },
  { value: "Cálculo II", label: "Cálculo II | Código CBM-1003" },
  { value: "Mecánica", label: "Mecánica | Código CBF-1000" },
  { value: "Programación Avanzada", label: "Programación Avanzada | Código CIT-1010" },
  { value: "Ecuaciones Diferenciales", label: "Ecuaciones Diferenciales | Código CBM-1005" },
  { value: "Cálculo III", label: "Cálculo III | Código CBM-1006" },
  { value: "Calor y Ondas", label: "Calor y Ondas | Código CBF-1001" },
  { value: "Estructuras de datos y algoritmos", label: "Estructuras de datos y algoritmos | Código CIT-2006" },
  { value: "Redes de Datos", label: "Redes de Datos | Código CIT-2114" },
  { value: "Electricidad y Magnetismo", label: "Electricidad y Magnetismo | Código CBF-1002" },
  { value: "Inglés I", label: "Inglés I | Código CIG-1012" },
  { value: "Electrónica y Electrotecnia", label: "Electrónica y Electrotecnia | Código CIT-2107" },
  { value: "Bases de Datos", label: "Bases de Datos | Código CIT-2007" },
  { value: "Desarrollo Web y Móvil", label: "Desarrollo Web y Móvil | Código CIT-2008" },
  { value: "Probabilidades y Estadística", label: "Probabilidades y Estadística | Código CIT-2204" },
  { value: "Optimización", label: "Optimización | Código CII-2750" },
  { value: "Inglés II", label: "Inglés II | Código CIG-1013" },
  { value: "Proyecto en TICs I", label: "Proyecto en TICs I | Código CIT-2205" },
  { value: "Taller de Redes y Servicios", label: "Taller de Redes y Servicios | Código CIT-2109" },
  { value: "Bases de Datos Avanzadas", label: "Bases de Datos Avanzadas | Código CIT-2009" },
  { value: "Contabilidad y Costos", label: "Contabilidad y Costos | Código CII-1000" },
  { value: "Inglés III", label: "Inglés III | Código CIG-1014" },
  { value: "Arquitectura y Organización de Computadores", label: "Arquitectura y Organización de Computadores | Código CIT-2109" },
  { value: "Señales y Sistemas", label: "Señales y Sistemas | Código CIT-2110" },
  { value: "Sistemas Operativos", label: "Sistemas Operativos | Código CIT-2010" },
  { value: "Comunicaciones Digitales", label: "Comunicaciones Digitales | Código CIT-2111" },
  { value: "Sistemas Distribuidos", label: "Sistemas Distribuidos | Código CIT-2011" },
  { value: "Gestión Organizacional", label: "Gestión Organizacional | Código CIT-2206" },
  { value: "Ingeniería de Software", label: "Ingeniería de Software | Código CIT-2012" },
  { value: "Introducción a la Economía", label: "Introducción a la Economía | Código CII-2100" },
  { value: "Evaluación de Proyectos TIC", label: "Evaluación de Proyectos TIC | Código CIT-2207" },
  { value: "Criptografía y Seguridad en Redes", label: "Criptografía y Seguridad en Redes | Código CIT-2113" },
  { value: "Tecnologías Inalámbricas", label: "Tecnologías Inalámbricas | Código CIT-2112" },
  { value: "Inteligencia Artificial", label: "Inteligencia Artificial | Código CIT-2013" },
  { value: "Arquitecturas Emergentes", label: "Arquitecturas Emergentes | Código CIT-3100" },
  { value: "Data Science", label: "Data Science | Código CIT-3202" },
  { value: "Arquitecturas de Software", label: "Arquitecturas de Software | Código CIT-3000" },
  { value: "Proyecto en TICs II", label: "Proyecto en TICs II | Código CIT-3203" }
];



export default function Register() {
  const initialState = {
    nombre: '',
    rut: '',
    correo: '',
    id_carrera: '',
    codigo_carrera: '',
    asignatura: '',
  };



  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showError, setShowError] = useState(false);

  const { formData, handleChange, handleChangeRut, isLoading, finalizarEnvio, validarRut, validarCorreo } = useForm(initialState);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarRut(formData.rut)) {
      alert('RUT inválido: Por favor, ingresa un RUT válido con el formato xx.xxx.xxx-x');
      return;
    }
    if (!validarCorreo(formData.correo)) {
      alert('Correo inválido: Por favor, ingresa un correo UDP con el formato xxx@udp.cl');
      return;
    }
    setIsConfirmationModalOpen(true);
  };

  const handleConfirm = () => {

    finalizarEnvio()
      .then(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      })
      .catch((error) => {
        console.error('Error durante la postulación:', error);
        setShowError(true);

      })
      .finally(() => {
        setIsConfirmationModalOpen(false);
      });
  };

  const handleCancel = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handleCloseToatError = () => {
    setShowError(false);
  }




  return (
    <>

      {showToast && <Toasts show={showToast} onClose={handleCloseToast} />}
      {showError && <ToastsError show={showError} onClose={handleCloseToatError} />}



      {isConfirmationModalOpen && (
        <ConfirmSubmission
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
        />
      )}

      {isLoading && (
        <div className="fixed inset-0 z-50 flex justify-center items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <Spinner />
        </div>
      )}
      <div className='flex justify-center items-center h-screen bg-gray-50'>
        <div className=" max-w-2xl p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <h5 className="text-xl font-medium text-gray-900">
              Postulación
            </h5>

            <InputField label="Nombre Completo" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />

            <div className="mb-3">
              <label htmlFor="rut" className="block mb-2 text-sm font-medium text-gray-900">
                RUT
              </label>
              <Cleave
                options={{
                  blocks: [2, 3, 3, 1],
                  delimiters: ['.', '.', '-'],
                  numericOnly: false,
                }}
                onChange={handleChangeRut}
                value={formData.rut}
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <InputField label="Correo udp" id="correo" name="correo" type="email" value={formData.correo} onChange={handleChange} />
            <SelectField label="Carrera del Alumno" id="codigoCarrera" name="codigoCarrera" value={formData.codigoCarrera} onChange={handleChange} options={carreraOptions} />
            <SelectField label="Asignatura a la que Postula" id="asignatura" name="asignatura" value={formData.asignatura} onChange={handleChange} options={asignaturaOptions} />

            <button
              type="submit"
              className="w-full px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Enviar
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
