import { Router } from "express";
import { acceptGroupPost, createGroupPost, deleteGroupPost, getAllAcceptedGroupPosts, getAllUnapprovedGroupPosts } from "../../controllers/Group/group_post.controller";
import Authentication from "../../middlewares/authentication/authentication_token";
import { Authorization, checkRoleGroup } from "../../middlewares/authorization/authorization_token";

// Cấu hình router
const GroupPostRouter = (router = Router()) => {
  router.post(
    "/create/:group_id",
    Authentication,
    Authorization,
    checkRoleGroup([0,1]),
    createGroupPost
  );
  router.get(
    "/list-post-accepted/:group_id",
    Authentication,
    Authorization,
    checkRoleGroup([0,1]),
    getAllAcceptedGroupPosts
  );
  router.get(
    "/list-post-unapproved/:group_id",
    Authentication,
    Authorization,
    checkRoleGroup([0,1]),
    getAllUnapprovedGroupPosts
  );
  router.post(
    "/accepted-post/:group_id",
    Authentication,
    Authorization,
    checkRoleGroup([1]),
    acceptGroupPost
  );
  router.post(
    "/refused-post/:group_id",
    Authentication,
    Authorization,
    checkRoleGroup([1]),
    deleteGroupPost
  );

  return router;
};

export default GroupPostRouter;
