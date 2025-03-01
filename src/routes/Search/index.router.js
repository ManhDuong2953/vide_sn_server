import express from "express";
import Authentication from "../../middlewares/authentication/authentication_token.js";
import { Authorization } from "../../middlewares/authorization/authorization_token.js";
import { searchUserByNameOrNickname } from "../../controllers/Users/index.controller.js";
import { searchGroupChannel } from "../../controllers/Group/group_channel.controller.js";
import { listPostBySearch } from "../../controllers/Post/post.controller.js";
const router = express.Router();

export default function SearchRouter() {
  router.post(
    "/users",
    Authentication,
    Authorization,
    searchUserByNameOrNickname
  );

  router.post("/groups", Authentication, Authorization, searchGroupChannel);
  router.post("/posts", Authentication, Authorization, listPostBySearch);
  return router;
}
