import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from './Footer';
import conferencePic from '../assets/conferencePic.png';
import meetupPic from '../assets/meetupPic.png';
import workshopPic from '../assets/workshopPic.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Apply a global style to ensure full width background */}
      <style>
        {`
          body {
            background-color: #E0F7F6;
          }
        `}
      </style>
      
      <div style={{ 
        minHeight: "90vh",
        paddingTop: "50px"
      }}>
        <Container className="text-center">
        <h1 
            className="mb-4" 
            style={{ 

                fontSize: "3.5rem",
                fontFamily: "Inter, sans-serif",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                lineHeight: 1.1,
                paddingTop: "60px"
            }}
        >
            Próximos eventos de tecnología e innovación
        </h1>
          
          <p className="mb-5" style={{ 
            fontSize: "1.2rem", 
            maxWidth: "800px", 
            margin: "0 auto" 
          }}>
            Descubre conferencias, meetups, hackatones y otros eventos de
            innovación, tecnología, diseño y emprendimiento en Latinoamérica.
          </p>

          <>
  <style>
    {`
      .custom-button:hover {
        background-color:rgb(210, 75, 51) !important;
      }
    `}
  </style>
  
  <Button 
    className="custom-button"
    variant="secondary" 
    size="lg" 
    onClick={() => navigate('/events')}
    style={{
      backgroundColor: "#E64A2E",
      border: "none",
      padding: "10px 35px",
      borderRadius: "12px"
    }}
  >
    Próximos Eventos
  </Button>
</>

          <div className="d-flex justify-content-center gap-4 mt-5">
            <img 
              src={conferencePic}
              alt="Conference" 
              style={{ 
                width: "300px", 
                height: "250px", 
                objectFit: "cover",
                borderRadius: "15px"
              }}
            />
            <img 
              src={meetupPic}
              alt="Meetup" 
              style={{ 
                width: "300px", 
                height: "250px", 
                objectFit: "cover",
                borderRadius: "15px"
              }}
            />
            <img 
              src={workshopPic}
              alt="Workshop" 
              style={{ 
                width: "300px", 
                height: "250px", 
                objectFit: "cover",
                borderRadius: "15px"
              }}
            />
          </div>
        </Container>
      </div>
      <Footer />  {/* Add the footer here */}
    </>
  );
};

export default Home;