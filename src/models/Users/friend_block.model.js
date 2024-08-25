import db from "../../configs/database/database.config";

class FriendBlock {
    constructor(data) {
        this.requestor_id = data.requestor_id;
        this.receiver_id = data.receiver_id;
    }

    // Chặn bạn
    async block() {
        try {
            const blockQuery = `
                INSERT INTO FriendBlock (requestor_id, receiver_id)
                VALUES (?, ?);
            `;
            const [result] = await db.execute(blockQuery, [this.requestor_id, this.receiver_id]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }

    // Bỏ chặn bạn
    static async unblock(requestor_id, receiver_id) {
        try {
            const unblockQuery = `
                DELETE FROM FriendBlock
                WHERE requestor_id = ? AND receiver_id = ?;
            `;
            const [result] = await db.execute(unblockQuery, [requestor_id, receiver_id]);
            return result.affectedRows;
        } catch (error) {
            return error;
        }
    }
}

export default FriendBlock;
