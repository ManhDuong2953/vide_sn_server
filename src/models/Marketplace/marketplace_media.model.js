import db from "../../configs/database/database.config.js";

class MarketplaceMedia {
  constructor(data) {
    this.marketplace_product_id = data.marketplace_product_id;
    this.media_link = data.media_link;
  }

  // Phương thức thêm media mới
  async create() {
    try {
      const insertQuery = `
                INSERT INTO MarketplaceMedia (marketplace_product_id, media_link)
                VALUES (?, ?);
            `;
      const [result] = await db.execute(insertQuery, [
        this.marketplace_product_id,
        this.media_link,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error creating media:", error);
      return false;
    }
  }

  // Lấy tất cả media theo product_id
  static async getAllByProductId(productId) {
    try {
      const selectQuery = `
                SELECT * FROM MarketplaceMedia
                WHERE marketplace_product_id = ?;
            `;
      const [result] = await db.execute(selectQuery, [productId]);
      return result;
    } catch (error) {
      console.error("Error fetching media:", error);
      return [];
    }
  }

  // Xóa media theo link
  async deleteByLink() {
    try {
      const deleteQuery = `
                DELETE FROM MarketplaceMedia
                WHERE marketplace_product_id = ? AND media_link = ?;
            `;
      const [result] = await db.execute(deleteQuery, [
        this.marketplace_product_id,
        this.media_link,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting media:", error);
      return false;
    }
  }

  // Xóa toàn bộ media theo product_id
  static async deleteAllByProductId(productId) {
    try {
      const deleteQuery = `
                DELETE FROM MarketplaceMedia
                WHERE marketplace_product_id = ?;
            `;
      const [result] = await db.execute(deleteQuery, [productId]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting all media by product ID:", error);
      return false;
    }
  }
}

export { MarketplaceMedia };
