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
  }, [date, location, showPastEvents]); // Added showPastEvents as dependency

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
    <Container>
            <div className="d-flex justify-content-between align-items-center my-4">
        <h2>All Events</h2>
        {hasPastEvents && (
          <Button 
            variant="secondary" 
            onClick={() => setShowPastEvents(!showPastEvents)}
          >
            {showPastEvents ? 'Show Upcoming Events' : 'Show Past Events'}
          </Button>
        )}
      </div>
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
              <td colSpan="5" className="text-center">
                {showPastEvents 
                  ? "No past events found" 
                  : "No upcoming events found"}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default AllEvents;