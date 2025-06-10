import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import VideoDetail from "../components/VideoDetail";
import { Container, Row, Col } from "react-bootstrap";
import { BASE_URL } from '../utils';
import Home from "../components/MainContent"; // atau "../components/Home" jika filenya bernama Home.js
import Profile from "../components/Profile";


const VideoDetailPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State sidebar toggle dan halaman
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedPage, setSelectedPage] = useState(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // useEffect(() => {
  //   const fetchVideo = async () => {
  //     try {
  //       const res = await axios.get(`${BASE_URL}/api/videos/${id}`);
  //       setVideo(res.data.video);
  //     } catch (err) {
  //       setError("Gagal mengambil data video: " + err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchVideo();
  // }, [id]);
  
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/videos/${id}`);
        console.log("🔍 Response dari backend:", res.data);
        
        if (!res.data.video) {
          setError("Video tidak ditemukan di server");
          return;
        }

        setVideo(res.data.video);
      } catch (err) {
        console.error("❌ Error saat fetch video:", err);
        setError("Gagal mengambil data video: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <div className="p-3" style={{ marginTop: '56px' }}>Loading...</div>;
  if (error) return <div className="p-3 text-danger" style={{ marginTop: '56px' }}>{error}</div>;

  const renderContent = () => {
    switch (selectedPage) {
      case 'profile':
        return <Profile />;
      case 'home':
        return <Home />;
      default:
        return <VideoDetail video={video} />;
    }
  };

  return (
    <div>
      <Navbar onToggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Container fluid>
        <Row>
          {sidebarOpen && (
            <Col xs={2} className="bg-light min-vh-100 border-end p-0">
              <Sidebar onSelectPage={setSelectedPage} />
            </Col>
          )}
          <Col className="p-3" style={{ marginTop: '40px' }}>
            {renderContent()}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default VideoDetailPage;
