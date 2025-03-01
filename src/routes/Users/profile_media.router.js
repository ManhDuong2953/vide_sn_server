import { Router } from "express";
import Authentication from "../../middlewares/authentication/authentication_token.js";
import { Authorization } from "../../middlewares/authorization/authorization_token.js";
import { getAllProfileMediaByIdUser } from "../../controllers/Users/profile_media.controller.js";

// Cấu hình router
const ProfileMediaRouter = (router = Router()) => {
  router.get(
    "/my-profile-media",
    Authentication,
    Authorization,
    getAllProfileMediaByIdUser
  );

  return router;
};
export default ProfileMediaRouter;
