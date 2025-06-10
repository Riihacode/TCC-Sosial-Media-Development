import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = { email,password};
            const response = await loginUser(data);

            // Simpan token ke localStorage
            localStorage.setItem("accessToken", response.accessToken);
            console.log("Token:", response.accessToken);

            console.log("Login berhasil:", response);

            alert("Login berhasil!");

            navigate("/home");
        } catch (error) {
            console.error("Login gagal: password atau email salah");
      alert("Login gagal: " + (error.response?.data?.message || error.message));
        }
        console.log("Email: ",email);
        console.log("Password: ",password);
    };
    
return (
  <div
    className="d-flex justify-content-center align-items-center vh-100"
    style={{ backgroundColor: '#000000' }}
  >
    <div className="card shadow-lg rounded-4"
      style={{
        maxWidth: '800px',
        width: '100%',
        backgroundColor: '#1c1c1c',
        color: '#FFD700',
        border: '1px solid #FFD700'
      }}
    >
      <div
        className="card-header text-center"
        style={{
          backgroundColor: '#000',
          color: '#FFD700',
          fontSize: '1.5rem',
          fontWeight: 'bold',
          borderBottom: '1px solid #FFD700'
        }}
      >
        LOGIN PAGE
      </div>
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-warning">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="name@example.com"
              style={{ backgroundColor: '#2c2c2c', color: '#FFD700', border: '1px solid #FFD700' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              style={{ backgroundColor: '#2c2c2c', color: '#FFD700', border: '1px solid #FFD700' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-describedby="passwordHelpBlock"
              required
            />
            <div id="passwordHelpBlock" className="form-text text-light">
              Your password must be 8-20 characters long, contain letters and numbers, and must not contain
              spaces, special characters, or emoji.
            </div>
          </div>
          <div className="d-grid gap-2">
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: '#FFD700',
                color: '#000',
                fontWeight: 'bold',
                border: 'none'
              }}
            >
              Login
            </button>

            <Link
              to="/home"
              className="btn"
              style={{
                backgroundColor: 'transparent',
                color: '#FFD700',
                border: '1px solid #FFD700',
                fontWeight: 'bold'
              }}
            >
              Go to Home
            </Link>
          </div>
        </form>
      </div>
      <div className="card-footer text-center" style={{ backgroundColor: '#1c1c1c', borderTop: '1px solid #FFD700' }}>
        <p className="text-warning">
          Don't have an account? <Link to="/register" className="text-decoration-none text-light">Register here</Link>
        </p>
      </div>
    </div>
  </div>
);
}

export default LoginPage;