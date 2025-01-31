import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Container, Table, Form, Button } from "react-bootstrap";


const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchEvents = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/events", {
        params: { date, location },
      });
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  }, [date, location]);

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
    // After clearing state, fetchEvents will be called automatically
    // due to the useEffect dependency on [fetchEvents] which depends on date and location
  };

  return (
    <Container>
      <h2 className="my-4">All Events</h2>
      <Form onSubmit={handleFilter} className="mb-4">
        <div className="row">
          <div className="col-md-5">
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
          </div>
          <div className="col-md-5">
            <Form.Group>
              <Form.Label>Location</Form.Label>
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
              Filter
            </Button>
            <Button 
              variant="secondary" 
              type="button" 
              onClick={clearFilters}
              className="flex-grow-1"
            >
              Clear
            </Button>
          </div>
        </div>
      </Form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Location</th>
            <th>Description</th>
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No events found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllEvents;