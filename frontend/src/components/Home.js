import React, { useState } from "react";
import { Container, Button, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Footer from './Footer';
import conferencePic from '../assets/conferencePic.png';
import meetupPic from '../assets/meetupPic.png';
import workshopPic from '../assets/workshopPic.png';
import car1 from '../assets/car1.jpg';
import car2 from '../assets/car2.jpg';
import car3 from '../assets/car3.jpg';
import car4 from '../assets/car4.jpg';
import car5 from '../assets/car5.jpg';
import car6 from '../assets/car6.jpg';

const Home = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // Sample event data - you can expand this
  const events = [
    {
      group: [
        { img: car1, title: "Tech Conference 2024", desc: "Conferencia Internacional" },
        { img: car5, title: "Developer Meetup", desc: "Encuentro de desarrolladores" },
        { img: car3, title: "AI Workshop", desc: "Taller práctico" }
      ]
    },
    {
      group: [
        { img: car4, title: "Data Science Summit", desc: "Cumbre de ciencia de datos" },
        { img: car2, title: "StartUp Weekend", desc: "Evento de emprendimiento" },
        { img: car6, title: "Cloud Computing Day", desc: "Jornada de computación en la nube" }
      ]
    }
    // Add more groups of 3 as needed
  ];

  return (
    <div className="d-flex flex-column min-vh-100">
      <div 
        style={{
          background: 'linear-gradient(135deg, #E0F7F6 0%, #B2EBF2 100%)',
          position: 'fixed',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          minHeight: '100%'
        }}
      />

      <Container className="flex-grow-1" style={{ paddingTop: '120px', paddingBottom: '20px' }}>
        <div className="text-center position-relative mb-16" style={{ marginTop: '40px' }}>
          {/* Main heading with animation */}
          <h1 
            className="mb-6"
            style={{
              fontSize: "4rem",
              fontFamily: "Inter, sans-serif",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Próximos eventos de 
            <span className="d-block" style={{ color: '#E64A2E' }}>
              tecnología e innovación
            </span>
          </h1>

          <p 
            className="mb-8 mx-auto"
            style={{
              fontSize: "1.25rem",
              maxWidth: "800px",
              lineHeight: 1.6,
              color: '#4B5563'
            }}
          >
            Descubre conferencias, meetups, hackatones y otros eventos de
            innovación, tecnología, diseño y emprendimiento en Latinoamérica.
          </p>

          <Button 
            onClick={() => navigate('/events')}
            className="px-5 py-3"
            style={{
              backgroundColor: "#E64A2E",
              border: "none",
              borderRadius: "12px",
              fontSize: "1.1rem",
              fontWeight: "600",
              boxShadow: '0 4px 6px rgba(230,74,46,0.25)',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Próximos Eventos
          </Button>
        </div>

        <div className="mt-10 mb-4">
          <Carousel
            activeIndex={index}
            onSelect={handleSelect}
            interval={5000}
            indicators={true}
            style={{ 
              backgroundColor: 'transparent',
              padding: '20px 0'
            }}
          >
            {events.map((eventGroup, idx) => (
              <Carousel.Item key={idx}>
                <div className="d-flex justify-content-center gap-4">
                  {eventGroup.group.map((event, eventIdx) => (
                    <div
                      key={eventIdx}
                      className="bg-white rounded-3 overflow-hidden"
                      style={{
                        width: '300px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                      }}
                    >
                      <img
                        src={event.img}
                        alt={event.title}
                        style={{
                          width: '100%',
                          height: '200px',
                          objectFit: 'cover'
                        }}
                      />
                      <div className="p-4">
                        <h3 className="h5 mb-2">{event.title}</h3>
                        <p className="text-muted mb-0">{event.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </Container>

      <Footer />
    </div>
  );
};

export default Home;