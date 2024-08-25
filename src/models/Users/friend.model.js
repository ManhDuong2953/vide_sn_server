import db from "../../configs/database/database.config";

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
                SELECT * FROM Friend 
                WHERE (requestor_id = ? OR receiver_id = ?) AND relationship_status = 1;
            `;
            const [result] = await db.execute(getFriendsQuery, [user_id, user_id]);
            return result;
        } catch (error) {
            return error;
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
                requestor_id
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
}

export default Friend;
