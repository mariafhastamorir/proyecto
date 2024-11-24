import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';

import "./admin.css";

const Agendado = () => {
    const location = useLocation();
    const { taller } = location.state || {};

    const handleAceptar = () => {
        navigate('/talleres'); // Redirige al inicio
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
        <div className="agendado">
            <Navbar />
            <div className='container'>
                <h2 className="h2A">Confirmación de Taller</h2>
                {taller ? (
                    <>
                        <Table striped bordered hover className='confagen'>
                            <tbody>
                                <tr>
                                    <th>Tema</th>
                                    <td>{taller.tema}</td>
                                </tr>
                                <tr>
                                    <th>Ficha</th>
                                    <td>{taller.ficha}</td>
                                </tr>
                                <tr>
                                    <th>Fecha</th>
                                    <td>{taller.fechaTaller?.toLocaleDateString()}</td>
                                </tr>
                                <tr>
                                    <th>Hora Disponible</th>
                                    <td>{taller.horaDisponible}</td>
                                </tr>
                                <tr>
                                    <th>Centro de Formación</th>
                                    <td>{taller.centroFormacion}</td>
                                </tr>
                                <tr>
                                    <th>Jornada</th>
                                    <td>{taller.jornada}</td>
                                </tr>
                                <tr>
                                    <th>Coordinación</th>
                                    <td>{taller.coordinacion}</td>
                                </tr>
                                <tr>
                                    <th>Observaciones</th>
                                    <td>{taller.observaciones = 'ninguno'}</td>
                                </tr>
                                <tr>
                                    <th>Profesional</th>
                                    <td>{taller.profesional}</td>
                                </tr>
                            </tbody>
                        </Table>
                        <div className="text-center mt-4">
                            <Button className='btnaceptar' onClick={handleAceptar}>Aceptar</Button>
                        </div>
                    </>
                ) : (

                    <p className='pe'>No se encontró información del taller.</p>
                )}
            </div>
            <PiePagina />
        </div>
    )
}

export default Agendado;