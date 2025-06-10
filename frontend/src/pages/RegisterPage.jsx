import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api"; // Pastikan fungsi ini tersedia dan benar

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        username,
        email,
        password,
      };

      const response = await registerUser(data);
      console.log("User registered:", response);

      alert("Register berhasil!");

      // Redirect ke halaman login setelah register berhasil
      navigate("/");
    } catch (error) {
      console.error("Gagal register:", error.response?.data || error.message);
      alert("Register gagal: " + (error.response?.data?.message || error.message));
    }
  };

return (
  <div
    className="d-flex justify-content-center align-items-center vh-100"
    style={{ backgroundColor: '#000000' }}
  >
    <div
      className="card shadow-lg rounded-4"
      style={{
        maxWidth: '800px',
        width: '100%',
        backgroundColor: '#1c1c1c',
        color: '#FFD700',
        border: '1px solid #FFD700',
      }}
    >
      <div
        className="card-header text-center"
        style={{
          backgroundColor: '#000',
          color: '#FFD700',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          borderBottom: '1px solid #FFD700',
        }}
      >
        REGISTER PAGE
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-warning">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                backgroundColor: '#2c2c2c',
                color: '#FFD700',
                border: '1px solid #FFD700',
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-warning">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                backgroundColor: '#2c2c2c',
                color: '#FFD700',
                border: '1px solid #FFD700',
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-warning">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="passwordHelpBlock"
              required
              style={{
                backgroundColor: '#2c2c2c',
                color: '#FFD700',
                border: '1px solid #FFD700',
              }}
            />
            <div id="passwordHelpBlock" className="form-text text-light">
              Your password must be 8-20 characters long, contain letters and numbers,
              and must not contain spaces, special characters, or emoji.
            </div>
          </div>
          <button
            type="submit"
            className="btn"
            style={{
              backgroundColor: '#FFD700',
              color: '#000',
              fontWeight: 'bold',
              border: 'none',
            }}
          >
            Register
          </button>
        </form>
      </div>
      <div
        className="card-footer text-center"
        style={{ backgroundColor: '#1c1c1c', borderTop: '1px solid #FFD700' }}
      >
        <Link
          to="/"
          className="d-inline-flex align-items-center text-decoration-none"
          style={{ color: '#FFD700', fontWeight: 'bold' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-bar-left me-2"
            viewBox="0 0 16 16"
            style={{ stroke: '#FFD700', strokeWidth: 0.5 }}
          >
            <path
              fillRule="evenodd"
              d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"
            />
          </svg>
          Back to Login
        </Link>
      </div>
    </div>
  </div>
);

};

export default RegisterPage;
