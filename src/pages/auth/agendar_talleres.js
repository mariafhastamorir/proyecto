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
    const [selectedDate, setSelectedDate] = useState(null);
    const [taller, setTaller] = useState({
        centroFormacion: '',
        jornada: '',
        coordinacion: '',
        ficha: '',
        horaDisponible: '',
        tema: '',
        profesional: '',
        observaciones: '',
    });

    const handleInputChange = (e) => {
        setTaller({ ...taller, [e.target.name]: e.target.value });
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            ...taller,
            fechaTaller: selectedDate,
        };

        // Llamada al API para guardar el taller
        axios.post('http://localhost:4000/talleres', data)
            .then(response => {
                navigate('/agendado', { state: { taller: data } });
            })
            .catch(error => {
                console.error('Hubo un error al guardar el taller', error);
            });
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

            {/*Navbar*/}
            <Navbar handleLogout={handleLogout} />

            <div className="container mt-4">
                <h2 className="mb-4 text-center h2A">Agendar Taller</h2>

                <Form onSubmit={handleSubmit} className='agendamiento'>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="centroFormacion">
                            <Form.Label>1. Centro de Formación</Form.Label>
                            <Form.Select className='opcion' name="centroFormacion" onChange={handleInputChange} required>
                                <option value="">Seleccione el Centro de Formación</option>
                                <option value="calle52">Sede Calle 52</option>
                                <option value="calle64">Sede Calle 64</option>
                                <option value="fontibon">Sede Fontibón</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="jornada">
                            <Form.Label>2. Jornada</Form.Label>
                            <Form.Select className='opcion' name="jornada" onChange={handleInputChange} required>
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
                            <Form.Select className='opcion' name="coordinacion" onChange={handleInputChange} required>
                                <option value="">Seleccione Coordinación</option>
                                <option value="teleinformatica">Teleinformática</option>
                                <option value="mercadeo">Mercadeo</option>
                                <option value="logistica">Logística</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="ficha">
                            <Form.Label>4. Ficha</Form.Label>
                            <Form.Select className='opcion' name="ficha" onChange={handleInputChange} required>
                                <option value="">Seleccione Ficha</option>
                                <option value="2898754">2898754</option>
                                <option value="2470719">2470719</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="horaDisponible">
                            <Form.Label>5. Hora Disponible</Form.Label>
                            <Form.Select className='opcion' name="horaDisponible" onChange={handleInputChange} required>
                                <option value="">Seleccione Hora</option>
                                <option value="13:00">1:00pm</option>
                                <option value="13:30">1:30pm</option>
                                <option value="15:30">3:30pm</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="tema">
                            <Form.Label>6. Tema</Form.Label>
                            <Form.Select className='opcion' name="tema" onChange={handleInputChange} required>
                                <option value="">Seleccione Tema</option>
                                <option value="teatro">Teatro</option>
                                <option value="musica">Música</option>
                                <option value="danza">Danza</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="profesional">
                            <Form.Label>7. Profesional</Form.Label>
                            <Form.Select className='opcion' name="profesional" onChange={handleInputChange} required>
                                <option value="">Seleccione Profesional</option>
                                <option value="sebastianRamirez">Sebastián Ramírez</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="fechaTaller">
                            <Form.Label>8. Fecha </Form.Label>
                            <br></br>
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                className="form-control opcion"
                                required
                            />
                        </Form.Group>
                    </Row>

                    <Form.Group className="mb-3" controlId="observaciones">
                        <Form.Label>9. Observaciones</Form.Label>
                        <Form.Control className='opcion'
                            type="text"
                            name="observaciones"
                            value={taller.observaciones}
                            onChange={handleInputChange}
                        />
                    </Form.Group>

                    <Button variant="success" type="submit" className="w-100">Guardar Taller</Button>
                </Form>
            </div>
            <PiePagina />
        </div>
    );
};

export default AgendarTaller;   