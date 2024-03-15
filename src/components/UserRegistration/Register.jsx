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
  { value: "21030 - Ingeniería en Informática", label: "21030 - Ingeniería en Informática" },
  { value: "21041 - Ingeniería Civil en Computación mención Informática", label: "21041 - Ingeniería Civil en Computación mención Informática" },
  { value: "21049 - Ingeniería Civil en Ciencias de Datos", label: "21049 - Ingeniería Civil en Ciencias de Datos" },
];

const asignaturaOptions = [
  { value: "Introducción a la Ingeniería", label: "Introducción a la Ingeniería" },
  { value: "Algoritmos y Programación", label: "Algoritmos y Programación" },
  { value: "Estructura de Datos", label: "Estructura de Datos" },
  { value: "Lenguajes de Programación", label: "Lenguajes de Programación" },
  { value: "Bases de Datos", label: "Bases de Datos" },
  { value: "Sistemas de Información", label: "Sistemas de Información" },
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
      alert('Correo inválido: Por favor, ingresa un correo UTEM con el formato xxx@utem.cl');
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

  const handleCloseToatError = () =>{
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

            <InputField label="Correo UTEM" id="correo" name="correo" type="email" value={formData.correo} onChange={handleChange} />
            <SelectField label="Código de Carrera del Alumno" id="codigoCarrera" name="codigoCarrera" value={formData.codigoCarrera} onChange={handleChange} options={carreraOptions} />
            <SelectField label="Asignatura a la Que Postula" id="asignatura" name="asignatura" value={formData.asignatura} onChange={handleChange} options={asignaturaOptions} />

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
