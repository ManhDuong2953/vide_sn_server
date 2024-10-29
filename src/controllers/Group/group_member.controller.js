import GroupChannel from "../../models/Group/group_channel.model";
import GroupMember from "../../models/Group/group_member.model";

export const getGroupsByUserID = async (req, res) => {
  try {
    const user_id = req.params?.user_id || req.body?.data?.user_id;
    
    const groupsID = await GroupMember.getAllGroupByMemberID(user_id);
    const listGroups = await Promise.all(
        groupsID?.map(
            async (group_id) =>
                (
                    await GroupChannel.getGroupByGroupId(group_id?.group_id)
                )
            )
        );
        
     res.status(200).json({ status: true, data: listGroups });
  } catch (error) {
    console.log(error);

    res.status(404).json({ status: false, message: error.message });
  }
};

