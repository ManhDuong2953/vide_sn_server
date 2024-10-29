import { Router } from "express";

import { Authorization } from "../../middlewares/authorization/authorization_token";
import Authentication from "../../middlewares/authentication/authentication_token";
import multer from "multer";
import { createGroupChannel, getInfoGroupChannel } from "../../controllers/Group/group_channel.controller";
// Cấu hình Multer để xử lý nhiều trường ảnh
const storage = multer.memoryStorage(); // Bạn có thể thay đổi sang multer.diskStorage() nếu cần
const upload = multer({ storage });

// Cấu hình router
const GroupChannelRouter = (router = Router()) => {
  router.post(
    "/create/",
    upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "cover", maxCount: 1 },
    ]),
    Authentication,
    Authorization,
    createGroupChannel
  );

  router.get("/details/:group_id", getInfoGroupChannel)

  return router;
};

export default GroupChannelRouter;
