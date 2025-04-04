import GroupChannel from "../../models/Group/group_channel.model.js";
import GroupMember from "../../models/Group/group_member.model.js";
import convertFalsyValues from "../convertFalsy/convertFalsy.js";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function Authorization(req, res, next) {
  try {
    const access_token = req.body.accessToken;

    if (!access_token) {
      return res
        .status(401)
        .json({ status: false, message: "Không thể xác thực" });
    }
    const dataUser = jwt.decode(access_token);

    req.body = convertFalsyValues({
      ...req.body,
      status: "validated",
      data: dataUser,
    });

    next();
  } catch (error) {
    res.status(403).json({ status: false, message: "Error" });
  }
}

export const checkRoleGroup = (requiredRoles) => async (req, res, next) => {
  try {
    const groupId = req.params?.id ?? req.params?.group_id;
    const user_id = req.body?.data?.user_id;

    if (!groupId) {
      return res
        .status(400)
        .json({ status: false, message: "Group này không tồn tại" });
    }

    const roleMember = await GroupMember.checkRole(user_id, groupId);

    // Kiểm tra nếu vai trò của người dùng nằm trong mảng các vai trò yêu cầu
    if (roleMember && requiredRoles.includes(roleMember.member_role)) {
      // Nếu vai trò hợp lệ, lưu vào `req` và tiếp tục đến handler tiếp theo
      req.roleMember = roleMember;
      return next();
    }

    return res
      .status(403)
      .json({ status: false, message: "Bạn không có quyền truy cập tài nguyên này" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

export const checkPrivacyGroup = async (req, res, next) => {
  try {
    const groupId = req.params?.id ?? req.params?.group_id;

    if (!groupId) {
      return res
        .status(400)
        .json({ status: false, message: "Group này không tồn tại" });
    }

    const roleMember = await GroupChannel.getGroupByGroupId(groupId);

    if (roleMember && roleMember?.group_privacy === 1) {
      return next();
    } else if (roleMember && roleMember?.group_privacy === 0) {
      return checkRoleGroup([0, 1])(req, res, next); // Truyền đúng tham số
    }

    return res.status(403).json({ status: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
