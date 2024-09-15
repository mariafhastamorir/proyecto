import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';
import "./admin.css";

const GestionprofB = () => {
  const [datos, setDatos] = useState([]); // Inicializar como un array vacío
  const [error, setError] = useState(null);

  useEffect(() => {
    // Hacer una llamada a la API de FastAPI
    axios.get("http://localhost:8000/vista")
      .then((response) => {
        console.log(response.data);  // Verificar que sea un array
        setDatos(response.data);  // Asignar los datos recibidos
      })
      .catch((err) => {
        console.error("Error al obtener los datos:", err);
        setError("No se pudieron cargar los datos.");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }


  return (
    <div>
      <Navbar />

      <h1>Datos de la Vista</h1>
      <ul>
        {datos.map((item, index) => (
          <li key={index}>{item.nombres}-
            {item.apellidos}  -
            {item.apellidos}  -
            {item.apellidos}  -
            {item.numeroDocumento} - {item.apellidos}</li>  // Muestra los datos
        ))}
      </ul>
      <PiePagina />
    </div>
  );


};

export default GestionprofB;