import multer from "multer";
import express from "express";
import Authentication from "../../middlewares/authentication/authentication_token.js";
import { Authorization } from "../../middlewares/authorization/authorization_token.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getUserGLBFilesByID,
  searchProducts,
  updateProduct,
} from "../../controllers/Marketplace/marketplace.controller.js";

const router = express.Router();
const storage = multer.memoryStorage(); // Bạn có thể thay đổi sang multer.diskStorage() nếu cần
const upload = multer({ storage });
export default function MarketplaceRouter() {
  router.post(
    "/create-product",
    upload.fields([
      { name: "files", maxCount: 10 }, // Nhận tối đa 10 file cho 'files'
      { name: "file_glb", maxCount: 1 } // Nhận 1 file cho 'fileGLB'
    ]),
    Authentication,
    Authorization,
    createProduct
  );
  
  router.get("/get-all-product", Authentication, Authorization, getAllProducts);
  router.get("/get-view-three-dimension/:id", Authentication, Authorization, getUserGLBFilesByID);

  router.get(
    "/get-product-by-id/:id",
    Authentication,
    Authorization,
    getProductById
  );

  router.post(
    "/search-product/",
    Authentication,
    Authorization,
    searchProducts
  );

  router.delete(
    "/delete-product-by-id/:id",
    Authentication,
    Authorization,
    deleteProduct
  );

  router.post(
    "/update-product-by-id/:id",
    upload.array("files", 5),
    Authentication,
    Authorization,
    updateProduct
  );

  return router;
}
