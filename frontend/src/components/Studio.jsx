import React, { useEffect, useState } from "react";
import { getVideosBySlug, deleteVideo } from "../api";
import { jwtDecode } from 'jwt-decode';
import { Card, Col, Row, Button, Spinner } from "react-bootstrap";
import { getUserById } from "../api";

// const BASE_URL = "http://localhost:3000/";
const BASE_URL = "https://backend-api-sosial-media-872136705893.us-central1.run.app/";

const Studio = () => {
  const [slug, setSlug] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");

  //   if (!token) {
  //     console.warn("Token tidak ditemukan");
  //     return;
  //   }

  //   try {
  //     const decoded = jwtDecode(token);
  //     setSlug(decoded.slug);
  //   } catch (error) {
  //     console.error("Token tidak valid:", error);
  //   }
  // }, []);

  useEffect(() => {
    getUserById()
      .then(res => setSlug(res.user.slug))
      .catch(err => console.error("Gagal ambil slug:", err));
  }, []);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    getVideosBySlug(slug)
      .then((data) => {
        if (data && Array.isArray(data.videos)) {
          setVideos(data.videos);
        } else {
          setVideos([]);
          console.warn("Format data API tidak sesuai:", data);
        }
      })
      .catch((err) => {
        console.error("Gagal memuat video:", err);
        setVideos([]);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus video ini?")) return;

    try {
      await deleteVideo(id);
      setVideos((prev) => prev.filter((video) => video.id !== id));
    } catch (err) {
      console.error("Gagal menghapus video:", err);
      alert("Gagal menghapus video.");
    }
  };

  return (
  <div className="p-4" style={{ maxWidth: '1200px', margin: 'auto', backgroundColor: '#1c1c1c', color: '#FFD700' }}>
    <h2 className="mb-4 fw-bold" style={{ letterSpacing: '1.5px', color: '#FFD700' }}>
      Studio: {slug || "Loading..."}
    </h2>

    {loading ? (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" variant="warning" role="status" />
        <span className="ms-2 fs-5" style={{ color: '#888' }}>Loading videos...</span>
      </div>
    ) : videos.length === 0 ? (
      <p className="fs-5 text-center mt-5" style={{ color: '#888' }}>Tidak ada video untuk ditampilkan.</p>
    ) : (
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {videos.map((video) => (
          <Col key={video.id}>
            <Card
              className="h-100"
              style={{
                backgroundColor: '#1c1c1c',
                border: '1px solid #FFD700',
                borderRadius: '12px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 1rem 2rem rgba(255, 215, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 0.125rem 0.25rem rgba(0,0,0,0.1)';
              }}
            >
              <div className="ratio ratio-16x9">
                <Card.Img
                  src={`${BASE_URL}${video.thumbnail_url}`}
                  alt={video.title}
                  className="rounded-top"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <Card.Body className="d-flex flex-column justify-content-between text-light">
                <Card.Title
                  className="fs-6 fw-semibold text-truncate"
                  title={video.title}
                  style={{ color: '#FFD700' }}
                >
                  {video.title}
                </Card.Title>
                <Button
                  variant="outline-danger"
                  size="sm"
                  className="mt-3 align-self-start"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(video.id);
                  }}
                  style={{
                    borderRadius: '20px',
                    fontWeight: '600',
                    color: '#FFD700',
                    borderColor: '#FFD700',
                    backgroundColor: 'transparent',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#FFD700';
                    e.currentTarget.style.color = '#1c1c1c';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#FFD700';
                  }}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )}
  </div>
);

};

export default Studio;
