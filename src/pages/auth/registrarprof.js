import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';
import "./admin.css";

const Registrarprof = () => {
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numeroDocumento, setNumDoc] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correoUsuario, setCorreo] = useState('');
    const [claveUsuario, setClave] = useState('');
    const [areaEncargada, setAreaEncargada] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8000/profesionales', {
                profesional: {
                    tipoDocumento,
                    numeroDocumento,
                    nombres,
                    apellidos,
                    correoUsuario,
                    claveUsuario,
                    areaEncargada
                }
            });
            console.log(response.data);
            setIsSubmitted(true);
            navigate('/registro_exitoso');
        } catch (error) {
            // Acceder a error.response para obtener información detallada
            if (error.response && error.response.data) {
                setError("Error al registrar el profesional: " + JSON.stringify(error.response.data));
            } else {
                setError("Error desconocido. Por favor intenta nuevamente.");
            }
        }
    };
    

    return (
        <div>
            <Navbar />
            <main className="container">
                <h1 className="hh1">Registrar Profesionales Bienestar</h1>

                {error && <div className="error">{error}</div>} {/* Mostrar errores si los hay */}
                {isSubmitted && <div className="success">Registro exitoso</div>} {/* Mensaje de éxito */}

                <form className="form" onSubmit={handleSubmit}>
                    <select
                        id="document-type"
                        name="document-type"
                        className="form--input td"
                        value={tipoDocumento}
                        onChange={(e) => setTipoDocumento(e.target.value)}
                    >
                        <option value="">Tipo de Documento</option>
                        <option value="C.C">Cédula de ciudadanía</option>
                        <option value="C.e">Cédula de extranjería</option>
                    </select>
                    <input
                        required
                        type="number"
                        name="numeroDocumento"
                        placeholder="Número de documento"
                        className="form--input"
                        value={numeroDocumento}
                        onChange={(e) => setNumDoc(e.target.value)}
                    />
                    <input
                        required
                        type="text"
                        name="nombres"
                        placeholder="Nombres"
                        className="form--input"
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                    />
                    <input
                        required
                        type="text"
                        name="apellidos"
                        placeholder="Apellidos"
                        className="form--input"
                        value={apellidos}
                        onChange={(e) => setApellidos(e.target.value)}
                    />
                    <input
                        required
                        type="email"
                        name="correo"
                        placeholder="Correo"
                        className="form--input"
                        value={correoUsuario}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    <select
                        id="areaEncargada"
                        name="areaEncargada"
                        className="form--input td"
                        value={areaEncargada}
                        onChange={(e) => setAreaEncargada(e.target.value)}
                        required
                    >
                        <option value="">Seleccione área encargada</option>
                        <option value="psicologia">Psicología</option>
                        <option value="deporte">Deporte</option>
                        <option value="arte">Arte</option>
                    </select>
                    <input
                        required
                        type="password"
                        name="clave"
                        placeholder="Contraseña Predeterminada"
                        className="form--input"
                        value={claveUsuario}
                        onChange={(e) => setClave(e.target.value)}
                    />
                    <button className="form--submit" type="submit">
                        Guardar
                    </button>
                </form>
            </main>
            <PiePagina />
        </div>
    );
}

export default Registrarprof;
