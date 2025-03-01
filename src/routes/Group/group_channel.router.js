import { Router } from "express";
import { Authorization, checkRoleGroup } from "../../middlewares/authorization/authorization_token.js";
import Authentication from "../../middlewares/authentication/authentication_token.js";
import multer from "multer";
import {
  createGroupChannel,
  deleteGroup,
  getInfoGroupChannel,
  updateGroup,
} from "../../controllers/Group/group_channel.controller";
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

  router.get("/details/:group_id", getInfoGroupChannel);
  router.post(
    "/update/:group_id",
    upload.fields([
      { name: "avatar", maxCount: 1 },
      { name: "cover", maxCount: 1 },
    ]),
    Authentication,
    Authorization,
    checkRoleGroup([1]),
    updateGroup
  );
  router.delete(
    "/delete/:group_id",
    Authentication,
    Authorization,
    checkRoleGroup([1]),
    deleteGroup
  );

  return router;
};

export default GroupChannelRouter;
