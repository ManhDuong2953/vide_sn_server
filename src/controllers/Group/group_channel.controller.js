import uploadFile from "../../configs/cloud/cloudinary.config";
import GroupChannel from "../../models/Group/group_channel.model";
import GroupMember from "../../models/Group/group_member.model";
require("dotenv").config();

const createGroupChannel = async (req, res) => {
  const { group_name, group_slogan, group_privacy } = req.body;
  const admin_id = req.body?.data?.user_id;

  try {
    // Kiểm tra các trường bắt buộc
    if (!group_name || !group_slogan || !group_privacy) {
      return res.status(400).json({
        status: false,
        message: "Tên nhóm, slogan và quyền truy cập không được để trống!",
      });
    }

    let avatar_media_link = null;
    let cover_media_link = null;

    // Kiểm tra và tải lên ảnh nếu có
    if (req.files) {
      const uploadPromises = [];

      if (req.files.avatar) {
        uploadPromises.push(
          uploadFile(req.files.avatar[0], process.env.NAME_FOLDER_AVT_GROUP)
            .then((response) => response.url)
            .catch((error) => {
              console.error("Error uploading avatar:", error);
              return null; // Trả về null nếu có lỗi
            })
        );
      }

      if (req.files.cover) {
        uploadPromises.push(
          uploadFile(req.files.cover[0], process.env.NAME_FOLDER_AVT_GROUP)
            .then((response) => response.url)
            .catch((error) => {
              console.error("Error uploading cover:", error);
              return null; // Trả về null nếu có lỗi
            })
        );
      }

      // Đợi tất cả các promise hoàn thành
      const uploadedLinks = await Promise.all(uploadPromises);
      avatar_media_link = uploadedLinks[0] || null;
      cover_media_link = uploadedLinks[1] || null;
    }

    // Tạo nhóm mới
    const groupChannel = new GroupChannel({
      group_name,
      group_slogan,
      group_privacy,
      avatar_media_link,
      cover_media_link,
    });

    const group_id = await groupChannel.create(); // Gọi create() để lấy group_id

    if (!group_id) {
      return res.status(400).json({
        status: false,
        message: "Lỗi khi tạo nhóm!",
      });
    }

    // Tạo thành viên nhóm
    const groupMember = new GroupMember({
      member_id: admin_id,
      group_id, // Sử dụng group_id đã tạo
      member_role: 1,
      member_status: 1,
    });

    const memberResult = await groupMember.create();

    // Kiểm tra kết quả
    if (memberResult) {
      res.status(200).json({
        status: true,
        message: "Tạo nhóm thành công!",
        group_id, // Trả về group_id của nhóm vừa tạo
      });
    } else {
      res.status(400).json({
        status: false,
        message: "Lỗi bất định khi thêm thành viên!",
      });
    }
  } catch (error) {
    console.error("Error creating group channel:", error);
    res.status(500).json({
      status: false,
      message: "Đã xảy ra lỗi, vui lòng thử lại sau",
    });
  }
};

const getInfoGroupChannel = async (req, res) => {
  try {
    const group_id = req.params?.group_id;
    const group = await GroupChannel.getGroupByGroupId(group_id);
    if (!group) {
      return res
        .status(404)
        .json({ status: false, message: "Nhóm không tồn tại!" });
    }
    res.status(200).json({ status: true, data: group });
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};

export { createGroupChannel, getInfoGroupChannel };
