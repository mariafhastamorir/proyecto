import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarCordi from '../../components/nabCordi';
import PiePagina from '../../components/piePagina';
import "./coordi.css";


const GestionInstru = () => {

    const [selectedOption, setSelectedOption] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSearch = () => {
        if (!selectedOption) {
            setShowModal(true);
        } else {
            console.log('Buscando instructores para la opción:', selectedOption);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (

        <div>
            <NavbarCordi />

            <main className="container text-center">
                <div className="col-md-5 text-end">
                    <Link to={`/importarInstru  `}>
                        <button className="butonimportarinstru">
                            IMPORTAR
                            <img
                                width="24"
                                height="24"
                                src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/external-Import-arrows-tanah-basah-basic-outline-tanah-basah.png"
                                alt="Importar"
                            />
                        </button>
                    </Link>
                </div>
                <h1 className="hh1">Consultar Instructores</h1>
                <div>
                    <div className="row justify-content-center mb-4">
                        <div className="col-auto">
                            <form className="d-inline-flex">
                                <select
                                    id="document-type"
                                    name="document-type"
                                    className="temas"
                                    required
                                    value={selectedOption}
                                    onChange={(e) => setSelectedOption(e.target.value)}>
                                    <option value="">Seleccione Coordinación</option>
                                    <option value="te">Teleinformatica</option>
                                    <option value="mer">Mercadeo</option>
                                    <option value="log">Logistica</option>
                                </select>
                                <div className="justify-content-md-end">
                                    <button className="btnBus bbtn" type="button" onClick={handleSearch}>
                                        <img width={30} height={30} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClklEQVR4nL1Vz2sTURBeVLSiPXgRWpEibUmzM4k3UTzUXwexkO6bsHgRe1VaWmz1XPRvEdQUpaJkJrnEH4WeCtJU0PoviGK9+AMbmbcbm9TsdrcGBx7svn1vv/m++d48x4kIX9whYrhjBB6R4Gsd+mwEbus351+DqtlhEnxMjJsk2Og4GDeJcWHXgCToGcavwQ9hlRhmipyFa5X8IR36rHPEUA9BNzzOjacHEfxFgt9I4Ob8vLMnaq1f8vcadieN4HfdkxhM5QqZKMj5pMmZintBwZRZIhltTQQbHuONpCDNIMGpsG4Lzo7Ft4WH1Ti5YmUUXNN/eGUYjFyodg0yghl9H3ueO5IWzFTcW6E55iIXkUBJF/ll1w3f743WRvelA8qj/sMwPowBsoexUVjM9NpNDC91YxqgwmKm1wIJvEoOJPDOMNzdFRDjUuSisMVsScdQJYbPppI/mlY6inPedjOoxcPO8GKiNtCTygyMs05889TeBXW1ql9y9xPjmxBsOdayzh97v7VdpZodjs1IKQcau5N287OTx0hgJZiDH8RwnwSueuKeMjzS18aGcTpM6smO1C0rwQ1tJ8Vy7qLOqcWNwPWga8CyHgNNxC+dPriVYO6SJqLty6/kTzhJQhuj0g9715RKEisX47RlG9Tmo8d4RhlfLg8dSASmzIIzgWtaZHWUX3MP67DuYpzVmoRrvpDAp/a7Curb5Y2WUWsWc/EF1wmUxgWOFxnO/f1dz2ICMMuuDIPau4jxgb3GGZc0AWXZ6kSqwNnOCcH7QjXT73QrJmoDPS03bjszxnV1cNfADI/0qVz/BaxQzfRHgZHg064BOU0wxvUO9VrpKpCGymQYP7TY/adhHOs6UBNM5bJtrIxXdPI3h6rp/8oovdgAAAAASUVORK5CYII=" />
                                        Buscar
                                    </button>
                                </div>
                            </form>


                        </div>
                    </div>

                    {/* Modal */}
                    {showModal && (
                        <div className="container-modal sopcionu">
                            <div className="content-modal">
                                <h2 className="h22">Por favor seleccione una opción</h2>
                                <div className="btn-cerrar">
                                    <button className="btn-cerrar btnOk" onClick={handleCloseModal}>OK</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
            <PiePagina />
        </div>
    );
}

export default GestionInstru;