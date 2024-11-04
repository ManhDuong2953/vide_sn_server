import db from "../../configs/database/database.config.js";
import { generateId } from "../../ultils/crypto.js";
import Friend from "../Users/friend.model.js";

class Story {
  constructor(data) {
    this.story_id = data.story_id;
    this.user_id = data.user_id;
    this.media_link = data.media_link;
    this.audio_link = data.audio_link;
    this.story_privacy = data.story_privacy;
    this.heart_quantity = data.heart_quantity;
  }
  async create() {
    const story_id = this.story_id ?? generateId("story_");
    try {
      const createstoryRequestQuery = `
        INSERT INTO story (story_id, user_id, media_link, audio_link,  story_privacy)
        VALUES (?, ?, ?, ?, ?);
      `;
      const [result] = await db.execute(createstoryRequestQuery, [
        story_id,
        this.user_id,
        this.media_link,
        this.audio_link,
        this.story_privacy,
      ]);

      if (result.affectedRows > 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Lỗi khi thực hiện câu lệnh SQL:", error);
      throw error;
    }
  }

  static async getAllStory(user_id) {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const formattedDate = twentyFourHoursAgo
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const [listFriends] = await Friend.getFriends(user_id);
    console.log(listFriends);

    const query = `
      SELECT * FROM story 
      WHERE (story_privacy = 1 AND created_at >= ?)
         OR (user_id = ? AND created_at >= ?)
      ORDER BY created_at DESC;
    `;

    try {
      const [results] = await db.execute(query, [
        formattedDate,
        user_id,
        formattedDate,
      ]);
      return results;
    } catch (error) {
      console.error("Error fetching stories:", error);
      throw error;
    }
  }
  static async getStoryById(id_story) {
    const query = `
      SELECT * FROM story where story_id = ?
    `;
    try {
      const [results] = await db.execute(query, [id_story]);
      return results[0];
    } catch (error) {
      console.error("Error fetching stories:", error);
      throw error;
    }
  }

  // Lấy tất cả story của user_id trong vòng 24 giờ
  static async getStoriesByUserId(user_id) {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const formattedDate = twentyFourHoursAgo
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const query = `
    SELECT * FROM story 
    WHERE user_id = ? AND created_at >= ?
    ORDER BY created_at DESC;
  `;

    try {
      const [results] = await db.execute(query, [user_id, formattedDate]);
      return results;
    } catch (error) {
      console.error("Error fetching user stories:", error);
      throw error;
    }
  }

  static async deleteStory(story_id) {
    const query = `
      DELETE FROM story
      WHERE story_id =?;
    `;

    try {
      const [result] = await db.execute(query, [story_id]);

      if (result.affectedRows > 0) {
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error deleting story:", error);
      throw error;
    }
  }
  // Hàm thả tim cho story (tăng heart_quantity)
  static async likeStory(story_id) {
    const updateHeartQuery = `
      UPDATE Story
      SET heart_quantity = heart_quantity + 1
      WHERE story_id = ?;
    `;

    try {
      const [result] = await db.execute(updateHeartQuery, [story_id]);

      if (result.affectedRows > 0) {
        return { success: true, message: "Thả tim thành công!" };
      }
      return { success: false, message: "Không tìm thấy story." };
    } catch (error) {
      console.error("Lỗi khi thả tim:", error);
      throw error;
    }
  }
}

export default Story;
