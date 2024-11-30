import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import NavbarCordi from '../../components/nabCordi';
import PiePagina from '../../components/piePagina';
import axios from "axios";

const GestionFichas = () => {
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
                const token = localStorage.getItem("accessToken"); // Recuperar el token
                console.log("Token recuperado:", token); // Verificar si el token es null o vacío
        
                if (!token) {
                    throw new Error("Token no encontrado.");
                }
        
                const response = await axios.get("http://localhost:8000/fichas/Coordinador", {
                    params: { turno }, // Asegúrate de que turno tiene un valor válido
                    headers: {
                        Authorization: `Bearer ${token}`, // Incluir el token
                    },
                });
                setFichas(response.data);
                setFilteredFichas(response.data);
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
            <NavbarCordi />
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>'" }}>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/coordinador">Gestión fichas</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={`/gestionFichas2?turno=${turno}`}>
                                        {turno.charAt(0).toUpperCase() + turno.slice(1)}
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5 text-end">
                        <Link to={`/importarFichas?turno=${turno}`}>
                            <button className="butonimportar">
                                <img width={24} height={24} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADM0lEQVR4nO1ZS2sUQRBuo1cVEcGjj3WqJhpBk+meDYH4NopHg48kZqp2EfwBSTSXgOQSb4oe1YuKghg9ai4RJAf1oCdRPBtUvOrJKLV5sNmZ7G5mpye7sB/0ZRe6v6+6XlOtVBNN1B+6KLPN5Jz9HmPWkGv8XGum60rbFlWv8PLuXs0wqhmmNMEvw/gvamnGH5rwhSZ32Mujs6aku8e6N2h2Bwzh+5UIV1hzhuC1z9DX26vWp0reIzyjGb/GJB6+GcKPPrnHrBNvv7xrs2Z4nBRxU7oIb1gj38EAla0Os4bwofi4CdxzYlVDzilDTr9mGDIEk5rxexkBf73B1u2Jk/cDPCgBuPLBMGlycEiNqZaKm42pFj/n9GjCp0LYuoAFy0eS14RvsgF0xt3b5LFdM0wvBTXDhAWfj3SbOc1wXSm1LolzvDw6ZhB2qKQRFbCa8bf4t6p3+DmnJ9LyhBdUvaO7UKTCrrPgNvUPLRU2ImBr8fmCnwfuHpUGTER7EDfbFG6T8H6RIW4p242ZicjzNbjik9L9pDtVtqAZRkMCpEglRD4NAVMl1v9WVYWtkrwhvKtsQof6eXiUFHn5Xf63+yXFpdnHHU6I/CepLdLgxVmmmgzmB9AWFgBnqxVQnG1sLE1wpywBSZURljtRdZ63SN4srnI3UYsA2XjNBfi1uhDjPbsC4Paqg9gwjjRMEDd8GhVoglclAmaTLGTiZsomdIDXwofC4cZpJai1NeLQ5w3TzAkM4buQCHK6VHwRS9lJM95UtmHI6Q8LgJnVxkIxxOrWLb/cavAlIgDHVaPAC+Bkw37UL0JqQMQt/DGM51UjQPdlNkW50vxgC8driYnSRlDnnZ3KBqSErziQJZiJm50EHkNH0WjR3nQ6y+6BclPlwqtL4Byp5kbkMaMwsWZ4lspwd1m7TPC5XLcoIgvjSMKrEicmh8dN4J5emDONSEEsP+VGewIEnQwbNeEDi+3yhEptblrhNla5PnjsHlVpQnxZHugM49uYpGVEP+3l4GLqj3ylyA46WPBxgpeG8Ge5GJmPAxhKbU4aB94Abu1g3Kfz6MtDd+elzG55LIm1WRNNKKv4DwucJsklgeeYAAAAAElFTkSuQmCC" />
                                Importar

                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="margenProgramacion">
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
}

export default GestionFichas;