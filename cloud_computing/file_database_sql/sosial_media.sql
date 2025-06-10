-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2025 at 12:10 PM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sosial_media`
--

-- --------------------------------------------------------

--
-- Table structure for table `community_post_photo`
--

CREATE TABLE `community_post_photo` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `post_photo_url` text DEFAULT NULL,
  `uploaded_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_pic` varchar(255) DEFAULT NULL,
  `refresh_token` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `slug`, `email`, `password`, `profile_pic`, `refresh_token`, `created_at`) VALUES
(1, 'Aria Nightcore', 'aria-nightcore', 'arianightcore@gmail.com', '$2b$10$V5eSmH1FmMuId7ozPV/GT.b2m1/nAK21cS8raV0EfyleZVN3dmLUS', '/upload/users/1/uploadedUserPhotoProfile/1749025753363-hutao.jpg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBcmlhIE5pZ2h0Y29yZSIsImVtYWlsIjoiYXJpYW5pZ2h0Y29yZUBnbWFpbC5jb20iLCJzbHVnIjoiYXJpYS1uaWdodGNvcmUiLCJpYXQiOjE3NDkwMjkzMjQsImV4cCI6MTc0OTExNTcyNH0.ePDkvxU0wpEHTr7HyAo-fx6_s0ArVscHl-X_EAVxpEk', '2025-06-04 08:27:58'),
(2, 'Jagoan Hacker', 'jagoan-hacker', 'jagoanhacker@gmail.com', '$2b$10$6l8mV1.jdP4WkprixRqRxOlruO3iqgwvPCyiewBoK4WEg.WD/sDKO', '/upload/users/2/uploadedUserPhotoProfile/1749026508497-hacker.jpg', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJKYWdvYW4gSGFja2VyIiwiZW1haWwiOiJqYWdvYW5oYWNrZXJAZ21haWwuY29tIiwic2x1ZyI6ImphZ29hbi1oYWNrZXIiLCJpYXQiOjE3NDkwMzE0MTcsImV4cCI6MTc0OTExNzgxN30.WOGpQ_zGCwPHLCAcj430VQA7i6Sns_Me1P9C6AGi5qM', '2025-06-04 08:40:55');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `video_url` varchar(255) NOT NULL,
  `thumbnail_url` varchar(255) DEFAULT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `user_id`, `title`, `description`, `video_url`, `thumbnail_url`, `uploaded_at`) VALUES
(1, 1, '\"Secrets Of The Silent Witch\" | OFFICIAL TRAILER // New PV | SUBBED', '\"Secrets Of The Silent Witch\" | OFFICIAL TRAILER // New PV | SUBBED \n\nSUMMARY Monica Everett, the Silent Witch, is the only mage in the world who can use unchanted magecraft, a true hero who singlehandedly defeated a legendary black dragon. However, this young genius is actually...super-duper shy! That\'s right: She learned to cast spells silently just to avoid speaking in public, and despite her power, she has zero self-confidence. Now Monica has been tasked with secretly guarding the second prince. Can she keep it together as she faces both the evil forces targeting the prince and the terrors of social interaction?\n\n#anime #manga #secretsofasilentwitch', '/upload/users/1/uploadedVideo/1749026213885-silent_majou.mp4', '/upload/users/1/uploadedVideoThumbnail/1749027084224-silent_witch.png', '2025-06-04 01:36:53'),
(2, 1, 'Video Vernalta - Sapi', 'Video buatan Vernalta tentang sapi. Entahlah deskripsi ngasal', '/upload/users/1/uploadedVideo/1749026314211-video_sapi.mp4', '/upload/users/1/uploadedVideoThumbnail/1749027098010-thumbnail_sapi.png', '2025-06-04 01:38:34'),
(3, 2, 'Bobol Wifi', 'Kali Linux - tutorial bobol wifi. Try hard btw', '/upload/users/2/uploadedVideo/1749026611989-laptop_hafizh.mp4', '/upload/users/2/uploadedVideoThumbnail/1749026940178-bobol_wifi.jpg', '2025-06-04 01:43:31'),
(4, 2, 'Hacker juga butuh minum', 'Try hard itu ada batasnya, jaga fokus dengan minum air putih', '/upload/users/2/uploadedVideo/1749026814515-botol_minum.mp4', '/upload/users/2/uploadedVideoThumbnail/1749026958419-minum_air.jpg', '2025-06-04 01:46:54');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `community_post_photo`
--
ALTER TABLE `community_post_photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `unique_slug` (`slug`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `community_post_photo`
--
ALTER TABLE `community_post_photo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `community_post_photo`
--
ALTER TABLE `community_post_photo`
  ADD CONSTRAINT `community_post_photo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `videos`
--
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
