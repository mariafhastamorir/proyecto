import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';
import axios from 'axios';
import "./admin.css";
import Modal from '../../components/modal';

const Consultar_instru = () => {
    const [selectedCoordinacion, setSelectedCoordinacion] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedCoordinacion) {
            setShowModal(true); // Mostrar el modal si no se selecciona una coordinación
            return;
        }

        console.log('Selected coordinacion:', selectedCoordinacion);

        axios.post('http://localhost:8000/coordinacionselecionada', {
            coordinacionInstru: selectedCoordinacion,
        })
            .then((response) => {
                console.log('Response from backend:', response.data);
                setUsuarios(response.data); // Guardar los usuarios en el estado
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <Navbar />
            <main className="container text-center">
                <h1 className="hh1">Consultar Instructores</h1>
                <div className="row justify-content-center mb-4">
                    <div className="col-auto">
                        <form className="d-inline-flex" onSubmit={handleSubmit}>
                            <select className="temas" value={selectedCoordinacion} onChange={(e) => setSelectedCoordinacion(e.target.value)}>
                                <option value="">Coordinación</option>
                                <option value="logistica">Logística</option>
                                <option value="mercadeo">Mercadeo</option>
                                <option value="teleinformática e industrias creativas">Teleinformática e industrias creativas</option>
                            </select>

                            <button className="btnBus ms-2" type="submit" >
                                <img width={30} height={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClklEQVR4nL1Vz2sTURBeVLSiPXgRWpEibUmzM4k3UTzUXwexkO6bsHgRe1VaWmz1XPRvEdQUpaJkJrnEH4WeCtJU0PoviGK9+AMbmbcbm9TsdrcGBx7svn1vv/m++d48x4kIX9whYrhjBB6R4Gsd+mwEbus351+DqtlhEnxMjJsk2Og4GDeJcWHXgCToGcavwQ9hlRhmipyFa5X8IR36rHPEUA9BNzzOjacHEfxFgt9I4Ob8vLMnaq1f8vcadieN4HfdkxhM5QqZKMj5pMmZintBwZRZIhltTQQbHuONpCDNIMGpsG4Lzo7Ft4WH1Ti5YmUUXNN/eGUYjFyodg0yghl9H3ueO5IWzFTcW6E55iIXkUBJF/ll1w3f743WRvelA8qj/sMwPowBsoexUVjM9NpNDC91YxqgwmKm1wIJvEoOJPDOMNzdFRDjUuSisMVsScdQJYbPppI/mlY6inPedjOoxcPO8GKiNtCTygyMs05889TeBXW1ql9y9xPjmxBsOdayzh97v7VdpZodjs1IKQcau5N287OTx0hgJZiDH8RwnwSueuKeMjzS18aGcTpM6smO1C0rwQ1tJ8Vy7qLOqcWNwPWga8CyHgNNxC+dPriVYO6SJqLty6/kTzhJQhuj0g9715RKEisX47RlG9Tmo8d4RhlfLg8dSASmzIIzgWtaZHWUX3MP67DuYpzVmoRrvpDAp/a7Curb5Y2WUWsWc/EF1wmUxgWOFxnO/f1dz2ICMMuuDIPau4jxgb3GGZc0AWXZ6kSqwNnOCcH7QjXT73QrJmoDPS03bjszxnV1cNfADI/0qVz/BaxQzfRHgZHg064BOU0wxvUO9VrpKpCGymQYP7TY/adhHOs6UBNM5bJtrIxXdPI3h6rp/8oovdgAAAAASUVORK5CYII=" />
                                Buscar
                            </button>
                        </form>
                    </div>
                </div>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Documento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.length > 0 ? (
                            usuarios.map((usuario) => (
                                <tr key={usuario.idUsuario}>
                                    <td>{usuario.nombres} {usuario.apellidos}</td>
                                    <td>{usuario.numeroDocumento}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2">No hay instructores de la Coordinación.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </main>
            <PiePagina />

            {/* Modal personalizado */}
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)} // Cerrar el modal
                title="Advertencia"
            >
                <p>Por favor, seleccione una coordinación antes de continuar.</p>
                <button onClick={() => setShowModal(false)}>Aceptar</button>
            </Modal>
        </div>
    );
};

export default Consultar_instru;
