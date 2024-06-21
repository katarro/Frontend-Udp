export default function Footer() {
  return (
    <footer className="bg-green-900 text-white w-full">
      <div className="mx-auto px-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center md:text-left">
          
          {/* Columna UTEM */}
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">
              UNIVERSIDAD
            </h2>
            <ul>
              
              <li className="mb-2">
                <a href="https://admision.udp.cl/">Admisión</a>
              </li>
              <li className="mb-2">
                <a href="https://vra.udp.cl/">Vicerrectoría Académica</a>
              </li>
              <li className="mb-2">
                <a href="https://estudiosgenerales.udp.cl/">Estudios Generales</a>
              </li>
              <li className="mb-4">
                <a href="https://educacionenlinea.udp.cl/">Educación en Línea</a>
              </li>
              {/* ... otros ítems del menú ... */}
            </ul>
          </div>
          
          {/* Columna COMUNICACIONES */}
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">
              INOFRMACIÓN
            </h2>
            <ul>
              <li className="mb-2">
                <a href="https://www.udp.cl/calendario-academico/">Calendario Académico</a>
              </li>
              <li className="mb-2">
                <a href="https://www.udp.cl/noticias/">Noticias</a>
              </li>
              <li className="mb-2">
                <a href="https://www.udp.cl/agenda-udp/">Agenda</a>
              </li>
              <li className="mb-2">
                <a href="https://debate.udp.cl/">Debate UDP</a>
              </li>
              {/* ... otros ítems del menú ... */}
            </ul>
          </div>
          
          {/* Columna SITIOS DE INTERÉS */}
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">
              SERVICIOS
            </h2>
            <ul>

              <li className="mb-2"><a href="https://www.udp.cl/docentes/concursos-academicos/">Concursos Académicos</a></li>
              <li className="mb-2">
              <a href="https://agendaelectronica.udp.cl/">Agenda Electrónica</a>
              </li>             

              <li className="mb-2">
                <a href="https://www.udp.cl/servicios/accesos-internos/">Accesos internos</a>
              </li>
              <li className="mb-2">
                <a href="https://www.udp.cl/acceso-proveedores/">Acceso proveedores</a>
              </li>
              {/* ... otros ítems del menú ... */}
            </ul>
          </div>

          
        </div>
        <br />
        <hr  />
        <div className="py-6 text-center ">
          <p>
          Av. Ejército 441, Santiago, Chile - Fono: 5622 676 2440<br/>
            Sitio diseñado y desarrollado por la Facultad de Ingenieria y Ciencias - UDP<br/>
          </p>
          <p className="text-sm">
            2024 © UDP - Todos los derechos reservados
          </p>
        </div>
      </div>
      
    </footer>
  );
}
