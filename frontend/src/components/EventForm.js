import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      if (id) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`http://localhost:3000/api/events/${id}`, {
            headers: { "x-auth-token": token },
          });
          const event = response.data;
          // Format date for input field
          const formattedDate = event.date.split('T')[0];
          setEventData({ ...event, date: formattedDate });
        } catch (error) {
          console.error("Error fetching event:", error);
          toast.error("Error al cargar el evento");
        }
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/events/${id}`, eventData, {
          headers: { "x-auth-token": token },
        });
        toast.success('¡Evento actualizado correctamente!');
      } else {
        await axios.post("http://localhost:3000/api/events", eventData, {
          headers: { "x-auth-token": token },
        });
        toast.success('¡Evento creado correctamente!');
      }
      navigate("/my-events");
    } catch (error) {
      console.error("Error:", error);
      toast.error('Error al procesar el evento. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <Container className="py-5">
      <div 
        className="p-4 rounded-3 mb-5 mx-auto"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxWidth: '600px'
        }}
      >
        <h2 className="mb-4" style={{ color: '#1E293B', fontWeight: 'bold' }}>
          {id ? "Editar Evento" : "Crear Nuevo Evento"}
        </h2>
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#1E293B', fontWeight: '600' }}>Nombre del Evento</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              required
              className="rounded-3 border-0 shadow-sm"
              style={{ padding: '12px' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#1E293B', fontWeight: '600' }}>Fecha</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              required
              className="rounded-3 border-0 shadow-sm"
              style={{ padding: '12px' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#1E293B', fontWeight: '600' }}>Hora</Form.Label>
            <Form.Control
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              required
              className="rounded-3 border-0 shadow-sm"
              style={{ padding: '12px' }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ color: '#1E293B', fontWeight: '600' }}>Ubicación</Form.Label>
            <Form.Control
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              required
              className="rounded-3 border-0 shadow-sm"
              style={{ padding: '12px' }}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label style={{ color: '#1E293B', fontWeight: '600' }}>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={eventData.description}
              onChange={handleChange}
              rows={3}
              required
              className="rounded-3 border-0 shadow-sm"
              style={{ padding: '12px' }}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Button 
              type="submit"
              style={{
                backgroundColor: '#3EB489',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '600'
              }}
            >
              {id ? "Actualizar Evento" : "Crear Evento"}
            </Button>
            <Button 
              type="button"
              onClick={() => navigate('/my-events')}
              style={{
                backgroundColor: '#E0F7F6',
                border: 'none',
                color: '#1E293B',
                padding: '12px 24px',
                borderRadius: '12px',
                fontWeight: '600'
              }}
            >
              Cancelar
            </Button>
          </div>
        </Form>
      </div>
    </Container>
  );
};

export default EventForm;