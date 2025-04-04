import db from "../../configs/database/database.config.js";

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
            console.log(error);
            
            return error;
        }
    }
    static async getLatestAvatarById(user_id) {
        try {
            const getProfileMediaByIdQuery = "SELECT * FROM ProfileMedia WHERE user_id = ? AND media_type = 'avatar'";
            const [result] = await db.execute(getProfileMediaByIdQuery, [user_id]);

            if (result.length === 0) {
                return null; // Không tìm thấy avatar
            }

            // Sắp xếp theo ngày tạo và lấy avatar mới nhất
            const latestAvatar = result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];

            return latestAvatar.media_link; // Trả về đường dẫn của avatar mới nhất
        } catch (error) {
            console.error('Error fetching latest avatar by user ID:', error);
            throw error; // Ném lỗi để xử lý ở nơi khác
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
            let updateProfileMediaQuery = "UPDATE ProfileMedia SET";
            let params = [];
            let updates = [];
    
            if (this.media_type) {
                updates.push(" media_type = ?");
                params.push(this.media_type);
            }
            if (this.media_link) {
                updates.push(" media_link = ?");
                params.push(this.media_link);
            }
    
            if (updates.length === 0) {
                throw new Error("Không có trường nào được cập nhật.");
            }
    
            updateProfileMediaQuery += updates.join(",");
            updateProfileMediaQuery += " WHERE user_id = ?";
            params.push(this.user_id);
    
            const [result] = await db.execute(updateProfileMediaQuery, params);
            return result.affectedRows;
        } catch (error) {
            console.error('Error updating profile media:', error);
            throw error;
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
