import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Container, Table, Form, Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2, Plus } from 'lucide-react';
import { toast } from 'react-toastify';

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

    // Estados para los modales
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

  const fetchEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Por favor, inicia sesión para ver tus eventos.");
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
      toast.error("Error al cargar los eventos.");
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
  };

  const handleDeleteClick = (id) => {
    setSelectedEventId(id);
    setShowDeleteModal(true);
  };

  const handleEditClick = (id) => {
    setSelectedEventId(id);
    setShowEditModal(true);
  };

  const confirmDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/api/events/${selectedEventId}`, {
        headers: { "x-auth-token": token },
      });
      toast.success('¡Evento eliminado correctamente!');
      fetchEvents();
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error('Error al eliminar el evento. Por favor, inténtalo de nuevo.');
    }
  };

  const confirmEdit = () => {
    navigate(`/events/edit/${selectedEventId}`);
    setShowEditModal(false);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    
    if (!window.confirm("¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/events/${id}`, {
        headers: { "x-auth-token": token },
      });
      toast.success('¡Evento eliminado correctamente!');
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error('Error al eliminar el evento. Por favor, inténtalo de nuevo.');
    }
  };

  const handleEdit = (id) => {
    if (window.confirm("¿Estás seguro de que quieres editar este evento?")) {
      navigate(`/events/edit/${id}`);
    }
  };

  return (
    <>
    <Container className="py-5">
      {/* Title and Create Button */}
      <div 
        className="d-flex justify-content-between align-items-center mb-5 p-4 rounded-3"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <h2 className="m-0" style={{ color: '#1E293B', fontWeight: 'bold' }}>Mis Eventos</h2>
        <Button 
          onClick={() => navigate('/events/new')}
          style={{
            backgroundColor: '#3EB489',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          className="shadow-sm"
        >
          <Plus size={20} />
          Crear Nuevo Evento
        </Button>
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
                  backgroundColor: '#E0F7F6',
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
              <th className="px-4 py-3" style={{ color: '#1E293B', fontWeight: '600' }}>Acciones</th>
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
                  <td className="px-4 py-3">
  <div className="d-flex gap-2">
    <Button 
      onClick={() => handleEditClick(event._id)}
      style={{
        backgroundColor: '#E0F7F6',
        border: 'none',
        padding: '8px',
        borderRadius: '8px'
      }}
    >
      <Pencil size={18} color="#1E293B" />
    </Button>
    <Button 
      onClick={() => handleDeleteClick(event._id)}
      style={{
        backgroundColor: '#FFE5E5',
        border: 'none',
        padding: '8px',
        borderRadius: '8px'
      }}
    >
      <Trash2 size={18} color="#DC2626" />
    </Button>
  </div>
</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center px-4 py-5">
                  No hay eventos encontrados
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
    {/* Modal de Confirmación de Eliminación */}
    <Modal 
    show={showDeleteModal} 
    onHide={() => setShowDeleteModal(false)}
    centered
    dialogClassName="modal-rounded"
  >
    <div className="rounded-4 overflow-hidden" style={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
    }}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#1E293B', fontWeight: 'bold' }}>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={() => setShowDeleteModal(false)}
          style={{
            backgroundColor: '#E0F7F6',
            border: 'none',
            color: '#1E293B',
            padding: '8px 16px',
            borderRadius: '12px',
            fontWeight: '600'
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={confirmDelete}
          style={{
            backgroundColor: '#DC2626',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '12px',
            fontWeight: '600'
          }}
        >
          Eliminar
        </Button>
      </Modal.Footer>
    </div>
  </Modal>

  {/* Modal de Confirmación de Edición */}
  <Modal 
    show={showEditModal} 
    onHide={() => setShowEditModal(false)}
    centered
    dialogClassName="modal-rounded" 
  >
    <div className="rounded-4 overflow-hidden" style={{
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
    }}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#1E293B', fontWeight: 'bold' }}>Confirmar Edición</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que quieres editar este evento?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={() => setShowEditModal(false)}
          style={{
            backgroundColor: '#E0F7F6',
            border: 'none',
            color: '#1E293B',
            padding: '8px 16px',
            borderRadius: '12px',
            fontWeight: '600'
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={confirmEdit}
          style={{
            backgroundColor: '#E64A2E',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '12px',
            fontWeight: '600'
          }}
        >
          Editar
        </Button>
      </Modal.Footer>
    </div>
  </Modal>
</>
  );
};

export default MyEvents;