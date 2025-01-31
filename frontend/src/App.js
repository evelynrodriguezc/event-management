import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';
import Register from "./components/Register";
import Login from "./components/Login";
import EventForm from "./components/EventForm";
import "bootstrap/dist/css/bootstrap.min.css";
import MyEvents from './components/MyEvents';
import AllEvents from './components/AllEvents';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
    // Listen for storage changes (login/logout)
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/events"; // Redirect to all events after logout
  };

  return (
    <Router>
      <div>
        <Navbar bg="light" expand="lg" className="mb-4">
          <Container>
            <Navbar.Brand as={Link} to="/events">Event Management App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/events">All Events</Nav.Link>
                {isLoggedIn && <Nav.Link as={Link} to="/my-events">My Events</Nav.Link>}
              </Nav>
              <Nav>
                {!isLoggedIn ? (
                  <>
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  </>
                ) : (
                  <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                    Logout
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Navigate to="/events" />} /> {/* Changed default route to /events */}
            <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/events" />} />
            <Route path="/login" element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/events" />} />
            <Route path="/my-events" element={isLoggedIn ? <MyEvents /> : <Navigate to="/login" />} />
            <Route path="/events" element={<AllEvents />} />
            <Route path="/events/new" element={isLoggedIn ? <EventForm /> : <Navigate to="/login" />} />
            <Route path="/events/edit/:id" element={isLoggedIn ? <EventForm /> : <Navigate to="/login" />} />
          </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default App;