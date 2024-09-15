import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Importa useNavigate
import axios from 'axios';
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';

import "./admin.css";


const baseUrl = "http://localhost:4100/profesB";

const ImagesB = require.context('../../assets', true);

const Registrarprof = () => {
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [numDoc, setNumDoc] = useState('');
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');

    const navigate = useNavigate();  // Instancia de useNavigate

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            tipoDocumento,
            numDoc,
            nombres,
            apellidos,
            correo,
            clave,
            rol: 'Profesional',  // Asigna automáticamente el rol "Profesional"
        };

        axios.post(baseUrl, data)
            .then(response => {
                navigate('/registro_exitoso');  // Redirige a la ruta deseada después del registro
            })
            .catch(error => {
                console.error('Hubo un error al guardar el registro', error);
            });
    };

    return (
        <div>
            <Navbar />
            <main className="container">
                <h1 className=" hh1">Registrar Profesionales Bienestar</h1>

                <form className="form" onSubmit={handleSubmit}>
                    <select
                        id="document-type"
                        name="document-type"
                        className="form--input"
                        value={tipoDocumento}
                        onChange={(e) => setTipoDocumento(e.target.value)}
                    >
                        <option value="td">Tipo de Documento</option>
                        <option value="cc">Cédula de ciudadanía</option>
                        <option value="ce">Cédula de extranjería</option>
                    </select>
                    <input
                        required
                        type="number"
                        name="numDoc"
                        placeholder="Número de documento"
                        className="form--input"
                        value={numDoc}
                        onChange={(e) => setNumDoc(e.target.value)}
                    />
                    <input
                        required
                        type="text"
                        name="Nombres"
                        placeholder="Nombres"
                        className="form--input"
                        value={nombres}
                        onChange={(e) => setNombres(e.target.value)}
                    />
                    <input
                        required
                        type="text"
                        name="Apellidos"
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
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                    />
                    <input
                        required
                        type="password"
                        name="clave"
                        placeholder="Contraseña predeterminada"
                        className="form--input"
                        value={clave}
                        onChange={(e) => setClave(e.target.value)}
                    />
                    <button className="form--submit" type="submit">
                        <img width={40} height={40} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAACKUlEQVR4nN1Vy24TUQyNeFRUPHaU9gcQAnZsEJtR7AktUsVLTDfN+DYgIbU8yuMDsqTwC+yggJQViNhDVvkBNrxLeYhfAIoELAD5ZiaJZuZOorACS6MkN/axfe6xp1T6ry1oBGPU9OcM431iXDMMGyTwzTB8tGdNf+7800NbRwJfiPzTJPDBCP4uekjwU8g4m8RVW5UJEn/RCVyv1zcRw60eCLwghmWKygeqrcr2oHF43Dw5us8wXDCMz4jhOzEcS8DVX+NCwaXcBD1w+KFOmrComJBxbxpcP/V3Li0J+AKXYVg6hwK3Fxpz7mxvVHA1q5bYKWgEm/8G3LS9bdkEjA+sY4SXhwGvycxuEnhulcTwxjS9ST0PI3/aCN7OBBiBt+pcE9jfTSr+Yl7LrsrPPYI9qirD+C7bgeAXDTj78MhOW4ngUh6vRZxrrD1n2Mh2wPi1P0GagvloespFS2LzMrMrTvB5KIrS1Q5SS/Vx5WAnOa7lUAT34uAr/ee1vqpdlfdYgOvx+rjjlinjy7RMq91O3DrXGGJ81UkAZ/Icxgzj+7jKi5n2W5UJ5xB1VsxyDL7u3LAkcCpZFUZ8dIGlLYzQJ8afhvEXReXjhc4keLOXBC8VTbXX9rbYTavgnc5vDKzGrutuErR3QoJXVSFB29uhj34PGa8lnGvlhnGlaPNmzDCc1Ikc/MKB9bCJJ0qjmF6WKoIYVq08dRjtQMJrw3hX/xv5lfnP2B+kutBnoipa7AAAAABJRU5ErkJggg==" />
                        Guardar
                    </button>
                </form>
            </main>
            <PiePagina />
        </div>
    );
}

export default Registrarprof;
