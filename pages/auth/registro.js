import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NavIndex from '../../components/navindex';
import PiePagina from '../../components/piePagina';
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
  const [showModal, setShowModal] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasLowercase, setHasLowercase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [acceptedPolicies, setAcceptedPolicies] = useState(false);
  const [correoUsuarioError, setCorreoUsuarioError] = useState('');

  // Estado para mostrar/ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (password) => {
    setclaveUsuario(password);
    setIsLengthValid(password.length >= 8);
    setHasUppercase(/[A-Z]/.test(password));
    setHasLowercase(/[a-z]/.test(password));
    setHasNumber(/\d/.test(password));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(password));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|soy\.sena\.edu\.co|sena\.edu\.co)$/;
    setCorreoUsuarioError(
      emailRegex.test(email) ? '' : "El correo debe ser de los dominios permitidos (gmail.com, outlook.com, soy.sena.edu.co o sena.edu.co)."
    );
    setcorreoUsuario(email);
  };  
  
  const validateForm = () => {
    const fields = [];
    
    if (!tipoDocumento) fields.push("Tipo de Documento");
    if (!numeroDocumento) fields.push("Número de Documento");
    if (!nombres) fields.push("Nombres");
    if (!apellidos) fields.push("Apellidos");
    if (!correoUsuario || correoUsuarioError) fields.push("Correo");
    if (!idRol) fields.push("Rol");
  
    // Validaciones de contraseña
    if (!claveUsuario) fields.push("Contraseña");
    if (!confirmPassword || claveUsuario !== confirmPassword) fields.push("Confirmar Contraseña");
    if (!isLengthValid || !hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
      fields.push("La contraseña debe cumplir todos los requisitos.");
    }
  
    // Verificación de políticas
    if (!acceptedPolicies) fields.push("Aceptar Políticas de Privacidad");
  
    setMissingFields(fields);
    return fields.length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setShowModal(true); // Mostrar el modal si hay campos faltantes
      return; // Detener el envío si no pasa las validaciones
    }
    
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
      setIsSubmitted(true);
      setError('');
    } catch (error) {
      setError("Error al registrar usuario");
    }
  };
  
 
  return (
    <div className="regisyini">
      <div>
        <NavIndex />

        <div className="container">
          <div className="form-container">
            <h2 className="h2r">Regístrate</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="document-type" className="form-label">Tipo de Documento</label>
                  <select
                    className="tp form--input td opcion"
                    value={tipoDocumento}
                    onChange={(e) => settipoDocumento(e.target.value)}
                  >
                    <option value="">Seleccione el tipo</option>
                    <option value="C.C">Cédula de Ciudadanía</option>
                    <option value="C.E">Cédula de Extranjería</option>
                  </select>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="document-number" className="form-label">Número de Documento</label>
                  <input
                    type="text"
                    value={numeroDocumento}
                    className="form--input td opcion"
                    placeholder="Número de Documento"
                    id="document-number"
                    onChange={(e) => {
                      if (/^\d*$/.test(e.target.value)) setnumeroDocumento(e.target.value);
                    }}
                    maxLength={10} // Ejemplo: límite de 10 caracteres
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="first-name" className="form-label">Nombres</label>
                  <input
                    type="text"
                    value={nombres}
                    className="form--input td opcion"
                    placeholder="Nombres"
                    id="first-name"
                    onChange={(e) => {
                      if (/^[a-zA-Z\s]*$/.test(e.target.value)) setnombres(e.target.value);
                    }}
                    maxLength={30} // Ejemplo: límite de 50 caracteres
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="last-name" className="form-label">Apellidos</label>
                  <input
                    type="text"
                    value={apellidos}
                    className="form--input td opcion"
                    placeholder="Apellidos"
                    id="last-name"
                    onChange={(e) => {
                      if (/^[a-zA-Z\s]*$/.test(e.target.value)) setapellidos(e.target.value);
                    }}
                    maxLength={30} // Ejemplo: límite de 50 caracteres
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="email" className="form-label">Correo</label>
                  <input
                    type="email"
                    value={correoUsuario}
                    className="form--input td opcion"
                    placeholder="Correo"
                    id="email"
                    onChange={(e) => validateEmail(e.target.value)}
                    maxLength={30} // Ejemplo: límite de 50 caracteres
                  />
                  {correoUsuarioError && <p className="text-danger">{correoUsuarioError}</p>}
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="document-type" className="form-label">Rol</label>
                  <br />
                  <select
                    className="form--input td opcion"
                    value={idRol}
                    onChange={(e) => setidRol(e.target.value)}
                  >
                    <option value="">Seleccione el rol</option>
                    <option value="1">Administrador</option>
                    <option value="2">Coordinador</option>
                  </select>
                </div>

                {/* CONTRASEÑAS */}
                <div className="col-md-4 mb-3 password-container">
                    <label htmlFor="password" className="form-label">Contraseña</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={claveUsuario}
                        className="form--input td opcion"
                        placeholder="Contraseña"
                        id="password"
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        maxLength={20}
                      />
                    </div>
                    <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? "🙈" : "👁️"} Para ver la contraseña
                    </span>
                  </div>

                  <div className="col-md-4 mb-3 password-container">
                    <label htmlFor="confirm-password" className="form-label">Confirmar Contraseña</label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        className="form--input td opcion"
                        placeholder="Confirmar Contraseña"
                        id="confirm-password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        maxLength={20}
                      />
                    </div>
                    <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                      {showConfirmPassword ? "🙈" : "👁️"} Para ver la contraseña
                    </span>
                    {!passwordMatch && <p className="text-danger">Las contraseñas no coinciden.</p>}
                  </div>
                {/* CONTRASEÑAS */}
                <p></p>
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

                {/* Casilla de verificación para aceptar políticas */}
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

                <div className="modal-container">
                    {isSubmitted && (
                        <div className="modal-backdropp">
                            <div className="modal-contentt">
                                <h4>Registro exitoso</h4>
                                <p>Solicitud pendiente de aprobación.</p>
                                <button onClick={() => setIsSubmitted(false)} className="btn btn-success">Aceptar</button>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="modal-backdropp">
                            <div className="modal-contentt">
                                <h4>Error en el registro</h4>
                                <p>{error}</p>
                                <button onClick={() => setError('')} className="btn btn-danger">Cerrar</button>
                            </div>
                        </div>
                    )}
                </div>


                <div className="row mt-4">
            <div className="col-12 text-center">
            <button type="submit" className="btn btn-success submit-btn" disabled={isSubmitted}>
                {isSubmitted ? 'Enviando...' : 'Registrarme'}
            </button>
            <p></p>
            </div>
        </div>
              </div>
            </form>
            <p className="p">¿Ya está registrado? <Link to="/login">Iniciar sesión</Link></p>

            {/* Modal de validación de campos faltantes */}
            <div className="modal-header">
            {showModal && (
              <div className="modal-backdrop">
                <div className="modal">
                  <h4>Campos incompletos</h4>
                  <p>Por favor, complete los siguientes campos:</p>
                  <ul>
                    {missingFields.map((field, index) => (
                      <li key={index}>{field}</li>
                    ))}
                  </ul>
                  <button onClick={() => setShowModal(false)} className="btn btn-success">Cerrar</button>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>

        <PiePagina />
      </div>
    </div>
  );
};

export default Registro;