import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import AppNavbar from '../components/Navbar';
import Studio from '../components/Studio';

const StudioPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
  <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#FFD700' }}>
    <AppNavbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
    <Container fluid>
      <Row>
        {sidebarOpen && (
          <Col
            xs={2}
            className="min-vh-100 border-end p-0"
            style={{
              backgroundColor: '#1c1c1c',
              borderRight: '1px solid #FFD700',
              color: '#FFD700',
            }}
          >
            <Sidebar />
          </Col>
        )}
        <Col
          className="p-3"
          style={{
            marginTop: '56px',
            backgroundColor: '#1c1c1c',
            color: '#FFD700',
          }}
        >
          <Studio />
        </Col>
      </Row>
    </Container>
  </div>
);
}

export default StudioPage;
