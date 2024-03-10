import React from 'react';
import './Information.css';
import CardComponent from './CardComponent'; // Asume que CardComponent está en el mismo directorio
import foto1 from '../media/foto1.jpg';
import foto2 from '../media/foto2.jpg';
import foto3 from '../media/foto3.jpg';

const cardData = [
  {
    to: "/requisitos",
    icon: foto1,
    title: "Postulación de Ayudantías",
    content: "¿Eres bueno programando? ",
    content2: "¡Postula a la ayudantia que mejor domines!"
  },
  {
    to: "/login",
    icon: foto3,
    title: "Profesores",
    content: "¿Quieres conocer quiénes son tus ayudantes?"
  },
  {
    to: "/estado",
    icon: foto2,
    title: "Estado de tu postulación",
    content: "¿Quieres conocer el estado de tu proceso?",
    content2: "¡Ingresa aqui!"
  },

];

export default function Information() {
  return (
    <div className="pb-5 pt-9 mx-auto max-w-7xl">
      <div className="text-center pt-5 pb-4">
        <h1 className="text-3xl font-bold sm:text-3xl md:text-4xl">SECCIÓN DE INFORMACIÓN</h1>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {cardData.map((card, index) => (
          <div key={index}>
            <CardComponent {...card} />
          </div>))}
      </div>
    </div>

  );
}
