import db from "../../configs/database/database.config";
import GroupChannel from "./group_channel.model";

class GroupMember extends GroupChannel {
  constructor(data) {
    super(data);
    this.member_id = data.member_id;
    this.member_status = data.member_status;
    this.member_role = data.member_role;
    this.created_at = data.created_at;
  }

  async create() {
    try {
      const createGroupMemberQuery = `
                INSERT INTO GroupMember (group_id, member_id, member_role)
                VALUES (?,?,?);
            `;
      const [result] = await db.execute(createGroupMemberQuery, [
        this.group_id,
        this.member_id,
        this.member_role,
      ]);
      return result.affectedRows;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllMemberByGroupId(group_id) {
    try {
      const getGroupMembersQuery = `
                SELECT * FROM GroupMember
                WHERE group_id = ?;
            `;
      const [result] = await db.execute(getGroupMembersQuery, [group_id]);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllGroupByMemberID(member_id) {
    try {
      const getGroupMembersQuery = `
                SELECT group_id FROM GroupMember
                WHERE member_id = ?;
            `;
      const [result] = await db.execute(getGroupMembersQuery, [member_id]);
      return result;
    } catch (error) {
      console.error(error);
    }
  }
}

export default GroupMember;
