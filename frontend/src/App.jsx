import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./App.css";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import VideoDetailPage from "./pages/VideoDetailPage";
import ProfilePage from "./pages/ProfilePage";
import VideoUploadPage from "./pages/UploadVideoPage";
import PrivateRoute from "./components/PrivateRoute";
import StudioPage from "./pages/StudioPage";

function App() {
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []); 

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/videos/:id" element={<VideoDetailPage/>} />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <PrivateRoute token={token}>
              <ProfilePage/>
            </PrivateRoute>
          } />
        <Route
          path="/videoUpload"
          element={
            <PrivateRoute token={token}>
              <VideoUploadPage/>
            </PrivateRoute>
          } />
        <Route
          path="/studio"
          element={
            <PrivateRoute token={token}>
              <StudioPage/>
            </PrivateRoute>
          } />


        <Route/>
      </Routes>
    </Router>
      
  );
}


export default App;
