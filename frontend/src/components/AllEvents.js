import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Container, Table, Form, Button } from "react-bootstrap";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [hasPastEvents, setHasPastEvents] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Filter events based on current date
  const filterEventsByDate = (events) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const pastEvents = events.filter(event => new Date(event.date) < today);
    const currentAndFutureEvents = events.filter(event => new Date(event.date) >= today);
    
    setHasPastEvents(pastEvents.length > 0);
    return showPastEvents ? pastEvents : currentAndFutureEvents;
  };

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/events", {
        params: { date, location },
      });
      const filteredEvents = filterEventsByDate(response.data);
      setEvents(filteredEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, [date, location, showPastEvents]);

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
  };

  return (
    <Container className="py-5">
      {/* Title and Past Events Toggle */}
      <div 
        className="d-flex justify-content-between align-items-center mb-5 p-4 rounded-3"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <h2 className="m-0" style={{ color: '#1E293B', fontWeight: 'bold' }}>Eventos</h2>
        {hasPastEvents && (
          <Button 
            onClick={() => setShowPastEvents(!showPastEvents)}
            style={{
              backgroundColor: '#A9EED1',
              border: 'none',
              color: '#1E293B',
              padding: '10px 20px',
              borderRadius: '12px',
              fontWeight: '600'
            }}
            className="shadow-sm"
          >
            {showPastEvents ? 'Próximos Eventos' : 'Eventos Pasados'}
          </Button>
        )}
      </div>

      {/* Filters Form */}
      <div 
        className="p-4 rounded-3 mb-5"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <Form onSubmit={handleFilter}>
          <div className="row g-3">
            <div className="col-md-5">
              <Form.Group>
                <Form.Label style={{ color: '#1E293B', fontWeight: '600' }}>Fecha</Form.Label>
                <Form.Control 
                  type="date" 
                  value={date} 
                  onChange={(e) => setDate(e.target.value)}
                  className="rounded-3 border-0 shadow-sm"
                  style={{ padding: '12px' }}
                />
              </Form.Group>
            </div>
            <div className="col-md-5">
              <Form.Group>
                <Form.Label style={{ color: '#1E293B', fontWeight: '600' }}>Ubicación</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Ejemplo: Bogotá"
                  value={location} 
                  onChange={(e) => setLocation(e.target.value)}
                  className="rounded-3 border-0 shadow-sm"
                  style={{ padding: '12px' }}
                />
              </Form.Group>
            </div>
            <div className="col-md-2 d-flex align-items-end gap-2">
              <Button 
                type="submit" 
                className="flex-grow-1"
                style={{
                  backgroundColor: '#E64A2E',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: '600'
                }}
              >
                Filtrar
              </Button>
              <Button 
                type="button" 
                onClick={clearFilters}
                className="flex-grow-1"
                style={{
                  backgroundColor: '#A9EED1',
                  border: 'none',
                  color: '#1E293B',
                  padding: '12px',
                  borderRadius: '12px',
                  fontWeight: '600'
                }}
              >
                Limpiar
              </Button>
            </div>
          </div>
        </Form>
      </div>

      {/* Events Table */}
      <div 
        className="rounded-3 overflow-hidden"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <Table hover className="mb-0">
          <thead>
            <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
              <th className="px-4 py-3" style={{ color: '#1E293B', fontWeight: '600' }}>Nombre</th>
              <th className="px-4 py-3" style={{ color: '#1E293B', fontWeight: '600' }}>Fecha</th>
              <th className="px-4 py-3" style={{ color: '#1E293B', fontWeight: '600' }}>Hora</th>
              <th className="px-4 py-3" style={{ color: '#1E293B', fontWeight: '600' }}>Ubicación</th>
              <th className="px-4 py-3" style={{ color: '#1E293B', fontWeight: '600' }}>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event._id}>
                  <td className="px-4 py-3">{event.name}</td>
                  <td className="px-4 py-3">{formatDate(event.date)}</td>
                  <td className="px-4 py-3">{event.time}</td>
                  <td className="px-4 py-3">{event.location}</td>
                  <td className="px-4 py-3">{event.description}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center px-4 py-5">
                  {showPastEvents
                    ? "No hay eventos pasados encontrados"
                    : "No hay eventos encontrados"}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AllEvents;