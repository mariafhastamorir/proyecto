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
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        navigate('/', { replace: true });
    };

    const [coordinaciones, setCoordinaciones] = useState([]);

    useEffect(() => {
        // Llama al endpoint para obtener las coordinaciones
        axios.get('http://localhost:8000/getCoordinacion')
            .then(response => {
                setCoordinaciones(response.data);
            })
            .catch(error => {
                console.error("Error fetching coordinations:", error);
            });
    }, []);

    return (
        
        <div className='agd-container'>
            <Navbar handleLogout={handleLogout} />
            <div className="container mt-4">
                <h2 className="mb-4 text-center h2A">Agendar Taller</h2>
            </div>
            <div>
            <label htmlFor="coordinacion">Coordinación</label>
            <select id="coordinacion" name="coordinacion">
                <option value="">Selecciona una coordinación</option>
                {coordinaciones.map((coordinacion) => (
                    <option key={coordinacion.id} value={coordinacion.id}>
                        {coordinacion.nombre} {/* Cambia "nombre" por el atributo correcto */}
                    </option>
                ))}
            </select>
        </div>

            <PiePagina />
        </div>
    );
};

export default AgendarTaller;