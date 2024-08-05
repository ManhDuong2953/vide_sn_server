import db from "../../configs/database/database.config";

class UserFaceData {
    constructor(data) {
        this.user_id = data.user_id;
        this.media_link = data.media_link;
    }

    async create() {
        try {
            const createUserFaceDataQuery = "INSERT INTO UserFaceData (user_id, media_link) VALUES (?, ?);"
            const [result] = await db.execute(createUserFaceDataQuery, [
                this.user_id,
                this.media_link
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    static async getById(user_id) {
        try {
            const getUserFaceDataByIdQuery = "SELECT * FROM UserFaceData WHERE user_id = ?";
            const [result] = await db.execute(getUserFaceDataByIdQuery, [
                user_id
            ]);
            return result;
        } catch (error) {
            return error;
        }
    }

    static async getAll() {
        try {
            const getAllUserFaceDataQuery = "SELECT * FROM UserFaceData";
            const [result] = await db.execute(getAllUserFaceDataQuery);
            return result;
        } catch (error) {
            return error;
        }
    }

    async update() {
        try {
            const updateUserFaceDataQuery = "UPDATE UserFaceData SET media_link = ? WHERE user_id = ?";
            const [result] = await db.execute(updateUserFaceDataQuery, [
                this.media_link,
                this.user_id
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    static async delete(user_id) {
        try {
            const deleteUserFaceDataQuery = "DELETE FROM UserFaceData WHERE user_id = ?";
            const [result] = await db.execute(deleteUserFaceDataQuery, [
                user_id
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }
}

export {
    UserFaceData
}
