import axios from 'axios';

// export const API_URL = 'https://be-sosial-media-872136705893.us-central1.run.app/api';
// export const API_URL = 'http://localhost:3000/api';
export const API_URL = 'https://backend-api-sosial-media-872136705893.us-central1.run.app/api';

// Ambil token dari localStorage
const getToken = () => localStorage.getItem('accessToken');

// Refresh token jika expired
export const getNewAccessToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/token`, {}, {
      withCredentials: true
    });
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    console.error("Gagal refresh token", error);
    localStorage.removeItem('accessToken');
    window.location.href = "/"; // Jangan ke /home, lebih baik langsung ke login
  }
};


// Buat axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Tambahkan token ke header request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(null, async (error) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const newAccessToken = await getNewAccessToken();
      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }

  return Promise.reject(error);
});




// VIDEO API

// Upload video
// export const uploadVideo = async (userId, file, title = "", description = "") => {
//   const formData = new FormData();
//   formData.append("video_file", file); // ✅ sesuai backend
//   if (title) formData.append("title", title);
//   if (description) formData.append("description", description);

//   const response = await axiosInstance.post(`/users/${userId}/videos`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };
export const uploadVideo = async (file, title = "", description = "") => {
  const formData = new FormData();
  formData.append("video_url", file); // ⚠️ pastikan ini cocok dengan backend
  if (title) formData.append("title", title);
  if (description) formData.append("description", description);

  const response = await axiosInstance.post(`/videos`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Get all videos
export const getAllVideos = async () => {
  const response = await axiosInstance.get('/videos');
  console.log(response.data); // debug ini!
  return response.data.videos; // sesuaikan dengan struktur
};

// Get video by ID
export const getVideoById = async (videoId) => {
  const response = await axiosInstance.get(`/videos/${videoId}`);
  return response.data;
};

// Delete video
export const deleteVideo = async (videoId) => {
  const response = await axiosInstance.delete(`/videos/${videoId}`);
  return response.data;
};

// Update video metadata
export const updateVideoMetadata = async (videoId, data) => {
  const response = await axiosInstance.put(`/videos/${videoId}`, data);
  return response.data;
};


// THUMBNAIL API

// Upload thumbnail
export const uploadThumbnail = async (videoId, file) => {
  const formData = new FormData();
  formData.append('thumbnail_url', file);

  const response = await axiosInstance.post(`/videos/${videoId}/thumbnail`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

// Update thumbnail
export const updateThumbnail = async (videoId, file) => {
  const formData = new FormData();
  formData.append('thumbnail', file);

  const response = await axiosInstance.put(`/videos/${videoId}/thumbnail`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });

  return response.data;
};

// Get thumbnail
export const getThumbnail = async (videoId) => {
  const response = await axiosInstance.get(`/videos/${videoId}/thumbnail`, {
    responseType: 'blob' // untuk image
  });
  return response.data;
};

// Delete thumbnail
export const deleteThumbnail = async (videoId) => {
  const response = await axiosInstance.delete(`/videos/${videoId}/thumbnail`);
  return response.data;
};

//
// ==========================
// CHANNEL API
// ==========================
//

// Get channel profile by slug
export const getUserBySlug = async (slug) => {
  const response = await axiosInstance.get(`/channels/${slug}/profile`);
  return response.data;
};

// Get channel videos by slug
export const getVideosBySlug = async (slug) => {
  const response = await axiosInstance.get(`/channels/${slug}/videos`);
  return response.data;
};

// ==========================
// USER API
// ==========================

// Register user
export const registerUser = async (data) => {
  const response = await axiosInstance.post("/users/register", data);
  return response.data;
};

// Login user
export const loginUser = async (data) => {
  const response = await axiosInstance.post("/users/login", data);
  return response.data;
};

// Logout User
export const logoutUser = async () => {
  try {
    const response = await axiosInstance.delete("/users/logout");
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error.response?.data || error.message);
    throw error;
  }
};

// Get user by ID
// export const getUserById = async (id) => {
//   const response = await axiosInstance.get(`/users/${id}`);
//   return response.data;
// };
export const getUserById = async () => {
  const response = await axiosInstance.get(`/users/me`);
  return response.data;
};

// Get user profile by ID
export const getUserProfile = async (id) => {
  const response = await axiosInstance.get(`/users/profile/${id}`);
  return response.data;
};

// Delete user
// export const deleteUser = async (id) => {
//   const response = await axiosInstance.delete(`/users/${id}`);
//   return response.data;
// };
export const deleteUser = async () => {
  const response = await axiosInstance.delete(`/users/me`);
  return response.data;
};

// Update username
// export const updateUsername = async (id, data) => {
//   const response = await axiosInstance.put(`/users/${id}/username`, data);
//   return response.data;
// };
export const updateUsername = async (data) => {
  const response = await axiosInstance.put(`/users/username`, data);
  return response.data;
};

// Upload profile picture
// export const uploadProfilePic = async (id, file) => {
//   const formData = new FormData();
//   formData.append("profile_pic", file);

//   const response = await axiosInstance.post(`/users/${id}/profile-picture`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };
export const uploadProfilePic = async (file) => {
  const formData = new FormData();
  formData.append("profile_pic", file);

  const response = await axiosInstance.post(`/users/me/profile-picture`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data;
};

// Update profile picture
// export const updateProfilePic = async (id, file) => {
//   const formData = new FormData();
//   formData.append("profile_pic", file);

//   const response = await axiosInstance.put(`/users/${id}/profile-picture`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });

//   return response.data;
// };
export const updateProfilePic = async (file) => {
  const formData = new FormData();
  formData.append("profile_pic", file);

  const response = await axiosInstance.put(`/users/me/profile-picture`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data;
};

// Delete profile picture
// export const deleteProfilePic = async (id) => {
//   const response = await axiosInstance.delete(`/users/${id}/profile-picture`);
//   return response.data;
// };
export const deleteProfilePic = async () => {
  const response = await axiosInstance.delete(`/users/me/profile-picture`);
  return response.data;
};

export default axiosInstance;
