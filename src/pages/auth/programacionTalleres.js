import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2pdf from 'html2pdf.js';
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
            setMessage(response.data.message);
            setTraerTaller(response.data.data || []);
        } catch (error) {
            setMessage("Error al cargar los talleres.");
        }
    };

    // Función para generar el PDF
    const generatePDF = () => {
        // Forzar actualización del DOM antes de generar el PDF
        setTimeout(() => {
            const content = document.getElementById('pdf-content'); // Contenedor del contenido del PDF
            const options = {
                margin: 1,
                filename: 'reporte-talleres.pdf',
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
            };

            html2pdf().set(options).from(content).save();
        }, 100); // Agregar un pequeño retraso para asegurarse de que el DOM se actualice
    };

    console.log(traerTaller); // Verifica los datos antes de generar el PDF


    return (
        <div className="agd-container">
            <Navbar />
            <div className="container">
                <h2 className="mb-4 text-center h2A">Programación Talleres</h2>
            </div>

            {/* Calendario */}
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

            {/* Botón de generar PDF */}
            <div
                onClick={generatePDF}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
                Generar Reporte en PDF
            </div>

            {/* Contenedor de PDF (oculto o visible según sea necesario) */}
            <div id="pdf-content" style={{ display: 'block' }}>

                <h2>Reporte de Talleres</h2>
                <p>Fecha seleccionada: <strong>{formattedDate}</strong></p>
                {traerTaller.length > 0 ? (
                    traerTaller.map(taller => (
                        <div key={taller.idTaller} className="taller-card" style={{ border: '1px solid #ccc', marginBottom: '10px', padding: '10px' }}>
                            <h3>ID Taller: {taller.idTaller}</h3>
                            <p><strong>Centro de Formación:</strong> {taller.centroFormacion}</p>
                            <p><strong>Jornada:</strong> {taller.jornada}</p>
                            <p><strong>Coordinación:</strong> {taller.coordinacion}</p>
                            <p><strong>Num Ficha:</strong> {taller.numFicha}</p>
                            <p><strong>Tema:</strong> {taller.tema}</p>
                            <p><strong>Fecha y Hora:</strong> {new Date(taller.fechaYHora).toLocaleString()}</p>
                            <p><strong>Observaciones:</strong> {taller.observaciones}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay talleres programados para la fecha seleccionada.</p>
                )}
            </div>
            <PiePagina />
        </div>
    );
};

export default ProgramacionTalleres;
