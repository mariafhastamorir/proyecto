import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';

import "./admin.css";

const AgendarTaller = () => {
    const [centroFormacion, setcentroFormacion] = useState('');
    const [jornada, setjornada] = useState('');

    const [selectedCoordinacion, setSelectedCoordinacion] = useState("");
    const [coordinaciones, setCoordinaciones] = useState([]);

    const [selectedNumFicha, setSelectedNumFicha] = useState("");
    const [numFichaOptions, setNumFichaOptions] = useState([]);

    const [selectedTematica, setSelectedTematica] = useState("");
    const [tematica, setTematica] = useState([]);

    const [profesionales, setProfesionales] = useState([]); // Estado para almacenar los profesionales
    const [selectedProfesional, setSelectedProfesional] = useState(""); // Estado para almacen

    const [fechaYHora, setfechaYHora] = useState(null); // Estado para fecha y hora (inicial null)

    const [observaciones, setobservaciones] = useState('');

    
    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    
    // Obtener las coordinaciones al cargar el componente
    useEffect(() => {
        const fetchCoordinaciones = async () => {
            try {
                const response = await axios.get('http://localhost:8000/getCoordinaciones');
                setCoordinaciones(response.data);
            } catch (error) {
                console.error("Error al obtener coordinaciones:", error);
            }
        };

        const fetchNumFichaOptions = async () => {
            try {
              const response = await axios.get('http://localhost:8000/getNumFicha'); // Adapta la URL según tu backend
              setNumFichaOptions(response.data);
            } catch (error) {
              console.error("Error al obtener opciones de numFicha:", error);
            }
          };

        const fetchTematica = async () => {
            try {
                const response = await axios.get('http://localhost:8000/getTematica');
                setTematica(response.data); // Aquí debería ser setTematica
            } catch (error) {
                console.error("Error al obtener temáticas:", error);
            }
        };

        const fetchProfesionales = async () => {
            try {
                const response = await axios.get('http://localhost:8000/getProfesionales');
                setProfesionales(response.data);
            } catch (error) {
                console.error("Error al obtener profesionales:", error);
            }
        };
          

        fetchCoordinaciones();
        fetchNumFichaOptions();
        fetchTematica();
        fetchProfesionales();
    }, []);

    const handleCoordinacionChange = (e) => {
        setSelectedCoordinacion(e.target.value); // Asegúrate de que el valor almacenado sea el valor de texto correcto
    };

    const handleNumFichaChange = (e) => {
        setSelectedNumFicha(e.target.value);
    };

    const handleTematicaChange = (e) => {
        setSelectedTematica(e.target.value); // Este valor debería ser el nombre correcto de la temática
    };    

    const handleProfesionalChange = (e) => {
        setSelectedProfesional(e.target.value);
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fechaYHoraDate = new Date(fechaYHora);
        if (isNaN(fechaYHoraDate.getTime())) {
        setError("La fecha y hora son inválidas.");
        return;
        }
        
        const taller = {
            centroFormacion,
            jornada,
            coordinacion: selectedCoordinacion,
            numFicha: selectedNumFicha,
            tema: selectedTematica,
            // Asegúrate de que esto se convierta a un string en formato ISO
            fechaYHora: fechaYHoraDate.toISOString(),
            observaciones,
        };
        console.log("Datos de taller enviados:", taller); // Imprime el objeto taller
        console.log("Fecha y hora como string:", taller.fechaYHora); // Imprime el string de fecha
        
        try {
            await axios.post('http://localhost:8000/Creartaller', taller);
            setIsSubmitted(true);
            console.log("Taller agendado exitosamente");
        } catch (error) {
            console.error("Error al agendar taller", error);
            if (error.response) {
                setError("Error: " + (error.response.data.detail || "Error desconocido"));
            } else {
                setError("Error de red: Verifica tu conexión y la URL del servidor.");
            }
        }
    };
         
    
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        navigate('/', { replace: true });
    };

    return (
        <div className='agd-container'>
            <Navbar handleLogout={handleLogout} />
            <div className="container mt-4">
                <h2 className="mb-4 text-center h2A">Agendar Taller</h2>

                <Form onSubmit={handleSubmit} className='agendamiento'>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="centroFormacion">
                            <Form.Label>1. Centro de Formación</Form.Label>
                            <Form.Select className='opcion' name="centroFormacion" onChange={(e) => setcentroFormacion(e.target.value)}>
                                <option value="">Seleccione el Centro de Formación</option>
                                <option value="calle52">Sede Calle 52</option>
                                <option value="calle64">Sede Calle 64</option>
                                <option value="fontibon">Sede Fontibón</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="jornada">
                            <Form.Label>2. Jornada</Form.Label>
                            <Form.Select className='opcion' name="jornada" onChange={(e) => setjornada(e.target.value)}>
                                <option value="">Seleccione la Jornada</option>
                                <option value="mixta">Mixta</option>
                                <option value="diurna">Diurna</option>
                                <option value="noche">Noche</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                    <Form.Group as={Col} controlId="coordinacion">
                        <Form.Label>3. Coordinación</Form.Label>
                        <Form.Select
                            className="opcion"
                            id="coordinacion"
                            value={selectedCoordinacion}
                            onChange={handleCoordinacionChange}
                            >
                            <option value="">Seleccione una coordinación</option>
                            {coordinaciones.map((coordinacion) => (
                                <option key={coordinacion.idCoordinacion} value={coordinacion.nombreCoordinacion}>
                                {coordinacion.nombreCoordinacion}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} controlId="ficha">
                            <Form.Label>4. Ficha</Form.Label>
                            <Form.Select
                                className="opcion"
                                id="ficha"
                                value={selectedNumFicha}
                                onChange={handleNumFichaChange}
                                >
                                <option value="">Seleccione un número de ficha</option>
                                {numFichaOptions.map((ficha) => (
                                    <option key={ficha.idFicha} value={ficha.numFicha}>
                                    {ficha.numFicha}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">
                    <Form.Group as={Col} controlId="tema">
                        <Form.Label>6. Tema</Form.Label>
                        <Form.Select
                            className="opcion"
                            id="tema"
                            value={selectedTematica}
                            onChange={handleTematicaChange}
                        >
                            <option value="">Seleccione la temática</option>
                            {tematica.map((tematicas) => (
                                <option key={tematicas.idTematicas} value={tematicas.tema}> {/* Usa tematicas.tema */}
                                    {tematicas.tema}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                        <Form.Group as={Col} controlId="horaDisponible">
                            <Form.Label>5. Fecha y Hora</Form.Label>
                            <br/>
                            <DatePicker
                                selected={fechaYHora}
                                onChange={(date) => setfechaYHora(date)}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="Pp"
                                minDate={new Date()} // Solo permite fechas desde hoy en adelante
                                filterTime={(time) => {
                                    const hour = time.getHours();
                                    return hour >= 7 && hour <= 21; // Solo permite horas entre 7 y 21 (9 pm)
                                }}
                                className='form-select'
                                placeholderText="Seleccione fecha y hora"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="col-md-6">
                    <Form.Group as={Col} controlId="profesional">
                        <Form.Label>7. Profesional</Form.Label>
                        <Form.Select
                            className="opcion"
                            id="profesional"
                            value={selectedProfesional}
                            onChange={handleProfesionalChange}
                        >
                            <option value="">Seleccione un profesional</option>
                            {profesionales.length > 0 ? (
                                profesionales.map((profesional) => (
                                    <option key={profesional.idUsuario} value={profesional.idUsuario}>
                                        {profesional.nombres} {profesional.apellidos}
                                    </option>
                                ))
                            ) : (
                                <option value="">No hay profesionales disponibles</option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    </Row>

                    <Form.Group className="mb-3" controlId="observaciones">
                        <Form.Label>9. Observaciones</Form.Label>
                        <Form.Control className='opcion'
                            type="text"
                            name="observaciones"
                            onChange={(e) => setobservaciones(e.target.value)}
                        />
                    </Form.Group>
                    

                    {error && <p className="text-danger">{error}</p>}

                    <Button variant="success" type="submit" className="w-100">Guardar Taller</Button>
                </Form>
            </div>
            <PiePagina />
        </div>
    );
};

export default AgendarTaller;