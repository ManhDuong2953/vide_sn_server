-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vibedatabase
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `emailotp`
--

LOCK TABLES `emailotp` WRITE;
/*!40000 ALTER TABLE `emailotp` DISABLE KEYS */;
/*!40000 ALTER TABLE `emailotp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `friend`
--

LOCK TABLES `friend` WRITE;
/*!40000 ALTER TABLE `friend` DISABLE KEYS */;
INSERT INTO `friend` VALUES ('uid_1840333109782408','uid_111668358174309320494',1),('uid_93b408bb89bc30f6','uid_111668358174309320494',0),('uid_93b408bb89bc30f6','uid_1840333109782408',1);
/*!40000 ALTER TABLE `friend` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `friendblock`
--

LOCK TABLES `friendblock` WRITE;
/*!40000 ALTER TABLE `friendblock` DISABLE KEYS */;
/*!40000 ALTER TABLE `friendblock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `groupchannel`
--

LOCK TABLES `groupchannel` WRITE;
/*!40000 ALTER TABLE `groupchannel` DISABLE KEYS */;
/*!40000 ALTER TABLE `groupchannel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `groupmember`
--

LOCK TABLES `groupmember` WRITE;
/*!40000 ALTER TABLE `groupmember` DISABLE KEYS */;
/*!40000 ALTER TABLE `groupmember` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `groupmessage`
--

LOCK TABLES `groupmessage` WRITE;
/*!40000 ALTER TABLE `groupmessage` DISABLE KEYS */;
/*!40000 ALTER TABLE `groupmessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `grouppost`
--

LOCK TABLES `grouppost` WRITE;
/*!40000 ALTER TABLE `grouppost` DISABLE KEYS */;
/*!40000 ALTER TABLE `grouppost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `marketplace`
--

LOCK TABLES `marketplace` WRITE;
/*!40000 ALTER TABLE `marketplace` DISABLE KEYS */;
INSERT INTO `marketplace` VALUES ('mrk_plc_b3989cf8fcc59895','uid_93b408bb89bc30f6','dsadsd','sdasdsadsa',21323,'2024-12-08 17:28:14','automotive','Uỷ ban nhân dân thành phố Hà Nội, 79, Phố Đinh Tiên Hoàng, Phường Lý Thái Tổ, Quận Hoàn Kiếm, Hà Nội, 10140, Việt Nam','105.8538','21.0282');
/*!40000 ALTER TABLE `marketplace` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `marketplacemedia`
--

LOCK TABLES `marketplacemedia` WRITE;
/*!40000 ALTER TABLE `marketplacemedia` DISABLE KEYS */;
INSERT INTO `marketplacemedia` VALUES ('mrk_plc_b3989cf8fcc59895','https://res.cloudinary.com/der2ygna3/image/upload/v1733653695/marketplace/product/file_235cb9ae1d6a7851.jpg');
/*!40000 ALTER TABLE `marketplacemedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
INSERT INTO `notifications` VALUES ('notice_025759bc126361f0','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_de390310f03b6a84','2024-12-08 17:21:12',1),('notice_038f31388d4f6100','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_3f8f4a406b41c015','2024-12-08 16:28:58',1),('notice_16363fa39be9f469','uid_1840333109782408','uid_1840333109782408','Special Forces Military đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_02a680a270598f65','2024-12-10 21:38:44',1),('notice_1796383ce0568b8f','uid_1840333109782408','uid_1840333109782408','Special Forces Military đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_de390310f03b6a84','2024-12-08 18:00:40',1),('notice_208e0e3917b07e85','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_02a680a270598f65','2025-01-16 22:17:34',0),('notice_2ee8b2af3945d880','uid_1840333109782408','uid_1840333109782408','Special Forces Military đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_5ef40a2ad880048e','2024-12-08 21:10:21',1),('notice_30bc9a5c674670af','uid_1840333109782408','uid_1840333109782408','Special Forces Military đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_3f8f4a406b41c015','2024-12-08 10:45:51',1),('notice_37c042fc56670a05','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_440c11da38942494','2024-12-08 16:33:56',1),('notice_391457b4e2a56a9f','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_34e8fb2d3a2a7695','2025-01-16 22:32:06',0),('notice_733af8745e2093ac','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_de390310f03b6a84','2024-12-08 16:14:27',1),('notice_77465f740693bac7','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_62933261b93f512d','2025-01-19 11:36:24',0),('notice_7898a6466a81e42e','uid_1840333109782408','uid_1840333109782408','Special Forces Military đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_de390310f03b6a84','2024-12-08 21:10:10',1),('notice_931a4b3bfdeb57da','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_462f10bc8f0755ad','2025-01-19 11:36:21',0),('notice_9bafa5a5b5266f96','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_de390310f03b6a84','2024-12-08 16:14:29',1),('notice_a1442ac3d534dfd9','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_3f8f4a406b41c015','2024-12-08 17:17:39',1),('notice_be00cd4c544b65a3','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_de390310f03b6a84','2024-12-08 17:29:11',1),('notice_c650a7569253ab96','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_de390310f03b6a84','2024-12-08 16:14:07',1),('notice_d5513b97c578b779','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_3f8f4a406b41c015','2024-12-08 17:17:33',1),('notice_d92fa8f8c6bdeac0','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_de390310f03b6a84','2024-12-08 17:17:36',1),('notice_f703cee469a41e02','uid_93b408bb89bc30f6','uid_1840333109782408','Tiêu Công Cường đã bày tỏ cảm xúc với bài viết của bạn.','/post/post_5ef40a2ad880048e','2024-12-08 16:29:01',1);
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES ('post_02a680a270598f65','uid_1840333109782408',1,'<span>TAI/AgustaWestland T129 ATAK - Mẫu trực thăng tấn công của Thổ Nhĩ Kỳ</span>',NULL,'2024-12-09 23:21:05'),('post_1daf77d7c795ff7a','uid_93b408bb89bc30f6',1,'<span>McLaren X Mercedes ?? <strong>#dwcars</strong> <strong>#fyp</strong> <strong>#supercar</strong> <strong>#mclaren</strong> <strong>#mclaren650s</strong> <strong>#mclaren765lt</strong> <strong>#mercedes</strong> <strong>#mercedesglecoupe</strong> </span>',NULL,'2025-01-31 23:46:10'),('post_34e8fb2d3a2a7695','uid_1840333109782408',1,'<span>F22 Raptor vs Sukhoi Su57</span>',NULL,'2024-12-09 23:18:02'),('post_3e33aff99e134cdf','uid_93b408bb89bc30f6',1,'<span>?Ferrari SF90 Spider? <strong>#ferrari</strong> <strong>#ferrarisf90</strong> <strong>#sf90</strong> <strong>#sf90spider</strong> <strong><u>#vlcarcn</u></strong> <strong>#car</strong> <strong>#carsoftiktok</strong> <strong>#xedep</strong> <strong>#sieuxe</strong></span>',NULL,'2025-01-31 23:49:34'),('post_3f8f4a406b41c015','uid_1840333109782408',1,'<span>Muốn hoà bình Hãy chuẩn bị cho chiến tranh.</span>',NULL,'2024-12-08 00:51:48'),('post_440c11da38942494','uid_1840333109782408',1,'<span>Xe tăng Type-10, nét tinh hoa công nghệ vũ khí của người Nhật</span>',NULL,'2024-12-08 00:44:17'),('post_462f10bc8f0755ad','uid_1840333109782408',1,'<span>Ấn Độ Dương - nơi có vị trí địa chính trị đặc biệt mà cường quốc nào cũng muốn có ảnh hưởng.</span>',NULL,'2024-12-09 23:14:11'),('post_5ef40a2ad880048e','uid_1840333109782408',1,'<span>Tôi cầu xin Chúa sức mạnh</span>',NULL,'2024-12-08 00:46:54'),('post_62933261b93f512d','uid_1840333109782408',1,'<span>Không quân Nga vs Không quân Hoa Kỳ</span>',NULL,'2024-12-09 23:08:23'),('post_7f94a5262f0a1608','uid_93b408bb89bc30f6',1,'<span>Porsche GT4 RS <strong>#porsche</strong> <strong>#gt4rs</strong> <strong>#vlcarvn</strong> <strong>#cars</strong> <strong>#viral</strong> <strong>#trend</strong> <strong>#xuhuong</strong> <strong>#thinhhanh</strong> <strong>#fyp</strong> <strong>#supercar</strong> <strong>#carsoftiktok</strong></span>',NULL,'2025-01-31 23:48:39'),('post_842d6fcbbdfe50bc','uid_105322195214825135716',1,'<span>Tứ kết 1/2 UCL 2023 Real Madrid vs Manchester City</span>',NULL,'2025-01-28 09:42:30'),('post_8a6b4e909ec13323','uid_93b408bb89bc30f6',1,'<span></span><span>Khai Xuân Ferrari SF90XX Stradale <strong>#ferrari</strong> <strong>#sf90</strong> <strong>#sf90stradale</strong> <strong>#vlcarvn</strong> <strong>#carspotting</strong> <strong>#fyp</strong> <strong>#luxury</strong> <strong>#ferrarisound</strong> <strong>#sf90sound</strong> <strong>#ferrarisound</strong><br/> </span>',NULL,'2025-01-31 23:47:18'),('post_a9e77f5e81f1a448','uid_93b408bb89bc30f6',1,'<span>McLaren Senna là một siêu xe sản xuất giới hạn của McLaren, được ra mắt năm 2018. Xe được đặt theo tên tay đua huyền thoại Ayrton Senna. McLaren Senna sở hữu động cơ V8 4.0L tăng áp kép, sản sinh 789 mã lực và mô-men xoắn 800 Nm. Xe có khả năng tăng tốc từ 0-100 km/h trong 2.8 giây và tốc độ tối đa 335 km/h. Khung xe làm từ sợi carbon siêu nhẹ, giúp giảm trọng lượng xuống chỉ 1.198 kg. Chỉ có 500 chiếc được sản xuất trên toàn thế giới. Hiện ở Việt Nam đang có 2 chiếc thuộc sở hữu củ vợ chồng doanh nhân Mailisa Khánh (phiên bản MSO) và Chủ tịch cà phê Trung Nguyên - Đặng Lê Nguyên Vũ <strong>#mclaren</strong> <strong><u>#mclarensenna</u></strong> <strong>#carsoftiktok</strong> <strong>#light??</strong> <strong>#sieuxe</strong> <strong>#supercar</strong> </span>',NULL,'2025-01-28 09:10:00'),('post_d95892286a6329ad','uid_1840333109782408',1,'<span>Tu160 vs B1 Blanccer</span>',NULL,'2024-12-09 23:31:10'),('post_de390310f03b6a84','uid_1840333109782408',1,'<span>Máy bay nào xứng đáng để thay thế cọp bay đến từ lục địa già? | voice: CDMEDIA- Quân Sự <strong>#military_power??</strong> <strong>#met_vn</strong> <strong>#fyp</strong> <strong>#trending</strong> <strong>#mtroygroup</strong> </span>',NULL,'2024-12-08 01:01:14'),('post_e57b94a140068811','uid_93b408bb89bc30f6',1,'<span>Nissan GTR ??<strong>#dwcars#fyp#nissan#nissangtr#nissangtrnismo#gtr#gtr35</strong> </span>',NULL,'2025-01-28 08:56:16'),('post_fdbca90cf930a171','uid_93b408bb89bc30f6',1,'<span>?McLaren 720S? <strong>#mclaren</strong> <strong>#mclaren720s</strong> <strong>#720s</strong> <strong>#720sspider</strong> <strong>#vlcarvn</strong> <strong>#cars</strong> <strong>#carsoftiktok</strong> <strong>#cartok</strong></span>',NULL,'2025-01-31 23:48:04');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `postcomment`
--

LOCK TABLES `postcomment` WRITE;
/*!40000 ALTER TABLE `postcomment` DISABLE KEYS */;
INSERT INTO `postcomment` VALUES ('cmt_0ef9524189cc2edb','post_5ef40a2ad880048e','uid_93b408bb89bc30f6','Hello',NULL,NULL,0,'2024-12-08 16:29:05'),('cmt_919e243a6f9fc50c','post_de390310f03b6a84','uid_93b408bb89bc30f6','Chào',NULL,NULL,11,'2024-12-08 16:14:32'),('cmt_9b046e386a542121','post_34e8fb2d3a2a7695','uid_93b408bb89bc30f6','Hay',NULL,NULL,10,'2025-01-16 22:20:00');
/*!40000 ALTER TABLE `postcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `postmedia`
--

LOCK TABLES `postmedia` WRITE;
/*!40000 ALTER TABLE `postmedia` DISABLE KEYS */;
INSERT INTO `postmedia` VALUES ('post_440c11da38942494','https://res.cloudinary.com/der2ygna3/video/upload/v1733593482/post/file_c8a7a8ebf16b129b.mp4','video'),('post_3f8f4a406b41c015','https://res.cloudinary.com/der2ygna3/video/upload/v1733593997/post/file_f35d611cbbb60543.mp4','video'),('post_5ef40a2ad880048e','https://res.cloudinary.com/der2ygna3/video/upload/v1733594071/post/file_58b5fab23e39f892.mp4','video'),('post_de390310f03b6a84','https://res.cloudinary.com/der2ygna3/video/upload/v1733594478/post/file_9b1c64d5968dd8a9.mp4','video'),('post_62933261b93f512d','https://res.cloudinary.com/der2ygna3/video/upload/v1733760507/post/file_31a342f14bc55903.mp4','video'),('post_62933261b93f512d','https://res.cloudinary.com/der2ygna3/video/upload/v1733760523/post/file_66b60feb1aad218e.mp4','video'),('post_462f10bc8f0755ad','https://res.cloudinary.com/der2ygna3/video/upload/v1733760856/post/file_33db18af69a9f413.mp4','video'),('post_34e8fb2d3a2a7695','https://res.cloudinary.com/der2ygna3/video/upload/v1733761085/post/file_c0ea7d1245481f58.mp4','video'),('post_34e8fb2d3a2a7695','https://res.cloudinary.com/der2ygna3/video/upload/v1733761099/post/file_0c0072ba1e5c9692.mp4','video'),('post_02a680a270598f65','https://res.cloudinary.com/der2ygna3/video/upload/v1733761269/post/file_9b5d3bddfe83c204.mp4','video'),('post_d95892286a6329ad','https://res.cloudinary.com/der2ygna3/video/upload/v1733761873/post/file_e95c9162acb05678.mp4','video'),('post_d95892286a6329ad','https://res.cloudinary.com/der2ygna3/video/upload/v1733761885/post/file_a58b82598a7b5f87.mp4','video'),('post_e57b94a140068811','https://res.cloudinary.com/der2ygna3/video/upload/v1738029379/post/file_19d7a85e4d4fceeb.mp4','video'),('post_a9e77f5e81f1a448','https://res.cloudinary.com/der2ygna3/video/upload/v1738030204/post/file_fd289caa3a14735f.mp4','video'),('post_842d6fcbbdfe50bc','https://res.cloudinary.com/der2ygna3/video/upload/v1738032156/post/file_c5c484e1e495667a.mp4','video'),('post_1daf77d7c795ff7a','https://res.cloudinary.com/der2ygna3/video/upload/v1738341974/post/file_5732e85f93976b48.mp4','video'),('post_8a6b4e909ec13323','https://res.cloudinary.com/der2ygna3/video/upload/v1738342042/post/file_c04c7faf7b3b3396.mp4','video'),('post_fdbca90cf930a171','https://res.cloudinary.com/der2ygna3/video/upload/v1738342088/post/file_049427c19ce70e42.mp4','video'),('post_7f94a5262f0a1608','https://res.cloudinary.com/der2ygna3/video/upload/v1738342122/post/file_4ea449ac4131d100.mp4','video'),('post_3e33aff99e134cdf','https://res.cloudinary.com/der2ygna3/video/upload/v1738342198/post/file_bdb35d08a2755e7f.mp4','video');
/*!40000 ALTER TABLE `postmedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `postreact`
--

LOCK TABLES `postreact` WRITE;
/*!40000 ALTER TABLE `postreact` DISABLE KEYS */;
INSERT INTO `postreact` VALUES ('post_3f8f4a406b41c015','uid_1840333109782408','tears'),('post_5ef40a2ad880048e','uid_93b408bb89bc30f6','tear'),('post_440c11da38942494','uid_93b408bb89bc30f6','tears'),('post_3f8f4a406b41c015','uid_93b408bb89bc30f6','angry'),('post_de390310f03b6a84','uid_93b408bb89bc30f6','cry'),('post_de390310f03b6a84','uid_1840333109782408','angry'),('post_5ef40a2ad880048e','uid_1840333109782408','tears'),('post_02a680a270598f65','uid_1840333109782408','tears'),('post_02a680a270598f65','uid_93b408bb89bc30f6','heart'),('post_34e8fb2d3a2a7695','uid_93b408bb89bc30f6','angry'),('post_462f10bc8f0755ad','uid_93b408bb89bc30f6','tears'),('post_62933261b93f512d','uid_93b408bb89bc30f6','tears');
/*!40000 ALTER TABLE `postreact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `privatemessage`
--

LOCK TABLES `privatemessage` WRITE;
/*!40000 ALTER TABLE `privatemessage` DISABLE KEYS */;
INSERT INTO `privatemessage` VALUES (1,'uid_1840333109782408','uid_93b408bb89bc30f6','1a5cef69de4761c028d027c1bb2008d939b1d57c7c7faa930003c4269a73aed9773d8b8d915ddeecca2f9b38ac3cbf9a212562c8ebfcada7ac7f76337f9119bfaafa427cfab7e03f4fc4bc79226cc67ce270a0c526de3f8dea1f4d8db268181b2205c643f9fa983560d2c2682d847ab7449909b34552225446d10a8b5fb36aa64f106b4f36e83a3eb98b8f88502caee2f93f3874563d1cdee1d6d22e74ec34f56aa804d4ff1fa445e5a732ec59248c06a619980eb4ef66bd39e6b8f7106d32590bddf14977f076180e0e158bf4c212bc84c64d4aed86a8107516e0d5e53ff2d900543aeaaa7405efa0db2b779b94c2ad919cf3e94aac548a3132c45a5b53680096028b6bf94e1ec2379974387184aa0fa96b3b8acd5b6183a197359933ca81b777f81083de51094c165243c64e66e8f454f9eb1af752a045912832981135aa95afe7bbf8fc3725578fda5456d5836e380ba6f31388ed34db32a1df0885588babb1ef18d26fee82e40ff3a18e930a4f84b7d70071b8013a52fb0062d9e3b5a4e7fae4135b0999e5bae7feda0222e981c9f509bc5c89774a6870b229253885cc2159f387b433bd6b42c23b09d0b5a9182804ccfdba7fc2d69a79173aec8cdb7c9b567312f2c219a79f5f4bd50b32a83adcd478a6fd9fefc99a17d3be53e5c237f32b76043a5ba2d3fdffe2b17de9fab97b9cd6358ff7e832ba5ab4a63e5243de1a','28a46e670af8dd40af32fa09068a2bfb83c9bff0d554cc3dd3c9497050a53dc8493dac611c94ce9f4754e08319e90805652e998a7d34f835223b794f3d7f99ecbb003304f25c55d8973ac9a01974d577f5a911e13920833a43c036276ff3bd11017b7594a58bc7ab1eb958436082305439b018c425701e03d25f0126c79a639759f67b755ad94e7a38c2b935684ef83bd54ff1d8d5f33502298e661a4e6aa9ced6aa4b4ba6e393aa44db545addcf4b086b8817bd1db7d1afab54b0f584fd4f7fbc11e1615bef58420ed50b326d895a6c09c334f166bbbb49b420601f839dbbedf2d12f8259f89f2a364b5cbb807c3a57cd3cedd0c01f266b54c9963836f29c3038cf0cbdc038a363afca7c9d65746669ecc83a8c6aabc4907282411c76fa277eeb81137415c4c0ffdef93ce42ebc7cba4af9fb63dbcef6a94094f04df135cceac5597782b3bc2e0629384c1e5cd9441e1baaf7c7276b6c5811840cf5ed497a485aa1073b4b7825fe89e1ca9ccaa45ed25f799f19b112e89f154ace3d76e422853aad24419c73525f84158b6e480439b5ba21ff534b18de1ce6049ce18f710ee8de2505d740a7325b2b5fe7310552f78a0489ad12c37319d539cdac134d988b37254db6ea9078a62d8279ab7da99dd25642a8ccd15807cc99e0ae8c1940c2b1b7ffbf8fae710ae9779cb35e46415a775ced1b8432b2b9e654ce72e7eb82180f02','text',NULL,NULL,'2024-12-08 17:50:27'),(2,'uid_1840333109782408','uid_93b408bb89bc30f6','08e72a0cacfb492a102124d3360a626947e5aecf90e89ad634ff9fd99e55b6719cf787763501cc94fcb5676f77d32789d702513d15c99d488fcd3e8e625396ebe6e19873dfee626119f90c31bee1b77ad679d5395b57baa49642d339be9eb4c21ce7b28dbbda5edd5956e725867182367d14b83ccc5c91e15dd04a32cf7fe2bb339aaf362785656344022a4db2734eea640ffcbc6f42dd459531b9c3019b31eb5039e93193aea2709db2a6b92393050405bfb71f199be05cf93a3f90657d552a7b652fc82cc75571f581a12b2df7c7c52ab7eb1d74bcdb340fce70ccd596b6f64c7bc7937f09c4138ce674dc36d0cf20306f956432eb958f44404b1c8d9f78d77ae147f4f52243aff3d16509165666a200c1fc7e4abdb22035fe94183705bd54561b5bc7b30e3dab0ee929ded6cb6fd31477f57ee51e9e25f7e789cb3cc6ebe1c933f2fce45ed7bb1f8e65d2aab4291b6a8fed6ed147ddf0f57a78f8f37547af53b549246e3190e0e3c86f384c9be13194563e15c12756e1585ae2e1e845dfae60acc919898cce49732aef8edae85821a2559d435171c5094a6e1bc7161d03e587e12339af6bd4190995f5fe2d3b212be86755de4d5f11053d9b576c2e6d5be5ec5f2241efd92c1e68cde34f005c5cdc52d5dd2e9dfa5ade388cf278cf07b6e193fd3b84e1d9aa6e3ba0a22406a6f145ea530834b5fc605f0d0be6e89668914c','5ef9fe79ca68d28f783bf4a1758e8d1305ae7176295e4b0b436287108adc0d5906e06761d394961832dd5e65affd214e683b0d159da40bac1153cc4559432e0ae740fd527a89abc6c9573b87a29dae24aa61c85521cfe19c44679b8deda97335eb7967256e9e6d8c185a4ff743f99455c52f4b78f6b42f565a01669806501fd83487d3dbdbcb06b40cb11941d2ab8b30b9d0ea4807981c97d25d7ba55dc8d2b13d96b7fd345f5f070e34fb31c4d20710b1b45ff75c38cc13cde0792dfcf928899bcb1d2301d262b189a7a068ef1b4c6d1cf6df448e50a5767ade8353abfe0f78911a6a03abb6860a820a37d62157a29ddef5649409a5a75d05b1dbc9ebdf8933bb67634da96be023202163fbeead4a3afa6268da61a0600861fac9a5bd8c94214971d5248064779eecdcf755bf5c4326feddd058e8102d53e61c65a908e07e2a88b58132cbd5d17c7331b92d96dec75d5e94384125fb3be2248c58d05261af4a9cd3def399664928bcc1ebd975e2436c1f0cfb070745573f90c4f31e7a6b9a97fdd15b43ec8a52c2be79eea8eb3af29d11b0954eec68b188289c413169a26ed1302bed35e75b05809aa586d221a218367c1a09d0c358273390b50082f4ef577f4e84963abb498e5f04c710bd5aa32f424cae054802dd9ce81c8aa2ec953147e63bc479a7b7371a7ffc6e9095e41cea33f13d7b3cbf8378d98fb7124fe0f297c3','call:accepted',NULL,NULL,'2024-12-08 17:53:25'),(3,'uid_93b408bb89bc30f6','uid_1840333109782408','1c9b1e20dc798a6c1d122abd8f576fd73ef4df7673575d2c335b70b34b356aebda87f23d06859ef886d2780171d1a322b946e94d4c24651c4cd0b081ff766b5ae4b70eaea7c649bb87896005350eddeebcef946a05a25fe2668224bcde574c026f803fa54f9463fa4b86387de0424a0007e80cbcc76b38f310f9f5ffa19dcb28781a38cb9e7567e5128a344577795429c29a9aae9c36b3d8f05eff5a5f5adf7d91943a9ed81758bcc6ed78362667a4a794b2f47ab3f7ac5f1f70592884ab227d1ee0d12e488c5bf30394ceeb2a05bdedca2de7e6dfee912bd2f45ab611b4eb4c8b61d96a67e3c8a61a62de55337842f6c8c7bb7725b4a514db3b41dc88973ee47f8d901463f3a0cefe1c3f16f149083ffa591f4ea6faa491f6fae36c67daa391895e74e68250c8a53e31827ba3b032e30f37dc4bfb5e25a6893879c8272807923a0d7dd0f8f22e06bb01ef4336dab75cf2a5b1614116431e7b401fd839b961ac86d8d06c5a36a4cd478feac88768a25f4332bd96ca665704a02e18b55ac988ddde4bf6e1241a2564046afa618a1ba2da54c755ddfb9c56ee4cbba4a01c5247d3b3c4d78287e66cca8b5c9a72ca8ee6db857a224c9f0e70cd9dd896e55ffe1eacb8d61caaf6d8b19c9b9fc6dd9024c86b5a8c961aef705cf60a75c6a9b5071f6bd665f1a0e4fda60d0726dc4f29f89251ac220ca9b30c9475836da6638900fecf','bffb03dca3999e6c68e87d6bb406c8712b170fcc5998ebec015415001a9c0e0810bc99aeda22191885517870444866cde2edb924da5d1fa6197e7ee1f3b5961ce02b243cd6b0f189435c1ea0740c474005216106992787fcbcf8c1f3e3ffda436728a80d7b96cc768b6638fa64bb553e42cdbea630130a1b7091461a1864f7ac5ce93e55d76d31bc5d40be3e104e71c5c00d3a4d75b60029f7aa0df53007928109cb8fb37809778fc501a36af34fe1cd2abab6d26df0622446560b3df1cffb7c5d92fdce05744e4baaff64bbdeb4c32e458530669fbffb93780ce398dfb0bc36da141b41fcb30ba44cff1df7614bcd7efd15b98687c38efc9b3d8b587c0db87fb6cbfa912a7b896654e76a74bdadfcf91adcc2ad86897abb42a1f0d206a3f02ef56e16ee123b26fc73d9344d324be33db1eaa7a0f98936174a39eb6963f518594c49080bf30869a083d711acc12e9991461398c736d1110ba3655de4e98fe73658fe89b743d0dce9d381362b94b4bb8c0f86bd27bc98762fd38b0aab42e2796de21ec2af70a1657dc1961e56705fc05acc55e8fabb647931b7ba2c590bbe1900014bcdc043b50e553066ecfe6e0f5afeb69fc722fb559027812e1bcdf2be48fa205ee88c5959e843c9e14f3b7c70dc5d79bed9f9b804e1ab8812933c441e0a76f5e02a3f042df6e333997a9fd401304b7e715f6fcf0c8703a890a345271ebb17','text',NULL,NULL,'2025-01-19 11:32:39'),(4,'uid_93b408bb89bc30f6','uid_1840333109782408','3614b0cdabd1119995feb750b5b8353bd4c4c5fa5e047aaeeddeb9ae3d353b241e0b9ea059ff561766bff474f2347f58cc5bdd5b2ffb0733f1d253404de02226d0b73cc9c60c7b3be75782ed10ded016f99342e43547436c7208e8d52a3cfc1d3928e564035150e88392fdf13b9f27e5c020ddc416aad89d25189544926daa9695605c4cb48341a1215817a9df2caba90f28c73ba87cd44013731523bd3eee1e6eef50c99e4fda1489fdce7250e4795aa0c08a9073f63844d7a1f221c2fa3e9c8218f671367d29d03e7a7187d9f6d03528eb23121f411640d5587bd2bf271dd21c6673abe8409d66966a4b227e7d620cb90283f67ed16973e14800361a040fa87f6b18d197e479ee82c5fd9692af8d8f88fa2cdda816ba58c40beb6ea620593c958ff8a5c7a4e1bfdb6daab182e9e534ed81dd902177d6e266ed3faca3905d33cfc31d76d1a7d74cefd05ed080a057aec4b1150b410e8f3f9ac7d56d537c60af8bf5dd0d8440896199a2f65bf761e0999f9ed64c2de5721ddc5c9d98381f325146e67d4e9a53c3c39491b5ea553d029120015a8f3c96800f2ff2649e1c8fb53e8970f18da6eb18f5da95f12a2dc88dda3e9c001274a497a4f8c4a136042335fd6c4729d11c4698d87e527b5cf7a5a8a22f9336bf1c75a6fc99d88a1fffa0e991642802c0974f30bd2305fabd58e2290acb09a581f613e3792f7bb8ff52aa19c6','35fc11f587153e8b2a4e137f18a17856fbc9ba860e8b22a4acccd690b311dec9696ef98ffbfd8abddfcd84104e60248c773055152a30727e2b5ca0581a0cd5c5826b7236680171f4d53eaa895c2b7adf8eead08059ee66b68611262cdf516153432ffd19bee9e39ef56d3ff0736b0e1a4418fd9a36cdc791682d95091580b2f1fb0917d4f6ad77acbc4a361333189708e612000e24097e90a588583b0fb4351b54a85b87c200972393d93332f9234d4bfec8ef55a23ccefbf9554dc36fe11d2b166c2e9ddb459285d9d1903b7590ab4a3ed52960b19faafc67ecc3b740ac9678cbd6e8265c1a9af2213ca0e7b5936422ae4f93e7ac6cba5b03dc1517d250b2ed113fe1040dad5c9ced744309b8795c991735e6e33a76277e82d195d2943a9f93b51b887968ae29fec4042e2d99931259d1438b012d1139daad48ded4756b7461f40cec42072dd86ed1c0e58015f27bc6d46d3e097627ddd43f3cd09b6db37d7a82d42427329b7694dc9a279a168afa8b3437c6d01e8f81ac2200e188f777af0a91eddb895ae41275df70b4897ff351ec73d1ff80aa84d61a50c005a4568ffb3daa5903db3edeff4e4f52af9d2c107b2bc348b448c1dcdbb7f4f3547c0232c9986bfc04724aa5659d4ccd6309fd39f3de379542ac5ccf25e6fff772de25dfff5364a84ae625191dbccb9b136ee06a4842ccbdcdfa9a1a10f465d3a1d16a870b6f','text',NULL,NULL,'2025-01-19 11:32:43');
/*!40000 ALTER TABLE `privatemessage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `profileheart`
--

LOCK TABLES `profileheart` WRITE;
/*!40000 ALTER TABLE `profileheart` DISABLE KEYS */;
INSERT INTO `profileheart` VALUES ('uid_111668358174309320494','uid_93b408bb89bc30f6','2024-12-08 15:59:49'),('uid_1840333109782408','uid_93b408bb89bc30f6','2024-12-08 16:37:06'),('uid_93b408bb89bc30f6','uid_93b408bb89bc30f6','2025-01-16 22:21:27');
/*!40000 ALTER TABLE `profileheart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `profilemedia`
--

LOCK TABLES `profilemedia` WRITE;
/*!40000 ALTER TABLE `profilemedia` DISABLE KEYS */;
INSERT INTO `profilemedia` VALUES ('uid_1840333109782408','avatar','https://graph.facebook.com/1840333109782408/picture','2024-12-08 00:18:24'),('uid_1840333109782408','cover','https://res.cloudinary.com/der2ygna3/image/upload/v1730082713/users/cover/mzj5tslenqew6qdcpime.jpg','2024-12-08 00:18:24'),('uid_1840333109782408','avatar','https://res.cloudinary.com/der2ygna3/image/upload/v1733591954/users/avatar/file_82f615b8a014178b.jpg','2024-12-08 00:19:17'),('uid_1840333109782408','cover','https://res.cloudinary.com/der2ygna3/image/upload/v1733591954/users/cover/file_584c5eb364ae00c5.jpg','2024-12-08 00:19:17'),('uid_111668358174309320494','avatar','https://lh3.googleusercontent.com/a/ACg8ocJDoOefm7w8DB1gGKjjrkooyVm3A05mfDepJB98Lk_d95V2nA=s96-c','2024-12-08 11:11:30'),('uid_111668358174309320494','cover','https://res.cloudinary.com/der2ygna3/image/upload/v1730082713/users/cover/mzj5tslenqew6qdcpime.jpg','2024-12-08 11:11:30'),('uid_93b408bb89bc30f6','avatar','https://res.cloudinary.com/der2ygna3/image/upload/v1730082664/users/avatar/knji2r1nic8gvzm371hn.jpg','2024-12-08 15:37:27'),('uid_93b408bb89bc30f6','cover','https://res.cloudinary.com/der2ygna3/image/upload/v1730082713/users/cover/mzj5tslenqew6qdcpime.jpg','2024-12-08 15:37:27'),('uid_93b408bb89bc30f6','cover','https://res.cloudinary.com/der2ygna3/image/upload/v1738029208/users/cover/file_08bc8a45090b3427.jpg','2025-01-28 08:53:30'),('uid_93b408bb89bc30f6','avatar','https://res.cloudinary.com/der2ygna3/image/upload/v1738029208/users/avatar/file_376f4bb3af399e4b.jpg','2025-01-28 08:53:30'),('uid_105322195214825135716','avatar','https://lh3.googleusercontent.com/a/ACg8ocL4rV-Kw_DrWOV1r984vNWTVjMj2v8R9U1b-bBh8bMwA9mSvmY=s96-c','2025-01-28 09:33:21'),('uid_105322195214825135716','cover','https://res.cloudinary.com/der2ygna3/image/upload/v1730082713/users/cover/mzj5tslenqew6qdcpime.jpg','2025-01-28 09:33:21'),('uid_105322195214825135716','avatar','https://res.cloudinary.com/der2ygna3/image/upload/v1738031848/users/avatar/file_75af08073be5dd5d.jpg','2025-01-28 09:37:29'),('uid_105322195214825135716','cover','https://res.cloudinary.com/der2ygna3/image/upload/v1738031848/users/cover/file_f4543a061c1dfffa.jpg','2025-01-28 09:37:30');
/*!40000 ALTER TABLE `profilemedia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `story`
--

LOCK TABLES `story` WRITE;
/*!40000 ALTER TABLE `story` DISABLE KEYS */;
/*!40000 ALTER TABLE `story` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `subpostcomment`
--

LOCK TABLES `subpostcomment` WRITE;
/*!40000 ALTER TABLE `subpostcomment` DISABLE KEYS */;
INSERT INTO `subpostcomment` VALUES ('sub_cmt_4353452c59c415e5','cmt_0ef9524189cc2edb','uid_1840333109782408','<a href=\"/profile/uid_93b408bb89bc30f6\">Tiêu Công Cường</a><p>Chào mừng bạn đến với SFP Like và Share để có nhiều kênh phát triển hơn</p>',NULL,NULL,0,'2024-12-08 21:11:17');
/*!40000 ALTER TABLE `subpostcomment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `token`
--

LOCK TABLES `token` WRITE;
/*!40000 ALTER TABLE `token` DISABLE KEYS */;
INSERT INTO `token` VALUES ('uid_105322195214825135716','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidWlkXzEwNTMyMjE5NTIxNDgyNTEzNTcxNiIsInVzZXJfcm9sZSI6MCwiaWF0IjoxNzM4MDMxNjAxLCJleHAiOjE3MzgyOTA4MDF9.Sx1858JN_M6UdbmcXQC5ShSaRFwTca5Gzf7dz02bg9I','2025-01-31 09:33:21','FcUCabFPUr','2025-01-28 09:33:21'),('uid_111668358174309320494','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidWlkXzExMTY2ODM1ODE3NDMwOTMyMDQ5NCIsInVzZXJfcm9sZSI6MCwiaWF0IjoxNzMzNjQ2NDA4LCJleHAiOjE3MzM5MDU2MDh9.BQcJBzZb9MovMUGglOE-0FSgxrC5gx54OnNdKn7EmzY','2024-12-11 15:26:49','rZnH6Ins9w','2024-12-08 15:26:49'),('uid_1840333109782408','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidWlkXzE4NDAzMzMxMDk3ODI0MDgiLCJ1c2VyX3JvbGUiOjAsImlhdCI6MTczNDE4Njg3OCwiZXhwIjoxNzM0NDQ2MDc4fQ.uCzmv18uqJjFvkCiU1ehCiiZqre2uv2FnMXb1T1iTi8','2024-12-17 21:34:39','RKeqT3m2b6','2024-12-14 21:34:39'),('uid_93b408bb89bc30f6','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoidWlkXzkzYjQwOGJiODliYzMwZjYiLCJ1c2VyX3JvbGUiOjAsImlhdCI6MTczODUwNTA5NSwiZXhwIjoxNzM4NzY0Mjk1fQ.oQ84BcrV72KP1vwcee67tAkTFCm71y0wwWrr2RiAnDo','2025-02-05 21:04:56','yFD2Zxs2C5','2025-02-02 21:04:56');
/*!40000 ALTER TABLE `token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('uid_105322195214825135716','Bóng đá 24h','kolmusic_Ctg5','manhme2953@gmail.com','$2b$10$KOBrga48hHAUAJhlC4dOfuUbFvHMp5jyTlYcNHGnmNLz0iEiehe6m',1,'other','google','2025-01-28 09:33:20',0),('uid_111668358174309320494','Mạnh Dương','mnhdng_ayJI','duongvanmanh2953@gmail.com','$2b$10$SoGvfdyLvTwDiGUFsoMgV.SYkhH9ODKsVK.mXBwziNWxZQPWrpRVm',1,'other','google','2024-12-08 11:11:29',0),('uid_1840333109782408','Special Forces Military','dngmnh_yNP9','manhduong2953@gmail.com','$2b$10$eNbr.1SvdQUPXBgLcgaK0OYHBttHOBk2qJKtkrs4YrWTu97J3Dvwu',1,'other','facebook','2024-12-08 00:18:23',0),('uid_93b408bb89bc30f6','Mê Xe Thể Thao ?','tiucngcng_dlvg','tieucongthai123@gmail.com','$2b$10$AT1gdjXdr6ouxFh2JYqyMuUlZ.zGurS.1R7yRtYCqarPnjJnQeBvS',1,'male','register','2024-12-08 15:37:26',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `userfacedata`
--

LOCK TABLES `userfacedata` WRITE;
/*!40000 ALTER TABLE `userfacedata` DISABLE KEYS */;
INSERT INTO `userfacedata` VALUES ('u3uPEprqc1TNfWnxDaUlXTGOlt7q3GFK/IcV8AuOXuw=','https://res.cloudinary.com/der2ygna3/image/upload/v1733676625/users/face-recognition/file_b5ecbd1a642f4bee.jpg'),('u3uPEprqc1TNfWnxDaUlXTGOlt7q3GFK/IcV8AuOXuw=','https://res.cloudinary.com/der2ygna3/image/upload/v1733676625/users/face-recognition/file_becb2459e7b591eb.jpg'),('u3uPEprqc1TNfWnxDaUlXTGOlt7q3GFK/IcV8AuOXuw=','https://res.cloudinary.com/der2ygna3/image/upload/v1733676625/users/face-recognition/file_651d0f789dd13deb.jpg'),('u3uPEprqc1TNfWnxDaUlXTGOlt7q3GFK/IcV8AuOXuw=','https://res.cloudinary.com/der2ygna3/image/upload/v1733676624/users/face-recognition/file_f1b2032db7f115ab.jpg'),('u3uPEprqc1TNfWnxDaUlXTGOlt7q3GFK/IcV8AuOXuw=','https://res.cloudinary.com/der2ygna3/image/upload/v1733676625/users/face-recognition/file_1b099309760f817f.jpg');
/*!40000 ALTER TABLE `userfacedata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `userkeyspair`
--

LOCK TABLES `userkeyspair` WRITE;
/*!40000 ALTER TABLE `userkeyspair` DISABLE KEYS */;
INSERT INTO `userkeyspair` VALUES ('uid_93b408bb89bc30f6','-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAy5JtTIosL6Vceuqk0Dle\nM84GC30ZRBifqJz+e1wworEmkhIGICWOl6yUsIk02zi9fUv5k6LBVW5c5e5FT+X+\nuLnMSdXds2B6hTZ0tU7xshS/xZVNvUuFu619hjDYvHt80Vygvyk1c3T2dryEYRdz\nxlCULroIJFTEYj9ET+07kahDk/hC+1U12R1BdW+RUjrAClI6lDPTlBdga672BLxH\n9+dU1Ks8hv4sg2FbUcy41dkPgSLh9WlP8JOA60bcyMkPcA+R4CgRKwI/acM0dqaT\n9/Sf0XgNuOqvGEeAOXAKTxg2clsv4E7SrF+DQG64TuC9cZH9CZ0HG/x3sEIchpJF\nY7Yid+UAGF40kNd8/tPwXJAFotOeMy1uej+0+hXyokrK2SD6wu+IQbnab2eUzF2d\nWdmeDC9B9DsOAF+3SpfQbG6EMFeRYOESM8E0gkBEGL4g+gPcvnirglsQFx4BLCg8\nknRiusTRfC8nJ5d/AcLxif/eNXFpQOrh/8w3uB751U9VK+7tiDOlBU+jOXTeAVUs\n1Y1CGtzvpXLfglNYk6H2i0RFVKY2h/VkOSwMjG1d0DuIUEPvYCMV8MuULmcCR8Nx\nqeLa7LP5JpvOlWs288X1WwKN/riJ7DcNhAIjyte8gxMstV+oqZWytulIJYJ+LvBD\nPo/9rur/d1wHmAjs+qX7QAsCAwEAAQ==\n-----END PUBLIC KEY-----\n','U2FsdGVkX1+0eNe+YJp7WDXARpzbtf9MhCJmeN30eQQWnxla2dpSW9CeFTVBsVW8KYIRozhalqdNvHkjxkxOhhl8unh8V5fYLsIjMqCOCkpifnEBPc0xzLvs9YuITsyJohT2i74t40jcHh8Rlxi3j2PPxvpwCcMFJjtxkfbljOJOj00dzv1viGGiXC1YuN2d9okmovS7G2dOUnDXdG9WO5cJ5Qb22RFX975iCZWFxzD93hSu83m31Si3Zx3TE/A38Yx/iRW7hgJKGnVPyV9riJMSWhumNOwLIE77FjUCGle0NuyYQYkgmS1mkWb0EUP8prAbzxqgaeGWIDWa/F82uCQ6BRzgfAlMVPg/sKl+uFYaiAnKrcQ3Tu355+HuN3L/8jh9NBrOQES5FZp8gF3IjQ4wBu3Ggz+1vucX1zJxlZeWS7sjVDZxs8XPmyUwTYv5QqB8sfKJg9FA3mAljep8mqWjDYYllpYtmDB6bP7M6sGyf0wn/HkfwSUM4OrAFXhGVBYoFZXVYxMftasOnadxIWCrEy7Rh0QLYvikjIpQE7Kxa4DW4dzz+xplk8Uu46vaFUOgL2GSbkanJYmOqY2TQ49lcYFfIqGYmSLVAcl+d0NzlOnshdbAtvCxKmnDcEYdBuxbRo5Bqtc4bhPgqBfdyq60BwR1ISv7uN4LOtfwTt2W5dbtY7oorKKoPtAKeCLGuCwIJh2jhvH6OXALdcL9eUhl51y7v7+PhurPWx+FlyNXlC/A6/d1LK8mbh1Zieja4gjPt9IfNCqpqc5FNIbDEYkt6P9I7UdkVsqfusdwMJ1+QDdJcqpN2zPfOqjdHgCSaDgApFmZoRQpBjP1ImSApxwzXDGIt8yCSqLOu2ZC4p7BBzmbD1PxdB57brN1Cl/KztcMwcQ5l9gazu3bxZp95aTBF/EZjFGHLN6hkp7aeXskspSlDWhxDY1HH0U35k1tXXb+1tu+5u8fST2f0euoLyakcegBnO2pciiJhGS0jDvdxmBHzZVAFErnP0MbBEM7KPz3OGTCWukB03DH9tqqJWcp/m5cjMUHzfN0UyrAJg5D46F0veFAMvz0rc3tPTW/fKQ337H3D7Qk2ws8zSFpJ/Gq28O+WiXNL5fyAdbaveJLFiHMHBtzj5qYTZgrGfCWgaZL2BWENT2kx3KY6C0SmTw69jRDqi7SCIY68RYGIrNLcavaWaybfchCtF8BIGUknQo9W5xvNH1XYQAKRZMGX8TEmYddnMsdpF/CZ2imdazNdSh5BVGm6I9RzDFesbahkrWsGr1CyNh4Ss/uUDLyK5HLanGAD8kIZpb8+n6hFOeCEDyuAkoHGgdZ4fvNu62dH2UFrXdBWkI4lTSsNBDhiQlv5Qu6eMDX1UVDgzYjtTPeFcgWca+mwjV9TM6N5dnJj4IF0U1KsTBlkLS/KekJaHm2PCg7+4lISgmcK5z8uhwptuVnzSvEy7huAR2MVG/CGk8Vnp4YE98mXgCgh/So4XT6/W3v76hXSa8SZB9ui7m+hHfoKOg8tIPvXAzFEZeBysDZvo+K6/0/dwBYg7Ix7VQHlgAOvKZH3rMqia1anO6htUVJ1vFtrdoOOQhDznDT5gKvaZpTO1bKblPWHNTE6VFyfwknzCvX8mo4QsHpdDJgAss8uCslE1XQF1K2Fw/yif/T+AX2oc6ITCD+zaN1zaU/F+n4DAEOwHeVs8JEtSvVlAyhk1eG3PmC3eEUfxA3Nf8xUaULsV1HFlLfCpTG8q9l3BY/c/lEZyaSfd1orszmisFDZ64oXA/g2dN0VXcGteq91pnU9I+WxcFp0ali2UobNIPER84pz65J/kqwKj994EN0DKdghZo26EkdLjfzZY4ujhLMnwuhLFn3VpzQKlq85KyGrd+hI1SkGsrr0VbpXNhVtgfCyVPN8CVt4ATpS4gw0JcFZfuPESeZNDywfT6IUUmXF32W7raQVDKUgLcakmhCE2kA0DutncvtLmm1uXw6xx7EBiQD3xkWzO5k+U1b6KydcIINt1VDJS1m5Z1qUbNpDiYi7se82mWdy6bjX+vm2FqlVNhZsZ4crRwTpFJR1oUh9CA/esXZeYS54gKx8dX0/8onRJXYgLAJhyH4IEsVWIlq0SbI1Q9NUIMy5lVcdamVyiqXgjx5KAz8S6orixTgjK6yVshoEyYDOJxg8H7GtLnmCn/9cjN6IQwGs43igfsQMOnwtXyuaz5220/FtHriRiwGHLpIZqiyHn8idgb+b3JyZNrEscp7xuPh2mDwnwxHgFwTt3jY1aY6qylP0Yt2y9aGLkBUbzrgMWVOjFLUh5vH02KP1t5Gfy1DFcw8uPxA2b3pgTIgaZUqD9Tmn5rXqFDohXE9l9mbJLpcESDt8BNoJgR4o9XkiAJTfyNZuC3f/CPE3naPsFJ/xjzz1YcZNWOt6eQlemhJXr8bETfqqH2DkdzSAODHMBLqnZqmJWjsprzshAh6vxz1rMfbxNtK8MHk8jCJkcOlfQIELpj4ZuZ4Wfprgbq6+pGm1tbP+URgrxv2nQBXm6lPcPvtAjYV7vM9QgXdWelESMYN9HY/OTouV4xTQQ+owa2+ZasBRNA8eD4w3Ls4Xh88/DopNmcjWdqrwTKy0FovPEV9ea7oc08KvUusgpBF1HUV1PpTcWwvo+t+Lyg1EIytjNzNQRb78J4PgevxOmKpcuGoWtw1ZkGk4835dXlmNpYtz4rccZB39XHZTATmzzTTTVlPWw6sjne1WWkifuEFgFpS5StgIYlMSi4OE8knCEtDvJJI4IXgpQiqXVzPdvKrhctCF10kgLjlzrMZc6j7qjM/0XWlzc9EZowR8Emn2zFJPYKcObtgP13Lw3ejs4R88rlQpF7UlmU/7dZT2a2sSW7nuPtI8zaKwaMyRXHhNQUHpp/l2eOPxHhY8Tz4bD67h4MpDUXXMzNEgBbU0vPiuqSVtwpFBvIKJUNzj4zfhAKgNjJkMhWaEsb+TKWtMWHIXKgfFn5Wa4d95c3GZcDRy1MxUsvIvlTMUhWUTW0eXmaoIwABT0fUeMyRHE2VkwNwXrkKE9u96UDHr3ZoGSuPQIyjrwX5HRdDGtLFyOqmfww5obx7noj0K/7Qmg6ryVIH51l7zUmHJuboqPprBx3ccR8U7xSOHOMeevvi41tpExQMH3q6CTeKSR++9Lmwus1DxL6Zaizd/03bP+5rqSjTNl0lnuTRo5T5VCbLXf7cLt/aYOSrPAv2+nf9c5NaH1bMsg+7TsBjNYuBErDSa0vmeoH8e3BPc+pTn4sKeKk+qZP3+UqYWUaHUUBCKKRSYR+WofdEfDVuculbXvOm0zJu2LjYuJXUhgX97QdAxE81ruuYJSnhOL/NWGjwX2/LwND+6XvT7Yk05LIlwtZQZftyiqqjfstkoh9eS0FCcZiL3aThU4Pj42zPvayJEgZY5ePpjEejj2ex+X1V59+AZy3YbtT1C01LXUeXhmv5Q+L9aoQH9no+WCydNZtDDSSE35Pz+VeKX1hv6VJiMSYRMrQDW3rpaMUWCiGt3AClczqwLUe26VUwGbmSqkcU8Y1c5gu9QvNs/3mqMKqW7KOtr5jo81TAc7sSo3aQ8UHFqpxHfyh6MRQVfxKkDJVkXHWSzKNdP+UGvO5BJQaT9bq1rYu0cJESeZQ968LtUd8mIWjyZHaWL9zwqSCFkRLwxNo0vtpa0mhyIY+ZdRlptIU8fq36pKsXIOq/EW8BM/tC06/KuXhjaURvJySSSqvD639IKUGPi1bRabV8J6TqkaVRdox9EvCbnkdA++mfJF3LW51oKovD4J1K1wQu3t82hslZ1zqxpVyjwlabZVN7qX1J331WadJ193e1ClDGuY7DlULGCYjauRt+BjbJQFrHrtHfcAD0DBaqoFvPDARi1r7B2drHRbAhH+fVqqxeTGp0lydbaYrmAT1qwJ5WEM5kaD7ui3geyL6eMfBqsNXJB0GVYH76djI+Z+L0m8K4wqJwHv/hhJaTR7THt22Wr10oEzTbdEC3oxjkK3eF7eIRMXmr4qVtnqd7RFAX0aANkwjkz2TbiWxew/3Kd5IjrQ2pAgL2VACQ5oc2VIztaHKbBEVGIUXAYkiouryKjoiEydpqBRGmw2seinGOSW2k2CMb8nXDpAqKDLVmCvWsJ6lAKhFSKuzZCFresZTVp9KEl98aCfyoBkaARsu74Z6gKuyffjJuFFJtAmXBd33kzWG7kAUUDAucUcBsAi/GaRN/qdSswSaaxGnl+OXz7I5Kkg3JvIA9zaUzfcD0et952amzLXiLRpyizMVQgMjxjqTch3jvwttW+CKPbBcKlTvh600ytvIffKvLP1+U5qJMZGtZq95Q8u5EsVjcOfE8KPEno4MfG4gd341mxSZh2CodZiG76TgnG4Vhu9U='),('uid_1840333109782408','-----BEGIN PUBLIC KEY-----\nMIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAqksmjRrTnl1KCmqwXG5c\n462nV0bC+6t4jCIPkZSv+ifO+xn9IhV3luxOAKQzosWOfTY7Gvfdp7MSEWttYpbp\nHOoL1Vn0KGtZV9E+sLFereZJl2VnmzkcTCt4xGWpOyAK0mb/A9lGeNU7WnVJeX/+\nFnYOBzryKuG/BgYu9flZMUb1izb7MFSe5cz5oe2eOb3NjKFzJ4dnUf+mecnfpDmR\nl/YNf8RC7xtUmohl3bHsenHAmaCWW5AgOxkGbynci4zZLvBmfTyUZG7uUU09grO8\n3ouqr0yXfO4GHdZPVhTVPLSN+d53v9KnQ5AgXXiJaSM0SJPkIvSwce6i9FRT/qCp\nKV1G9+Wk+k/r2BBKREKDN3HBVJypPrqlp7lNCBCwlX3IaxE9djhy39ym6Np9Kj7/\nMI0MSbwm9wQmwqcqxOwPGvCNwke7ROff9sGtuuE51Pv6zPxDd8222WKzKF8mErYh\nStSLwZLMfX8dVyZtJs5l6mQ6tZ/OukTTpBjlbz7Bx6OLwmb+dcQf7DzPA4SK/DxB\n7oKF9/1z1kP/CnWgLZdf6NORNQVnjWqnBhZBj8NMhhkaXatqFegI3BYa9iQiU5Pj\nuTCZcJhZ5EE9HqZ004GGurHFrZeJX9NeqtVceFn7FxiKqvPMQDIAmQPE0q4e7sS1\nTJgQULxeHCagZHTxOOsCIZ0CAwEAAQ==\n-----END PUBLIC KEY-----\n','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');
/*!40000 ALTER TABLE `userkeyspair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `userpost`
--

LOCK TABLES `userpost` WRITE;
/*!40000 ALTER TABLE `userpost` DISABLE KEYS */;
INSERT INTO `userpost` VALUES (2,'uid_1840333109782408','post_440c11da38942494'),(3,'uid_1840333109782408','post_5ef40a2ad880048e'),(4,'uid_1840333109782408','post_3f8f4a406b41c015'),(5,'uid_1840333109782408','post_de390310f03b6a84'),(6,'uid_1840333109782408','post_62933261b93f512d'),(7,'uid_1840333109782408','post_462f10bc8f0755ad'),(8,'uid_1840333109782408','post_34e8fb2d3a2a7695'),(9,'uid_1840333109782408','post_02a680a270598f65'),(10,'uid_1840333109782408','post_d95892286a6329ad'),(11,'uid_93b408bb89bc30f6','post_e57b94a140068811'),(12,'uid_93b408bb89bc30f6','post_a9e77f5e81f1a448'),(13,'uid_105322195214825135716','post_842d6fcbbdfe50bc'),(14,'uid_93b408bb89bc30f6','post_1daf77d7c795ff7a'),(15,'uid_93b408bb89bc30f6','post_8a6b4e909ec13323'),(16,'uid_93b408bb89bc30f6','post_fdbca90cf930a171'),(17,'uid_93b408bb89bc30f6','post_7f94a5262f0a1608'),(18,'uid_93b408bb89bc30f6','post_3e33aff99e134cdf');
/*!40000 ALTER TABLE `userpost` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `userprofile`
--

LOCK TABLES `userprofile` WRITE;
/*!40000 ALTER TABLE `userprofile` DISABLE KEYS */;
INSERT INTO `userprofile` VALUES ('uid_1840333109782408',NULL,NULL,NULL,'SFM - Kênh tổng hợp kiến thức về Quân Sự và Chính Trị'),('uid_111668358174309320494',NULL,NULL,NULL,NULL),('uid_93b408bb89bc30f6','2003-03-13',NULL,NULL,'Trang Tin tức tổng hợp về xe'),('uid_105322195214825135716',NULL,NULL,NULL,'Kênh Bóng đá Tổng hợp');
/*!40000 ALTER TABLE `userprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `usersetting`
--

LOCK TABLES `usersetting` WRITE;
/*!40000 ALTER TABLE `usersetting` DISABLE KEYS */;
INSERT INTO `usersetting` VALUES ('uid_1840333109782408',1,1,1),('uid_111668358174309320494',1,1,1),('uid_93b408bb89bc30f6',1,1,1),('uid_105322195214825135716',1,1,1);
/*!40000 ALTER TABLE `usersetting` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-02 21:18:03
