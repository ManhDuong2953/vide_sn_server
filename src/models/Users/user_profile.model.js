import db from "../../configs/database/database.config";

class UserProfile {
    constructor(data) {
        this.user_id = data.user_id;
        this.date_of_birth = data.date_of_birth;
        this.user_address = data.user_address || null;
        this.user_school = data.user_school || null;
        this.user_slogan = data.user_slogan || null;
    }
    

    async create() {
        try {
            const createUserProfileQuery = "INSERT INTO UserProfile (user_id, date_of_birth, user_address, user_school, user_slogan) VALUES (?, ?, ?, ?, ?);"
            const [result] = await db.execute(createUserProfileQuery, [
                this.user_id,
                this.date_of_birth,
                this.user_address,
                this.user_school,
                this.user_slogan
            ]);
            
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    static async getById(user_id) {
        try {
            const getUserProfileByIdQuery = `
                SELECT 
                    user_id, 
                    DATE_FORMAT(date_of_birth, '%Y-%m-%d') as date_of_birth, 
                    user_address, 
                    user_school, 
                    user_slogan 
                FROM UserProfile 
                WHERE user_id = ?`;
            const [result] = await db.execute(getUserProfileByIdQuery, [user_id]);            
            return result[0];
        } catch (error) {
            return error;
        }
    }
    

    static async getAll() {
        try {
            const getAllUserProfilesQuery = "SELECT * FROM UserProfile";
            const [result] = await db.execute(getAllUserProfilesQuery);
            return result;
        } catch (error) {
            return error;
        }
    }

    async update() {
        try {
            const updateUserProfileQuery = "UPDATE UserProfile SET date_of_birth = ?, user_address = ?, user_school = ?, user_slogan = ? WHERE user_id = ?";
            const [result] = await db.execute(updateUserProfileQuery, [
                this.date_of_birth,
                this.user_address,
                this.user_school,
                this.user_slogan,
                this.user_id
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    static async delete(user_id) {
        try {
            const deleteUserProfileQuery = "DELETE FROM UserProfile WHERE user_id = ?";
            const [result] = await db.execute(deleteUserProfileQuery, [
                user_id
            ]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }
}




export {
    UserProfile
}
