import db from "../../configs/database/database.config.js";

class PostReact {
  constructor(data) {
    this.post_id = data.post_id;
    this.user_id = data.user_id;
    this.react = data.react;
  }

  async create() {
    try {
      const createReactPost = `
        INSERT INTO PostReact (post_id, user_id, react)
        VALUES (?, ?, ?);
      `;
      const [result] = await db.execute(createReactPost, [
        this.post_id,
        this.user_id,
        this.react,
      ]);

      if (result.affectedRows > 0) {
        return true;
      }
    } catch (error) {
      console.error("Lỗi khi thực hiện câu lệnh SQL:", error);
      throw error;
    }
  }
  static async getAllReactByPost(post_id) {
    const query = `
    SELECT * FROM PostReact WHERE post_id = ?
  `;

    try {
      const [results] = await db.execute(query, [post_id]); // Truyền my_id vào 2 lần

      return results;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }
  static async deleteReact(user_id, post_id) {
    const query = `
    DELETE FROM PostReact WHERE user_id = ? AND post_id = ?
  `;

    try {
      const [results] = await db.execute(query, [user_id, post_id]); // Truyền my_id vào 2 lần

      return results.affectedRows > 0;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  }
}

export default PostReact;
