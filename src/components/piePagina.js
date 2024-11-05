import { Link } from "react-router-dom";
import React from 'react';
import "../App.css";


const PiePagina = () => {
    return (
        <footer className="color-footer text-white pt-4">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h5>Pagina web para</h5>
                        <p>Agendar y compartir talleres de forma ágil</p>
                    </div>
                    <div className="col-md-3">
                        <h5>Servicio Nacional de Aprendizaje SENA</h5>
                        <ul className="list-unstyled">
                            <li><i className="bi bi-telephone"></i>Centro de Gestión de Mercados, Logística y Tenologías de la Información</li>
                            <li><i className="bi bi-envelope"></i>Regional Distrito Capital</li>
                            <li><i className="bi bi-geo-alt"></i>Cl 52 N° 13 65 </li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Equipo de desarrollo</h5>
                        <ul className="list-unstyled">
                            <li><i href="#" className="text-white">Juliana Salgar Torres</i></li>
                            <li><i href="#" className="text-white">Angie Sofia Sosa Calderon</i></li>
                            <li><i href="#" className="text-white">Maria Fernanda Hastamorir Ojeda</i></li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h5>Contacto</h5>
                        <ul className="list-unstyled">
                            <li><i className="bi bi-telephone"></i> julianasalgar27@gmail.com</li>
                            <li><i className="bi bi-envelope"></i> angiesofia.scalderon@gmail.com</li>
                            <li><i className="bi bi-geo-alt"></i> mariafojeda2006@gmail.com</li>
                        </ul>
                    </div>
                </div>

                <hr className="bg-light" />
                <div className="text-center pb-2">
                    <p>&copy; 2024 Bienestech. Proyecto Formativo Sena</p>
                </div>
            </div>
        </footer>


    );
};

export default PiePagina;