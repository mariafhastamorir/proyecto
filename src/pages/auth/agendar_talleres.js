import React, { useState } from 'react';
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
    const [coordinacion, setcoordinacion] = useState('');
    const [numFicha, setnumFicha] = useState('');
    const [tema, settema] = useState('');
    const [fechaYHora, setfechaYHora] = useState(null); // Estado para fecha y hora (inicial null)
    const [observaciones, setobservaciones] = useState('');

    const [idUsuario, setidUsuario] = useState('');

    const [error, setError] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8000/taller', {
                taller: {
                    centroFormacion,
                    jornada,
                    coordinacion,
                    numFicha,
                    tema: parseInt(tema),  // Asegúrate de enviar el ID del tema
                    fechaYHora: fechaYHora.toISOString(),
                    observaciones
                },
                idUsuario: parseInt(idUsuario)  // Enviar idUsuario como parte del cuerpo
            });
            console.log(response.data);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error:", error);
            setError("Error al agendar taller");
        }
    };
    
    const navigate = useNavigate();

    const handleLogout = () => {
        // Eliminar los datos de sesión almacenados en localStorage
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');

        // Redirigir al usuario a la página de inicio de sesión
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
                                <option value="manana">Mañana</option>
                                <option value="diurna">Diurna</option>
                                <option value="noche">Noche</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="coordinacion">
                            <Form.Label>3. Coordinación</Form.Label>
                            <Form.Select className='opcion' name="coordinacion" onChange={(e) => setcoordinacion(e.target.value)}>
                                <option value="">Seleccione Coordinación</option>
                                <option value="teleinformatica">Teleinformática</option>
                                <option value="mercadeo">Mercadeo</option>
                                <option value="logistica">Logística</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="ficha">
                            <Form.Label>4. Ficha</Form.Label>
                            <Form.Select className='opcion' name="ficha" onChange={(e) => setnumFicha(e.target.value)}>
                                <option value="">Seleccione Ficha</option>
                                <option value="2898754">2898754</option>
                                <option value="2470719">2470719</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="tema">
                            <Form.Label>6. Tema</Form.Label>
                            <Form.Select className='opcion' name="tema" onChange={(e) => settema(e.target.value)}>
                                <option value="">Seleccione Tema</option>
                                <option value="1">derechos sexuales y reproductivos</option> {/* ID 1 */}
                                <option value="2">autocuidado</option> {/* ID 2 */}
                                <option value="3">habilidades blandas</option> {/* ID 3 */}
                                <option value="4">talleres de deporte</option> {/* ID 4 */}
                                <option value="5">talleres de cultura</option> {/* ID 5 */}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="horaDisponible">
                            <Form.Label>5. Fecha y Hora</Form.Label>
                            <br/>
                            <DatePicker
                                selected={fechaYHora}
                                onChange={(date) => setfechaYHora(date)} // Almacenar la fecha seleccionada
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={30}
                                dateFormat="Pp"
                                className='form-select'
                                placeholderText="Seleccione fecha y hora"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="col-md-6">
                        <Form.Group as={Col} controlId="profesional">
                            <Form.Label>7. Profesional</Form.Label>
                            <Form.Select className='opcion' name="profesional" onChange={(e) => setidUsuario(e.target.value)}>
                                <option value="">Seleccione Profesional</option>
                                <option value="23">Sebastián Ramírez</option>
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
