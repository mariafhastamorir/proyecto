import React from "react";
import { Link } from "react-router-dom";
import NavbarInstru from '../../components/navInstru';
import PiePagina from '../../components/piePagina';
import "./coordi.css";

const Perfil_2 = () => {
    return (
        <div>
            <NavbarInstru />
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
