import { io, users } from "../../../server";
import uploadFile from "../../configs/cloud/cloudinary.config";
import { getSocketIdByUserId } from "../../configs/socketIO/socketManager";
import Message from "../../models/Message/messenger.model";
import { decryptWithPrivateKey } from "../../ultils/crypto";
require("dotenv").config();
const createMessage = async (req, res) => {
  try {
    const files = req.files || {};
    const user_id = req.body?.data?.user_id ?? null;
    const friend_id = req.params?.id ?? null;
    let content_text = (req.body?.content_text).toString() ?? "";
    const content_type = req.body?.content_type ?? "";
    const reply_text = req.body?.reply_text ?? null;
    let name_file = req.body?.name_file ?? "";
    console.log(user_id, friend_id, content_text, content_type);

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
      reply_text: reply_text,
      name_file: name_file,
    });

    // Attempt to create the message in the database
    const result = await newMessage.create(content_text);

    // Respond based on the result of the message creation
    if (result) {
      // Send message to receiver regardless of database result
      io.to(getSocketIdByUserId(friend_id, users)).emit("receiveMessage", {
        sender_id: user_id,
        receiver_id: friend_id,
        content_text: content_text,
        content_type: content_type,
        name_file: name_file,
        reply_text: reply_text,
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
      message: "An error occurred, please try again later",
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
        let content_text = "Encrypted message";

        if (item.sender_id === user_id) {
          content_text = decryptWithPrivateKey(
            item.content_text_encrypt_by_owner,
            private_key
          );
        } else if (item.sender_id === friend_id) {
          content_text = decryptWithPrivateKey(
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
          reply_text: item.reply_text,
        };
      })
    );

    return res.status(200).json({ status: true, data: listMsgDecrypt });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "An error occurred, please try again later",
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
          content_text = decryptWithPrivateKey(
            conv.content_text_encrypt_by_owner,
            private_key
          );
        } else {
          content_text = decryptWithPrivateKey(
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
      message: "An error occurred, please try again later",
    });
  }
};

export { getAllMessages, createMessage, getAllConversations };
