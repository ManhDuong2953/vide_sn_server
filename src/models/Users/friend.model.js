import db from "../../configs/database/database.config";
import { ProfileMedia } from "./profile_media.model";

class Friend {
  constructor(data) {
    this.requestor_id = data.requestor_id;
    this.receiver_id = data.receiver_id;
    this.relationship_status = data.relationship_status || 0;
  }

  async create() {
    try {
      const createFriendRequestQuery = `
                INSERT INTO Friend (requestor_id, receiver_id, relationship_status)
                VALUES (?, ?, ?);
            `;
      const [result] = await db.execute(createFriendRequestQuery, [
        this.requestor_id,
        this.receiver_id,
        this.relationship_status,
      ]);

      return result.affectedRows;
    } catch (error) {
      return error;
    }
  }

  static async updateStatus(requestor_id, receiver_id, relationship_status) {
    try {
      const updateStatusQuery = `
                UPDATE Friend 
                SET relationship_status = ?
                WHERE (requestor_id = ? AND receiver_id = ?)
                   OR (requestor_id = ? AND receiver_id = ?);
            `;
      const [result] = await db.execute(updateStatusQuery, [
        relationship_status,
        requestor_id,
        receiver_id,
        receiver_id, // Đảo ngược vị trí để kiểm tra quan hệ hai chiều
        requestor_id,
      ]);

      return result.affectedRows;
    } catch (error) {
      return error;
    }
  }

  static async getFriends(user_id) {
    try {
      const getFriendsQuery = `
        SELECT 
          u.user_id AS friend_id,
          u.user_name,
          u.user_nickname
        FROM Friend f
        JOIN User u 
          ON (u.user_id = f.requestor_id AND f.receiver_id = ?)
          OR (u.user_id = f.receiver_id AND f.requestor_id = ?)
        WHERE 
          f.relationship_status = 1
      `;

      const [result] = await db.execute(getFriendsQuery, [user_id, user_id]);

      if (result.length > 0) {
        // Sử dụng Promise.all để chờ tất cả các lời gọi bất đồng bộ hoàn thành
        const friendsWithAvatar = await Promise.all(
          result.map(async (row) => {
            const avatarLink = await ProfileMedia.getLatestAvatarById(
              row.friend_id
            );
            return {
              ...row,
              avatar: avatarLink, // Thêm thuộc tính avatar
            };
          })
        );
        return friendsWithAvatar;
      }
      return result;
    } catch (error) {
      console.error("Error fetching friends:", error);
      throw error;
    }
  }

  static async getIDFriends(user_id) {
    try {
      const getFriendsQuery = `
        SELECT 
          u.user_id 
        FROM Friend f
        JOIN User u 
          ON (u.user_id = f.requestor_id AND f.receiver_id = ?)
          OR (u.user_id = f.receiver_id AND f.requestor_id = ?)
        WHERE 
          f.relationship_status = 1
      `;

      const [result] = await db.execute(getFriendsQuery, [user_id, user_id]);
      return result;
    } catch (error) {
      console.error("Error fetching friends:", error);
      throw error;
    }
  }

  static async deleteFriend(requestor_id, receiver_id) {
    try {
      const deleteFriendQuery = `
                DELETE FROM Friend 
                WHERE (requestor_id = ? AND receiver_id = ?) OR (requestor_id = ? AND receiver_id = ?);
            `;
      const [result] = await db.execute(deleteFriendQuery, [
        requestor_id,
        receiver_id,
        receiver_id,
        requestor_id,
      ]);
      return result.affectedRows;
    } catch (error) {
      return error;
    }
  }

  // Lấy tất cả yêu cầu kết bạn dựa trên ID người nhận
  static async getAllRequestorsByReceiverId(receiver_id) {
    try {
      const getAllRequestorsQuery = `
                SELECT * FROM Friend 
                WHERE receiver_id = ? AND relationship_status = 0;
            `;
      const [result] = await db.execute(getAllRequestorsQuery, [receiver_id]);
      return result;
    } catch (error) {
      return error;
    }
  }

  // Kiểm tra xem lời mời kết bạn đã tồn tại chưa
  static async checkExistingRequest(requestor_id, receiver_id) {
    try {
      const checkRequestQuery = `
                SELECT * FROM Friend 
                WHERE (requestor_id = ? AND receiver_id = ?)
                   OR (requestor_id = ? AND receiver_id = ?);
            `;
      const [result] = await db.execute(checkRequestQuery, [
        requestor_id,
        receiver_id,
        receiver_id, // Đảo ngược vị trí để kiểm tra quan hệ hai chiều
        requestor_id,
      ]);

      return result[0] ?? []; // Trả về true nếu tồn tại yêu cầu
    } catch (error) {
      return error;
    }
  }

