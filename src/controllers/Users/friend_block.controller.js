import { Users } from "../../models/Users/user_account.model";
import { FriendBlock } from "../../models/Users/friend_block.model";

// Block bạn bè
export const blockFriend = async (req, res) => {
    try {
      const { receiver_id } = req.params;
      const requestor_id = req.body?.data?.user_id;
      if (!receiver_id || !requestor_id) {
        return res
          .status(400)
          .json({ status: false, message: "Thiếu thông tin cần thiết" });
      }
  
      // Kiểm tra sự tồn tại của người gửi và người nhận
      const [checkRequestor, checkReceiver] = await Promise.all([
        Users.getById(requestor_id),
        Users.getById(receiver_id),
      ]);
  
      if (checkRequestor?.user_id && checkReceiver?.user_id) {
        const frBlock = new FriendBlock({
          requestor_id,
          receiver_id,
        });
        const result = await frBlock.create(requestor_id, receiver_id);
  
        if (result > 0) {
          res
            .status(200)
            .json({ status: true, message: "Bạn đã chặn người dùng này" });
        } else {
          res.status(404).json({ status: false });
        }
      } else {
        throw new Error("Người dùng không tồn tại");
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message ?? error });
    }
  };
  
  // Block bạn bè
  export const checkBlockFriend = async (req, res) => {
    try {
      const { receiver_id } = req.params;
      const requestor_id = req.body?.data?.user_id;
      // Kiểm tra sự tồn tại của người gửi và người nhận
      const [checkRequestor, checkReceiver] = await Promise.all([
        Users.getById(requestor_id),
        Users.getById(receiver_id),
      ]);
  
      if (checkRequestor?.user_id && checkReceiver?.user_id) {
        const result = await FriendBlock.checkBlockedUsers(
          requestor_id,
          receiver_id
        );
  
        if (result) {
          res.status(200).json({ status: true, data: result });
        } else {
          res.status(404).json({ status: false });
        }
      } else {
        throw new Error("Người dùng không tồn tại");
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message ?? error });
    }
  };
  
  // gỡ Block bạn bè
  export const deleteBlockFriend = async (req, res) => {
    try {
      const { receiver_id } = req.params;
      const requestor_id = req.body?.data?.user_id;
  
      // Kiểm tra sự tồn tại của người gửi và người nhận
      const [checkRequestor, checkReceiver] = await Promise.all([
        Users.getById(requestor_id),
        Users.getById(receiver_id),
      ]);
  
      if (checkRequestor?.user_id && checkReceiver?.user_id) {
        const frBlock = new FriendBlock({ requestor_id, receiver_id });
        const result = await frBlock.deleteBlock(requestor_id, receiver_id);
        if (result > 0) {
          res.status(200).json({
            status: true,
            message: "Bạn đã gỡ chặn, load lại trang để lệnh gỡ có hiệu lực",
          });
        } else {
          res.status(404).json({ status: false });
        }
      } else {
        throw new Error("Người dùng không tồn tại");
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ status: false, message: error.message ?? error });
    }
  };
  