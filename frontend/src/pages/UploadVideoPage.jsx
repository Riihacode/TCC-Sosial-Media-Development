import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import VideoUploadForm from '../components/UploadVideo';

const VideoUploadPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState('videoUpload'); // 'home' or 'profile' etc

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch (selectedPage) {
      case 'videoUpload':
        return <VideoUploadForm />;
    }
  };

  return (
  <div className="bg-dark text-light min-vh-100">
    <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

    <Container fluid className="pt-4">
      <Row>
        {sidebarOpen && (
          <Col
            xs={12}
            md={3}
            lg={2}
            className="bg-secondary border-end border-dark min-vh-100 p-0"
          >
            <Sidebar onSelectPage={setSelectedPage} />
          </Col>
        )}

        <Col
          className="p-4"
          style={{
            marginTop: '56px',
            backgroundColor: '#1c1c1c',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(255,255,255,0.05)',
          }}
        >
          {renderContent()}
        </Col>
      </Row>
    </Container>
  </div>
);

};

export default VideoUploadPage;
