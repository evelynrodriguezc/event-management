import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import { Nav, Navbar, Container } from 'react-bootstrap';
import Register from "./components/Register";
import Login from "./components/Login";
import EventForm from "./components/EventForm";
import "bootstrap/dist/css/bootstrap.min.css";
import MyEvents from './components/MyEvents';
import AllEvents from './components/AllEvents';
import Home from './components/Home';
import logo from './assets/logo.png';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);


  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleCloseRegister = () => setShowRegister(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/"; // Redirect to home page after logout
  };


  return (
    <Router>
      <div>
      <Navbar 
  bg="light" 
  expand="lg" 
  className="mb-4" 
  style={{ 
    height: '80px',
    padding: '0 20px'
  }}
>
  <Container>
    <Navbar.Brand as={Link} to="/" >
      <img
        src={logo}
        height="38"
        className="d-inline-block align-top "
        alt="Techpoint Logo"
      />
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link 
          as={Link} 
          to="/events" 
          style={{ 
            fontSize: '1.1rem',
            fontWeight: '600',
          }}
        >
          All Events
        </Nav.Link>
        {isLoggedIn && 
          <Nav.Link 
            as={Link} 
            to="/my-events"
            style={{ 
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            My Events
          </Nav.Link>
        }
      </Nav>
      <Nav>
        {!isLoggedIn ? (
          <>
            <Nav.Link 
              onClick={handleShowLogin}
              style={{ 
                fontSize: '1.1rem',
                fontWeight: '600'
              }}
            >
              Login
            </Nav.Link>
            <Nav.Link 
              onClick={handleShowRegister}
              style={{ 
                fontSize: '1.1rem',
                fontWeight: '600'
              }}
            >
              Register
            </Nav.Link>
          </>
        ) : (
          <Nav.Link 
            onClick={handleLogout}
            style={{ 
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            Logout
          </Nav.Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

        <Login 
          show={showLogin} 
          handleClose={handleCloseLogin}
          setIsLoggedIn={setIsLoggedIn}
          handleShowRegister={handleShowRegister}
        />

        <Register 
        show={showRegister}
        handleClose={handleCloseRegister}
        handleShowLogin={handleShowLogin}
        />

        <Container className="mt-4">
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/" element={<Navigate to="/events" />} /> {/* Changed default route to /events */}
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