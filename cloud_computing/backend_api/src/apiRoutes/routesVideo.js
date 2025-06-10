import express from "express";
import {
    uploadVideo, 
    getAllVideos,
    deleteVideo, 
    updateVideoMetadata,
    uploadVideoThumbnail,
    getVideoThumbnail,
    deleteVideoThumbnail,
    updateVideoThumbnail,
    getVideoId,
    getUserBySlug,
    getVideosBySlug
} from                              "../apiControllers/controllerVideo.js";
import videoUploadLimiter from      "../apiMiddleware/rateLimit/middlewareRateLimit.js";
import upload from                  "../apiMiddleware/video/middlewareVideo.js";
import validateUserId from          "../apiMiddleware/user/middlewareUserValidateUserId.js";
import validateVideoId from         "../apiMiddleware/video/middlewareVideoValidateVideoId.js";
import syncVideosWithStorage from   "../apiMiddleware/video/middlewareVideoSyncWithStorage.js";
// implementasi authentication
import { verifyToken } from "../apiMiddleware/token/verifyToken.js";
import { checkUserIdMatch } from "../apiMiddleware/user/middlewareUserCheckMatch.js";
import { checkVideoOwnership } from "../apiMiddleware/video/middlewareVideoOwnership.js";

const router = express.Router();

console.log(typeof uploadVideo);            // Harus "function"
console.log(typeof validateUserId);         // Harus "function"
console.log(typeof upload.single);          // Harus "function"


// [ CONTENT CREATOR ]
// Video
// router.post("/users/:user_id/videos", verifyToken, checkUserIdMatch, videoUploadLimiter, uploadVideo);
router.post("/videos", verifyToken, videoUploadLimiter, uploadVideo); // ✅ lebih aman & bersih
router.put("/videos/:video_id", verifyToken, checkVideoOwnership, updateVideoMetadata);
router.delete("/videos/:video_id", verifyToken, checkVideoOwnership, validateVideoId, deleteVideo);

// Thumbnail
// router.post("/users/:user_id/videos/:video_id/thumbnail", verifyToken, checkVideoOwnership, validateVideoId, uploadVideoThumbnail);
// router.post("/videos/:video_id/thumbnail", verifyToken, checkVideoOwnership, validateVideoId, uploadVideoThumbnail); // ✅
// router.put("/videos/:video_id/thumbnail", verifyToken, checkVideoOwnership, validateVideoId, updateVideoThumbnail);
// router.delete("/videos/:video_id/thumbnail", verifyToken, checkVideoOwnership, validateVideoId, deleteVideoThumbnail);
router.post("/videos/:video_id/thumbnail", verifyToken, uploadVideoThumbnail); // ✅
router.put("/videos/:video_id/thumbnail", verifyToken, updateVideoThumbnail);
router.delete("/videos/:video_id/thumbnail", verifyToken, deleteVideoThumbnail);
router.get("/videos/:video_id/thumbnail", getVideoThumbnail);  // untuk memudahkan content creator untuk mengecek thumbnail sebelumnya untuk memutuskan akan diganti atau tidak

// [ VIEWER ]
// Videos
router.get("/videos", getAllVideos);    // Get seluruh video yang nanti ditampilkan di homepage
// router.get("/videos/:video_id", validateVideoId, getVideoId);   // Get suatu video ketika viewer mengeklik salah satu video-nya
router.get("/videos/:video_id", getVideoId);   // Get suatu video ketika viewer mengeklik salah satu video-nya

// Channel
router.get("/channels/:slug/videos", getVideosBySlug);  // Get seluruh video ketika menekan suatu channel
router.get("/channels/:slug/profile", getUserBySlug);   // untuk profil channel publik ketika dicek viewer

export default router; 