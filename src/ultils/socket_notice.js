import { io, users } from "../../server"; // Đảm bảo đúng đường dẫn
import { getSocketIdByUserId } from "../configs/socketIO/socketManager";
import Notice from "../models/Notice/notice.model";
import { Users } from "../models/Users/user_account.model";

export const sendNoticeToFriends = async (
  sender_id,
  friend_ids,
  content,
  link_notice = null
) => {
  try {
    // Lặp qua danh sách bạn bè và gửi socket nếu họ trực tuyến
    for (const friend_id of friend_ids) {
      const socketId = getSocketIdByUserId(friend_id?.user_id, users);
      const infoSender = await Users.getById(sender_id);
      const contentMessage = infoSender?.user_name + " " +content;
      // Tạo thông báo mới để lưu vào DB
      const newNotice = new Notice({
        sender_id,
        receiver_id: friend_id?.user_id,
        content: contentMessage,
        link_notice,
      });

      // Lưu thông báo vào DB
      await newNotice.create();

      if (socketId) {
        // Gửi socket thông báo
        io.to(socketId).emit("send_notice", {
          sender_id,
          contentMessage,
          link_notice,
        });
      }
    }
  } catch (error) {
    console.error("Lỗi khi gửi thông báo và lưu vào DB:", error);
  }
};
