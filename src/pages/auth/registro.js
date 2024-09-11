import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import  axios from "axios";
import './registro.css';

const ImagesB = require.context('../../assets', true);

const Registro = () => {
    
    const [tipoDocumento, settipoDocumento] = useState('');
    const [numeroDocumento, setnumeroDocumento] = useState('');
    const [nombres, setnombres] = useState('');
    const [apellidos, setapellidos] = useState('');
    const [correoUsuario, setcorreoUsuario] = useState('');
    const [claveUsuario, setclaveUsuario] = useState('');
    const [idRol, setidRol] = useState('');

    const [error, setError] = useState('');

    const [showModal, setShowModal] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false); // Estado para controlar si ya se ha enviado el formulario


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/registro', {
            tipoDocumento,
            numeroDocumento,
            nombres,
            apellidos,
            correoUsuario,
            claveUsuario,
            idRol
          });
          console.log(response.data);
        } catch (error) {
          console.error(error.response ? error.response.data : error);
        }
      };
    

    return (
        <div className="regisyini">
            <div>
                <nav className="navbar nnn">
                    <img src={ImagesB('./logosena.png')} width="90" height="90" alt="Logo SENA" />
                    <img src={ImagesB('./logobienestech.png')} alt="Logo BienesTech" />
                </nav>

                <div className="container">
                    <div className="form-container">
                        <h2 className="h2r">Regístrate</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="document-type" className="form-label">Tipo de Documento</label>
                                    <select className="tp form-selectt" value={tipoDocumento}  onChange={(e) => settipoDocumento(e.target.value)} required>
                                        <option value="">Seleccione una opción</option>
                                        <option value="C.C">Cédula de Ciudadania</option>
                                        <option value="C.E">Cédula de Extranjeria</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="document-number" className="form-label">Número de Documento</label>
                                    <input
                                        type="text"
                                        value={numeroDocumento}
                                        className="form-controll"
                                        id="document-number"
                                        required
                                        onChange={(e) => setnumeroDocumento(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="first-name" className="form-label">Nombres</label>
                                    <input
                                        type="text"
                                        value={nombres}
                                        className="form-controll"
                                        id="first-name"
                                        required
                                        onChange={(e) => setnombres(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="last-name" className="form-label">Apellidos</label>
                                    <input
                                        type="text"
                                        value={apellidos}
                                        className="form-controll"
                                        id="last-name"
                                        required
                                        onChange={(e) => setapellidos(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label">Correo</label>
                                    <input
                                        type="email"
                                        value={correoUsuario}
                                        className="form-controll"
                                        id="email"
                                        required
                                        onChange={(e) => setcorreoUsuario(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        value={claveUsuario}
                                        className="form-controll"
                                        id="password"
                                        required
                                        onChange={(e) => setclaveUsuario(e.target.value)}
                                    />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="document-type" className="form-label">Rol</label>
                                    <select className="tp form-selectt" value={idRol} onChange={(e) => setidRol(e.target.value)} required>
                                        <option value="">Seleccione una opción</option>
                                        <option value="1">Administrador</option>
                                        <option value="2">Coordinador</option>

                                    </select>
                                </div>
                            </div>

                            <div className="row mt-4">
                                <div className="col-12 text-center">
                                    <button type="submit" className="btn btn-success submit-btn" disabled={isSubmitted}>
                                        {isSubmitted ? 'Enviando...' : 'Registrarme'}
                                    </button>
                                    {error && <p>{error}</p>}
                                </div>
                            </div>

                        </form>

                        <br />
                        <p className="p">¿Ya está registrado? <Link to="/inicioSesion">Iniciar sesión</Link></p>
                    </div>
                </div>

            </div>

            {/* Modal */}
            <div className="modal fade" id="registroModal" tabIndex="-1" aria-labelledby="registroModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="registroModalLabel">¡Registro exitoso!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            Se ha registrado correctamente. Solicitud en proceso...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registro;

