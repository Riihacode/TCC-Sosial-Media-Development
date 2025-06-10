import React from 'react';
import { logoutUser } from '../api';
import Nav from 'react-bootstrap/Nav';
import { useNavigate } from 'react-router-dom';
import { 
  FaHome, FaRegUser, FaFileUpload, FaFire, FaSignOutAlt 
} from 'react-icons/fa';

const Sidebar = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // Cek apakah accessToken ada di localStorage
  const accessToken = localStorage.getItem('accessToken');
  const isLoggedIn = !!accessToken;

  console.log("access token: ", accessToken);

  const handleLogout = async () => {
    if (!isLoggedIn) return; // jika belum login, langsung return

    try {
      setLoading(true);
      await logoutUser();
      localStorage.clear();
      alert("Berhasil Logout");
      navigate('/');
    } catch (error) {
      console.error("Logout gagal:", error);
    } finally {
      setLoading(false);
    }
  };

  // Styles tombol logout yang disabled
  const disabledStyle = {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none'
  };

  // Common button styles
  const linkStyle = {
    color: '#f1c40f',  // gold color for active links
    fontWeight: '600',
    fontSize: '1.1rem',
    padding: '10px 15px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    cursor: 'pointer',
    userSelect: 'none'
  };

  const linkHoverStyle = {
    backgroundColor: '#f1c40f',
    color: '#181818'
  };

  return (
    <div 
      className="d-flex flex-column justify-content-between h-100"
      style={{ backgroundColor: '#181818', minHeight: '100vh', width: '280px' }}
    >
      <Nav className="flex-column p-3 pt-5 mt-3">
        {[ 
          { to: '/home', icon: <FaHome />, label: 'Home' },
          { to: '/profile', icon: <FaRegUser />, label: 'Profile' },
          { to: '/videoUpload', icon: <FaFileUpload />, label: 'Upload' },
          { to: '/studio', icon: <FaFire />, label: 'Studio' },
        ].map(({ to, icon, label }, idx) => (
          <Nav.Link
            key={idx}
            onClick={() => navigate(to)}
            style={hovered === idx ? {...linkStyle, ...linkHoverStyle} : linkStyle}
            onMouseEnter={() => setHovered(idx)}
            onMouseLeave={() => setHovered(null)}
          >
            {React.cloneElement(icon, { className: 'me-2', size: '1.2em' })}
            {label}
          </Nav.Link>
        ))}
      </Nav>

      <div className="p-3 border-top" style={{ borderColor: '#333' }}>
        <Nav.Link
          onClick={handleLogout}
          className="fw-semibold"
          style={{
            ...linkStyle,
            color: '#e74c3c',
            justifyContent: 'flex-start',
            gap: '10px',
            ...(loading ? { pointerEvents: 'none', opacity: 0.6 } : {}),
            ...(!isLoggedIn ? disabledStyle : {})
          }}
          onMouseEnter={() => isLoggedIn && setHovered('logout')}
          onMouseLeave={() => setHovered(null)}
        >
          <FaSignOutAlt className="me-2" size="1.2em" />
          {loading ? 'Logging out...' : 'Logout'}
        </Nav.Link>
      </div>
    </div>
  );
};

export default Sidebar;
