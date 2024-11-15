import db from "../../configs/database/database.config.js";
import Post from "./post.model.js";

class UserPost extends Post {
  constructor(data) {
    super(data);
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
}

export default UserPost;
