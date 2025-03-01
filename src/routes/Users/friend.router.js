import { Router } from "express";
import Authentication from "../../middlewares/authentication/authentication_token.js";
import { Authorization } from "../../middlewares/authorization/authorization_token.js";
import {
  acceptFriend,
  createFriendRequest,
  deleteFriend,
  getAllRequestorsByReceiverId,
  getCountManualFriend,
  getDobFriends,
  getFriends,
  getListSuggest,
  statusFriend,
} from "../../controllers/Users/friend.controller";

// Cấu hình router
const FriendRouter = (router = Router()) => {
  // Tạo yêu cầu kết bạn
  router.post(
    "/request/:id",
    Authentication,
    Authorization,
    createFriendRequest
  );

  // Chấp nhận lời mời kết bạn
  router.put("/accept/:id", Authentication, Authorization, acceptFriend);

  // Lấy tình trạng bạn bè
  router.post("/status", statusFriend);

  // // Lấy số bạn chung
  router.get(
    "/get-count-manual-friend/:friend_id",
    Authentication,
    Authorization,
    getCountManualFriend
  );

  // Lấy danh sách bạn bè
  router.get("/list/:id", getFriends);

  // Lấy tất cả các yêu cầu kết bạn bởi ID của người nhận
  router.get(
    "/requests/list",
    Authentication,
    Authorization,
    getAllRequestorsByReceiverId
  );

  // Xóa bạn bè
  router.post("/delete", Authentication, Authorization, deleteFriend);

  //Lấy danh sách bạn bè gợi ý
  router.get("/list-suggest", Authentication, Authorization, getListSuggest);

  //Lấy danh sách dob
  router.get("/list-dob", Authentication, Authorization, getDobFriends);

  return router;
};

export default FriendRouter;
