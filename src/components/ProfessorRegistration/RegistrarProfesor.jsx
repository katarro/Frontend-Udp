import React, { useState } from 'react';
import { API } from '../../API'
import InputField from '../UserRegistration/InputField';
import Spinner from '../spinner/Spinner';
import Toasts from '../UserRegistration/Toasts';
export default function RegistrarProfesor() {
    const API_URL = `${API}/api/register-profesor`;
    const initialState = {
        nombre: '',
        correo: '',
    };
    const [formData, setFormData] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);
    const [showToast, setShowToat] = useState(false);

    const validarFormulario = () => {
        if (!formData.nombre || !formData.correo) {
            alert('Por favor, completa todos los campos.');
            return false;
        }

        const regexCorreoUtem = /@utem\.cl$/i;

        if (!regexCorreoUtem.test(formData.correo)) {
            alert('El correo debe ser @utem.cl');
            return false;
        }
        return true;
    };

    const handleCloseToast = () => {
        setShowToat(false);
    }


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        setIsLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setFormData(initialState);

            } else {
                alert('Error al registrar el profesor');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
        finally {
            setIsLoading(false);
            setShowToat(true);
        }
    };

    return (
        <>
            {showToast && <Toasts show={showToast} onClose={handleCloseToast} />}

            {isLoading && (
                <div className="fixed inset-0 z-50 flex justify-center items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <Spinner />
                </div>
            )}
            <div className='flex justify-center items-center h-screen bg-gray-50'>
                <div className="w-full max-w-2xl p-4 mx-auto bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <h5 className="text-xl font-medium text-gray-900">
                            Registrar Profesor
                        </h5>

                        <InputField label="Nombre Completo" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />

                        <InputField label="Correo UTEM" id="correo" name="correo" value={formData.correo} onChange={handleChange} />


                        <div className='mt-6 pt-4 flex justify-end items-end'>

                            <button
                                type="submit"
                                className=" px-5 py-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

