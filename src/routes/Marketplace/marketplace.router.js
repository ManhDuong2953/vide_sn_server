import multer from "multer";
import express from "express";
import Authentication from "../../middlewares/authentication/authentication_token.js";
import { Authorization } from "../../middlewares/authorization/authorization_token.js";
import { createProduct } from "../../controllers/Marketplace/marketplace.controller.js";

const router = express.Router();
const storage = multer.memoryStorage(); // Bạn có thể thay đổi sang multer.diskStorage() nếu cần
const upload = multer({ storage });
export default function MarketplaceRouter() {
  router.post(
    "/create-product",
    upload.array("files", 10),
    Authentication,
    Authorization,
    createProduct
  );


  return router;
}
