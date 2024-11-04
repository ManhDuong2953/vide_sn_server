import { Router } from "express";
import {
  createMessage,
  deleteAllMessenger,
  deleteMessenger,
  deleteMessengerByOwnerSide,
  getAllConversations,
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

  router.post(
    "/all-conversation/",
    Authentication,
    Authorization,
    getAllConversations
  );

  router.delete(
    "/delete-all-messenger/:friend_id",
    Authentication,
    Authorization,
    deleteAllMessenger
  );

  router.delete(
    "/delete-messenger/:messenger_id",
    Authentication,
    Authorization,
    deleteMessenger
  );

  router.delete(
    "/delete-messenger-by-owner-side/:messenger_id",
    Authentication,
    Authorization,
    deleteMessengerByOwnerSide
  );

  return router;
};

export default MessengerRouter;
