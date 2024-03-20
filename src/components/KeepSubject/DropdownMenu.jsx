import React, { useState, useRef, useEffect } from 'react';

function useOutsideClick(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}

export default function DropdownMenu({ options }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideClick(wrapperRef, () => setIsOpen(false));

  return (
    <div ref={wrapperRef} className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <span className="sr-only">Menu opciones</span>
          {/* Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 512" width="15" height="15">
            <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z" />
          </svg>

        </button>
      </div>

      {isOpen && (
        <div
          className=" z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >

          <div className="py-1" role="none">
            {options.map((option, index) => (
              <button
                key={index}
                className="text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
                role="menuitem"
                tabIndex="-1"
                onClick={() => {
                  option.action && option.action(); // Ejecuta la acción si está definida
                  setIsOpen(false); // Cierra el menú después de la acción
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
