import db from "../../configs/database/database.config";

class UserSetting {
    constructor(data) {
        this.user_id = data.user_id;
        this.post_privacy = data.post_privacy || 1;
        this.story_privacy = data.story_privacy || 1;
        this.dark_theme = data.dark_theme || 1;
    }

    async create() {
        try {
            const createUserSettingQuery = "INSERT INTO UserSetting (user_id, post_privacy, story_privacy, dark_theme) VALUES (?, ?, ?, ?);"
            const [result] = await db.execute(createUserSettingQuery, [
                this.user_id,
                this.post_privacy,
                this.story_privacy,
                this.dark_theme
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    static async getById(user_id) {
        try {
            const getUserSettingByIdQuery = "SELECT * FROM UserSetting WHERE user_id = ?";
            const [result] = await db.execute(getUserSettingByIdQuery, [
                user_id
            ]);
            return result[0];
        } catch (error) {
            return error;
        }
    }

    static async getAll() {
        try {
            const getAllUserSettingsQuery = "SELECT * FROM UserSetting";
            const [result] = await db.execute(getAllUserSettingsQuery);
            return result;
        } catch (error) {
            return error;
        }
    }

    async update() {
        try {
            const updateUserSettingQuery = "UPDATE UserSetting SET post_privacy = ?, story_privacy = ?, dark_theme = ? WHERE user_id = ?";
            const [result] = await db.execute(updateUserSettingQuery, [
                this.post_privacy,
                this.story_privacy,
                this.dark_theme,
                this.user_id
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    static async delete(user_id) {
        try {
            const deleteUserSettingQuery = "DELETE FROM UserSetting WHERE user_id = ?";
            const [result] = await db.execute(deleteUserSettingQuery, [
                user_id
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }
}

export {
    UserSetting
}
