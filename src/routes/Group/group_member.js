import { Router } from "express";

import { Authorization } from "../../middlewares/authorization/authorization_token";
import Authentication from "../../middlewares/authentication/authentication_token";
import { getGroupsByUserID } from "../../controllers/Group/group_member.controller";
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

  return router;
};

export default GroupMemberRouter;
