import db from "../../configs/database/database.config";
import { cleanString } from "../../ultils/create_nickname";
import { generateId, generateRandomString, hashString, compareHash } from "../../ultils/crypto";

class Users {
    constructor(data) {
        this.user_id = data.user_id;
        this.user_name = data.user_name;
        this.user_nickname = data.user_nickname;
        this.user_email = data.user_email;
        this.user_gender = data.user_gender;
        this.user_password = data.user_password;
        this.user_status = data.user_status || 1;
        this.created_at = data.created_at || Date.now();
        this.user_role = data.user_role || 0;
    }

    async create() {
        try {
            const user_id = this.user_id ?? generateId("uid_");
            const createUserQuery = "INSERT INTO User (user_id, user_name, user_nickname, user_email, user_password, user_status, user_gender, user_role) VALUES (?, ?, ?, ?, ?, ?, ?, ?);"
            const [result] = await db.execute(createUserQuery, [
                user_id,
                this.user_name,
                cleanString(this.user_name.toLowerCase() + "_" + generateRandomString(4)),
                this.user_email,
                await hashString(this.user_password),
                this.user_status,
                this.user_gender || "other",
                this.user_role,
            ]);
            return result.affectedRows ? user_id : null;
        } catch (error) {
            return error;
        }
    }

    static async isExistEmail(email) {
        try {
            const checkExistEmailQuery = "SELECT * FROM User WHERE user_email = ?";
            const [result] = await db.execute(checkExistEmailQuery, [
                email
            ]);
            return result.length > 0;
        } catch (error) {
            return false;
        }
    }

    static async getById(user_id) {
        try {
            const getUserByIdQuery = "SELECT user_id, user_name, user_nickname, user_email, user_status, user_gender, created_at, user_role  FROM User WHERE user_id = ?";
            const [result] = await db.execute(getUserByIdQuery, [
                user_id
            ]);
            return result[0];
        } catch (error) {
            return error;
        }
    }

    static async getAll() {
        try {
            const getAllUsersQuery = "SELECT * FROM User";
            const [result] = await db.execute(getAllUsersQuery);
            return result;
        } catch (error) {
            return error;
        }
    }

    async update() {
        try {
            const updateUserQuery = "UPDATE User SET user_name = ?, user_nickname = ?, user_email = ?, user_status = ?, user_gender = ?, user_role = ? WHERE user_id = ?";
            const [result] = await db.execute(updateUserQuery, [
                this.user_name,
                this.user_nickname,
                this.user_email,
                this.user_status,
                this.user_gender,
                this.user_role,
                this.user_id
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    async updatePassword(newPassword) {
        try {
            const updatePasswordQuery = "UPDATE User SET user_password = ? WHERE user_email = ?";
            const [result] = await db.execute(updatePasswordQuery, [
                await hashString(newPassword),
                this.user_email
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    static async delete(user_id) {
        try {
            const deleteUserQuery = "DELETE FROM User WHERE user_id = ?";
            const [result] = await db.execute(deleteUserQuery, [
                user_id
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    static async login(email, password) {
        try {
            const getUserQuery = "SELECT * FROM User WHERE user_email = ?";
            const [result] = await db.execute(getUserQuery, [
                email
            ]);
            if (result.length === 0) {
                return false;
            }

            const user = result[0];
            const isPasswordValid = compareHash(password, user.user_password);
            return isPasswordValid ? user : false;
        } catch (error) {
            return error;
        }
    }
}

export {
    Users
}
