import db from "../../configs/database/database.config.js";
import Post from "./post.model.js";

class UserPost extends Post {
  constructor(data) {
    super(data);
    this.id_user_post = data.id_user_post;
    this.post_id = data.post_id;
    this.user_id = data.user_id;
  }

  async create() {
    try {
      const createPostRequestQuery = `
        INSERT INTO UserPost (post_id, user_id)
        VALUES (?, ?);
      `;
      const [result] = await db.execute(createPostRequestQuery, [
        this.post_id,
        this.user_id,
      ]);

      // Gán post_id từ kết quả của câu lệnh INSERT
      if (result.affectedRows > 0) {
        return true; // Trả về true nếu đã chèn thành công
      }
      return false; // Trả về false nếu không có dòng nào bị ảnh hưởng
    } catch (error) {
      console.error("Lỗi khi thực hiện câu lệnh SQL:", error);
      throw error;
    }
  }
  static async getAllPostByUserId(userId) {
    try {
      const query = `SELECT 
                          p.post_id
                      FROM 
                          Post p
                      INNER JOIN 
                          UserPost u ON p.post_id = u.post_id
                      WHERE 
                          u.user_id = ?
                      AND NOT EXISTS (
                              SELECT 1
                              FROM GroupPost gp
                              WHERE gp.post_id = p.post_id
                          )
                      ORDER BY u.id_user_post DESC    
                          `;
      const [result] = await db.execute(query, [userId]);

      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default UserPost;
