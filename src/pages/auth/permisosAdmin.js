import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';
import "./admin.css";
import axios from 'axios';

const Permisos = () => {
    const [solicitudes, setSolicitudes] = useState([]);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        const fetchSolicitudes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/requests');
                setSolicitudes(response.data);
            } catch (error) {
                setMensaje('Error al cargar solicitudes.');
            }
        };

        fetchSolicitudes();
    }, []);

    const handleUpdateStatus = async (usuario_id, estado) => {
        try {
            await axios.post(`http://localhost:8000/admin/permisos/${usuario_id}`, {
                status: estado
            });
            setMensaje(`Estado del usuario actualizado a ${estado}`);
            // Actualizar la lista de solicitudes
            const response = await axios.get('http://localhost:8000/requests');
            setSolicitudes(response.data);
        } catch (error) {
            setMensaje('Error al actualizar estado.');
        }
    };

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <h2>Gestión de Permisos</h2>
                {mensaje && <div className="alert alert-info">{mensaje}</div>}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Tipo Documento</th>
                            <th>Número Documento</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {solicitudes.map(solicitud => (
                            <tr key={solicitud.idUsuario}>
                                <td>{solicitud.tipoDocumento}</td>
                                <td>{solicitud.numeroDocumento}</td>
                                <td>{solicitud.nombres}</td>
                                <td>{solicitud.apellidos}</td>
                                <td>{solicitud.correoUsuario}</td>
                                <td>{solicitud.idRol}</td>
                                <td>
                                    <button
                                        className="btn btn-success me-2"
                                        onClick={() => handleUpdateStatus(solicitud.idUsuario, 'aprobado')}
                                    >
                                        Aprobar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleUpdateStatus(solicitud.idUsuario, 'denegado')}
                                    >
                                        Rechazar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <PiePagina />
        </div>
    );
};

export default Permisos;
