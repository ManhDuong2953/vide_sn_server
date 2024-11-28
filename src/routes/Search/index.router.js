import express from "express";
import Authentication from "../../middlewares/authentication/authentication_token";
import { Authorization } from "../../middlewares/authorization/authorization_token";
import { searchUserByNameOrNickname } from "../../controllers/Users/index.controller";
import { searchGroupChannel } from "../../controllers/Group/group_channel.controller";
import { listPostBySearch } from "../../controllers/Post/post.controller";
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
