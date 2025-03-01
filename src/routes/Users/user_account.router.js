import { Router } from "express";
import {
  createUsers,
  loginUser,
  getUserById,
  getAllUsers,
  updateUser,
  updateUserPassword,
  deleteUser,
  createUsersBySocialAccount,
} from "../../controllers/Users/user_account.controller";
import Authentication from "../../middlewares/authentication/authentication_token.js";

// Cấu hình router
const UserAccountRouter = (router = Router()) => {
  router.post("/signup", createUsers); // Đăng ký
  router.post("/social-network/signup", createUsersBySocialAccount); // Đăng ký bằng tài khoản mạng xã hội
  router.post("/login", Authentication, (req, res) => {
    res.status(200).json({ status: true });
  }); // Đăng nhập
  router.get("/is-existed/:id", getUserById); // Kiểm tra sự tồn tại của tài khoản bằng id
  router.put("/reset-password", updateUserPassword); // Đổi password
  router.get("/all", getAllUsers); // Lấy toàn bộ thông tin tài khoản
  router.get("/info/:id", Authentication, getUserById); // Lấy thông tin tài khoản bằng id

  // Sửa thông tin tài khoản, bao gồm nhiều trường ảnh
  router.put("/update/:id", Authentication, updateUser);

  router.delete("/delete/:id", Authentication, deleteUser); // Xóa tài khoản

  return router;
};

export default UserAccountRouter;
