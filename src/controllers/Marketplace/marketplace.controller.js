import { Marketplace } from "../../models/Marketplace/marketplace.model";
import { MarketplaceMedia } from "../../models/Marketplace/marketplace_media.model";
import uploadFile from "../../configs/cloud/cloudinary.config";
// Thêm sản phẩm mới
export async function createProduct(req, res) {
  try {
    const data = req.body;
    const files = req.files;
    // Tạo đối tượng Marketplace
    const product = new Marketplace({
      seller_id: data?.data?.user_id,
      product_name: data.product_name,
      product_description: data.product_description,
      product_price: data.product_price,
      product_category: data.product_category,
      product_location: data.product_location,
      product_longitude: data.product_longitude,
      product_latitude: data.product_latitude,
    });
    const idProduct = await product.create();
    if (files.length > 0) {
      for (const file of files) {
        const mediaUrl = await uploadFile(
          file,
          process.env.NAME_FOLDER_MARKET_PLACE
        );
        const media = new MarketplaceMedia({
          marketplace_product_id: idProduct,
          media_link: mediaUrl.url,
        });
        await media.create();
      }
    }

    if (idProduct) {
      return res.status(201).json({
        status: true,
        message: "Sản phẩm đã được thêm thành công!",
        product_id: idProduct,
      });
    } 
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({ message: "Lỗi server khi thêm sản phẩm." });
  }
}

// Lấy tất cả sản phẩm
export async function getAllProducts(req, res) {
  try {
    const products = await Marketplace.getAll();
    return res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return res
      .status(500)
      .json({ message: "Lỗi server khi lấy danh sách sản phẩm." });
  }
}

// Lấy sản phẩm theo ID
export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Marketplace.getById(id);

    if (product) {
      return res.status(200).json(product);
    } else {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res
      .status(500)
      .json({ message: "Lỗi server khi lấy thông tin sản phẩm." });
  }
}

// Cập nhật sản phẩm
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;

    const product = new Marketplace({
      marketplace_product_id: id,
      product_name: data.product_name,
      product_description: data.product_description,
      product_price: data.product_price,
      product_category: data.product_category,
      product_location: data.product_location,
      product_longitude: data.product_longitude,
      product_latitude: data.product_latitude,
    });

    const isUpdated = await product.update();

    if (isUpdated) {
      return res.status(200).json({ message: "Cập nhật sản phẩm thành công!" });
    } else {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để cập nhật." });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ message: "Lỗi server khi cập nhật sản phẩm." });
  }
}

// Xóa sản phẩm
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const isDeleted = await Marketplace.delete(id);

    if (isDeleted) {
      return res.status(200).json({ message: "Xóa sản phẩm thành công!" });
    } else {
      return res
        .status(404)
        .json({ message: "Không tìm thấy sản phẩm để xóa." });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Lỗi server khi xóa sản phẩm." });
  }
}

// Tìm kiếm sản phẩm
export async function searchProducts(req, res) {
  try {
    const { query } = req.query;

    if (!query || query.trim() === "") {
      return res
        .status(400)
        .json({ message: "Từ khóa tìm kiếm không hợp lệ." });
    }

    const products = await Marketplace.search(query);

    if (products.length > 0) {
      return res.status(200).json(products);
    } else {
      return res.status(404).json({ message: "Không tìm thấy sản phẩm." });
    }
  } catch (error) {
    console.error("Error searching products:", error);
    return res
      .status(500)
      .json({ message: "Lỗi server khi tìm kiếm sản phẩm." });
  }
}
