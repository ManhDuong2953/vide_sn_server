import db from "../../configs/database/database.config";
import { generateId } from "../../ultils/crypto";

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
    }

    // Tạo sản phẩm mới
    async create() {
        try {
            const idGenerator = generateId("mrk_plc_")
            const createQuery = `
                INSERT INTO Marketplace 
                (marketplace_product_id, seller_id, product_name, product_description, product_price, product_category, product_location, product_longitude, product_latitude, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
            `;
            const result = await db.execute(createQuery, [
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
            const getByIdQuery = "SELECT * FROM Marketplace WHERE marketplace_product_id = ?;";
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
            const updateQuery = `
                UPDATE Marketplace 
                SET product_name = ?, product_description = ?, product_price = ?, product_category = ?, product_location = ?, product_longitude = ?, product_latitude = ?
                WHERE marketplace_product_id = ?;
            `;
            const result = await db.execute(updateQuery, [
                this.product_name,
                this.product_description,
                this.product_price,
                this.product_category,
                this.product_location,
                this.product_longitude,
                this.product_latitude,
                this.marketplace_product_id,
            ]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error updating product:", error);
            return false;
        }
    }

    // Xóa sản phẩm
    static async delete(productId) {
        try {
            const deleteQuery = "DELETE FROM Marketplace WHERE marketplace_product_id = ?;";
            const result = await db.execute(deleteQuery, [productId]);
            return result.affectedRows > 0;
        } catch (error) {
            console.error("Error deleting product:", error);
            return false;
        }
    }

    // Tìm kiếm sản phẩm theo tên hoặc danh mục
    static async search(query) {
        try {
            const searchQuery = `
                SELECT * FROM Marketplace 
                WHERE product_name LIKE ? OR product_category LIKE ?;
            `;
            const likeQuery = `%${query}%`;
            const [results] = await db.execute(searchQuery, [likeQuery, likeQuery]);
            return results;
        } catch (error) {
            console.error("Error searching products:", error);
            return [];
        }
    }
}

export { Marketplace };
