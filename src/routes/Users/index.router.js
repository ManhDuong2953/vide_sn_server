import { Router } from "express";
import UserAccountRouter from "./user_account.router.js";
import express from "express";
import Authentication from "../../middlewares/authentication/authentication_token.js";
import { Authorization } from "../../middlewares/authorization/authorization_token.js";
import {
  getInfoProfileUser,
  uploadInfoProfileUser,
} from "../../controllers/Users/index.controller";

import multer from "multer";
import UserSettingRouter from "./user_setting.router.js";
import UserFaceRecognitionRouter from "./user_face_recognition.router.js";
import FriendRouter from "./friend.router.js";
import FriendBlockRouter from "./friend_block.router.js";
import ProfileHeartRouter from "./profile_heart.router.js";
import UserKeysPairRouter from "./user_keys_pair.router.js";
import ProfileMediaRouter from "./profile_media.router.js";
// Cấu hình Multer để xử lý nhiều trường ảnh
const storage = multer.memoryStorage(); // Bạn có thể thay đổi sang multer.diskStorage() nếu cần
const upload = multer({ storage });

const UserRouter = (router = Router()) => {
  router.use("/account", UserAccountRouter(express.Router()));
  router.use("/face-recognition", UserFaceRecognitionRouter(express.Router()));
  router.use("/setting", UserSettingRouter(express.Router()));
  router.get(
    "/info-profile/:id",
    Authentication,
    Authorization,
    getInfoProfileUser
  );
  router.get(
    "/info-profile/",
    Authentication,
    Authorization,
    getInfoProfileUser
  );
  router.use("/friend/", FriendRouter(express.Router()));
  router.use("/profile-heart/", ProfileHeartRouter(express.Router()));
  router.use("/friend-block/", FriendBlockRouter(express.Router()));
  router.put(
    "/update-profile",
    upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "cover", maxCount: 1 },
    ]),
    Authentication,
    Authorization,
    uploadInfoProfileUser
  );
  router.use('/keys_pair', UserKeysPairRouter(express.Router()));
  router.use('/profile-media', ProfileMediaRouter(express.Router()));
  
  return router;
};

export default UserRouter;
