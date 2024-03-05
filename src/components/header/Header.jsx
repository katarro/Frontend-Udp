import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { Navbar, Nav, Offcanvas, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useGenerarPdf } from './useGenerarPdf';
import { XIcon, MenuIcon } from '@heroicons/react/solid'; // Asumiendo que estás usando Heroicons

function Header() {

  const [generarPDF] = useGenerarPdf()


  const tokenProfesor = localStorage.getItem('tokenProfesor');
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeSesion = () => {

    tokenAdmin ? (
      localStorage.removeItem('tokenAdmin')
    ) : (
      localStorage.removeItem('tokenProfesor')
    )
    handleClose();
    navigate('/');
  }

  return (

    <Navbar bg="" variant="" fixed="" expand="lg" className='navbar'>

      <Navbar.Brand href="/"></Navbar.Brand>

      <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none invisible" onClick={handleShow} />
      <button onClick={handleShow} className="d-lg-none text-white ">
        <MenuIcon className="h-10 w-10 mr-7" />
      </button>
      <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
        <div className="logo"></div>
        <Nav className="ms-auto">


          <Nav.Link as={Link} to="/" onClick={handleClose} className="menu-link">Inicio</Nav.Link>

          {!tokenAdmin && !tokenProfesor ? (
            <Nav.Link as={Link} to="/requisitos" onClick={handleClose} className="menu-link">Postular</Nav.Link>
          ) : (<></>)}


          {!tokenAdmin && !tokenProfesor ? (
            <Nav.Link as={Link} to="/estado" onClick={handleClose} className="menu-link">Ver Estado</Nav.Link>
          ) : (<></>)}

          {tokenAdmin ? (
            <Dropdown>
              <Dropdown.Toggle as={Nav.Link} variant="" id="dropdown-profesor" className="menu-link">
                Administrador
              </Dropdown.Toggle>

              <Dropdown.Menu>

                <Dropdown.Item as={Link} to="/admin">Ver Lista de Postulantes</Dropdown.Item>
                <Dropdown.Item as={Link} to="/admin/lista-profesores">Ver Lista de Profesores</Dropdown.Item>
                <Dropdown.Item as={Link} to="/admin/ayudantes">Ver Lista de Ayudantes</Dropdown.Item>
                <Dropdown.Item as={Link} to="/admin/registrar-profesor">Registrar Profesor</Dropdown.Item>
                <Dropdown.Item as={Link} to="/requisitos-admin">Requisitos</Dropdown.Item>
                <Dropdown.Item onClick={generarPDF}>Generar PDF</Dropdown.Item>

              </Dropdown.Menu>

            </Dropdown>) : <></>}

          {tokenProfesor ? (
            <Nav.Link as={Link} to="/profesor" onClick={handleClose} className="menu-link">Profesor</Nav.Link>
          ) : <></>}




          {!tokenAdmin && !tokenProfesor ? (
            <Nav.Link as={Link} to="/login" onClick={handleClose} className="menu-link">Ingresar</Nav.Link>
          ) : (null)}
          {tokenProfesor || tokenAdmin ? (
            <Dropdown>
              <Dropdown.Toggle as={Nav.Link} variant="" id="dropdown-profesor" className="menu-link">
                Perfil
              </Dropdown.Toggle>

              <Dropdown.Menu style={{ left: 'calc(100% - 2px)', transform: 'translateX(-100%)' }}>
                <Dropdown.Item as={Link} to="/cambiar-contrasena">Cambiar contraseña</Dropdown.Item>
                <Dropdown.Item onClick={closeSesion}>Salir</Dropdown.Item>
                {/* <Dropdown.Item onClick={generarPDF}>Generar PDF</Dropdown.Item> */}
              </Dropdown.Menu>
            </Dropdown>

          ) : <></>}


        </Nav>
      </Navbar.Collapse>

      {/* MENU PARA MOBILE */}

      <Offcanvas show={show} onHide={handleClose} placement="end" className="d-lg-none" style={{ width: '60%' }}>

        <Offcanvas.Header >
          <Offcanvas.Title>Menú</Offcanvas.Title>
          <button type="button" onClick={handleClose} className="text-black">
            <XIcon className="h-6 w-6" /> {/* Ajusta el tamaño según necesites */}
          </button>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose}>Inicio</Nav.Link>

            {
              !tokenAdmin && !tokenProfesor ? (
                <Nav.Link as={Link} to="/requisitos" onClick={handleClose}>Postular</Nav.Link>
              ) : (null
              )
            }

            {!tokenAdmin && !tokenProfesor ? (
              <Nav.Link as={Link} to="/estado" onClick={handleClose}>Ver Estado</Nav.Link>
            ) : null}

            {!tokenAdmin && !tokenProfesor ?
              (<Nav.Link as={Link} to="/login" onClick={handleClose} >Ingresar</Nav.Link>
              ) :
              (null)}
          </Nav>

          {tokenAdmin && (
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/admin" onClick={handleClose}>Ver Lista de Postulantes</Nav.Link>
              <Nav.Link as={Link} to="/admin/lista-profesores" onClick={handleClose}>Ver Lista de Profesores</Nav.Link>
              <Nav.Link as={Link} to="/admin/ayudantes" onClick={handleClose}>Ver Lista de Ayudantes</Nav.Link>
              <Nav.Link as={Link} to="/admin/registrar-profesor" onClick={handleClose}>Registrar Profesor</Nav.Link>
              <Nav.Link as={Link} to="/requisitos-admin" onClick={handleClose}>Requisitos</Nav.Link>
              <Nav.Link onClick={() => { generarPDF(); handleClose(); }}>Generar PDF</Nav.Link>
              <Nav.Link as={Link} to="/cambiar-contrasena" onClick={handleClose}>Cambiar Contraseña</Nav.Link>
              <Nav.Link onClick={closeSesion}>Salir</Nav.Link>


            </Nav>
          )}

          {/* Enlace para Profesor */}
          {
            tokenProfesor && (
              <Nav className='flex-colum'>
                <Nav.Link as={Link} to="/cambiar-contrasena" onClick={handleClose}>Cambiar Contraseña</Nav.Link>
                <Nav.Link onClick={closeSesion}>Salir</Nav.Link>

              </Nav>
            )
          }

        </Offcanvas.Body>



      </Offcanvas>
    </Navbar>
  );
}

export default Header;

