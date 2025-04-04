import db from "../../configs/database/database.config.js";

class UserFaceData {
    constructor(data) {
        this.user_id_encode = data.user_id_encode;
        this.media_link = data.media_link;
    }

    async create() {
        try {            
            const createUserFaceDataQuery = "INSERT INTO UserFaceData (user_id_encode, media_link) VALUES (?, ?);"
            const [result] = await db.execute(createUserFaceDataQuery, [
                this.user_id_encode,
                this.media_link
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    static async getById(user_id_encode) {
        try {
            const getUserFaceDataByIdQuery = "SELECT * FROM UserFaceData WHERE user_id_encode = ?";
            const [result] = await db.execute(getUserFaceDataByIdQuery, [
                user_id_encode
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


    static async delete(user_id_encode) {
        try {            
            const deleteUserFaceDataQuery = "DELETE FROM UserFaceData WHERE user_id_encode = ?";
            const [result] = await db.execute(deleteUserFaceDataQuery, [
                user_id_encode
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
