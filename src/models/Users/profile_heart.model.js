import db from "../../configs/database/database.config";

class ProfileHeart {
    constructor(data) {
        this.user_id = data.user_id;
        this.hearted_user_id = data.hearted_user_id;
    }

    async create() {
        try {
            const createHeartQuery = `
                INSERT INTO ProfileHeart (user_id, hearted_user_id)
                VALUES (?, ?);
            `;
            const [result] = await db.execute(createHeartQuery, [
                this.user_id,
                this.hearted_user_id
            ]);

            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    static async getByUserId(user_id) {
        try {
            const getHeartsQuery = `
                SELECT user_id, hearted_user_id, created_at 
                FROM ProfileHeart 
                WHERE user_id = ?;
            `;
            const [result] = await db.execute(getHeartsQuery, [user_id]);
            return result;
        } catch (error) {
            return error;
        }
    }

    static async removeHeart(user_id, hearted_user_id) {
        try {
            const removeHeartQuery = `
                DELETE FROM ProfileHeart 
                WHERE user_id = ? AND hearted_user_id = ?;
            `;
            const [result] = await db.execute(removeHeartQuery, [user_id, hearted_user_id]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }
}

export default ProfileHeart;
