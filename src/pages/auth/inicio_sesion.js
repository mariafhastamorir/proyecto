import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ImagesB = require.context('../../assets', true);

const Login = () => {
  const [numeroDocumento, setNumeroDocumento] = useState('');
  const [claveUsuario, setClaveUsuario] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post('http://localhost:8000/login', {
        numeroDocumento,
        claveUsuario
      });

        const { rol } = response.data;

        //redirigir segun el rol
        if (rol === 1) {
          navigate('/admin');
        } else if (rol === 2) {
          navigate('/coordinador');
        } else if  (rol === 3) {
          navigate('/profesional');
        } else if  (rol === 4) {
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
        <nav className="navbar nnni">
          <img src={ImagesB('./logosena.png')} width="90" height="90" alt="Logo SENA" />
          <img src={ImagesB('./logobienestech.png')} alt="Logo BienesTech" />
        </nav>

        <div className="container">
          <div className="form-containerlogin">
            <h2 className="h2r">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="numeroDocumento" className="form-label">Número de Documento</label>
                <input
                  type="text"
                  value={numeroDocumento}
                  className="form-controllogin"
                  id="numeroDocumento"
                  required
                  onChange={(e) => setNumeroDocumento(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="claveUsuario" className="form-label">Contraseña</label>
                <input
                  type="password"
                  value={claveUsuario}
                  className="form-controllogin"
                  id="claveUsuario"
                  required
                  onChange={(e) => setClaveUsuario(e.target.value)}
                />
              </div>
              <div className="row mt-4">
                <div className="col-12 text-center">
                  <button type="submit" className="btn btn-success submit-btn">
                    Iniciar Sesión
                  </button>
                </div>
              </div>
            </form>

            {error && <p className="text-danger">{error}</p>} {/* Mostrar mensaje de error */}
            
            <br />
            <p className="p">¿Aún no está registrado? <Link to="/registro">Registrarme</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
