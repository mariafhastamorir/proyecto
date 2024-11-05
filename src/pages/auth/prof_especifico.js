import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';

import "./admin.css";

const ImagesB = require.context('../../assets', true);

const Profespecifico = () => {
  return (
    <div >
      <Navbar />
      <main className="container">
        <h1 className="h1">Gestión Profesionales Bienestar&gt;Sebastián Ramírez</h1>
        <h3 className="h3">Lunes:</h3>
        <br />
        <div className="cards">
          <div className="cardd col-md-4">
            <div className="card-content">
              <h2>Taller Psicología</h2>
              <p>Ficha: 2898754</p>
              <p>Centro Formación: Calle 52</p>
              <p>Fecha: 17/07/2024</p>
              <p>Hora: 2:30pm</p>
              <p>Ambiente: 413</p>
              <p>Profesional: Sebastian Ramírez</p>
              <p>Estado: Finalizado</p>
              <p>Observación: En compañia de Yudi</p>
            </div>
          </div>
          <div className="cardd col-md-4">
            <div className="card-content">
              <h2>Taller Deporte</h2>
              <p>Ficha: 2898745</p>
              <p>Centro Formación: Calle 52</p>
              <p>Fecha: 17/07/2024</p>
              <p>Hora: 1:30pm</p>
              <p>Ambiente: Ágora</p>
              <p>Profesional: Sebastian Ramirez</p>
              <p>Estado: Activo</p>
              <p>Observación: Ninguna</p>
            </div>
          </div>
        </div>
        <h3 className="h3">Martes:</h3>
        <br />
        <div className="cards">
          <div className="cardd">
            <div className="card-content">
              <h2>Taller Teatro</h2>
              <p>Ficha: 2470719</p>
              <p>Centro Formación: Calle 52</p>
              <p>Fecha: 18/07/2024</p>
              <p>Hora: 4:00pm</p>
              <p>Ambiente: 501</p>
              <p>Profesional: Sebastian Ramírez</p>
              <p>Estado: Activo</p>
              <p>Observación: Ficha femenina</p>
            </div>
          </div>
        </div>
        <h3 className="h3">Miercoles:</h3>
        <br />
        <div className="cards">
          <div className="cardd">
            <div className="card-content">
              <h2>Taller Psicología</h2>
              <p>Ficha: 2470712</p>
              <p>Centro Formación: Calle 52</p>
              <p>Fecha: 19/07/2024</p>
              <p>Hora: 2:30pm</p>
              <p>Ambiente: 205</p>
              <p>Profesional: Sebastian Ramírez</p>
              <p>Estado: Activo</p>
              <p>Observación: En compañia de Yudi</p>
            </div>
          </div>
          <div className="cardd">
            <div className="card-content">
              <h2>Taller Sexualidad</h2>
              <p>Ficha: 2587230</p>
              <p>Centro Formación: Calle 52</p>
              <p>Fecha: 19/07/2024</p>
              <p>Hora: 3:30pm</p>
              <p>Ambiente: 210</p>
              <p>Profesional: Sebastian Ramirez</p>
              <p>Estado: Activo</p>
              <p>Observación: En compañia de practicantes</p>
            </div>
          </div>
        </div>
        <h3 className="h3">Jueves:</h3>
        <br />
        <h4 className="h4">No cuenta con talleres para este día</h4>
        <h3 className="h3">Viernes:</h3>
        <br />
        <h4 className="h4">No cuenta con talleres para este día</h4>
      </main>
      <PiePagina />
    </div>

  )
}
export default Profespecifico;