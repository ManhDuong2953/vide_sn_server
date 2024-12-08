import db from "../../configs/database/database.config";
import { cleanString } from "../../ultils/create_nickname";
import {
  generateId,
  generateRandomString,
  hashString,
  compareHash,
} from "../../ultils/crypto";

class Users {
  constructor(data) {
    this.user_id = data.user_id;
    this.user_name = data.user_name;
    this.user_nickname = data.user_nickname;
    this.user_email = data.user_email;
    this.user_gender = data.user_gender;
    this.user_password = data.user_password;
    this.user_status = data.user_status || 1;
    this.type_account = data.type_account;
    this.created_at = data.created_at || Date.now();
    this.user_role = data.user_role || 0;
  }

  async create() {
    try {
      const user_id = this.user_id ?? generateId("uid_");
      const createUserQuery =
        "INSERT INTO User (user_id, user_name, user_nickname, user_email, user_password, user_status, user_gender, user_role, type_account) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);";
      const [result] = await db.execute(createUserQuery, [
        user_id,
        this.user_name,
        cleanString(
          this.user_name.toLowerCase() + "_" + generateRandomString(4)
        ),
        this.user_email,
        await hashString(this.user_password),
        this.user_status,
        this.user_gender || "other",
        this.user_role,
        this.type_account || "register",
      ]);
      return result.affectedRows ? user_id : null;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  static async isExistEmail(email) {
    try {
      const checkExistEmailQuery = "SELECT * FROM User WHERE user_email = ?";
      const [result] = await db.execute(checkExistEmailQuery, [email]);
      return result.length > 0;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }

  static async getById(user_id) {
    try {
      const getUserByIdQuery =
        "SELECT user_id, user_name, user_nickname, user_email, user_status, user_gender, created_at, user_role, type_account  FROM User  WHERE user_id = ?";
      const [result] = await db.execute(getUserByIdQuery, [user_id]);
      return result[0];
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  static async getIdByEmail(email, type_account) {
    try {
      const getUserByIdQuery =
        "SELECT user_id FROM User  WHERE user_email = ? AND type_account = ?";
      const [result] = await db.execute(getUserByIdQuery, [email, type_account]);
      return result[0];
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  static async searchByNameOrNickName(keyword) {
    try {
      console.log(keyword);

      const getUserByIdQuery =
        "SELECT user_id, user_name, user_nickname, user_email, user_status, user_gender, created_at, user_role, type_account FROM User WHERE user_name LIKE ? OR user_nickname LIKE ?";
      const searchParam = `%${keyword}%`;

      const [result] = await db.execute(getUserByIdQuery, [
        searchParam,
        searchParam,
      ]);
      return result;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  static async getAll() {
    try {
      const getAllUsersQuery = "SELECT * FROM User";
      const [result] = await db.execute(getAllUsersQuery);
      return result;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  async update() {
    try {
      let updateUserQuery = "UPDATE User SET";
      let params = [];
      let updates = [];

      if (this.user_name) {
        updates.push(" user_name = ?");
        params.push(this.user_name ?? null);
      }
      if (this.user_nickname) {
        updates.push(" user_nickname = ?");
        params.push(this.user_nickname ?? null);
      }
      if (this.user_email) {
        updates.push(" user_email = ?");
        params.push(this.user_email ?? null);
      }

      if (this.user_gender) {
        updates.push(" user_gender = ?");
        params.push(this.user_gender ?? null);
      }

      if (updates.length === 0) {
        throw new Error("Không có trường nào được cập nhật.");
      }

      updateUserQuery += updates.join(",");
      updateUserQuery += " WHERE user_id = ?";
      params.push(this.user_id ?? null);

      const [result] = await db.execute(updateUserQuery, params);
      return result.affectedRows;
    } catch (error) {
      console.error("Error updating user:", error);
      return error;
    }
  }

  async updatePassword(newPassword) {
    try {
      const updatePasswordQuery =
        "UPDATE User SET user_password = ? WHERE user_email = ?";
      const [result] = await db.execute(updatePasswordQuery, [
        await hashString(newPassword),
        this.user_email,
      ]);
      return result.affectedRows;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  static async delete(user_id) {
    try {
      const deleteUserQuery = "DELETE FROM User WHERE user_id = ?";
      const [result] = await db.execute(deleteUserQuery, [user_id]);
      return result.affectedRows;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  // Đăng nhập thường
  static async login(email, password, type_account) {
    try {
      const getUserQuery =
        "SELECT * FROM User WHERE user_email = ? AND type_account = ?";
      const [result] = await db.execute(getUserQuery, [email, type_account]);
      if (result.length === 0) {
        return false;
      }

      const user = result[0];
      const isPasswordValid = compareHash(password, user.user_password);
      return isPasswordValid ? user : false;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }

  //Dánh cho đăng nhập khuôn mặt
  static async loginWithUserID(userID, password, type_account) {
    try {
      const getUserQuery =
        "SELECT * FROM User WHERE user_id = ? AND type_account = ?";
      const [result] = await db.execute(getUserQuery, [userID, type_account]);
      if (result.length === 0) {
        return false;
      }

      const user = result[0];
      const isPasswordValid = compareHash(password, user.user_password);
      return isPasswordValid ? user : false;
    } catch (error) {
      console.log(error.message);
      return error;
    }
  }
}

export { Users };
