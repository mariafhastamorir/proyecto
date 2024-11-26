import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavIndex from '../../components/navindex';
import PiePagina from '../../components/piePagina';
import axios from 'axios';

const ImagesB = require.context('../../assets', true);

const Login = () => {
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [claveUsuario, setClaveUsuario] = useState('');
  const [error, setError] = useState('');

  // Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/login', {
        numeroDocumento,
        claveUsuario,
      });
  
      const { rol, nombres } = response.data; // Asegúrate de que `nombres` esté en la respuesta
  
      // Guardar el rol y el nombre en `localStorage`
      localStorage.setItem('userRole', rol);
      localStorage.setItem('userName', nombres);
  
      // Redirigir según el rol
      if (rol === 1) {
        navigate('/admin');
      } else if (rol === 2) {
        navigate('/coordinador');
      } else if (rol === 3) {
        navigate('/profesional');
      } else if (rol === 4) {
        navigate('/instructor');
      } else {
        setError('No se pudo identificar el rol.');
      }
    } catch (error) {
      setError(error.response ? error.response.data.detail : "Error de login");
    }
  };
  

  return (
    <div className="regisyini inicios">
      <div>
        <NavIndex />

        <div className="container">
          <div className="form-containerlogin">
            <h2 className="h2r">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="numeroDocumento" className="form-label">Número de Documento</label>
                <input
                  type="text"
                  value={numeroDocumento}
                  className="form--input td opcion"
                  id="numeroDocumento"
                  placeholder="Número de Documento"
                  required
                  onChange={(e) => setNumeroDocumento(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="claveUsuario" className="form-label">Contraseña</label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={claveUsuario}
                    className="form--input td opcion"
                    id="claveUsuario"
                    placeholder='Contraseña'
                    required
                    onChange={(e) => setClaveUsuario(e.target.value)}
                  />
                </div>
                <span className="input-grouppp" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "🙈" : "👁️"} Para ver la contraseña
                  </span>
              </div>
              {error && <p className="text-danger">{error}</p>} {/* Mostrar mensaje de error */}

              <div className="row mt-4">
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-success submit-btn">
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            </form>

            <br />
            <p className="p">¿Aún no está registrado? <Link to="/registro">Registrarme</Link></p>
            <p className="p"><Link to="/recuperarContrasena">¿Ha olvidado su Contraseña?</Link></p>
          </div>
        </div>
      </div>
      <PiePagina />
    </div>
  );
};

export default Login;