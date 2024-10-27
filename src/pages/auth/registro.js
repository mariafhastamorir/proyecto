import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './registro.css';

const ImagesB = require.context('../../assets', true);

const Registro = () => {
  const [tipoDocumento, settipoDocumento] = useState('');
  const [numeroDocumento, setnumeroDocumento] = useState('');
  const [nombres, setnombres] = useState('');
  const [apellidos, setapellidos] = useState('');
  const [correoUsuario, setcorreoUsuario] = useState('');
  const [claveUsuario, setclaveUsuario] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idRol, setidRol] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  // Estados para errores de validación
  const [tipoDocumentoError, setTipoDocumentoError] = useState('');
  const [numeroDocumentoError, setNumeroDocumentoError] = useState('');
  const [nombresError, setNombresError] = useState('');
  const [apellidosError, setApellidosError] = useState('');
  const [correoUsuarioError, setCorreoUsuarioError] = useState('');

  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);

  // Nuevo estado para aceptar políticas
  const [acceptedPolicies, setAcceptedPolicies] = useState(false);

  const handlePasswordChange = (password) => {
    setclaveUsuario(password);

    // Validar si la contraseña cumple con las reglas
    setIsLengthValid(password.length >= 8);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasNumber(/\d/.test(password));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  };

  const validateFields = () => {
    let isValid = true;

    // Validar tipo de documento
    if (tipoDocumento === "") {
      setTipoDocumentoError("El tipo de documento es obligatorio.");
      isValid = false;
    } else {
      setTipoDocumentoError("");
    }

    // Validar número de documento (solo números)
    if (!/^\d+$/.test(numeroDocumento)) {
      setNumeroDocumentoError("El número de documento solo debe contener números.");
      isValid = false;
    } else {
      setNumeroDocumentoError("");
    }

    // Validar nombres (solo letras)
    if (!/^[a-zA-Z\s]+$/.test(nombres)) {
      setNombresError("Los nombres solo deben contener letras.");
      isValid = false;
    } else {
      setNombresError("");
    }

    // Validar apellidos (solo letras)
    if (!/^[a-zA-Z\s]+$/.test(apellidos)) {
      setApellidosError("Los apellidos solo deben contener letras.");
      isValid = false;
    } else {
      setApellidosError("");
    }

    // Validar correo
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|outlook|empresa)\.com$/;
    if (!emailRegex.test(correoUsuario)) {
      setCorreoUsuarioError("El correo debe ser de los dominios permitidos (gmail.com, outlook.com, empresa.com).");
      isValid = false;
    } else {
      setCorreoUsuarioError("");
    }

    // Validar contraseñas
    if (claveUsuario !== confirmPassword) {
      setPasswordMatch(false);
      isValid = false;
    } else {
      setPasswordMatch(true);
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos
    if (!validateFields()) return;

    // Validar contraseña
    if (!isLengthValid || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      setError("Por favor, asegúrese de que la contraseña cumpla con todas las reglas.");
      return;
    }

    // Verificar si las políticas han sido aceptadas
    if (!acceptedPolicies) {
      setError("Debe aceptar las políticas de privacidad y manejo de cookies.");
      return;
    }

    // Intentar registrar el usuario
    try {
      const response = await axios.post('http://localhost:8000/registro', {
        tipoDocumento,
        numeroDocumento,
        nombres,
        apellidos,
        correoUsuario,
        claveUsuario,
        idRol
      });
      console.log(response.data);
      setIsSubmitted(true);
      setError('');
    } catch (error) {
      console.error(error.response ? error.response.data : error);
      setError("Error al registrar usuario");
    }
  };

  return (
    <div className="regisyini">
      <div>
        <nav className="navbar nnn">
          <img src={ImagesB('./logosena.png')} width="90" height="90" alt="Logo SENA" />
          <img src={ImagesB('./logobienestech.png')} alt="Logo BienesTech" />
        </nav>

        <div className="container">
          <div className="form-container">
            <h2 className="h2r">Regístrate</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="document-type" className="form-label">Tipo de Documento</label>
                  <select className="tp form-selectt" value={tipoDocumento} onChange={(e) => settipoDocumento(e.target.value)}>
                    <option value="">Seleccione el tipo</option>
                    <option value="C.C">Cédula de Ciudadania</option>
                    <option value="C.E">Cédula de Extranjeria</option>
                  </select>
                  {tipoDocumentoError && <p className="text-danger">{tipoDocumentoError}</p>}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="document-number" className="form-label">Número de Documento</label>
                  <input
                    type="text"
                    value={numeroDocumento}
                    className="form-controll"
                    placeholder="Número de Documento"
                    id="document-number"
                    onChange={(e) => setnumeroDocumento(e.target.value)}
                  />
                  {numeroDocumentoError && <p className="text-danger">{numeroDocumentoError}</p>}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="first-name" className="form-label">Nombres</label>
                  <input
                    type="text"
                    value={nombres}
                    className="form-controll"
                    placeholder="Nombres"
                    id="first-name"
                    onChange={(e) => setnombres(e.target.value)}
                  />
                  {nombresError && <p className="text-danger">{nombresError}</p>}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="last-name" className="form-label">Apellidos</label>
                  <input
                    type="text"
                    value={apellidos}
                    className="form-controll"
                    placeholder="Apellidos"
                    id="last-name"
                    onChange={(e) => setapellidos(e.target.value)}
                  />
                  {apellidosError && <p className="text-danger">{apellidosError}</p>}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="email" className="form-label">Correo</label>
                  <input
                    type="email"
                    value={correoUsuario}
                    className="form-controll"
                    placeholder="Correo"
                    id="email"
                    onChange={(e) => setcorreoUsuario(e.target.value)}
                  />
                  {correoUsuarioError && <p className="text-danger">{correoUsuarioError}</p>}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="document-type" className="form-label">Rol</label>
                  <br />
                  <select className="tp form-selectt" value={idRol} onChange={(e) => setidRol(e.target.value)}>
                    <option value="">Seleccione el rol</option>
                    <option value="1">Administrador</option>
                    <option value="2">Coordinador</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="password" className="form-label">Contraseña</label>
                  <input
                    type="password"
                    value={claveUsuario}
                    className="form-controll"
                    placeholder="Contraseña"
                    id="password"
                    onChange={(e) => handlePasswordChange(e.target.value)}
                  />  
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="confirm-password" className="form-label">Confirmar Contraseña</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    className="form-controll"
                    placeholder="Confirmar Contraseña"
                    id="confirm-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  {!passwordMatch && <p className="text-danger">Las contraseñas no coinciden.</p>}
                </div>

                <div className="container">
            <p>Validación de Contraseña</p>
            <ul className="password-rules">
                <li className={isLengthValid ? 'valid' : ''}>Al menos 8 caracteres</li>
                <li className={hasUppercase ? 'valid' : ''}>Al menos una letra mayúscula</li>
                <li className={hasLowercase ? 'valid' : ''}>Al menos una letra minúscula</li>
                <li className={hasNumber ? 'valid' : ''}>Al menos un número</li>
                <li className={hasSpecialChar ? 'valid' : ''}>
                    Al menos un carácter especial (&quot;! @ # $ % ^ &amp; * , . ? : | &gt; &lt;&quot;)
                </li>
            </ul>
        </div>

                <div className="col-md-12 mb-3">
          <input
            type="checkbox"
            id="accept-policies"
            checked={acceptedPolicies}
            onChange={(e) => setAcceptedPolicies(e.target.checked)}
          />
          <label htmlFor="accept-policies">
              He leído y acepto las{" "}
              <Link to="/politicasPrivacidad" target="_blank">
                políticas de privacidad
              </Link>
              , condiciones de uso y manejo de cookies.
            </label>
          </div>
              </div>
              <div className="row mt-4">
            <div className="col-12 text-center">
            <button type="submit" className="btn btn-success submit-btn" disabled={isSubmitted}>
                {isSubmitted ? 'Enviando...' : 'Registrarme'}
            </button>
            <p></p>
            {error && <p>{error}</p>}
            </div>
        </div>
            </form>
            <p className="p">¿Ya está registrado? <Link to="/login">Iniciar sesión</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
