import db from "../../configs/database/database.config.js";
import { generateId } from "../../ultils/crypto.js";

class SubPostComment {
  constructor(data) {
    this.sub_comment_id = data.sub_comment_id ?? generateId("sub_cmt_"); // Generate ID nếu không có
    this.comment_id = data.comment_id || null; // Liên kết tới comment gốc
    this.replying_user_id = data.replying_user_id || null; // Người bình luận cấp 2
    this.comment_text = data.comment_text || null; // Nội dung bình luận
    this.media_link = data.media_link || null; // Đường dẫn media (nếu có)
    this.media_type = data.media_type || null; // Đường dẫn media (nếu có)
    this.count_comment_heart = data.count_comment_heart || null;
  }

  // Tạo bình luận cấp 2 mới
  async create() {
    const sub_comment_id = this.sub_comment_id ?? generateId("sub_cmt_");
    try {
      const createSubCommentQuery = `
        INSERT INTO SubPostComment (sub_comment_id, comment_id, replying_user_id, comment_text, media_link, media_type)
        VALUES (?, ?, ?, ?, ?, ?);
      `;
      const [result] = await db.execute(createSubCommentQuery, [
        sub_comment_id,
        this.comment_id,
        this.replying_user_id,
        this.comment_text,
        this.media_link,
        this.media_type,
      ]);

      // Kiểm tra xem chèn có thành công không
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Lỗi khi tạo bình luận cấp 2:", error);
      throw error;
    }
  }

  // Lấy danh sách các bình luận cấp 2 dựa trên comment_id
  static async getByCommentId(comment_id) {
    try {
      const query = `
        SELECT * FROM SubPostComment WHERE comment_id = ? ORDER BY created_at ASC;
      `;
      const [rows] = await db.execute(query, [comment_id]);
      return rows;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bình luận cấp 2:", error);
      throw error;
    }
  }

  static async getBySubCommentId(sub_comment_id) {
    try {
      const query = `
        SELECT * FROM SubPostComment WHERE sub_comment_id = ? ORDER BY created_at ASC;
      `;
      const [rows] = await db.execute(query, [sub_comment_id]);
      return rows;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bình luận cấp 2:", error);
      throw error;
    }
  }
  
  static async updateSubCommentHeart(comment_id) {
    try {
      const query =
        "UPDATE SubPostComment SET count_comment_heart = count_comment_heart + 1 WHERE comment_id = ?";
      const [result] = await db.execute(query, [comment_id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  static async deleteSubComment(sub_comment_id) {
    try {
      const query =
        "DELETE FROM SubPostComment WHERE sub_comment_id = ?";
      const [result] = await db.execute(query, [sub_comment_id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }
}

export default SubPostComment;
