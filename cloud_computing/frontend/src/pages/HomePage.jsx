import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import MainContent from '../components/MainContent';
import Profile from '../components/Profile';

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState('home'); // 'home' or 'profile' etc

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch (selectedPage) {
      case 'profile':
        return <Profile />;
      case 'home':
      default:
        return <MainContent />;
    }
  };

  return (
    <div style=
    {{ backgroundColor: "#1c1c1c" }}>
      <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Container fluid>
        <Row>
          {sidebarOpen && (
            <Col xs={2} className="bg-light min-vh-100 border-end p-0">
              <Sidebar onSelectPage={setSelectedPage} /> {/* kirim callback */}
            </Col>
          )}
          <Col className="p-3" style={{ marginTop: '56px' }}>
            {renderContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