  // Kiểm tra số bạn chung
  static async getMutualFriend(requestor_id, receiver_id) {
    try {
      const checkRequestQuery = `
      SELECT COUNT(*) AS mutual_friend_count
      FROM Friend f1
      JOIN Friend f2 ON f1.receiver_id = f2.receiver_id
      WHERE f1.requestor_id = ? AND f2.requestor_id = ?
        AND f1.receiver_id NOT IN (?, ?);
    `;

      // Chạy truy vấn với các tham số
      const [result] = await db.execute(checkRequestQuery, [
        requestor_id, // Người yêu cầu
        receiver_id, // Người nhận
        requestor_id, // Loại bỏ chính requestor
        receiver_id, // Loại bỏ chính receiver
      ]);
      // Trả về kết quả là số lượng bạn chung
      return result[0];
    } catch (error) {
      console.error("Error in getMutualFriend:", error);
      throw error; // Nên throw lỗi để quản lý tại nơi gọi hàm
    }
  }

  // Lấy sinh nhật bạn bè
  static async getBobFriends(user_id) {
    try {
      const dobFriendQuery = `
                 SELECT u.user_id, u.user_name, u.user_nickname, p.date_of_birth
                      FROM User u
                      JOIN UserProfile p ON u.user_id = p.user_id
                      JOIN Friend f ON (f.requestor_id = u.user_id OR f.receiver_id = u.user_id)
                      WHERE (f.requestor_id = ? OR f.receiver_id = ?)
                        AND f.relationship_status = 1
                        AND DAY(p.date_of_birth) = DAY(CURDATE())
                        AND MONTH(p.date_of_birth) = MONTH(CURDATE())
                        AND u.user_id <> ?;
              `;
      const [result] = await db.execute(dobFriendQuery, [
        user_id,
        user_id,
        user_id,
      ]);

      return result ?? []; // Trả về true nếu tồn tại yêu cầu
    } catch (error) {
      return error;
    }
  }

  // Lấy danh sách bạn bè gợi ý (chưa là bạn bè nhưng có nhiều bạn chung)
  static async getSuggestions(user_id) {
    try {
      // Truy vấn đầu tiên: Lấy bạn bè có nhiều bạn chung nhưng chưa là bạn của người dùng
      const getSuggestionsQuery1 = `
      SELECT u.user_id, u.user_name, COUNT(f2.receiver_id) AS mutual_friends_count
      FROM Friend f1
      JOIN Friend f2 ON f1.receiver_id = f2.requestor_id
      JOIN User u ON f2.receiver_id = u.user_id
      WHERE f1.requestor_id = ?
        AND f1.receiver_id <> ?
        AND f2.receiver_id <> ?
        AND NOT EXISTS (
          SELECT 1 FROM Friend f3 WHERE f3.requestor_id = ? AND f3.receiver_id = u.user_id
          UNION
          SELECT 1 FROM Friend f3 WHERE f3.requestor_id = u.user_id AND f3.receiver_id = ?
        )
      GROUP BY u.user_id, u.user_name
      HAVING mutual_friends_count > 0
      ORDER BY mutual_friends_count DESC
      LIMIT 10;
    `;

      // Truy vấn thứ hai: Hiển thị 10 người có nhiều bạn nhất mà chưa là bạn của người dùng
      const getSuggestionsQuery2 = `
      SELECT u.user_id, u.user_name, COUNT(f.requestor_id) AS total_friends_count
      FROM Friend f
      JOIN User u ON f.receiver_id = u.user_id
      WHERE u.user_id <> ?
        AND NOT EXISTS (
          SELECT 1 FROM Friend f3 WHERE f3.requestor_id = ? AND f3.receiver_id = u.user_id
          UNION
          SELECT 1 FROM Friend f3 WHERE f3.requestor_id = u.user_id AND f3.receiver_id = ?
        )
      GROUP BY u.user_id, u.user_name
      ORDER BY total_friends_count DESC
      LIMIT 10;
    `;

      // Chạy truy vấn đầu tiên
      const [result1] = await db.execute(getSuggestionsQuery1, [
        user_id,
        user_id,
        user_id,
        user_id,
        user_id,
      ]);

      // Nếu truy vấn đầu tiên không có kết quả, chạy truy vấn thứ hai
      if (result1.length > 0) {
        return result1;
      } else {
        const [result2] = await db.execute(getSuggestionsQuery2, [
          user_id,
          user_id,
          user_id,
        ]);
        return result2.length > 0 ? result2 : [];
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      throw error;
    }
  }
}
export default Friend;
