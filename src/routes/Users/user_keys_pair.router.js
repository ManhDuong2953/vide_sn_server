import { Router } from "express";
import Authentication from "../../middlewares/authentication/authentication_token.js";
import { Authorization } from "../../middlewares/authorization/authorization_token.js";
import {
  checkExistKeyPair,
  checkKeysPairReceiver,
  checkSecretDeCryptoPrivateKey,
  createKeyPair,
  deleteKeysPair,
} from "../../controllers/Users/user_keys_pair.controller.js";

// Cấu hình router
const UserKeysPairRouter = (router = Router()) => {
  //Đăng ký khoá
  router.post("/register", Authentication, Authorization, createKeyPair);
  //Kiểm tra khoá
  router.get(
    "/is_exist_keys_pair",
    Authentication,
    Authorization,
    checkExistKeyPair
  );
  //Lấy khoá bí mật
  router.post(
    "/get_private_key",
    Authentication,
    Authorization,
    checkSecretDeCryptoPrivateKey
  );
  // Xoá cặp khoá
  router.delete(
    "/delete_keys_pair",
    Authentication,
    Authorization,
    deleteKeysPair
  );

  router.get("/is-has-keypair/:receiver_id", checkKeysPairReceiver);
  return router;
};

export default UserKeysPairRouter;
