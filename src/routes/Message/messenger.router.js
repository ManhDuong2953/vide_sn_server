import { Router } from "express";
import {
  createMessage,
  getAllMessages,
} from "../../controllers/Message/messenger.controller";
import { Authorization } from "../../middlewares/authorization/authorization_token";
import Authentication from "../../middlewares/authentication/authentication_token";
import multer from "multer";
// Cấu hình Multer để xử lý nhiều trường ảnh
const storage = multer.memoryStorage(); // Bạn có thể thay đổi sang multer.diskStorage() nếu cần
const upload = multer({ storage });

// Cấu hình router
const MessengerRouter = (router = Router()) => {
  router.post(
    "/send/:id",
    upload.array("file", 10),
    Authentication,
    Authorization,
    createMessage
  );
  router.post(
    "/all-message/:id",
    Authentication,
    Authorization,
    getAllMessages
  );

  return router;
};

export default MessengerRouter;
