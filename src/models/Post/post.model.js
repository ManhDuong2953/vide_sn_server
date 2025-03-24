import db from "../../configs/database/database.config.js";
import { generateId } from "../../ultils/crypto.js";
import GroupPost from "../Group/group_post.model.js";

class Post {
  constructor(data) {
    this.post_id = data.post_id;
    this.user_id = data.user_id;
    this.post_privacy = data.post_privacy;
    this.post_text = data.post_text || null; // Nếu không có text, mặc định là null
    this.react_emoji = data.react_emoji || null; // Mặc định null nếu không có emoji
  }

  async create() {
    const post_id = this.post_id ?? generateId("post_"); // Tạo ID nếu chưa có
    try {
      const createPostRequestQuery = `
        INSERT INTO Post (post_id, user_id, post_privacy, post_text, react_emoji)
        VALUES (?, ?, ?, ?, ?);
      `;
      const [result] = await db.execute(createPostRequestQuery, [
        post_id,
        this.user_id,
        this.post_privacy,
        this.post_text,
        this.react_emoji,
      ]);

      // Gán post_id từ kết quả của câu lệnh INSERT
      if (result.affectedRows > 0) {
        this.post_id = post_id; // Cập nhật post_id cho đối tượng
        return true; // Trả về true nếu đã chèn thành công
      }
      return false; // Trả về false nếu không có dòng nào bị ảnh hưởng
    } catch (error) {
      console.error("Lỗi khi thực hiện câu lệnh SQL:", error);
      throw error;
    }
  }
  async update(user_id) {
    try {
      const query = `
        UPDATE Post 
        SET post_privacy = ?, post_text = ?, react_emoji = ? 
        WHERE post_id = ? and user_id = ?;
      `;
      const [result] = await db.execute(query, [
        this.post_privacy,
        this.post_text,
        this.react_emoji,
        this.post_id,
        user_id,
      ]);

      return result.affectedRows > 0;
    } catch (error) {
      console.error("Lỗi khi cập nhật bài viết:", error);
      throw error;
    }
  }
  static async getAllPosts(my_id) {
    const query = `
      SELECT 
          p.post_id, 
          p.post_text, 
          p.post_privacy, 
          p.react_emoji,
          u.user_id, 
          u.user_name, 
          up.media_link AS avatar,
          p.created_at 
      FROM Post p
      -- Thông tin người đăng bài
      JOIN User u ON p.user_id = u.user_id
      -- Lấy avatar mới nhất
      LEFT JOIN (
          SELECT 
              user_id, 
              media_link
          FROM ProfileMedia
          WHERE media_type = 'avatar' 
              AND (user_id, created_at) IN (
                  SELECT user_id, MAX(created_at) 
                  FROM ProfileMedia
                  WHERE media_type = 'avatar'
                  GROUP BY user_id
              )
      ) up ON u.user_id = up.user_id
      WHERE (
          -- Bài viết của chính user
          p.user_id = ?
          -- Bài viết của bạn bè
          OR EXISTS (
              SELECT 1 FROM Friend f
              WHERE (f.requestor_id = ? AND f.receiver_id = p.user_id AND f.relationship_status = 1) 
                 OR (f.receiver_id = ? AND f.requestor_id = p.user_id AND f.relationship_status = 1)
          )
          -- Bài viết từ nhóm đã tham gia
          OR EXISTS (
              SELECT 1 FROM GroupPost gp
              JOIN GroupMember gm ON gp.group_id = gm.group_id
              WHERE gp.post_id = p.post_id AND gm.member_id = ?
          )
      )
      ORDER BY p.created_at DESC;
    `;

    try {
      const [results] = await db.execute(query, [my_id, my_id, my_id, my_id]);
      return results;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }

  static async getPostById(post_id) {
    const query = `
      SELECT 
        p.post_id, 
        p.post_text, 
        p.post_privacy, 
        p.react_emoji,
        u.user_id, 
        u.user_name, 
        up.media_link AS avatar,
        p.created_at 
      FROM 
        Post p
      JOIN 
        User u ON p.user_id = u.user_id
      LEFT JOIN (
        SELECT 
          user_id, 
          media_link
        FROM 
          ProfileMedia
        WHERE 
          media_type = 'avatar'
          AND (user_id, created_at) IN (
              SELECT user_id, MAX(created_at) 
              FROM ProfileMedia
              WHERE media_type = 'avatar'
              GROUP BY user_id
          )
      ) up ON u.user_id = up.user_id
      WHERE 
        p.post_id = ?;
    `;

    try {
      const [result] = await db.execute(query, [post_id]);
      return result[0] || null;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  }

  static async getOwnerPostById(post_id) {
    const query = `
      SELECT 
       user_id
      FROM 
        Post
      WHERE 
      post_id = ?;
    `;

    try {
      const [result] = await db.execute(query, [post_id]);
      return result[0] || null;
    } catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  }

  static async searchPost(keyword) {
    const query = `SELECT * FROM Post WHERE post_text LIKE ?`;
    try {
      const textConvert = `%${keyword}%`;
      const [result] = await db.execute(query, [textConvert]);
      return result;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }

  static async deleteById(post_id) {
    const query = `DELETE FROM Post WHERE post_id = ?`;
    try {
      const [result] = await db.execute(query, [post_id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw error;
    }
  }
}

export default Post;
