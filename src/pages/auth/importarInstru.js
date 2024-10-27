import { Link, useLocation } from "react-router-dom";
import PiePagina from '../../components/piePagina';
import NavbarCordi from '../../components/nabCordi';

import "./coordi.css";


const ImportarInstru = () => {
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
                                <li className="breadcrumb-item"><Link to="/gestionInstru">Gestion instructores </Link></li>
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
                    <label htmlFor="fichaSelect" className="form-label" style={{ marginRight: '10px' }}>
                        Coordinación:
                    </label>
                    <select id="fichaSelect" className="form-select">
                        <option value="">Seleccionar...</option>
                        <option value="opcion1">Teleinformática</option>
                        <option value="opcion2">Mercadeo</option>
                        <option value="opcion3">Logística</option>
                    </select>
                </div>

                <p className="mb-3">Buscar en su ordenador:</p>

                <div className="mb-3">
                    <label htmlFor="fileInput" className="form-label">Seleccionar archivo</label>
                    <input type="file" id="fileInput" className="cambiar form-control" />
                </div>


                <div className="text-center mt-5">
                    <Link to={`/exitoImportInstru`}>
                        <button type="button" className="btn butonimportar d-flex boton-modal" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <img width={24} height={24} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADM0lEQVR4nO1ZS2sUQRBuo1cVEcGjj3WqJhpBk+meDYH4NopHg48kZqp2EfwBSTSXgOQSb4oe1YuKghg9ai4RJAf1oCdRPBtUvOrJKLV5sNmZ7G5mpye7sB/0ZRe6v6+6XlOtVBNN1B+6KLPN5Jz9HmPWkGv8XGum60rbFlWv8PLuXs0wqhmmNMEvw/gvamnGH5rwhSZ32Mujs6aku8e6N2h2Bwzh+5UIV1hzhuC1z9DX26vWp0reIzyjGb/GJB6+GcKPPrnHrBNvv7xrs2Z4nBRxU7oIb1gj38EAla0Os4bwofi4CdxzYlVDzilDTr9mGDIEk5rxexkBf73B1u2Jk/cDPCgBuPLBMGlycEiNqZaKm42pFj/n9GjCp0LYuoAFy0eS14RvsgF0xt3b5LFdM0wvBTXDhAWfj3SbOc1wXSm1LolzvDw6ZhB2qKQRFbCa8bf4t6p3+DmnJ9LyhBdUvaO7UKTCrrPgNvUPLRU2ImBr8fmCnwfuHpUGTER7EDfbFG6T8H6RIW4p242ZicjzNbjik9L9pDtVtqAZRkMCpEglRD4NAVMl1v9WVYWtkrwhvKtsQof6eXiUFHn5Xf63+yXFpdnHHU6I/CepLdLgxVmmmgzmB9AWFgBnqxVQnG1sLE1wpywBSZURljtRdZ63SN4srnI3UYsA2XjNBfi1uhDjPbsC4Paqg9gwjjRMEDd8GhVoglclAmaTLGTiZsomdIDXwofC4cZpJai1NeLQ5w3TzAkM4buQCHK6VHwRS9lJM95UtmHI6Q8LgJnVxkIxxOrWLb/cavAlIgDHVaPAC+Bkw37UL0JqQMQt/DGM51UjQPdlNkW50vxgC8driYnSRlDnnZ3KBqSErziQJZiJm50EHkNH0WjR3nQ6y+6BclPlwqtL4Byp5kbkMaMwsWZ4lspwd1m7TPC5XLcoIgvjSMKrEicmh8dN4J5emDONSEEsP+VGewIEnQwbNeEDi+3yhEptblrhNla5PnjsHlVpQnxZHugM49uYpGVEP+3l4GLqj3ylyA46WPBxgpeG8Ge5GJmPAxhKbU4aB94Abu1g3Kfz6MtDd+elzG55LIm1WRNNKKv4DwucJsklgeeYAAAAAElFTkSuQmCC"/>
                        Importar
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

export default ImportarInstru;