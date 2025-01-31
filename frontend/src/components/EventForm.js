import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

const formatDateForServer = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    // Adjust for timezone offset
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`http://localhost:3000/api/events/${id}`, {
            headers: { "x-auth-token": token }
          });
          
          const event = response.data;
          // Convert date to input format (YYYY-MM-DD)
          const dateObj = new Date(event.date);
          const formattedDate = dateObj.toISOString().split('T')[0];
          
          setFormData({
            name: event.name,
            date: formattedDate,
            time: event.time,
            location: event.location,
            description: event.description,
          });
        } catch (error) {
          console.error("Error fetching event:", error);
          alert("Failed to load event details.");
          navigate("/events");
        }
      };

      fetchEvent();
    }
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You need to log in to create or edit an event.");
      return;
    }

    try {
      // Format the date to MM/DD/YYYY before sending
      const formattedData = {
        ...formData,
        date: formatDateForServer(formData.date)
      };

      if (id) {
        await axios.put(`http://localhost:3000/api/events/${id}`, formattedData, {
          headers: { "x-auth-token": token, "Content-Type": "application/json" },
        });
      } else {
        await axios.post("http://localhost:3000/api/events", formattedData, {
          headers: { "x-auth-token": token, "Content-Type": "application/json" },
        });
      }
      navigate("/events");
    } catch (error) {
      if (error.response?.status === 403) {
        alert("You are not authorized to edit this event. Only the creator can edit it.");
      } else {
        alert("Failed to save event.");
      }
      console.error("Error saving event:", error);
    }
  };

  return (
    <Container>
      <h2 className="my-4">{id ? "Edit Event" : "Create Event"}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Event Name</Form.Label>
          <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control type="time" name="time" value={formData.time} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control type="text" name="location" value={formData.location} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" name="description" value={formData.description} onChange={handleChange} required />
        </Form.Group>

        <Button variant="success" type="submit">
          {id ? "Update Event" : "Create Event"}
        </Button>
      </Form>
    </Container>
  );
};

export default EventForm;