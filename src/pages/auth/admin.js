import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';
import "./admin.css";

const ImagesB = require.context('../../assets', true);

const Admin = () => {
    const navigate = useNavigate();
    
    const handleLogout = () => {
        // Eliminar los datos de sesión almacenados en localStorage
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');

        // Redirigir al usuario a la página de inicio de sesión
        navigate('/', { replace: true });
    };

    const [talleres, setTalleres] = useState([]);
    const [message, setMessage] = useState(null); // Para manejar el mensaje de la respuesta
    const [error, setError] = useState(null); // Estado para manejar errores

    useEffect(() => {
        const fetchTalleres = async () => {
            try {
                const response = await axios.get("http://localhost:8000/buscarTalleres");
                console.log(response.data); // Para verificar la respuesta
                
                if (response.data.data) {
                    setTalleres(response.data.data); // Asigna los talleres si existen
                }
                
                setMessage(response.data.message); // Asigna el mensaje de la respuesta

            } catch (error) {
                console.error("Error al obtener los talleres:", error); // Esto te mostrará más detalles del error
                setError("No se pudieron cargar los talleres. Por favor, intenta más tarde.");
            }
        };
        
        fetchTalleres();
    }, []);

    return (
        <div className="admin-container">
            <Navbar handleLogout={handleLogout} />

            <div className='container'>
                <h2 className='h2A'>Talleres de hoy</h2>
                {error && <div className="alert alert-danger">{error}</div>} {/* Mostrar error si hay */}
                <div className="row talleres">
                    {talleres.length === 0 ? (  // Verificar si no hay talleres
                        <p>{message}</p> // Muestra el mensaje de la respuesta
                    ) : (
                        talleres.map(taller => (
                            <div key={taller.idTaller} className="col-md-6 mb-4 taller-card">
                                <h3>ID Taller: {taller.idTaller}</h3>
                                <p><strong>Fecha:</strong> {new Date(taller.fechaYHora).toLocaleDateString()}</p>
                                <p><strong>Hora:</strong> {new Date(taller.fechaYHora).toLocaleTimeString()}</p>
                                <p><strong>Temática:</strong> {taller.tema}</p>
                                <p><strong>ID Profesional:</strong> {taller.idProfesional}</p>
                                <p><strong>Nombre Profesional:</strong> {taller.nombre_profesional}</p>
                                <p><strong>Num Ficha:</strong> {taller.numFicha}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <PiePagina />
        </div>
    );
};

export default Admin;
