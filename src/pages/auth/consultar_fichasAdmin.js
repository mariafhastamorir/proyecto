// Ajustes en consultar_fichasAdmin.js

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';


const ConsultarFichas = () => {
    const location = useLocation();
    const [fichas, setFichas] = useState([]);
    const [coordinaciones, setCoordinaciones] = useState([]);
    const [programas, setProgramas] = useState([]);
    const [numerosFicha, setNumerosFicha] = useState([]);

    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [selectedOption3, setSelectedOption3] = useState('');
    const queryParams = new URLSearchParams(location.search);
    const turno = queryParams.get('turno'); // obtener el turno de la URL

    const baseUrl = "http://localhost:4000/fichas";

    useEffect(() => {
        const fetchFichas = async () => {
            try {
                const response = await fetch(baseUrl); // Ajusta la ruta según sea necesario
                if (!response.ok) {
                    throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                }

                const data = await response.json(); // Intentar parsear el JSON
                const fichasFiltradas = data.fichas.filter(ficha => ficha.jornada === turno);
                setFichas(fichasFiltradas);

                const coordinacionesUnicas = [...new Set(fichasFiltradas.map(ficha => ficha.nombreCoordinacion))];
                const programasUnicos = [...new Set(fichasFiltradas.map(ficha => ficha.programaFormacion))];
                const numerosFichaUnicos = [...new Set(fichasFiltradas.map(ficha => ficha.numFicha))];

                setCoordinaciones(coordinacionesUnicas);
                setProgramas(programasUnicos);
                setNumerosFicha(numerosFichaUnicos);
            } catch (error) {
                console.error('Error al cargar las fichas:', error.message);
            }
        };

        fetchFichas();
    }, [turno]);

    // Función para manejar la búsqueda al hacer clic en el botón de búsqueda
    const handleSearch = () => {
        const filteredFichas = fichas.filter(ficha =>
            (selectedOption1 === '' || ficha.nombreCoordinacion === selectedOption1) &&
            (selectedOption2 === '' || ficha.programaFormacion === selectedOption2) &&
            (selectedOption3 === '' || ficha.numFicha === selectedOption3)
        );

        setFichas(filteredFichas);
    };

    return (
        <div className="fondo">
            <Navbar />
            <div className="container">
                <h2 className="h2">Consultar Fichas</h2>
                <div className="row">
                    <div className="col-md-5"></div>
                    <div className="col-md-2"></div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row justify-content-center g-4">
                    <div className="col-md-4">
                        <div className="card-custom">
                            <label>Seleccione Coordinación: </label>
                            <input type="text" className="filter-input mb-2" placeholder="Buscar..." />
                            <select className="form-select" value={selectedOption1} onChange={(e) => setSelectedOption1(e.target.value)}>
                                <option value="">Seleccionar...</option>
                                {coordinaciones.map((coordinacion, index) => (
                                    <option key={index} value={coordinacion}>{coordinacion}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-custom ">
                            <label className="">Seleccione Programa: </label>
                            <br />
                            <input type="text" className="filter-input mb-2" placeholder="Buscar..." />
                            <select className="form-select" value={selectedOption2} onChange={(e) => setSelectedOption2(e.target.value)}>
                                <option value="">Seleccionar...</option>
                                {programas.map((programa, index) => (
                                    <option key={index} value={programa}>{programa}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-custom">
                            <label>Seleccione Número de Ficha: </label>
                            <input type="text" className="filter-input mb-2" placeholder="Buscar..." />
                            <select className="form-select" value={selectedOption3} onChange={(e) => setSelectedOption3(e.target.value)}>
                                <option value="">Seleccionar...</option>
                                {numerosFicha.map((numFicha, index) => (
                                    <option key={index} value={numFicha}>{numFicha}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mt-3">
                <button className="btnBusa" type="button" onClick={handleSearch}>
                    <img width={30} height={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClklEQVR4nL1Vz2sTURBeVLSiPXgRWpEibUmzM4k3UTzUXwexkO6bsHgRe1VaWmz1XPRvEdQUpaJkJrnEH4WeCtJU0PoviGK9+AMbmbcbm9TsdrcGBx7svn1vv/m++d48x4kIX9whYrhjBB6R4Gsd+mwEbus351+DqtlhEnxMjJsk2Og4GDeJcWHXgCToGcavwQ9hlRhmipyFa5X8IR36rHPEUA9BNzzOjacHEfxFgt9I4Ob8vLMnaq1f8vcadieN4HfdkxhM5QqZKMj5pMmZintBwZRZIhltTQQbHuONpCDNIMGpsG4Lzo7Ft4WH1Ti5YmUUXNN/eGUYjFyodg0yghl9H3ueO5IWzFTcW6E55iIXkUBJF/ll1w3f743WRvelA8qj/sMwPowBsoexUVjM9NpNDC91YxqgwmKm1wIJvEoOJPDOMNzdFRDjUuSisMVsScdQJYbPppI/mlY6inPedjOoxcPO8GKiNtCTygyMs05889TeBXW1ql9y9xPjmxBsOdayzh97v7VdpZodjs1IKQcau5N287OTx0hgJZiDH8RwnwSueuKeMjzS18aGcTpM6smO1C0rwQ1tJ8Vy7qLOqcWNwPWga8CyHgNNxC+dPriVYO6SJqLty6/kTzhJQhuj0g9715RKEisX47RlG9Tmo8d4RhlfLg8dSASmzIIzgWtaZHWUX3MP67DuYpzVmoRrvpDAp/a7Curb5Y2WUWsWc/EF1wmUxgWOFxnO/f1dz2ICMMuuDIPau4jxgb3GGZc0AWXZ6kSqwNnOCcH7QjXT73QrJmoDPS03bjszxnV1cNfADI/0qVz/BaxQzfRHgZHg064BOU0wxvUO9VrpKpCGymQYP7TY/adhHOs6UBNM5bJtrIxXdPI3h6rp/8oovdgAAAAASUVORK5CYII=" />
                    Buscar
                </button>
            </div>

            <PiePagina />
        </div>
    );
};

export default ConsultarFichas;

