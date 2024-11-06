import { Router } from "express";
import Authentication from "../../middlewares/authentication/authentication_token";
import { Authorization } from "../../middlewares/authorization/authorization_token";
import { getAllProfileMediaByIdUser } from "../../controllers/Users/profile_media.controller";

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
