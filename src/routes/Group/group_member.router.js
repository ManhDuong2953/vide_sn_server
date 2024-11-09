import { Router } from "express";

import { Authorization } from "../../middlewares/authorization/authorization_token";
import Authentication from "../../middlewares/authentication/authentication_token";
import {
  checkRoleMember,
  getGroupsByUserID,
  getMemberGroupsByGroupID,
  getMemberGroupsOfficalByGroupID,
  getMemberGroupsUnapprovedByGroupID,
  sendInviteByMember,
} from "../../controllers/Group/group_member.controller";
// Cấu hình router
const GroupMemberRouter = (router = Router()) => {
  router.get(
    "/list-all-group/:user_id",
    Authentication,
    Authorization,
    getGroupsByUserID
  );
  router.get(
    "/list-all-group/",
    Authentication,
    Authorization,
    getGroupsByUserID
  );

  router.get(
    "/list-members-group/",
    Authentication,
    Authorization,
    getMemberGroupsByGroupID
  );
  router.get(
    "/list-members-offical-group/",
    Authentication,
    Authorization,
    getMemberGroupsOfficalByGroupID
  );
  router.get(
    "/list-members-unapproved-group/:id",
    Authentication,
    Authorization,
    getMemberGroupsUnapprovedByGroupID
  );
  router.post(
    "/invited-group/:id",
    Authentication,
    Authorization,
    sendInviteByMember
  );

  router.get(
    "/check-role/:id",
    Authentication,
    Authorization,
    checkRoleMember
  );
  return router;
};

export default GroupMemberRouter;
