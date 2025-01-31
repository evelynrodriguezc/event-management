import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Container, Table, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};



const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const fetchEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in to view your events.");
        navigate("/login");
        return;
      }

      const response = await axios.get("http://localhost:3000/api/events/my/events", {
        headers: { "x-auth-token": token },
        params: { date, location },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, [date, location, navigate]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchEvents();
  };

  const clearFilters = () => {
    setDate("");
    setLocation("");
    // fetchEvents will be called automatically due to useEffect dependencies
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/events/${id}`, {
        headers: { "x-auth-token": token },
      });
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      alert("Failed to delete event.");
    }
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-4">
        <h2>Mis Eventos</h2>
        <Button variant="success" onClick={() => navigate('/events/new')}>
          Crear Nuevo Evento
        </Button>
      </div>

      <Form onSubmit={handleFilter} className="mb-4">
        <div className="row">
          <div className="col-md-5">
            <Form.Group>
              <Form.Label>Fecha</Form.Label>
              <Form.Control 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-md-5">
            <Form.Group>
              <Form.Label>Ubicación</Form.Label>
              <Form.Control 
                type="text" 
                placeholder="Enter location"
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-md-2 d-flex align-items-end gap-2">
            <Button variant="primary" type="submit" className="flex-grow-1">
              Filtrar
            </Button>
            <Button 
              variant="secondary" 
              type="button" 
              onClick={clearFilters}
              className="flex-grow-1"
            >
              Limpiar
            </Button>
          </div>
        </div>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Ubicación</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((event) => (
              <tr key={event._id}>
                <td>{event.name}</td>
                <td>{formatDate(event.date)}</td>
                <td>{event.time}</td>
                <td>{event.location}</td>
                <td>{event.description}</td>
                <td>
                  <Button 
                    variant="warning" 
                    size="sm" 
                    onClick={() => navigate(`/events/edit/${event._id}`)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No hay eventos encontrados</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default MyEvents;