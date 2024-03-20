// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ImagenHome from './media/home-foto.jpg'
import Information from '../AppInformation/Information';

//eslint-disable-next-line no-lone-blocks

export default function Home() {
  return (
    <>

      <div className="h-screen relative bg-white overflow-hidden">
        <img className="absolute inset-0 h-full w-full object-cover" src={ImagenHome} alt="Descripción" />

        <div className="relative z-10 bg-black bg-opacity-50 h-screen w-full flex items-center justify-center">
            <div className="px-4 py-8 sm:px-6 md:px-8 lg:px-12 text-center -mt-20 mb-20">
              <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                POSTULACIÓN PARA AYUDANTÍAS DE LA ESCUELA DE INFORMÁTICA
              </h1>
              <p className="mt-4 sm:mt-6 md:mt-8 text-xl sm:text-2xl md:text-3xl text-white">
                ¿Deseas ser ayudante?
              </p>
              <div className="mt-6 sm:mt-8 md:mt-10">
                <Link to="/requisitos">
                  <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Postular
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>


      <Information />
    </>
  );
}

