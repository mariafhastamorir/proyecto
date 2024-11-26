import PiePagina from '../../components/piePagina';
import React from 'react';
import { Link } from "react-router-dom";


const ImagesB = require.context('../../assets', true);

const Index = () => {
    return (
        <div className='index'>
            <nav className="navbar navind">
                <div className="container d-flex justify-content-between align-items-center">
                    <div className="navbar-brand">
                        <img src={ImagesB('./logoindex.png')} width="80" height="80" alt="Logo Izquierda" />
                    </div>
                    <div className="navbar-brand">
                        <img src={ImagesB('./logobienestech.png')} alt="Logo Derecha" />
                    </div>
                </div>
            </nav>

            <div className="hold-transition index-page">
                <div className="index-box container">
                    <h2 className='h2r'>Agendar y compartir talleres de forma ágil con Bienestech</h2>
                    <div className="content-flex">
                        <div className="imgindex">
                            <img src={ImagesB('./imgindex.png')} alt="Pantalla principal de Bienestech" />
                        </div>

                        <div className="text-and-buttons">
                            <div className="botones">

                                <Link to="/login">
                                    <button className="btn btn-lg btn-outline-success btn-block iniciars" type="button">Iniciar Sesión</button>
                                </Link>
                                <br></br>
                                <br></br>
                                <Link to="/registro">
                                    <button className="btn btn-lg btn-outline-success btn-block reg" type="button" Link to="./registro">Registrarse</button>
                                </Link>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <PiePagina />

        </div>
    );
}

export default Index;

