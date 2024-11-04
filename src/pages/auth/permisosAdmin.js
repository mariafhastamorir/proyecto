import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';
import "./admin.css";
import axios from 'axios';

const AdminPermisos = () => {
    const [usuariosPendientes, setUsuariosPendientes] = useState([]);
    const [mensaje, setMensaje] = useState('');
  
    // Obtener usuarios pendientes al cargar el componente
    useEffect(() => {
      const fetchUsuariosPendientes = async () => {
        try {
          const response = await axios.get('http://localhost:8000/usuarios/pendientes');
          setUsuariosPendientes(response.data);
        } catch (error) {
          console.error("Error al cargar usuarios pendientes:", error);
        }
      };
  
      fetchUsuariosPendientes();
    }, []);
  
    // Aprobar o rechazar un usuario
    const actualizarEstadoUsuario = async (idUsuario, nuevoEstado) => {
        try {
            console.log(`Actualizando estado del usuario ${idUsuario} a ${nuevoEstado}`);
            const response = await axios.put(`http://localhost:8000/usuarios/${idUsuario}/estado`, null, {
                params: { estado: nuevoEstado }
            });
    
            console.log('Respuesta del servidor:', response.data);
            setMensaje(response.data.message);
            setUsuariosPendientes(usuariosPendientes.filter(user => user.idUsuario !== idUsuario));
        } catch (error) {
            console.error("Error al actualizar el estado del usuario:", error);
            setMensaje("Error al actualizar el estado del usuario");
        }
    };
    
  
    return (
      <div>
        <Navbar />
        <div className="container">
        <h1 className='h1'>Administración de Permisos</h1>
        {mensaje && <p>{mensaje}</p>}

        <div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosPendientes.length > 0 ? (
              usuariosPendientes.map((usuario) => (
                <tr key={usuario.idUsuario}>
                  <td>{usuario.idUsuario}</td>
                  <td>{`${usuario.nombres} ${usuario.apellidos}`}</td>
                  <td>{usuario.correoUsuario}</td>
                  <td>{usuario.idRol === 1 ? 'Administrador' : usuario.idRol === 2 ? 'Coordinador' : 'Usuario'}</td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => actualizarEstadoUsuario(usuario.idUsuario, 'aprobado')}
                    >
                      Aprobar
                    </button>
                    <button
                      className="btn btn-danger butonrechazar"
                      onClick={() => actualizarEstadoUsuario(usuario.idUsuario, 'denegado')}
                    >
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No hay usuarios pendientes.</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
      <PiePagina/>
      </div>
    );
  };
  
  export default AdminPermisos;