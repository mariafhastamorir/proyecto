import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PiePagina from '../../components/piePagina';
const ImagesB = require.context('../../assets', true);




const Perfil_2 = () => {
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
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to="/profesional" className="nav-link">Cronograma</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="#" className="nav-link">Hola Profesional</Link>
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

            <div className="fondoo">
                <div className="container containerr">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <h1 className="h1">Perfil</h1>
                            <form className="form-containerr perfil">
                                <div className="mb-3">
                                    <label htmlFor="disabledSelect" className="form-label">Tipo Documento</label>
                                    <select id="disabledSelect" className="form-select">
                                        <option>Seleccione una opción..</option>
                                        <option>Cédula de Ciudadanía</option>
                                        <option>Cédula de extranjería</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Número de Documento</label>
                                    <input type="text" className="form-control" placeholder="Ingresar.." />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nombre Completo</label>
                                    <input type="text" className="form-control" placeholder="Ingresar.." />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" id="exampleInputPassword1" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Link to="/actuCoordi">
                                        <button className="butonimportar">
                                            <img
                                                width="16"
                                                height="16"
                                                src="https://img.icons8.com/tiny-color/16/refresh.png"
                                                alt="refresh"
                                                style={{ marginRight: 10 }} />
                                            Actualizar
                                        </button>
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <PiePagina />
        </div>
    );
}

export default Perfil_2;
