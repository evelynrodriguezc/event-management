import React, { useState } from "react";
import axios from "axios";
import { Modal, Form, Button, Alert } from 'react-bootstrap';

const Register = ({ show, handleClose, handleShowLogin }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/register", formData);
      
      if (response.status === 201) {
        handleClose();
        handleShowLogin();
        alert("Registration successful! Please log in.");
      }
    } catch (error) {
        if (error.response?.data?.message === 'User already exists') {
          setError(
            <div className="d-flex align-items-center justify-content-between">
              <span>Este correo ya se encuentra registrado.</span>
              <Button 
                variant="link" 
                onClick={() => {
                  handleClose();
                  handleShowLogin();
                }}
                style={{ color: '#E64A2E', textDecoration: 'none', padding: '0', marginLeft: '10px' }}
              >
                Log in instead
              </Button>
            </div>
          );
        } else {
          setError("Registration failed. Please try again.");
        }
      }
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Sign up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {error && (
                <Alert variant="danger" className="d-flex align-items-center">
                  {error}
                </Alert>
              )}
    
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Introduzca su nombre"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
    
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="ejemplo: usuario@ejemplo.com"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
    
              <Form.Group className="mb-3">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="**********"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
    
              <div className="d-grid gap-2">
                <Button 
                  variant="danger" 
                  type="submit" 
                  style={{ backgroundColor: "#E64A2E", border: "none" }}
                >
                  Registrarse
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      );
    };
    
    export default Register;