import { Router } from "express";

import {
  Authorization,
  checkRoleGroup,
} from "../../middlewares/authorization/authorization_token.js";
import Authentication from "../../middlewares/authentication/authentication_token.js";
import {
  acceptInviteByMember,
  checkRoleMember,
  deleteInviteByMember,
  getGroupsByUserID,
  getMemberGroupsByGroupID,
  getMemberGroupsOfficalByGroupID,
  getMemberGroupsUnapprovedByGroupID,
  refuseInviteByMember,
  sendInviteByMember,
  setAdminGroup,
} from "../../controllers/Group/group_member.controller.js";
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
    "/list-members-group/:id",
    Authentication,
    Authorization,
    getMemberGroupsByGroupID
  );
  router.get(
    "/list-members-offical-group/:id",
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

  router.post(
    "/accept-invited-group/:id",
    Authentication,
    Authorization,
    checkRoleGroup([1]),
    acceptInviteByMember
  );

  router.post(
    "/set-admin-group/:id",
    Authentication,
    Authorization,
    checkRoleGroup([1]),
    setAdminGroup
  );

  router.post(
    "/refuse-invited-group/:id",
    Authentication,
    Authorization,
    checkRoleGroup([1]),
    refuseInviteByMember
  );

  router.post(
    "/delete-invited-group/:id",
    Authentication,
    Authorization,
    deleteInviteByMember
  );

  router.get("/check-role/:id", Authentication, Authorization, checkRoleMember);
  return router;
};

export default GroupMemberRouter;
