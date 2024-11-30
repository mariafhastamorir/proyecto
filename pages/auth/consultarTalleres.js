import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Container, Spinner, Modal } from "react-bootstrap";
import axios from "axios";
import Navbar from '../../components/navbar';
import PiePagina from '../../components/piePagina';

function ConsultarTaller() {
  const [coordinacion, setCoordinacion] = useState("");
  const [tema, setTema] = useState("");
  const [numFicha, setNumFicha] = useState("");
  const [coordinaciones, setCoordinaciones] = useState([]);
  const [temas, setTemas] = useState([]);
  const [fichas, setFichas] = useState([]);
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  // Estado para el modal de confirmación
  const [mostrarModalEliminar, setMostrarModalEliminar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false); // Estado para el modal de editar
  const [mensajeConfirmacion, setMensajeConfirmacion] = useState('');
  const [tallerAEliminar, setTallerAEliminar] = useState(null); // Guardar el taller seleccionado para eliminar
  const [tallerAEditar, setTallerAEditar] = useState({
    idTaller: '',
    tema: '',
    observaciones: '',
    coordinacion: '',
    numFicha: '',
    fechaYHora: ''
  }); // Guardar el taller seleccionado para editar
  const [mensaje, setMensaje] = useState(""); // Mensaje de éxito o error tras eliminar

  useEffect(() => {
    const cargarOpciones = async () => {
      try {
        const responseCoordinacion = await axios.get("http://localhost:8000/getCoordinaciones");
        setCoordinaciones(responseCoordinacion.data);

        const responseTema = await axios.get("http://localhost:8000/getTematica");
        setTemas(responseTema.data);

        const responseFicha = await axios.get("http://localhost:8000/getNumFicha");
        setFichas(responseFicha.data);
      } catch (error) {
        console.error("Error al cargar las opciones", error);
        setError("Error al cargar las opciones. Por favor, intente más tarde.");
      }
    };

    cargarOpciones();
  }, []);

  // Abre el modal con los datos del taller que deseas editar
  const handleEditar = (taller) => {
    setTallerAEditar(taller);  // Establece los valores iniciales en el formulario
    setMostrarModalEditar(true);  // Muestra el modal de edición
  };

  // Función para manejar la actualización del taller
  const handleGuardarEdicion = async () => {
    if (!tallerAEditar.idTaller) return;

    try {
      const response = await axios.put(`http://localhost:8000/editartaller/${tallerAEditar.idTaller}`, tallerAEditar);

      if (response.status === 200) {
        setMensaje("Taller actualizado exitosamente.");
        // Actualiza la lista de talleres con el taller actualizado
        setResultados(resultados.map(t => t.idTaller === tallerAEditar.idTaller ? response.data : t));
        setMostrarModalEditar(false); // Cierra el modal de edición
      } else {
        setMensaje("Error al actualizar el taller. Intente más tarde.");
      }
    } catch (error) {
      console.error("Error al actualizar el taller", error);
      setMensaje("Ocurrió un error. Intente más tarde.");
    }
  };

  const handleEliminar = async () => {
    if (!tallerAEliminar || !tallerAEliminar.idTaller) {
      console.error("No se seleccionó un taller para eliminar.");
      setMensaje("No se pudo eliminar el taller. Inténtelo nuevamente.");
      return;
    }

    try {
      const response = await axios.delete(`http://localhost:8000/eliminartaller/${tallerAEliminar.idTaller}`);

      if (response.status === 200) {
        setMensaje("Taller eliminado exitosamente.");
        // Actualizar la lista de resultados eliminando el taller
        const nuevosResultados = resultados.filter(t => t.idTaller !== tallerAEliminar.idTaller);
        setResultados(nuevosResultados);
      } else {
        setMensaje("Error al eliminar el taller. Intente más tarde.");
      }
    } catch (error) {
      console.error("Error al eliminar el taller:", error.response?.data || error.message);
      setMensaje("Ocurrió un error. Intente más tarde.");
    } finally {
      setMostrarModalEliminar(false); // Cerrar el modal de eliminación
    }
  };

  const abrirModalEliminar = (taller) => {
    setTallerAEliminar(taller);
    setMostrarModalEliminar(true);
    setMensaje(""); // Reiniciar mensajes previos
  };

  const handleCerrarModal = () => {
    setMostrarModalEliminar(false);
    setMostrarModalEditar(false);
    setTallerAEliminar(null);
    setTallerAEditar({
      idTaller: '',
      tema: '',
      observaciones: '',
      coordinacion: '',
      numFicha: '',
      fechaYHora: ''
    });
  };

  const handleConsultar = async (event) => {
    event.preventDefault();
    setError(""); // Reiniciar mensajes de error
    setResultados([]); // Reiniciar resultados previos
    setMostrarResultados(false); // Ocultar resultados previos
    setLoading(true); // Mostrar el spinner

    // Validación: al menos un campo debe estar seleccionado
    if (!coordinacion && !tema && !numFicha) {
      setError("Por favor, seleccione al menos una opción para consultar.");
      setLoading(false); // Detener el spinner
      return;
    }

    try {
      const response = await axios.post("http://localhost:8000/consultartaller", {
        coordinacion,
        tema,
        numFicha,
      });

      if (response.status === 200) {
        const data = response.data;

        if (data.length === 0) {
          setMostrarResultados(true); // Activar renderizado de resultados vacíos
          setResultados([]); // Asegurar que los resultados están vacíos
        } else {
          setMostrarResultados(true); // Activar renderizado de resultados
          setResultados(data); // Guardar los resultados del servidor
        }
      } else {
        setError("Error inesperado en la consulta. Intente más tarde.");
      }
    } catch (error) {
      console.error("Error al consultar talleres", error);
      setError("No hay talleres por mostrar.");
    } finally {
      setLoading(false); // Detener el spinner
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="mt-4">
        <h2 className="h2A mb-4 text-center">Consultar Taller</h2>
        <Form onSubmit={handleConsultar} className="agendamiento">
          <Row className="mb-3">
            {/* Coordinación */}
            <Col md={4}>
              <Form.Group controlId="coordinacion">
                <Form.Label>Coordinación:</Form.Label>
                <Form.Select
                  value={coordinacion}
                  onChange={(e) => setCoordinacion(e.target.value)}
                >
                  <option value="">Seleccione una coordinación</option>
                  {coordinaciones.map((coord) => (
                    <option key={coord.idCoordinacion} value={coord.nombreCoordinacion}>
                      {coord.nombreCoordinacion}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Temática */}
            <Col md={4}>
              <Form.Group controlId="tema">
                <Form.Label>Tema:</Form.Label>
                <Form.Select
                  value={tema}
                  onChange={(e) => setTema(e.target.value)}
                >
                  <option value="">Seleccione la temática</option>
                  {temas.map((tem) => (
                    <option key={tem.idTematicas} value={tem.tema}>
                      {tem.tema}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            {/* Número de ficha */}
            <Col md={4}>
              <Form.Group controlId="numFicha">
                <Form.Label>Número de Ficha:</Form.Label>
                <Form.Select
                  value={numFicha}
                  onChange={(e) => setNumFicha(e.target.value)}
                >
                  <option value="">Seleccione un número de ficha</option>
                  {fichas.map((ficha) => (
                    <option key={ficha.idFicha} value={ficha.numFicha}>
                      {ficha.numFicha}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-center">
            <Button type="submit" variant="success">Consultar</Button>
          </div>
        </Form>

        <br />
        <br />

        {!loading && error && (
          <div className="alert alert-danger mt-4 text-center">{error}</div>
        )}

{!loading && mostrarResultados && (
          resultados.length === 0 ? (
            <p className="h22 text-center">No hay talleres para mostrar.</p>
          ) : (
            <Row>
              {resultados.map((taller) => (
                <Col key={taller.idTaller} md={4} className="mb-4">
                  <Card>
                    <Card.Body>
                      <Card.Title className="text-verde">Taller: {taller.tema}</Card.Title>
                      <Card.Text className="text-verde">
                        <p><strong>Coordinación:</strong> {taller.coordinacion}</p>
                        <p><strong>Número de Ficha:</strong> {taller.numFicha}</p>
                        <p><strong>Fecha y Hora:</strong> {new Date(taller.fechaYHora).toLocaleString()}</p>
                        <p><strong>Nombre Profesional:</strong> {taller.nombre_profesional}</p>
                        <p><strong>Observaciones:</strong> {taller.observaciones}</p>
                      </Card.Text>
                      <Button variant="warning"  onClick={() => handleEditar(taller)} className="mr-2 editar-btn">Editar</Button>
                      <Button variant="danger" onClick={() => abrirModalEliminar(taller)}>Eliminar</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )
        )}
        
        {loading && (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        )}
      </Container>

      {/* Modal de confirmación de eliminación */}
      <Modal show={mostrarModalEliminar} onHide={handleCerrarModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que desea eliminar el taller de <strong>{tallerAEliminar?.tema}</strong> de la ficha <strong>{tallerAEliminar?.numFicha}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCerrarModal}>
            No
          </Button>
          <Button variant="danger" onClick={handleEliminar}>
            Sí
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de edición */}
      <Modal show={mostrarModalEditar} onHide={handleCerrarModal}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Taller</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Tema */}
          <Form.Group>
            <Form.Label>Tema:</Form.Label>
            <Form.Control
              as="select"
              value={tallerAEditar.tema}
              onChange={(e) => setTallerAEditar({ ...tallerAEditar, tema: e.target.value })}
              className="opcion"
            >
              {temas.map((tem) => (
                    <option key={tem.idTematicas} value={tem.tema}>
                      {tem.tema}
                    </option>
                  ))}
            </Form.Control>
          </Form.Group>

          {/* Número de Ficha */}
          <Form.Group>
            <Form.Label>Número de Ficha:</Form.Label>
            <Form.Control
              as="select"
              value={tallerAEditar.numFicha}
              onChange={(e) => setTallerAEditar({ ...tallerAEditar, numFicha: e.target.value })}
              className="opcion"
            >
              {fichas.map((ficha) => (
                    <option key={ficha.idFicha} value={ficha.numFicha}>
                      {ficha.numFicha}
                    </option>
                  ))}
            </Form.Control>
          </Form.Group>

          {/* Fecha y Hora */}
          <Form.Group>
            <Form.Label>Fecha y Hora:</Form.Label>
            <Form.Control
              type="datetime-local"
              value={tallerAEditar.fechaYHora}
              onChange={(e) => setTallerAEditar({ ...tallerAEditar, fechaYHora: e.target.value })}
              className="opcion"
            />
          </Form.Group>

          {/* Observaciones */}
          <Form.Group>
            <Form.Label>Observaciones:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={tallerAEditar.observaciones}
              onChange={(e) => setTallerAEditar({ ...tallerAEditar, observaciones: e.target.value })}
              className="opcion"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCerrarModal}>Cancelar</Button>
        <Button variant="primary" onClick={handleGuardarEdicion}>Guardar cambios</Button>
      </Modal.Footer>
    </Modal>

      <PiePagina />
    </div>
  );
}

export default ConsultarTaller;