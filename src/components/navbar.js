import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const ImagesB = require.context('../assets', true);


function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar los datos de sesión almacenados en localStorage
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');

    // Redirigir al usuario a la página de inicio de sesión
    navigate('/', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg nnnn">
      <div className="container-fluid">
        {/* Botón para colapsar el navbar en pantallas pequeñas */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item" id='nav-item'>
              <Link className="nav-link" aria-current="page" to="/admin">Inicio</Link>
            </li>
            <li className="nav-item" id='nav-item'>
              <Link className="nav-link" to="/talleres">Talleres</Link>
            </li>

            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Gestión
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/gestionprofB">Profesionales</Link></li>
                <li><Link className="dropdown-item" to="/gestionFichasAdmin">Fichas</Link></li>
                <li><Link className="dropdown-item" to="/consultar_instru">Instructores</Link></li>
              </ul>
            </li>

            <li className="nav-item" id='nav-item'>
              <Link className="nav-link" to="/permisos">Permisos</Link>
            </li>
          </ul>

          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img className='justify-content-end logou' src={ImagesB('./usuario.png')} alt="Usuario" />
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/perfilAdministrador">Perfil</Link></li>
                <li onClick={handleLogout}><Link className="dropdown-item" to="/cerrarSesion">Cerrar Sesion</Link></li>
              </ul>
            </li>
          </ul>
          <img className='justify-content-end logob' src={ImagesB('./logobienestech.png')} alt="Logo Bienestech" />
        </div>


      </div>
    </nav>


  );
}

export default Navbar;