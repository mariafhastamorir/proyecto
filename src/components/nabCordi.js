import React, { useEffect }from "react";
import { Link, useNavigate } from 'react-router-dom';

const ImagesB = require.context('../assets', true);


const NavCoordi = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar los datos de sesión almacenados en localStorage
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');

        // Redirigir al usuario a la página de inicio de sesión
        navigate('/', { replace: true });
    };


    return (
        <div>
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
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link to="/coordinador" className="nav-link">Gestión fichas</Link>
            </li>
            <li className="nav-item">
                <Link to="/gestionInstructores" className="nav-link">Gestión instructores</Link>
            </li>
        </ul>

          <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
          <li className="nav-item dropdown">
            <Link 
              className="nav-link dropdown-toggle" 
              data-bs-toggle="dropdown" 
              aria-expanded="false"
            >
              <img className='justify-content-end logouc' src={ImagesB('./usuario.png')} alt="Usuario" />
            </Link>
            <ul className="dropdown-menu">
              <li><Link className="dropdown-item" to="/perfilCoordinador">Perfil</Link></li>
              <li onClick={handleLogout}><Link className="dropdown-item" to="/cerrarSesion">Cerrar Sesion</Link></li>
            </ul>
          </li>
        </ul>
        <img className='justify-content-end logob' src={ImagesB('./logobienestech.png')} alt="Logo Bienestech" />
        </div>
        
        
      </div>
    </nav>

        </div>
    );
};


export default NavCoordi; // Exportas NavCoordi como el default


