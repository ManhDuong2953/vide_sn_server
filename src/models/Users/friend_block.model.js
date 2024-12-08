import db from "../../configs/database/database.config";

export class FriendBlock {
    constructor(data) {
      this.requestor_id = data.requestor_id;
      this.receiver_id = data.receiver_id;
    }
    async create() {
      try {
        const blockQuery = `
                            INSERT INTO FriendBlock (requestor_id, receiver_id)
                            VALUES (?, ?);
                          `;
        const [result] = await db.execute(blockQuery, [
          this.requestor_id,
          this.receiver_id,
        ]);
  
        return result.affectedRows;
      } catch (error) {
        throw error;
      }
    }
  
    static async checkBlockedUsers(user_id, friend_id) {
      try {
        const blockQuery = `
                            SELECT * FROM FriendBlock WHERE (requestor_id = ? AND receiver_id = ?) OR (requestor_id = ? AND receiver_id = ?);
                          `;
        const [result] = await db.execute(blockQuery, [
          user_id,
          friend_id,
          friend_id,
          user_id,
        ]);
  
        return result[0];
      } catch (error) {
        throw error;
      }
    }
  
    async deleteBlock() {
      try {
        const blockQuery = `
                            DELETE FROM FriendBlock WHERE (requestor_id = ? AND receiver_id = ?);
                          `;
        const [result] = await db.execute(blockQuery, [
          this.requestor_id,
          this.receiver_id,
        ]);
  
        return result?.affectedRows;
      } catch (error) {
        throw error;
      }
    }
  }
  