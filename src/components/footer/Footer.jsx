export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white w-full">
      <div className="mx-auto px-4 py-6 lg:py-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-center md:text-left">
          
          {/* Columna UTEM */}
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">
              UTEM:
            </h2>
            <ul>
              <li className="mb-2">
                <a href="http://www.utem.cl" target="_blank" rel="noopener" className="hover:underline">
                  Universidad Tecnológica Metropolitana
                </a>
              </li>
              <li className="mb-2">
                <a href="https://acreditacion.utem.cl/" target="_blank" rel="noopener" className="hover:underline">
                  Acreditación UTEM
                </a>
              </li>
              <li className="mb-2">
                <a href="https://sige.utem.cl/" target="_blank" rel="noopener" className="hover:underline">
                  SIGUE UTEM
                </a>
              </li>
              <li className="mb-4">
                <a href="http://www.utemvirtual.cl/portal/" target="_blank" rel="noopener" className="hover:underline">
                  UTEMVirtual
                </a>
              </li>
              {/* ... otros ítems del menú ... */}
            </ul>
          </div>
          
          {/* Columna COMUNICACIONES */}
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">
              COMUNICACIONES:
            </h2>
            <ul>
              <li className="mb-2">
                <a href="https://www.utem.cl/comunicaciones/" className="hover:underline">
                  Presentación
                </a>
              </li>
              <li className="mb-2">
                <a href="http://noticias.utem.cl/" className="hover:underline">
                  Noticias
                </a>
              </li>
              <li className="mb-2">
                <a href="https://utem.tv/" className="hover:underline">
                  Utem-Tv
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.utem.cl/comunicaciones/procedimiento-solicitudes/" className="hover:underline">
                  Procedimiento Solicitudes
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.utem.cl/comunicaciones/solicitud-en-linea/" className="hover:underline">
                  Solicitud en línea
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.utem.cl/comunicaciones/voceros-utem/" className="hover:underline">
                  Voceros UTEM
                </a>
              </li>
              {/* ... otros ítems del menú ... */}
            </ul>
          </div>
          
          {/* Columna SITIOS DE INTERÉS */}
          <div>
            <h2 className="mb-6 text-sm font-semibold uppercase">
              SITIOS DE INTERÉS:
            </h2>
            <ul>
              <li className="mb-2">
                <a href="http://uestatales.cl/cue/" target="_blank" rel="noopener" className="hover:underline">
                  CUECH
                </a>
              </li>
              <li className="mb-2">
                <a href="http://www.consejoderectores.cl/web/" target="_blank" rel="noopener" className="hover:underline">
                  CRUCH
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.cnachile.cl/Paginas/Inicio.aspx" target="_blank" rel="noopener" className="hover:underline">
                  GNA
                </a>
              </li>
              <li className="mb-4">
                <a href="http://www.gratuidad.cl/" target="_blank" rel="noopener" className="hover:underline">
                  Gratuidad
                </a>
              </li>
              {/* ... otros ítems del menú ... */}
            </ul>
          </div>

          
        </div>
        <br />
        <hr  />
        <div className="py-6 text-center ">
          <p>
            Dieciocho 161 - Santiago, Chile. Metro Moneda - Fono: 2787 7500<br/>
            Sitio diseñado y desarrollado por la Escuela de Ingenieria - UTEM<br/>
          </p>
          <p className="text-sm">
            2024 © UTEM - Todos los derechos reservados
          </p>
        </div>
      </div>
      
    </footer>
  );
}
