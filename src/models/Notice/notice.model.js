import db from "../../configs/database/database.config";
import { generateId } from "../../ultils/crypto";

class Notice {
  constructor(data) {
    this.notice_id = data.notice_id;
    this.sender_id = data.sender_id;
    this.receiver_id = data.receiver_id;
    this.content = data.content;
    this.link_notice = data.link_notice || null;
    this.created_at = data.created_at;
  }

  // Thêm thông báo mới
  async create() {
    try {
      const id = generateId("notice_");
      const query = `
        INSERT INTO Notifications (notice_id, sender_id, receiver_id, content, link_notice, created_at)
        VALUES (?, ?, ?, ?, ?, NOW());
      `;
      const [result] = await db.execute(query, [
        id,
        this.sender_id,
        this.receiver_id,
        this.content,
        this.link_notice,
      ]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Lỗi khi tạo thông báo:", error);
      throw error;
    }
  }

  // Xoá thông báo
  static async deleteById(notice_id) {
    try {
      const query = `DELETE FROM Notifications WHERE notice_id = ?;`;
      const [result] = await db.execute(query, [notice_id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Lỗi khi xóa thông báo:", error);
      throw error;
    }
  }
  static async deleteAllNoticeByUser(receiver_id) {
    try {
      const query = `DELETE FROM Notifications WHERE receiver_id = ?;`;
      const [result] = await db.execute(query, [receiver_id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Lỗi khi xóa thông báo:", error);
      throw error;
    }
  }

  static async deleteAllNoticeCurrentByUser(receiver_id) {
    try {
      const query = `UPDATE Notifications SET is_seen = 1 WHERE receiver_id = ?`;
      const [result] = await db.execute(query, [receiver_id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Lỗi khi xóa thông báo:", error);
      throw error;
    }
  }

  // Lấy tất cả thông báo của một người dùng
  static async getAllByUserId(receiver_id) {
    try {
      const query = `
        SELECT * FROM Notifications
        WHERE receiver_id = ?
        ORDER BY created_at DESC;
      `;
      const [results] = await db.execute(query, [receiver_id]);
      return results;
    } catch (error) {
      console.error("Lỗi khi lấy danh sách thông báo:", error);
      throw error;
    }
  }

  // Lấy thông tin chi tiết của một thông báo
  static async getById(notice_id) {
    try {
      const query = `SELECT * FROM Notifications WHERE notice_id = ?;`;
      const [result] = await db.execute(query, [notice_id]);
      return result[0];
    } catch (error) {
      console.error("Lỗi khi lấy thông tin chi tiết thông báo:", error);
      throw error;
    }
  }
}

export default Notice;
