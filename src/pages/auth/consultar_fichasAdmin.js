import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';
import axios from "axios";

const ConsultaFichaAdmin = () => {
    const [fichas, setFichas] = useState([]);
    const [filteredFichas, setFilteredFichas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");
    const location = useLocation();

    // Leer el turno desde la URL
    const queryParams = new URLSearchParams(location.search);
    const turno = queryParams.get("turno");

    useEffect(() => {
        const fetchFichas = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/fichas/`, {
                    params: { turno }
                });
                console.log("Datos obtenidos:", response.data); // Verifica la estructura de los datos
                setFichas(response.data); // Actualizar las fichas obtenidas
                setFilteredFichas(response.data); // Inicializar fichas filtradas
            } catch (error) {
                console.error("Error al obtener fichas:", error);
                setError("No se encontraron fichas para el turno seleccionado.");
            }
        };

        if (turno) {
            fetchFichas();
        }
    }, [turno]);

    // Filtrar las fichas basadas en el término de búsqueda
    useEffect(() => {
        if (searchTerm === "") {
            setFilteredFichas(fichas); // Mostrar todas si no hay búsqueda
        } else {
            const filtered = fichas.filter(
                (ficha) =>
                    ficha.numFicha.toString().includes(searchTerm) ||
                    ficha.nombrePrograma.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    ficha.coordinacion.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredFichas(filtered);
        }
    }, [searchTerm, fichas]);

    const [horarioFicha, setHorarioFicha] = useState({});
    const [loadingHorario, setLoadingHorario] = useState(false);

    const fetchHorario = async (numFicha) => {
        setLoadingHorario(true);
        try {
            const response = await axios.get(`http://localhost:8000/horarios/${numFicha}`);
            console.log("Datos de horario:", response.data); // Verifica los datos aquí
            setHorarioFicha((prevState) => ({
                ...prevState,
                [numFicha]: response.data
            })); // Guardar horarios asociados al número de ficha
        } catch (error) {
            console.error("Error al obtener el horario:", error);
            alert("No se pudo obtener el horario para esta ficha.");
        } finally {
            setLoadingHorario(false);
        }
    };
    

    return (
        <div className="fondo">
            <Navbar />
            <div className="margenProgramacion">
                <h1>Fichas para jornada: {turno}</h1>
                {error && <p>{error}</p>}

                {/* Input de búsqueda */}
                <input
                    type="text"
                    placeholder="Buscar por número, programa o coordinación..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: "10px",
                        margin: "20px 0",
                        width: "100%",
                        boxSizing: "border-box"
                    }}
                />

                {/* Mostrar fichas filtradas */}
                <ul>
                    {filteredFichas.length > 0 ? (
                        filteredFichas.map((ficha) => (
                            <li style={{ color: 'black', marginTop: '20px' }} key={ficha.idFicha}>
                                Número: {ficha.numFicha} - Programa: {ficha.nombrePrograma} - Coordinación: {ficha.coordinacion}

                                <div>
                                    <button
                                        className="btn btn-success"
                                        onClick={() => fetchHorario(ficha.numFicha)}
                                    >
                                        Ver horario ficha {ficha.numFicha}
                                    </button>

                                    {/* Mostrar horario dinámicamente */}
                                    {horarioFicha[ficha.numFicha] && (
                                        <div className="card card-body" style={{ marginTop: "10px" }}>
                                            <h5>Horario:</h5>
                                            {horarioFicha[ficha.numFicha].map((h, index) => (
                                                <p key={index}>
                                                    Día: {h.dia}, {h.horaInicio} - {h.horaFin}, Ambiente: {h.numAmbiente}, Sede: {h.sede}
                                                </p>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))
                    ) : (
                        <p>No se encontraron resultados</p>
                    )}
                </ul>

            </div>
            <PiePagina />
        </div>
    );
};

export default ConsultaFichaAdmin;
