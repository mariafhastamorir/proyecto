import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ImagesB = require.context('../../assets', true);

const InicioS = ({ setUserRole }) => {
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [claveUsuario, setClaveUsuario] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/login', {
                numeroDocumento,
                claveUsuario
            });

            const { rol, nombres } = response.data;

            // Establecer el rol del usuario en el estado
            setUserRole(rol);

            // Redirigir según el rol
            if (rol === 1) {
                navigate('/admin'); // Redirigir a la vista del administrador
            } else if (rol === 2) {
                navigate('/coordinador'); // Redirigir a la vista del coordinador
            } else if (rol === 3) {
                navigate('/profesional'); // Redirigir a la vista del coordinador
            } else if (rol === 4) {
                navigate('/instructor'); // Redirigir a la vista del coordinador
            } else {
                setError('Rol no reconocido.');
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setError(error.response && error.response.data ? error.response.data.detail : 'Error al iniciar sesión. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="regisyini inicios">
            <div>
                <nav className="navbar nnni">
                    <img src={ImagesB('./logosena.png')} width="90" height="90" alt="Logo SENA" />
                    <img src={ImagesB('./logobienestech.png')} alt="Logo BienesTech" />
                </nav>

                <div className="container">
                    <div className="form-container">
                        <h2 className="h2r">Iniciar Sesión</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label htmlFor="numeroDocumento" className="form-label">Número de Documento</label>
                                <input
                                    type="text"
                                    value={numeroDocumento}
                                    className="form-controll"
                                    id="numeroDocumento"
                                    required
                                    onChange={(e) => setNumeroDocumento(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="claveUsuario" className="form-label">Contraseña</label>
                                <input
                                    type="password"
                                    value={claveUsuario}
                                    className="form-controll"
                                    id="claveUsuario"
                                    required
                                    onChange={(e) => setClaveUsuario(e.target.value)}
                                />
                            </div>
                            <div className="row mt-4">
                                <div className="col-12 text-center">
                                    <button type="submit" className="btn btn-success submit-btn">
                                        Iniciar Sesión
                                    </button>
                                </div>
                            </div>
                        </form>

                        {error && <p className="text-danger">{error}</p>} {/* Mostrar mensaje de error */}

                        <br />
                        <p className="p">¿Aún no está registrado? <Link to="/registro">Registrarme</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InicioS;