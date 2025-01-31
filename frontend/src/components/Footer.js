// src/components/Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <div style={{
      width: '100vw',
      position: 'relative',
      left: '50%',
      right: '50%',
      marginLeft: '-50vw',
      marginRight: '-50vw',
      backgroundColor: '#5F8F8F',
    }}>
      <footer style={{
        color: 'white',
        padding: '20px 0',
        marginTop: '50px',
        width: '100%'
      }}>
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5>TECHPOINT</h5>
              <p className="mb-0">© 2025 All rights reserved</p>
            </div>
            <div>
              <div className="d-flex gap-4">
                <a href="#" style={{ color: 'white', textDecoration: 'none' }}>About</a>
                <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Privacy Policy</a>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Footer;