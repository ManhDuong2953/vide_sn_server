import multer from "multer";
import express from "express";
import {
  createHeartStory,
  createStory,
  deleteStory,
  fetchUserStories,
  listMyStory,
  listStory,
  storyById,
} from "../../controllers/Story/story.controller.js";
import Authentication from "../../middlewares/authentication/authentication_token.js";
import { Authorization } from "../../middlewares/authorization/authorization_token.js";
const router = express.Router();
const storage = multer.memoryStorage(); // Bạn có thể thay đổi sang multer.diskStorage() nếu cần
const upload = multer({ storage });
export default function StoryRouter() {
  router.post(
    "/create-story",
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "audio", maxCount: 1 },
    ]),
    Authentication,
    Authorization,
    createStory
  );
  router.get("/list-story", Authentication, Authorization, listStory);
  router.get("/my-list-story/", Authentication, Authorization, listMyStory);
  router.get("/story-by-id/:id", Authentication, Authorization, storyById);
  router.get("/stories-by-id/:id", Authentication, Authorization, fetchUserStories);
  router.delete("/delete-story/:id", Authentication, Authorization, deleteStory);
  router.post(
    "/create-heart-story/:id",
    Authentication,
    Authorization,
    createHeartStory
  );
  return router;
}
