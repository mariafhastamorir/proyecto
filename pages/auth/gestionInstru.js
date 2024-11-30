import React, { useState } from "react";
import { Link } from "react-router-dom";
import NavbarCordi from "../../components/nabCordi";
import PiePagina from "../../components/piePagina";
import "./coordi.css";
import axios from "axios";

const GestionInstru = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const [filteredUsuarios, setFilteredUsuarios] = useState([]); // Lista filtrada

    const handleSearch = () => {
        const token = localStorage.getItem("token"); // Suponiendo que guardaste el token al iniciar sesión

        if (!token) {
            alert("No hay un token de sesión. Por favor inicia sesión.");
            return;
        }

        axios
            .get("http://localhost:8000/usuarios/instructores", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                setUsuarios(response.data);
                setFilteredUsuarios(response.data); // Inicializa la lista filtrada con todos los usuarios
            })
            .catch((error) => {
                console.error("Error:", error.response?.data?.detail || error.message);
            });
    };

    const handleFilter = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = usuarios.filter(
            (usuario) =>
                usuario.nombres.toLowerCase().includes(value) ||
                usuario.apellidos.toLowerCase().includes(value) ||
                usuario.numeroDocumento.toString().includes(value)
        );
        setFilteredUsuarios(filtered);
    };

    return (
        <div>
            <NavbarCordi />
            <main className="container text-center">

                <div className="col-md-5 text-end">
                    <Link to={`/importarInstru  `}>
                        <button className="butonimportarinstru">
                            <img width={24} height={24} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADM0lEQVR4nO1ZS2sUQRBuo1cVEcGjj3WqJhpBk+meDYH4NopHg48kZqp2EfwBSTSXgOQSb4oe1YuKghg9ai4RJAf1oCdRPBtUvOrJKLV5sNmZ7G5mpye7sB/0ZRe6v6+6XlOtVBNN1B+6KLPN5Jz9HmPWkGv8XGum60rbFlWv8PLuXs0wqhmmNMEvw/gvamnGH5rwhSZ32Mujs6aku8e6N2h2Bwzh+5UIV1hzhuC1z9DX26vWp0reIzyjGb/GJB6+GcKPPrnHrBNvv7xrs2Z4nBRxU7oIb1gj38EAla0Os4bwofi4CdxzYlVDzilDTr9mGDIEk5rxexkBf73B1u2Jk/cDPCgBuPLBMGlycEiNqZaKm42pFj/n9GjCp0LYuoAFy0eS14RvsgF0xt3b5LFdM0wvBTXDhAWfj3SbOc1wXSm1LolzvDw6ZhB2qKQRFbCa8bf4t6p3+DmnJ9LyhBdUvaO7UKTCrrPgNvUPLRU2ImBr8fmCnwfuHpUGTER7EDfbFG6T8H6RIW4p242ZicjzNbjik9L9pDtVtqAZRkMCpEglRD4NAVMl1v9WVYWtkrwhvKtsQof6eXiUFHn5Xf63+yXFpdnHHU6I/CepLdLgxVmmmgzmB9AWFgBnqxVQnG1sLE1wpywBSZURljtRdZ63SN4srnI3UYsA2XjNBfi1uhDjPbsC4Paqg9gwjjRMEDd8GhVoglclAmaTLGTiZsomdIDXwofC4cZpJai1NeLQ5w3TzAkM4buQCHK6VHwRS9lJM95UtmHI6Q8LgJnVxkIxxOrWLb/cavAlIgDHVaPAC+Bkw37UL0JqQMQt/DGM51UjQPdlNkW50vxgC8driYnSRlDnnZ3KBqSErziQJZiJm50EHkNH0WjR3nQ6y+6BclPlwqtL4Byp5kbkMaMwsWZ4lspwd1m7TPC5XLcoIgvjSMKrEicmh8dN4J5emDONSEEsP+VGewIEnQwbNeEDi+3yhEptblrhNla5PnjsHlVpQnxZHugM49uYpGVEP+3l4GLqj3ylyA46WPBxgpeG8Ge5GJmPAxhKbU4aB94Abu1g3Kfz6MtDd+elzG55LIm1WRNNKKv4DwucJsklgeeYAAAAAElFTkSuQmCC" />
                            Importar
                        </button>
                    </Link>
                </div>
                <h1 className="hh1">Consultar Instructores</h1>
                <div className="text-center mt-5">
                    <button type="button" className="btn btnBusc" onClick={handleSearch}>
                        <p>
                            <img width="40"
                                height="40"
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClklEQVR4nL1Vz2sTURBeVLSiPXgRWpEibUmz
                             M4k3UTzUXwexkO6bsHgRe1VaWmz1XPRvEdQUpaJkJrnEH4WeCtJU0PoviGK9+AMbmbcbm9TsdrcGBx7svn1vv/m++d48x4kIX9whYrhjBB6R4Gsd+mwEbus351+DqtlhEnxMjJsk2Og
                             4GDeJcWHXgCToGcavwQ9hlRhmipyFa5X8IR36rHPEUA9BNzzOjacHEfxFgt9I4Ob8vLMnaq1f8vcadieN4HfdkxhM5QqZKMj5pMmZintBwZRZIhltTQQbHuONpCDNIMGpsG4Lzo7Ft4
                             WH1Ti5YmUUXNN/eGUYjFyodg0yghl9H3ueO5IWzFTcW6E55iIXkUBJF/ll1w3f743WRvelA8qj/sMwPowBsoexUVjM9NpNDC91YxqgwmKm1wIJvEoOJPDOMNzdFRDjUuSisMVsScdQJ
                             YbPppI/mlY6inPedjOoxcPO8GKiNtCTygyMs05889TeBXW1ql9y9xPjmxBsOdayzh97v7VdpZodjs1IKQcau5N287OTx0hgJZiDH8RwnwSueuKeMjzS18aGcTpM6smO1C0rwQ1tJ8Vy
                             7qLOqcWNwPWga8CyHgNNxC+dPriVYO6SJqLty6/kTzhJQhuj0g9715RKEisX47RlG9Tmo8d4RhlfLg8dSASmzIIzgWtaZHWUX3MP67DuYpzVmoRrvpDAp/a7Curb5Y2WUWsWc/EF1wm
                             UxgWOFxnO/f1dz2ICMMuuDIPau4jxgb3GGZc0AWXZ6kSqwNnOCcH7QjXT73QrJmoDPS03bjszxnV1cNfADI/0qVz/BaxQzfRHgZHg064BOU0wxvUO9VrpKpCGymQYP7TY/adhHOs6UB
                             NM5bJtrIxXdPI3h6rp/8oovdgAAAAASUVORK5CYII="
                            /> Buscar Instructores
                        </p>
                    </button>
                </div>

                {/* Campo de búsqueda */}
                <div className="mt-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre, documento o correo"
                        value={searchTerm}
                        onChange={handleFilter} // Llama al manejador de filtro al escribir
                    />
                </div>

                <table className="table mt-4">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Documento</th>
                            <th>Correo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsuarios.length > 0 ? (
                            filteredUsuarios.map((usuario) => (
                                <tr key={usuario.idUsuario}>
                                    <td>
                                        {usuario.nombres} {usuario.apellidos}
                                    </td>
                                    <td>{usuario.numeroDocumento}</td>
                                    <td>{usuario.correoUsuario}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No hay instructores disponibles.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </main>
            <PiePagina />
        </div>
    );
};

export default GestionInstru;
