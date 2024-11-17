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
                INSERT INTO GroupMember (group_id, member_id, member_role, member_status)
                VALUES (?,?,?,?);
            `;
      const [result] = await db.execute(createGroupMemberQuery, [
        this.group_id,
        this.member_id,
        this.member_role,
        this.member_status,
      ]);
      return result.affectedRows;
    } catch (error) {
      console.error(error);
    }
  }

  static async checkRole(user_id, group_id) {
    try {
      
      const getGroupMembersQuery = `
                SELECT * FROM GroupMember
                WHERE group_id = ? AND member_id = ?;
            `;
      const [result] = await db.execute(getGroupMembersQuery, [
        group_id,
        user_id,
      ]);
      
      if (result[0]?.member_id) {
        return result[0];
      }
      return null;
    } catch (error) {
      console.error(error);
    }
  }


  static async updateAcceptInvite(user_id, group_id) {
    try {
      
      const getGroupMembersQuery = `
                UPDATE GroupMember
                SET member_status = 1, member_role = 0 WHERE group_id = ? AND member_id = ?;
            `;
      const [result] = await db.execute(getGroupMembersQuery, [
        group_id,
        user_id,
      ]);
      
     return result.affectedRows;
    } catch (error) {
      console.error(error);
    }
  }

  static async updateSetAdmin(user_id, group_id) {
    try {
      
      const getGroupMembersQuery = `
                UPDATE GroupMember
                SET member_status = 1, member_role = 1 WHERE group_id = ? AND member_id = ?;
            `;
      const [result] = await db.execute(getGroupMembersQuery, [
        group_id,
        user_id,
      ]);
      
     return result.affectedRows;
    } catch (error) {
      console.error(error);
    }
  }

  static async updateRefuseInvite(user_id, group_id) {
    try {
      
      const getGroupMembersQuery = `
                DELETE FROM GroupMember WHERE group_id = ? AND member_id = ?;
            `;
      const [result] = await db.execute(getGroupMembersQuery, [
        group_id,
        user_id,
      ]);
      
     return result.affectedRows;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllOfficialMemberByGroupId(group_id) {
    try {
      const getGroupMembersQuery = `
                SELECT * FROM GroupMember
                WHERE group_id = ? AND member_status = 1 ORDER BY member_role DESC;
            `;
      const [result] = await db.execute(getGroupMembersQuery, [group_id]);
      
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  static async getAllMemberUnapprovedByGroupId(group_id) {
    try {
      const getGroupMembersQuery = `
                SELECT * FROM GroupMember
                WHERE group_id = ? AND member_status = 0;
            `;
      const [result] = await db.execute(getGroupMembersQuery, [group_id]);
      return result;
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
