import db from "../../configs/database/database.config";
import { generateId } from "../../ultils/crypto";

class GroupChannel {
  constructor(data) {
    this.group_id = data.group_id;
    this.group_name = data.group_name;
    this.group_slogan = data.group_slogan;
    this.group_privacy = data.group_privacy;
    this.avatar_media_link = data.avatar_media_link;
    this.cover_media_link = data.cover_media_link;
    this.created_at = data.created_at;
  };

  async create() {
    const group_id = generateId("grp_");
    try {
      const createGroup = `
                          INSERT INTO GroupChannel (group_id,
                                                  group_name,
                                                  group_slogan,
                                                  group_privacy,
                                                  avatar_media_link,
                                                  cover_media_link
                                                  )
                          VALUES (?, ?, ?, ?, ?, ?);
                          `;

      console.log("<<<<<>>>>>>>>>>:", [
        group_id,
        this.group_name,
        this.group_slogan,
        this.group_privacy,
        this.avatar_media_link,
        this.cover_media_link,
      ]);

      const [result] = await db.execute(createGroup, [
        group_id,
        this.group_name,
        this.group_slogan,
        this.group_privacy * 1,
        this.avatar_media_link,
        this.cover_media_link,
      ]);

      return result.affectedRows > 0 ? group_id : false;
    } catch (error) {
      return error;
    }
  }

  static async getAllGroups() {
    try {
      const getGroupsQuery = `
                SELECT * FROM GroupChannel;
            `;
      const [result] = await db.execute(getGroupsQuery, [group_id]);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  static async getGroupByGroupId(group_id) {
    try {
      const getGroupsQuery = `
                SELECT * FROM GroupChannel WHERE group_id = ?;
            `;
      const [result] = await db.execute(getGroupsQuery, [group_id]);
      return result[0];
    } catch (error) {
      console.error(error);
    }
  }
}

export default GroupChannel;
