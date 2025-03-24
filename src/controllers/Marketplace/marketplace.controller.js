import { Marketplace } from "../../models/Marketplace/marketplace.model.js";
import { MarketplaceMedia } from "../../models/Marketplace/marketplace_media.model.js";
import uploadFile from "../../configs/cloud/cloudinary.config.js";
import { Users } from "../../models/Users/user_account.model.js";
import { ProfileMedia } from "../../models/Users/profile_media.model.js";
import { MarketplaceFile } from "../../models/Marketplace/marketplace_file.model.js";
// Thêm sản phẩm mới
export async function createProduct(req, res) {
  try {
    const data = req.body;
    const files = req.files?.files;
    const file_glb = req.files?.file_glb;
    
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
      seller_wallet_address: data.seller_wallet_address,
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
    if (file_glb.length > 0) {
      for (const file of file_glb) {
        const mediaUrl = await uploadFile(
          file,
          process.env.NAME_FOLDER_MARKET_PLACE_FILE
        );
        const media = new MarketplaceFile({
          marketplace_product_id: idProduct,
          media_file_link: mediaUrl.url,
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
    } else {
      return res.status(404).json({
        status: false,
        message: "Đăng sản phẩm không thành công!",
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

    for (const item of products) {
      // Gán giá trị media
      item.media = await MarketplaceMedia.getAllByProductId(
        item.marketplace_product_id
      );
    }

    return res.status(200).json({ status: true, data: products });
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

    // Lấy thông tin sản phẩm
    const product = await Marketplace.getById(id);

    if (!product) {
      return res.status(404).json({
        status: false,
        message: "Không tìm thấy sản phẩm.",
      });
    }

    // Lấy thông tin tài khoản người bán
    const user_account = await Users.getById(product.seller_id);

    // Lấy avatar mới nhất của người bán
    const user_profile = await ProfileMedia.getLatestAvatarById(
      user_account?.user_id
    );

    // Lấy danh sách media của sản phẩm
    const productMedia = await MarketplaceMedia.getAllByProductId(id);

    // Trả về dữ liệu
    return res.status(200).json({
      status: true,
      data: {
        product,
        media: productMedia,
        user: {
          ...user_account,
          avatar: user_profile,
        },
      },
    });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return res.status(500).json({
      status: false,
      message: "Lỗi server khi lấy thông tin sản phẩm.",
    });
  }
}

// Cập nhật sản phẩm
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const user_id = data?.data?.user_id;
    const filesMedia = req.files || [];
    const isChangedFiles = req.body?.isFilesChanged === "true"; // Đảm bảo boolean
    const productData = await Marketplace.getById(id);

    if (!productData) {
      return res.status(404).json({ message: "Sản phẩm không tồn tại." });
    }

    const seller_id = productData.seller_id;
    if (user_id !== seller_id) {
      return res
        .status(403)
        .json({ message: "Bạn không phải chủ sản phẩm, không thể cập nhật." });
    }

    const product = new Marketplace({
      marketplace_product_id: id,
      product_name: data?.product_name,
      product_description: data?.product_description,
      product_price: data?.product_price,
      product_category: data?.product_category,
      seller_wallet_address: data?.seller_wallet_address,
    });

    const isUpdated = await product.update();

    if (isUpdated && isChangedFiles && filesMedia.length > 0) {
      const isDelete = await MarketplaceMedia.deleteAllByProductId(id);
      if (isDelete) {
        const uploadPromises = filesMedia.map(async (file) => {
          const mediaUrl = await uploadFile(
            file,
            process.env.NAME_FOLDER_MARKET_PLACE
          );
          const media = new MarketplaceMedia({
            marketplace_product_id: id,
            media_link: mediaUrl.url,
          });
          return media.create();
        });
        await Promise.all(uploadPromises);
      }
    }

    if (isUpdated) {
      return res
        .status(200)
        .json({ status: true, message: "Cập nhật sản phẩm thành công!" });
    } else {
      return res.status(500).json({
        status: false,
        message: "Không thể cập nhật sản phẩm, vui lòng thử lại.",
      });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({ status: false, message: "Lỗi server khi cập nhật sản phẩm." });
  }
}

// Xóa sản phẩm
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const user_id = req.body?.data?.user_id;
    const isDeleted = await Marketplace.delete(id, user_id);
    if(isDeleted){
      await MarketplaceMedia.deleteAllByProductId(id)
      await MarketplaceFile.deleteAllByProductId(id)
    }

    if (isDeleted) {
      return res
        .status(200)
        .json({ status: true, message: "Xóa sản phẩm thành công!" });
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Bạn không đủ thẩm quyền để xoá" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({ message: "Lỗi server khi xóa sản phẩm." });
  }
}

// Tìm kiếm sản phẩm
// Lấy tất cả sản phẩm
export async function searchProducts(req, res) {
  try {
    const { query, minPrice, maxPrice, category, location, currentPage } = req.body;

    const products = await Marketplace.search({
      query,
      minPrice,
      maxPrice,
      category,
      location,
      currentPage
    });

    for (const item of products) {
      item.media = await MarketplaceMedia.getAllByProductId(item.marketplace_product_id);
    }
    return res.status(200).json({ status: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Lỗi server khi lấy danh sách sản phẩm." });
  }
}

