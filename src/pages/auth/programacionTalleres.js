import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./admin.css";

const ProgramacionTalleres = ({ onDateChange }) => {
    const [selectedDate, setSelectedDate] = useState(null); // Para almacenar la fecha seleccionada
    const [formattedDate, setFormattedDate] = useState(''); // Para almacenar la fecha formateada (yyyy-MM-dd)
    const [traerTaller, setTraerTaller] = useState([]);

    // Función para formatear la fecha en formato yyyy-MM-dd
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0'); // Obtener el día
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtener el mes
        const year = date.getFullYear(); // Obtener el año
        return `${year}-${month}-${day}`; // Formato yyyy-MM-dd
    };

    // Manejar el cambio de fecha
    const handleDateChange = (date) => {
        setSelectedDate(date);
        const formatted = formatDate(date); // Formatear la fecha
        setFormattedDate(formatted); // Actualizar el estado con la fecha formateada
        sendDateToBackend(formatted); // Enviar la fecha formateada al backend
    };

    // Función para enviar la fecha formateada al backend
    const sendDateToBackend = async (date) => {
        try {
            const response = await axios.post("http://localhost:8000/fechaSeleccionada", {
                dia: date, // Envía la fecha en formato yyyy-MM-dd
            });
            console.log("Respuesta del backend:", response.data);
            setTraerTaller(response.data);
        } catch (error) {
            console.error("Error al enviar la fecha al backend:", error);
        }
    };

    return (
        <div className="agd-container">
            <Navbar />
            <div className="container">
                <h2 className="mb-4 text-center h2A">Programación Talleres</h2>
            </div>

            <div className="calendar-container">
                <h3>Seleccione una fecha (pasada o actual):</h3>
                <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    maxDate={new Date()} // No permite seleccionar una fecha futura
                    dateFormat="yyyy-MM-dd" // Mostrar la fecha en formato yyyy-MM-dd
                    inline
                />
                {formattedDate && (
                    <p>
                        Fecha seleccionada: <strong>{formattedDate}</strong>
                    </p>
                )}
            </div>


            <PiePagina />
        </div>
    );
};

export default ProgramacionTalleres;
