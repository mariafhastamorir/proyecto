import React, { useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import NavbarCordi from '../../components/nabCordi';
import PiePagina from '../../components/piePagina';

import "./coordi.css";

const ImagesB = require.context('../../assets', true);

const VistaCoordi = () => {

    const navigate = useNavigate();
    


    const handleLogout = () => {
        // Eliminar los datos de sesión almacenados en localStorage
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');

        // Redirigir al usuario a la página de inicio de sesión
        navigate('/', { replace: true });
    };

    return (

        <div className="gestionfichas">
            <NavbarCordi />
            <h1 className="container h1">Gestión fichas </h1>

            <div className="container jornadas">
                <div className="row">
                    <div className="col-md-4">
                        <div className="cardm">
                            <div className="card-bodyy">
                                <img src={ImagesB('./DIURNA_83.png')} className="imgg img-fluid" />
                                <Link className="btn btn-succes boton" to="/gestionFichas2?turno=diurna">Diurna</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="cardm">
                            <div className="card-bodyy">
                                <img src={ImagesB('./mixta_83.png')} className="imgg img-fluid" />
                                <Link className="btn btn-succes boton" to="/gestionFichas2?turno=mixta">Mixta</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="cardm">
                            <div className="card-bodyy">
                                <img src={ImagesB('./nocturna_83.png')} className="imgg img-fluid" />
                                <Link className="btn btn-succes boton" to="/gestionFichas2?turno=nocturna">Nocturna</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PiePagina />
        </div>
    );
}

export default VistaCoordi;