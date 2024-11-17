import db from "../../configs/database/database.config";
import { generateId } from "../../ultils/crypto";

class GroupPost {
  constructor(data) {
    this.group_id = data.group_id;
    this.post_id = data.post_id;
    this.member_id = data.member_id;
    this.status = data.status;
  }

  // Phương thức tạo mới GroupPost
  async create() {
    const group_post_id = generateId("gpost_");
    try {
      const query = `
        INSERT INTO GroupPost (group_post_id, group_id, post_id, member_id, status)
        VALUES (?, ?, ?, ?, ?);
      `;

      const [result] = await db.execute(query, [
        group_post_id,
        this.group_id,
        this.post_id,
        this.member_id,
        this.status,
      ]);

      return result.affectedRows > 0 ? group_post_id : false;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  // Lấy tất cả các bài đăng nhóm
  static async getAllGroupPostsAccepted(group_id) {
    try {
      const query = `SELECT * FROM GroupPost WHERE status = 1 and group_id = ?;`;
      const [result] = await db.execute(query, [group_id]);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllGroupPostsUnapproved(group_id) {
    try {
      const query = `SELECT * FROM GroupPost WHERE status = 0 and group_id = ?;`;
      const [result] = await db.execute(query, [group_id]);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  // Lấy bài đăng nhóm theo ID
  static async getGroupPostById(group_post_id) {
    try {
      const query = `SELECT * FROM GroupPost WHERE group_post_id = ?;`;
      const [result] = await db.execute(query, [group_post_id]);
      return result[0];
    } catch (error) {
      console.error(error);
    }
  }

  // Chấp nhận bài đăng nhóm
  static async acceptGroupPost(group_post_id) {
    const query = `
    UPDATE GroupPost
    SET status = 1
    WHERE group_post_id = ?;
  `;

    try {
      const [result] = await db.execute(query, [group_post_id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error in acceptGroupPost:", error);
      return false;
    }
  }

  // Xóa bài đăng nhóm
  static async deleteGroupPost(group_post_id) {
    const query = `
    DELETE FROM GroupPost
    WHERE group_post_id = ?;
  `;

    try {
      const [result] = await db.execute(query, [group_post_id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error in deleteGroupPost:", error);
      return false;
    }
  }
}

export default GroupPost;
