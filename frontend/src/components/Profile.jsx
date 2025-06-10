import React, { useState, useEffect } from 'react';
import { Button, Form, Spinner, Image, Container } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';
import { getUserById, updateUsername, uploadProfilePic, updateProfilePic, deleteProfilePic } from '../api';

const BASE_URL = "https://backend-api-sosial-media-872136705893.us-central1.run.app/";

const Profile = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [newPicFile, setNewPicFile] = useState(null);
  const [previewPicUrl, setPreviewPicUrl] = useState(null);
  // const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [savingUsername, setSavingUsername] = useState(false);
  const [savingPhoto, setSavingPhoto] = useState(false);

  console.log("username : ", username);
  console.log("email : ", email);
  console.log("profile_pic : ", profilePic);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      // const id = decoded.id;
      // setUserId(id);

      // getUserById(id)
      getUserById()
        .then((data) => {
          const user = data.user;
          setUsername(user.username || '');
          setEmail(user.email || '');
          if (user.profile_pic) setProfilePic(user.profile_pic);
        })
        .catch((err) => {
          console.error("Gagal mengambil data user:", err);
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Token tidak valid:", error);
    }
  }, []);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewPicFile(file);
      setPreviewPicUrl(URL.createObjectURL(file));
    }
  };

  const handleDeleteProfilePic = async () => {
    // if (!userId || !profilePic) return;
    if (!profilePic) return;
    if (!window.confirm("Yakin ingin menghapus foto profil?")) return;

    try {
      setDeleting(true);
      // await deleteProfilePic(userId);
      await deleteProfilePic();
      setProfilePic('');
      setPreviewPicUrl(null);
      setNewPicFile(null);
      alert("Foto profil berhasil dihapus");
    } catch (error) {
      console.error("Gagal menghapus foto profil:", error);
      alert("Gagal menghapus foto profil");
    } finally {
      setDeleting(false);
    }
  };

  const handleSaveUsername = async () => {
    // if (!userId) return;
    if (!username.trim()) return;
    try {
      setSavingUsername(true);
      // await updateUsername(userId, { username });
      await updateUsername({ username });
      alert("Username berhasil diperbarui");
    } catch (error) {
      console.error("Gagal memperbarui username:", error);
      alert("Gagal memperbarui username");
    } finally {
      setSavingUsername(false);
    }
  };

  const handleSaveProfilePic = async () => {
    // if (!userId || !newPicFile) return;
    if ( !newPicFile) return;

    try {
      setSavingPhoto(true);
      if (profilePic) {
        // update foto profil
        // const res = await updateProfilePic(userId, newPicFile);
        const res = await updateProfilePic(newPicFile);
        setProfilePic(res.profilePicUrl || profilePic);
      } else {
        // upload foto profil baru
        // const res = await uploadProfilePic(userId, newPicFile);
        const res = await uploadProfilePic(newPicFile);
        setProfilePic(res.profilePicUrl || profilePic);
      }
      setNewPicFile(null);
      setPreviewPicUrl(null);
      alert("Foto profil berhasil diperbarui");
    } catch (error) {
      console.error("Gagal memperbarui foto profil:", error);
      alert("Gagal memperbarui foto profil");
    } finally {
      setSavingPhoto(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container className="py-4" style={{ maxWidth: '600px' }}>
      <h3 className="text-light mb-4 text-center">Profil Saya</h3>

      <div className="position-relative text-center mb-3" style={{ width: 150, margin: '0 auto' }}>
        <Image
          src={previewPicUrl || (profilePic ? `${profilePic}` : 'https://placehold.co/150x150?text=Foto')}
          roundedCircle
          style={{
            width: 150,
            height: 150,
            objectFit: 'cover',
            border: '3px solid white',
            boxShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}
        />
        {profilePic && !newPicFile && (
          <Button
            variant="danger"
            size="sm"
            onClick={handleDeleteProfilePic}
            disabled={deleting}
            style={{
              position: 'absolute',
              top: 5,
              right: 5,
              borderRadius: '50%',
              padding: '5px 8px',
              fontWeight: 'bold',
              lineHeight: 1,
              zIndex: 10,
            }}
            title="Hapus Foto Profil"
          >
            &times;
          </Button>
        )}
      </div>

      <Form.Group className="mb-2 text-center">
        <Form.Label className="text-light">Ganti Foto Profil</Form.Label>
        <Form.Control type="file" accept="image/*" onChange={handleProfilePicChange} className="w-100" />
      </Form.Group>

      <div className="d-grid mb-4">
        <Button
          variant="primary"
          size="md"
          onClick={handleSaveProfilePic}
          disabled={!newPicFile || savingPhoto}
        >
          {savingPhoto ? "Menyimpan Foto..." : "Simpan Foto Profil"}
        </Button>
      </div>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label className="text-light">Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Masukkan username baru"
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label className="text-light">Email</Form.Label>
          <Form.Control type="email" value={email} readOnly />
        </Form.Group>

        <div className="d-grid">
          <Button
            variant="warning"
            size="lg"
            onClick={handleSaveUsername}
            disabled={!username.trim() || savingUsername}
          >
            {savingUsername ? "Menyimpan Username..." : "Simpan Username"}
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Profile;
