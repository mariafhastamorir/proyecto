import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./admin.css";

const ProgramacionTalleres = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [formattedDate, setFormattedDate] = useState('');
    const [traerTaller, setTraerTaller] = useState([]);
    const [message, setMessage] = useState('');

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formatted = formatDate(date);
        setFormattedDate(formatted);
        sendDateToBackend(formatted);
    };

    const sendDateToBackend = async (date) => {
        try {
            const response = await axios.post("http://localhost:8000/fechaSeleccionada", { dia: date });
            console.log("Respuesta del backend:", response.data);
            setMessage(response.data.message); // Actualiza el mensaje
            setTraerTaller(response.data.data || []); // Guarda los talleres, o una lista vacía si no hay
        } catch (error) {
            console.error("Error al enviar la fecha al backend:", error);
            setMessage("Error al cargar los talleres."); // Muestra un mensaje de error
        }
    };

    const imprimir = () => {
        if (window.print) {
            window.print();
        } else {
            alert("La función de impresión no está soportada por su navegador.");
        }
    };

    return (
        <div className="agd-container">
            <Navbar />
            <div className="container">
                <h2 className="mb-4 text-center h2A">Programación Talleres</h2>
            </div>

            <div onClick={imprimir} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            Imprimir
        </div>
    
        
    

            <div className="calendar-container">
                <h3>Seleccione una fecha (pasada o actual):</h3>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    maxDate={new Date()}
                    dateFormat="yyyy-MM-dd"
                    inline
                />
                {formattedDate && (
                    <p>
                        Fecha seleccionada: <strong>{formattedDate}</strong>
                    </p>
                )}
            </div>

            <div className='container'>
                <h2>{message}</h2> {/* Muestra el mensaje del backend */}
                <div className="row talleres">
                    {traerTaller.length > 0 ? (
                        traerTaller.map(taller => (
                            <div key={taller.idTaller} className="col-md-6 mb-4">
                                <div className="taller-card">
                                    <h3>ID Taller: {taller.idTaller}</h3>
                                    <p><strong>Centro de Formación:</strong> {taller.centroFormacion}</p>
                                    <p><strong>Jornada:</strong> {taller.jornada}</p>
                                    <p><strong>Coordinación:</strong> {taller.coordinacion}</p>
                                    <p><strong>Num Ficha:</strong> {taller.numFicha}</p>
                                    <p><strong>Tema:</strong> {taller.tema}</p>
                                    <p><strong>Fecha y Hora:</strong> {new Date(taller.fechaYHora).toLocaleString()}</p>
                                    <p><strong>Observaciones:</strong> {taller.observaciones}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay talleres programados para la fecha seleccionada.</p>
                    )}
                </div>
            </div>

            <PiePagina />
        </div>
    );
};

export default ProgramacionTalleres;
