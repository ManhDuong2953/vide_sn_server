import { Router } from "express";
import { blockFriend, checkBlockFriend, deleteBlockFriend } from "../../controllers/Users/friend_block.controller";
import Authentication from "../../middlewares/authentication/authentication_token";
import { Authorization } from "../../middlewares/authorization/authorization_token";

// Cấu hình router
const FriendBlockRouter = (router = Router()) => {
  //tạo block
  router.get(
    "/create-block/:receiver_id",
    Authentication,
    Authorization,
    blockFriend
  );

  //check block
  router.get(
    "/check-block/:receiver_id",
    Authentication,
    Authorization,
    checkBlockFriend
  );

  //xoá block
  router.delete(
    "/delete-block/:receiver_id",
    Authentication,
    Authorization,
    deleteBlockFriend
  );
  return router;
};

export default FriendBlockRouter;
