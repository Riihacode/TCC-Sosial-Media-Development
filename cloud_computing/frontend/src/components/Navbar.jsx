import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';

const TopNavbar = ({ onToggleSidebar }) => {
  return (
    <Navbar 
      bg="dark" 
      variant="dark" 
      fixed="top"
      style={{ 
        boxShadow: '0 2px 8px rgba(0,0,0,0.7)', 
        borderBottom: '1px solid #444' 
      }}
    >
      <Container fluid className="d-flex align-items-center">
        <Button 
          variant="outline-light" 
          onClick={onToggleSidebar} 
          className="me-3"
          style={{ 
            borderRadius: '8px', 
            padding: '8px 12px', 
            fontSize: '1.2rem', 
            transition: 'background-color 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#f1c40f';
            e.currentTarget.style.color = '#222';
            e.currentTarget.style.borderColor = '#f1c40f';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#fff';
            e.currentTarget.style.borderColor = '#fff';
          }}
        >
          <FaBars />
        </Button>

        <Navbar.Brand 
          style={{ 
            fontWeight: '700', 
            fontSize: '1.5rem', 
            letterSpacing: '2px',
            color: '#f1c40f',
            userSelect: 'none',
            cursor: 'default',
          }}
        >
          YouClube
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default TopNavbar;
