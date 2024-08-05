import db from "../../configs/database/database.config";

class ProfileMedia {
    constructor(data) {
        this.user_id = data.user_id;
        this.media_type = data.media_type;
        this.media_link = data.media_link;
        this.created_at = data.created_at || new Date();
    }

    async create() {
        try {
            const createProfileMediaQuery = "INSERT INTO ProfileMedia (user_id, media_type, media_link, created_at) VALUES (?, ?, ?, ?);"
            const [result] = await db.execute(createProfileMediaQuery, [
                this.user_id,
                this.media_type,
                this.media_link,
                this.created_at
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    static async getById(user_id) {
        try {
            const getProfileMediaByIdQuery = "SELECT * FROM ProfileMedia WHERE user_id = ?";
            const [result] = await db.execute(getProfileMediaByIdQuery, [
                user_id
            ]);
            return result;
        } catch (error) {
            return error;
        }
    }

    static async getAll() {
        try {
            const getAllProfileMediaQuery = "SELECT * FROM ProfileMedia";
            const [result] = await db.execute(getAllProfileMediaQuery);
            return result;
        } catch (error) {
            return error;
        }
    }

    async update() {
        try {
            const updateProfileMediaQuery = "UPDATE ProfileMedia SET media_type = ?, media_link = ? WHERE user_id = ?";
            const [result] = await db.execute(updateProfileMediaQuery, [
                this.media_type,
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
            const deleteProfileMediaQuery = "DELETE FROM ProfileMedia WHERE user_id = ?";
            const [result] = await db.execute(deleteProfileMediaQuery, [
                user_id
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }
}

export {
    ProfileMedia
}
