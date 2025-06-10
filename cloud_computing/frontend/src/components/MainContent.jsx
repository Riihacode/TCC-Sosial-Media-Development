import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { getAllVideos } from '../api';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils';

const MainContent = () => {
const [videos, setVideos] = useState([]);
const navigate = useNavigate();

useEffect(() => {
const fetchVideos = async () => {
try {
const data = await getAllVideos();
setVideos(data);
} catch (error) {
console.error('Failed to fetch videos:', error);
}
};

fetchVideos();
}, []);

const handleCardClick = (video) => {
navigate(`/videos/${video.id}`);
};

return (
<div className="p-4" style={{
        backgroundColor: '#1c1c1c',
        minHeight: '100vh',
      }}>
  <Row>
    {videos.length === 0 ? (
    <p className="text-light">Loading videos...</p>
    ) : (
    videos.map((video, index) => (
    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
    <Card onClick={()=> handleCardClick(video)}
      style={{
                  cursor: 'pointer',
                  border: 'none',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  backgroundColor: '#2a2a2a',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  height: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
      onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.2)';
      }}
      onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
      }}
      >
      <div style={{ height: '180px', overflow: 'hidden' }}>
        <Card.Img src={`${video.thumbnail_url}`} alt={video.title}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
      </div>
      <Card.Body className="d-flex flex-column justify-content-between p-3" style={{ flex: 1 }}>
        <div>
          <Card.Title className="text-light fw-semibold mb-2" style={{
                        fontSize: '1rem',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }} title={video.title}>
            {video.title}
          </Card.Title>
          <Card.Text style={{
    color: '#ccc',
    fontSize: '0.85rem',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }} title={video.user?.username}>
            {video.user?.username}
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
    </Col>
    ))
    )}
  </Row>
</div>
);
};

export default MainContent;