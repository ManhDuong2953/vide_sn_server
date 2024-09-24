import { io, users } from "../../../server";
import { getSocketIdByUserId } from "../../configs/socketIO/socketManager";
import Message from "../../models/Message/messenger.model";
import { decryptWithPrivateKey } from "../../ultils/crypto";

const createMessage = async (req, res) => {
  try {
    console.log(req.files, req.body);
    const user_id = req.body?.data?.user_id ?? null;
    const friend_id = req.params?.id ?? null;
    const content_text = req.body?.content_text ?? "";
    const content_type = req.body?.content_type ?? "";
    const name_file = req.body?.name_file ?? "";

    // Check for missing required fields
    if (!user_id || !friend_id || !content_text) {
      return res
        .status(400)
        .json({ status: false, message: "Missing required fields" });
    }

    // Create a new message instance
    const newMessage = new Message({
      sender_id: user_id,
      receiver_id: friend_id,
      content_type: content_type,
      name_file: name_file,
    });

    // Attempt to create the message in the database
    const result = await newMessage.create(content_text);
    // Send message to receiver regardless of database result
    io.to(getSocketIdByUserId(friend_id, users)).emit("receiveMessage", {
      sender_id: user_id,
      receiver_id: friend_id,
      content_text: content_text,
      content_type: content_type,
      name_file: name_file,
    });

    // Respond based on the result of the message creation
    if (result) {
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
      return res
        .status(400)
        .json({ status: false, message: "Missing required fields" });
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
          message_id: item.id,
          sender_id: item.sender_id,
          receiver_id: item.receiver_id,
          content_text,
          name_file: item.name_file,
          content_type: item.content_type,
          created_at: item.created_at,
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

export { getAllMessages, createMessage };
