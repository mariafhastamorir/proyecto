import { Link, useLocation } from "react-router-dom";
import PiePagina from '../../components/piePagina';
import NavbarCordi from '../../components/nabCordi';

const ImportarFichas = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const turno = queryParams.get('turno') || 'Diurna';


    return (
        <div className="fondo">
            <NavbarCordi />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>'" }}>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/gestionFichas">Gestión fichas</Link></li>
                                <li className="breadcrumb-item">
                                    <Link to={`/gestionFichas2?turno=${turno}`}>
                                        {turno.charAt(0).toUpperCase() + turno.slice(1)}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    Importar
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>


            <div className="container mt-4 importar">
                <p className="mb-3">El archivo debe ser de tipo Excel (xlsx)</p>

                <div className="mb-3">
                    <label htmlFor="fichaSelect" className="form-label">
                        Ficha:
                        <input type="text" className="ingficha" placeholder="Ingrese una ficha" />
                    </label>
                    <select id="fichaSelect" className="form-select">
                        <option value="">Seleccionar...</option>
                        <option value="opcion1">2898754</option>
                        <option value="opcion2">2786587</option>
                        <option value="opcion3">2809456</option>
                    </select>
                </div>

                <p className="mb-3">Buscar en su ordenador:</p>

                <div className="mb-3">
                    <label htmlFor="fileInput" className="form-label">Seleccionar archivo</label>
                    <input type="file" id="fileInput" className="cambiar form-control" />
                </div>


                <div className="text-center mt-5">
                    <Link to={`/exitoImport?turno=${turno}`}>
                        <button type="button" className="btn butonimportar d-flex boton-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            IMPORTAR
                            <img width="24" height="24" src="https://img.icons8.com/external-tanah-basah-basic-outline-tanah-basah/24/external-Import-arrows-tanah-basah-basic-outline-tanah-basah.png" alt="Importar" className="ms-2" />
                        </button>
                    </Link>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header text-center">
                                <div className="modal-title-container">
                                    <h2 className="modal-title">Seleccione el archivo que desea importar</h2>
                                    <button type="button" className="btn btncerrar mt-3" data-bs-dismiss="modal">OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PiePagina />
        </div>
    );
};

export default ImportarFichas;
