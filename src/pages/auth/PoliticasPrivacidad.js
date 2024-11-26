import React from "react";
import PiePagina from '../../components/piePagina';

const ImagesB = require.context('../../assets', true);

const PoliticasPrivacidad = () => {
  return (
    <div>
        <nav className="navbar pp">
          <img src={ImagesB('./logoindex.png')} width="90" height="90" alt="Logo SENA" />
          <img src={ImagesB('./logobienestech.png')} alt="Logo BienesTech" />
        </nav>
    <div className="container">
      <h1 className="h1">Políticas de Privacidad, Condiciones de Uso y Manejo de Cookies</h1>
      <br/>
      <p className="ppP">Última actualización: 19 de Octubre de 2024</p>
      <p>
      En BIENESTECH nos comprometemos a proteger la privacidad de nuestros usuarios y garantizar el correcto manejo de la información personal 
      conforme a la Ley 1581 de 2012 (Ley de Protección de Datos Personales de Colombia) y las normas internacionales de protección de datos.
      </p>
      <p>
      Al utilizar nuestros servicios, aceptas los términos y condiciones aquí descritos.
      </p>

      <ol>
        <li className="ppP">Información que Recopilamos</li>
        <p>
        Recopilamos información personal proporcionada directamente por ti cuando te 
        registras en nuestra plataforma o cuando interactúas con nuestros servicios. Esta información incluye:
        </p>
        <ul>
            <li>Nombre completo</li>
            <li>Tipo y Número de documento de identificación</li>
            <li>Correo electrónico</li>
            <li>Contraseña</li>
            <li>Cualquier otra información relevante para los servicios que ofrecemos</li>
        </ul>
        <br/>
        <li className="ppP">Uso de la Información</li>
        <p>
            Utilizamos la información personal recopilada para:
        </p>
        <ul>
            <li>Procesar tu registro en nuestra plataforma</li>
            <li>Ofrecerte nuestros servicios y productos</li>
            <li>Enviar notificaciones sobre actualizaciones o cambios en nuestras políticas</li>
            <li>Responder a consultas o solicitudes</li>
            <li>Garantizar la seguridad de nuestros servicios y prevenir el fraude</li>
        </ul>
        <br/>
        <li className="ppP">Compartir la Información</li>
        <p>
        Nos comprometemos a no vender, alquilar o compartir tu información personal con terceros 
        sin tu consentimiento, excepto cuando sea requerido por la ley o para cumplir con las finalidades descritas anteriormente.
        </p>
        <p>
        Podemos compartir información con proveedores de servicios terceros que nos ayuden en la operación de nuestra plataforma, 
        como servicios de hosting, marketing o análisis de datos. Estos terceros están obligados a proteger tu información bajo los 
        mismos estándares que nosotros.
        </p>
        <br/>
        <li className="ppP">Seguridad de la Información</li>
        <p>
        Implementamos medidas de seguridad adecuadas para proteger tu información personal contra accesos no autorizados, uso indebido, 
        pérdida o alteración. Sin embargo, debes ser consciente de que ningún sistema de transmisión o almacenamiento de datos es
        completamente seguro.
        </p>
        <br/>
        <li className="ppP">Manejo de Cookies</li>
        <p>
        Nuestra plataforma utiliza cookies para mejorar tu experiencia de usuario. Una cookie es un pequeño archivo que se almacena en tu 
        dispositivo para recordar tus preferencias, analizar el tráfico y ofrecerte contenido personalizado.
        </p>
        <p>
        Tipos de cookies que utilizamos:
        </p>
        <ul>
            <li>Cookies de sesión: se eliminan automáticamente cuando cierras tu navegador</li>
            <li>Cookies persistentes: se almacenan en tu dispositivo durante un período determinado</li>
        </ul>
        <p>
        Puedes gestionar el uso de cookies a través de la configuración de tu navegador. Si decides deshabilitar algunas cookies, 
        es posible que algunas partes de nuestro sitio no funcionen correctamente.
        </p>
        <br/>
        <li className="ppP">Derechos de los Titulares de los Datos</li>
        <p>De acuerdo con la Ley 1581 de 2012, tienes derecho a:</p>
        <ul>
            <li>Acceder a los datos personales que tenemos sobre ti.</li>
            <li>Rectificar tus datos en caso de ser inexactos.</li>
            <li>Cancelar o solicitar la supresión de tus datos cuando ya no sean necesarios 
                para las finalidades por las que fueron recopilados.</li>
            <li>Oponerte al tratamiento de tus datos personales por razones legítimas.</li>   
        </ul>
        <br/>
        <p>Para ejercer estos derechos, por favor contacta con nosotros a través de  nuestro correo electrónico.</p>
        <ul>
            <li>Cambios en las Políticas de Privacidad</li>
            <p>
            Nos reservamos el derecho a modificar estas políticas en cualquier momento. Cualquier cambio será notificado a través de 
            nuestra plataforma, y las modificaciones entrarán en vigor a partir de la fecha de publicación. Te recomendamos revisar 
            regularmente nuestras políticas para estar informado sobre cómo protegemos tu información.
            </p>
        </ul>
        <br/>
        <li className="ppP">Contacto</li>
        <p>Si tienes preguntas o inquietudes sobre nuestras políticas de privacidad, puedes comunicarte con nosotros a través de:</p>
        <p>Correo electrónico:</p>
        <ul>
            <li>Angie Sosa: angiesofia.scalderon@gmail.com</li>
            <li>Juliana Salgar: julianasalgar27@gmail.com</li>
            <li>Maria Hastamorir: mariafojeda2006@gmail.com</li>
        </ul>
        
      </ol>

    </div>
    <PiePagina/>
    </div>
  );
};

export default PoliticasPrivacidad;
