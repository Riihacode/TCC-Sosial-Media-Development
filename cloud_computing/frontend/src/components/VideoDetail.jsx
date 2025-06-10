import { Button, Row, Col, Image } from "react-bootstrap";
import { BASE_URL } from '../utils';

const VideoDetail = ({ video }) => {
  return (
    <div className="p-3">
      {/* Video player */}
      <div className="ratio ratio-16x9 mb-3">
        <video controls style={{ width:"100%" }} src={`${BASE_URL}${video.video_url}`} />
      </div>

      {/* Judul video */}
      <h5 className="fw-bold">{video.title}</h5>

      {/* Info channel + subscribe */}
      <Row className="align-items-center mb-3">
        <Col md={8}>
          <div className="d-flex align-items-center">
            <Image
              src={`${BASE_URL}${video.user.profile_pic}`}
              roundedCircle
              width={48}
              height={48}
              className="me-2"
            />
            <div>
              <div className="fw-bold">{video.user.username}</div>
              <div className="text-muted small">{video.user.slug}</div>
            </div>
            <Button variant="outline-dark" size="sm" className="ms-3">
              Subscribe
            </Button>
          </div>
        </Col>

        {/* Tombol aksi */}
        <Col md={4} className="text-end">
          <div className="btn-group">
            <Button variant="outline-secondary" size="sm">👍 Like</Button>
            <Button variant="outline-secondary" size="sm">👎</Button>
            <Button variant="outline-secondary" size="sm">🔗 Share</Button>
            <Button variant="outline-secondary" size="sm">💾 Save</Button>
          </div>
        </Col>
      </Row>

      {/* Deskripsi */}
      <div className="bg-light p-3 rounded mb-3">
        <div className="text-muted mb-2">
          Diunggah pada: {new Date(video.uploaded_at).toLocaleDateString()}
        </div>
        <div>{video.description}</div>
      </div>
    </div>
  );
};

export default VideoDetail;
