import { io, users } from "../../../server.js";
import uploadFile from "../../configs/cloud/cloudinary.config.js";
import { getSocketIdByUserId } from "../../configs/socketIO/socketManager.js";
import Message from "../../models/Message/messenger.model.js";
import { hybridDecrypt } from "../../ultils/crypto.js";
import dotenv from "dotenv";
dotenv.config();
const createMessage = async (req, res) => {
  try {
    const files = req.files || {};
    const user_id = (req.body?.sender_id || req.body?.data?.user_id) ?? null;
    const friend_id = req.params?.id ?? null;
    let content_text = (req.body?.content_text).toString() ?? "";
    const content_type = req.body?.content_type ?? "";
    const reply_messenger_id = req.body?.reply_messenger_id ?? null;
    let name_file = req.body?.name_file ?? "";

    if (files.length > 0) {
      content_text = (
        await uploadFile(files[0], process.env.NAME_FOLDER_MESSENGER)
      )?.url;
    }

    // Check for missing required fields
    if (!user_id || !friend_id || !content_text) {
      return res
        .status(400)
        .json({ status: false, message: "Dữ liệu nhập vào không hợp lệ" });
    }

    // Create a new message instance
    const newMessage = new Message({
      sender_id: user_id,
      receiver_id: friend_id,
      content_type: content_type,
      reply_messenger_id: reply_messenger_id,
      name_file: name_file,
    });

    // Attempt to create the message in the database
    const result = await newMessage.create(content_text);

    if (result) {
      const sender_id = getSocketIdByUserId(user_id, users);
      const receiver_id = getSocketIdByUserId(friend_id, users);
      // Send message to receiver regardless of database result
      io.to([sender_id, receiver_id]).emit("receiveMessage", {
        messenger_id: result,
        sender_id: user_id,
        receiver_id: friend_id,
        content_text: content_text,
        content_type: content_type,
        name_file: name_file,
        reply_messenger_id: reply_messenger_id,
      });
      // Update conversation status for both users
      io.to(getSocketIdByUserId(friend_id, users)).emit("updateConversation");
      io.to(getSocketIdByUserId(user_id, users)).emit("updateConversation");

      return res.status(201).json({ status: true });
    } else {
      return res
        .status(500)
        .json({ status: false, message: "Failed to create message" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: false,
      message: "Opps! Có một chút lỗi nhỏ. Thử lại tác vụ",
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const user_id = req.body?.data?.user_id ?? null;
    const friend_id = req.params?.id ?? null;
    const private_key = req.body?.private_key ?? "";

    if (!user_id || !friend_id || !private_key) {
      return res.status(400).json({ status: false });
    }

    const result = await Message.getMessage(user_id, friend_id);

    const listMsgDecrypt = await Promise.all(
      result.map(async (item) => {
        let content_text = "Tin nhắn đã được mã hoá";
 
        if (item.sender_id === user_id) {
          content_text = hybridDecrypt(
            item.content_text_encrypt_by_owner,
            private_key
          );
        } else if (item.sender_id === friend_id) {
          content_text = hybridDecrypt(
            item.content_text_encrypt,
            private_key
          );
        }

        return {
          messenger_id: item.messenger_id,
          sender_id: item.sender_id,
          receiver_id: item.receiver_id,
          content_text,
          name_file: item.name_file,
          content_type: item.content_type,
          created_at: item.created_at,
          reply_messenger_id: item.reply_messenger_id,
        };
      })
    );

    return res.status(200).json({ status: true, data: listMsgDecrypt });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Opps! Có một chút lỗi nhỏ. Thử lại tác vụ",
    });
  }
};

const getAllConversations = async (req, res) => {
  try {
    const user_id = req.body?.data?.user_id ?? null;
    const private_key = req.body?.private_key ?? "";
    if (!user_id) {
      return res
        .status(400)
        .json({ status: false, message: "User ID is required" });
    }

    const conversations = await Message.getConversation(user_id);

    // Giải mã các tin nhắn để lấy nội dung hiển thị
    const conversationsWithDecryptedMessages = await Promise.all(
      conversations?.map(async (conv) => {
        let content_text = "Encrypted message";

        // Giải mã tin nhắn cuối cùng của bạn bè
        if (conv.sender_id === user_id) {
          content_text = hybridDecrypt(
            conv.content_text_encrypt_by_owner,
            private_key
          );
        } else {
          content_text = hybridDecrypt(
            conv.content_text_encrypt,
            private_key
          );
        }

        return {
          friend_id: conv.friend_id,
          friend_name: conv.friend_name,
          friend_avatar: conv.friend_avatar,
          content_text: content_text,
          last_message_time: conv.last_message_time,
          sender_id: conv.sender_id,
          receiver_id: conv.receiver_id,
          content_type: conv.content_type,
        };
      })
    );

    return res
      .status(200)
      .json({ status: 200, data: conversationsWithDecryptedMessages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Opps! Có một chút lỗi nhỏ. Thử lại tác vụ",
    });
  }
};

const deleteAllMessenger = async (req, res) => {
  try {
    const user_id = req.body?.data?.user_id;
    const friend_id = req.params?.friend_id;
    if (!user_id || !friend_id) {
      return res
        .status(400)
        .json({ status: false, message: "Người dùng không tồn tại" });
    }

    const result = await Message.deleteAllMessage(user_id, friend_id);
    if (result <= 0) {
      throw new Error("Lỗi");
    }

    return res.status(200).json({ status: 200 });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Opps! Có một chút lỗi nhỏ. Thử lại tác vụ",
    });
  }
};
// Hàm deleteMessenger trong controller
const deleteMessenger = async (req, res) => {
  try {
    const user_id = req.body?.data?.user_id;
    const messenger_id = req.params?.messenger_id;
    if (!user_id) {
      return res
        .status(400)
        .json({ status: false, message: "Người dùng không tồn tại" });
    }

    const result = await Message.deleteMessageByMessageID(
      user_id,
      messenger_id
    );
    
    if (!result) {
      return res
        .status(404)
        .json({
          status: false,
          message: "Không tìm thấy hoặc không thể xóa tin nhắn",
        });
    }

    return res
      .status(200)
      .json({ status: true});
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Opps! Có một chút lỗi nhỏ. Thử lại tác vụ",
    });
  }
};

// Hàm deleteMessengerByOwnerSide trong controller
const deleteMessengerByOwnerSide = async (req, res) => {  
  try {
    const user_id = req.body?.data?.user_id;
    const messenger_id = req.params?.messenger_id;
    if (!user_id) {
      return res
        .status(400)
        .json({ status: false, message: "Người dùng không tồn tại" });
    }

    const result = await Message.deleteMessageByMessageIDOwnSide(
      user_id,
      messenger_id
    );
    if (!result) {
      return res
        .status(404)
        .json({
          status: false,
          message: "Không tìm thấy hoặc không thể xóa tin nhắn",
        });
    }

    return res
      .status(200)
      .json({ status: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Opps! Có một chút lỗi nhỏ. Thử lại tác vụ",
    });
  }
};

export {
  getAllMessages,
  createMessage,
  getAllConversations,
  deleteAllMessenger,
  deleteMessenger,
  deleteMessengerByOwnerSide,
};
