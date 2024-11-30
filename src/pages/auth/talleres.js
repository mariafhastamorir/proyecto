import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';

import "./admin.css";


const ImagesB = require.context('../../assets', true);

const TalleresIn = () => {
    return (

        <div className="admin-container">
            {/*Navbar*/}
            <Navbar/>

            <div className='container'>
                <h2 className='h2A'>Talleres</h2>
                <div className="row talleres">
                    <div className="col-sm-4 mb-3 mb-sm-0">
                        <div className="card c-t">
                            <img src={ImagesB('./agendar.png')} className="card-img-top img-card img-fluid" alt="Imagen del taller" />
                            <div className="card-body">
                                <Link to="/agendar" className="btn btn-success boton">AGENDAR</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 mb-3 mb-sm-0">
                        <div className="card c-t">
                            <img src={ImagesB('./programacion.png')} className="card-img-top img-card img-fluid" alt="Imagen del taller" />
                            <div className="card-body">
                                <Link to="/programacionTalleres" className="btn btn-success boton">PROGRAMACIÓN</Link>

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4 mb-3 mb-sm-0">
                        <div className="card c-t">
                            <img src={ImagesB('./consultar.png')} className="card-img-top img-card img-fluid" alt="Imagen del taller" />
                            <div className="card-body">
                                <Link to="/consultarTalleres" className="btn btn-success boton">CONSULTAR</Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PiePagina />
        </div>
    );
};

export default TalleresIn;

