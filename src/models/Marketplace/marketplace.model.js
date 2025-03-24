import db from "../../configs/database/database.config.js";
import { generateId } from "../../ultils/crypto.js";

class Marketplace {
  constructor(data) {
    this.marketplace_product_id = data.marketplace_product_id;
    this.seller_id = data.seller_id;
    this.product_name = data.product_name;
    this.product_description = data.product_description;
    this.product_price = data.product_price || 0;
    this.product_category = data.product_category || "Uncategorized";
    this.product_location = data.product_location;
    this.product_longitude = data.product_longitude;
    this.product_latitude = data.product_latitude;
    this.created_at = data.created_at || new Date();
    this.seller_wallet_address = data.seller_wallet_address;
  }

  // Tạo sản phẩm mới
  async create() {
    try {
      const idGenerator = generateId("mrk_plc_");
      const createQuery = `
                INSERT INTO Marketplace 
                (marketplace_product_id, seller_id, product_name, product_description, product_price, product_category, product_location, product_longitude, product_latitude, created_at,seller_wallet_address)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;
      const [result] = await db.execute(createQuery, [
        idGenerator,
        this.seller_id,
        this.product_name,
        this.product_description,
        this.product_price,
        this.product_category,
        this.product_location,
        this.product_longitude,
        this.product_latitude,
        this.created_at,
        this.seller_wallet_address
      ]);
      return result.affectedRows ? idGenerator : null;
    } catch (error) {
      console.error("Error creating product:", error);
      return false;
    }
  }

  // Lấy tất cả sản phẩm
  static async getAll() {
    try {
      const getAllQuery = "SELECT * FROM Marketplace;";
      const [results] = await db.execute(getAllQuery);
      return results;
    } catch (error) {
      console.error("Error fetching all products:", error);
      return [];
    }
  }

  // Lấy sản phẩm theo ID
  static async getById(productId) {
    try {
      const getByIdQuery =
        "SELECT * FROM Marketplace WHERE marketplace_product_id = ?;";
      const [results] = await db.execute(getByIdQuery, [productId]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
  }

  // Sửa sản phẩm
  async update() {
    try {
      // Khởi tạo mảng để lưu các giá trị cần cập nhật
      const updateValues = [];

      // Khởi tạo mảng các cột cần cập nhật
      let updateColumns = [];

      // Kiểm tra và thêm các trường đã thay đổi vào câu lệnh UPDATE
      if (this.product_name) {
        updateColumns.push("product_name = ?");
        updateValues.push(this.product_name);
      }
      if (this.product_description) {
        updateColumns.push("product_description = ?");
        updateValues.push(this.product_description);
      }
      if (this.product_price) {
        updateColumns.push("product_price = ?");
        updateValues.push(this.product_price);
      }
      if (this.product_category) {
        updateColumns.push("product_category = ?");
        updateValues.push(this.product_category);
      }
      if (this.product_location) {
        updateColumns.push("product_location = ?");
        updateValues.push(this.product_location);
      }
      if (this.product_longitude) {
        updateColumns.push("product_longitude = ?");
        updateValues.push(this.product_longitude);
      }
      if (this.product_latitude) {
        updateColumns.push("product_latitude = ?");
        updateValues.push(this.product_latitude);
      }

      if (this.seller_wallet_address) {
        updateColumns.push("seller_wallet_address = ?");
        updateValues.push(this.seller_wallet_address);
      }

      // Nếu có trường nào cần cập nhật, thực hiện UPDATE
      if (updateColumns.length > 0) {
        const updateQuery = `
          UPDATE Marketplace 
          SET ${updateColumns.join(", ")}
          WHERE marketplace_product_id = ?;
        `;

        // Thêm marketplace_product_id vào cuối mảng values
        updateValues.push(this.marketplace_product_id);

        const [result] = await db.execute(updateQuery, updateValues);
        return result.affectedRows > 0; // Kiểm tra có dòng dữ liệu nào bị ảnh hưởng không
      } else {
        return false; // Nếu không có trường nào cần cập nhật, trả về false
      }
    } catch (error) {
      console.error("Error updating product:", error);
      return false;
    }
  }

  // Xóa sản phẩm
  static async delete(productId, userId) {
    try {
      const deleteQuery =
        "DELETE FROM Marketplace WHERE marketplace_product_id = ? AND seller_id = ?";
      const [result] = await db.execute(deleteQuery, [productId, userId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting product:", error);
      return null;
    }
  }
  static async search({
    query,
    minPrice,
    maxPrice,
    category,
    location,
    currentPage,
  }) {
    try {
      const itemsPerPage = 10; // Số sản phẩm mỗi trang
      const offset = (currentPage - 1) * itemsPerPage; // Tính toán vị trí bắt đầu
  
      let searchQuery = "SELECT * FROM MarketPlace WHERE 1 = 1";
      let queryParams = [];
  
      if (query) {
        searchQuery += ` AND product_name LIKE ?`;
        queryParams.push(`%${query}%`);
      }
  
      if (minPrice) {
        searchQuery += ` AND product_price >= ?`;
        queryParams.push(minPrice);
      }
  
      if (maxPrice) {
        searchQuery += ` AND product_price <= ?`;
        queryParams.push(maxPrice);
      }
  
      if (category) {
        searchQuery += ` AND product_category = ?`;
        queryParams.push(category);
      }
  
      if (location) {
        searchQuery += ` AND product_location LIKE ?`;
        queryParams.push(`%${location}%`);
      }
  
      searchQuery += ` ORDER BY created_at DESC LIMIT ${itemsPerPage} OFFSET ${offset}`;
      
      // Không cần thêm LIMIT và OFFSET vào queryParams nữa
      const [results] = await db.execute(searchQuery, queryParams);
  
      return results;
    } catch (error) {
      console.error("Error searching products:", error);
      return [];
    }
  }
  
}
export { Marketplace };
