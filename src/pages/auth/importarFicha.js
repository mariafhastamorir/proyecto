import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import PiePagina from '../../components/piePagina';
import NavbarCordi from '../../components/nabCordi';

const ImportarFichas = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const turno = queryParams.get('turno') || 'Diurna';
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        const fileExtension = selectedFile?.name.split('.').pop().toLowerCase();

        if (fileExtension === 'xlsx' || fileExtension === 'xls') {
            setFile(selectedFile);
            setErrorMessage('');
        } else {
            setFile(null);
            setErrorMessage('Por favor, seleccione un archivo de tipo Excel (.xlsx o .xls).');
        }
    };

    return (
        <div className="fondo">
            <NavbarCordi />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>'" }}>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="/coordinador">Gestión fichas</Link></li>
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
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        accept=".xlsx, .xls"
                        className="mt-1 block w-full text-sm text-slate-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
                    />
                </div>

                {errorMessage && (
                    <p className="text-danger">{errorMessage}</p>
                )}

                <div className="text-center mt-5">
                    <Link to="#">
                        <button type="button" className="btn butonimportar d-flex">
                            <img width={24} height={24} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADM0lEQVR4nO1ZS2sUQRBuo1cVEcGjj3WqJhpBk+meDYH4NopHg48kZqp2EfwBSTSXgOQSb4oe1YuKghg9ai4RJAf1oCdRPBtUvOrJKLV5sNmZ7G5mpye7sB/0ZRe6v6+6XlOtVBNN1B+6KLPN5Jz9HmPWkGv8XGum60rbFlWv8PLuXs0wqhmmNMEvw/gvamnGH5rwhSZ32Mujs6aku8e6N2h2Bwzh+5UIV1hzhuC1z9DX26vWp0reIzyjGb/GJB6+GcKPPrnHrBNvv7xrs2Z4nBRxU7oIb1gj38EAla0Os4bwofi4CdxzYlVDzilDTr9mGDIEk5rxexkBf73B1u2Jk/cDPCgBuPLBMGlycEiNqZaKm42pFj/n9GjCp0LYuoAFy0eS14RvsgF0xt3b5LFdM0wvBTXDhAWfj3SbOc1wXSm1LolzvDw6ZhB2qKQRFbCa8bf4t6p3+DmnJ9LyhBdUvaO7UKTCrrPgNvUPLRU2ImBr8fmCnwfuHpUGTER7EDfbFG6T8H6RIW4p242ZicjzNbjik9L9pDtVtqAZRkMCpEglRD4NAVMl1v9WVYWtkrwhvKtsQof6eXiUFHn5Xf63+yXFpdnHHU6I/CepLdLgxVmmmgzmB9AWFgBnqxVQnG1sLE1wpywBSZURljtRdZ63SN4srnI3UYsA2XjNBfi1uhDjPbsC4Paqg9gwjjRMEDd8GhVoglclAmaTLGTiZsomdIDXwofC4cZpJai1NeLQ5w3TzAkM4buQCHK6VHwRS9lJM95UtmHI6Q8LgJnVxkIxxOrWLb/cavAlIgDHVaPAC+Bkw37UL0JqQMQt/DGM51UjQPdlNkW50vxgC8driYnSRlDnnZ3KBqSErziQJZiJm50EHkNH0WjR3nQ6y+6BclPlwqtL4Byp5kbkMaMwsWZ4lspwd1m7TPC5XLcoIgvjSMKrEicmh8dN4J5emDONSEEsP+VGewIEnQwbNeEDi+3yhEptblrhNla5PnjsHlVpQnxZHugM49uYpGVEP+3l4GLqj3ylyA46WPBxgpeG8Ge5GJmPAxhKbU4aB94Abu1g3Kfz6MtDd+elzG55LIm1WRNNKKv4DwucJsklgeeYAAAAAElFTkSuQmCC" />
                            Importar
                        </button>
                    </Link>
                </div>
            </div>

            <PiePagina />
        </div>
    );
};

export default ImportarFichas;


