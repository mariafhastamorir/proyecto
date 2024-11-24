import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';

const ImagesB = require.context('../../assets', true);


const GestionFichas = () => {

    return (
        <div className="fondo">
            <Navbar />
            <div className="container">
                <h1 className="h1">Consultar Fichas</h1>
                <div className="row">
                    <div className="col-md-5">
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>

            <div className="container jornadas">
                <div className="row">
                    <div className="col-md-4">
                        <div className="cardm">
                            <div className="card-bodyy">
                                <img src={ImagesB('./DIURNA_83.png')} className="imgg img-fluid" />
                                <Link className="btn btn-succes boton" to="/consultarFichaAdmin?turno=diurna">Diurna</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="cardm">
                            <div className="card-bodyy">
                                <img src={ImagesB('./mixta_83.png')} className="imgg img-fluid" />
                                <Link className="btn btn-succes boton" to="/consultarFichaAdmin?turno=mixta">Mixta</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="cardm">
                            <div className="card-bodyy">
                                <img src={ImagesB('./nocturna_83.png')} className="imgg img-fluid" />
                                <Link className="btn btn-succes boton" to="/consultarFichaAdmin?turno=nocturna">Nocturna</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PiePagina />
        </div>
    );
}

export default GestionFichas;
