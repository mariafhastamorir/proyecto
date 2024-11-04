import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';

const ConsultarFichas = () => {
    const navigate = useNavigate();



    const handleLogout = () => {
        // Eliminar los datos de sesión almacenados en localStorage
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');

        // Redirigir al usuario a la página de inicio de sesión
        navigate('/', { replace: true });
    };

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const turno = queryParams.get('turno') || 'diurna';

    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [selectedOption3, setSelectedOption3] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSearch = () => {
        if (!selectedOption1 && !selectedOption2 && !selectedOption3) {
            setShowModal(true); // Mostrar modal si los filtros están vacíos
        } else {
            console.log('Buscando instructores para las opciones seleccionadas:', selectedOption1, selectedOption2, selectedOption3);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false); // Cerrar el modal
    };

    return (
        <div className="fondo">
            <Navbar />
            <div className="container">
                <h2 className="h2">Consultar Fichas</h2>
                <div className="row">
                    <div className="col-md-5"></div>
                    <div className="col-md-2"></div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row justify-content-center g-4">
                    <div className="col-md-4">
                        <div className="card-custom">
                            <label>Seleccione Coordinación: </label>
                            <input type="text" className="filter-input mb-2" placeholder="Buscar..." />
                            <select className="form-select" value={selectedOption1} onChange={(e) => setSelectedOption1(e.target.value)}>
                                <option value="">Seleccionar...</option>
                                <option value="1">Teleinformática</option>
                                <option value="2">Mercadeo</option>
                                <option value="3">Logística</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-custom">
                            <label>Seleccione Programa:</label>
                            <br></br>
                            <input type="text" className="filter-input mb-2" placeholder="Buscar..." />
                            <select className="form-select" value={selectedOption2} onChange={(e) => setSelectedOption2(e.target.value)}>
                                <option value="">Seleccionar...</option>
                                <option value="1">ADSO</option>
                                <option value="2">Videojuegos</option>
                                <option value="3">Sistemas</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-custom">
                            <label>Seleccione Número de Ficha: </label>
                            <input type="text" className="filter-input mb-2" placeholder="Buscar..." />
                            <select className="form-select" value={selectedOption3} onChange={(e) => setSelectedOption3(e.target.value)}>
                                <option value="">Seleccionar...</option>
                                <option value="1">2898754</option>
                                <option value="2">2470719</option>
                                <option value="3">2898745</option>
                            </select>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <button className="btnBusa" type="button" onClick={handleSearch}>
                            <img width={30} height={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClklEQVR4nL1Vz2sTURBeVLSiPXgRWpEibUmzM4k3UTzUXwexkO6bsHgRe1VaWmz1XPRvEdQUpaJkJrnEH4WeCtJU0PoviGK9+AMbmbcbm9TsdrcGBx7svn1vv/m++d48x4kIX9whYrhjBB6R4Gsd+mwEbus351+DqtlhEnxMjJsk2Og4GDeJcWHXgCToGcavwQ9hlRhmipyFa5X8IR36rHPEUA9BNzzOjacHEfxFgt9I4Ob8vLMnaq1f8vcadieN4HfdkxhM5QqZKMj5pMmZintBwZRZIhltTQQbHuONpCDNIMGpsG4Lzo7Ft4WH1Ti5YmUUXNN/eGUYjFyodg0yghl9H3ueO5IWzFTcW6E55iIXkUBJF/ll1w3f743WRvelA8qj/sMwPowBsoexUVjM9NpNDC91YxqgwmKm1wIJvEoOJPDOMNzdFRDjUuSisMVsScdQJYbPppI/mlY6inPedjOoxcPO8GKiNtCTygyMs05889TeBXW1ql9y9xPjmxBsOdayzh97v7VdpZodjs1IKQcau5N287OTx0hgJZiDH8RwnwSueuKeMjzS18aGcTpM6smO1C0rwQ1tJ8Vy7qLOqcWNwPWga8CyHgNNxC+dPriVYO6SJqLty6/kTzhJQhuj0g9715RKEisX47RlG9Tmo8d4RhlfLg8dSASmzIIzgWtaZHWUX3MP67DuYpzVmoRrvpDAp/a7Curb5Y2WUWsWc/EF1wmUxgWOFxnO/f1dz2ICMMuuDIPau4jxgb3GGZc0AWXZ6kSqwNnOCcH7QjXT73QrJmoDPS03bjszxnV1cNfADI/0qVz/BaxQzfRHgZHg064BOU0wxvUO9VrpKpCGymQYP7TY/adhHOs6UBNM5bJtrIxXdPI3h6rp/8oovdgAAAAASUVORK5CYII=" />
                            Buscar
                        </button>
                    </div>

                    {/* Modal */}
                    {showModal && (
                        <div className="d-flex justify-content-center container-modal sopcionF">
                            <div className="content-modal">
                                <h2 className="h22">Por favor seleccione una opción</h2>
                                <div className="btn-cerrar d-flex justify-content-center">
                                    <button className=" btn-cerrar btnOkF" onClick={handleCloseModal}>OK</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <PiePagina />
        </div>
    );
}

export default ConsultarFichas;
