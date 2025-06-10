import React, { useState, useEffect } from "react";
import { uploadVideo, uploadThumbnail } from "../api";
import { jwtDecode } from "jwt-decode";

const VideoUploadForm = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  // const [userId, setUserId] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   if (!token) {
  //     console.warn("Token tidak ditemukan");
  //     return;
  //   }

  //   try {
  //     const decoded = jwtDecode(token);
  //     setUserId(decoded.id);
  //   } catch (err) {
  //     console.error("Gagal decode token:", err);
  //   }
  // }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title || !description) {
      setMessage("❌ Semua field wajib diisi!");
      return;
    }

    // if (!userId) {
    //   setMessage("❌ User belum dikenali. Silakan login ulang.");
    //   return;
    // }

    try {
      setMessage("⏳ Mengupload video...");
      // const videoData = await uploadVideo(userId, file, title, description);
      const videoData = await uploadVideo(file, title, description);
      setMessage("✅ Video berhasil diupload!");
      console.log(videoData);

      // if (thumbnail && videoData?.id) {
       if (thumbnail && videoData?.video?.id) {
        setMessage((prev) => prev + " ⏳ Mengupload thumbnail...");
        // await uploadThumbnail(videoData.id, thumbnail);
        await uploadThumbnail(videoData.video.id, thumbnail);
        setMessage((prev) => prev + " ✅ Thumbnail berhasil diupload!");
      }

      // Reset form
      setTitle("");
      setDescription("");
      setFile(null);
      setThumbnail(null);
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.error || "❌ Upload gagal.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="text-light text-center mb-4">🎥 Upload Video</h3>

      <form onSubmit={handleSubmit} className="shadow-lg p-4 rounded bg-dark border border-secondary">
        <div className="mb-3">
          <label className="form-label text-light">Judul</label>
          <input
            type="text"
            className="form-control bg-light text-dark"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Masukkan judul video"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-light">Deskripsi</label>
          <textarea
            className="form-control bg-light text-dark"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tulis deskripsi video"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label text-light">Thumbnail (opsional)</label>
          <input
            type="file"
            className="form-control bg-light text-dark"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label text-light">File Video</label>
          <input
            type="file"
            className="form-control bg-light text-dark"
            accept="video/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Upload Video
          </button>
        </div>
      </form>

      {message && (
        <div className="alert alert-info mt-3 text-center" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default VideoUploadForm;
