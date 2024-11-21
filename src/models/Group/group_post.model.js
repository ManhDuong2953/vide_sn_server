import db from "../../configs/database/database.config";
import { generateId } from "../../ultils/crypto";
import GroupMember from "./group_member.model";

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

  static async getGroupPostByPostId(post_id) {
    try {
      const query = `SELECT * FROM GroupPost WHERE post_id = ?;`;
      const [result] = await db.execute(query, [post_id]);
      return result[0];
    } catch (error) {
      console.error(error);
    }
  }
  static async getGroupPostAcceptedByPostId(post_id) {    
    try {
      const query = `SELECT * FROM GroupPost WHERE post_id = ? and status = 1;`;
      const [result] = await db.execute(query, [post_id]);      
      return result[0];
    } catch (error) {
      console.error(error);
    }
  }

  

  static async getAllGroupPostJoined(user_id) {
    try {
      const listMyGroup = await GroupMember.getAllGroupByMemberID(user_id);
      const groupIds = listMyGroup.map((group) => group?.group_id);

      // Handle case where user is not in any group
      if (groupIds.length === 0) {
        return []; // Return an empty array if no groups are joined
      }

      // If `groupIds` is an array of IDs, use placeholders
      const placeholders = groupIds.map(() => "?").join(",");
      const query = `SELECT * FROM GroupPost WHERE status = 1 AND group_id IN (${placeholders})`;

      // Execute the query with the group IDs as parameters
      const [result] = await db.execute(query, groupIds);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  
  // Lấy bài đăng nhóm theo ID người đăng
  static async getGroupPostByUserId(member_id) {
    try {
      const query = `SELECT * FROM GroupPost WHERE member_id = ?;`;
      const [result] = await db.execute(query, [member_id]);
      return result;
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
