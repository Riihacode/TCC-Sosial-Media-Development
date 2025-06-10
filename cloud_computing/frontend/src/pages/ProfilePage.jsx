import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Profile from '../components/Profile';

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState('profile'); // 'home' or 'profile' etc

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch (selectedPage) {
      case 'profile':
        return <Profile />;
    }
  };

  return (
    <div style={{ 
      backgroundColor:"#1c1c1c",
      height: "100vh"
       }}>
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

export default ProfilePage;
