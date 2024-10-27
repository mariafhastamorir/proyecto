import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PiePagina from '../../components/piePagina';


import "./admin.css";

const ImagesB = require.context('../../assets', true);


const Prof = () => {
    const navigate = useNavigate();


    const handleLogout = () => {
        // Eliminar los datos de sesión almacenados en localStorage
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');

        // Redirigir al usuario a la página de inicio de sesión
        navigate('/', { replace: true });
    };

    return (
        <div className="admin-container">

            <nav className="navbar navbar-expand-lg nnnn">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/coordinador" className="nav-link">Cronograma</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link">Hola Profesional</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                <img className='justify-content-end logou' src={ImagesB('./usuario.png')} />
                            </Link>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/perfil_2">Perfil</Link></li>
                                <li onClick={handleLogout} ><Link className="dropdown-item">Cerrar Sesion</Link></li>
                            </ul>
                        </li>
                    </ul>
                    <img className='justify-content-end logob' src={ImagesB('./logobienestech.png')} />
                </div>
            </nav>


            <h2 className='h2A'>Horario de talleres</h2>
            {/* Otros elementos y componentes del panel de administración */}



            <main className="container">
                <p>Horario semana del  10 a 14 de Junio:</p>
                <h3 className="h3">Lunes:</h3>
                <br />
                <div className="cards">
                    <div className="cardd col-md-4">
                        <div className="card-content">
                            <h2>Taller Psicología</h2>
                            <p>Ficha: 2898754</p>
                            <p>Centro Formación: Calle 52</p>
                            <p>Fecha: 17/07/2024</p>
                            <p>Hora: 2:30pm</p>
                            <p>Ambiente: 413</p>
                            <p>Profesional: Sebastian Ramírez</p>
                            <p>Estado: Finalizado</p>
                            <p>Observación: En compañia de Yudi</p>
                        </div>
                    </div>
                    <div className="cardd col-md-4">
                        <div className="card-content">
                            <h2>Taller Deporte</h2>
                            <p>Ficha: 2898745</p>
                            <p>Centro Formación: Calle 52</p>
                            <p>Fecha: 17/07/2024</p>
                            <p>Hora: 1:30pm</p>
                            <p>Ambiente: Ágora</p>
                            <p>Profesional: Sebastian Ramirez</p>
                            <p>Estado: Activo</p>
                            <p>Observación: Ninguna</p>
                        </div>
                    </div>
                </div>
                <h3 className="h3">Martes:</h3>
                <br />
                <div className="cards">
                    <div className="cardd">
                        <div className="card-content">
                            <h2>Taller Teatro</h2>
                            <p>Ficha: 2470719</p>
                            <p>Centro Formación: Calle 52</p>
                            <p>Fecha: 18/07/2024</p>
                            <p>Hora: 4:00pm</p>
                            <p>Ambiente: 501</p>
                            <p>Profesional: Sebastian Ramírez</p>
                            <p>Estado: Activo</p>
                            <p>Observación: Ficha femenina</p>
                        </div>
                    </div>
                </div>
                <h3 className="h3">Miercoles:</h3>
                <br />
                <div className="cards">
                    <div className="cardd">
                        <div className="card-content">
                            <h2>Taller Psicología</h2>
                            <p>Ficha: 2470712</p>
                            <p>Centro Formación: Calle 52</p>
                            <p>Fecha: 19/07/2024</p>
                            <p>Hora: 2:30pm</p>
                            <p>Ambiente: 205</p>
                            <p>Profesional: Sebastian Ramírez</p>
                            <p>Estado: Activo</p>
                            <p>Observación: En compañia de Yudi</p>
                        </div>
                    </div>
                    <div className="cardd">
                        <div className="card-content">
                            <h2>Taller Sexualidad</h2>
                            <p>Ficha: 2587230</p>
                            <p>Centro Formación: Calle 52</p>
                            <p>Fecha: 19/07/2024</p>
                            <p>Hora: 3:30pm</p>
                            <p>Ambiente: 210</p>
                            <p>Profesional: Sebastian Ramirez</p>
                            <p>Estado: Activo</p>
                            <p>Observación: En compañia de practicantes</p>
                        </div>
                    </div>
                </div>
                <h3 className="h3">Jueves:</h3>
                <br />
                <h4 className="h4">No cuenta con talleres para este día</h4>
                <h3 className="h3">Viernes:</h3>
                <br />
                <h4 className="h4">No cuenta con talleres para este día</h4>
            </main>

            <PiePagina />
        </div>
    );
};

export default Prof;