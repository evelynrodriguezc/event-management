import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Modal, Form, Button } from 'react-bootstrap';

const Login = ({ show, handleClose, setIsLoggedIn, handleShowRegister }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/auth/login", formData);
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      handleClose();
      navigate("/events");
    } catch (error) {
        if (error.response?.status === 400) {
          setError(
            <div>
              Account not found. 
              <Button 
                variant="link" 
                onClick={() => {
                  handleClose();
                  handleShowRegister();
                }}
                className="p-0 ms-1"
                style={{ textDecoration: 'none', color: '#FF4B6A' }}
              >
                Create an account?
              </Button>
            </div>
          );
        } else {
          setError("Login failed. Please check your credentials.");
        }
      }
    };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
        {error && (  // Add error display
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="danger" type="submit" style={{ backgroundColor: "#FF4B6A", border: "none" }}>
              Log in
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Login;