import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import NavbarCordi from '../../components/nabCordi';
import PiePagina from '../../components/piePagina';

const GestionFichas = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const turno = queryParams.get('turno') || 'diurna';

    const [selectedOption1, setSelectedOption1] = useState('');
    const [selectedOption2, setSelectedOption2] = useState('');
    const [selectedOption3, setSelectedOption3] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSearch = () => {
        if (!selectedOption1 && !selectedOption2 && !selectedOption3) {
            setShowModal(true);
        } else {
            console.log('Buscando instructores para las opciones seleccionadas:', selectedOption1, selectedOption2, selectedOption3);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="fondo">
            <NavbarCordi />
            <div className="container">
                <div className="row">
                    <div className="col-md-5">
                        <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>'" }}>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/coordinador">Gestión fichas</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={`/gestionFichas2?turno=${turno}`}>
                                        {turno.charAt(0).toUpperCase() + turno.slice(1)}
                                    </Link>
                                </li>
                            </ol>
                        </nav>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-5 text-end">
                        <Link to={`/importarFichas?turno=${turno}`}>
                            <button className="butonimportar">
                                <img width={24} height={24} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADM0lEQVR4nO1ZS2sUQRBuo1cVEcGjj3WqJhpBk+meDYH4NopHg48kZqp2EfwBSTSXgOQSb4oe1YuKghg9ai4RJAf1oCdRPBtUvOrJKLV5sNmZ7G5mpye7sB/0ZRe6v6+6XlOtVBNN1B+6KLPN5Jz9HmPWkGv8XGum60rbFlWv8PLuXs0wqhmmNMEvw/gvamnGH5rwhSZ32Mujs6aku8e6N2h2Bwzh+5UIV1hzhuC1z9DX26vWp0reIzyjGb/GJB6+GcKPPrnHrBNvv7xrs2Z4nBRxU7oIb1gj38EAla0Os4bwofi4CdxzYlVDzilDTr9mGDIEk5rxexkBf73B1u2Jk/cDPCgBuPLBMGlycEiNqZaKm42pFj/n9GjCp0LYuoAFy0eS14RvsgF0xt3b5LFdM0wvBTXDhAWfj3SbOc1wXSm1LolzvDw6ZhB2qKQRFbCa8bf4t6p3+DmnJ9LyhBdUvaO7UKTCrrPgNvUPLRU2ImBr8fmCnwfuHpUGTER7EDfbFG6T8H6RIW4p242ZicjzNbjik9L9pDtVtqAZRkMCpEglRD4NAVMl1v9WVYWtkrwhvKtsQof6eXiUFHn5Xf63+yXFpdnHHU6I/CepLdLgxVmmmgzmB9AWFgBnqxVQnG1sLE1wpywBSZURljtRdZ63SN4srnI3UYsA2XjNBfi1uhDjPbsC4Paqg9gwjjRMEDd8GhVoglclAmaTLGTiZsomdIDXwofC4cZpJai1NeLQ5w3TzAkM4buQCHK6VHwRS9lJM95UtmHI6Q8LgJnVxkIxxOrWLb/cavAlIgDHVaPAC+Bkw37UL0JqQMQt/DGM51UjQPdlNkW50vxgC8driYnSRlDnnZ3KBqSErziQJZiJm50EHkNH0WjR3nQ6y+6BclPlwqtL4Byp5kbkMaMwsWZ4lspwd1m7TPC5XLcoIgvjSMKrEicmh8dN4J5emDONSEEsP+VGewIEnQwbNeEDi+3yhEptblrhNla5PnjsHlVpQnxZHugM49uYpGVEP+3l4GLqj3ylyA46WPBxgpeG8Ge5GJmPAxhKbU4aB94Abu1g3Kfz6MtDd+elzG55LIm1WRNNKKv4DwucJsklgeeYAAAAAElFTkSuQmCC"/>
                                Importar

                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row justify-content-center g-4">

                    <div className="col-md-4">
                        <div className="card-custom">
                            <label>Seleccione Coordinación 1: </label>
                            <input type="text" className="filter-input mb-2" placeholder="Buscar..." />
                            <select className="form-select" aria-label="Default select example" required
                                value={selectedOption1}
                                onChange={(e) => setSelectedOption1(e.target.value)}>
                                <option value="">Seleccionar...</option>
                                <option value="1">Teleinformática</option>
                                <option value="2">Mercadeo</option>
                                <option value="3">Logística</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-custom">
                            <label>Seleccione Coordinación 2: </label>
                            <input type="text" className="filter-input mb-2" placeholder="Buscar..." />
                            <select className="form-select" aria-label="Default select example" required
                                value={selectedOption2}
                                onChange={(e) => setSelectedOption2(e.target.value)}>
                                <option value="">Seleccionar...</option>
                                <option value="1">ADSO</option>
                                <option value="2">Videojuegos</option>
                                <option value="3">Sistemas</option>
                            </select>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card-custom">
                            <label>Seleccione Coordinación 3: </label>
                            <input type="text" className="filter-input mb-2" placeholder="Buscar..." />
                            <select className="form-select" aria-label="Default select example" required
                                value={selectedOption3}
                                onChange={(e) => setSelectedOption3(e.target.value)}>
                                <option value="">Seleccionar...</option>
                                <option value="1">2898754</option>
                                <option value="2">2470719</option>
                                <option value="3">2898745</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center mt-5">
                <button type="button" className="btn boton-modal btnBusc" onClick={handleSearch}>
                    <p><img width="40" height="40" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClklEQVR4nL1Vz2sTURBeVLSiPXgRWpEibUmzM4k3UTzUXwexkO6bsHgRe1VaWmz1XPRvEdQUpaJkJrnEH4WeCtJU0PoviGK9+AMbmbcbm9TsdrcGBx7svn1vv/m++d48x4kIX9whYrhjBB6R4Gsd+mwEbus351+DqtlhEnxMjJsk2Og4GDeJcWHXgCToGcavwQ9hlRhmipyFa5X8IR36rHPEUA9BNzzOjacHEfxFgt9I4Ob8vLMnaq1f8vcadieN4HfdkxhM5QqZKMj5pMmZintBwZRZIhltTQQbHuONpCDNIMGpsG4Lzo7Ft4WH1Ti5YmUUXNN/eGUYjFyodg0yghl9H3ueO5IWzFTcW6E55iIXkUBJF/ll1w3f743WRvelA8qj/sMwPowBsoexUVjM9NpNDC91YxqgwmKm1wIJvEoOJPDOMNzdFRDjUuSisMVsScdQJYbPppI/mlY6inPedjOoxcPO8GKiNtCTygyMs05889TeBXW1ql9y9xPjmxBsOdayzh97v7VdpZodjs1IKQcau5N287OTx0hgJZiDH8RwnwSueuKeMjzS18aGcTpM6smO1C0rwQ1tJ8Vy7qLOqcWNwPWga8CyHgNNxC+dPriVYO6SJqLty6/kTzhJQhuj0g9715RKEisX47RlG9Tmo8d4RhlfLg8dSASmzIIzgWtaZHWUX3MP67DuYpzVmoRrvpDAp/a7Curb5Y2WUWsWc/EF1wmUxgWOFxnO/f1dz2ICMMuuDIPau4jxgb3GGZc0AWXZ6kSqwNnOCcH7QjXT73QrJmoDPS03bjszxnV1cNfADI/0qVz/BaxQzfRHgZHg064BOU0wxvUO9VrpKpCGymQYP7TY/adhHOs6UBNM5bJtrIxXdPI3h6rp/8oovdgAAAAASUVORK5CYII=" />
                        Buscar
                    </p>
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="container-modal sopcionc">
                    <div className="content-modal">
                        <h2 className="h22">Por favor seleccione una opción</h2>
                        <div className="btn-cerrar">
                            <button className="btn-cerrar btnOkk" onClick={handleCloseModal}>OK</button>
                        </div>
                    </div>
                </div>
            )}

            <PiePagina />

        </div>
    );
}

export default GestionFichas;